# VMWare虚拟机的几种网络连接模式

## 简单结论

- 桥接模式：虚拟网络内的虚拟机都可以互相访问且能与物理机及外网设备访问，相当于一台独立的主机
- NAT模式：外网设备都无法访问虚拟机，但是虚拟机可以访问
- 仅主机模式：虚拟机无法访问外网，只能和宿主机通信



安装完VMWare后，会自动生成两个虚拟网卡：

- VMnet1：host网卡，用于host方式连接网络
- VMnet8：NAT网卡，用于NAT方式连接网络，ip地址是随机生成的



## 区别

### 桥接模式

桥接模式分为两种模式：

- 直接把虚拟机的网卡接到物理网络，这种方法是虚拟机的网卡直接与物理机网卡进行通信
  - 不推荐，有时候可能虚拟机无法连接到互联网
- 选择特定虚拟网络，选择在虚拟网络编辑器中配置的桥接模式网卡，这种方法是通过一个虚拟网络进行桥接，相当于在**虚拟网卡**和**物理机网卡**之间加了一个虚拟网络VMnet0，VMnet0可以选择桥接的网卡是有线网卡还是无线网卡，如果物理机使用无线网卡上网，选择了有线网卡，虚拟机就无法上网，一般选择自动，让VMnet0自动选择能上网的网卡。

桥接是虚拟机的网卡直接把数据包交给物理机的物理网卡进行处理，虚拟机必须有自己的ip、dns、网关信息

![image-20220421232404355](https://storyxc.com/images/blog/image-20220421232404355.png)



### NAT模式

NAT（Network Address Translation），网络地址转换，相当于在虚拟机和物理机之间添加了一个交换机，拥有NAT地址转换功能，能够自动把虚拟机的IP转换为与物理机在同一网段的IP。VMnet8是NAT模式，自带DHCP功能，能给虚拟机分配IP地址。能够实现虚拟机和物理机相互通信，虚拟机和外网通信，但是不能外网到虚拟机通信，如果想让虚拟机作为服务器不能选择该模式。

> *DHCP*（动态主机配置协议）是一个局域网的网络协议。指的是由服务器控制一段IP地址范围，客户机登录服务器时就可以自动获得服务器分配的IP地址和子网掩码。

![image-20220421232842082](https://storyxc.com/images/blog/image-20220421232842082.png)

### 仅主机模式

内部虚拟机连接到一个可提供 DHCP 功能的虚拟网卡VMnet1上去，VMnet1相当于一个交换机，将虚拟机发来的数据包转发给物理网卡，但是物理网卡不会将该数据包向外转发。所以仅主机模式只能用于虚拟机与虚拟机之间、虚拟机与物理机之间的通信。

![image-20220421232923906](https://storyxc.com/images/blog/image-20220421232923906.png)

### LAN区段

相当于模拟出一个交换机或者集线器出来，把不同虚拟机连接起来，与物理机不进行数据交流，与外网也不进行数据交流，构建一个独立的网络。没有 DHCP 功能，需要手工配置 IP 或者单独配置 DHCP 服务器。

![image-20220421232954352](https://storyxc.com/images/blog/image-20220421232954352.png)







## nat模式连不上网的解决

1. vmware编辑-> 虚拟网络编辑器重建nat网络，把之前的删掉，新建的同样选择VMnet8
2. 如果还不能启动，去windows服务里查看`VMware DHCP Service`、`VMware NAT Service`、`VMware Workstation Server`服务开启，如果处于停止状态则启动，此外，要把VMnet8的ipv4地址和dns设置为自动获取