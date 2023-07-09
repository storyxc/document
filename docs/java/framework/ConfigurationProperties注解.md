# ConfigurationProperties注解

@ConfigurationProperties注解可以从外部获取配置信息，并将其绑定到JavaBean中。

## 原理

SpringBoot可以让配置信息外部化，支持的配置有多种，最常见的`.properties`、`.yaml`文件，启动时命令行参数`--xxx`、系统环境变量、Java系统属性(System.getProperties())...



@ConfigurationProperties注解的功能由ConfigurationPropertiesBindingPostProcessor这个后置处理器实现，spring容器中的`enviroment.propertySources`记录着外部的属性值，properties后置处理器会从中找到匹配的值绑定到JavaBean中。



属性的绑定是会被覆盖的，排序靠后的会覆盖靠前的，即越靠后的优先级越高。（os环境变量可以覆盖application.properties,java系统属性可以覆盖系统环境变量，命令行参数可以覆盖java系统属性...)



这些配置的方式和可以参照spring boot官方文档：

>https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config
>
>## 2. Externalized Configuration
>
>Spring Boot lets you externalize your configuration so that you can work with the same application code in different environments. You can use a variety of external configuration sources, include Java properties files, YAML files, environment variables, and command-line arguments.
>
>Property values can be injected directly into your beans by using the `@Value` annotation, accessed through Spring’s `Environment` abstraction, or be [bound to structured objects](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.typesafe-configuration-properties) through `@ConfigurationProperties`.
>
>Spring Boot uses a very particular `PropertySource` order that is designed to allow sensible overriding of values. Properties are considered in the following order (with values from lower items overriding earlier ones):
>
>1. Default properties (specified by setting `SpringApplication.setDefaultProperties`).
>2. [`@PropertySource`](https://docs.spring.io/spring-framework/docs/5.3.21/javadoc-api/org/springframework/context/annotation/PropertySource.html) annotations on your `@Configuration` classes. Please note that such property sources are not added to the `Environment` until the application context is being refreshed. This is too late to configure certain properties such as `logging.*` and `spring.main.*` which are read before refresh begins.
>3. Config data (such as `application.properties` files).
>4. A `RandomValuePropertySource` that has properties only in `random.*`.
>5. OS environment variables.
>6. Java System properties (`System.getProperties()`).
>7. JNDI attributes from `java:comp/env`.
>8. `ServletContext` init parameters.
>9. `ServletConfig` init parameters.
>10. Properties from `SPRING_APPLICATION_JSON` (inline JSON embedded in an environment variable or system property).
>11. Command line arguments.
>12. `properties` attribute on your tests. Available on [`@SpringBootTest`](https://docs.spring.io/spring-boot/docs/2.7.1/api/org/springframework/boot/test/context/SpringBootTest.html) and the [test annotations for testing a particular slice of your application](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing.spring-boot-applications.autoconfigured-tests).
>13. [`@TestPropertySource`](https://docs.spring.io/spring-framework/docs/5.3.21/javadoc-api/org/springframework/test/context/TestPropertySource.html) annotations on your tests.
>14. [Devtools global settings properties](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.devtools.globalsettings) in the `$HOME/.config/spring-boot` directory when devtools is active.
>
>Config data files are considered in the following order:
>
>1. [Application properties](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.files) packaged inside your jar (`application.properties` and YAML variants).
>2. [Profile-specific application properties](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.files.profile-specific) packaged inside your jar (`application-{profile}.properties` and YAML variants).
>3. [Application properties](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.files) outside of your packaged jar (`application.properties` and YAML variants).
>4. [Profile-specific application properties](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.files.profile-specific) outside of your packaged jar (`application-{profile}.properties` and YAML variants).

### 系统环境变量的方式

这里通过系统环境变量的绑定方式大致记录下，因为java应用的docker镜像通常使用这种方式，例如docker启动指令里加上`-e xxx=xxx`，就是在指定docker容器的系统环境变量。比较常见的`-e JAVA_OPTS=xxx` ,因为java应用的镜像通常entrypoint都是`sh -c java $JAVA_OPTS xxx.jar`。

上文中`enviroment.propertySources`会读取外部的配置，系统环境变量是通过`System.getenv()`获取的，通过docker指令给镜像添加了系统环境变量后，就会通过这种方式绑定到java应用的配置类中。

### 但是

通过docker指令配置系统环境变量的方式，参数的命名需要做对应的调整，例如:

```java
@ConfigurationProperties(prefix="user")
public class Test{
    private String name;
}
```

如果是通过`.properties`文件来配置那么文件中应该是`user.name=xxx`,如果是通过linux系统环境变量的方式，则环境变量中应该是`USER_NAME=xxx`.这是因为不同操作系统对环境变量的命名规则都有严格的要求，spring boot的宽松绑定规则要尽可能兼容不同系统的限制.

linux shell变量的命名规则：可以`a-zA-Z0-9`，可以下划线`_`,按照惯例，变量名都是大写的。所以，通过环境变量读取java配置时，应该遵循的原则

- 将`.`替换为`_`

- 删除所有破折号`-`

- 变量名转为大写

  

例：`spring.main.log-startup-info` -> `SPRING_MAIN_LOGSTARTUPINFO`



> ##### Binding from Environment Variables
>
> Most operating systems impose strict rules around the names that can be used for environment variables. For example, Linux shell variables can contain only letters (`a` to `z` or `A` to `Z`), numbers (`0` to `9`) or the underscore character (`_`). By convention, Unix shell variables will also have their names in UPPERCASE.
>
> Spring Boot’s relaxed binding rules are, as much as possible, designed to be compatible with these naming restrictions.
>
> To convert a property name in the canonical-form to an environment variable name you can follow these rules:
>
> - Replace dots (`.`) with underscores (`_`).
> - Remove any dashes (`-`).
> - Convert to uppercase.
>
> For example, the configuration property `spring.main.log-startup-info` would be an environment variable named `SPRING_MAIN_LOGSTARTUPINFO`.
>
> Environment variables can also be used when binding to object lists. To bind to a `List`, the element number should be surrounded with underscores in the variable name.
>
> For example, the configuration property `my.service[0].other` would use an environment variable named `MY_SERVICE_0_OTHER`.
