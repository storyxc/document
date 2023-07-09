# Linux私钥登陆提示server refused our key



## 背景

家庭内网装了个物理机的Ubuntu server，用的最新版本的22.04，然后用windows端的mobaxterm和navicat使用ssh私钥连接内网服务器时返回了`Server refused our key`的异常



## 问题原因

`openssh 8.8`开始默认禁用了使用`SHA-1`哈希算法的`RSA`签名,看了一下ubuntu server 22.04的默认openssh版本：

```shell
➜  ~ ssh -V
OpenSSH_8.9p1 Ubuntu-3, OpenSSL 3.0.2 15 Mar 2022
```



> https://www.openssh.com/txt/release-8.8
>
> This release disables RSA signatures using the SHA-1 hash algorithm
> by default. This change has been made as the SHA-1 hash algorithm is
> cryptographically broken, and it is possible to create chosen-prefix
> hash collisions for <USD$50K [1]

## 解决方案

```shell
vim /etc/ssh/sshd_config

# 添加配置
PubkeyAcceptedKeyTypes +ssh-rsa


systemctl restart sshd
```

