# ubuntu-server开启网络唤醒和通电自动启动

## 前提

主板支持WOL（Wake on LAN）功能和来电开机

## 配置

### 主板BIOS中开启网络唤醒功能和断电开机功能

> https://endownload.colorful.cn/EnDownload/MotherBroard/2022/Intel%20600/Manual/Intel%20600%20Series%20BIOS%20Chinese/Intel%20600%20Series%20BIOS%20User%20Guide.pdf

以七彩虹主板为例

```txt
ADVANCED（高级模式）> Power Management Configuration（电源管理配置）> Wake By Lan（网卡唤醒）
Wake By Lan（网卡唤醒） 
设置网络唤醒功能。 
[Enabled] 当检测到 LAN 设备已激活或有信号输入时，唤醒系统。 
[Disabled] 关闭网络唤醒功能。


ADVANCED（高级模式）> Power Management Configuration（电源管理配置）> AC Power Loss（断电开机功能） 
AC Power Loss（断电开机功能） 
设置计算机断电之后，电源再次被接通时计算机的响应状态。 
[Power On] 通电后计算机自动开机。 
[Power Off] 通电后计算机保持关机状态。 
[Last State]] 通电后计算机恢复上次断电前的状态。
```

### ubuntu-server中开启网卡的网络唤醒功能

#### 使用ethtool查看信息

```shell
# 如果没有需要先安装 apt install ethtool
# 首先使用ifconfig或ip a查看设备名称 我的是enp3s0

ethtool enp3s0 | grep "Wake-on"
	Supports Wake-on: pumbg
	Wake-on: d
```

这个信息说明支持pumbg几种唤醒方式，而d表示当前处于禁用状态

> "Wake-on" 中的不同字母代表不同的唤醒模式 这些字母分别代表以下内容：
>
> - `p`：代表PHY（物理层）唤醒模式，这种模式是基于物理层的唤醒模式。
> - `u`：代表UDP数据包唤醒模式，这种模式需要特定的UDP数据包来唤醒设备。
> - `m`：代表多播唤醒模式，这允许多播数据包来唤醒设备。
> - `b`：代表广播唤醒模式，这允许广播数据包来唤醒设备。
> - `g`：代表魔术唤醒帧模式，这是一种常用的唤醒模式，需要特定的魔术唤醒数据包。
>
> > 魔术唤醒数据包（Magic Wake-on-LAN Packet）是一种特殊的数据包，用于远程唤醒计算机或网络设备。它通常用于通过局域网远程唤醒处于休眠或关机状态的设备，以便进行远程管理或访问。这些数据包被称为"魔术"，因为它们包含了一些特定的唤醒模式信息，以便网络接口卡能够识别并唤醒目标设备。
> >
> > 魔术唤醒数据包的结构通常包括以下元素：
> >
> > 1. 目标设备的MAC地址：这是数据包的目标设备的物理地址，以便网络接口卡知道唤醒哪台设备。
> > 2. 以太网帧：数据包以标准的以太网帧格式进行封装。
> > 3. 魔术唤醒模式信息：这些信息告诉网络接口卡以特定方式处理数据包，以实现唤醒功能。

#### 启用网络唤醒功能

`ethtool -s enp3s0 wol g`

#### 重启后网络唤醒会失效，配置网络唤醒持久化

```shell
sudo systemctl edit --force --full wol-enable.service
```

> 可以使用update-alternatives --config editor修改默认编辑器

```shell
[Unit]
Description=Enable Wake-on-LAN

[Service]
ExecStart=/usr/sbin/ethtool -s enp3s0 wol g

[Install]
WantedBy=multi-user.target
```

`systemctl daemon-reload && systemctl enable wol-enable.service && systemctl start wol-enable.service`

#### 网络唤醒调用

不同平台都有相对应的唤醒客户端，我主要是从软路由使用这个功能。使用Etherwake选中要唤醒的设备点击唤醒主机即可发送数据包成功唤醒。

![image-20231020231608248](https://storyxc.com/images/blog/750e2910-db92-4650-9167-3a2eee4be968.png)

#### 来电自启

可以配合UPS使用实现断电安全关机以及来电自动启动，详情见另一篇关于UPS和NUT的博客。