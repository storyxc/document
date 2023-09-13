# Linux常用指令

## 设置时区

```shell
# 查看当前时间、时区
date 
# 列出可用时区
timedatectl list-timezones
# 设置时区
timedatectl set-timezone Asia/Shanghai
# 确认已经更改
timedatectl
```

## 修改主机名

```shell
# 查看主机信息
hostnamectl
# 修改主机名
hostnamectl set-hostname newhostname
```

