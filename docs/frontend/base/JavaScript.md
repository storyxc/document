# JavaScript

## 组成

- ECMAScript：规定了js基础语法，比如变量、分支语句、循环语句、对象等
- Web APIs
  - DOM：操作文档，比如对页面元素移动、添加删除等操作
  - BOM：操作浏览器，比如页面弹窗、检测窗口宽度、存储数据到浏览器等

## 基本语法

### 输入

`prompt()`

### 输出

`console.log()`

`document.write()`

`alert()`

> alert和prompt会跳过页面渲染先被执行

### 变量

#### 声明

- `let`

> 比较旧的JavaScript中使用var声明变量
>
> var的一些问题：
>
> - 可以先使用，再声明
> - var声明过的变量可以重复声明
> - 变量提升、全局变量、没有块级作用域

#### 命名

- 只能下划线、字母、数字、$，且不能数字开头
- 字母区分大小写

##### 规范

- 小驼峰

### 数组

- `let arr = [1, 2, 3]` / `let arr = new Array(1, 2, 3)`
- 数组有序
- 取值：数组[下标]
- 长度：数组.length
- 修改：arr[下标] = 新值
- 增加
  - arr.push() 将一个或多个元素新增到末尾，返回新的数组长度
  - arr.unshift()将一个或多个元素新增到开头，返回新的数组长度

- 删除
  - arr.pop() 删除最后一个元素，并返回该元素的值
  - arr.shift()删除第一个元素，并返回该元素的值
  - arr.splice(操作的下标，删除的个数)，删除指定元素并返回


### 常量

- 声明：`const`
- 声明常量必须赋值

### 数据类型

#### 基本数据类型

- number

- string

  - 模板字符串: 使用反引号包裹数据，使用${}替换数据

    ```js
    let age = 20
    console.log(`我今年${age}岁`)
    ```

- boolean

- undefined

  - 没有赋值
  - undefined +1 -> NaN

- null

  - 内容为空
  - null + 1 -> 1

##### NaN

NaN代表一个计算错误，是一个不正确或未定义的数学操作得到的结果，任何对NaN的操作都会返回NaN

#### typeof

- 运算符写法：typeof 变量
- 函数写法：typeof(变量)

#### 数据类型转换

##### 隐式转换

- `+`号两边只要有字符串，都会转字符串
- 除了`+`，其他算数运算符会把数据转换为数字类型
- `+`作为正号可以转换数字

##### 显式转换

- Number(变量)

#### 引用数据类型

- object

  ```js
  let obj = {
    uname: 'abc',
    age: 18,
    gender: '女',
    speak: function(x) {
      console.log('hello' + x)
    }
  }
  ```

  - 属性名可以用引号，一般省略，除非遇到特殊符号（空格、中横线等）

- 查看: 

  - 对象.属性
  - 对象['属性']

- 修改: 对象.属性 = 新值

- 新增: 对象.新属性 = 值

- 删除: delete 对象.属性

- 对象方法: 对象.方法名()

- 遍历对象

  - ```js
    for (let k in obj) {
      console.log(obj[k]) //k带引号
    }
    ```


> for in遍历数组 是数组下标，但是是字符串
>

### 运算符

#### 赋值运算符

- +=
- -=
- *=
- /=
- %=

#### 一元运算符

- `++`
- `--`

#### 比较运算符

- `<`
- `>`
- `>=`
- `<=`
- `==`: 值是否相等
- `===`：类型和值是否都相等
- `!==`：是否不全等

#### 逻辑运算符

- `&&`
- `||`
- `!`

### 流程控制语句

- if
  - 除了0，所有的数字都为真
  - 除了''，所有字符串都为真

- switch case

  - 数据和值必须满足全等`===`

  - ```js
    switch (数据) {
      case 值1:
        代码1
        break
      case 值2:
        代码2
        break
      default:
        代码n
    }
    ```

  - 

- 三元运算符

### 循环控制语句

- while
- for
- break/continue

### 函数

```js
function 函数名(参数列表) {
  函数体
}
```

- 命名 小驼峰

- return
  - 没有return 默认返回undefined

### 作用域

- 全局变量
  - 局部变量或块级变量 没有let声明直接赋值的当全局变量看（不提倡）
- 局部变量



### 匿名函数

- 函数表达式：把匿名函数赋值给一个变量，通过变量名调用

  - ```js
    let fn = function () {}
    ```

- 立即执行函数

  - ```js
    (function() {...})();
    (function() {...})();
    ---
    (function(x, y) {
      console.log(x + y)
    })(1, 3)
    ```

  - 前一个括号声明，后一个括号调用

  - 分号

### 逻辑中断

- 短路：只存在`&&`和`||`中，当满足一定条件会让右边代码不执行
  - `&&`：左边为false就短路
  - `||`：左边为true就短路

### 转换boolean

- "": false
- 0: false
- undefined: false
- null: false
- NaN: false

- "" + 1 = 1
- null经过数字转换会变0
- undefined经过数字转换会变NaN

## Web APIs

### DOM

#### 获取DOM元素

- document.querySelector(CSS选择器)：获取匹配的第一个元素
- document.querySelectorAll(CSS选择器)：获取匹配的多个元素
- document.getElementById()：通过元素的 id 属性获取一个 DOM 元素
- document.getElementsByName()：通过元素的 name 属性获取一个类数组的元素集合，该方法返回一个 NodeList 对象
- document.getElementsByClassName()：方法通过元素的 name 属性获取一个类数组的元素集合，该方法返回一个 NodeList 对象
- document.getElementsBytagName()：通过元素的标签名获取一个类数组的元素集合，该方法返回一个 NodeList 对象

#### 操作元素内容

- 对象.innerText

- 对象.innerHTML

- 对象.属性=值

  - ```js
    const image = document.querySelector('img')
    image.src = 'xxx.jpg'
    image.title = '123'
    ```

- 对象.style.样式属性=值

  - ```js
    box.style.width = '300px'
    box.backgroundColor = 'pink' //小驼峰
    ```

- 通过类名修改属性，会覆盖

  - ```js
    //定义好类对应的属性，给对象添加类名
    对象.className = 类名
    ```

- 通过classList操作类控制CSS，用于追加和删除

  - ```js
    元素.classList.add(类名)//追加
    元素.classList.remove(类名)//删除
    元素.classList.toggle(类名)//切换
    ```

- 自定义属性

  - H5中推出的data-自定义属性

  - 在标签上一律以`data-`开头

  - DOM对象上一律以`dataset`对象方式获取

  - ```html
    <body>
      <div class="box" data-id="10">盒子</div>
      <script>
        const box = document.querySelector('.box')
        console.log(box.dataset.id)
      </script>
    </body>
    ```

#### 事件监听

- 元素对象.addEventListener('事件类型', 要执行的函数)

> 元素.on事件：也可以添加事件监听，但会被覆盖，且只能冒泡 不能捕获，addEventListener不会被覆盖，能冒泡 也能捕获。

- 事件类型
  - 鼠标事件
    - click
    - mouseenter: 没冒泡，只会在鼠标进入目标元素时触发一次
    - mouseover：有冒泡，事件在鼠标经过目标元素或任何子元素时会不断触发
    - mouseleave
    - mousemove: 鼠标移动
  - 焦点事件
    - focus
    - blur
  - 键盘事件
    - keydown
    - keyup
  - 文本事件
    - input

#### 事件对象

事件对象中有事件触发时的相关信息，例如鼠标点击时的位置，键盘按下时的键位

```js
btn.addEventListener('click', function(e){
  console.log(e)
})
```

##### 常用对象属性

- type：事件类型
- clientX/clientY:光标相对于浏览器可见窗口左上角的位置
- offsetX/offsetY：光标相对于当前DOM元素左上角的位置
- key：用户按下的键盘的值，现在不提倡使用keyCode



#### 环境对象

指的是函数内部特殊的变量`this`，它代表着当前函数运行时所处的环境

- 函数的调用方式不同，`this`的指代对象也不通
- `this`指向的粗略规则是谁调用指向谁（addEventListener指向绑定的元素，普通函数指向window）



#### 回调函数

函数A作为参数传递给函数B，A就被称为回调函数

#### 事件流

事件流指的是事件完整执行过程中的流动路径

##### 事件捕获

DOM的根元素开始去执行对应的事件（从父元素到子元素）

```js
DOM.addEventListener(事件类型, 函数, 是否使用捕获机制)
```

> L0事件只有冒泡，没有捕获

##### 事件冒泡

当一个元素的事件被触发时，同样的事件会在该元素的所有祖先元素中依次被触发。这一过程被称为事件冒泡（从子元素到父元素）

- 简单理解：当一个元素触发事件后，会依次向上调用所有父级元素的**同名事件**

- 事件冒泡是默认存在的

##### 阻止事件传播

- 事件对象.stopPropagation()
- 阻断事件流动传播，既能阻止冒泡，也能阻止捕获

```js
btn.addEventListener('click', function(e){
  e.stopPropagation()
})
```

##### 解绑事件

- on事件方式

  - ```js
    // 绑定事件
    btn.onClick = function(e){
      console.log(e)
    }
    // 解绑事件
    btn.onClick = null
    ```

- addEventListener方式

  - ```js
    function fn(e){
      console.log(e)
    }
    //绑定事件
    btn.addEventListener('click', fn)
    //解绑事件
    btn.removeEventListener('click', fn)
    ```

  - 匿名函数无法解绑

##### 事件委托

事件委托是利用事件流特征解决开发问题的技巧，可以减少事件注册次数，提高程序性能，原理是利用事件冒泡特点，给父元素注册事件，当触发子元素的时候，会冒泡到父元素身上，从而触发父元素的事件



##### 阻止元素默认行为

`e.preventDefault()`

##### 其他事件

- 页面加载事件

  - 外部资源加载完毕时触发的事件

    - 等待页面所有资源加载完毕，执行回调函数：`window.addEventListener('load', function() {})`

      > 也可以针对某个资源绑定事件：img.addEventListener('load', function() {}) 

  - 初始HTML文档被完全加载和解析完成后，DOMContentLoaded事件被触发，无需等待样式表、图像等完全加载

    - `document.addEventListener('DOMContentLoaded', function() {})`

- 页面滚动事件

  - 滚动条在滚动的时候持续触发的事件

    - `window.addEventListener('scroll', function() {})`
    - 给window或document添加scroll事件
    - 也可以监听某个元素内部滚动

  - 获取滚动位置

    - scrollLeft**（可读写）**

    - scrollTop**（可读写）**

    - ```js
      window.addEventListener('scroll', function() {
        const n = document.documentElement.scrollTop
        console.log(n)
      })
      ```

      > document.documentElement返回对象为HTML元素
      >
      > <html lang="en">
      >
      > <head>...</head>
      >
      > <body>...</body>
      >
      > </html>

  - 滚动到指定坐标
    - scrollTo(x, y)

- 页面尺寸事件

  - 窗口尺寸改变时触发的事件`resize`
    - `window.addEventListener('resize', function() {})`
  - 获取元素可见部分的宽高`clientWidth`、`clientHeight`
    - 不包含border，margin，滚动条

#### 元素尺寸位置

##### 获取宽高

- offsetWidth和offsetHeight
- 获取元素自身的宽高，包含padding，border
- 结果是数值
- 获取的是可视宽高，如果盒子隐藏，结果是0

##### 获取位置

- offsetLeft和offsetTop
- 获取元素距离自己**定位**父级元素的左、上距离，**只读属性**

##### 获取元素大小及其相对视口的位置

- `element.getBoundingClientRect()`

#### 日期对象

- 实例化
  - `const date = new Date()`
  - `const date = new Date('2023-4-8 08:00:00')`

- 常用方法
  - getFullYear():四位数年份
  - getMonth():月份，范围0-11
  - getDate():获取月份中的每一天
  - getDay():获取星期，0-6
  - getHours():小时，0-23
  - getMinutes():分钟，0-59
  - getSeconds():秒，0-59
  - toLocaleString(): yyyy/m/d HH:mm:ss
- 时间戳
  - `date.getTime()`
  - `+new Date()`
  - `Date.now()`

#### DOM节点

##### 节点类型

- 元素节点
- 属性节点
- 文本节点
- 其他（注释、文档类型、CDATA、实体引用、处理指令。。。）

##### 查找节点

- 父节点
  - 元素.parentNode
- 子节点
  - 元素.childNodes：获取所有子节点，包括文本（空格、换行）、注释节点等
  - 元素.children：仅获取元素节点，返回的是一个伪数组
- 兄弟节点
  - nextElementSibling：下一个兄弟节点
  - previousElementSibling:上一个兄弟节点

##### 新增节点

###### 创建节点

- `const div = document.createElement('div')`

###### 追加节点

- `父元素.appendChild(div)`

- `父元素.insertBefore(要插入的元素, 在哪个元素前面)`：插入某个元素之前
  - 例：`ul.insertBefore(li, ul.children[0])`

###### 克隆节点

- 元素.cloneNode(布尔值)
  - true：克隆时会包含后代节点一起克隆
  - false：不包含后代节点，默认值

##### 删除节点

- `父元素.removeChild(子元素)`



### BOM

#### 组成

BOM（Browser Object Model）是浏览器对象模型，包含：navigator、location、document、history、screen

window是一个全局对象，document、alert()、console.log()都是window的属性

- 所有通过`var`定义在全局作用域中的变量、函数都会变成window对象的属性和方法
- window对象下的属性和方法调用的时候可以省略window

#### 定时器

##### 延时函数

- `let timer = setTimeout(回调函数, 等待时间ms)`，返回id，setTimeout只执行一次
- 关闭：`clearTimeout(timer)`

##### 间歇函数

- `let interval = setInterval(函数, 间隔时间ms)`，返回的是的是一个id数字，不断执行
- 关闭：`clearInterval(interval)`

#### 事件循环

js是单线程，所有任务需要排队。HTML5提出了Web Worker标准，允许JavaScript脚本创建多个线程。于是JS出现了同步和异步。

- 同步任务：都在主线程执行，形成执行栈
- 异步任务：通过回调函数实现，异步任务添加到任务队列中，一般异步任务有以下三种类型
  - 普通事件：click、resize等
  - 资源加载：load、error等
  - 定时器：setTimeout、setInterval等

##### 执行机制

1. 先执行执行栈中的同步任务
2. 异步任务放到任务队列中
3. 执行栈中的所有同步任务执行完毕，系统会按次序读取任务队列中的异步任务，被读取的异步任务结束等待状态，进入执行栈，开始执行

#### location

localtion的数据类型是对象，它拆分保存了URL地址的各个组成部分

- `location.href`：常用于页面跳转

- `location.search`:获取地址中携带的参数，符号`?`后面的部分
- `location.hash`:获取地址中的hash值，符号`#`后面的部分
- `location.reload()`：用来刷新当前页面，传入参数true时强制刷新

#### navigator

navigator的数据类型是对象，该对象下记录了浏览器自身的相关信息

- navigator.userAgent:检测浏览器版本和平台

#### history

history数据类型是对象，主要管理历史记录，该对象与浏览器地址栏的操作相对应，如前进、后退、历史记录等

- history.back()
- history.forward()
- history.go(参数): 1->前进一个页面，-1->后退一个页面

#### 本地存储

##### 介绍

数据存储在用户浏览器中，设置、读取方便，刷新页面不会丢失数据，sessionStorage和localStorage约5M

##### 分类

- localStorage
  - 可以多窗口（页面）共享（同一浏览器可以共享）
  - 键值对形式存储使用
  - 语法
    - 存储：`localStorage.setItem(key, value)`
    - 查询：`localStorage.getItem(key)`
    - 删除：`localStorage.removeItem(key)`
- sessionStorage
  - 生命周期到关闭浏览器窗口截止
  - 在同一个窗口（页面）下数据可以共享
  - 键值对形式存储使用
  - 用法api和`localStorage`一致

##### 存储复杂数据类型

把复杂数据类型转成字符串形式存储

- `JSON.stringify`
- `JSON.parse`

#### 数组map和join

##### map

- 遍历数组处理数据，返回新的数组

- ```js
  const arr = ['red', 'blue']
  const newArr = arr.map(function(ele, index) {
    return ele + '颜色'
  })
  console.log(newArr) // ['red颜色', 'blue颜色']
  ```

##### join

- 把数组所有元素转换为一个字符串
- `const newStr = join(字符串)`:元素用指定字符串相连

## 进阶

### 正则表达式

- 定义：`const reg = /表达式/`
- 判断是否匹配：`reg.test(被检测字符串)`，匹配返回true，否则false
- 查找：`reg.exec(被检测字符串)`，找到返回数组，否则为null

#### 元字符

- 边界符
  - `^`：开始
  - `$`：结束
- 量词
  - `*`：0或多次
  - `+`：1或多次
  - `?`：0或1次
  - `{n}`：重复n次
  - `{n,}`：重复n次或更多
  - `{n,m}`：重复n次到m次
- 字符类
  
  - `[]`：匹配字符集合，匹配任一个都是true
  - `[a-zA-Z]`：字母
  - `[^a-z]`：[]中的^表示取反
  - `.`：除换行之外的任何单个字符
  - `\d`：数字
  - `\D`：所有0-9以外字符，等于`[^0-9]`
  - `\w`：任一字母、数字、下划线，相当于`[a-zA-Z0-9_]`
  - `\W`：匹配除字母、数字、下划线之外的字符，相当于`[^a-zA-Z0-9_]`
  - `\s`：匹配空格（包括制表符、换行符、空格符等）,相当于`[\t\r\n\v\f]`
  - `\S`：匹配非空格，相当于`[^\t\r\n\v\f]`

#### 修饰符

- 语法：`/表达式/修饰符`

- 修饰符：
  - i：ignore，匹配时，不区分大小写
  - g：global，匹配所有满足正则的结果

#### 替换

- 语法：`字符串.replace(/正则表达式/， 替换的文本)`，返回替换后的字符串



### 作用域

- 局部作用域

- 全局作用域

- 作用域链

- JS垃圾回收机制

  - 全局变量一般不会回收（关闭页面回收）
  - 一般情况下局部变量的值不再被使用会被自动回收
  - 内存由于某种原因未释放或无法释放会内存泄漏
  - 栈：由操作系统自动分配释放函数的参数值、局部变量等基本数据类型放在栈里
  - 堆：一般由开发分配释放，若开发不释放由垃圾回收机制回收。复杂数据类型放在堆里。

  > 引用计数法（有循环引用问题）
  >
  > - 定义“内存不再使用”，看一个对象是否有指向它的引用，没有引用就回收对象
  >   - 根据记录被引用的次数
  >   - 被引用一次，就+1，多次引用会累加
  >   - 如果减少一个引用就-1
  >   - 如果引用次数是0，则释放内存
  >
  > 标记清除法
  >
  > - 将不再使用的对象定义为无法达到的对象
  > - 从根部（JS中就是全局对象）出发定时扫描内存中的对象，凡是能从根部到达的对象，都是还需要使用的
  > - 无法由根部出发触及的对象标记为不再使用，稍后进行回收

- 闭包

  - 和python中的闭包一样:`如果在一个外部函数中定义一个内部函数，内部函数对外部作用域的变量进行引用，外部函数的返回值是内部函数，这样的函数就被认为是闭包(closure)。`

- 变量提升

  - 允许变量在声明之前即被访问（var声明变量）
  - js会在执行之前把当前作用域下var声明的变量提升到当前作用域的最前面，只提升声明，不提升赋值

- 函数提升

  - 代码执行前会把所有函数声明提升到当前作用域的最前面
  - 只提升声明，不提升调用

> 函数表达式特殊,必须先声明赋值后调用

### 函数进阶

- 动态参数：`arguments`，只存在于函数里，伪数组

- 剩余参数：`function getSum(paramA, paramB, ...arr)`,arr是个真数组

- 展开运算符：`...`能将一个数组进行展开

  - ```js
    const arr = [1,5,3]
    console.log(...arr)// 1 5 3
    ```

  - 用于求数组最大/小值`Math.max(...arr)`

  - 用于合并数组：const arr = [...arr1, ...arr2]

#### 箭头函数

引入箭头函数是为了更简洁的写法，适用于需要匿名函数的地方

```js
const fn = () => {}
const fn = x => { console.log(x) }
const fn = x => console.log(x)
const fn = x => x * 2
const fn = (uname) => ({ uname: uname }) //返回一个对象
```

##### 箭头函数的this

**箭头函数不会创建自己的this对象，它只会从自己的作用域链的上一层**

### 解构赋值

#### 数组解构

数组结构是将数组的单元值快速批量赋值给一系列变量的简洁语法

- `const [max, min, avg] = [100, 60, 80]`
- 典型用法：交换两个变量
- 可以设置默认值
- 可以用剩余参数防止undefined传递
- 可以忽略某些值`const [a, ,c, d] = [1, 2, 3, 4]`



> js必须加分号场景：
>
> 1. 两个连续的立即执行函数
> 2. 使用数组

#### 对象解构

对象解构是将对象的属性和方法快速批量赋值给一系列变量的简介语法

- ```js
  const user = {
    name: '小明',
    age: 18
  }
  const {name, age} = user
  ```

- 对象的属性值将会被赋值给与属性名相同的变量

- 对象中找不到与变量名一致的属性时变量值为undefined

- 数组对象解构

  ```js
  const pig = [
    {
      name: '佩奇',
      age: 6
    }
  ]
  
  const [{ name, age }] = pig
  console.log(name,age)
  ```

- 多级对象解构

  ```js
  const pig = {
    name: '佩奇',
    age: 6,
    family: {
      mother: 'mon',
      father: 'dad'
    }
  }
  
  const { name, family: { mother, father }} = pig
  ```

  

### 对象

#### 创建对象的方式

- 字面量创建

- 构造函数
  - 命名以大写字母开头
  - 只能由`new`操作符来执行
  - 实例化执行过程
    - 创建新对象
    - 构造函数this指向新对象
    - 执行构造函数代码，修改this，添加属性
    - 返回新对象

#### 实例成员&静态成员

- 实例成员：构造函数创建的对象为实例对象，实例对象的属性和方法称为实例成员
- 静态成员：构造函数的属性和方法称为静态成员
  - 静态成员只能由构造函数访问
  - 静态方法中的this指向构造函数
  - `Date.now()、Math.PI、Math.random()`

#### 内置构造函数

- Object
  - Object.keys()
  - Object.values()
  - Object.assign(dest, source)
  
- Array
  - 实例方法：forEach、filter、map、reduce、join、find、every、some、concat、splice、reverse、findIndex...
  
  - 伪数组转换为真数组：Array.from()
  
  - ```
    arr.some((item, index)=> {
    	//some code, some循环可以终止
    	return true
    })
    
    //every 判断数组每一项是否都满足条件
    let res = arr.every(item => item.state) 
    
    //reduce 
    arr.reduce((累加的结果, 当前循环项) => {}, 初始值)
    arr.reduce((amt, item) => amt += item.price, 0)
    ```
  
- String
  - 实例属性、方法：length、split()、substring()、startsWith()、includes()、toUpperCase()、toLowerCase()、indexOf()、endsWith()、replace()、match()...
  
- Number
  - toFixed()设置保留小数位数

### 原型Prototype

- 构造函数通过原型分配的函数是所有对象所共享的。
- JavaScript每一个构造函数都有一个`prototype`属性，指向另一个对象，所以也称为原型对象
- prototype对象可以挂载函数，对象实例化不会多次创建原型上函数，节约内存
- 可以把不变的方法直接定义在prototype对象上，这样所有对象的实例就可以共享这些方法
- 构造函数和原型对象中的this都指向实例化的对象

#### constructor属性

每个原型对象里都有个constructor属性，该属性指向该原型对象的构造函数

#### 对象原型

每个对象都有一个属性`__proto__`，指向构造函数的prototype对象

- `__proto__`是JS非标准属性
- [[prototype]]和`__proto__`意义相同
- 用来表明当前实例对象指向哪个原型对象prototype
- `__proto__`对象原型里也有一个constructor属性，指向创建该实例对象的构造函数

#### 原型继承

通过原型可以继承公共属性

```js
const Person = {
  eyes: 2,
  nose: 1
}

function Man() {
  
}
Man.prototype = Person
Man.prototype.constructor = Man

---
  
const Person = {
  this.eyes: 2,
  this.nose: 1
}

function Man() {
  
}
Man.prototype = new Person()
```

#### 原型链

基于原型对象的继承使得不同构造函数的原型对象关联在一起，并且这种关联关系是一种链状的解构，称为原型链

##### 查找规则

- 当访问一个对象的属性/方法时，首先查找这个对象自身有无该属性
- 如果没有就查找他的原型（`__proto__`指向的prototype对象)
- 如果还没有就查找原型对象的原型（Object的prototype）
- 依此类推一直到Object为止（null）
- `__proto__`对象原型的意义就在于为对象成员查找机制提供方向
- 可以使用`instanceof`运算符检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上

### 深浅拷贝

深浅拷贝只针对引用数据类型

- 浅拷贝：如果是简单数据类型拷贝值，引用数据类型拷贝的是地址
  - 拷贝对象：Object.assign() / 展开运算符 {...obj}拷贝对象
  - 拷贝数组：Array.prototype.concat() 或者 [...arr]
- 深拷贝：拷贝的是对象，不是地址
  - 通过递归实现深拷贝
  - lodash中的`_.cloneDeep()`
  - JSON.stringify()

### 异常

#### 抛出异常

- throw msg
- throw new Error(msg)

#### 异常捕获

```js
try {
  
} catch (err) {
  
} finally {
  
}
```

#### debugger

`debugger`

### this

#### 普通函数

- 普通函数的调用方式决定了this的值，即**谁调用 this的值指向谁**

- 普通函数没有明确调用者时this的值为window，严格模式下没有调用者时this的值为undefined

#### 箭头函数

- 箭头函数中并不存在this
- 箭头函数会默认绑定外层this的值，所以在箭头函数中this的值和外层的this是一样的
- 箭头函数中的this引用的就是最近作用域中的this
- 向外层作用域中，一层一层查找this，直到有this的定义

#### 改变this指向

- fun.call(thisArg, arg1, arg2...)
  - thisArg：fun函数运营时指定的this值
  - arg1,arg2：传递的其他参数
- apply(thisArg, [argsArray])
  - thisArg：fun函数运营时指定的this值
  - argsArray：传递的值，必须包含在数组里
- bind()
  - bind不会调用函数，但能改变函数内部this的指向
  - fun.bind(thisArg, arg1, arg2...)
  - thisArg：fun函数运营时指定的this值
  - arg1,arg2：传递的其他参数
  - 返回由指定this值和初始化参数改造的**原函数的拷贝**

### 防抖（debounce）

- 单位时间内，频繁触发事件，只执行最后一次

- lodash库的`_.debounce(fun, 时间)`

#### 思路

1. 声明一个定时器
2. 每次触发事件都先判断是否有定时器，如果有先清除
3. 如果没有则开启定时器并保存变量
4. 在定时器中调用要执行的函数

```js
const box = document.querySelector('.box')
let i = 1
function mouseMove() {
  box.innerHTML = i++
}

function debounce(fn, t) {
  let timer
  return function() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(function() {
      fn()
    }, t)
  }
}

box.addEventListener('mousemove', debounce(mouseMove, 500))
```

### 节流（throttle）

- 单位时间内，频繁触发事件，只执行一次
- lodash库的`_.throttle(fun, 时间)`

#### 思路

1. 声明一个定时器
2. 每次触发事件都判断是否有定时器，如果有则不开启新定时器
3. 如果没有定时器则开启定时器并保存变量
   1. 定时器里调用执行的函数
   2. 定时器里要把上一个定时器清空

```js
function throttle(fn, t) {
  let timer = null
  return function() {
    if(!timer) {
      timer = setTimeout(function(){
        fn()
        // setTimeout中无法删除定时器，因为定时器还在运作，所以不能用clearTimeout
        timer = null
      }, t)
    }
  }
}

box.addEventListener('mousemove', throttle(mouseMove, 500))
```

#### 案例：页面打开，记录上一次的视频播放位置

##### 两个事件

- ontimeupdate：事件在视频/音频当前播放位置发生改变时触发
- onloadeddata：事件在当前帧的数据加载完成且还没有足够的数据播放视频/音频的下一帧时触发

```js
video.ontimeupdadte = _.throttle(() => {
  localStorage.setItem('currentTime', video.currentTime)
}, 1000)

video.onloadeddata = () => {
  video.currentTime = localStorage.getItem('currentTime') || 0
}
```

## ES6

### Promise

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

`Promise`对象有以下两个特点。

（1）对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

#### 基本用法

ES6 规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。

下面代码创造了一个`Promise`实例。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供。

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

`then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`resolved`时调用，第二个回调函数是`Promise`对象的状态变为`rejected`时调用。这两个函数都是可选的，不一定要提供。它们都接受`Promise`对象传出的值作为参数。

下面是一个`Promise`对象的简单例子。

```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');//setTimeout的第三个参数是给第一个函数参数传递的参数，即done会传递给resolve函数作为参数
  });
}

timeout(100).then((value) => {
  console.log(value);
});
```

上面代码中，`timeout`方法返回一个`Promise`实例，表示一段时间以后才会发生的结果。过了指定的时间（`ms`参数）以后，`Promise`实例的状态变为`resolved`，就会触发`then`方法绑定的回调函数。

Promise 新建后就会立即执行。

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

上面代码中，Promise 新建后立即执行，所以首先输出的是`Promise`。然后，`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以`resolved`最后输出。

下面是异步加载图片的例子。

```js
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
```

上面代码中，使用`Promise`包装了一个图片加载的异步操作。如果加载成功，就调用`resolve`方法，否则就调用`reject`方法。

### Generator

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。本章详细介绍 Generator 函数的语法和 API，它的异步编程应用请看《Generator 函数的异步应用》一章。

Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

上面代码定义了一个 Generator 函数`helloWorldGenerator`，它内部有两个`yield`表达式（`hello`和`world`），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

然后，Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。

下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。也就是说，每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`表达式（或`return`语句）为止。换言之，Generator 函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

```js
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

#### yield 表达式

由于 Generator 函数返回的遍历器对象，只有调用`next`方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield`表达式就是暂停标志。

遍历器对象的`next`方法的运行逻辑如下。

（1）遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。

（2）下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。

（3）如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。

（4）如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

需要注意的是，`yield`表达式后面的表达式，只有当调用`next`方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

```js
function* gen() {
  yield  123 + 456;
}
```

上面代码中，`yield`后面的表达式`123 + 456`，不会立即求值，只会在`next`方法将指针移到这一句时，才会求值。

`yield`表达式与`return`语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到`yield`，函数暂停执行，下一次再从该位置继续向后执行，而`return`语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）`return`语句，但是可以执行多次（或者说多个）`yield`表达式。正常函数只能返回一个值，因为只能执行一次`return`；Generator 函数可以返回一系列的值，因为可以有任意多个`yield`。从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历（英语中，generator 这个词是“生成器”的意思）。



### await

正常情况下，`await`命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

```js
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
```

上面代码中，`await`命令的参数是数值`123`，这时等同于`return 123`。

另一种情况是，`await`命令后面是一个`thenable`对象（即定义了`then`方法的对象），那么`await`会将其等同于 Promise 对象。

```js
class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    );
  }
}

(async () => {
  const sleepTime = await new Sleep(1000);
  console.log(sleepTime);
})();
// 1000
```

上面代码中，`await`命令后面是一个`Sleep`对象的实例。这个实例不是 Promise 对象，但是因为定义了`then`方法，`await`会将其视为`Promise`处理。

这个例子还演示了如何实现休眠效果。JavaScript 一直没有休眠的语法，但是借助`await`命令就可以让程序停顿指定的时间。下面给出了一个简化的`sleep`实现。

```js
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();
```

`await`命令后面的 Promise 对象如果变为`reject`状态，则`reject`的参数会被`catch`方法的回调函数接收到。

```js
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
```

注意，上面代码中，`await`语句前面没有`return`，但是`reject`方法的参数依然传入了`catch`方法的回调函数。这里如果在`await`前面加上`return`，效果是一样的。

任何一个`await`语句后面的 Promise 对象变为`reject`状态，那么整个`async`函数都会中断执行。

```js
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

上面代码中，第二个`await`语句是不会执行的，因为第一个`await`语句状态变成了`reject`。

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个`await`放在`try...catch`结构里面，这样不管这个异步操作是否成功，第二个`await`都会执行。

```js
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world
```

另一种方法是`await`后面的 Promise 对象再跟一个`catch`方法，处理前面可能出现的错误。

```js
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
```

### async

async 函数是什么？一句话，它就是 Generator 函数的语法糖。**返回值是 Promise 对象**。

Generator 函数，依次读取两个文件。

```js
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

const g = gen();
g.next().value.then(function (data) {
  g.next(data).value.then(function (data) {
    g.next(data);
  });
});
```

上面代码的函数`gen`可以写成`async`函数，就是下面这样。

```js
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

一比较就会发现，`async`函数就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`，仅此而已。



`async`函数对 Generator 函数的改进，体现在以下四点。

（1）内置执行器。

Generator 函数的执行必须靠执行器，所以才有了`co`模块，而`async`函数自带执行器。也就是说，`async`函数的执行，与普通函数一模一样，只要一行。

```js
asyncReadFile();
```

上面的代码调用了`asyncReadFile`函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用`next`方法，或者用`co`模块，才能真正执行，得到最后结果。

（2）更好的语义。

`async`和`await`，比起星号和`yield`，语义更清楚了。`async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。

（3）更广的适用性。

`co`模块约定，`yield`命令后面只能是 Thunk 函数或 Promise 对象，而`async`函数的`await`命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

（4）返回值是 Promise。

`async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作。

进一步说，`async`函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而`await`命令就是内部`then`命令的语法糖。

#### 基本用法

`async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

下面是一个例子。

```js
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
});
```

上面代码是一个获取股票报价的函数，函数前面的`async`关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个`Promise`对象。

下面是另一个例子，指定多少毫秒后输出一个值。

```js
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

上面代码指定 50 毫秒以后，输出`hello world`。

由于`async`函数返回的是 Promise 对象，可以作为`await`命令的参数。所以，上面的例子也可以写成下面的形式。

```js
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

async 函数有多种使用形式。

```js
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
```

#### 语法

##### 返回Promise对象

`async`函数返回一个 Promise 对象。

`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。

```js
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
```

上面代码中，函数`f`内部`return`命令返回的值，会被`then`方法回调函数接收到。

`async`函数内部抛出错误，会导致返回的 Promise 对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到。

```js
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log('resolve', v),
  e => console.log('reject', e)
)
//reject Error: 出错了
```

#### Promise对象状态变化

`async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到`return`语句或者抛出错误。也就是说，只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数。

下面是一个例子。

```js
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"
```

上面代码中，函数`getTitle`内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行`then`方法里面的`console.log`。

#### 错误处理

如果`await`后面的异步操作出错，那么等同于`async`函数返回的 Promise 对象被`reject`。

```js
async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// Error：出错了
```

上面代码中，`async`函数`f`执行后，`await`后面的 Promise 对象会抛出一个错误对象，导致`catch`方法的回调函数被调用，它的参数就是抛出的错误对象。

防止出错的方法，也是将其放在`try...catch`代码块之中。

```js
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}
```

如果有多个`await`命令，可以统一放在`try...catch`结构中。

```js
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}
```

下面的例子使用`try...catch`结构，实现多次重复尝试。

```js
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();
```

上面代码中，如果`await`操作成功，就会使用`break`语句退出循环；如果失败，会被`catch`语句捕捉，然后进入下一轮循环。

#### async 函数的实现原理

async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

```js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

所有的`async`函数都可以写成上面的第二种形式，其中的`spawn`函数就是自动执行器。

`spawn`函数的实现

```js
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

#### 实例：按顺序完成异步操作

实际开发中，经常遇到一组异步操作，需要按照顺序完成。比如，依次远程读取一组 URL，然后按照读取的顺序输出结果。

Promise 的写法如下。

```js
function logInOrder(urls) {
  // 远程读取所有URL
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // 按次序输出
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```

上面代码使用`fetch`方法，同时远程读取一组 URL。每个`fetch`操作都返回一个 Promise 对象，放入`textPromises`数组。然后，`reduce`方法依次处理每个 Promise 对象，然后使用`then`，将所有 Promise 对象连起来，因此就可以依次输出结果。

这种写法不太直观，可读性比较差。下面是 async 函数实现。

```js
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
```

上面代码确实大大简化，问题是所有远程操作都是继发。只有前一个 URL 返回结果，才会去读取下一个 URL，这样做效率很差，非常浪费时间。我们需要的是并发发出远程请求。

```js
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```

上面代码中，虽然`map`方法的参数是`async`函数，但它是并发执行的，因为只有`async`函数内部是继发执行，外部不受影响。后面的`for..of`循环内部使用了`await`，因此实现了按顺序输出。

### Class

#### 基本语法

JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。

基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的`class`改写，就是下面这样。

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

上面代码定义了一个“类”，可以看到里面有一个`constructor()`方法，这就是构造方法，而`this`关键字则代表实例对象。这种新的 Class 写法，本质上与本章开头的 ES5 的构造函数`Point`是一致的。

`Point`类除了构造方法，还定义了一个`toString()`方法。注意，定义`toString()`方法的时候，前面不需要加上`function`这个关键字，直接把函数定义放进去了就可以了。另外，方法与方法之间不需要逗号分隔，加了会报错。

ES6 的类，完全可以看作构造函数的另一种写法。

```js
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

使用的时候，也是直接对类使用`new`命令，跟构造函数的用法完全一致。

```js
class Bar {
  doStuff() {
    console.log('stuff');
  }
}

const b = new Bar();
b.doStuff() // "stuff"
```

构造函数的`prototype`属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的`prototype`属性上面。

```js
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

上面代码中，`constructor()`、`toString()`、`toValue()`这三个方法，其实都是定义在`Point.prototype`上面。

#### 实例属性新写法

[ES2022](https://github.com/tc39/proposal-class-fields) 为类的实例属性，又规定了一种新写法。实例属性现在除了可以定义在`constructor()`方法里面的`this`上面，也可以定义在类内部的最顶层。

```js
// 原来的写法
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

上面示例中，实例属性`_count`定义在`constructor()`方法里面的`this`上面。

现在的新写法是，这个属性也可以定义在类的最顶层，其他都不变。

```js
class IncreasingCounter {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

上面代码中，实例属性`_count`与取值函数`value()`和`increment()`方法，处于同一个层级。这时，不需要在实例属性前面加上`this`。

注意，新写法定义的属性是实例对象自身的属性，而不是定义在实例对象的原型上面。

这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。

```js
class foo {
  bar = 'hello';
  baz = 'world';

  constructor() {
    // ...
  }
}
```

上面的代码，一眼就能看出，`foo`类有两个实例属性，一目了然。另外，写起来也比较简洁。

#### getter和setter

与 ES5 一样，在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

上面代码中，`prop`属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

存值函数和取值函数是设置在属性的 Descriptor 对象上的。

```js
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
```

上面代码中，存值函数和取值函数是定义在`html`属性的描述对象上面，这与 ES5 完全一致。

#### 属性表达式

类的属性名，可以采用表达式。

```js
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```

上面代码中，`Square`类的方法名`getArea`，是从表达式得到的。

#### Class表达式

与函数一样，类也可以使用表达式的形式定义。

```js
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是`Me`，但是`Me`只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用`MyClass`引用。

#### 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

上面代码中，`Foo`类的`classMethod`方法前有`static`关键字，表明该方法是一个静态方法，可以直接在`Foo`类上调用（`Foo.classMethod()`），而不是在`Foo`类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

注意，如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例。

静态方法可以与非静态方法重名。

父类的静态方法，可以被子类继承。

#### 静态属性

静态属性指的是 Class 本身的属性，即`Class.propName`，而不是定义在实例对象（`this`）上的属性。

```js
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

上面的写法为`Foo`类定义了一个静态属性`prop`。

#### 私有方法和属性

在属性名之前使用`#`表示。

#### in运算符

### Class的继承

Class 可以通过`extends`关键字实现继承，让子类继承父类的属性和方法。extends 的写法比 ES5 的原型链继承，要清晰和方便很多。

```js
class Point {
}

class ColorPoint extends Point {
}
```

- 在子类的构造函数中，只有调用`super()`之后，才可以使用`this`关键字，否则会报错。这是因为子类实例的构建，必须先完成父类的继承，只有`super()`方法才能让子类实例继承父类。

- 父类所有的属性和方法，都会被子类继承，除了私有的属性和方法。

- 父类的静态属性和静态方法，也会被子类继承。

- `super`关键字，既可以当作函数使用，也可以当作对象使用。

- 大多数浏览器的 ES5 实现之中，每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype`属性。Class 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链。

​	（1）子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

​	（2）子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

- 子类实例的`__proto__`属性的`__proto__`属性，指向父类实例的`__proto__`属性。也就是说，子类的原型的原型，是父类的原型。

### Module

CommonJS 模块就是对象，输入时必须查找对象属性。

```js
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是整体加载`fs`模块（即加载`fs`的所有方法），生成一个对象（`_fs`），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

ES6 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`命令输入。

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从`fs`模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

#### 严格模式

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上`"use strict";`。

#### export

模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量。下面是一个 JS 文件，里面使用`export`命令输出变量。

```js
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```

上面代码是`profile.js`文件，保存了用户信息。ES6 将其视为一个模块，里面用`export`命令对外部输出了三个变量。

`export`的写法，除了像上面这样，还有另外一种。

```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

上面代码在`export`命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在`var`语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。

`export`命令除了输出变量，还可以输出函数或类（class）。

```js
export function multiply(x, y) {
  return x * y;
};
```

上面代码对外输出一个函数`multiply`。

通常情况下，`export`输出的变量就是本来的名字，但是可以使用`as`关键字重命名。

```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

上面代码使用`as`关键字，重命名了函数`v1`和`v2`的对外接口。重命名后，`v2`可以用不同的名字输出两次。

需要特别注意的是，`export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

#### import

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。

```js
// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

面代码的`import`命令，用于加载`profile.js`文件，并从中输入变量。`import`命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（`profile.js`）对外接口的名称相同。

如果想为输入的变量重新取一个名字，`import`命令要使用`as`关键字，将输入的变量重命名。

```js
import { lastName as surname } from './profile.js';
```

`import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

```js
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
```

上面代码中，脚本加载了变量`a`，对其重新赋值就会报错，因为`a`是一个只读的接口。但是，如果`a`是一个对象，改写`a`的属性是允许的。

```js
import {a} from './xxx.js'

a.foo = 'hello'; // 合法操作
```

上面代码中，`a`的属性可以成功改写，并且其他模块也可以读到改写后的值。不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，不要轻易改变它的属性。

`import`后面的`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径。如果不带有路径，只是一个模块名，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

```js
import { myMethod } from 'util';
```

上面代码中，`util`是模块文件名，由于不带有路径，必须通过配置，告诉引擎怎么取到这个模块。

除了指定加载某个输出值，还可以使用整体加载，即用星号（`*`）指定一个对象，所有输出值都加载在这个对象上面。

```js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

#### export default

使用`import`命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到`export default`命令，为模块指定默认输出。

```js
// export-default.js
export default function () {
  console.log('foo');
}
```

上面代码是一个模块文件`export-default.js`，它的默认输出是一个函数。

其他模块加载该模块时，`import`命令可以为该匿名函数指定任意名字。

```js
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

上面代码的`import`命令，可以用任意名称指向`export-default.js`输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时`import`命令后面，不使用大括号。

`export default`命令用在非匿名函数前，也是可以的。

```js
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
```

上面代码中，`foo`函数的函数名`foo`，在模块外部是无效的。加载的时候，视同匿名函数加载。

#### export和import复合写法

```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

上面代码中，`export`和`import`语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，`foo`和`bar`实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用`foo`和`bar`。

模块的接口改名和整体输出，也可以采用这种写法。

```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```

默认接口的写法如下。

```js
export { default } from 'foo';
```

具名接口改为默认接口的写法如下。

```js
export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;
```

同样地，默认接口也可以改名为具名接口。

```js
export { default as es6 } from './someModule';
```

#### 跨模块常量

```js
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

#### 模块的继承

`circleplus`模块，继承了`circle`模块。

```js
// circleplus.js

export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
```

这时，也可以将`circle`的属性或方法，改名后再输出。

```js
// circleplus.js

export { area as circleArea } from 'circle';
```

上面代码表示，只输出`circle`模块的`area`方法，且将其改名为`circleArea`。

加载上面模块的写法如下。

```js
// main.js

import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));
```

上面代码中的`import exp`表示，将`circleplus`模块的默认方法加载为`exp`方法。
