# Gin

> Gin is a HTTP web framework written in Go (Golang). It features a Martini-like API with much better performance -- up to 40 times faster. If you need smashing performance, get yourself some Gin.

## Gin安装和基本使用

`go get -u github.com/gin-gonic/gin`

```go
package main

import (
	"github.com/gin-gonic/gin"
	"github.com/thinkerou/favicon"
)

func main() {
  // 创建服务
	ginServer := gin.Default()
	ginServer.Use(favicon.New("./favicon.ico"))
	ginServer.GET("/", func(c *gin.Context) {
		c.String(200, "Hello World!")
	})
	ginServer.POST("/post", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "POST Data",
		})
	})

	_ = ginServer.Run(":8080")

}
```

- `curl -X GET http://localhost:8080`
  - `Hello World!`

- `curl -X POST http://localhost:8080/post`
  - `{"message":"POST Data"}`

## 返回一个静态页

```go
package main

import (
	"github.com/gin-gonic/gin"
	"github.com/thinkerou/favicon"
)

func main() {
  // 创建服务
	ginServer := gin.Default()
  // 设置favicon
	ginServer.Use(favicon.New("./favicon.ico"))

	// 加载静态页
	ginServer.LoadHTMLGlob("templates/*")
	// 响应页面给前端
	ginServer.GET("/index", func(context *gin.Context) {
		context.HTML(200, "index.html", gin.H{
			"title": "Main website",
		})
	})
	_ = ginServer.Run(":8080")
}
```

访问`localhost:8080`或`localhost:8080/index`

![静态页](https://storyxc.com/images/blog/image-20230701204904138.png)

## 加载资源文件

```go
package main

import (
	"github.com/gin-gonic/gin"
	"github.com/thinkerou/favicon"
)

func main() {
  // 创建服务
	ginServer := gin.Default()
  // 设置favicon
	ginServer.Use(favicon.New("./favicon.ico"))

	// 加载静态页
	ginServer.LoadHTMLGlob("templates/*")
	// 响应页面给前端
	ginServer.GET("/index", func(context *gin.Context) {
		context.HTML(200, "index.html", gin.H{
			"title": "Main website",
		})
	})
	_ = ginServer.Run(":8080")
}
```

![加载资源文件](https://storyxc.com/images/blog/image-20230701204606034.png)

## Restful API

### Query参数

```go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	ginServer := gin.Default()


	ginServer.GET("/user/info", func(context *gin.Context) {
		userId := context.Query("userId")
		userName := context.Query("userName")
		context.JSON(http.StatusOK, gin.H{
			"userId":   userId,
			"userName": userName,
		})
	})

	_ = ginServer.Run(":8080")
}
```

- `curl -X GET 'http://localhost:8080/user/info?userId=123&userName=小明'`
  - `{"userId":"123","userName":"小明"}`



### Body参数

```go
package main

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	ginServer := gin.Default()

	ginServer.POST("/user", func(context *gin.Context) {
    // request body []byte, err
		body, _ := context.GetRawData()
    // 包装为map类型
		var m map[string]interface{}
		_ = json.Unmarshal(body, &m)

		context.JSON(http.StatusOK, m)
	})

	_ = ginServer.Run(":8080")
}
```

- `curl -X POST 'http://127.0.0.1:8080/user' --header 'Content-Type: application/json' --data '{"userName": "张三"}'`
  - `{"userName":"张三"}`

### 表单参数

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/static/base.css">
</head>
<body>
<h1>Hello World!</h1>

<form action="/user/add" method="post">
    <input type="text" name="username">
    <input type="password" name="password">

    <button type="submit">提交</button>
</form>
<script src="/static/base.js"></script>
</body>
</html>
```



```go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	ginServer := gin.Default()

	ginServer.LoadHTMLGlob("templates/*")

	ginServer.GET("/index", func(context *gin.Context) {
		context.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Hello World",
		})
	})

	ginServer.POST("/user/add", func(context *gin.Context) {
		username := context.PostForm("username")
		password := context.PostForm("password")

		context.JSON(http.StatusOK, gin.H{
			"msg": "success",
			"data": gin.H{
				"username": username,
				"password": password,
			},
		})
	})

	_ = ginServer.Run(":8080")
}
```

## 路由

```go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	ginServer := gin.Default()

	ginServer.LoadHTMLGlob("templates/*")
  // 重定向到首页
	ginServer.GET("/", func(context *gin.Context) {
		context.Redirect(http.StatusMovedPermanently, "/index")
	})

	ginServer.GET("/index", func(context *gin.Context) {
		context.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Hello World",
		})
	})
  // 404页面
  ginServer.NoRoute(func(context *gin.Context) {
		context.HTML(http.StatusNotFound, "404.html", gin.H{
			"title": "404",
		})
	})

	_ = ginServer.Run(":8080")
}
```

## 路由组

```go
package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	ginServer := gin.Default()

	userGroup := ginServer.Group("/user")
	{
		userGroup.GET("/get", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "get user",
			})
		})
		userGroup.POST("/post", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "post user",
			})
		})
	}

	_ = ginServer.Run(":8080")
}
```

## 自定义中间件 拦截器

```go
package main

import (
	"github.com/gin-gonic/gin"
	"log"
)

func myHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		// do something
		context.Set("name", "zhangsan")
		context.Next() // 放行
		// context.Abort() 阻止
	}
}

func main() {
	ginServer := gin.Default()

	userGroup := ginServer.Group("/user")
	{
		userGroup.GET("/get", myHandler(), func(c *gin.Context) {
			// 获取拦截器里设置的值
			name := c.MustGet("name").(string)
			log.Println(name)
			c.JSON(200, gin.H{
				"message": "get user",
			})
		})
	}

	_ = ginServer.Run(":8080")
}
// 2023/07/01 21:36:53 zhangsan
```

