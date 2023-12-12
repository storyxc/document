# 山特ups配合nut实现断电安全关机

## 背景

搞了7*24小时服务器之后经历了两次突然断电，每次重启磁盘检查都要卡很久，夏天一到用电量骤升，市电断电和跳闸的几率都增加了。万一多来几次突然断电，磁盘阵列可能要挂了，更关键的是数据无价啊，ups还是少不了。

## 选择

因为不是成品nas系统，想实现自动关机得依靠linux上已有的软件。而我对`apcupsd`
这款软件有所耳闻，所以第一选择就去看了新款的`apc bk650m2-ch`
，快下单了才得知新款不支持apcupsd，然后就听网友的建议看了山特的`box600`和`box850`
，山特这个型号有两排插座，一排防雷+不断电，一排是防雷，还省了了插排钱，自带的usb通讯端口可以通过`nut`
软件进行管理，实现自动关机以及自定义脚本执行等功能，虽然电池容量小了点，但是能省就省吧，最后下单了box600。

## nut安装及配置

ups机器本身没什么可讲的，把附带的rj45接ups，usb线接主机，再把主机电源插在ups的不断电插口上，接着给ups通电即可。主要介绍下nut的使用和配置。

### 安装nut

`apt install nut`

### 配置驱动

首先可以用`lsusb`命令查看是否接入了ups，能看到ups即可

![image-20220524232436626](https://storyxc.com/images/blog/image-20220524232436626.png)

然后编辑ups配置文件`vim /etc/nut/ups.conf`,增加配置如下

```txt
maxretry = 3
[santak]
        driver = usbhid-ups
        port = auto
        desc = "my ups"
```

santak是ups的设备名，可以自定义，后续有些命令这个设备名还会用到

### 配置nut服务

#### 新建ups用户

`vim /etc/nut/upsd.users`新增配置

```txt
[ups]
        password = xxx
        upsmon master
```

`ups`为用户名，`xxx`为密码，`upsmon master`为运行模式

#### 配置权限

```shell
chown root:nut /etc/nut/upsd.conf /etc/nut/upsd.users
chmod 0640 /etc/nut/upsd.conf /etc/nut/upsd.users
```

#### 启动nut服务

`vim /etc/nut/nut.conf`修改模式为单机

```txt
MODE=standalone
```

启动upsd服务

```shell
/sbin/upsd
```

#### 查看ups信息

查看全部

```shell
/bin/upsc santak@localhost # 这里的santak就是上面的设备名
```

查看某个信息在后面接信息类别就行，例如查看电量

```shell
/bin/upsc santak@127.0.0.1 battery.charge

Init SSL without certificate database
100
```

## 设置自动关机

nut服务会在UPS发送`LOWBATT`时通知机器关机，触发时机默认为ups电量剩余`20%`
。我们需要添加upsmon配置`vim /etc/nut/upsmon.conf`

在`MONITOR`监视器部分添加配置

```txt
MONITOR santak@localhost 1 ups xxx master

# MONITOR 设备名@ip 1 用户名 密码 节点
```

授权

```shell
chown root:nut /etc/nut/upsmon.conf
chmod 0640 /etc/nut/upsmon.conf
```

启动upsmon

```shell
/sbin/upsmon
```

## 自定义脚本

实际上配置完上面的内容已经可以实现断电时安全关机了，但喜欢折腾的还可以自定义触发事件的脚本

### 修改upsmon配置

`vim /etc/nut/upsmon.conf`添加内容

```txt
NOTIFYCMD /sbin/upssched
```

这个配置的作用是发生事件是运行`upssched`程序

设置触发条件,三个动作分别是记录日志+通知所有用户发生了事件+执行notifycmd，也就是`/sbin/upssched`

```txt
NOTIFYFLAG ONBATT SYSLOG+WALL+EXEC
```

### 配置upssched

`vim /etc/nut/upssched.conf`编辑内容

```txt
CMDSCRIPT /usr/local/bin/upssched
PIPEFN /var/run/nut/upssched/upssched.pipe
LOCKFN /var/run/nut/upssched/upssched.lock
AT ONBATT * START-TIMER power-off 10
AT ONLINE * CANCEL-TIMER power-off
```

这段配置通过CMDSCRIPT指定了发生事件时需要执行的脚本，这个脚本可以根据需求自定义，在断电时(ONBATT/电池供电)
会启动一个10秒的timer，之后会执行power-off事件，这里涉及的文件nut用户都需要配置权限

### 编写脚本

这个可以自定义，例如发邮件等操作，这里展示最基本的脚本格式，例如power-off事件发生时，将`断电了`
信息写入指定文件，还可以调用ups的指令`/sbin/upsmon -c fsd`执行立刻关机操作 (FSD = "Forced Shutdown")

```shell
#! /bin/sh

case $1 in
  power-off)
    echo '$(date +\%Y-\%m-\%d\ \%H:\%M:\%S) - 断电了 ' >> /var/log/nut/nut.log
    #/sbin/upsmon -c fsd #立即通知关机
    ;;
  *)
    logger -t upssched "Unrecognized command: $1"
    ;;
esac
```

