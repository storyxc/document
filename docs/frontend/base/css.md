# CSS

## CSS特性

- 继承性
- 层叠性
- 优先级：`继承 < 通配符选择器 < 标签选择器 < 类选择器 < id选择器 < 行内样式 < !important`
  - `!important`写在属性值后面，分号前面
  - `!important`不能提升继承的优先级，只要是继承优先级最低
  - 复合选择器需要根据权重叠加计算（行内样式个数，id选择器个数，类选择器个数，标签选择器个数）

> 书写顺序：浏览器执行效率更高
>
> 1. 浮动 / display
> 2. 盒子模型 margin border padding 宽高背景色
> 3. 文字样式


## 选择器

- 标签选择器 `tagName { css }`

- 类选择器: `.class { css }`

- id选择器: `#id { css }`

- 通配符选择器: `* { css }`

- 复合选择器
  - 后代选择器: `选择器1 选择器2 { css }`
    - 后代包含所有：子、孙子。。
  - 子代选择器: `选择器1 > 选择器2 { css }`
    - 只包括子
  
- 属性选择器: `选择器[attribute=xxx]`
  
- 并集选择器: `选择器1,选择器2 { css }`

- 交集选择器: `选择器1选择器2 { css }`
  - 如果有标签选择器，标签选择器必须写在最前面
  
- 伪类选择器: `标签:伪类选择器 { css }`

  - 伪类

    - 状态（hover/active..)
    - 结构（fisrt-child/last-child/nth-child()/nth-last-child())

  - 伪对象

    - 页面中非主体内容可以使用伪对象，由css模拟出标签效果

    - `::before`、`::after`

    - ```css
      .content::before {
        content: 'test1';
      }
      
      .content::after {
        content: 'test2';
      }
      ```

    - 默认是行内元素，content必须添加 否则伪对象不生效


## 字体和文本样式

### 字体样式

- 字体大小：font-size
  - 取值：数字+px，Google Chrome默认16px

- 字体粗细：font-weight
  - 关键字：normal/bold/bolder/lighter
  - 数字：100-900的整百数，正常400 加粗700

- 字体样式：font-style
  - 正常：normal
  - 倾斜：italic

- 字体类型：font-family
  - 从左往右查找，如果未安装，则显示下一个，如果都不支持则显示最后字体系列的默认字体，多个字体推荐引号包裹，最后一个字体系列不需要引号

- 字体类型：属性连写
  - style weight size family
  - 只能省略前两个，省略相当于设置默认值
  - 如果同时使用单独和连写，要么把单独的写在连写下面，或者写在连写里面

### 文本样式

- 文本缩进：text-indent
  - 取值：数字+px或者数字+em，推荐使用em（1em = 当前标签font-size的大小）

- 文本水平对齐方式（内容对齐方式）：text-align
  - left/center/right
  - 如果需要让文本水平居中，text-align属性给文本所在的标签设置
  - 能让哪些元素水平居中：文本、span、a、input、img，需要给元素的父元素设置居中

- 文本修饰：text-decoration
  - underline 下划线
  - line-through 删除线
  - overline 上划线
  - none 无装饰线

- 行高：line-heigh
  - 行高：上间距+文本高度+下间距
  - 控制两行文字之间的距离
  - 取值：数字+px / 倍数 （当前标签font-size的倍数）
  - 应用：
    - 让单行文本垂直居中可以设置line-height：文字父元素高度 
    - 网页精准布局会设置`line-height：1;`可以取消上下间距
  - 行高和font连写的注意点：
    - 如果同时设置了行高和font连写，需要注意覆盖问题 
    - `font: style weight size/line-height family;`



## 背景属性

### 背景色

- 属性：backgroud-color

- 取值：
  - 关键字
  - rgb
  - rgba
  - 十六进制
- 默认是透明：rgba(0,0,0,0)、transparent

### 背景图

- 属性：backgroud-image
- backgroud-image: url('图片链接')
- url可以省略引号
- 背景图默认水平和垂直方向平铺

### 背景平铺

- 属性：background-repeat
- 取值：repeat、no-repeat、repeat-x、repeat-y

### 背景位置

- background-position
- 取值
  - 方位：
    - 水平：left、center、right
    - 垂直：top、center、bottom
  - 数字+px
    - 坐标系原点(0,0)，图片左上角
    - x轴 水平向右（图片向左移动取负数、向右移动取正数）
    - y轴 垂直向下（图片向上移动取负数、向下移动取正数）
- 方位和坐标可以混用，第一个值为水平，第二个值为垂直

### 背景属性连写

- background: color image repeat position

## 元素显示模式

### 元素显示模式

- 块级元素
  - 显示特点：独占一行，宽度默认是父元素宽度，高度默认由内容撑开，可以设置宽、高
  - 代表标签：div、p、h、ul、li、dl、dt、dd、form、header、nav、footer。。。
- 行内元素
  - 显示特点：一行可以显示多个，宽度和高度默认由内容撑开，不能设置宽、高
  - 代表标签：a、span、b、u、i、s、strong、ins、em、del。。。
- 行内块元素
  - 显示特点：一行可以显示多个，可以设置宽、高
  - 代表标签：input、textarea、button、select
  - 特殊：img标签有行内块特点，但是Chrome显示是inline

### 元素显示模式转换

```css
span {
  display: inline-block;
}

div {
  display: inline;
}

button {
  display: block;
}

```



## 盒子模型

页面中的每一个标签都可以看作一个“盒子”，通过盒子的视角更方便的进行布局。

每个盒子分别由：内容区域（content）、内边距区域（padding）、边框区域（border)、外边距区域（margin）构成。

---

- 内容区域宽高：weight/height
  - 取值 数字+px
- 边框：border
  - border：10px solid red;
  - border-top/bottom/left/right
- 内边距：padding
  - 四方向顺序：上 右 下 左 （从上顺时针取值）

> border和padding会撑大盒子，css属性box-sizing: border-box; 可以设置内减模式

- 外边距：margin

  - 顺序和padding一样

  - 清除默认的内外边距

    - ```css
      * {
        margin: 0;
        padding: 0;
      }
      ```

  - 版心居中

    - ```css
      #main {
        margin: 0 auto;
      }
      ```


> 顺序： 宽高背景色-> 放内容 -> 调整位置 -> 调整文字细节



-  外边距问题
  - 折叠现象：垂直布局的块级元素，上下的margin会被合并，取两者的最大值
  - 塌陷现象：互相嵌套的块级元素，子元素的margin-top会作用在父元素上
    - 解决：1.父元素设置border-top或者padding-top(分隔父子元素的margin-top) 2.父元素设置`overflow: hidden;`3.转换为行内块元素4.设置浮动

- 行内元素的内外边距问题：如果想通过margin/padding改变行内元素的**垂直**（top/bottom）位置，无法生效
  - 解决：设置行高

## 浮动

### 标准流

- 标准流：又称文档流，浏览器在渲染显示网页内容时默认采取的一套排版规则，规定了何种方式排列元素
  - 块级元素：从上往下，垂直布局，独占一行
  - 行内元素/行内块元素：从左往右，水平布局，空间不够自动折行

### 浮动作用

- 早期：图文环绕
- 现在：网页布局

> 块级元素转行内块时 换行会产生空格

### 浮动的规则

- 向左浮动或者向右浮动直到**自己的边界紧贴着包含块**（一般是父元素）或者**其他浮动元素的边界**为止

- 不能超出包含块，如果元素是向左（右）浮动，浮动元素的左（右）边界不能超出包含块的左（右）边界

- 浮动元素不能层叠

  - 如果一个元素浮动，另一个浮动元素已经在那个位置了，后浮动的元素将**紧贴着前一个浮动元素**（左浮找左浮，右浮找右浮）
  - **如果水平方向剩余的空间不够显示浮动元素，浮动元素将向下移动，直到有充足的空间为止**

- 浮动元素会将行内级元素内容推出

  - 浮动元素**不能与行内级内容层叠**，行内级内容将会被浮动元素推出
  - 比如**行内级元素**、**inline-block元素**、块级元素的**文字内容**

  - 图文环绕效果

- 浮动只能左右浮动, 不能超出本行的高度

  - 行内级元素、inline-block元素浮动后，其顶部将与所在行的顶部对齐

### 浮动特点

- 浮动元素会脱离标准流，在标准流中不占位置
  - 相当于从地面飘到了空中
- 浮动元素比标准流高半个级别，可以覆盖标准流中的元素
- 浮动找浮动，下一个浮动元素会在上一个浮动元素后面左右浮动
- 浮动元素有特殊的显示效果
  - 一行可以显示多个
  - 可以设置宽高

> 浮动的元素不能通过text-align: center 或者margin: 0 auto居中

### 清除浮动

- 含义：清除浮动带来的影响。如果子元素浮动，此时子元素不能撑开标准流的块级父元素

- 原因：子元素浮动后脱离标准流 -> 不占位置
- 目的：需要父元素有高度，不影响其他元素的布局

- 方法：

  - 给父元素加高度

  - 额外标签：给父元素内容的最后加一个块级元素，给添加的块级元素设置`clear: both;`

  - 单伪元素：用伪元素代替额外标签 

    ```css
    .clearfix::after {
      content: '';
      display: block;
      clear: both;
    }
    ---
    .clearfix::after {
      content: '';
      displat: block;
      clear: both;
      height: 0;
      visibility: hidden;
    }
    ```

  - 双伪元素：

    ```css
    .clearfix::before, /* 解决外边距塌陷问题 */ 
    .clearfix::after {
      content: '';
      display: table;
    }
    .clearfix::after {
      clear: both;
    }
    ```

  - 父元素设置overflow: hidden

    > BFC（Block Formatting Context）全称是块级格式化上下文，用于对块级元素排版，默认情况下只有根元素（body）一个块级上下文，但是如果一个块级元素设置了float:left,overflow:hidden或position:absolute样式，就会为这个块级元素生产一个独立的块级上下文，使这个块级元素内部的排版完全独立。
    >
    > 作用：独立的块级上下文可以包裹浮动流，全部浮动子元素也不会引起容器高度塌陷，就是说包含块会把浮动元素的高度也计算在内，所以就不用清除浮动来撑起包含块的高度。
    >
    > 那什么时候会触发 BFC 呢？常见的情况如下：
    >
    > • 根元素；
    >
    > • float的值不为none；
    >
    > • overflow的值为auto、scroll或hidden；
    >
    > • display的值为table-cell、table-caption和inline-block中的任何一个；
    >
    > • position的值不为relative和static。



## 定位

### 作用

1. 可以让元素自由的摆放在网页的任意位置
2. 一般用于盒子之间的层叠情况

### 常见应用场景

- 可以解决盒子与盒子之间层叠问题
  - 定位后的元素层级最高，可以层叠在其他盒子上面
- 可以让盒子始终固定带屏幕中的某个位置

### 使用

- 设置定位方式

  - 属性名：`position`

  - 常见属性：

    - 静态定位：static

      - 元素处于标准流中，默认设置

    - 相对定位：relative，相对自己之前的位置进行移动

      - 需要配合方位属性实现移动
      - 相对自己原来的位置移动
      - 在页面中占位置（没有脱标）
      - 应用场景：1.配合绝对定位（子绝对 父相对） 2.用于小范围移动

    - 绝对定位：absolute，先找已经定位的父级（逐级查找），如果有这样的父级就以这个父级为参照定位，有父级但父级没有定位则以浏览器为参照定位

      - 页面中**不占位置（脱标）**

      - 改变标签的显示模式特点，**具备行内块特点**

      - 绝对定位的元素不能使用`margin: 0 auto`居中

        - ```css
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          ```

    - 固定定位：fixed，相对于浏览器进行定位移动

      - 需要配合方位属性实现移动
      - 相对浏览器可视区域进行移动
      - 在页面中**不占位置（脱标）**，**具备行内块特点**
      - 应用场景：让盒子固定在屏幕中某个位置

- 设置偏移值

  - 偏移值分为两个方向，水平和垂直方向各选一个使用即可，水平以left为准，垂直以top为准
  - 选取原则一般是就近原则



### 元素层级问题

#### 不同布局方式元素的层级关系

- 标准流 < 浮动 < 定位

#### 不同定位之间的层级关系

- 相对、绝对、固定默认层级相同
- 此时默认HTML中写在下面的元素层级更高，会覆盖上面的元素
- z-index（配合定位才生效）：整数，取值越大，层级越高，显示顺序越靠上，z-index默认为0





## 定位装饰

### 垂直对齐方式

- 属性：vertical-align
- 取值：baseline(默认，基线对齐)、top（顶部对齐）、middle（中部对齐）、bottom（底部对齐）

> 浏览器遇到行内和行内块标签当作文字处理，默认文字按照基线对齐

### 光标类型

- 属性：cursor
- 常见取值：
  - default（默认，通常是箭头）
  - pointer（小手，提示可以点击）
  - text（工字型，提示可以选择）
  - move（十字光标，提示可以移动）

### 边框圆角

- 属性：border-radius

- 常见取值：数字+px、百分比
- 赋值：从左上角开始，顺时针赋值，没有赋值的看对角

> 正圆：正方形盒子，border-radius: 50%
>
> 胶囊按钮：长方形盒子，border-radius: 高度的一半
>
> 百分比表示的是圆角半径的大小为盒子较小边长的一半，例如盒子宽200px，高100px，border-radius: 50% 50%;  则这两个50%都是相对于100px的。

### 溢出部分显示效果

- 属性：overflow
- 常见取值：
  - visible 默认值，可见
  - hidden 隐藏
  - scroll 始终显示滚动条
  - auto 自动显示、隐藏滚动条

### 元素本身隐藏

- 属性：
  - visibility: hidden(占位隐藏)
  - display: none（不占位隐藏）

### 元素整体透明度

- 属性：opacity
- 取值：0-1之间数字，1完全不透明，0完全透明
- 特点：opacity会让元素整体透明，包括里面的文字、子元素等



## 补充

### 精灵图

CSS精灵图是一种将多个小的背景图片合并到一张大图中的技术，通过CSS的background-position属性控制显示不同的小图片，达到减少HTTP请求、减小页面大小、提高加载速度的效果。

CSS精灵图可以将多个小背景图像合并为一张大图，这样在页面上加载一次大图后，就可以通过background-position属性来控制显示不同的小图像，实现了将多个HTTP请求转化为一次请求，减小了网络延迟和服务器压力。同时，由于减少了HTTP请求和加载的内容大小，减小了页面的带宽消耗，加快了网页的加载速度，提高了用户的体验感受。

在web前端开发中，经常使用CSS精灵图技术，特别是在一些需要大量小icon的场合，如网站菜单栏、按钮、分页等等。

### 背景图片大小

- 设置背景图片的大小：`background-size: 宽 高`

- 取值
  - 数字+px
  - 百分比
  - contain：等比例缩放，直到不会超出盒子的最大
  - cover：等比例缩放，直到刚好填满整个盒子

### background连写

`backgound：color image repeat position/size`

### 盒子阴影

- 属性：`box-shadow`
- 取值
  - h-shadow：必须，水平偏移量，允许负值
  - v-shadow：必须，垂直偏移量，允许负值
  - blur：可选，模糊度
  - spread：可选，阴影扩大
  - color：可选，阴影颜色
  - inset：可选，改为内部阴影

### 过渡

- 属性：`transition`
- 作用：让元素样式慢慢变化，常配合hover使用
- 常见取值
  - 过渡属性：all（所有能过渡的属性都过渡）、具体属性名如width（只有width过渡）
  - 过渡时长： 数字+s
- 注意点
  - 默认状态和hover状态样式不同才有过渡效果
  - transition属性需要给过渡的元素本身加
  - transition属性设置在不同状态中，效果不同
    - 给默认状态设置，鼠标移入移出都有效果
    - 给hover状态设置，只有移入有过渡效果

>.box {
>
>​	width: 200px;
>
>​	height: 200px;
>
>​	background-color: pink;
>
>​	/*transition: all 1s*/
>
>​	transition: width 1s, background-color 2s;
>
>}
>
>.box hover {
>
>​	width: 600px;
>
>​	background-color: red;
>
>}

### 字体图标

- 展示的是图标，实质是文字，用作处理简单的、颜色单一的图片

- iconfont

- `<link rel="stylesheet" href="./iconfont.css"`

- `<span class="iconfont icon-kuaijiezhifu"></span>`

### 平面转换

平面转换（2D转换）：改变盒子在平面内的形态，可以使用transform属性实现元素的位移、旋转、缩放等效果

#### 位移

- `transform: translate(水平移动距离, 垂直移动距离)`
- 取值： 1.像素单位数值 2.百分比（参照为自身盒子尺寸）
- 只给一个值代表x轴位移，单独设置:tranlateX() / translateY()

#### 旋转

- 语法：`transform: rotate(度数 + deg);` 正数：顺时针；负数：逆时针
- transform-origin
  - 作用：改变转换的原点，默认的原点是盒子中心点
  - `transform-origin: 原点水平位置 原点垂直位置`
  - 取值：方位名词（left、top、right、bottom、center
  - 像素
  - 百分比

#### 多重转换

`transform: translate() rotate()`

> rotate会改变坐标轴向，位移方向会受影响
>
> 多重转换如果涉及旋转，旋转往最后写

#### 缩放

- scale：改变元素尺寸
- 语法：`transform: scale(x轴缩放倍数, y轴缩放倍数) `
- 一般transform: scale(缩放倍数)，等比缩放
- scale大于1表示放大，小于1表示缩小

#### 渐变

linear-gradient



### 空间转换

在空间内位移、旋转、缩放等效果

#### 空间位移

`transform: tranlate3d(x,y,z)`

> 单个坐标轴`transform: translat[X|Y|Z]`

#### 透视

使用perspective(视距)属性实现透视效果，**添加给父级元素**，取值一般800-1200

#### 空间旋转

`transform: rotateX()`

`transform: rotateY()`

`transform: rotateZ()`

`transform: rotate3d(x,y,z,角度度数)`：用来设置自定义旋转轴的位置及旋转角度，xyz取值为0-1之间的数字

#### 立体呈现

使用`transform-style： perserve-3d`呈现立体图形

- 父元素添加`transform-style： perserve-3d`使子集元素处于3d空间

- 默认值flat，表示子元素处于2D平面

#### 空间缩放

`transform: scaleX()`

`transform: scaleY()`

`transform: scaleY()`

`transform: scale3d(x,y,z)`

### 动画

使用`animation`实现多个状态间的变化过程，动画过程可控（重复播放、最终画面、是否暂停）

#### 实现步骤

1. 定义动画

   ```css
   @keyframes 动画名称 {
     from {}
     to {}
   }
   
   @keyframes 动画名称 {
     /* 百分比指的是动画总时长的占比 */
     0% {}
     10% {}
     15% {}
     100% {}
   }
   ```

2. 使用动画: `animation: 动画名称 动画花费时长`

#### 动画属性

`animation: 动画名称 动画时长 速度曲线 延迟时间 重复次数 动画方向 执行完毕时状态 播放状态`

- 动画名称和动画时长必须赋值
- 取值不分先后顺序
- 如果有2个时间，第一个表示动画时长，第二个表示延迟时间

> - animation-name:
> - animation-duration
> - animation-timing-function:ease;ease-in;ease-out;ease-in-out;linear;step;
> - animation-delay
> - animation-iteration-count: 1,2,..infinite;
> - animation-direction: normal;reverse;alternate;alternate-reverse;
> - animation-fill-mode: forward;backward;both;
> - animation-play-state: pause;running;
> - animation-

#### 多组动画

`animation: 动画1,动画2...,动画n`;



## 

## flex布局

- 是一种浏览器提倡的布局模型
- 布局网页更简单、灵活
- 避免了`浮动`脱标的问题

### 组成部分

- 弹性容器
- 弹性项
- 主轴
- 侧轴/交叉轴

#### 语法

```css
display: flex;
```

### 主轴对齐方式

#### 主轴整体对齐

- justify-content

- 取值：
  - left/right
  - start/end
  - flex-start
  - flex-end
  - center
  - space-between
  - space-around
  - space-evenly
  - first/last baseline

#### 主轴单行对齐方式

- justify-items：相当于给给每个项设置默认的justify-self值

#### 主轴单个对齐方式

- justify-self

### 侧轴对齐方式

#### 侧轴多行整体对齐

- 属性：align-content

#### 侧轴单行对齐方式

- 属性：align-items，相当于给每个项设置默认的align-self值
- 取值：
  - center
  - stretch: 拉伸,默认值
  - start/end
  - flex-start/flex-end
  - self-[start/end]
  - first/last baseline

#### 侧轴单个对齐方式

- 属性：align-self

### 伸缩比

- 属性：`flex `
- 说明: flex是`flex-grow`（增长系数）、`flex-shrink`（收缩系数）和`flex-basis`（初始尺寸）三个属性的简写，第一个无单位数代表flex-grow、第二无单位数代表flex-shrink，带像素单位的是flex-basis的值

### 修改主轴方向

- 属性：flex-direction
- 取值：
  - row
  - column
  - row-reverse
  - column-reverse

### 弹性项换行

- 属性：flex-wrap
- 取值：
  - nowrap
  - wrap
  - wrap-reverse

### flex-flow

- flex-flow：flex-direction flex-wrap;

## 移动适配

### rem

- 相对单位
- rem单位是相对HTML标签的字号计算结果
- 1rem=1HTML字号大小
- 将网页等分成10份，HTML标签的字号为视口宽度的1/10
- px单位数值/基准根字号

### 媒体查询

```css
@media 逻辑操作符 媒体类型 and (媒体特性) {
  选择器 {
    CSS属性
  }
}

@media (媒体特性) {
  选择器 {
    CSS属性
  }
}

@media (min-width:320px) {
  html {
    font-size: 32px;
  }
}
```

> <link rel="stylesheet" href="./one.css" media="(min-width: 992px)">
> <link rel="stylesheet" href="./two.css" media="(min-width: 1200px)">

#### 关键词

- and
- only
- not
- or

#### 媒体类型

- screen（带屏幕的设备）
- print（打印预览模式）
- speech（屏幕阅读模式）
- all（默认值）

#### 媒体特性

- 视口宽高：width、height、max-width、max-height、min-width、min-height
- 屏幕方向：orientation，portrait竖屏，landscape横屏

### vw/vh

- vw = 1/100视口宽度
- vh = 1/100视口高度



## Less

Less（Leaner Style Sheets）是一门向后兼容的CSS 扩展语言，是一个CSS预处理器，扩充了CSS，使CSS具备一定的逻辑性、计算能力。

> https://less.bootcss.com

### 变量

```less
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```

编译为

```css
#header {
  width: 10px;
  height: 20px;
}
```

### 混合

```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```

`.bordered` 类所包含的属性就将同时出现在 `#menu a` 和 `.post a` 中了。

### 嵌套

```less
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

```css
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

#### 规则嵌套和冒泡

```less
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}
```

编译为

```css
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```

### 运算

算术运算符 `+`、`-`、`*`、`/` 可以对任何数字、颜色或变量进行运算。如果可能的话，算术运算符在加、减或比较之前会进行单位换算。计算的结果以最左侧操作数的单位类型为准。如果单位换算无效或失去意义，则忽略单位。无效的单位换算例如：px 到 cm 或 rad 到 % 的转换。

```less
// 所有操作数被转换成相同的单位
@conversion-1: 5cm + 10mm; // 结果是 6cm
@conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // 结果是 4px

// example with variables
@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%
```

乘法和除法不作转换。因为这两种运算在大多数情况下都没有意义，一个长度乘以一个长度就得到一个区域，而 CSS 是不支持指定区域的。Less 将按数字的原样进行操作，并将为计算结果指定明确的单位类型。

```less
@base: 2cm * 3mm; // 结果是 6cm
```

### 转义

转义（Escaping）允许你使用任意字符串作为属性或变量值。任何 `~"anything"` 或 `~'anything'` 形式的内容都将按原样输出，除非 [interpolation](https://less.bootcss.com/features/#variables-feature-variable-interpolation)。

```less
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

编译为：

```less
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```

注意，从 Less 3.5 开始，可以简写为：

```less
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

### 函数

Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。这些函数在[Less 函数手册](https://less.bootcss.com/functions/)中有详细介绍。

函数的用法非常简单。下面这个例子利用 percentage 函数将 0.5 转换为 50%，将颜色饱和度增加 5%，以及颜色亮度降低 25% 并且色相值增加 8 等用法：

```less
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```

### 映射

从 Less 3.5 版本开始，你还可以将混合（mixins）和规则集（rulesets）作为一组值的映射（map）使用。

```less
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

输出符合预期：

```css
.button {
  color: blue;
  border: 1px solid green;
}
```

### 作用域

Less 中的作用域与 CSS 中的作用域非常类似。首先在本地查找变量和混合（mixins），如果找不到，则从“父”级作用域继承。

```less
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
```

与 CSS 自定义属性一样，混合（mixin）和变量的定义不必在引用之前事先定义。因此，下面的 Less 代码示例和上面的代码示例是相同的：

```less
@var: red;

#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```

### 导入

```css
@import "library"; // library.less
@import "typo.css";
```

> 被引入的less文件不会生成单独的css文件

### 控制Less编译输出

> webstorm FileWatcher配置：
>
> - npm install -g less
> - aruments:`--no-color $FileName$ ../css/$FileNameWithoutExtension$.css`
> - output paths to refresh : `../css/$FileNameWithoutExtension$.css`
>
> VS Code EasyLess配置：
>
> - out: "../css/"
> - 首行添加注释控制编译的输出情况
>   - // out: ./dir/
>   - // out: ./dir/xxx.css
>   - // out: false

## BootStrap

> `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">`
>
> `<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>`

### 栅格系统

- 栅格化是指将整个网页的宽度分成若干等份，BootStrap3默认将网页分为12等份

|          | 超小屏幕 | 小屏幕   | 中等屏幕 | 大屏幕   |
| -------- | -------- | -------- | -------- | -------- |
| 响应断点 | <768px   | >=768px  | >=992px  | >=1200px |
| 别名     | xs       | sm       | md       | lg       |
| 容器宽度 | 100%     | 750px    | 970px    | 1170px   |
| 类前缀   | col-xs-* | col-sm-* | col-md-* | col-lg-* |
| 列数     | 12       | 12       | 12       | 12       |
| 列间隙   | 30px     | 30px     | 30px     | 30px     |

- `.container`是BootStrap中提供的类名，应用该类名的盒子，默认被指定宽度且居中
- `.container-fluid`是BootStrap中提供的类名，所有应用的盒子，宽度为100%
- 分别用`.row`类名和`.col`类名定义栅格布局的行和列

::: tip

1. container类自带间距15px
2. row类自带间距-15px

:::

### bootstrap样式

https://v3.bootcss.com/css/

### bootstrap组件

https://v3.bootcss.com/components/



## Record

#### 滚动条滑动效果

```css
html {
  scroll-behavior: smooth;
}
```

