# Spring Cloud Config接入

微服务配置中心能帮助统一管理多个环境、多个应用程序的外部化配置，不需要在某个配置有改动或新增某个配置项时去多个节点上一个个修改，做到了一次改动，处处使用。这里和Eureka注册中心配合使用。

## Spring Cloud Config

SpringCloud子项目，提供了分布式系统中外部配置管理的能力，分为`server`和`client`
两部分。[官网地址](https://spring.io/projects/spring-cloud-config)

## 配合git仓库使用

建立一个git仓库，将配置文件放在仓库里，配置文件格式应用名-profile.properties(yml)
，多服务的情况包名可根据服务前缀命名，在配置中心server端配置中增加search-path配置即可，比如多个包名app-1/app-2，可以配置search-path：app-*

## 服务端

### 依赖

```xml

<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-config-server</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
</dependencies>
```

### 配置文件

```yaml
server:
  port: 8077
spring:
  application:
    name: spring-cloud-config-center
  cloud:
    config:
      server:
        git:
          uri: git仓库地址
          username: 账号
          password: 密码
          search-paths: app-* #搜索路径，使用通配符

eureka:
  client:
    service-url:
      defaultZone: http://admin:admin@127.0.0.1:19991/eureka/
      fetch-registry-interval-seconds: 5

  instance:
    prefer-ip-address: true
    lease-expiration-duration-in-seconds: 30
    lease-renewal-interval-in-seconds: 10
```

### 启动类

```java
@SpringBootApplication
@EnableEurekaClient
@EnableConfigServer
public class ConfigCenterApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigCenterApplication.class, args);
    }
}
```

## 服务端

### 依赖

```xml
<!--springcloud config客户端-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-client</artifactId>
</dependency>
```

### 配置文件

```yaml
spring:
  application:
    name: app-1
  cloud:
    config:
      profile: @spring.profiles.active@
      label: master
      discovery:
        enabled: true
        service-id: spring-cloud-config-center
eureka:
  client:
    service-url:
      defaultZone: http://admin:admin@127.0.0.1:19991/eureka/
```

::: tip  
SpringCloudConfig配合服务发现使用时，必须在bootstrap.yaml(或环境变量)
开启服务发现`spring.cloud.config.discovery.enabled=true`，并且要配置注册中心的地址`eureka.client.serviceUrl.defaultZone`
，服务启动时会首先去注册中心找到配置中心server。

:::

The HTTP service has resources in the following form:

```txt
/{application}/{profile}[/{label}]
/{application}-{profile}.yml
/{label}/{application}-{profile}.yml
/{application}-{profile}.properties
/{label}/{application}-{profile}.properties
```

#### 以下引自官网

> ### [Discovery First Bootstrap](https://docs.spring.io/spring-cloud-config/docs/2.2.8.RELEASE/reference/html/#discovery-first-bootstrap)
>
>If you use a `DiscoveryClient` implementation, such as Spring Cloud Netflix and Eureka Service Discovery or Spring
> Cloud Consul, you can have the Config Server register with the Discovery Service. However, in the default “Config First”
> mode, clients cannot take advantage of the registration.
>
>If you prefer to use `DiscoveryClient` to locate the Config Server, you can do so by
> setting `spring.cloud.config.discovery.enabled=true` (the default is `false`). The net result of doing so is that client
> applications all need a `bootstrap.yml` (or an environment variable) with the appropriate discovery configuration. For
> example, with Spring Cloud Netflix, you need to define the Eureka server address (for example,
> in `eureka.client.serviceUrl.defaultZone`). The price for using this option is an extra network round trip on startup,
> to locate the service registration. The benefit is that, as long as the Discovery Service is a fixed point, the Config
> Server can change its coordinates. The default service ID is `configserver`, but you can change that on the client by
> setting `spring.cloud.config.discovery.serviceId` (and on the server, in the usual way for a service, such as by
> setting `spring.application.name`).

## 坑

配置中心启动后，其他服务向配置中心获取配置文件时，配置中心会去git上拉配置并缓存在本地的临时目录。

默认情况下，它们被放在带有config-repo-前缀的系统临时目录中。例如，在linux上，它可以是`/tmp/config-repo-<randomid>`
。一些操作系统会定期清理临时目录，导致意料之外的情况发生，例如丢失属性。需要在配置文件中增加配置`spring.cloud.config.server.git.basedir`
或`spring.cloud.config.server.svn.basedir`来指定一个不在系统临时路径下的目录。