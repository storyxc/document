# 装饰器深入

## 闭包

### 闭包的定义

如果在一个外部函数中定义一个内部函数，内部函数对外部作用域（但不是在全局作用域）的变量进行引用，外部函数的返回值是内部函数，这样的函数就被认为是闭包(closure)。

### 形成闭包的条件

- 必须有内部函数
- 内部函数必须引用外部函数的变量
- 外部函数返回值必须是内部函数

## 装饰器

python装饰器实质上也是一个闭包函数，目的是在不改变原函数的情况下实现对原函数功能的增强。（类似Spring中的AOP）

### 装饰器的条件

- 不修改已有函数代码
- 不修改已有函数的调用方式
- 给已有函数增加额外功能

### 装饰器语法糖

`@装饰器函数名`

`@装饰器类名`

`@装饰器函数名(param)`

`@装饰器类名(param)`

## 函数的函数装饰器（函数作为函数的装饰器）

### 不带参数的装饰器函数

> 这里的不带参数是指`@装饰器`后没有`(参数)`而非装饰器函数没有参数

例如下面的`record`函数就是一个简单装饰器，作用是记录被装饰函数的执行耗时

```python
import time


def record(func):
    def decorator(*args, **kwargs):
        print('====start====')
        start = time.time()
        func(*args, **kwargs)
        print(f'===end cost : {time.time() - start} seconds===')

    return decorator


@record # 不带参数
def test(name, age):
    time.sleep(1)
    print(f'my name is {name}, {age} years old')


test('tom', 18)



====start====
my name is tom, 18 years old
===end cost : 1.0049748420715332 seconds===
```

### 本质

在上述不带参数的装饰器函数例子中，14行`@record`实质上等于`test = record(test)`,最终调用`test('tom',18)`的伪代码：

```python
print('====start====')
start = time.time()

# func(*args, **kwargs) 
time.sleep(1) # -> 原始的test('tom',18)
print(f'my name is {name}, {age} years old') # -> 原始的test('tom',18)

print(f'===end cost : {time.time() - start} seconds===')
```

### 带参数的装饰器函数

python中一切皆对象，如果在对象后跟`()`即是执行调用的意思，例如函数，类，类里的函数，实现了`__call__`方法的对象都可以被调用，因为这些对象是`callable`对象。还是刚才的例子，`@装饰器(参数)`语法，实际上是在不带参数的装饰器函数基础上包了一层，由`test = record(test)`变成了`decorator = record(count); test = decorator(test)`。

例子如下

```python
import time

def record(count):
    def decorator(func):
        def wrapper(*args, **kwargs):
            print('====start====')
            start = time.time()
            for _num in range(count):
                func(*args, **kwargs)
            print(f'===end cost : {time.time() - start} seconds===')
        return wrapper

    return decorator


@record(5)
def test(name, age):
    time.sleep(1)
    print(f'my name is {name}, {age} years old')


test('tom', 18)

---
====start====
my name is tom, 18 years old
my name is tom, 18 years old
my name is tom, 18 years old
my name is tom, 18 years old
my name is tom, 18 years old
===end cost : 5.020708799362183 seconds===
```

### 本质

带参数的装饰器，实际就是加了一层函数的嵌套，可以把这种装饰器拆成两步分析，第一步执行`record(5)`返回了函数`decorator`,`@decorator`这样就是不带参数的装饰器形式了。



### 注意：装饰器返回的是一个全新的函数

装饰器**返回的是一个全新的函数**，对函数的装饰方法（常写成`wrapper`）的参数列表为了兼容性可以写为`(*args, **kwargs)`，但是这个函数的参数实际可以写为任意形式（只要该参数包含被装饰函数的参数列表即可），回归到定义上来说就是`不修改已有函数的调用方式`即可。网上教程中通常把`wrapper`的参数写成和被装饰函数一致，很容易让人误以为这两者的参数列表必须保持一致。

例子：

```python
import time
from dataclasses import dataclass


@dataclass
class User(object):
    name: str
    info: tuple = ()


def record(count):
    def decorator(func):
        def wrapper(user):
            print('====start====')
            start = time.time()
            for _num in range(count):
                func(*user.info)

            print(f'===end cost : {time.time() - start} seconds===')
        return wrapper

    return decorator


@record(5)
def test(name, age):
    time.sleep(1)
    print(f'my name is {name}, {age} years old')


# test('tom', 18)
print(test.__name__)
tom = User('tom', info=('tom', 18))
test(tom)

---

wrapper
====start====
my name is tom, 18 years old
my name is tom, 18 years old
my name is tom, 18 years old
my name is tom, 18 years old
my name is tom, 18 years old
===end cost : 5.013930797576904 seconds===
```

可以看到，`test`函数的name为`wrapper`，也就是装饰功能的函数的名字，而且这里`test函数`的参数列表也已经变成了`(user)`，也就是这里实际上`test = wrapper(user)`。如果使用装饰器后，想保留原函数的名称，可以使用`@functools.wraps`来装饰`wrapper函数`。

例子：

```python
import functools
import time
from dataclasses import dataclass


@dataclass
class User(object):
    name: str
    info: tuple = ()


def record(count):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(user):
            print('====start====')
            start = time.time()
            for _num in range(count):
                func(*user.info)

            print(f'===end cost : {time.time() - start} seconds===')
        return wrapper

    return decorator


@record(5)
def test(name, age):
    time.sleep(1)
    print(f'my name is {name}, {age} years old')


# test('tom', 18)
print(test.__name__)
tom = User('tom', info=('tom', 18))
test(tom)

---

test
====start====
my name is tom, 18 years old
my name is tom, 18 years old
my name is tom, 18 years old
my name is tom, 18 years old
my name is tom, 18 years old
===end cost : 5.015993118286133 seconds===
```

可以看到，在对`test`进行了装饰后,返回的新的函数名称还是保持为`test`

## 函数的类装饰器（类作为函数的装饰器）

### 不带参数的装饰器类

类也可以作为装饰器使用，需要实现`__init__`函数和`__call__`函数,例子：

```python
import time


class Timer(object):

    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        start = time.time()
        ret = self.func(*args, **kwargs)
        print(f'Time : {time.time() - start}')
        return ret


@Timer
def add(a, b):
    return a + b

# 等价于 add = Timer(add)
  
print(add(2, 3))

```

### 带参数的装饰器类

类似带参数的装饰器函数，带参数的装饰器类需要在`__call__`函数内部，再包一层

```python
import time


class Timer(object):

    def __init__(self, pre_fix):
        self.pre_fix = pre_fix

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            start = time.time()
            ret = func(*args, **kwargs)
            print(f'{self.pre_fix}: {time.time() - start}')
            return ret

        return wrapper


@Timer(pre_fix='current_time')
def add(a, b):
    return a + b


print(add(2, 3))

```

## 类的函数装饰器（函数作为类的装饰器）

### 不带参数

函数也可以装饰类，下面的例子中，`add_str`是一个参数为`class`,返回值也是`class`的函数，装饰了MyObj类，作用是`把被装饰类的__str__函数替换为打印self.__dict__`

```python
def add_str(cls):
    def __str__(self):
        return str(self.__dict__)

    cls.__str__ = __str__
    return cls


@add_str
class MyObj(object):
    def __init__(self, a, b):
        self.a = a
        self.b = b


print(MyObj(1, 2))

---

{'a': 1, 'b': 2}
```

### 带参数

```python
def add_str(time):
    def _cls(cls):
        def __str__(self):
            return f'调用时间 {time} 点 == ' + str(self.__dict__)

        cls.__str__ = __str__

        return cls

    return _cls


@add_str(time='19')
class MyObj(object):
    def __init__(self, a, b):
        self.a = a
        self.b = b


print(MyObj(1, 2))

---

调用时间 19 点 == {'a': 1, 'b': 2}
```

## 类作为类的装饰器

没什么意义
