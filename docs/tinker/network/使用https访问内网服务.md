# 使用https访问内网服务

> https://github.com/linuxserver/docker-swag

### 配置dns解析

将需要的子域名使用ddns解析到wan口ip

### openwrt启动docker-swag容器

```yaml
# docker-compose.yml

version: "3"
services:
  swag:
    image: linuxserver/swag:latest
    container_name: swag
    cap_add:
      - NET_ADMIN
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai # 时区
      - URL=yourdomain.com # 主域名
      - VALIDATION=dns # certbot验证的方法，一般选dns
      - SUBDOMAINS=yoursubdoamin.yourdomain.com
      - CERTPROVIDER= # 可以填zerossl，默认使用let's encrypt签发证书
      - DNSPLUGIN=dnspod # 支持aliyun、dnspod、cloudflare等等，详情见官方文档
      - PROPAGATION= # 选择覆盖dns插件的默认传播时间（以秒为单位）
      - EMAIL=user@email.com # 邮箱
      - ONLY_SUBDOMAINS=true # 是否只获取子域名的证书
      - EXTRA_DOMAINS= # 其他完全限定域名（逗号分隔，无空格）例如 extradomain.com,subdomain.anotherdomain.org
      - STAGING=false # 设置为 true 以在暂存模式下检索证书。但生成的证书将无法通过浏览器的安全测试。仅用于测试。
    volumes:
      - /docker/swag/config:/config
    ports:
      - 65111:443 # 映射端口，家宽可以选择高位端口
#      - 80:80 #optional
    restart: unless-stopped
```

### 启动容器后操作

1. 在`config/dns-conf`目录中找到自己选择的dns插件的配置文件，按要求填写验证信息
2. 在`config/nginx/proxy-confs`基于给出的模板配置文件修改出自己的虚拟主机配置，将请求反向代理到内网的指定服务

3. 防火墙中配置端口转发规则：将要从外网访问的高位端口（例如65222）转发到上面映射的端口65111

### 重启容器

此时即可通过`https://subdomain.domain.com:65222`来访问对应的内网服务