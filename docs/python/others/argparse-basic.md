# argparse模块入门

学习如何使用python编写一个命令行程序。

## 简介

[`argparse`](https://docs.python.org/zh-cn/3/library/argparse.html#module-argparse) 模块可以让人轻松编写用户友好的命令行接口。程序定义它需要的参数，然后 [`argparse`](https://docs.python.org/zh-cn/3/library/argparse.html#module-argparse) 将弄清如何从 [`sys.argv`](https://docs.python.org/zh-cn/3/library/sys.html#sys.argv) 解析出那些参数。 [`argparse`](https://docs.python.org/zh-cn/3/library/argparse.html#module-argparse) 模块还会自动生成帮助和使用手册，并在用户给程序传入无效参数时报出错误信息。

官方文档地址：https://docs.python.org/zh-cn/3/library/argparse.html#upgrading-optparse-code

## 基础

```python
import argparse
parser = argparse.ArgumentParser()
parser.parse_args()
```

使用命令行运行这个程序

```bash
$ python main.py


$ python main.py --help
usage: main.py [-h]

optional arguments:
  -h, --help  show this help message and exit


$ python main.py story
usage: main.py [-h]
main.py: error: unrecognized arguments: story
```

程序运行情况:

- 在没有任何选项时,程序没有任何输出
- argparse在我们什么逻辑代码都没有编写的情况下帮我们提供了一条帮助信息
- `--help`可以缩写为`-h`,是唯一一个可以直接使用的选项,指定任何没有定义的内容都会报错,但是也会给出提示



## 位置参数

```python
import argparse
parser = argparse.ArgumentParser()
parser.add_argument('print')
args = parser.parse_args()
print(args.print)
```

运行

```bash
$ python main.py
usage: main.py [-h] print
main.py: error: the following arguments are required: print

$ python main.py --help
usage: main.py [-h] print

positional arguments:
  print

optional arguments:
  -h, --help  show this help message and exit


$ python main.py test
test
```

程序运行情况:

- 增加了`add_argument()`方法，该方法指定程序能够接受哪些命令行选项。在例子中使用了`print`作为选项名
- 现在调用程序必须指定一个选项
- 这个选项就是一个位置参数

`add_argument`方法还可以添加提示信息

比如修改上面的代码再次运行:

`parser.add_argument('print',help='print the string you typed')`

```bash
$ python main.py --help
usage: main.py [-h] print

positional arguments:
  print       print the string you typed

optional arguments:
  -h, --help  show this help message and exit
```

还可以指定输入的值的类型，否则argparse会把一切输入都当作字符串

`parser.add_argument('print',help='print the number you typed',type=int)`

运行：

```bash
$ python main.py 1
1

$ python main.py two
usage: main.py [-h] print
main.py: error: argument print: invalid int value: 'two'
```

## 可选参数

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--verbosity', help='increase output verbosity')
args = parser.parse_args()
if args.verbosity:
    print('verbosity turn on')
```

运行：

```bash
$ python main.py

$ python main.py --verbosity test
verbosity turn on

$ python main.py -h
usage: main.py [-h] [--verbosity VERBOSITY]

optional arguments:
  -h, --help            show this help message and exit
  --verbosity VERBOSITY
                        increase output verbosity

$ python main.py --verbosity
usage: main.py [-h] [--verbosity VERBOSITY]
main.py: error: argument --verbosity: expected one argument
```

运行结果：

- 当指定了`--verbosity`时打印turn on，否则不打印
- 不添加这选项时不会报错，说明是可选参数，当一个可选参数没有被使用，对应的变量会被赋值为None，因此args.verbosity在if中被判断为逻辑假
- 帮助信息多了VERBOSITY

- 使用`--verbosity`选项时必须指定一个值，否则会报错

修改代码：

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--verbose', help='increase output verbosity',
                    action='store_true')
args = parser.parse_args()
if args.verbose:
    print('verbosity turn on')
```

运行：

```bash
$ python main.py


$ python main.py --verbose
verbosity turn on

$ python main.py --help
usage: main.py [-h] [--verbose]

$ python main.py --verbose test
usage: main.py [-h] [--verbose]
main.py: error: unrecognized arguments: test


optional arguments:
  -h, --help  show this help message and exit
  --verbose   increase output verbosity



```

运行结果：

- 修改之后，这一选项更多是一个标志，而不需要接收值，新增加的参数action赋值为`store_true`，意味着，当这一选项存在时，为args.verbose赋值为True，没有指定该选项时为False
- 当为其指定值时会报错
- 不同的帮助文字

## 短参数

我们能注意到`-h`和`--help`是功能相同的，我们也可以给自定义的参数指定简短的形式

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-v', '--verbose', help='increase output verbosity',
                    action='store_true')
parser.add_argument('-s', '--square', type=int, help='display a square of a given number')
args = parser.parse_args()
answer = args.square ** 2  # **运算符为计算arg1的arg2次幂
if args.verbose:
    print('the square of {} is {}'.format(args.square, answer))
else:
    print(answer)
```

运行：

```bash
$ python main.py -s -v 1
usage: main.py [-h] [-v] [-s SQUARE]
main.py: error: argument -s/--square: expected one argument

$ python main.py -s 2 -v
the square of 2 is 4

$ python main.py -s 2
4
```

运行结果：

- 必要的可选参数也要传值
- 根据可选参数的指定与否我们可以控制一些功能的实现

修改代码：

```python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-v', '--verbose', type=int,help='increase output verbosity')
parser.add_argument('-s', '--square', type=int, help='display a square of a given number')
args = parser.parse_args()
answer = args.square ** 2  # **运算符为计算arg1的arg2次幂
if args.verbose == 1:
    print('the square of {} is {}'.format(args.square, answer))
elif args.verbose == 2:
    print('{}^2 is {}'.format(args.square, answer))
else:
    print(answer)
```

运行结果：

```bash
$ python main.py -s 2 -v 1
the square of 2 is 4

$ python main.py -s 2 -v 2
2^2 is 4

$ python main.py -s 2 -v 3
4

```

显然，用户指定-v的值是3是我们不愿意看见的，因此我们可以限定-v的取值范围

修改

```python
parser.add_argument('-v', '--verbose', type=int,help='increase output verbosity',
                    choices=[1,2])
```

再次运行：

```bash
$ python main.py -s 2 -v 3
usage: main.py [-h] [-v {1,2}] [-s SQUARE]
main.py: error: argument -v/--verbose: invalid choice: 3 (choose from 1, 2)

$ python main.py -h
usage: main.py [-h] [-v {1,2}] [-s SQUARE]

optional arguments:
  -h, --help            show this help message and exit
  -v {1,2}, --verbose {1,2}
                        increase output verbosity
  -s SQUARE, --square SQUARE
                        display a square of a given number

```

## 互斥参数

`add_mutually_exclusive_group()`方法允许指定彼此冲突的选项

```python
import argparse

parser = argparse.ArgumentParser()
group = parser.add_mutually_exclusive_group()
group.add_argument("-v", "--verbose", action="store_true")
group.add_argument("-q", "--quiet", action="store_true")
parser.add_argument("x", type=int, help="the base")
parser.add_argument("y", type=int, help="the exponent")
args = parser.parse_args()
answer = args.x**args.y

if args.quiet:
    print(answer)
elif args.verbose:
    print("{} to the power {} equals {}".format(args.x, args.y, answer))
else:
    print("{}^{} == {}".format(args.x, args.y, answer))
```

运行：

```bash
$ python main.py 4 2
4^2 == 16

$ python main.py 4 2 -v
4 to the power 2 equals 16

$ python main.py 4 2 -q
16

$ python main.py -h
usage: main.py [-h] [-v | -q] x y

calculate X to the power of Y

positional arguments:
  x              the base
  y              the exponent

optional arguments:
  -h, --help     show this help message and exit
  -v, --verbose
  -q, --quiet

```

运行结果:

- 根据指定-v还是-q，可以得到不同输出，实现不同功能

- usage: main.py [-h] [-v | -q] x y中[-v|-q]代表可选其一，而不是使用两者

  如果同时使用会报错：

  ```bash
  $ python main.py 4 2 -v -q
  usage: main.py [-h] [-v | -q] x y
  main.py: error: argument -q/--quiet: not allowed with argument -v/--verbose
  
  ```

  

