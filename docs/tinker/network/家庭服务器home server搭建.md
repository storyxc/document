# 家庭服务器home server搭建

一直想搞一台nas玩玩儿，但是看了群晖、威联通这些成品nas低到令人发指的性价比，我最终还是决定diy一台小主机来实现自己的需求。

## 需求分析

### 需求

1. 共享存储
2. Docker服务
3. 跑一些测试程序

### 分析

1. PC上还有块4T的希捷酷鹰，再添3块4T紫盘组raid5阵列。机箱的盘位就至少需要4个以上，挑了一圈就乔思伯N1（5盘位）和万由的810A（8盘位）能看的过去，虽然万由盘位多但是价格比n1高了大几百，目前也用不到这么多盘位，因此机箱确定了n1，主板也要买itx版型。

2. 要跑的docker容器比较多，下载器服务、阿里云的webdav容器、直播录制程序容器等等。。。因此内存需要32G以上。

3. 确定使用的系统是个比较复杂的过程，因为有过PVE虚拟机翻车的经历，这个服务器又主要承载了数据存储功能，所以要追求稳定，因此首先排除PVE和ESXi这些虚拟机系统，直接物理机装系统。然后我在虚拟机上装了最新版的Truenas scale体验了一下，这个系统是基于debian用python开发的，交互上倒没什么问题，但是因为是个纯nas系统，对主系统限制较多，自由度不高（不能直接装软件），因此也被pass，黑群晖这些就不说了，在我看来还不如truenas。一圈排除下来就只能直接装linux server了。去V2EX论坛问了老哥们的意见，推荐debian的很多，也有建议用最熟悉的系统的，最后我选择了后者，选了比较有把握的ubuntu server，正好ubuntu的22.04发行版刚出，就直接安排上了。

## 硬件

经过了好几天的挑选，最终敲定了这套配置

```txt
cpu：i3-10100散片
主板：七彩虹cvn b460i frozen
内存：金士顿16g*2 2666
固态：七彩虹 ssd sata3 128g
cpu散热：超频3刀锋
机械硬盘：西数海康oem紫盘4t*3 
电源：tt 350w sfx电源
机箱+线材：乔思伯n1
扩展卡：乐扩m2转sata3接口扩展卡
```

其中散热、固态是在公司的福利商城购买，cpu、机械硬盘、机箱、扩展卡在淘宝购买，主板、电源在京东购买，内存在咸鱼淘的。不算硬盘花费是2480，加上硬盘3755。



组装完成后：

- 灵魂走线，又不是不能用(doge）

![D55DA0D4-322D-4A49-9634-9DB667BDD7A4_1_105_c](https://storyxc.com/images/blog/D55DA0D4-322D-4A49-9634-9DB667BDD7A4_1_105_c.jpeg)

- 侧面

![6C0A8FED-B95C-4FE5-ACCB-32DD8DF553E8_1_105_c](https://storyxc.com/images/blog/6C0A8FED-B95C-4FE5-ACCB-32DD8DF553E8_1_105_c.jpeg)

![B4E46C72-2CA5-4727-AD52-F3C25F94A74B_1_102_o](https://storyxc.com/images/blog/B4E46C72-2CA5-4727-AD52-F3C25F94A74B_1_102_o.jpeg)

跟其他工业风机箱比起来，乔思伯n1这款颜值还是很不错的。



## 系统搭建

### 操作系统安装

ubuntu官网下载最新版的ubuntu-server-22.04，然后rufus刷写到U盘中，使用U盘引导启动。

安装过程不再赘述，这里记录几个重点步骤：

1. 在配置Ubuntu安装镜像这一步最好选择国内的企业/大学镜像站，不然后面安装可能会在下载时卡住。网易镜像源`http://mirrors.163.com/ubuntu/`，阿里云镜像源`https://mirrors.aliyun.com/ubuntu/`，清华源`https://mirrors.tuna.tsinghua.edu.cn/ubuntu/`
2. 磁盘分区选择自定义，然后根据自己的情况进行分区，我的固态只分了`/`和`/boot`两个区，然后四块4T机械组了raid5。（ubuntu在建立阵列后会立刻进入重建过程，阵列中会有一个分区状态为`spare rebuilding`，其他分区为`active sync`。这个重建过程很久，我4块4T重建总共用了十几个小时，重建完成后阵列下所有分区都会变为`active sync`状态

  ![image-20220501014554319](https://storyxc.com/images/blog/image-20220501014554319.png)

## 基础配置

- 开启root登陆

  ```shell
  sudo vim /etc/ssh/sshd_config
  
  # 添加配置
  PermitRootLogin yes
  
  # 给root修改密码
  sudo passwd root
  
  systemctl restart sshd
  ```

- 启用密钥登陆

​		见另一篇博客 `阿里云服务器启用密钥登陆并禁用密码登陆`

- 时区同步

  `sudo cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime`

## 安装服务

这个部分长期更新XD，一点点补上吧。

### samba文件共享服务

```shell
# 安装samba
sudo apt install samba
# 启动smb
systemctl start smb
# 开机自启
systemctl enable smb

# 创建共享文件夹 设置权限770
mkdir /mnt/data
sudo chmod 770 /mnt/data

# 添加用户和密码
sudo smbpasswd -a 用户名

# 修改配置文件，在文件最后添加共享资源设置
sudo vim /etc/samba/smb.conf

[data]
path = /mnt/data
available = yes
browseable = yes
public = no
writable = yes
valid users = story
```

> samba共享配置详解
>
> [temp]        #共享资源名称
>
> comment = Temporary file space  #简单的解释，内容无关紧要
>
> path = /tmp    #实际的共享目录
>
> writable = yes  #设置为可写入
>
> browseable = yes #可以被所有用户浏览到资源名称，
>
> guest ok = yes  #可以让用户随意登录
>
> public = yes           #允许匿名查看
>
> valid users = 用户名   #设置访问用户
>
> valid users = @组名   #设置访问组
>
> readonly = yes      #只读
>
> readonly = no       #读写
>
> hosts deny = 192.168.0.0    #表示禁止所有来自192.168.0.0/24 网段的IP 地址访问
>
> hosts allow = 192.168.0.24 #表示允许192.168.0.24 这个IP 地址访问
>
> 
>
> [homes]为特殊共享目录，表示用户主目录。
>
> [printers]表示共享打印机。
>
> 
>
> 原文链接：https://blog.csdn.net/l1593572468/article/details/121444812

### Docker安装 

```shell
# Uninstall old versions
sudo apt-get remove docker docker-engine docker.io containerd runc

# Update the apt package index and install packages to allow apt to use a repository over HTTPS:
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
# Add Docker’s official GPG key:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Use the following command to set up the stable repository.
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  
# Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin


systemctl enable docker
```

### 挂载阿里云盘

参考另一篇博客`挂载阿里云盘+开机自动挂载`

### transmission

```shell
 docker run -d \
  --name=transmission \
  -e TRANSMISSION_WEB_HOME=/transmission-web-control/ \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Asia/Shanghai \
  -e USER=<user> \
  -e PASS=<pass> \
  -p 19091:9091 \
  -p 51413:51413 \
  -p 51413:51413/udp \
  -v /mnt/data/docker/transmission/data:/config \
  -v /mnt/data/downloads/others:/downloads/others \
  -v /mnt/data/downloads/tvseries:/downloads/tvseries \
  -v /mnt/data/docker/transmission/watch/folder:/watch \
  -v /mnt/data/downloads/movies:/downloads/movies \
  --restart=always \
  linuxserver/transmission
```

### qbittorrent

```shell
version: "3.2"

services:
  qbittorrent:
    image: nevinee/qbittorrent:4.3.9
    container_name: qbittorrent
    environment:
      - PUID=0
      - PGID=0
      - TZ=Asia/Shanghai
      - WEBUI_PORT=18080
      - BT_PORT=55555
    volumes:
      - /mnt/data/docker/qbittorrent/config:/data
      - /repo:/downloads
    network_mode: host
    restart: unless-stopped
```

### aria2

```shell
docker run -d \
    --name aria2 \
    --restart always \
    --log-opt max-size=1m \
    -e TZ=Asia/Shanghai \
    -e PUID=$UID \
    -e PGID=$GID \
    -e UMASK_SET=022 \
    -e RPC_SECRET=<secret> \
    -e RPC_PORT=16800 \
    -p 16800:16800 \
    -e LISTEN_PORT=16888 \
    -p 16888:16888 \
    -p 16888:16888/udp \
    -v /mnt/data/docker/aria2/config:/config \
    -v /mnt/data/downloads/tvseries:/downloads/tvseries \
    -v /mnt/data/downloads/movies:/downloads/movies \
    -v /mnt/data/downloads/others:/downloads/others \
    p3terx/aria2-pro
```

### jellyfin

```shell
version: "3.2"

services:
  jenkins:
    image: jenkins/jenkins:2.332.3-jdk11
    container_name: jenkins
    environment:
      - TZ=Asia/Shanghai
    user: root
    volumes:
      - /story/dist:/story/dist
      - /mnt/data/docker/jenkins/jenkins_data:/var/jenkins_home
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "8099:8080"
    restart: unless-stopped
```

#### jellyfin硬解

```shell
# 安装驱动
apt install intel-media-va-driver
# 解码支持确认
/usr/lib/jellyfin-ffmpeg/vainfo
```

![image-20230828233842999](https://storyxc.com/images/blog/43b766ec-e5a4-4f1c-a06b-97c4b9eb7924.png)

### kafka

```shell
 wget https://dlcdn.apache.org/kafka/3.1.1/kafka_2.12-3.1.1.tgz
 tar -xzvf kafka_2.12-3.1.1.tgz
```

zookeeper.service

```shell
[Unit]
Description=zookeeper

[Service]
Type=forking
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ExecStart=/usr/local/kafka/bin/zookeeper-server-start.sh -daemon /usr/local/kafka/config/zookeeper.properties
ExecStop=/usr/local/kafka/bin/zookeeper-server-start.sh stop
SyslogIdentifier=zookeeper

[Install]
WantedBy=multi-user.target
```

kafka.service

```shell
[Unit]
Description=kafka
After=zookeeper.service

[Service]
Type=forking
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ExecStart=/usr/local/kafka/bin/kafka-server-start.sh -daemon /usr/local/kafka/config/server.properties
ExecStop=/usr/local/kafka/bin/kafka-server-stop.sh

[Install]
WantedBy=multi-user.target
```

### onedev

```shell
docker run -d \
  --name onedev \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /mnt/data/docker/onedev:/opt/onedev \
  -p 6610:6610 \ # http
  -p 6611:6611 \ # ssh
  --restart=always \
  1dev/server:latest
```

### rabbitmq

```shell
sudo apt install rabbitmq-server

cd /usr/lib/rabbitmq/bin
# 开启rabbit网页控制台 默认端口号15672,重启rabbitmq服务
 ./rabbitmq-plugins enable rabbitmq_management
 
# rabbitmq默认用户guest不允许远程登陆，且systemd默认的启动用户为rabbitmq，可以改为root
cd /lib/systemd/system
vim rabbitmq-server.service
 
# 新建rabbitmq用户
cd /usr/lib/rabbitmq/bin
./rabbitmqctl add_user username password
# 授权
./rabbitmqctl set_user_tags username administrator
./rabbitmqctl set_permissions -p "/" username ".*" ".*" ".*"
 
# 查看、删除、修改密码
./rabbitmqctl list_users
./rabbitmqctl delete_user username
./rabbitmqctl change_password username newpassword
```

### gitea
```yaml
version: "3"

networks:
  gitea:
    external: false

volumes:
  gitea:
    driver: local

services:
  server:
    image: gitea/gitea:1.16.7
    container_name: gitea
    environment:
      - DOMAIN=192.168.2.66
      - HTTP_PORT=6610
      - SSH_PORT=6611
      - SSH_LISTEN_PORT=6611
    restart: always
    networks:
      - gitea
    volumes:
      - gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "6610:6610"
      - "6611:6611"
```
#### gitea webhook allowed host list
```shell
/var/lib/docker/volumes/gitea_gitea/_data/gitea/conf/app.ini

# add the following lines to the end of the file
[webhook]
ALLOWED_HOST_LIST = 192.168.2.66
```

#### gitea and jenkins webhook

In Jenkins: on the job settings page set "Source Code Management" option to "Git", provide URL to your repo (http://gitea-url.your.org/username/repo.git), and in "Poll triggers" section check "Poll SCM" option with no schedule defined. This setup basically tells Jenkins to poll your Gitea repo only when requested via the webhook.

In Gitea: under repo -> Settings -> Webhooks, add new webhook, set the URL to http://jenkins_url.your.org/gitea-webhook/post, and clear the secret (leave it blank).

At this point clicking on "Test Delivery" button should produce a successful delivery attempt (green checkmark).


### kafdrop
```shell
docker run -d --name kafkaui -p 9000:9000 \
    -e KAFKA_BROKERCONNECT="192.168.2.66:9092"\
    -e JVM_OPTS="-Xms32M -Xmx64M" \
    -e SERVER_SERVLET_CONTEXTPATH="/" \
    obsidiandynamics/kafdrop
```

### grafana+prometheus+node_exporter监控linux系统

#### node_exporter

- wget https://github.com/prometheus/node_exporter/releases/download/v1.5.0/node_exporter-1.5.0.linux-amd64.tar.gz

- tar -xvf node_exporter-1.5.0.linux-amd64.tar.gz -C /usr/local/

- mv /usr/local/node_exporter/node_exporter /usr/local/bin

```shell
  
# 编写systemd服务
cat > /etc/systemd/system/node_exporter.service <<EOF
[Unit]
Description=node_exporeter
After=network.target
[Service]
Type=simple
ExecStart=/usr/local/bin/node_exporter
Restart=on-failure
[Install]
WantedBy=multi-user.target
EOF

# 更新内核并启动，自启动
systemctl daemon-reload && systemctl start node_exporter && systemctl enable node_exporter && systemctl status node_exporter

```

#### redis_exporter

- wget https://github.com/oliver006/redis_exporter/releases/download/v1.46.0/redis_exporter-v1.46.0.linux-amd64.tar.gz
- tar -xvf redis_exporter-v1.46.0.linux-amd64.tar.gz
- mv redis_exporter-v1.46.0.linux-amd64/redis_exporter /usr/local/bin

```shell
# 编写systemd服务
cat > /etc/systemd/system/redis_exporter.service <<EOF
[Unit]
Description=redis_exporter
After=network.target
[Service]
Type=simple
ExecStart=/usr/local/bin/redis_exporter -redis.addr ip:port
Restart=on-failure
[Install]
WantedBy=multi-user.target
EOF

# 更新内核并启动，自启动
systemctl daemon-reload && systemctl start redis_exporter && systemctl enable redis_exporter && systemctl status redis_exporter
```

#### grafana+prometheus

docker-compose.yml

```yml
version: "3.8"


services:
  grafana:
    image: grafana/grafana
    container_name: grafana
    restart: unless-stopped
    ports:
      - 3000:3000
    user: root
    volumes:
      - /root/monitor/grafana/conf:/etc/grafana/
    environment:
      - TZ=Asia/shanghai
  prometheus:
    image: prom/prometheus
    container_name: prometheus
    restart: unless-stopped
    ports:
      - 9090:9090
    volumes:
      - /root/monitor/prometheus:/etc/prometheus
    environment:
      - TZ=Asia/shanghai
```

prometheus.yml

```yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s


scrape_configs:
  - job_name: "linux"
    scrape_interval: 5s
    static_configs:
      - targets: ["192.168.2.66:9100"]
```

grafana.ini 从空白容器里复制出一份

```ini
docker cp grafana:/etc/grafana.ini ~/
```

grafana监控大盘模板

`https://grafana.com/api/dashboards/12633/revisions/1/download`