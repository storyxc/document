# linux服务器安装OpenOffice踩坑

## 背景
最近公司项目需要做一个在线预览Office文件的功能,尝试了使用OpenOffice把Office文档转化成PDF格式和HTML格式的文件再由前端解析PDF或者直接通过iFrame访问HTML文件的方案,windows系统直接下载安装后cmd运行命令就可以启动openoffice的服务了.服务器就稍微麻烦一点,本文记录了我在自己的阿里云服务器上安装OpenOffice遇到的坑和解决的办法.
解压安装OpenOffice,这个网上搜一下有很多,不再详细记录.可以参考 [linux环境下安装 openOffice 并启动服务](https://www.cnblogs.com/Oliver-rebirth/p/Linux_openOffice.html)

## 遇到的问题
- 找不到Java运行环境
这个问题是因为我服务器上的JDK是解压版本的,虽然配置了JAVA_HOME这些但是openoffice识别不到,后来我就删了这个解压版的JDK,然后用yum命令安装了OpenJDK 1.8,命令:`yum install openjdk 1.8`重新配置了JAVA_HOME后解决了这个报错
- 找不到libXext.so.6
/opt/openoffice4/program/下缺少libXext.so.6文件  运行`yum install libXext.X86_64`. 这个是64位linux的版本,32位的系统需要改成对应的版本
- no suitable windowing system found existing
运行`yum groupinstall "X Window System"`,我在运行这个命令的时候,又碰到了另一个报错:**no packages in any requested group available to install or update**, 这里命令后面要加上一些参数,执行`yum groupinstall "X Window System" --setoptgroup_package_type=mandatory.default.optional`

解决报错后,再重新执行启动服务的命令 `nohup ./soffice -headless -accept="socket,host=127.0.0.1,port=8100;urp;" -nofirststartwizard &`

执行后可以使用netstat命令查看8100端口的占用情况`net stat -lnp|grep 8100` 可以看到soffice.bin就说明服务成功启动了

然后启动测试的demo后发现,office文件转换成PDF后中文出现乱码,这是因为服务器上没有中文字体,用ftp工具把windows的中文字体直接传到服务器上的/usr/share/fonts文件夹中,清除缓存后重新启动openoffice服务后就能正确显示中文了.