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

## 内核模块加载

> 最近打算给home server换一块瑞昱的2.5G网卡（8125b芯片），所以想提前安装下网卡驱动，执行官网那个autorun.sh脚本前也没仔细看，
> 结果脚本直接把原来的8169网卡驱动卸载了，导致机器直接失联。还好脚本里有备份，所以只需要恢复回去就行了。
> ```shell
> #!/bin/sh
> # SPDX-License-Identifier: GPL-2.0-only
> 
> # invoke insmod with all arguments we got
> # and use a pathname, as insmod doesn't look in . by default
> 
> TARGET_PATH=$(find /lib/modules/$(uname -r)/kernel/drivers/net/ethernet -name realtek -type d)
> if [ "$TARGET_PATH" = "" ]; then
> TARGET_PATH=$(find /lib/modules/$(uname -r)/kernel/drivers/net -name realtek -type d)
> fi
> if [ "$TARGET_PATH" = "" ]; then
> TARGET_PATH=/lib/modules/$(uname -r)/kernel/drivers/net
> fi
> echo
> echo "Check old driver and unload it."
> check=`lsmod | grep r8169`
> if [ "$check" != "" ]; then
> echo "rmmod r8169"
> /sbin/rmmod r8169
> fi
> 
> check=`lsmod | grep r8125`
> if [ "$check" != "" ]; then
> echo "rmmod r8125"
> /sbin/rmmod r8125
> fi
> 
> echo "Build the module and install"
> echo "-------------------------------" >> log.txt
> date 1>>log.txt
> make $@ all 1>>log.txt || exit 1
> module=`ls src/*.ko`
> module=${module#src/}
> module=${module%.ko}
> 
> if [ "$module" = "" ]; then
> echo "No driver exists!!!"
> exit 1
> elif [ "$module" != "r8169" ]; then
> if test -e $TARGET_PATH/r8169.ko ; then
> echo "Backup r8169.ko"
> if test -e $TARGET_PATH/r8169.bak ; then
> i=0
> while test -e $TARGET_PATH/r8169.bak$i
> do
> i=$(($i+1))
> done
> echo "rename r8169.ko to r8169.bak$i"
> mv $TARGET_PATH/r8169.ko $TARGET_PATH/r8169.bak$i
> else
> echo "rename r8169.ko to r8169.bak"
> mv $TARGET_PATH/r8169.ko $TARGET_PATH/r8169.bak
> fi
> fi
> fi
> 
> echo "DEPMOD $(uname -r)"
> depmod `uname -r`
> echo "load module $module"
> modprobe $module
> 
> is_update_initramfs=n
> distrib_list="ubuntu debian"
> 
> if [ -r /etc/debian_version ]; then
> is_update_initramfs=y
> elif [ -r /etc/lsb-release ]; then
> for distrib in $distrib_list
> do
> /bin/grep -i "$distrib" /etc/lsb-release 2>&1 /dev/null && \
> is_update_initramfs=y && break
> done
> fi
> 
> if [ "$is_update_initramfs" = "y" ]; then
> if which update-initramfs >/dev/null ; then
> echo "Updating initramfs. Please wait."
> update-initramfs -u -k $(uname -r)
> else
> echo "update-initramfs: command not found"
> exit 1
> fi
> fi
> 
> echo "Completed."
> exit 0
> ```

```shell
# 进入网卡驱动目录
cd /lib/modules/$(uname -r)//kernel/drivers/net/ethernet/realtek
# 恢复备份
mv r8169.bak r8169.ko
# 加载模块
insmod r8169.ko
# 验证是否加载
lsmod | grep r8169
# 更新模块依赖关系
depmod `uname -r`
# 更新initramfs
update-initramfs -u -k $(uname -r)
```