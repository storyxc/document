# 安装PVE虚拟机并在PVE安装truenas



## 安装PVE

### 制作系统安装盘

1. 下载rufus
2. 下载pve最新镜像
3. rufus选择镜像并刷写到自己的U盘中

:::warning

一般的系统选择iso镜像模式写入，安装pve需要选择dd镜像模式写入

:::

### 安装系统

等待刷写完毕按照正常U盘安装系统流程安装，注意ip网关等配置即可



## PVE中安装Truenas Scale

### 上传iso镜像

官网下载truenas scale系统镜像，打开pve的配置地址，点击上传后选择下载好的镜像文件并上传

![image-20220424104118496](https://storyxc.com/images/blog/image-20220424104118496.png)

## 创建虚拟机

![image-20220424104248209](https://storyxc.com/images/blog/image-20220424104248209.png)

操作系统选择刚上传的镜像

![image-20220424104316127](https://storyxc.com/images/blog/image-20220424104316127.png)

系统tab页默认即可，磁盘这里要注意**总线/设备选择sata0，磁盘大小选择16即可，这里是分了一个虚拟的系统盘，不需要太大，因为truenas系统的系统引导盘和存储是分开的，分的太大在truenas中也无法用于存储**

![image-20220424104359163](https://storyxc.com/images/blog/image-20220424104359163.png)

cpu根据情况设置，内存最小8G，建议尽可能大，truenas scale官方建议最好16G，因为truenas的文件系统很依赖内存。

### 安装truenas

启动刚创建的虚拟机，在选择系统安装盘界面按空格选中刚分配的16G磁盘，选择ok即可

![image-20220424104822972](https://storyxc.com/images/blog/image-20220424104822972.png)

然后输入root密码，安装完后选择3重启

![image-20220424104905506](https://storyxc.com/images/blog/image-20220424104905506.png)

随后等待系统安装完毕

![image-20220424104940291](https://storyxc.com/images/blog/image-20220424104940291.png)

输入9选择关机

### 给truenas分配存储盘

1. 最简单的办法，直接添加虚拟硬盘

![image-20220424105115934](https://storyxc.com/images/blog/image-20220424105115934.png)

总线这里序号会默认自增，存储选择磁盘，我这里是只有一个固态硬盘，磁盘大小根据实际情况选择即可，添加即完成了虚拟硬盘的添加。

![image-20220424105147413](https://storyxc.com/images/blog/image-20220424105147413.png)



2. 硬盘直通

   1）直通单个硬盘

   因为我这台测试机器只有一个固态硬盘，pve系统也装在这上面，所以无法用硬盘的直通，如果有多个机械盘，想直通给truenas，可以使用以下命令
   
   ```shell
   ls -l /dev/disk/by-id # 查看硬盘名称
   ```
      ![image-20220424105554763](https://storyxc.com/images/blog/image-20220424105554763.png)

   这里sda对应就是我的唯一一个硬盘，后面的sda1、2、3都是分区，可以忽略，记录下磁盘名称ata-WDC_WD10EZEX-08WN4A0_WD-WCC6Y6EDC1NT，执行命令进行直通
   
   ```shell
   qm set 100 -sata1 /dev/disk/by-id ata-WDC_WD10EZEX-08WN4A0_WD-WCC6Y6EDC1NT
   ---
   返回
   update VM 100: -sata1 /dev/disk/by-id ata-WDC_WD10EZEX-08WN4A0_WD-WCC6Y6EDC1NT 
   ```
   
   看到这个返回信息即为直通成功，回到虚拟机下面可以看到已经新增了一个sata硬盘
   
   命令拆解：
   
   ```shell
   qm set vm编号 -总线编号 磁盘路径
   - vm编号为pve虚拟机中的编号，例如100，101，102等
   - 总线编号为指定编号下要新增的硬盘总线编号，例如虚拟机下只有一个硬盘sata0，要新增的就是sata1，这里就要填sata1
   - 磁盘路径 就是/dev/disk/by-id/ + 我们上一步保存的硬盘名称
   ```
   
   2）添加PCI设备，直通sata控制器
   
   **Proxmox VE(PVE)系统直通SATA Controller(SATA 控制器)，会把整个sata总线全部直通过去，就是直接将南桥或者直接把北桥连接的sata总线直通，那么有些主板sata接口就会全部被直通。**
   
   :::warning
   
   如果PVE系统安装在sata硬盘中，会导致PVE无法启动，所以在直通sata控制器前要确认自己的PVE系统安装位置，或者直接安装到NVMe硬盘中
   
   :::

​		![image-20220425090446637](https://storyxc.com/images/blog/image-20220425090446637.png)

3. 删除直通设备

`qm set vm编号 -delete 设备名`，例如要删除设备ID为100的虚拟机下直通的sata1

那就是`qm set 100 -delete sata1`
