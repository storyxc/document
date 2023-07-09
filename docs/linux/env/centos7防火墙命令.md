# centos7防火墙命令

centos7.0以上的版本默认为firewalld，以下是iptables，整理一下命令备用。



## firewall-cmd

### 查看防火墙状态

```bash
firewall-cmd --state
```

### 查看防火墙规则

```bash
firewall-cmd --list-all
```

### 更新防火墙规则

```bash
firewall-cmd --reload
```

### 关闭/开启防火墙

```bash
systemctl stop firewalld.service
systemctl start firewalld.service
```



### 端口操作

### 永久开放端口

```bash
firewall-cmd --zone=public --add-port=5672/tcp --permanent
```

### 关闭端口

```bash
firewall-cmd --zone=public --remove-port=5672/tcp --permanent
```

### 



## iptables

### 开启/关闭防火墙

```bash
systemctl start iptables.service
systemctl stop iptables.service
```

### 查看防火墙状态

```bash
systemctl status iptables.service
```

### 开放端口

1.命令

```bash
iptables -I INPUT -p tcp --dport 8000 -j ACCEPT
```

2.直接修改/etc/sysconfig/iptables

`-A INPUT -m state --state NEW -m tcp -p tcp --dport 8000 -j ACCEPT　`

### 重启iptables

```bash
service iptables restart
```

