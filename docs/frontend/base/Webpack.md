# Webpack



> webpack时前端项目工程化的具体解决方案。webpack的主要功能：提供了友好的前端模块化开发支持、代码压缩混淆、处理浏览器端javascript得兼容性、性能优化等强大的功能。

## 前端工程化

- 模块化
- 组件化
- 规范话
- 自动化

## 基础使用

- `npm install webpack@version webpack-cli@version -D`

- webpack.config.js

  - ```js
    module.exports = {
      mode: 'development' //可取值development和production，前者不会压缩和性能优化，打包速度快
    }
    ```

- package.json

  - ```json
    "script": {
      "dev": "webpack"
    }
    ```

### 默认约定

webpack 4.x和5.x版本有如下默认约定

- 默认打包入口文件：src -> index.js
- 默认输出文件路径：dist -> main.js

### 修改打包默认约定

可以在webpack.config.js中

- 修改entry节点指定打包入口
- 修改output节点指定输出

```js
const path = require('path')

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/bundle.js'
  }
}
```



## 插件

### webpack-dev-server

- 类似node.js中的nodemon

- 修改源代码后webpack会自动进行项目打包和构建

- `npm install webpack-dev-server@version -D`

- 修改package.json的script

  - ```json
    "scripts": {
      "dev": "webpack serve"
    }
    ```

### html-webpack-plugin

- 可以定制index.html内容

- `npm install html-webpack-plugin@version -D`

- 配置webpack.config.js

  - ```js
    const HtmlPlugin = require('html-webpack-plugin')
    
    const htmlPlugin = new HtmlPlugin({
      template: './src/index.html',//源文件
      filename: './index.html'//生成的问题
    })
    
    module.exports = {
      mode: 'development',
      plugins: [htmlPlugin]
    }
    ```

### clean-webpack-plugin

- 每次打包发布自动清理dist目录的旧文件

- `npm i clean-webpack-plugin@version -D`

- 配置

  ```js
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const cleanPlugin = new CleanWebpackPlugin()
  
  plugins: [htmlPlugin, cleanPlugin]
  ```

### devServer节点

```js
devServer: {
  open: true,
  host: 127.0.0.1,
  port: 80
}
```

## loader

实际开发中，webpack只能打包处理.js模块，其他后缀的模块需要调用loader加载器才能正常打包

loader加载器作用：协助webpack打包处理特定的文件模块，比如：

- css-loader可以处理.css文件

  - `npm i style-loader@version css-loader@version -D`

  - webpack.config.js的module->rules数组中添加loader规则

  - ```js
    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader']} //先执行css-loader,从后往前
      ]
    }
    ```

- less-loader可以处理.less文件

  - `npm i less-loader@version -D`
  - ```js
    module: {
      rules: [
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']} //先执行less-loader,从后往前
      ]
    }
    ```
  - 

- babel-loader可以处理webpack无法处理的高级JS语法

  - `npm i babel-loader@version @babel/core@version @babel/plugin-proposal-decorators@version -D`

  - ```js
    module: {
      rules: [
        { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/} //
      ]
    }
    ```

  - 配置babel-loader

    - 在根目录下创建`babel.config.js`配置文件

      ```js
      module.exports = {
        plugins: [['@babel@plugin-proposal-decorators'], {legacy: true}]
      }
      ```

      

- url-loader可以处理样式表中与url路径相关的文件

  - `npm i url-loader@version file-loader@version -D`

  - ```js
    module: {
      rules: [
        /* { 
         test: /\.jpg|png|gif$/,
         use: { 
           loader: 'url-loader',
           options: {
             limit: 50000, //limit指定图片大小，单位byte，只有小于等于limit的图片才会被转为base64格式
             outputPath: 'images'
           }
         }
        } 
        */
        { test: /\.jpg|png|gif$/, use: 'url-loader?limit=50000&outputPath=images'}
      ]
    }
    ```

## build打包发布

在package.json的script节点下新增build命令：

```json
"scripts": {
  "dev": "webpack serve",
  "build": "webpack --mode production"
}
```

## SourceMap

SourceMap是一个信息文件，里面存着位置信息。也就是说SourceMap文件中存储着压缩混淆后的代码所对应的转换前的位置。

出错的时候除错工具直接显示原始代码，而不是转换后的代码，方便后期调试。

- **开发环境**在webpack.config.js中添加配置，保证运行时报错和源代码行数一致：

```js
module.exports = {
  devtool: 'eval-source-map'
}
```

- **生产环境**省略devltool选项则最终生成文件不包含SourceMap，能够防止源码通过SourceMap暴露。如果只想定位报错具体行数，且不想暴露源码，可以将devtool设置为`nosources-source-map`



## 其他

- webpack.config.js配置目录别名

```js
resolve: {
  alias: {
  //@代表源码目录
  '@': path.join(__dirname, './src/')
  }
}
```
