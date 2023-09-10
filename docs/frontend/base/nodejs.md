# Node.js



## Node.js简介

Node.js是一个基于Chrome V8引擎的JavaScript运行环境。

> 浏览器是js的前端运行环境
>
> Node.js是js的后端运行环境



### Node.js中的JavaScript运行环境

- V8引擎
- 内置API
  - fs、path、http、JS、querystring。。。

### Node.js可以做什么

- 基于Express可以构建Web应用
- 基于Electron可以构建跨平台桌面应用
- 基于restify可以构建API接口项目
- 读写和操作数据库、创建实用的命令行工具辅助开发。。



## 基础模块

### fs模块

- fs.readFile()
  - fs.readFile(path[, options], callback)
- fs.writeFile()
  - fs.writeFile(file,data[,options], callback)
- 动态拼接路径问题：`__dirname`替代当前文件所处目录 
  - `__dirname + '/file/1.txt'`

### path模块

- path.join()
- path.basename()

### http模块

#### 创建基本的web服务器

```js
const http = require('http')

const server = http.createServer()
server.on('request', (req, res) => {
  console.log('visit')
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end('111')
})

server.listen(80, () => {
  console.log("http server running at http://127.0.0.1")
})
```

- req
  - url：请求url
  - method：请求方法
- res
  - end()：发送响应

## 模块化

模块化是指解决一个复杂问题时，自顶向下逐层把系统划分为若干模块的过程，对于整个系统来说，模块是可组合、分解和更换的单元。

模块化优势：

- 提高复用性
- 提高可维护性
- 可以实现按需加载

### Node.js模块分类

- 内置模块
- 自定义模块
- 第三方模块

### 加载模块

- `const moduleName = require('moduleName')`

> 使用require加载模块时会执行被加载模块的代码
>
> 使用自定义模块可以省略`.js`

### 模块作用域

在自定义模块中定义的变量、方法等成员只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域。

好处：防止全局变量污染

#### 向外共享模块作用域中的成员

- module对象：在每个.js自定义模块中都有一个module对象，里面存储了和当前模块有关的信息
  - `console.log(module)`

- `module.exports`：可以使用此对象将模块内的成员共享出去供外部使用，**外界使用`require()`导入自定义模块时，得到的就是module.exports所指向的对象**

  - ```js
    module.exports.username = 'test'
    module.exports.sayHello = function() {
      console.log('hello')
    }
    ```

#### exports对象

`exports`对象是`module.exports`的简化写法，两者指向同一个对象



### 模块化规范

Node.js遵循Common.js的模块化规范

CommonJS规定

- 每个模块内部，module代表当前模块
- module变量是一个对象，它的exports属性是对外的接口
- 加载某个模块，其实是加载该模块的module.exports属性。require()方法用于加载模块

## npm和包

npm是Node.js的包管理工具

- `npm install`
- `npm uninstall`

- `npm install package`
- `npm i package`
- `npm i package@version`

包版本的语义化规范

- 点分十进制，总共三位数字，例如2.14.0

- 第一位数：大版本
- 第二位数：功能版本
- 第三位数：bug修复版本
- 版本号提升规则：前面版本增长，后面版本号归零

### 安装包后多出来的文件

- node_modules: 存放所有已安装到项目中的包
- package-lock.json：记录node_modules目录下每一个包的下载信息，例如包的名字、版本号、下载地址等



### 包管理配置文件

npm规定，项目根目录必须提供`package.json`的包管理配置文件。用来记录与项目有关的配置信息，例如：

- 项目的名称、版本号、描述
- 项目中用到了哪些包
- 哪些包在开发期间会用到
- 哪些包在开发和部署时都会用到

npm创建package.json命令：`npm init -y`

> 运行npm install时，npm会自动把包名、版本记录到package.json中

### dependencies节点

`package.json`中有一个dependencies节点专门记录`npm install`安装了哪些包

### devDependencies节点

记录只在开发阶段使用、上线不会用到的包

- 安装到dev节点中：`npm i packageName -D` / `npm install packageName --save-dev`

### 修改镜像

- `npm config get registry`
- `npm config set registry=https://registry.npm.taobao.org/`

- nrm工具切换镜像源
  - `npm i nrm -g`
  - `nrm ls`
  - `nrm use taobao`

### 包分类

- 项目包：被安装到node_modules的都是项目包
  - 开发依赖包
  - 核心依赖包
- 全局包：执行npm install时指定-g参数则会安装为全局包
  - 一般为工具性质的包
  - npm install package -g
  - npm uninstall package -g

> i5ting_toc: md转换为html工具
>
> i5ting_toc -f md -o

### 包结构

规范的包结构必须符合：

- 包必须单独目录
- 根目录必须包含package.json
- package.json必须包含name、version、main三个属性，对应包名、版本号、包的入口

### 模块的加载机制

- 优先从缓存中加载：模块在第一次被加载后会被缓存，意味着多次调用require()不会导致模块的代码被多次执行
- 内置模块的加载优先级最高
- require()加载自定义模块必需指定`./`或`../`开头的路径标识符，否则会被当作内置模块或第三方模块，同时如果导入时省略了扩展名，Node.js会按顺序尝试加载以下文件：
  - 按确切文件名加载
  - 补全.js加载
  - 补全.json加载
  - 补全.node记载
  - 加载失败，报错
- 如果required()的标识符不是内置模块也不是`./`开头的路径标识符会被当作第三方模块，会从/node_modules中加载第三方模块
  - 如果没有找到，就移动到上一层进行加载，直到文件系统根目录，找不到报错
- 目录作为模块标识符的加载顺序
  - 在目录中找package.json的main属性做为require的加载入口
  - 然后找根目录的index.js
  - 都找不到报错
