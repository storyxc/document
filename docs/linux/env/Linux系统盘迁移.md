# Linux系统盘迁移

由于旧系统盘故障需要迁移，而且是大硬盘换小硬盘所以这里采用rsync拷贝的方式进行迁移是最简单的
> https://wiki.archlinux.org/title/Rsync#Full_system_backup

## 准备
- 先清理一下系统盘上的空间
  - 
  ```shell
  docker system prune -a --volumes # 删除没用的镜像和卷
  sudo apt clean
  sudo apt autoremove
  ```
- 关机把新旧硬盘都接上后开机进系统
- `lsblk`查看所有硬盘信息
    - nvme硬盘会被识别成nvme0n1之类的，如果是sata会被识别sda/sdb之类

## 新硬盘分区
### fdisk给新盘分区（UEFI/GPT）
```shell
fdisk /dev/nvme0n1
# 创建新的gpt分区表
g

# 创建EFI分区（512M）
n
Partition number: 1
First sector: （直接回车）
Last sector: +512M

# 把分区1类型改为EFI System
t
1
1

# 创建root分区
n
Partition number: 2
First sector: （直接回车）
Last sector: （直接回车）

# 打印分区表并确认 
p

Device      Size  Type
/dev/nvme0n1p1   512M  EFI System
/dev/nvme0n1p2   ~230G Linux filesystem

# 写入分区表并退出
w

```

### 格式化新分区
```shell
mkfs.fat -F32 /dev/nvme0n1p1
mkfs.ext4 nvme0n1p2
```

## 挂载新系统盘
```shell
mkdir -p /mnt/newroot
mount /dev/nvme0n1p2 /mnt/newroot

mkdir -p /mnt/newroot/boot/efi
mount /dev/nvme0n1p1 /mnt/newroot/boot/efi

# 确认挂载
lsblk
mount | grep /mnt/newroot

```

## 拷贝数据

```shell

# 这里要注意排除掉其他的数据盘挂载目录 比如我这里的/repo

rsync -aAXH --numeric-ids \
  --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/repo/*","/media/*","/lost+found"} \
  / /mnt/newroot

```

## 修改fstab
```shell
blkid /dev/nvme0n1p1 /dev/nvme0n1p2
vim /mnt/newroot/etc/fstab

# 示例
UUID=NVME-EFI-UUID   /boot/efi  vfat  umask=0077  0  1
UUID=NVME-ROOT-UUID  /          ext4  defaults    0  1

UUID=77231e5e-8a4a-45ec-ab5f-9842d90292ed /mnt  ext4 defaults  0  0
UUID=506ed1d0-bc35-4585-8496-1ff4de100982 /repo ext4 defaults  0  0


```

## 配置新系统环境并安装引导
```shell
mount --bind /dev /mnt/newroot/dev
mount --bind /dev/pts /mnt/newroot/dev/pts
mount -t proc proc /mnt/newroot/proc
mount -t sysfs sys /mnt/newroot/sys
# 验证挂载
mount | grep /mnt/newroot

# 进入chroot
chroot /mnt/newroot /bin/bash

# 安装并配置grub（UEFI）
apt update
apt install -y grub-efi-amd64 efibootmgr
grub-install \
  --target=x86_64-efi \
  --efi-directory=/boot/efi \
  --bootloader-id=debian \
  --recheck
update-grub

```

## （可选）创建swapfile 修改fstab
```shell
fallocate -l 16G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile

echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

## 退出chroot 关机
```shell
exit
poweroff
```

## 验证
- 拔掉旧系统盘后启动，进BIOS修改启动顺序