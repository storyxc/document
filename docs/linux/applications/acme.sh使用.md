# acme.sh使用

## 背景

服务商目前都停止了签发1年有效期的SSL证书，有效期都缩短至3个月，这给多个域名管理带来极大不便。

## acme.sh项目

> https://github.com/acmesh-official/acme.sh

`acme.sh`项目是一个纯shell脚本的ACME(Automatic Certificate Management Environment)客户端协议实现，能够帮助我们自动签发以及更新证书。

## acme.sh使用

> https://github.com/acmesh-official/acme.sh/wiki

### 安装

`curl https://get.acme.sh | sh -s email=my@example.com`

### 签发证书

> https://github.com/acmesh-official/acme.sh/wiki/How-to-issue-a-cert

> **ACME-challenge**
>
> **ACME-challenge** 是 ACME 协议中的一部分，旨在验证用户对某个域名的控制权。ACME 协议支持多种验证方式，其中 HTTP-01 是最常用的一种，涉及到 .well-known/acme-challenge。
>
> 当用户请求证书时，证书颁发机构 (CA) 需要确认申请人对该域名的控制权。这是通过向 CA 提供某种形式的“挑战”并成功响应它来完成的。ACME-challenge 验证方式包括：
>
> 1.**HTTP-01 验证**：通过 HTTP 请求验证域名的所有权。
>
> 2.**DNS-01 验证**：通过 DNS 记录验证域名的所有权。
>
> 3.**TLS-ALPN-01 验证**：通过特定的 TLS 握手协议验证域名的所有权。
>
> 其中最常用的是 **HTTP-01** 验证，通过 .well-known/acme-challenge 目录进行。
>
> •HTTP-01 验证要求服务器通过 HTTP（端口 80）公开访问验证文件，因此服务器需要监听 HTTP 请求。如果所有流量都强制重定向到 HTTPS，可能会导致验证失败。你可以专门为验证请求保留对 HTTP 的访问权限（即通过 Nginx 配置保留 .well-known/acme-challenge/ 目录的请求）。
>
> •验证文件只能通过 HTTP 访问，不能通过 HTTPS，因此确保 .well-known/acme-challenge 路径上的请求不会被重定向。

#### nginx模式

`acme.sh  --issue  -d example.com  --nginx`

`acme.sh  --issue  -d example.com  --nginx /etc/nginx/nginx.conf`

`acme.sh  --issue  -d example.com  --nginx /etc/nginx/conf.d/example.com.conf`



如果配置了强制https，需要修改vhost的配置

```nginx
server {
    listen      80;
    listen      [::]:80;
    server_name domain.com;

    return 301 https://$host$request_uri;
}
为
server {
    listen      80;
    listen      [::]:80;
    server_name domain.com;

    location / {
    		return 301 https://$host$request_uri;
		}
}

```

随后，acme.sh会自动在server配置上增加关于.well-knwon/acme-challenge的location配置,验证完成后自动恢复原本的配置文件

```nginx
# HTTP redirect
server {
    listen      80;
    listen      [::]:80;
    server_name domain.com;
#ACME_NGINX_START
location ~ "^/\.well-known/acme-challenge/([-_a-zA-Z0-9]+)$" {
  default_type text/plain;
  return 200 "xxxxxxxxxxxxxx";
}
#NGINX_START


    # 其他请求仍然重定向到 HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}
```

#### dns模式

以我用的dnspod为例

```shell
export DP_Id="123"
export DP_Key="abcd"
acme.sh --issue --dns dns_dp -d domain.com
```

### 安装证书

#### nginx

```shell
acme.sh --install-cert -d domain.com \
--key-file /etc/nginx/ssl/domain.key \
--fullchain-file /etc/nginx/ssl/domain.crt \
--reloadcmd "systemctl reload nginx"
```

#### docker

```shell
acme.sh --install-cert -d domain.com \
--key-file /path/domain.key \
--fullchain-file /path/domain.crt \
--reloadcmd "docker restart docker-nginx"
```

## 自动更新证书

在执行安装脚本时，脚本会自动创建crontab任务

`30 1 * * * "/root/.acme.sh"/acme.sh --cron --home "/root/.acme.sh" > /dev/null`

当证书剩余有效期少于 30 天时，acme.sh 会尝试更新证书。

## 自动更新脚本

`acme.sh --upgrade --auto-upgrade`

### 关闭自动更新

`acme.sh --upgrade --auto-upgrade 0`

### 手动更新

`acme.sh --upgrade`
