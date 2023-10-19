# 服务器启用ssh密钥登录并禁用密码登录



> There were 89 failed login attempts since the last successful login.

最近登录阿里云服务器，总是发现有人恶意尝试登录，虽然密码强度很高，但是看着就闹心，索性把密码登录给ban掉改用密钥登录。



## 生成密钥对

```bash
cd ~/.ssh
ssh-keygen -t rsa -C "邮箱地址"
```

此时会在/root/.ssh下生成id_rsa和id_rsa.pub的私钥和公钥

## 服务器安装公钥
使用`ssh-copy-id`命令将公钥拷贝到服务器上
> 把本地的ssh公钥文件安装到远程主机对应的账户下,ssh-copy-id命令 可以把本地主机的公钥复制到远程主机的authorized_keys文件上，ssh-copy-id命令也会给远程主机的用户主目录（home）和~/.ssh, 和~/.ssh/authorized_keys设置合适的权限。
> ssh-copy-id 用来将本地公钥复制到远程主机。如果不传入 -i 参数，ssh-copy-id 使用默认 ~/.ssh/identity.pub 作为默认公钥。如果多次运行 ssh-copy-id ，该命令不会检查重复，会在远程主机中多次写入 authorized_keys 。

```bash
ssh-copy-id [-i identify_file] [user@]host
```

### 修改ssh登录设置

```bash
vim /etc/ssh/sshd_config

RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication yes #密码登录 此时不要关闭
```

修改并保存，重启sshd服务`systemctl restart sshd`

## 设置私钥权限
id_rsa文件权限需要调整，否则使用密钥登录会因为私钥文件权限问题被拒绝。

一般来说：
.ssh目录设置700权限
id_rsa,authorized_keys文件设置600权限
id_rsa.pub,known_hosts文件设置644权限

## 修改登录命令

登录使用`ssh -i "私钥文件全路径" root@xxx.xxx.xxx.xxx`

## 尝试登录

![image-20211218211917959](https://storyxc.com/images/blog//image-20211218211917959.png)



登录成功

## 关闭云服务器

密钥登录成功后即可关闭服务器的密码登录

```bash
vim /etc/ssh/sshd_config

PasswordAuthentication no #关闭密码登录
```

保存后重启sshd服务`systemctl restart sshd`



## 尝试密码登录

![image-20211218212154923](https://storyxc.com/images/blog//image-20211218212154923.png)

可以看到密码登录已经被关闭

## 手动配置ssh密钥

```shell
adduser username

mkdir /home/username/.ssh
# 编辑authorized_keys文件，将生成的公钥添加进去
vim /home/username/.ssh/authorized_keys

chown -R username:username /home/username.ssh
chmod 700 /home/username/.ssh
chmod 600 /home/username/.ssh/authorized_keys
```

