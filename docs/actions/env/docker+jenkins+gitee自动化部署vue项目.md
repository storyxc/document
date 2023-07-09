# docker+jenkins+gitee自动化部署vue项目

之前[个人博客](https://blog.storyxc.com)一直用的travisCI部署在github page上，但是偶尔会抽风无法访问。之前一直偷懒没部署jenkins，手动部署到云服务器又比较麻烦，打包上传很浪费时间，这次就直接动手一步到位，在自己服务器上部署下jekins。



## docker启动jenkins

- 启动容器

最开始用的jenkins中文社区的镜像发现有个很恶心的问题，jenkins版本比较低而且安装了NodeJS插件后在全局工具配置中配置NodeJS安装环境时无法选择版本，所以还是官方镜像比较靠谱。

```bash
# 拉取官方镜像
docker pull jenkins/jenkins:lts
lts: Pulling from jenkins/jenkins
4c25b3090c26: Pull complete
750d566fdd60: Pull complete
2718cc36ca02: Pull complete
5678b027ee14: Pull complete
c839cd2df78d: Pull complete
50861a5addda: Pull complete
ff2b028e5cf5: Pull complete
ee710b58f452: Pull complete
2625c929bb0e: Pull complete
6a6bf9181c04: Pull complete
bee5e6792ac4: Pull complete
6cc5edd2133e: Pull complete
c07b16426ded: Pull complete
e9ac42647ae3: Pull complete
fa925738a490: Pull complete
4a08c3886279: Pull complete
2d43fec22b7e: Pull complete
Digest: sha256:a942c30fc3bcf269a1c32ba27eb4a470148eff9aba086911320031a3c3943e6c
Status: Downloaded newer image for jenkins/jenkins:lts
docker.io/jenkins/jenkins:lts
# 启动jenkins
docker run --name jenkins -dp 8099:8080 -v /story/dist:/story/dist -v ~/jenkins_data:/var/jenkins_home -u root  -e TZ="Asia/Shanghai" -v /etc/localtime:/etc/localtime:ro jenkins/jenkins:lts
# 参数说明 --name 指定容器名为jenkins -d 后台启动 -p 将容器的8080端口映射到宿主机的8099端口
# -v 挂载宿主机目录 宿主机和容器的目录会同步 -u 指定用户为root 这里是必须的 不然后续操作文件系统会报无权限
# 挂载时区的目录是因为镜像中的linux系统默认时区非北京时间，会导致时间显示不正确
```

- 启动后直接访问本机8099端口：http://localhost:8099/（我这里是本地测试，实际请替换成自己的服务器地址）

## apt安装

```shell
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" > /etc/apt/sources.list.d/jenkins.list'

sudo apt update

# Jenkins requires Java 11 or 17 since Jenkins 2.357 and LTS 2.361.1. 
apt install openjdk-17-jdk

sudo apt install jenkins
```



![image-20210914101747191](https://storyxc.com/images/blog//image-20210914101747191.png)

- 进到容器中查询下密码

```bash
docker exec -it jenkins /bin/bash
cat /var/jenkins_home/secrets/initialAdminPassword
```

或者直接在上面挂载的目录查询但要改一下路径

```bash
cat ~/jenkins_data/secrets/initialAdminPassword
```

- 使用密码登录后直接安装推荐插件即可

![image-20210914102028448](https://storyxc.com/images/blog//image-20210914102028448.png)

- 等待安装完成

![image-20210914102652130](https://storyxc.com/images/blog//image-20210914102652130.png)

- 新建账户

![image-20210914102716607](https://storyxc.com/images/blog//image-20210914102716607.png)

- 实例配置

  ![image-20210914102906576](https://storyxc.com/images/blog//image-20210914102906576.png)

- 完成

  ![](https://storyxc.com/images/blog//image-20210914102924807.png)

## jenkins配置自动部署

### 安装node和gitee插件

Manage Jenkins ---> Manage Plugins ---> 可选插件分别搜索gitee和nodejs
![image-20210914111457469](https://storyxc.com/images/blog//image-20210914111457469.png)

![image-20210914111526455](https://storyxc.com/images/blog//image-20210914111526455.png)

选择install without restart

安装完毕后返回工作台

### 配置node环境

Manage Jenkins ---> Global Tool Configuration ---> NodeJS

新增NodeJS取别名后保存即可

![image-20210914111718160](https://storyxc.com/images/blog//image-20210914111718160.png)

## 新建自动部署任务

### 新建任务

工作台点击新建Item，输入任务名称后选择freestyle project确定

![image-20210914111819597](https://storyxc.com/images/blog//image-20210914111819597.png)

### 配置gitee相关内容

#### 源码管理

- 添加gitee仓库地址，指定要打包的分支

![image-20210914112017978](https://storyxc.com/images/blog//image-20210914112017978.png)

#### 构建触发器

![image-20210914112740392](https://storyxc.com/images/blog//image-20210914112740392.png)



- 生成webhook密码

![image-20210914112804397](https://storyxc.com/images/blog//image-20210914112804397.png)

- 去gitee仓库中配置webhook内容

  仓库的管理tab页添加webhook

  ![image-20210914112946461](https://storyxc.com/images/blog//image-20210914112946461.png)

url和webhook密码分别填写后保存

![image-20210914113229679](https://storyxc.com/images/blog//image-20210914113229679.png)

在这个页面点击测试，如果看到xxx has been accepted即为成功。

#### 构建环境

选择前面已经配置好的node环境即可

![image-20210914113502188](https://storyxc.com/images/blog//image-20210914113502188.png)

#### 构建

首先在任务面板中点击立即构建，这样才会生成工作空间

![image-20210914114129450](https://storyxc.com/images/blog//image-20210914114129450.png)



我这里选择执行shell

![image-20210914113546293](https://storyxc.com/images/blog//image-20210914113546293.png)



然后就是写个简单的脚本执行打包，替换的工作

![image-20210914113643970](https://storyxc.com/images/blog//image-20210914113643970.png)

**第一步cd进入的目录是当前任务的工作空间，这里要把vuepress替换成自己的任务名称即可**



::: tip

这里涉及到文件系统操作的内容rm cp等命令需要root用户才能执行，所以在启动docker容器的时候必须使用-u root参数指定root用户，否则打包会失败，操作文件时会提示无权限

::::

配置完毕保存即可



## 测试

点击立即构建或者往gitee仓库推送一次更新即可触发构建任务，然后等待构建完成即可。

![image-20210914114542885](https://storyxc.com/images/blog//image-20210914114542885.png)

如果是第一次执行构建，jenkins还会自动安装解压nodejs。

通过脚本替换完打包好的dist后，通过nginx配置部署静态项目即可。

## jenkins打包跨平台docker镜像并推送镜像仓库

这里是用宿主机直接安装的jenkins

- 把jenkins用户添加到docker组中然后重启jenkins：`sudo usermod -aG docker jenkins`

  > getent group groupname 查看组中有哪些用户

- shell

```shell
#!/bin/sh
cd /var/lib/jenkins/workspace/xxx
node -v
npm -v
docker -v

npm install
npm run build
docker buildx ls
docker buildx create --use --name jenkinsbuilder
docker buildx ls

# Dockerfile
cat > Dockerfile <<EOF
// doSomething
EOF

docker login xxx.com --username='xxx' --password=='xxx'
docker buildx build --platform linux/amd64,linux/arm64 -t xxx/xxx . --push
```

