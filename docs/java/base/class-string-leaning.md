# String类的深入学习

## String类

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
    ...
}
```

### 1.String类的声明

- String类是final的,不可以被继承
- String类底层是char型数组实现的
- value[] 也是final的,而且是private修饰的,这就保证了String类的对象一旦被初始化就无法更改。

> String对象被创建后就无法更改指的是常规方法无法更改,因为String类是由char型数组实现的,而这个数组value也是一个引用,我们可以通过暴力反射setAccessible(true),来修改value数组的内容。

### 2.常用构造方法

1.`String str = new String();`构造一个空字符串

```java
public String() {
    this.value = "".value;
}
```

2.`String str = new String(String string)`根据指定的字符串来构造新的String对象

```java
public String(String original) {
    this.value = original.value;
    this.hash = original.hash;
}
```

3.`String str = new String(char[] value)`通过指定字符数组来构造新的String对象

```java
public String(char value[]) {
    this.value = Arrays.copyOf(value, value.length);
}
```

当然,还有我们最常用的`String str = "123"`,不过这种通过**字面量**形式构造对象的方式完全等同于上述的第三种形式,实际上它的实现是:

```java
char[] chars = {'1','2','3'};
String str = new String(chars);
```

### 3.关于声明一个字符串是否创建了对象

- 由字面量声明的字符串不一定创建了对象

String a = "123";是否创建了对象要看字符串常量池中,是否已经有了"123"这个对象,如果有,那么这句代码就没有创建对象,如果没有,那么就在字符串常量池中创建了一个"123"对象.

- 通过new出来的字符串一定创建了对象

String a = new String("123"),无论字符串常量池是否有"123"这个对象,这句代码都会创建对象,区别就在于创建了一个还是两个.假如常量池中没有,那么就分别在常量池和堆区都分别创建了"123"对象。如果常量池中有该对象,那么就只在堆区中创建一个"123"对象。

## 字符串常量池

### 1.字符串常量池的设计思想

- 字符串的分配，和其他的对象分配一样，耗费高昂的时间与空间代价，作为最基础的数据类型，大量频繁的创建字符串，极大程度地影响程序的性能

- JVM为了提高性能和减少内存开销，为字符串开辟一个字符串常量池，类似于缓存区,创建字符串常量时，首先判断字符串常量池是否存在该字符串.如果存在该字符串，返回引用实例，不存在，实例化该字符串并放入池中

- 实现的基础:字符串**不可变**

### 2.字符串常量池的位置

字符串常量池在JDK1.6之前是存放在Perm区的(永久代),也就是我们常说的方法区,而在JDK1.7之后,字符串常量池已经被移到了Heap区(堆区)存放,而在JDK1.8,Perm区已经被移除了,取而代之是元空间。

> 我们常说的方法区,其实是JVM中提出的规范,永久代和方法区的关系,类似我们Java中的类与接口,方法区是一个接口,制定了规范,而永久代是HotSpot虚拟机对这个规范的实现

并且,字符串常量池相较其他常量池有着特殊性:

- 直接使用字面量声明的String对象，如果在常量池中不存在，那么就会直接存储在字符串常量池中,如果存在,那么就会直接指向字符串常量池中的对象

- 而通过new关键字创建的String对象,如果在常量池中不存在，可以通过native方法`intern`手动入池。而即使常量池中存在这个字符串,这个方法就不会生效.

- **能否入池，都取决于字符串常量池中是否存在该字符串。**

  - 如果不存在就会入池。
  - 如果存在，那么通过字面量声明的字符串就会直接从常量池中取值；而intern方法就没有任何效果

  

**很重要的一点：**

​	由于JDK对于字符串常量池的改动，在JDK1.7和之后的版本，字符串常量池都在堆区中了，而且，**使用intern方法入池的字符串，不会再在字符串常量池中创建一个对象，而是保存调用intern方法的这个字符串的引用。**



## StringBuilder和StringBuffer

众所周知，在Java中,运算符`+`在和字符串一起使用时的作用是`拼接`,而非运算,那么到底是什么原因呢,其实底层就是StringBuffer(JDK1.0)和StringBuilder(JDK1.5之后)实现的。

看了API就会发现，StringBuilder和StringBuffer都是**可变字符序列**，而且两者的方法是完全一样的，唯一的区别就是线程安全问题，StringBuilder是线程不安全的，而StringBuffer是线程安全的，而StringBuffer始于JDK1.0，StringBuilder始于JDK1.5，也就是说，StringBuilder的出现，就是为了在单线程条件下替换StringBuffer，也就意味着，在不考虑线程安全问题的情况下，我们通常都会使用StringBuilder，因为没有线程问题的影响，StringBuilder的速度更快。

再说回字符串拼接的问题，

```java
String a = "1";
String b = "2";
String c = "3";
String d = a+b+c;
System.out.print(d);//"123"
```

上面这个代码片段的底层实现,其实是:

```java
String d = (new StringBuilder(String.valueof(a))).append(b).append(c).toString();
```

换言之,字符串拼接,其实是创建了一个新的StringBuilder的对象,来调用append方法进行拼接,拼接完成后再调用toString方法来返回一个新的字符串.

因此,

```java
String a = "Hello";
String b = "World";
String c = a+b;
String d = a+b;
System.out.println(c);
System.out.println(d);
System.out.println(c==d);
```

这个代码片段的结果是HelloWorld,HelloWorld,false。

原因是StringBuilder的toString方法每次都会返回一个new出来的String对象。源码如下:

```java
//StringBuilder类重写的toString方法
@Override
    public String toString() {
        // Create a copy, don't share the array
        return new String(value, 0, count);
    }
```

## 关于String类的面试题

### 题目1:

### String str = new String（"123")一共创建了几个对象

答:

1.假如字符串常量池中没有"123"这个字符串,那么这条代码就创建了两个对象,第一个是在字符串常量池中创建了字符串对象"123",然后在堆区创建了一个字符串对象"123",接着会把堆区这个"123"的引用地址值赋给在栈区声明的str。

2.假如字符串常量池中有"123"这个字符串,那么就只创建了一个对象,就是在堆区中创建了对象"123",然后把地址值赋给str.



### 题目2:

引用自:[深入解析String#intern-美团技术团队](<https://tech.meituan.com/2014/03/06/in-depth-understanding-string-intern.html>)

**代码片段1:**

```java
String s1 = new String("1");
s.intern();
String s2 = "1";
System.out.println(s == s2);

String s3 = new String("1") + new String("1");
s3.intern();
String s4 = "11";
System.out.println(s3 == s4);
```

在JDK1.6中:结果是`false false`

在JDK1.7中:结果是` false true`

分析:

- **在JDK1.6中:字符串常量池存储于永久代**

String s1 = new String("1")首先在字符串常量池中创建了对象"1",然后在堆区创建对象"1",s1的引用指向的是堆区的对象;

s1.intern()方法,会查找字符串常量池中是否有"1"这个对象,结果里面有,所以这个方法没有生效,等于没写.

String s2 = "1",因为常量池中已经有"1"这个字符串了,所以s2指向了常量池中"1"

**s1指向堆区,s2指向永久代,显然二者地址不同,结果为false**

String s3 = new String("1") + new String("1");这句代码在堆区创建了两个匿名"1"对象,拼接后的等于在堆区中创建了字符串"11"对象

s3.intern()方法将"11"对象保存在了字符串常量池中

String s4 = "11",指向的是字符串常量池中"11"对象

**s3指向堆区,s4指向永久代,结果为false**

- **在JDK1.7中:字符串常量池存储于堆区,且intern方法不会创建对象,而是保存堆区对象的引用**

s1在常量池和堆区分别创建了对象"1",s1指向的是堆区的"1"对象,s.intern()方法无效,s2指向的是常量池中的"1"对象,s1和s2指向地址不同,所以是false;

s3在堆区创建了对象"11",s3.intern()将堆区对象存在常量池中,**但是**!!! 这里的**存**是将堆区中"11"的引用存在了常量池,而非创建对象.

所以s4指向常量池中的引用,其实就是s3的引用,所以s3==s4为true。



**代码片段2：**

```java
String s1 = new String("1");
String s2 = "1";
s1.intern();
System.out.println(s == s2);

String s3 = new String("1") + new String("1");
String s4 = "11";
s3.intern();
System.out.println(s3 == s4);
```

JDK1.6结果:`false false`

JDK1.7结果:`false false`

分析:

- **在JDK1.6中:字符串常量池存储于永久代**

s1在常量池和堆区分别创建了对象"1",s1指堆区的对象"1";

s2指向的是常量池的对象"1"

因为常量池中有"1"这个对象,所以s1.intern()无效

**s1,s2二者指向地址不同,所以是false.**

s3在堆区创建了对象"11"

s4在常量池创建了对象"11",并指向了常量池中的"11"对象

常量池中已经有了对象"11",s3.intern()无效

**s3,s4指向不同,所以false**

- **在JDK1.7中:字符串常量池存储于堆区,且intern方法不会创建对象,而是保存堆区对象的引用**

s1在常量池和堆区分别创建了对象"1",s1指堆区的对象"1";

s2指向的是常量池的对象"1"

因为常量池中有"1"这个对象,所以s1.intern()无效

**s1,s2二者指向地址不同,所以是false.**

s3在堆区创建了对象"11"

s4在常量池创建了对象"11",并指向了常量池中的"11"对象

常量池中已经有了对象"11",s3.intern()无效

**s3,s4指向不同,所以false**


