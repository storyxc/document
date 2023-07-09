# windows挂载webdav的问题处理

## 背景

home server里开着阿里云盘的webdav容器，想要在pc的windows中挂载，之前用的RaiDriver这个软件，但是开机启动总弹广告，遂弃用。用windows原生的挂载方式，直接在资源管理器中右键选择`添加一个网络位置`，填写http的webdav服务地址+端口后提示`输入的文件夹似乎无效`。



## 解决方案

出现这个提示是因为windows本身的权限控制，可以在注册表中修改相关配置。

具体操作：

- 修改注册表`\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters`下`BasicAuthLevel`的值为`2`

- 在服务中把WebClient启动，并把启动类型改为`自动`

然后就可以在资源管理器中再次尝试添加网络位置，输入ip+端口即可。