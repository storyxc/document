# PVE虚拟机异常关机后磁盘检查处理

## 背景

pve虚拟机因为断电异常关机后，会出现重启无法进入系统的问题，并提示磁盘检查相关的异常，例如我碰到的提示

```shell
The root filesystem on /dev/mapper/pve-root requires a manual fsck
```

## 处理

手动执行fsck命令`fsck -y /dev/mapper/pve-root`即可

