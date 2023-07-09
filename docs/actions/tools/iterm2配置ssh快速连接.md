# iterm2配置ssh快速连接

macos生态的ssh工具有很多，但是试了很多还是感觉很差劲，不如windows生态的mobaxterm和xshell，可惜这两个软件没有mac的版本。不过iterm2作为mac生态下的终端工具代表倒是很简洁方便，但是没有专门的ssh工具那种简易的远程连接配置，需要自己动手折腾一下才可以。



## 安装iterm2

官网下载，不赘述。

## 配置profile

1. `command+,`打开偏好设置，选择profiles![image-20211120112843166](https://storyxc.com/images/blog//image-20211120112843166.png)

2. 新建一个profile设置，将command设置从login shell改为command，并输入需要执行的ssh指令

   ![image-20211120113120836](https://storyxc.com/images/blog//image-20211120113120836.png)

3. 切换到advanced选项卡，选择编辑triggers触发器。新增一个触发器，action选择send text，触发的表达式改为`root@xxx.xxx.xxx.xxx's password`，参数改为登陆账户的密码+`\n`，这里注意一定要加\n代表输入回车，不然就会卡在输入密码那里需要手动回车才能登陆，然后勾选上instant立即触发。

   

   ![image-20211120113408181](https://storyxc.com/images/blog//image-20211120113408181.png)



​	

​		![image-20211120114241239](https://storyxc.com/images/blog//image-20211120114241239.png)	

这里触发器的表达式即是输入ssh命令时，服务器给出的需要输入密码的提示文字，所以想配置什么服务器的触发器直接改个登陆名和服务器地址就可以

![image-20211120114556561](https://storyxc.com/images/blog//image-20211120114556561.png)





## 测试

配置完毕后，可以根据菜单栏的profiles选项卡，选择需要连接的服务器即可

![image-20211120114848453](https://storyxc.com/images/blog//image-20211120114848453.png)

![image-20211120114946181](https://storyxc.com/images/blog//image-20211120114946181.png)

