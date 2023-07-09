# Linux设置swap空间

服务器上日常运行着静态博客+云笔记+jenkins的容器，jenkins用于gitee上托管的博客repo的ci/cd。当jenkins进行构建时，内存占用率会急剧升高，轻则容器宕机，重则服务器跟着一起boom。因此需要设置swap来缓解jenkins内存占用瞬时升高的状况。


## 查看磁盘分区

- `df -h`

![image-20220310010316020](https://storyxc.com/images/blog/image-20220310010316020.png)

Filesystem中`/dev/vda1`挂载点为`/`的就是我们的磁盘

> 一般来说swap大小设置规则：
>
> 4G以内RAM，Swap设置为2倍RAM
>
> 4G-8GRAM，Swap设置等于内存大小
>
> 8G-64G，Swap设置为8G
>
> 64G-256G，Swap设置为16G

## 创建Swap分区文件

我这个是腾讯云4c 4G 80G的机器，这里swap设置为4G：`fallocate -l 4G /swap`

## 启用Swap分区

修改权限使文件只能root访问：`chmod 600 /swap`

将文件标记为swap空间：`mkswap /swap`

启用swap文件：`swapon /swap`

验证交换是否可用：`swapon --show`

## 持久化swap挂载
备份fstab：`cp /etc/fstab /etc/fstab.bak`

添加一条记录： `echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab`

## 调整Swap设置
- swappiness

调整Swappiness参数，该参数主要配置系统将数据从RAM交换到交换空间的频率。该参数的值是介于0和100之间的百分比。范围在0到100之间。 低参数值会让内核尽量少用交换，更高参数值会使内核更多的去使用交换空间。

查看当前swappiness值：`cat /proc/sys/vm/swappiness`

临时修改，重启失效：`sysctl vm.swappiness=10`

永久设置：`vim /etc/sysctl.conf`，最后一行加上`vm.swappiness=10`，保存并退出。`sysctl -p `立即生效


- vfs_cache_pressure
表示强制Linux VM最低保留多少空闲内存（Kbytes）。当可用内存低于这个参数时，系统开始回收cache内存，以释放内存，直到可用内存大于这个值。
查看 `cat /proc/sys/vm/vfs_cache_pressure`
缺省值100表示内核将根据pagecache和swapcache，把directory和inode cache保持在一个合理的百分比；降低该值低于100，将导致内核倾向于保留directory和inode cache；增加该值超过100，将导致内核倾向于回收directory和inode cache。

`vim /etc/sysctl.conf`，最后一行加上`vm.vfs_cache_pressure=50`