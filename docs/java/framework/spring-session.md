# spring-session实现集群session共享

## 问题场景

系统后台登录使用的是图片验证码，生成验证码接口会把验证码放在session中，登录时前端会携带账号密码的密文和验证码到后台，后台再用session中的验证码和前端带过来的进行校验。利用单机的session存储信息有个显而易见的问题，集群环境下这个功能是不可用的，因此要对这个过程进行改造，实现集群共享session，这里采用的是spring-session + redis的方案。



## 实现

spring-session和springboot的集成非常简单，如果项目使用的是springboot只需要引入依赖，再添加几个简单的配置类即可。如果是ssm那就要稍微麻烦点，要写xml的配置文件。本文是springboot的集成方案，详细内容可以下载spring-session官方[sample](https://github.com/spring-projects/spring-session)查看。



### 依赖

```xml
<dependencies>
		<!--spring-session-->
		<dependency>
			<groupId>org.springframework.session</groupId>
			<artifactId>spring-session-data-redis</artifactId>
			<version>2.0.3.RELEASE</version>
		</dependency>
</dependencies>
```

### 配置类

```java
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;

public class Initializer extends AbstractHttpSessionApplicationInitializer {

	public Initializer() {
		super(Config.class);
	}

}
```



```java
import org.springframework.context.annotation.Import;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@Import(EmbeddedRedisConfig.class)
@EnableRedisHttpSession
public class Config {

}
```





```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;

@Configuration
@Slf4j
public class EmbeddedRedisConfig {

    @Value("${session.share.redis.ip}")
    private String ip;
    @Value("${session.share.redis.db}")
    private String db;


    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        log.info("session redis ip :{}, db:{}",ip,db);
        RedisStandaloneConfiguration redisConfig = new RedisStandaloneConfiguration();
        redisConfig.setHostName(ip);
        redisConfig.setPort(6379);
        //指定database
        redisConfig.setDatabase(Integer.parseInt(db));
        return new JedisConnectionFactory(redisConfig);
    }

}
```

### 业务代码

这里就省略了，思路很简单，就是用session_id作为key存储登录验证码，从而实现不论登录请求落到集群的哪个服务器都能从redis中获取到正确的验证码。



## 总结

不得不感慨下spring生态的强大，毫不费力的就集成了一个功能。spring-session使用redis共享session的原理是通过RedisHttpSessionConfiguration配置类，生成一个过滤器SessionRepositoryFilter并且加入到过滤器链中，而且这个过滤器优先级是最高的，然后在SessionRepositoryFilter的doFilter方法中使用HttpServletRequest和HttpServletResponse的包装类把原始的request、response对象包装一下传递到其他过滤器中，在doFilter的final代码段里通过commitSession实现session到redis的持久化。简单的说就是spring-session使用redis存储的session替换了tomcat的httpsession实现。