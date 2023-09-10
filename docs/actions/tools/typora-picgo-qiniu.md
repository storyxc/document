# Typora、PicGo、七牛云实现markdown图片自动上传图床



## 背景

由于最近刚把博客迁到VuePress上来，写博客从原来自己博客项目自定义的web端Markdown编辑器换回了原来的**Typora**，这个文本编辑工具虽然很好用，但是在markdown中插入图片的时候就会碰到比较烦的问题，可能随便截了个图放在桌面了，在markdown中引入的话还要先把图片放到vuepress项目的静态资源文件夹里面。原来我自己开发的博客编辑器是通过axios调用后台接口把图片传到七牛云图床上去，现在换了博客框架原来的方案不好使了。之前typora也没有这方面的支持。不过我发现typora更新之后也支持了添加图片后的事件触发。

![image-20210410202031986](https://storyxc.com/images/blog//image-20210410202031986.png)

选项还是很多样的，为typora点赞。



这里我还是选择了上传到图床，上传支持PicGo和自定义脚本，本来打算写个python脚本的，后来发现picgo这个应用也很好用，那就直接拿过来用吧。

## 配置picgo

### 通过gui配置

#### 1.下载picgo

点击[PicGo](https://github.com/Molunerfinn/PicGo) 进入仓库下载，这里选择windows版的执行程序，下载之后打开

#### 2.申请七牛云账号配置存储空间

没有图床的可以搜一下相关教程，这里不再赘述

#### 3.配置图床信息

![image-20210410202814211](https://storyxc.com/images/blog//image-20210410202814211.png)

![image-20210413020009764](https://storyxc.com/images/blog//image-20210413020009764.png)

选择七牛云图床、或者自己选择其他图床也许，按照自己情况来。

- 七牛云的AccessKey和SecretKey在七牛云的密钥管理界面
- 储存空间名就是自己的对象存储里面的具体某个空间名
- 访问网址如果你有配自定义的cdn就填cdn，如果没有那就是原生的地址，在空间概览页面，不要忘了加上协议http://或者https://
- 存储区域指的是华南华北这些地区对应的编号，具体对应值见下图，比如我是华南，存储区域就填z2
- 设置完成后不要忘记点一下设为默认图床，否则默认不会用七牛云的，其他图床同理

![image-20210410203157833](https://storyxc.com/images/blog//image-20210410203157833.png)

#### 4.回到typora测试一下吧

![image-20210410203327770](https://storyxc.com/images/blog//image-20210410203327770.png)

![image-20210410203412022](https://storyxc.com/images/blog//image-20210410203412022.png)

先验证一下，可以看到成功了。这样再在typora中添加图片就可以看到图片会自动上传到你的图床并修改markdown中的地址了。

### 通过picgo-core配置

npm安装picgo-core：`npm install -g picgo`

配置uploader：`picgo set uploader`

使用uploader：`picgo use uploader`

> 配置文件地址为~/.picgo/config.json，可以手动修改

配置完成后在typora中配置自定义命令上传，命令格式 `node_path picgo_path upload`例如我的是`/opt/homebrew/bin/node /opt/homebrew/bin/picgo upload`

![image-20220214180934655](https://storyxc.com/images/blog/image-20220214180934655.png)

验证上传选项，看到返回图片地址即可