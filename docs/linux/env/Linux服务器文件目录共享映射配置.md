# Linux服务器文件目录共享映射配置

使用场景：由于公司没有单独的文件服务器/nas之类的共享存储，图片之类的也没有上云，目前业务中上传的文件也是放在应用服务器当中的。生产环境都是高可用的多节点部署，这样就会产生问题。比如用户上传一张图片，请求被分发到A服务器中，由于图片访问的域名是统一的B服务器域名，上传完成后用B服务器的域名去访问静态文件就会404。后续我们考虑搭建fastdfs来统一管理文件。目前的临时解决方案是通过配置服务器共享目录来实现文件在多个节点服务器间的同步。



## 准备工作

- 环境：CentOS 7.6

- 分别在A、B两台服务器上安装nfs和rpcbind
  - `yum install nfs-utils rpcbind`

## server配置

比如我们的静态资源存储在B服务器，则需要把B服务器的目录暴露出来，共享给A服务器，让A服务器挂载该目录。

- 在B服务器（提供资源的服务器）上修改/etc/exports文件，把指定的目录暴露给A服务器并分配权限

  ```bash
  # /需要暴露的目录 A服务器IP（rw,async,no_root_squash)
  /data/images 192.168.111.1(rw,async,no_root_squash)
  ```

- 修改完后需要使配置立即生效，执行`exportfs -arv`命令

- 关闭防火墙/端口111(tcp/udp)、2049(tcp)、4046(udp)向指定ip开放

## 启动nfs服务和rpcbind服务

- `service rpcbind start`
- `service nfs start`

## 在A服务器中挂载远程目录

执行命令：`mount -o rw -t nfs B服务器IP:/B服务器暴露的路径 /要映射的本机(A服务器)的路径`

例如：`mount -o rw -t nfs 192.168.111.2:/data/images /data/images`

## 验证

可以在A服务器的/data/images下上传一些文件，然后看B服务器中的/data/images目录中是否同步，如果同步了则说明挂载成功，共享目录就配置完成了。