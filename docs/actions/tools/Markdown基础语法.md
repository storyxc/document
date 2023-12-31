# Markdown基础语法

Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。

Markdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。

Markdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。

Markdown 编写的文档后缀为 .md, .markdown。

## 一、标题
示例:
```txt
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题 
```

## 二、字体
- 加粗
要加粗的文字左右分别用两个*号包起来

- 斜体
要倾斜的文字左右分别用一个*号包起来

- 斜体加粗
要倾斜和加粗的文字左右分别用三个*号包起来

- 删除线
要加删除线的文字左右分别用两个~~号包起来

示例：
```txt
**这是加粗的文字**
*这是倾斜的文字*`
***这是斜体加粗的文字***
~~这是加删除线的文字~~
```

效果:
**这是加粗的文字**
*这是倾斜的文字*`
***这是斜体加粗的文字***
~~这是加删除线的文字~~
## 三、引用
只需要在你希望引用的文字前面加上 `>` 就好，例如：
```txt
> 这是一条引用
```
效果如下:
> 这是一条引用

引用还可以进行多级嵌套
```txt
> 这是一条引用
>> 这是一条引用
>>> 这是一条引用
```


效果:
> 这是一条引用
>> 这是一条引用
>>> 这是一条引用

## 四、分割线
三个或者三个以上的 - 或者 * 都可以。

```txt
---
----
***
*****
```

---
----
***
*****

## 五、图片
语法:
```txt
![图片alt](图片地址 ''图片title'')

图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加
```

示例:
```txt
![示例图片alt](http://io.storyxc.com/images/MegellanicCloud_ZH-CN5132305226_1920x1080.jpg '示例图片title')
```
效果:
![示例图片alt](http://io.storyxc.com/images/MegellanicCloud_ZH-CN5132305226_1920x1080.jpg '示例图片title')

## 六、超链接
语法:
```txt
[超链接名](超链接地址 "超链接title")
title可加可不加
```
示例:
```txt
[故事的博客](https://www.storyxc.com "故事的博客")
```
效果
[故事的博客](https://www.storyxc.com "故事的博客")

## 七、列表
**无序列表**
语法：
无序列表用 - + * 任何一种都可以
示例:
```txt
- 列表1
+ 列表2
* 列表3
```
效果
- 列表1
+ 列表2
* 列表3

**有序列表**
语法：
数字加点
示例:
```txt
1. 111
2. 222
3. 333
```
效果:
1. 111
2. 222
3. 333

**列表嵌套**

上一级和下一级之间tab即可
- 第一层
	- 第二层
		- 第三层

## 八、表格
语法:
```txt
表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

第二行分割表头和内容。
- 有一个就行，为了对齐，多加了几个
文字默认居左
-两边加：表示文字居中
-右边加：表示文字居右
注：原生的语法两边都要用 | 包起来。此处省略

姓名|技能|排行
--|:--:|--:
刘备|哭|大哥
关羽|打|二哥
张飞|骂|三弟
```

效果:
姓名|技能|排行
--|:--:|--:
刘备|哭|大哥
关羽|打|二哥
张飞|骂|三弟

## 九、代码块
- 单行代码：代码之间分别用一个反引号包起来

示例:
```txt
`这是一行代码`
```
效果:
`这是一行代码`

- 代码块
语法:
**使用时把括号去掉**
```txt
(```)语言名
	代码
(```)


```
示例:以java为例
```txt
(```)java
	public class HelloWorld{
		public static void main(Stringargs[]){
			System.out.println("Hello World!");
		}
	}
(```)
```
效果
```java
public class HelloWorld{
	public static void main(String args[]){
		System.out.println("Hello World!");
	}
}
```