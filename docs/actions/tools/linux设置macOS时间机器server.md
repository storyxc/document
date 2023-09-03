# linux设置macOS时间机器server

## 安装需要的包

`sudo apt install netatalk avahi-daemon`

## 编辑netatalk配置文件

`sudo vim /etc/netatalk/afp.conf`

## 添加Time Machine配置

```txt
[Time Machine]
path = /mnt/data/backup/time_machine
time machine = yes
```

## 创建目录

`sudo mkdir -p /mnt/data/backup/time_machine`

`sudo chown nobody:nogroup /mnt/data/backup/time_machine`

`sudo chmod 777 /mnt/data/backup/time_machine`

## 重启netatalk服务

`sudo systemctl restart netatalk`

## 在mac上进行备份

时间机器中选择磁盘，连接linux server即可。