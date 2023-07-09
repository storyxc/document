# feign请求导致的用户ip获取问题记录 



## 背景

有个功能需要做ip的判断，区分请求是来自用户端还是来自其他服务的feign调用，其中有个一个服务发起的feign调用，一直无法获取到真实的服务器ip，而一直是用户端的ip。

## 排查

1. 首先贴出来获取ip的工具类

```java
public static String getIpAddr(HttpServletRequest request) {
        String ipAddress = request.getHeader("x-forwarded-for");
        if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }
        if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
            if (ipAddress.equals("127.0.0.1") || ipAddress.equals("0:0:0:0:0:0:0:1")) {
                //根据网卡取本机配置的IP
                InetAddress inet = null;
                try {
                    inet = InetAddress.getLocalHost();
                } catch (UnknownHostException e) {
                    e.printStackTrace();
                }
                ipAddress = inet.getHostAddress();
            }
        }
        //对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
        if (ipAddress != null && ipAddress.length() > 15) { //"***.***.***.***".length() = 15
            if (ipAddress.indexOf(",") > 0) {
                ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
            }
        }
        return ipAddress;
    }
```

2. 根据调试发现，请求的``x-forwarded-for`请求头是一直包含两个ip的，第一个ip是用户端的ip，第二个是nginx所在的服务器ip，这个也好理解，通过代理转发的请求，会把代理ip拼在真实ip后面。但是问题是这个请求是由其他服务feign发起的，理应不存在nginx转发（通过注册中心的服务名调用，绕过nginx）。

> [HTTP 请求头中的 X-Forwarded-For](https://imququ.com/post/x-forwarded-for-header-in-http.html)
>
> [Nginx remote_addr和proxy_add_x_forwarded_for变量详解](https://www.cnblogs.com/shouke/p/15511149.html)]

3. 把问题转到排查feign调用上后发现，该服务实例化了feign.builder来实现传递自定义请求头的目标

```java
@Bean
	public Feign.Builder feignBuilder() {
		return Feign.builder().requestInterceptor(new RequestInterceptor() {
			@Override
			public void apply(RequestTemplate requestTemplate) {
				Map<String, String> customHeaders = WebUtils.getCustomHeaders();
				customHeaders.forEach((k, v) -> {
					requestTemplate.header(k, v);
				});
			}
		});
	}

---
  
public static Map<String, String> getCustomHeaders() {
        Map<String, String> headers = new HashMap();
        HttpServletRequest request = RequestContextHelper.getRequest();
        Enumeration<String> headerNames = request.getHeaderNames();

        while(headerNames.hasMoreElements()) {
            String headerName = ((String)headerNames.nextElement()).toLowerCase();
            if (headerName.startsWith("x-")) {
                String headerValue = request.getHeader(headerName);
                if (headerValue != null) {
                    headers.put(headerName, headerValue);
                }
            }
        }

        headers.put("x-invoker-ip", IpUtils.getLocalIpAddr());
        if (!headers.containsKey("x-auth-token")) {
            headers.put("x-auth-token", TokenGenerator.generateWithSign());
        }

        return headers;
    }
```

至此，问题解决，x-forwarded-for被放在了feign请求头中，导致了上述问题，这里把x-forwarded-for请求头排除即可。



4. 分析：

   请求流程： 用户->nginx->网关服务->a服务->feign调用->b服务

 用户的请求通过nignx后代理ip就会被添加到x-forwarded-for请求头中，此时x-forwarded-for请求头为:`用户ip,nginx服务器的ip`，后请求从网关路由到a服务，a服务通过feign.buider的添加拦截器方法，增加了一个添加指定请求头到feign的请求中的拦截器，导致原来的x-forwarded-for被原封不动的传到了b服务，b服务根据这个请求头获取ip时，就拿到了原始用户的ip。