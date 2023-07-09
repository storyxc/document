# python基础语法



## 第一个Python程序

```python
print('hello world')
```



 ## 基础语法

### 标识符

- 第一个字符必须是字母或下划线`_`
- 标识符由字母、数字、下划线组成
- 标识符对大小写敏感

python3中支持中文变量名

### python关键字

```python
import keyword


print(keyword.kwlist)


['False', 'None', 'True', '__peg_parser__', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

### 注释

python中单行注释`#`

多行注释可以多个`#`或者三单引号`'''`和三双引号`"""`

### 行与缩进

python使用缩进来表示代码块，而不是像Java一样的`{}`，目前还很不习惯。。

```python
if True:
    print('true')
else:
    print('false')
```

### 多行语句

python一般一行写一条一句，特殊情况可以使用反斜杠`\`实现多行语句

```python
total = item_one + \
        item_two + \
        item_three
```

在`[]`,`{}`,`()`中的多行语句不需要`\`

### 数字类型

python中的数字有四种类型：

- int整型
- bool布尔
- float浮点
- complex复数 例如 1+2j

### 字符串

- python中的单引号和双引号完全相同
- 使用三引号可以指定多行字符串
- 转义符`\`
- 反斜杠可用作转移，使用r可以让反斜杠不发生转义。例如 r‘this is a line with \n’ 则会显示\n而非换行
- 级联字符串“this” “is” “string” 会转换为“this is string”
- 字符串可以用+运算符实现拼接，用*表示重复
- python中字符串有两种索引方式，从左往右从0开始，从右往左从-1开始
- python中字符串不能改变（和java一样）
- python没有字符类型，一个字符就是长度为1的字符串
- 字符串切片：变量[头下标:尾下标:步长]

### 空行

函数之间或类之间用空行分隔，一般是两个空行，以分隔两段不同功能或含义的代码

同一行显示多条语句

使用`;`分隔（ps，python的语句后面不用每行加分号，好不习惯。。。）

### 代码块

缩进相同的一组语句构成一个代码块，我们称首行及后面的代码称为一个子句（clause）

### print输出

print输出类似java中的println，默认是换行的，如果不想换行在print函数中加入参数`ene=''`

例如 `print('x', end ='' )`



## 基本数据类型

python中的变量不需要声明（但python是强类型语言），使用变量前必须赋值，赋值以后变量才会创建。

在python中，变量就是变量，没有类型。我们所说的类型是变量所指的内存中对象的数据类型

### 多个变量赋值

```python
a = b = c = 1
```

以上实例，创建一个整型对象1，从后向前赋值，三个变量被赋予相同的值

```python
a, b, c = 1, 2, 'noob'
```

以上实例，两个整型对象1，2分配给a和b，字符串对象`noob`分配给变量c



### 标准数据类型

python3中有六个标准数据类型

- Number
- String
- List
- Tuple
- Set
- Dictionary

其中

- 可变数据类型：List、Dictionary、Set
- 不可变：Number、String、Tuple



### 判断数据类型

`type()`函数或者`isinstance()`函数

区别：

- type()不会认为子类是父类的类型
- isinstance()会认为子类是父类类型



### 数值运算符

特殊：

- `//`除法，得到一个整数
- `%`取余数（取模）
- 混合计算时，python会把整型转换为浮点型



### String

python的字符串用单引号或双引号括起来

#### 特殊用法:
定义字符串时 加前缀 u/b/r/f
- u:作用以Unicode格式编码字符串,一般用在中文字符串前面，防止因为源码储存格式问题，导致再次使用时出现乱码
- b:表示：后面字符串是bytes 类型
- r:作用是去除转义字符
- f:作用是支持大括号内的python 表达式

字符串截取语法：`变量[头下标:尾下标]` 前闭后开

字符串的切片: 

```python
str = 'Runoob'

print (str)          # 输出字符串
print (str[0:-1])    # 输出第一个到倒数第二个的所有字符 
print (str[0])       # 输出字符串第一个字符
print (str[2:5])     # 输出从第三个开始到第五个的字符
print (str[2:])      # 输出从第三个开始的后的所有字符
print (str * 2)      # 输出字符串两次，也可以写成 print (2 * str)
print (str + "TEST") # 连接字符串

结果:
Runoob
Runoo
R
noo
noob
RunoobRunoob
RunoobTEST
```

### List

List是python中使用最频繁的数据类型

列表是写在方括号`[]`之间、用逗号分隔开的元素列表

和字符串一样，列表可以被索引和截取，列表被截取后返回一个新列表

**注意：**

- 列表可以使用`+`进行拼接



### Tuple元组

tuple和列表类似，但是是由`()`括起来的，且不可变数据类型

元素一样可以被索引和截取，元组也可以使用+进行拼接



### Set

set可以使用大括号`{}`或者`set()`函数创建集合，创建一个空集合时必须使用set()函数而非`{ }`，因为`{ }`被用来创建一个空字典

set和java中的set集合一样存储的数据都是不重复的



### Dictionary

字典（dictionary）是Python中另一个非常有用的内置数据类型。 类似java的Map

列表是有序的对象集合，字典是无序的对象集合。两者之间的区别在于：字典当中的元素是通过键来存取的，而不是通过偏移存取。

字典是一种映射类型，字典用 **{ }** 标识，它是一个无序的 **键(key) : 值(value)** 的集合。

键(key)必须使用不可变类型。

在同一个字典中，键(key)必须是唯一的。



### python的数据类型转换

| 语法                                                         | 作用                                                |
| ------------------------------------------------------------ | --------------------------------------------------- |
| [int(x [,base\])](https://www.runoob.com/python3/python-func-int.html) | 将x转换为一个整数                                   |
| [float(x)](https://www.runoob.com/python3/python-func-float.html) | 将x转换到一个浮点数                                 |
| [complex(real [,imag\])](https://www.runoob.com/python3/python-func-complex.html) | 创建一个复数                                        |
| [str(x)](https://www.runoob.com/python3/python-func-str.html) | 将对象 x 转换为字符串                               |
| [repr(x)](https://www.runoob.com/python3/python-func-repr.html) | 将对象 x 转换为表达式字符串                         |
| [eval(str)](https://www.runoob.com/python3/python-func-eval.html) | 用来计算在字符串中的有效Python表达式,并返回一个对象 |
| [tuple(s)](https://www.runoob.com/python3/python3-func-tuple.html) | 将序列 s 转换为一个元组                             |
| [list(s)](https://www.runoob.com/python3/python3-att-list-list.html) | 将序列 s 转换为一个列表                             |
| [set(s)](https://www.runoob.com/python3/python-func-set.html) | 转换为可变集合                                      |
| [dict(d)](https://www.runoob.com/python3/python-func-dict.html) | 创建一个字典。d 必须是一个 (key, value)元组序列。   |
| [frozenset(s)](https://www.runoob.com/python3/python-func-frozenset.html) | 转换为不可变集合                                    |
| [chr(x)](https://www.runoob.com/python3/python-func-chr.html) | 将一个整数转换为一个字符                            |
| [ord(x)](https://www.runoob.com/python3/python-func-ord.html) | 将一个字符转换为它的整数值                          |
| [hex(x)](https://www.runoob.com/python3/python-func-hex.html) | 将一个整数转换为一个十六进制字符串                  |
| [oct(x)](https://www.runoob.com/python3/python-func-oct.html) | 将一个整数转换为一个八进制字符串                    |



## 运算符

### 算术运算符

| 运算符 | 描述                                            | 实例                      |
| :----- | :---------------------------------------------- | :------------------------ |
| +      | 加 - 两个对象相加                               | a + b 输出结果 31         |
| -      | 减 - 得到负数或是一个数减去另一个数             | a - b 输出结果 -11        |
| *      | 乘 - 两个数相乘或是返回一个被重复若干次的字符串 | a * b 输出结果 210        |
| /      | 除 - x 除以 y                                   | b / a 输出结果 2.1        |
| %      | 取模 - 返回除法的余数                           | b % a 输出结果 1          |
| **     | 幂 - 返回x的y次幂                               | a**b 为10的21次方         |
| //     | 取整除 - 向下取接近商的整数                     | `>>> 9//2 4 >>> -9//2 -5` |

### 比较运算符

| 运算符 | 描述                                                         | 实例                  |
| :----- | :----------------------------------------------------------- | :-------------------- |
| ==     | 等于 - 比较对象是否相等                                      | (a == b) 返回 False。 |
| !=     | 不等于 - 比较两个对象是否不相等                              | (a != b) 返回 True。  |
| >      | 大于 - 返回x是否大于y                                        | (a > b) 返回 False。  |
| <      | 小于 - 返回x是否小于y。所有比较运算符返回1表示真，返回0表示假。这分别与特殊的变量True和False等价。注意，这些变量名的大写。 | (a < b) 返回 True。   |
| >=     | 大于等于 - 返回x是否大于等于y。                              | (a >= b) 返回 False。 |
| <=     | 小于等于 - 返回x是否小于等于y。                              | (a <= b) 返回 True。  |

### 赋值运算符

| 运算符 | 描述                                                         | 实例                                                         |
| :----- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| =      | 简单的赋值运算符                                             | c = a + b 将 a + b 的运算结果赋值为 c                        |
| +=     | 加法赋值运算符                                               | c += a 等效于 c = c + a                                      |
| -=     | 减法赋值运算符                                               | c -= a 等效于 c = c - a                                      |
| *=     | 乘法赋值运算符                                               | c *= a 等效于 c = c * a                                      |
| /=     | 除法赋值运算符                                               | c /= a 等效于 c = c / a                                      |
| %=     | 取模赋值运算符                                               | c %= a 等效于 c = c % a                                      |
| **=    | 幂赋值运算符                                                 | c **= a 等效于 c = c ** a                                    |
| //=    | 取整除赋值运算符                                             | c //= a 等效于 c = c // a                                    |
| :=     | 海象运算符，可在表达式内部为变量赋值。**Python3.8 版本新增运算符**。 | 在这个示例中，赋值表达式可以避免调用 len() 两次:`if (n := len(a)) > 10:    print(f"List is too long ({n} elements, expected <= 10)")`（这个特性java中默认就有） |

### 逻辑运算符

| 运算符 | 逻辑表达式 | 描述                                                         | 实例                    |
| :----- | :--------- | :----------------------------------------------------------- | :---------------------- |
| and    | x and y    | 布尔"与" - 如果 x 为 False，x and y 返回 x 的值，否则返回 y 的计算值。 | (a and b) 返回 20。     |
| or     | x or y     | 布尔"或" - 如果 x 是 True，它返回 x 的值，否则它返回 y 的计算值。 | (a or b) 返回 10。      |
| not    | not x      | 布尔"非" - 如果 x 为 True，返回 False 。如果 x 为 False，它返回 True。 | not(a and b) 返回 False |

### 成员运算符

| 运算符 | 描述                                                    | 实例                                              |
| :----- | :------------------------------------------------------ | :------------------------------------------------ |
| in     | 如果在指定的序列中找到值返回 True，否则返回 False。     | x 在 y 序列中 , 如果 x 在 y 序列中返回 True。     |
| not in | 如果在指定的序列中没有找到值返回 True，否则返回 False。 | x 不在 y 序列中 , 如果 x 不在 y 序列中返回 True。 |

### 身份运算符

| 运算符 | 描述                                        | 实例                                                         |
| :----- | :------------------------------------------ | :----------------------------------------------------------- |
| is     | is 是判断两个标识符是不是引用自一个对象     | **x is y**, 类似 **id(x) == id(y)** , 如果引用的是同一个对象则返回 True，否则返回 False |
| is not | is not 是判断两个标识符是不是引用自不同对象 | **x is not y** ， 类似 **id(a) != id(b)**。如果引用的不是同一个对象则返回结果 True，否则返回 False。 |



## 流程控制语句

### if条件控制

python的条件控控制语法上和格式上和java一些区别

```python
if condition_1:
    statement_block_1
elif condition_2:
    statement_block_2
else:
    statement_block_3
```

Python 中用 **elif** 代替了 **else if**，所以if语句的关键字为：**if – elif – else**。

**注意：**

- 1、每个条件后面要使用冒号 **:**，表示接下来是满足条件后要执行的语句块。
- 2、使用缩进来划分语句块，相同缩进数的语句在一起组成一个语句块。
- 3、在Python中没有switch – case语句。

#### if后跟的表达式

- 如果if后面的条件是数字，只要这个数字不是0，python都会把它当做True处理
- 如果if后面跟的是字符串，则只要这个字符串不为空串，python就把它看作True

- 同样的如果if后跟元组，list，set，字典 只要不为空就是true

#### 三目运算

和java中的三元运算类似

语法: `变量 = 表达式1 if 条件 else 表达式2`

例如 

```python
a = 1;
b = a + 1 if a == 1 else a + 2;
print(b)

结果:2
```



### 循环控制语句

python中的循环有for和while两种

#### while

```python
while 判断条件(condition)：
    执行语句(statements)……
```

##### while循环使用else

while...else在条件语句为false时执行else的代码块

```python
while expr:
    statement1
else:
    statement2
```

#### for

 for 循环可以遍历任何可选代对象，如一个列表或者一个字符串。

for循环的一般格式如下：

```python
for <variable> in <sequence>:
    <statements>
else:
    <statements>
```

#### continue和break

用法和java一样

**break区别**：

- python中的else和配合循环使用，在循环穷尽列表(for循环)或条件变为 false (while循环)导致循环终止时被执行，但循环被 break 终止时不执行。

例如:

```python
_list = [1, 2, 3, 4, 5]

for i in _list:
    if i == 3:
        print('33333333')
else:
    print('循环完毕')

执行结果：
33333333
循环完毕
```

而当循环是break终止的时候，else代码块不会执行：

```python
_list = [1, 2, 3, 4, 5]

for i in _list:
    if i == 3:
        print('333')
        break
else:
    print('循环完毕')

执行结果：
333
```

#### pass

Python pass是空语句，是为了保持程序结构的完整性。

pass 不做任何事情，一般用做占位语句

例如：

```python
class MyTestClass:
    pass


def my_func():
    pass


if expr:
    pass
```





## 迭代器与生成器

### 迭代器

迭代器是python中访问集合元素的一种方式，有两个基本方法`iter()`和`next()`

字符串、列表或元组对象都可以创建迭代器

```python
_list = [1,2,3,4]
it = iter(_list)
print(next(it))
print(next(it))

结果：
1
2
```

迭代器对象可以使用常规for语句进行遍历：

```python
_list = [1, 2, 3, 4]
it = iter(_list)
for x in it:
    print(x, end=" ")

结果：
1 2 3 4
```

### 生成器

在 Python 中，使用了 yield 的函数被称为生成器（generator）。

跟普通函数不同的是，生成器是一个返回迭代器的函数，只能用于迭代操作，更简单点理解生成器就是一个迭代器。

在调用生成器运行的过程中，每次遇到 yield 时函数会暂停并保存当前所有的运行信息，返回 yield 的值, 并在下一次执行 next() 方法时从当前位置继续运行。

调用一个生成器函数，返回的是一个迭代器对象。
```python
def gen_fun():
    print('11111111111')
    yield 1
    print('22222222222')
    yield 2
    yield 3
obj = gen_fun()
print(obj)
for i in obj:
    print(i)
#res
<generator object gen_fun at 0x0000029394291AC0>
11111111111
1
22222222222
2
3
```
上面的代码可以看到在调用函数过程中,'111111'和'222222222'并没有打印出来,而是在for循环中才执行,这就是因为yield导致了函数的暂停,而for循环实际底层是迭代器实现,所以才恢复到print语句的位置继续执行


## 函数

对应java中的方法

### 定义一个函数

- 函数代码块以 **def** 关键词开头，后接函数标识符名称和圆括号 **()**。
- 任何传入参数和自变量必须放在圆括号中间，圆括号之间可以用于定义参数。
- 函数的第一行语句可以选择性地使用文档字符串—用于存放函数说明。
- 函数内容以冒号 **:** 起始，并且缩进。
- **return [表达式]** 结束函数，选择性地返回一个值给调用方，不带表达式的 return 相当于返回 None。

一般格式：

```python
def 函数名（参数列表）:
    函数体
```

默认情况下，参数值和名称是按声明的顺序匹配的



### 参数传递

由于python中的变量没有类型，所以不像java的参数列表都是有类型声明的

在 python 中，strings, tuples, 和 numbers 是不可更改的对象，而 list,dict 等则是可以修改的对象。

- **不可变类型:** 变量赋值 **a=5** 后再赋值 **a=10**，这里实际是新生成一个 int 值对象 10，再让 a 指向它，而 5 被丢弃，不是改变 a 的值，相当于新生成了 a。
- **可变类型:** 变量赋值 **la=[1,2,3,4]** 后再赋值 **la[2]=5** 则是将 list la 的第三个元素值更改，本身la没有动，只是其内部的一部分值被修改了。

#### python函数的参数传递：**这个和java有区别，java都是值传递**

- **不可变类型:** 值传递，如整数、字符串、元组。如 fun(a)，传递的只是 a 的值，没有影响 a 对象本身。如果在 fun(a) 内部修改 a 的值，则是新生成一个 a 的对象。
- **可变类型:** 引用传递，如 列表，字典。如 fun(la)，则是将 la 真正的传过去，修改后 fun 外部的 la 也会受影响



### 参数

以下是调用函数时可使用的正式参数类型：

#### 必需参数

按照正确顺序传入参数，调用的数量和声明的数量必须一致

#### 关键字参数

调用使用关键字参数来确定传入的参数值，使用关键字参数允许调用时与声明时的顺序不一致，因为python解释器能用参数名匹配参数值

```python
def print_me(str):
    print(str)
    
#调用
print_me(str = 'tom')

结果：
tom


def printinfo( name, age ):
   "打印任何传入的字符串"
   print ("名字: ", name)
   print ("年龄: ", age)
   return
 
#调用printinfo函数
printinfo( age=50, name="mike" )
结果：
名字： mike
年龄： 50
```

#### 默认参数

调用函数时，如果没有传递参数，则会使用默认参数。以下实例中如果没有传入 age 参数，则使用默认值

```python
def printinfo( name, age = 35 ):
   print ("名字: ", name)
   print ("年龄: ", age)
   return
 
#调用printinfo函数
printinfo( age=50, name="tom" )
print ("------------------------")
printinfo( name="tom" )

结果：
名字:  tom
年龄:  50
------------------------
名字:  tom
年龄:  35
```



#### 不定长参数

你可能需要一个函数能处理比当初声明时更多的参数。这些参数叫做不定长参数，和上述 2 种参数不同，声明时不会命名。

##### *args

*args就是就是传递一个可变参数列表给函数实参，这个参数列表的数目未知，甚至长度可以为0。下面这段代码演示了如何使用args

```python
def test_args(first, *args):
    print('Required argument: ', first)
    print(type(args))
    for v in args:
        print ('Optional argument: ', v)

test_args(1, 2, 3, 4)

结果：
Required argument:  1
<class 'tuple'>
Optional argument:  2
Optional argument:  3
Optional argument:  4
```

##### **kwargs

而**kwargs则是将一个可变的关键字参数的字典传给函数实参，同样参数列表长度可以为0或为其他值。下面这段代码演示了如何使用kwargs

```python
def test_kwargs(first, *args, **kwargs):
   print('Required argument: ', first)
   print(type(kwargs))
   for v in args:
      print ('Optional argument (args): ', v)
   for k, v in kwargs.items():
      print ('Optional argument %s (kwargs): %s' % (k, v))

test_kwargs(1, 2, 3, 4, k1=5, k2=6)

结果：
Required argument:  1
<class 'dict'>
Optional argument (args):  2
Optional argument (args):  3
Optional argument (args):  4
Optional argument k2 (kwargs): 6
Optional argument k1 (kwargs): 5
```

##### 参数中单独的*

声明函数时，参数中星号 * 可以单独出现，例如:

参数列表里的 * 星号，标志着位置参数的就此终结，之后的那些参数，都只能以关键字形式来指定。

```python
def f(a,b,*,c):
    return a+b+c

# f（1，2，3）->会报错
# f（1，2，c=3) -> 正常 
```

##### 调用

args和kwargs不仅可以在函数定义中使用，还可以在函数调用中使用。在函数定义时使用就相当于pack（打包），在函数调用时就相当于unpack（解包）。

首先来看一下使用args来解包调用函数的代码，

```python
def test_args_kwargs(arg1, arg2, arg3):
    print("arg1:", arg1)
    print("arg2:", arg2)
    print("arg3:", arg3)

args = ("two", 3, 5)
test_args_kwargs(*args)

结果:
arg1: two
arg2: 3
arg3: 5
```

kwargs的用法类似：

```bash
kwargs = {"arg3": 3, "arg2": "two", "arg1": 5}
test_args_kwargs(**kwargs)

#result
arg1: 5
arg2: two
arg3: 3
```



### 匿名函数

python中使用lambda来创建匿名函数

所谓匿名，意即不再使用 def 语句这样标准的形式定义一个函数。

- lambda 只是一个表达式，函数体比 def 简单很多。
- lambda的主体是一个表达式，而不是一个代码块。仅仅能在lambda表达式中封装有限的逻辑进去。
- lambda 函数拥有自己的命名空间，且不能访问自己参数列表之外或全局命名空间里的参数。
- lambda函数只能写一行

#### 语法

```python
lambda [arg1 [,arg2,.....argn]]:expression
```



例子：

```python
sum = lambda arg1, arg2: arg1 + arg2
 
# 调用sum函数
print ("相加后的值为 : ", sum( 10, 20 ))
print ("相加后的值为 : ", sum( 20, 20 ))

相加后的值为 :  30
相加后的值为 :  40
```

### 列表推导式

作用:快速生成列表

语法:

```python
变量 = [生成规则 for 临时变量 in 集合]
```

每循环一次就会生成一个符合生成规则的数据添加到列表中

例如:

```python
my_list = [i for i in range(5)]
print(my_list)

#res
[0,1,2,3,4,5]
```



### 强制位置参数

Python3.8 新增了一个函数形参语法 / 用来指明函数形参必须使用指定位置参数，不能使用关键字参数的形式。

在以下的例子中，形参 a 和 b 必须使用指定位置参数，c 或 d 可以是位置形参或关键字形参，而 e 或 f 要求为关键字形参:

```python
def f(a, b, /, c, d, *, e, f):
    print(a, b, c, d, e, f)
```

正确：

```python
f(10, 20, 30, d=40, e=50, f=60)
```

错误：

```python
f(10, b=20, c=30, d=40, e=50, f=60)   # b 不能使用关键字参数的形式
f(10, 20, 30, 40, 50, f=60)           # e 必须使用关键字参数的形式
```

## 模块

```python
import module1[, module2[,... moduleN]
from modname import name1[, name2[, ... nameN]]
from modname import *
```



### __name__属性

一个模块被另一个程序第一次引入时，其主程序将运行。如果我们想在模块被引入时，模块中的某一程序块不执行，我们可以用__name__属性来使该程序块仅在该模块自身运行时执行。

```python
if __name__ == '__main__':
   print('程序自身在运行')
else:
   print('我来自另一模块')
```

**说明：** 每个模块都有一个__name__属性，当其值是'__main__'时，表明该模块自身在运行，否则是被引入。

说明：**__name__** 与 **__main__** 底下是双下划线

### dir()函数

```python
dir(sys)  
['__displayhook__', '__doc__', '__excepthook__', '__loader__', '__name__',
 '__package__', '__stderr__', '__stdin__', '__stdout__',
 '_clear_type_cache', '_current_frames', '_debugmallocstats', '_getframe',
 '_home', '_mercurial', '_xoptions', 'abiflags', 'api_version', 'argv',
 'base_exec_prefix', 'base_prefix', 'builtin_module_names', 'byteorder',
 'call_tracing', 'callstats', 'copyright', 'displayhook',
 'dont_write_bytecode', 'exc_info', 'excepthook', 'exec_prefix',
 'executable', 'exit', 'flags', 'float_info', 'float_repr_style',
 'getcheckinterval', 'getdefaultencoding', 'getdlopenflags',
 'getfilesystemencoding', 'getobjects', 'getprofile', 'getrecursionlimit',
 'getrefcount', 'getsizeof', 'getswitchinterval', 'gettotalrefcount',
 'gettrace', 'hash_info', 'hexversion', 'implementation', 'int_info',
 'intern', 'maxsize', 'maxunicode', 'meta_path', 'modules', 'path',
 'path_hooks', 'path_importer_cache', 'platform', 'prefix', 'ps1',
 'setcheckinterval', 'setdlopenflags', 'setprofile', 'setrecursionlimit',
 'setswitchinterval', 'settrace', 'stderr', 'stdin', 'stdout',
 'thread_info', 'version', 'version_info', 'warnoptions']
```

### 注意点

自定义模块名不要和系统中要使用的模块名字一样

> 模块搜索顺序->当前目录->系统目录(sys.path)-> 程序报错



## 包

包是一种管理 Python 模块命名空间的形式，采用"点模块名称"。

比如一个模块的名称是 A.B， 那么他表示一个包 A中的子模块 B 。采用点模块名称这种形式也不用担心不同库之间的模块重名的情况



```
sound/                          顶层包
      __init__.py               初始化 sound 包
      formats/                  文件格式转换子包
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  声音效果子包
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  filters 子包
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

在导入一个包的时候，Python 会根据 sys.path 中的目录来寻找这个包中包含的子目录。

目录只有包含一个叫做` __init__.py` 的文件才会被认作是一个包，主要是为了避免一些滥俗的名字（比如叫做 string）不小心的影响搜索路径中的有效模块。

最简单的情况，放一个空的 :file:`__init__.py`就可以了。当然这个文件中也可以包含一些初始化代码或者为（将在后面介绍的） `__all__`变量赋值。

用户可以每次只导入一个包里面的特定模块，比如:

```
import sound.effects.echo
```

这将会导入子模块:sound.effects.echo。 他必须使用全名去访问:

```
sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)
```

还有一种导入子模块的方法是:

```
from sound.effects import echo
```

这同样会导入子模块: echo，并且他不需要那些冗长的前缀，所以他可以这样使用:

```
echo.echofilter(input, output, delay=0.7, atten=4)
```

还有一种变化就是直接导入一个函数或者变量:

```
from sound.effects.echo import echofilter
```

同样的，这种方法会导入子模块: echo，并且可以直接使用他的 echofilter() 函数:

```
echofilter(input, output, delay=0.7, atten=4)
```

注意当使用 **from package import item** 这种形式的时候，对应的 item 既可以是包里面的子模块（子包），或者包里面定义的其他名称，比如函数，类或者变量。

import 语法会首先把 item 当作一个包定义的名称，如果没找到，再试图按照一个模块去导入。如果还没找到，抛出一个 **:exc:ImportError** 异常。

反之，如果使用形如 **import item.subitem.subsubitem** 这种导入形式，除了最后一项，都必须是包，而最后一项则可以是模块或者是包，但是不可以是类，函数或者变量的名字。

### 从一个包中导入*

**from sound.effects import \*** : Python 会进入文件系统，找到这个包里面所有的子模块，然后一个一个的把它们都导入进来。

导入语句遵循如下规则：如果包定义文件 `__init__.py `存在一个叫做 **__all__** 的列表变量，那么在使用 **from package import \*** 的时候就把这个列表中的所有名字作为包内容导入。

以下实例在 file:sounds/effects/\__init__.py 中包含如下代码:



```
__all__ = ["echo", "surround", "reverse"]
```

这表示当你使用from sound.effects import *这种用法时，你只会导入包里面这三个子模块。

如果` __all__` 真的没有定义，那么使用**from sound.effects import \***这种语法的时候，就不会导入包 sound.effects 里的任何子模块。他只是把包sound.effects和它里面定义的所有内容导入进来（可能运行`__init__.py`里定义的初始化代码）。

这会把` __init__.py `里面定义的所有名字导入进来。并且他不会破坏掉我们在这句话之前导入的所有明确指定的模块。看下这部分代码:

```
import sound.effects.echo
import sound.effects.surround
from sound.effects import *
```

这个例子中，在执行 from...import 前，包 sound.effects 中的 echo 和 surround 模块都被导入到当前的命名空间中了。（当然如果定义了 `__all__ `就更没问题了）

## 文件操作

python的io操作相比java的IO流简单太多了,直接就是一个open()函数

### open() 方法

Python open() 方法用于打开一个文件，并返回文件对象，在对文件进行处理过程都需要使用到这个函数，如果该文件无法被打开，会抛出 OSError。

**注意：**使用 open() 方法一定要保证关闭文件对象，即调用 close() 方法。

open() 函数常用形式是接收两个参数：文件名(file)和模式(mode)。

完整的语法格式为：

```python
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
```

参数说明:

- file: 必需，文件路径（相对或者绝对路径）。
- mode: 可选，文件打开模式
- buffering: 设置缓冲
- encoding: 一般使用utf8
- errors: 报错级别
- newline: 区分换行符
- closefd: 传入的file参数类型
- opener: 设置自定义开启器，开启器的返回值必须是一个打开的文件描述符。



| 模式 | 描述                                                         |
| :--- | :----------------------------------------------------------- |
| t    | 文本模式 (默认)。                                            |
| x    | 写模式，新建一个文件，如果该文件已存在则会报错。             |
| b    | 二进制模式。                                                 |
| +    | 打开一个文件进行更新(可读可写)。                             |
| r    | 以只读方式打开文件。文件的指针将会放在文件的开头。这是默认模式。 |
| rb   | 以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。这是默认模式。一般用于非文本文件如图片等。 |
| r+   | 打开一个文件用于读写。文件指针将会放在文件的开头。           |
| rb+  | 以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。一般用于非文本文件如图片等。 |
| w    | 打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。 |
| wb   | 以二进制格式打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。一般用于非文本文件如图片等。 |
| w+   | 打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。 |
| wb+  | 以二进制格式打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。一般用于非文本文件如图片等。 |
| a    | 打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。 |
| ab   | 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。 |
| a+   | 打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写。 |
| ab+  | 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。如果该文件不存在，创建新文件用于读写。 |

### file 对象

file 对象使用 open 函数来创建，下表列出了 file 对象常用的函数：

| 方法及描述                                                   |
| :----------------------------------------------------------- |
| [file.close()](https://www.runoob.com/python3/python3-file-close.html)关闭文件。关闭后文件不能再进行读写操作。 |
| [file.flush()](https://www.runoob.com/python3/python3-file-flush.html)刷新文件内部缓冲，直接把内部缓冲区的数据立刻写入文件, 而不是被动的等待输出缓冲区写入。 |
| [file.fileno()](https://www.runoob.com/python3/python3-file-fileno.html)返回一个整型的文件描述符(file descriptor FD 整型), 可以用在如os模块的read方法等一些底层操作上。 |
| [file.isatty()](https://www.runoob.com/python3/python3-file-isatty.html)如果文件连接到一个终端设备返回 True，否则返回 False。 |
| [file.read([size\])](https://www.runoob.com/python3/python3-file-read.html)从文件读取指定的字节数，如果未给定或为负则读取所有。 |
| [file.readline([size\])](https://www.runoob.com/python3/python3-file-readline.html)读取整行，包括 "\n" 字符。 |
| [file.readlines([sizeint\])](https://www.runoob.com/python3/python3-file-readlines.html)读取所有行并返回列表，若给定sizeint>0，返回总和大约为sizeint字节的行, 实际读取值可能比 sizeint 较大, 因为需要填充缓冲区。 |
| [file.seek(offset[, whence\])](https://www.runoob.com/python3/python3-file-seek.html)移动文件读取指针到指定位置 |
| [file.tell()](https://www.runoob.com/python3/python3-file-tell.html)返回文件当前位置。 |
| [file.truncate([size\])](https://www.runoob.com/python3/python3-file-truncate.html)从文件的首行首字符开始截断，截断文件为 size 个字符，无 size 表示从当前位置截断；截断之后后面的所有字符被删除，其中 windows 系统下的换行代表2个字符大小。 |
| [file.write(str)](https://www.runoob.com/python3/python3-file-write.html)将字符串写入文件，返回的是写入的字符长度。 |
| [file.writelines(sequence)](https://www.runoob.com/python3/python3-file-writelines.html)向文件写入一个序列字符串列表，如果需要换行则要自己加入每行的换行符。 |

### 文件和文件夹操作

```python
import os #导入os模块

#修改文件名
os.rename(原文件名,新文件名)
#删除文件
os.remove(文件名)
#创建文件夹
os.mkdir(名称)
#获取当前目录
os.getcwd()
#改变默认目录
os.chdir(路径)
#获取目录列表
os.listdir(路径)
#删除文件夹
os.rmdir(路径)
```

## 面向对象

### 类

#### 类的定义语法:

**类名遵循大驼峰规则**

```python
"""
新式类:直接或间接继承object,py3中所有类都是object的子类(same as java)
"""
class Demo(object):
    pass
"""
旧式类:已过时
"""
class Demo1():
    pass

class Demo2:
    pass
    
    
```

#### 类中定义方法

```python
class Dog(Object):
    def eat(self):  
        print('吃')
```

### 对象

创建对象语法:

```Python
class Dog(Object):
    def eat(self):  
        print('吃')


dog1 = Dog()
dog1.eat()
#res
吃
```

### 类外部添加和获取属性

给对象添加属性:`对象.属性名 = 属性值`

获取对象的属性`变量 = 对象.属性名`

修改:和添加一样,添加存在的属性就是修改

#### 魔法方法

```bash
python的类中,有一类方法,以`两个下划线开头`和`两个下划线结尾`,并在满足`某个特定条件下会自动调用`,这类方法,称为`魔法方法` magic method
```

`__init__`

在创建对象之后自动调用

作用:

- 给对象添加属性,给对象属性一个初始值(构造方法)
- 代码的业务需求,每创建一个对象,都需要执行的代码可以放在init方法中

注意点:

- 如果`__init__`方法出现了self之外的形参,在创建对象的时候,需要给额外的形参传值`类名(实参)` 这个类似java中的构造方法的有参构造

```python
class Dog(object):
    def __init__(self,name):
        self.name = name
        print('init方法执行了')

dog = Dog('大黄')
print(dog.name)
#res
init方法执行了
大黄
```



`__str__`

类似java的`toString`:

- 在print(对象)时会自动调用`__str__`方法,打印的结果是`__str__`方法的返回值
- `str(对象)`将自定义类型转换为字符串的时候,会自动调用
- 没有自定义`__str__`方法时,这个返回值是对象的地址

注意点:

- 方法必须返回一个字符串,只有self一个参数

`__del__`

对象在内存当中被销毁的时候调用:

1. 程序代码结束,程序运行过程中创建的对象和变量都会被删除
2. 使用`del 变量`语句删除,将这个对象的引用计数变为0,会自动调用

引用计数:python内存管理的机制,指一块内存有多少变量在引用

- 当一个变量引用一块内存时,引用计数+1
- 删除一个变量或者这个变量不再引用这块内存,引用计数-1
- 当内存的引用计数变为0,这块内存被删除,数据被销毁

##### 补充:

Java中JVM为了避免对象间存在循环依赖导致对象无法被回收,JVM的垃圾回收算法采用的是`可达性分析算法`,通过gc roots对象作为起始点,从这些节点开始向下搜索，搜索所走过的路径称为引用链（Reference Chain），当一个对象到gc roots没有任何引用链相连时，则证明此对象是不可用的

### 类内部添加和获取属性

通过self操作:

self指的是当前实例(类似java中的this),作为类中方法的第一个形参,在通过对象调用方法的时候,不需要手动传参

python解释器会自动把调用方法的对象传递给self形参

self也可以改成其他的形参名,但一般不修改这个名字,默认为self

```python
class Dog(object):
    def play(self): 
        print(f'{self.name}在玩耍')
        
dog = Dog()
dog.name = '大黄'
dog.play()

#res
大黄在玩耍
```



### 继承

#### python中继承的语法

- 单继承

```python
class Animal(object):
    pass

class Dog(Animal):
    pass
```

- 多继承:python中允许多继承,java中是没有多继承的

  

```python
class 马(object):
    pass

class 驴(object):
    pass

class 骡子(马,驴):
    pass
```

​	**需要注意**:

多继承中圆括号中父类的顺序，若是父类中有相同的方法名，而在子类使用时未指定，python从左至右搜索 即方法在子类中未找到时，从左到右查找父类中是否包含方法。

#### 子类重写父类方法

和java一样,子类重写父类中的同名方法,通过子类独对象调用方法时调用的是子类自己的方法

#### 子类调用父类方法

java中调用父类就用super,python有以下几种方式

- 父类名.方法名(self,其他参数)
- super(类A,self).方法名(参数),会调用类A的父类中的方法

- super().方法名(参数)=>super(当前类,self).方法名(参数) 是第二中的简写,调用当前类的父类

#### 继承中的init方法

子类重写父类的init方法:在子类的init方法需要调用父类的init方法(和java也一样),给对象添加从父类继承的属性

注意:子类init方法的形参,一般先写父类的形参,再写自己独有的形参

```python
class Dog(object):
    def __init__(self,name):
        self.name = name
        self.age = 1
       
    def __str__(self):
        return f'名字为{self.name},年龄为{self.age}'

class MyDog(Dog):
    def __init__(self,name,color):
        super().__init__(name)
        self.color = color
        
    def __str__(self):
        return f'名字为{self.name},年龄为{self.age},颜色为{self.color}'
    
    
dog = MyDog('大黄','黄色')
print(dog)
#res
名字为大黄,年龄为1,颜色为黄色
```

### 封装

封装的意义:

- 将属性和方法放在一起作为一个整体,通过实例化对象来进行操作
- 隐藏内部实现
- 对类的属性和方法增加访问权限控制

### 私有权限

python没有java中的权限修饰符public/private之类的,私有的属性或者方法都由两个下划线开头

- 普通的属性前面加两个下划线就是私有属性

- 方法名前面加两个下划线就是私有方法

和java一样私有属性不能被继承,私有方法不能在类外部访问,可以提供共有方法访问私有属性或私有方法

### 类属性

类似java中的静态变量

访问:类名.类属性

修改:类名.类属性 = 属性值

### 类方法

类方法:使用@classmethod装饰的方法称为类方法,第一个参数是cls,代表类对象自己

注意:

1. 如果在方法中使用了实例属性,那么该方法必须是实例方法,不能为类方法

何时定义类方法:

- 不需要使用实例属性,需要使用类属性

调用:

- 对象.类方法
- 类名.类方法

### 静态方法

使用@staticmethod装饰的方法称为静态方法,对参数没有特殊要求,可以有,可以没有

何时定义:

- 不需要使用实例属性,也不需要使用类属性,可以定义方法为静态方法

调用:

- 对象.静态方法
- 类名.静态方法

### 多态

由于python不需要声明变量类型,因此多态体现的不是那么直观,思想和java一样,可以使用父类的地方,也可以使用子类,**使用多态的意义在于提高应用的扩展性**





## 异常

### 组成:

- 异常的类型
- 异常的描述

### 捕获单个异常

```python
try:
    statement1
except 异常名:
    statement2
```

### 捕获多个异常

```python
try:
    statement1
except (异常1,异常2,...):
    statement2
    
try:
    statement1
except 异常1:
    statement2
except 异常2:
    statement3
```

### 打印异常信息

```python
try:
    statement1
except (异常1,异常2,...) as 变量名:
    print(变量名)
```

### 捕获所有异常

```python
try:
    statement1
except: #缺点 不能获取异常信息
    statement2
    
try:
    statement1
except Exception as 变量名: 
    print(变量名)
```

### 异常的完整结构

```python
try:
    statement1
except Exception as e:
    print(e)
else:
    代码没有发生异常会执行的代码块
finally:
    不管有没有异常都会执行的代码块
```

### 抛出自定义异常

```python
raise 异常对象



异常对象 = 异常类(参数)


抛出自定义异常:
    1.自定义异常类,继承Exception或者BaseException
    2.选择性定义__init__方法,__str__方法
    3.抛出
```

