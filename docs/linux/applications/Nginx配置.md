# nginx配置
记录常用、踩坑的nginx配置内容

## http
### upstream
> upstream指令主要用于负载均衡，设置一系列的后端服务器
### server
> server块的指令主要用于指定主机和端口
#### listen

监听的端口号

- `default_server`：定义默认的 server 处理没有成功匹配 server_name 的请求，如果没有显式定义，则会选取第一个定义的server作为default_server。

  - 显式定义：`listen 80 default_server`

  - 隐式定义

    ```nginx
    http {
        # 如果没有显式声明 default server 则第一个 server 会被隐式的设为 default server
        server {
            listen 80;
            server_name _; # _ 并不是重点 __ 也可以 ___也可以
            return 403; # 403 forbidden
        }
        
        server {
            listen 80;
            server_name www.a.com;
            ...
        }
    }
    ```

#### server_name

- `server_name storyxc.com`：完整匹配

- `server_name *.storyxc.com`：`*`开始的通配符匹配

  - 特殊情况：`.storyxc.com`能同时匹配`storyxc.com`和`*.storyxc.com`

  > A wildcard name may contain an asterisk only on the name’s start or end, and only on a dot border. The names “`www.*.example.org`” and “`w*.example.org`” are invalid. However, these names can be specified using regular expressions, for example, “`~^www\..+\.example\.org$`” and “`~^w.*\.example\.org$`”. An asterisk can match several name parts. The name “`*.example.org`” matches not only `www.example.org` but `www.sub.example.org` as well.
  >
  > A special wildcard name in the form “`.example.org`” can be used to match both the exact name “`example.org`” and the wildcard name “`*.example.org`”.

- `server_name mail.* `：`*`结尾的通配符匹配

- `server_name ~^(?<user>.+)\.storyxc\.com$`第一个匹配的正则表达式（按照配置文件中出现的顺序）

- `server_name _`：通常使用`_`作为`default server`的server_name



### location
> location块用于匹配网页位置
#### 匹配规则
 location支持正则表达式匹配，也支持条件判断匹配

语法规则：` location [=|~|~*|^~] /uri/ { … }`

- `=`：完全精确匹配
- `^~`：表示uri以某个常规字符串开头，理解为匹配url路径即可，nginx不对url进行编码
- `~`：表示区分大小写的正则匹配
- `~*`：表示不区分大小写的正则匹配
- `!~`：区分大小写不匹配
- `!~*`：不区分大小写不匹配
- `/`：通用匹配，优先级最低

匹配顺序：`=`最高，正则匹配其次（按照规则顺序），通用匹配`/`最低，匹配成功时停止匹配按照当前规则处理请求

```nginx
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
    # 匹配所有扩展名以.gif、.jpg、.jpeg、.png、.bmp、.swf结尾的静态文件
    root /wwwroot/xxx;
    # expires用来指定静态文件的过期时间，这里是30天
    expires 30d;
}
```

```nginx
location ~ ^/(upload|html)/ {
	# 匹配所有/upload /html
	root /web/wwwroot/www.cszhi.com;
	expires 30d;
}
```

#### location和proxy_pass是否带`/`的影响

> https://github.com/xqin/nginx-proxypass-server-paths

| Case # | Nginx location | proxy_pass URL                                  | Test URL         | Path received         |
| ------ | -------------- | ----------------------------------------------- | ---------------- | --------------------- |
| 01     | /test01        | [http://127.0.0.1:8080](http://127.0.0.1:8080/) | /test01/abc/test | /test01/abc/test      |
| 02     | /test02        | http://127.0.0.1:8080/                          | /test02/abc/test | //abc/test            |
| 03     | /test03/       | [http://127.0.0.1:8080](http://127.0.0.1:8080/) | /test03/abc/test | /test03/abc/test      |
| 04     | /test04/       | http://127.0.0.1:8080/                          | /test04/abc/test | /abc/test             |
| 05     | /test05        | http://127.0.0.1:8080/app1                      | /test05/abc/test | /app1/abc/test        |
| 06     | /test06        | http://127.0.0.1:8080/app1/                     | /test06/abc/test | /app1//abc/test       |
| 07     | /test07/       | http://127.0.0.1:8080/app1                      | /test07/abc/test | /app1abc/test         |
| 08     | /test08/       | http://127.0.0.1:8080/app1/                     | /test08/abc/test | /app1/abc/test        |
| 09     | /              | [http://127.0.0.1:8080](http://127.0.0.1:8080/) | /test09/abc/test | /test09/abc/test      |
| 10     | /              | http://127.0.0.1:8080/                          | /test10/abc/test | /test10/abc/test      |
| 11     | /              | http://127.0.0.1:8080/app1                      | /test11/abc/test | /app1test11/abc/test  |
| 12     | /              | http://127.0.0.1:8080/app2/                     | /test12/abc/test | /app2/test12/abc/test |

#### root和alias区别

- alias指定的是准确目录，且最后必须是`/`，否则就会访问失败
- root是指定目录的上级目录

```nginx
location /abc {
  root /wwwroot/aaa;
 	# 此规则匹配的最终资源路径为/wwwroot/aaa/abc/
  # 如果访问的是/abc/a.html,则最终访问的资源是服务器中的/wwwroot/aaa/abc/a.html
  index index.html;
}

location /abc {
  alias /wwwroot/aaa/;
  # 此规则匹配的最终资源路径为/wwwroot/aaa/
  # 如果访问的是/abc/b.txt，则最终访问的资源是/wwwroot/aaa/b.txt
  index index.html;
}
```

#### 访问静态资源重定向问题

当nginx监听的不是80端口时，访问文件夹且末尾不是`/`，则nginx会进行301永久重定向，此时会丢掉客户端访问时的端口号，可以通过以下配置解决，作用是将不以 `/` 结尾的目录 URL 重定向至以 `/` 结尾的目录 URL。使用 `-d` 判断 `$request_filename` 是否为一个目录，如果是，则使用 `rewrite` 指令进行重写。其中，`[^/]$` 表示匹配不以 `/` 结尾的 URL，即目录 URL，`$scheme://$http_host$uri/` 表示重定向目标 URL，其中使用了 `$scheme` 变量表示客户端请求所使用的协议（HTTP 或 HTTPS）、`$http_host` 变量表示客户端请求的 HOST 头部信息、`$uri` 变量表示客户端请求的 URI。

```nginx
location / {
    if (-d $request_filename) {
        rewrite [^/]$ $scheme://$http_host$uri/ permanent;
    }
    try_files $uri $uri/ /index.html;
}
```

## 变量
| 变量名                   | 作用                           |
|------------------------|----------------------------|
| $scheme                | 请求使用的协议 (http 或 https)      |
| $host                  | 当前请求的主机名，不包括端口号。         |
| $http_host | 完整的HTTP主机头，包括主机名和端口号。 |
| $request_uri           | 完整的请求 URI,包括查询字符串          |
| $uri                   | 当前请求的 URI (不包含请求参数)     |
| $args                  | 当前请求的参数部分,不包括问号  |
| $request_method        | 当前请求的方法 (GET、POST 等)    |
| $remote_addr           | 客户端 IP 地址                  |
| $server_addr           | 服务器 IP 地址                  |
| $server_name           | 当前请求的服务器名称              |
| $server_protocol       | 服务器使用的协议版本              |
| $request_filename      | 当前请求的文件路径和名称            |
| $document_root         | 当前请求的根目录                 |
| $is_args               | 如果请求包含参数部分，值为 ?，否则为空字符串 |
| $query_string          | 当前请求的查询字符串部分,包括问号（?）    |
| $http_user_agent       | 客户端发送的 User-Agent 头部信息    |
| $http_referer          | 客户端发送的 Referer 头部信息       |
| $http_cookie           | 客户端发送的 Cookie 头部信息        |
| $remote_port           | 客户端端口号                    |
| $server_port           | 服务器端口号                    |
| $realpath_root         | 请求根目录的实际路径                |
| $content_type          | 请求的内容类型                     |
| $content_length        | 请求的内容长度                   |
| $request_body          | 请求的主体内容                    |

## proxy_set_header

| 配置指令                                                     | 作用                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `proxy_set_header Host $host;`                               | 设置代理请求的主机头，通常用于传递客户端的原始主机头。`$http_host`传递包含端口号。 |
| `proxy_set_header X-Real-IP $remote_addr;`                   | 设置代理请求的客户端真实IP地址，用于传递客户端的真实IP地址给后端服务器。 |
| `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` | 用于将客户端的原始IP地址添加到`X-Forwarded-For`头中，以便后端服务器知道请求的真实来源。 |
| `proxy_set_header X-Forwarded-Proto $scheme;`                | 设置代理请求的协议（HTTP或HTTPS），以便后端服务器知道请求的协议类型。 |
| `proxy_set_header User-Agent $http_user_agent;`              | 传递客户端的User-Agent头，用于识别客户端的浏览器或应用程序。 |
| `proxy_set_header Referer $http_referer;`                    | 传递客户端的Referer头，通常用于跟踪页面来源。                |
| `proxy_set_header Cookie $http_cookie;`                      | 传递客户端的Cookie头，以便后端服务器可以访问客户端的Cookie数据。 |
| `proxy_set_header Connection "";`                            | 清除代理请求的Connection头，通常用于避免代理干扰连接的管理。 |
| `proxy_set_header Upgrade $http_upgrade;`                    | 用于处理WebSocket连接的Upgrade头，通常与WebSocket代理一起使用。 |
| `proxy_set_header X-Frame-Options SAMEORIGIN;`               | 用于设置`X-Frame-Options`头，控制网页是否可以嵌套在其他网页中显示。 |
