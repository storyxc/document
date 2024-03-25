# typecho部署

## 服务器环境

### 安装php

#### debian

```shell
apt install php7.4 php7.4-fpm php7.4-mysql php7.4-curl php7.4-gd php7.4-mbstring php7.4-xml php7.4-xmlrpc php7.4-zip
```

#### ubuntu-server

```shell
add-apt-repository ppa:ondrej/php
apt update
apt install php7.4 php7.4-mysql php7.4-curl php7.4-json php7.4-cgi php7.4-gd php7.4-cli php7.4-fpm php7.4-mbstring php7.4-xml
```

### 修改监听端口

`vim /etc/php/7.4/fpm/pool.d/www.conf`

```text
; listen = /run/php/php7.4-fpm.sock
listen = 127.0.0.1:9000;
```

`systemctl restart php7.4-fpm`

### nginx配置

```nginx
root /var/www/typecho
location ~ .*\.php(\/.*)*$ {
      fastcgi_pass 127.0.0.1:9000;
      fastcgi_split_path_info ^(.+?.php)(/.*)$;
      fastcgi_index index.php;
      fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
      include fastcgi_params;
}
```

### mysql创建数据库和用户

```sql
create database typecho;
CREATE USER 'typecho_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON typecho.* TO 'typecho_user'@'localhost';
FLUSH PRIVILEGES;
```

### 文件系统权限

`chmod -R 755 /var/www/typecho`