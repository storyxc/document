# macvlan



在日常使用docker的时候，可以通过设置端口映射的方式，实现通过宿主机ip访问docker容器的目的。当然，也有办法可以实现给docker镜像设置单独的IP。这里就要用到`macvlan`技术。

macvlan 是 Linux kernel 支持的新特性，`macvlan`能将一块物理网卡虚拟成多块虚拟网卡，docker这种容器就可以通过虚拟网卡获取IP，利用IP进行独立上网，真正做到跟物理机完全一样的体验。

## docker网络中的macvlan

`docker中的macvlan` 是 Docker中的一种网络驱动，它允许容器直接使用物理网络接口的 MAC 地址。这使得容器可以像物理设备一样存在于网络中，而不需要进行端口映射或NAT。

## linux中开启macvlan

```shell
// 加载 macvlan 模块
modprobe macvlan
// 查看是否已加载
lsmod | grep macvlan
// 如果有有输出证明已经加载macvlan模块，否则说明不支持
// macvlan   24576  0
```

## docker创建macvlan网络

```shell
docker network create -d macvlan \
  --subnet=192.168.2.0/24 \
  --gateway=192.168.2.1 \
  -o parent=enp3s0 \
  vlan
```

- `subnet`：与物理网络相同的子网。
- `gateway`：与物理网络相同的网关。
- `-o parent`：宿主机上的物理网络接口，如 eth0。

## 创建容器并连接到macvlan

```shell
docker run -d --name 容器名 --net vlan --ip=指定的IP地址 镜像名
```

例如

```shell
docker run -it --name busybox --net vlan --ip=192.168.2.166 busybox /bin/sh
```

## docker-compose配置macvlan

```yaml
version: "3"

services:
  busybox:
    ...
    networks:
      vlan:
        ipv4_address: 192.168.2.166


networks:
  vlan:
    external: true
```

容器启动后就可以通过指定的固定ip来访问docker容器中的服务了