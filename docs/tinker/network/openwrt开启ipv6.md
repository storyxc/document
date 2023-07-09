# openwrt开启ipv6



## 背景

由于移动宽带没有公网ip，玩儿pt上传上不去，所以考虑开启ipv6提速





## 具体操作



### 全局网络选项中清除IPv6 ULA前缀

![image-20220510221313367](https://storyxc.com/images/blog/image-20220510221313367.png)

### 获取IPv6地址改为自动

![image-20220510221440677](https://storyxc.com/images/blog/image-20220510221440677.png)

![image-20220510221714830](https://storyxc.com/images/blog/image-20220510221714830.png)

### DHCP/DNS中取消禁止解析IPv6 DNS记录的勾选

![image-20220510221817531](https://storyxc.com/images/blog/image-20220510221817531.png)

### 重启openwrt