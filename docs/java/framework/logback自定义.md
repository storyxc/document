# logback自定义

## 自定义日志动态输出内容

可以通过自定义全局拦截器通过MDC存储数据，在logback配置文件中直接通过`%X{变量名} `读取变量。

```java
/**
 * @author xc
 * @description 全局拦截器
 * @date 2023/5/11 16:13
 */
@Component
@Slf4j
public class GlobalInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 获取当前登录用户信息
        LoginSession loginSession = LoginContext.getLoginSession();
        if (loginSession != null) {
            MDC.put("operator", loginSession.getUserName());
        }else {
            MDC.put("operator", "anonymous");
        }
        return true;
    }
}
```

### logback-spring.xml

```xml
<appender name="INFO_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!--日志文件输出格式-->
    <!--%X{operator}可以直接获取当前线程MDC中的operator参数输出到日志中-->
    <encoder>
        <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} %X{operator}  %msg%n</pattern> 
        <charset>UTF-8</charset>
    </encoder>
    ...
</appender>
```



## 自定义converter

通过自定义转换器来对日志输出的内容进行自定义处理

```java
/**
 * @author xc
 * @description
 * @date 2023/5/23 15:39
 */
public class OperatorConverter extends ClassicConverter {
    @Override
    public String convert(ILoggingEvent event) {
        String operator = event.getMDCPropertyMap().get("operator");
        return StrUtil.isNotBlank(operator) ? "- " + operator + " - " : "";
    }
}

```

### logback-spring.xml

```xml
<configuration scan="true" scanPeriod="10 seconds">

    <!--先声明一个转换器-->
    <conversionRule conversionWord="operator" converterClass="com.storyxc.config.logback.converter.OperatorConverter" />
    <!--在输出的pattern中直接使用，此时就不需要用%X{变量}了，直接%conversionWord即可-->
    <!--此时如果MDC中没有operator变量时%operator会输出空串，否则会输出 "- 操作人姓名 - "-->
    <appender name="INFO_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!--日志文件输出格式-->
    <encoder>
        <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} %operator%msg%n</pattern> 
        <charset>UTF-8</charset>
    </encoder>
    ...
</appender>
</configuration>
```

## 自定义filter

```java
/**
 * @author xc
 * @description logback日志过滤器：开发环境下只打印本项目路径下的debug & debug以上级别的日志
 * @date 2023/5/16 20:15
 */
public class LogBackDebugPackageFilter extends AbstractMatcherFilter<ILoggingEvent> {
    private static final String PROJECT_BASE_PACKAGE = "com.storyxc";

    @Override
    public FilterReply decide(ILoggingEvent event) {
        if (!isStarted()) {
            return FilterReply.NEUTRAL;
        }
        Level level = event.getLevel();
        if (level.isGreaterOrEqual(Level.DEBUG)) {
            String loggerName = event.getLoggerName();
            if (level.equals(Level.DEBUG)) {
                if (loggerName != null && loggerName.startsWith(PROJECT_BASE_PACKAGE)) {
                    return FilterReply.ACCEPT;
                } else {
                    return FilterReply.DENY;
                }
            }else {
                return FilterReply.ACCEPT;
            }
        } else {
            return FilterReply.NEUTRAL;
        }
    }
}
```

### logback-spring.xml

```xml
<!--输出到控制台-->
<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
    <filter class="com.storyxc.config.logback.LogBackDebugPackageFilter">
    </filter>
    <encoder>
        <Pattern>${CONSOLE_LOG_PATTERN}</Pattern>
        <!-- 设置字符集 -->
        <charset>UTF-8</charset>
    </encoder>
</appender>
```

