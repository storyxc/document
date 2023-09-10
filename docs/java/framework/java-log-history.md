# Java日志发展历史



> 最近java社区被log4j2的远程代码执行漏洞引爆了，不过还好我们公司的日志主要用的logback，只有少数几个服务用的log4j2，不过还是因为这个加了会班=.=。而java日志有很多乱七八糟的log4j，log4j2，logback，slf4j，jul。。。
>
> https://www.bilibili.com/video/BV1U44y1E7sE



## 日志发展史

### 阶段一

> 2001年以前，java是没有日志库的，打印日志全靠`System.out`，`System.err`

缺点：

1.产生大量的io操作

2.输出的内容不能保存到文件

3.只能打印在控制台，打印完就看不到了

4.无法定制化，且粒度不够细

### 阶段二

> 大佬Ceki Gülcü在2001年开发出了日志库Log4j，后来Log4j成为了Apache项目，Ceki大佬也加入了Apache组织

Apache曾经还建议过SUN公司引入Log4j到java标准库中，但被拒绝了

### 阶段三

> 2002年2月JDK1.4发布，SUN推出了自己的日志标准库JUL（Java Util Logging），其实是照着log4j抄的，但是没抄好，在JDK1.5之后性能和可用性才有所提升

由于Log4j比JUL好用，并且比较成熟，所以Log4j更具优势

### 阶段四

> 2002年8月Apache推出了JCL（Jakarta Commons Logging），也就是日志抽象层，支持运行时动态加载日志组件的实现，也提供了一个默认实现的Simple Log。
>
> （在ClassLoader中进行查找，如果能找到Log4j就默认使用Log4j的实现，如果没有则使用JUL实现，再没有则使用JCL内部提供的Simple Log实现）

但是JCL有三个缺点：

1. 效率较低
2. 容易引发混乱
3. 使用了自定义ClassLoader的程序中，会引发内存泄露

### 阶段五

> 2006年大佬Ceki Gülcü（Log4j）因为一些原因离开了Apache，之后Ceki觉得JCL不好用，自己重新开发了一套新的日志标准接口规范Slf4j（Simple Logging Facade for Java），也可称为日志门面，很明显Slf4j是为了对标JCL，后面也证明了Slf4j比JCL更加优秀

大佬Ceki提供了一系列的桥接包来帮助Slf4j接口与其他日志库建立关系，这种方式称为桥接设置模式。

代码使用Slf4j接口，就可以实现日志的统一标准化，后续如果想要更换日志的实现，只需要引入Slf4j和相关的桥接包，再引入具体的日志标准库即可。

### 阶段六

> Ceki大佬觉得市场上的日志标准库都是间接实现Slf4j接口，每次都需要配合桥接包，因此在2016年，Ceki大佬基于Slf4j接口开发出了Logback日志标准库作为Slf4j的默认实现，Logback也十分给力，在功能的完整度和性能上超越了所有已有的日志标准库

### 阶段七

> 2012年，Apache推出新项目Log4j2（不兼容Log4j），Log4j2全面借鉴了Slf4j+Logback，虽然log4j2有明显抄袭嫌疑，但是汲取了logback优秀的设计，还解决了一些问题，性能有了极大提升，官方测试是18倍

Log4j2不仅具有Logback的所有特性，还做了分离设计，分为log4j-api和log4j-core，api是日志接口，core是日志标准库，而且Apache也为Log4j2提供了各种桥接包

