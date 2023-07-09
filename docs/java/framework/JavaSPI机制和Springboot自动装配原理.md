# JavaSPI机制和Springboot自动装配原理

## SPI机制

`SPI（Service Provider Interface）`是一种服务发现机制，提供服务接口，且为该接口寻找服务的实现。

从Java6开始引入，是一种基于ClassLoader类加载器发现并加载服务的机制。

标准的SPI构成：

- Service：公开的接口或抽象类，定义一个抽象的功能模块
- Service Provider：Service接口/抽象类的具体实现
- ServiceLoader：SPI中的核心组件，负责在**运行时**发现并加载Service Provider

### JAVA SPI的规范要素

- 规范的配置文件
  - 文件路径：必须要在JAR中的META-INF/services下
  - 文件名称：**Service接口**全限定名
  - 文件内容：**Service实现类**的全限定名，如果有多个，则每个类单独占一行
- ServiceProvider必须有无参构造方法，因为要通过反射实例化
- 保证能加载到配置文件和ServiceProvider类
  - 将jar包放到classpath下
  - jar包安装到jre的扩展目录下
  - 自定义一个ClassLoader

### 场景

SPI在JDBC中的应用：JDBC要求Driver实现类在类加载的时候将自身的实例注册到DriverManager中，从而加载数据库驱动，在SPI出现之前，加载数据库驱动时要执行`Class.forName("com.mysql.jdbc.Driver")`， 在SPI出现后，只需要引入对应依赖的JAR包后，ServiceLoader会自动去约定的路径下寻找需要加载的类。

#### 以mysql-connector-java的jar文件为例

- 配置文件

![image-20220410224243304](https://storyxc.com/images/blog/image-20220410224243304.png)

- 无参构造器

![image-20220410224639940](https://storyxc.com/images/blog/image-20220410224639940.png)

### 总结

- SPI提供了一种**组件发现和注册的方式**，可以用于各种插件、组件的灵活替换
- 可以实现模块间解耦
- 面向接口+配置文件+反射
- 应用：JDBC、SLF4J。。。

### 简单实例

![image-20220410231011833](https://storyxc.com/images/blog/image-20220410231011833.png)

![image-20220410231049522](https://storyxc.com/images/blog/image-20220410231049522.png)

![image-20220410231109810](https://storyxc.com/images/blog/image-20220410231109810.png)



当spi-company依赖spi-lt时运行main方法：

![image-20220410231225984](https://storyxc.com/images/blog/image-20220410231225984.png)

当spi-company依赖spi-yd时运行main方法：

![image-20220410231313507](https://storyxc.com/images/blog/image-20220410231313507.png)





## springboot的自动装配

自动装配，即auto-configuration，是基于引入的依赖jar包对springboot应用进行自动配置，提供自动配置的jar包通常以starter结尾，比如mybatis-spring-boot-starter等等。

springboot默认会扫描项目下所有的配置类并注入到ioc容器中，但集成到其他框架并不能直接注入。为了实现真正的auto configuration，springboot的自动装配也采用了和spi类似的设计思想：

- 使用约定的配置文件：自动装配的配置文件为META-INF/spring.factories，文件内容为org.springframework.boot.autoconfigure.EnableAutoConfiguration=class1,class2,..classN，class是自动配置类的类名
- 提供自动配置类的jar包中，需要提供配置文件META-INF/spring.factories
- 使用ClassLoader的getResource和getResources方法，读取classpath中的配置文件并使用反射实例化

例如mybatis-spring-boot-starter的包结构：

![image-20220410232256701](https://storyxc.com/images/blog/image-20220410232256701.png)

### 总结

springboot的自动装配核心流程：springboot程序启动，通过spring factories机制加载classpath下的META-INF/spring.factories文件，筛选出所有EnableAutoConfiguration的配置类，反射实例化后注入到springIOC容器中。





todo：实现一个自定义springboot-starter