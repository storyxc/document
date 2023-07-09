# Django入门

Django 是一个由 Python 编写的一个开放源代码的 Web 应用框架。

使用 Django，只要很少的代码，Python 的程序开发人员就可以轻松地完成一个正式网站所需要的大部分内容，并进一步开发出全功能的 Web 服务 Django 本身基于 MVC 模型，即 Model（模型）+ View（视图）+ Controller（控制器）设计模式，MVC 模式使后续对程序的修改和扩展简化，并且使程序某一部分的重复利用成为可能。

MVC 优势：

- 低耦合
- 开发快捷
- 部署方便
- 可重用性高
- 维护成本低

## MTV模型

Django 采用了 MVT 的软件设计模式，即模型（Model），视图（View）和模板（Template）。

Django 的 MTV 模式本质上和 MVC 是一样的，也是为了各组件间保持松耦合关系，只是定义上有些许不同，Django 的 MTV 分别是指：

- M 表示模型（Model）：编写程序应有的功能，负责业务对象与数据库的映射(ORM)。
- T 表示模板 (Template)：负责如何把页面(html)展示给用户。
- V 表示视图（View）：负责业务逻辑，并在适当时候调用 Model和 Template。

除了以上三层之外，还需要一个 URL 分发器，它的作用是将一个个 URL 的页面请求分发给不同的 View 处理，View 再调用相应的 Model 和 Template，MTV 的响应模式如下所示：

![img](https://storyxc.com/images/blog//MTV-Diagram.png)

![img](https://storyxc.com/images/blog//1589777036-2760-fs1oSv4dOWAwC5yW.png)

**解析：**

用户通过浏览器向我们的服务器发起一个请求(request)，这个请求会去访问视图函数：

- a.如果不涉及到数据调用，那么这个时候视图函数直接返回一个模板也就是一个网页给用户。
- b.如果涉及到数据调用，那么视图函数调用模型，模型去数据库查找数据，然后逐级返回。

视图函数把返回的数据填充到模板中空格中，最后返回网页给用户。



## Django安装与使用

- 安装：`pip install Django`

- 创建Django项目：

  - 命令行创建`django-admin startproject 项目名称`
  - pycharm创建 

- 项目结构

  ![image-20210430001401906](https://storyxc.com/images/blog//image-20210430001401906.png)

  - settings.py —- 包含了项目的默认设置，包括数据库信息，调试标志以及其他一些工作的变量。
  - urls.py —– 负责把URL模式映射到应用程序。
  - manage.py —– Django项目里面的工具，通过它可以调用django shell和数据库等。
  - asgi.py: 一个 ASGI 兼容的 Web 服务器的入口，以便运行你的项目。
  - wsgi.py: 一个 WSGI 兼容的 Web 服务器的入口，以便运行你的项目。

- 启动：`python manage.py runserver 8001`

  - 访问localhost:8001

  ![image-20210430001707060](https://storyxc.com/images/blog//image-20210430001707060.png)

## 路由控制

```python
# django的1.x和2.x不同
# 1.x ： url(正则表达式，views视图函数，参数，别名)
# 2.x : path,re_path(原来的url)
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]
```

### 示例：

```python
from django.contrib import admin
from django.urls import path
from storyxc.views import index
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',index,{'param':'story'})
]

```

#### views.py:

```python
from django.shortcuts import HttpResponse


def index(request,param):
    print(param)
    return HttpResponse('ok')
```



启动应用后访问localhost:8000

![image-20210430003356198](https://storyxc.com/images/blog//image-20210430003356198.png)

控制台：

```python
[30/Apr/2021 00:31:21] "GET / HTTP/1.1" 200 2
story
```

