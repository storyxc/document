# nginx配置
记录常用、踩坑的nginx配置内容

## http
### upstream
> upstream指令主要用于负载均衡，设置一系列的后端服务器
### server
> server块的指令主要用于指定主机和端口
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

当nginx监听的不是80端口是，访问文件夹且末尾不是`/`，则nginx会进行301永久重定向，此时会丢掉客户端访问时的端口号，可以通过以下配置解决，作用是将不以 `/` 结尾的目录 URL 重定向至以 `/` 结尾的目录 URL。使用 `-d` 判断 `$request_filename` 是否为一个目录，如果是，则使用 `rewrite` 指令进行重写。其中，`[^/]$` 表示匹配不以 `/` 结尾的 URL，即目录 URL，`$scheme://$http_host$uri/` 表示重定向目标 URL，其中使用了 `$scheme` 变量表示客户端请求所使用的协议（HTTP 或 HTTPS）、`$http_host` 变量表示客户端请求的 HOST 头部信息、`$uri` 变量表示客户端请求的 URI。

```nginx
location / {
    if (-d $request_filename) {
        rewrite [^/]$ $scheme://$http_host$uri/ permanent;
    }
    try_files $uri $uri/ /index.html;
}
```

## 变量
- $scheme：请求使用的协议 (http 或 https)。
- $host：当前请求的主机名。
- $request_uri：完整的请求 URI。
- $uri：当前请求的 URI，不包含请求参数。
- $args：当前请求的参数部分。
- $request_method：当前请求的方法（GET、POST、等）。
- $remote_addr：客户端 IP 地址。
- $server_addr：服务器 IP 地址。
- $server_name：当前请求的服务器名称。
- $server_protocol：服务器使用的协议版本。
- $request_filename：当前请求的文件路径和名称。
- $document_root：当前请求的根目录。
- $is_args：如果请求包含参数部分，值为 ?，否则为空字符串。
- $query_string：当前请求的查询字符串部分。
- $http_user_agent：客户端发送的 User-Agent 头部信息。
- $http_referer：客户端发送的 Referer 头部信息。
- $http_cookie：客户端发送的 Cookie 头部信息。