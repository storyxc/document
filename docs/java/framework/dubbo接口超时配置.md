# dubbo接口超时配置

最近在跟第三方公司对接商城的账单数据，按对账单维度直接推送所有订单和明细，在测试大批量数据时出现了接口超时情况。原因是provider和consumer的超时时间都设置的比较短，因此要把这个接口超时时间调整更大一些。

## dubbo服务超时时间设置及优先级

dubbo的服务超时时间有三个范围，分别是接口方法、接口类、全局。优先级`接口方法>接口类>全局`。而consumer服务和provider服务又分别可以配置这些超时时间。优先级为`consumer>provider`。因此完整的dubbo服务超时配置优先级为`消费方method >提供方method>消费方reference>提供方service>消费方全局配置provider>提供方全局配置consumer`



## 使用注解配置

provider：

```java
@Service(timeout=60000)//alibaba包中的service，包含了spring framework的@Service功能和暴露服务功能,timeout单位ms
```

cosumer:

```java
@Reference(timeout=60000)//单位ms
```



## 使用xml配置

### 提供方

```xml
<dubbo:provider timeout=“5000”/> 全局配置

<dubbo:service timeout=“4000” …/> 接口类配置

<dubbo:method timeout=“3000” …> 方法配置
```



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans        http://www.springframework.org/schema/beans/spring-beans-4.3.xsd        http://dubbo.apache.org/schema/dubbo        http://dubbo.apache.org/schema/dubbo/dubbo.xsd">
 
    <!-- 提供方应用信息，用于计算依赖关系 -->
    <dubbo:application name="user-service-provider"  />
 
    <!-- 使用zookeeper广播注册中心暴露服务地址 -->
    <dubbo:registry address="zookeeper://192.168.0.126:2181" />
 
    <!-- 用dubbo协议在20880端口暴露服务 -->
    <dubbo:protocol name="dubbo" port="20880" />
 
    <!-- 和本地bean一样实现服务 -->
    <bean id="userService" class="com.storyxc.service.impl.UserServiceImpl" />
 
    <!-- 声明需要暴露的服务接口 timeout 接口类中全部方法超时配置 优先级2 -->
    <dubbo:service interface="com.storyxc.service.UserService" ref="userService" timeout="4000" >
        <!-- 单个方法超时配置优先级最高1 -->
        <dubbo:method name="queryAllUserAddress" timeout="3000"></dubbo:method>
    </dubbo:service>
 
    <!-- 服务提供者全局超时时间配置优先级最低 -->
    <dubbo:provider timeout="5000"></dubbo:provider>
 
</beans>

```





### 消费方

```xml
<dubbo:consumer timeout=“4000” > 全局配置

<dubbo:reference timeout=“3000” …> 接口类配置

<dubbo:method timeout=“2000” …> 方法配置
```



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans        http://www.springframework.org/schema/beans/spring-beans-4.3.xsd        http://dubbo.apache.org/schema/dubbo        http://dubbo.apache.org/schema/dubbo/dubbo.xsd">
 
    <!-- 提供方应用信息，用于计算依赖关系 -->
    <dubbo:application name="order-service-consumer"  />
 
    <!-- 使用zookeeper广播注册中心暴露服务地址 -->
    <dubbo:registry address="zookeeper://192.168.0.126:2181" />
 
    <!-- 引用配置： 创建一个远程服务代理，一个引用可以指向多个注册中心 -->
    <dubbo:reference id="userService" timeout="3000" interface="com.storyxc.service.UserService">
        <dubbo:method name="queryAllUserAddress" timeout="2000"></dubbo:method>
    </dubbo:reference>
 
    <!-- orderService -->
    <bean class="com.storyxc.service.impl.OrderServiceImpl">
        <property name="userService" ref="userService"></property>
    </bean>
 
    <!-- 超时全局配置 -->
    <dubbo:consumer timeout="4000"></dubbo:consumer>
</beans>
```

