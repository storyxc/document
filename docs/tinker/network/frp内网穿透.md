# frp内网穿透

家庭服务器由于是移动宽带（大内网），没有办法申请公网ip，这样不在家的时候就无法进行服务器管理了。如果有公网ip，可以使用ddns，也可以用花生壳这类内网穿透工具。或者自己有一台有公网ip的云主机，可以通过frp应用来实现内网穿透。frp仓库地址：`https://github.com/fatedier/frp`



## frp使用

具体使用可以查看[frp使用文档](https://gofrp.org/docs/)，这里介绍下我用的场景：带sk校验的安全的ssh连接

在云主机上部署fprs，配置如下：

```ini
[common]
bind_addr = 0.0.0.0
bind_port = 7000

token = xxx
```

```shell
cat > /etc/systemd/system/frps.service <<EOF
[Unit]
Description=frps
After=network.target
[Service]
Type=simple
ExecStart=/usr/bin/frps -c /etc/frps/frps.ini
Restart=on-failure
[Install]
WantedBy=multi-user.target
EOF
```

- 在需要暴露到内网的机器A上部署 frpc，配置如下：

```ini
[common]
server_addr = x.x.x.x
server_port = 7000
token = xxx

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6001

[secret_ssh]
type = stcp
# 只有 sk 一致的用户才能访问到此服务
sk = abcdefg
local_ip = 127.0.0.1
local_port = 22
```

在需要访问内网的机器上执行命令连接内网服务，例如用户为root

`ssh -oPort=6001 root@x.x.x.x`



- 在需要访问内网的机器B上部署frpc，配置如下：

```ini
[common]
server_addr = x.x.x.x
server_port = 7000
token = xxx

[secret_ssh_visitor]
type = stcp
# stcp 的访问者
role = visitor
# 要访问的 stcp 代理的名字
server_name = secret_ssh
sk = abcdefg
# 绑定本地端口用于访问 SSH 服务
bind_addr = 127.0.0.1
bind_port = 6000
```

在需要访问内网的机器上执行命令连接内网服务，例如用户为root

`ssh -oPort 6000 root@127.0.0.1`

如果内网机器开启了密钥登录，则需要指定内网服务器的私钥文件

`ssh -oPort 6000 -i identityFile root@127.0.0.1`
