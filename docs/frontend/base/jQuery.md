# jQuery

## 顶级对象

`$`是jQuery的别称，也是jQuery的顶级对象，相当于原生JavaScript肿的window，把元素用`$`包装成jQuery对象，就可以调用jQuery的方法。

## 入口函数

```js
$(document).ready(function () {
    //do something
});
$(function () {
    //do something
})
```

## DOM对象和jQuery对象

- 用原生JS获取的对象是DOM对象
- jQuery方法获取的元素是jQuery对象，本质是`$`对DOM对象包装后产生的对象（伪数组形式存储）
- DOM和jQuery对象互相转换
    - DOM对象转jQuery对象：`$(dom对象)`
    - jQuery对象转DOM对象
        - `$('div')[index]`
        - `$('div').get(index)`

## jQuery常用API

### 选择器

- `$("选择器")`
- 筛选选择器
    - `$('li:first')`
    - `$('li:last')`
    - `$('li:eq(2)')`：索引号等于2
    - `$('li:odd')`:索引号为奇数
    - `$('li:even')`：索引号为偶数
- 筛选方法
    - parent()
    - children(selector)
    - find(selector)
    - siblings(selector):查找兄弟节点 不包括本身
    - nextAll([expr])：查找当前元素之后所有同辈元素
    - prevtAll([expr])：查找当前之前所有同辈元素
    - hasClass(class)
    - eq(index)

> 遍历DOM元素（伪数组形式存储）的过程叫隐式迭代：给匹配到的所有元素进行循环遍历，执行相应的方法，而不用手动进行循环调用
>
> jQuery支持链式编程

### 样式操作

- 操作样式：`jQuery对象.css(属性, 值)`
- 参数可以是对象形式，设置多组样式:`jQuery对象.css({"color": "pink", "font-size": "15px"})` (属性可以不用加引号)
- 获取样式属性值：`jQuery对象.css(属性)`
- 设置类样式：
    - `jQuery对象.addClass(className)`
    - `jQuery对象.removeClass(className)`
    - `jQuery对象.toggleClass(className)`

### 效果

#### 显示隐藏

- show([speed, [easing], [fn]])
    - 参数都可以省略，无动画直接显示
    - speed：三种预设速度之一的字符串(slow/normal/fast)或表示动画时长的毫秒数值
    - easing：用来切换指定效果，默认`swing`，可用参数`linear`
    - fn：回调函数，在动画完成时执行的函数，每个元素执行一次
- hide()
- toggle()

#### 滑动

- slideDown()
- slideUp()
- slideToggle()

> 动画队列停止排队：stop()，必须写在动画的前面
>
> jQuery对象.children("ul").stop().slideToggle()

#### 淡入淡出

- fadeIn()
- fadeOut()
- fadeToggle()
- fadeTo([[speed], opacity, [easing], [fn]]):修改透明度

#### 自定义动画

- animate(params, [speed], [easing],[fn])
- params:想要更改的样式属性，以对象形式传递，必传。属性名可以不带引号，如果是复合属性需要采取驼峰命名

### 属性操作

- prop(属性名):获取元素固有属性
- prop(属性名, 值)：设置元素固有属性
- attr(属性名)：获取元素自定义属性
- attr(属性名, 值)：设置元素自定义属性
- data()：可以在指定元素上存取数据，并不会修改DOM元素结构，页面刷新，存放的数据会被移除，也可以获取h5自定义属性，不用data-开头

### 文本属性

- html()：相当于原生js中的innerHTML
- text()：相当于原生js中的innerText
- val()：相当于原生js的value

### 元素操作

```txt
- jQuery对象.each(function(index, domElement) { } )：遍历匹配的每一个元素，index是索引号，domElement是DOM元素对象，不是jQuery对象
- $.each(obj, function(index, domElement) { })：遍历指定对象
- 创建元素：var li = $("<li> </li>")
- 添加元素
  - element.append(li)：拼接到最后
  - element.prepend(li)：插入到最前
  - element.before(li)：放到元素之后
  - element.after(li)：放到元素之前
- 删除元素
  - element.remove()：删除匹配的元素
  - element.empty()：删除匹配元素的子节点
  - element.html("")：等价于empty()
```

### 尺寸、位置操作

#### 尺寸

- width()/height()：只包含宽高
- innerWidth()/innerHeight()：+padding
- outerWidth()/outerHeight()：+padding、border
- outerWidth(true)/outerHeight(true)：+padding、border、margin

#### 位置

```text

- offset()：设置或返回被选元素相对于文档(document)的偏移坐标，跟父级没有关系
    - 有两个属性left、top
    - 修改传递对象{top: 10, left: 30}
- position()：返回被选元素相对**带有定位父级**偏移坐标，如果父级都没有定位，以文档为准
- scrollTop()/scrollLeft()：被卷去的头部/左侧
    - 可以传递参数直接跳到指定位置
```

### jQuery事件

#### 事件注册

- `element.事件(function(){})`

#### 事件处理

##### on

- `element.on(events, [selector], fn)`
    - events：一个或多个用空格分隔的事件类型，如click、keydown
    - selector：元素的子元素选择器
    - fn：回调函数，即绑定在元素身上的侦听函数

```js
$("div").on({
    mouseenter: function () {
        $(this).css("background", "skyblue");
    },
    click: function () {
        $(this).css("background", "red");
    }
});

$("div").on("mouseenter mouseleave", function () {
        $(this).toggleClass("current")
    }
);


```

##### 事件委托

事件绑定在父元素上

```js
$("ul").on("click", "li", function () {
    alert('111')
})
```

##### on可以给未来元素绑定事件

##### 事件解绑off

- `element.off()`解绑所有
- `element.off(事件1，事件2...)`解绑指定

###### 只触发一次的事件one

`element.one(事件,fn)`

##### 自动触发

- element.事件()
- element.trigger(事件)
- element.triggerHandler(事件)：不会触发元素的默认行为

#### 事件对象

事件被触发，就会有事件对象的产生

`````js
element.on(events, [selector], function (event) {
    console.log(event)
    event.preventDefault();//阻止默认行为
    return false; //阻止默认行为
    event.stopPropagation();//阻止冒泡
})
`````

### 其他方法

#### 拷贝对象

`$.extend([deep], target, object1, [objectN])`

- deep:true-深拷贝，默认false-浅拷贝
- target：目标对象
- object：源对象

- objectN：第N个源对象，会覆盖前面的相同属性

#### 多库共存

- `$`统一改为`jQuery`
- 新的名称`$.noConflict()`/`jQuery.noConflict()`

#### jQuery插件

- 瀑布流
- 图片懒加载
- 全屏滚动:fullpage.js
- Bootstrap组件、插件

## jQuery请求

- `$.get(url, [data], [callback])`

  ```js
  $(function() {
    $('#btn').on('click', function() {
        $.get('xxx.com/api/getXxx', 'a=b', function(res) {
            console.log(res)
        })
    })
  })
    ```

- `$.post(url, [data], [callback])`

  ```js
  $(function() {
    $('#btn').on('click', function() {
        $.get('xxx.com/api/getXxx', {"a": "b"}, function(res) {
            console.log(res)
        })
    })
  })
    ```


- `$.ajax()`

  ```js
  $.ajax({
    type: '',
    url: '',
    data: {},
    success: function(res) {}
  })
  ```
