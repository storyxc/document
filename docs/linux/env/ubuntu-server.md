# Ubuntu-server



## 关闭欢迎提示

` chmod -x /etc/update-motd.d/*`

## 关闭ssh登录motd广告

`vim /etc/default/motd-news` 将enabled改为0

## 关闭ssh登录系统信息

`apt remove landscape-common landscape-client`

## 系统盘迁移

```shell
# 1.备份数据
# 2.制作一个linux启动盘 例如live server的
# 3.连接原启动盘和需要迁移到的目标盘
# 4.U盘启动直接进入shell
# 5.查看磁盘信息
lsblk
# 6.dd命令直接全盘迁移
dd if=/dev/sda of=/dev/sdb bs=4096 conv=sync,noerror
# 7.拷贝完成后使用新磁盘启动
# 8.删除旧分区&resize
fdisk /dev/sdX
d #删除磁盘最后一个分区
n #新建一个分区，扇区开始结束都用默认即可
w #写盘保存

partprobe #重新读取分区表并更新分区信息

resize2fs /dev/sdXX #调整文件系统的大小
```

