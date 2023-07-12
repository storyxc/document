# Java8新特性回顾

虽然jdk已经出到18了，然而很多java8的特性平常使用的都不是很频繁，回顾并记录下。



## lambda表达式

Lambda 允许把函数作为一个方法的参数（函数作为参数传递进方法中）

### 语法

```java
(parameters) -> expression
或
(parameters) ->{ statements; }
```

以下是lambda表达式的重要特征:

- **可选类型声明**：不需要声明参数类型，编译器可以统一识别参数值。
- **可选的参数圆括号**：一个参数无需定义圆括号，但**多个参数需要定义圆括号**。
- **可选的大括号**：如果主体包含了一个语句，就不需要使用大括号。
- **可选的返回关键字**：如果主体只有一个表达式返回值则编译器会自动返回值，大括号需要指定表达式返回了一个数值。

### 示例

```java
// 1. 不需要参数,返回值为 5  
() -> 5  
  
// 2. 接收一个参数(数字类型),返回其2倍的值  
x -> 2 * x  
  
// 3. 接受2个参数(数字),并返回他们的差值  
(x, y) -> x – y  
  
// 4. 接收2个int型整数,返回他们的和  
(int x, int y) -> x + y  
  
// 5. 接受一个 string 对象,并在控制台打印,不返回任何值(看起来像是返回void)  
(String s) -> System.out.print(s)
```

### 变量作用域

- lambda 表达式只能引用标记了 final 的外层局部变量，这就是说不能在 lambda 内部修改定义在域外的局部变量，否则会编译错误。
- lambda 表达式的局部变量可以不用声明为 final，但是必须不可被后面的代码修改（即隐性的具有 final 的语义）
- 在 Lambda 表达式当中不允许声明一个与局部变量同名的参数或者局部变量。

### lambda表达和匿名内部类的区别

> 第一点：所需类型不同
>
> 匿名内部类：可以是接口，也可以是抽象类，还可以是具体类。
> **Lambda表达式：**只能是接口。
>
> 第二点：使用限制不同
>
> 1，如果接口中有且仅有一个抽象方法，可以使用Lambda表达式，也可以使用匿名内部类。
> 2，如果接口中有多于一个抽象方法，只能使用匿名内部类，不可以使用Lambda表达式。
>
> 第三点：实现原理不同
>
> 匿名内部类：编译之后会产生一个单独的.class字节码文件。
> Lambda表达式：编译之后没有产生一个单独的.class字节码文件，对应的字节码文件会在运行的时候动态生成。



## 函数式接口

函数式接口(Functional Interface)就是一个有且仅有一个抽象方法，但是可以有多个非抽象方法的接口。

函数式接口可以被隐式转换为 lambda 表达式。

Lambda 表达式和方法引用（实际上也可认为是Lambda表达式）上。

```java
@FunctionalInterface
interface GreetingService 
{
    void sayMessage(String message);
}

---
  
GreetingService greetService1 = message -> System.out.println("Hello " + message);

```




## Stream

Stream 使用一种类似用 SQL 语句从数据库查询数据的直观方式来提供一种对 Java 集合运算和表达的高阶抽象。

这种风格将要处理的元素集合看作一种流， 流在管道中传输， 并且可以在管道的节点上进行处理， 比如筛选， 排序，聚合等。

元素流在管道中经过中间操作（intermediate operation）的处理，最后由最终操作(terminal operation)得到前面处理的结果。

```txt
+--------------------+       +------+   +------+   +---+   +-------+
| stream of elements +-----> |filter+-> |sorted+-> |map+-> |collect|
+--------------------+       +------+   +------+   +---+   +-------+
```

以上的流程转换为 Java 代码为：

```java
List<Integer> transactionsIds = 
widgets.stream()
             .filter(b -> b.getColor() == RED)
             .sorted((x,y) -> x.getWeight() - y.getWeight())
             .mapToInt(Widget::getWeight)
             .sum();
```

Stream（流）是一个来自数据源的元素队列并支持聚合操作

- 元素是特定类型的对象，形成一个队列。 Java中的Stream并不会存储元素，而是按需计算。
- **数据源** 流的来源。 可以是集合，数组，I/O channel等。
- **聚合操作** 类似SQL语句一样的操作， 比如filter, map, reduce, find, match, sorted等。

和以前的Collection操作不同， Stream操作还有两个基础的特征：

- **Pipelining**: 中间操作都会返回流对象本身。 这样多个操作可以串联成一个管道， 如同流式风格（fluent style）。 这样做可以对操作进行优化， 比如延迟执行(laziness)和短路( short-circuiting)。
- **内部迭代**： 以前对集合遍历都是通过Iterator或者For-Each的方式, 显式的在集合外部进行迭代， 这叫做外部迭代。 Stream提供了内部迭代的方式， 通过访问者模式(Visitor)实现。

### 流的特性

- `stream`不存储数据，而是按照特定的规则对数据进行计算，一般会输出结果；

- `stream`**不会改变数据源**，通常情况下会产生一个新的集合；

- `stream`具有**延迟执行特性，只有调用终端操作时，中间操作才会执行**。

- 对`stream`操作分为终端操作和中间操作，那么这两者分别代表什么呢？
   终端操作：会消费流，这种操作会产生一个结果的，如果一个流被消费过了，那它就不能被重用的。
   中间操作：中间操作会产生另一个流。因此中间操作可以用来创建执行一系列动作的管道。一个特别需要注意的点是:中间操作不是立即发生的。相反，当在中间操作创建的新流上执行完终端操作后，中间操作指定的操作才会发生。所以中间操作是延迟发生的，中间操作的延迟行为主要是让流API能够更加高效地执行。

- `stream`不可复用，对一个已经进行过终端操作的流再次调用，会抛出异常。

### 生成流

集合创建流：

- **stream()** − 为集合创建串行流。
- **parallelStream()** − 为集合创建并行流。

数组创建流：

- Arrays.stream(arr)
- Stream.of(arr)

### 常用方法

- foreach：迭代
- map：将元素映射为另一种元素
- filter：过滤元素
- limit：获取制定数量的流
- count：统计数量
- max：最大值
- min：最小值
- sorted：排序，可以使用自然排序或特定比较器。
- reduce：把一个流缩减为一个值，比如对一个集合求和等
- collect：collect操作可接收各种方法为参数，将流中数据汇总，例如Collectors.toList()。

- Joining：将元素用特定字符链接起来

- concat：可以组合两个流



## Optional

Optional 类是一个可以为null的容器对象。如果值存在则isPresent()方法会返回true，调用get()方法会返回该对象。

Optional 是个容器：它可以保存类型T的值，或者仅仅保存null。Optional提供很多有用的方法，这样我们就不用显式进行空值检测。

Optional 类的引入很好的解决空指针异常。

### 示例

```java
public class Java8Tester {
   public static void main(String args[]){
   
      Java8Tester java8Tester = new Java8Tester();
      Integer value1 = null;
      Integer value2 = new Integer(10);
        
      // Optional.ofNullable - 允许传递为 null 参数
      Optional<Integer> a = Optional.ofNullable(value1);
        
      // Optional.of - 如果传递的参数是 null，抛出异常 NullPointerException
      Optional<Integer> b = Optional.of(value2);
      System.out.println(java8Tester.sum(a,b));
   }
    
   public Integer sum(Optional<Integer> a, Optional<Integer> b){
    
      // Optional.isPresent - 判断值是否存在
        
      System.out.println("第一个参数值存在: " + a.isPresent());
      System.out.println("第二个参数值存在: " + b.isPresent());
        
      // Optional.orElse - 如果值存在，返回它，否则返回默认值
      Integer value1 = a.orElse(new Integer(0));
        
      //Optional.get - 获取值，值需要存在
      Integer value2 = b.get();
      return value1 + value2;
   }
}

--- 
  
  
第一个参数值存在: false
第二个参数值存在: true
10
```
