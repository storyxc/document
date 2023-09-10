# 策略模式的具体实现

## 背景
开发中经常有这样一种场景，一个接口需要处理的请求中的内容包含多种不同的类型。比如支付系统，订单支付的时候可能是支付宝支付，微信支付或者银联支付等。又或者是订单系统，订单可能是普通订单，可能是团购订单，也可能是秒杀订单。前阵子做的一个预览Office文件的功能也与之类似，文件的类型不同，也需要采取不同的处理方案。这时候最简单的做法就是在controller中写n多个if else：

```java
if ( "excel".equals(file.getType)) {
	//***
} else if（"word".equals(file.getType()）{
    //***
} ……
```

如果后面再加其他的类型，那就继续加if else语句，这样代码就会变的很丑陋，而且每次都需要对controller代码进行修改，后续的扩展很麻烦。所以这种情况通常会采用策略模式来进行处理，这样我们的代码会变得更加优雅，方便后续的维护。



## 策略模式

策略模式是一种行为模式，主要作用是在程序运行时动态切换一个类的行为或者算法。我们需要做的就是创建一个定义行为的Strategy接口以及它的具体策略实现类，以及一个策略的上下文来动态切换策略。
![无标题.png](https://storyxc.com/images/blog//af2fdc38698c458f9b06d8fbf6c89e65.png)

下面将介绍具体的实现方案，以订单系统为例

**环境搭建**

```xml
<parent>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-parent</artifactId>
	<version>2.1.4.RELEASE</version>
</parent>
<dependencies>
	<dependency>
		<groupId>org.projectlombok</groupId>
		<artifactId>lombok</artifactId>
		<version>1.18.6</version>
	</dependency>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-web</artifactId>
		<version>2.1.4.RELEASE</version>
	</dependency>
	<dependency>
		<groupId>org.apache.commons</groupId>
		<artifactId>commons-lang3</artifactId>
		<version>3.8.1</version>
	</dependency>
</dependencies>
```

**订单实体类**

```java
@Data
public class Order {
    private String code;
    private BigDecimal price;
    /**
     * 1: 普通订单
     * 2: 秒杀订单
     * 3: 团购订单
     */
    private String type;
}
```

**抽象策略接口**

```java
public interface OrderStrategy {
    String handleOrder(Order order);
}
```

**策略具体实现**

```java
@Component
public class NormalHandler implements OrderStrategy {

    @Override
    public String handleOrder(Order order) {
        return "普通订单处理完毕";
    }
}

@Component
public class GroupHandler implements OrderStrategy {
    @Override
    public String handleOrder(Order order) {
        return "团购订单处理完毕";
    }
}

@Component
public class SecKillHandler implements OrderStrategy {
    @Override
    public String handleOrder(Order order) {
        return "秒杀订单处理完毕";
    }
}
```

**SpringUtils**

```
@Component
public class SpringUtils implements ApplicationContextAware {

    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        SpringUtils.applicationContext = applicationContext;
    }

    //获取applicationContext
    private static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    //通过name获取 Bean.
    public static Object getBean(String name){
        return getApplicationContext().getBean(name);
    }

    //通过class获取Bean.
    public static <T> T getBean(Class<T> clazz){
        return getApplicationContext().getBean(clazz);
    }

    //通过name,以及Clazz返回指定的Bean
    public static <T> T getBean(String name,Class<T> clazz){
        return getApplicationContext().getBean(name, clazz);
    }

}
```

## 第一种实现

可以采取配置的方式，将不同类型和对应的handler的bean name配置在配置文件或者是数据库中，这样我们在context中可以直接获取配置文件中的bean name或者去数据库中查询，然后从spring容器中获取对应的bean并调用处理方法即可。

以将映射关系持久化到数据库为例，我们需要建一张表来维护类型和具体处理器之间的关系
字段为type和对应处理器的bean名称

**controller**

```java
@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private IOrderService orderService;


    @GetMapping("/{type}")
    public String handleOrder(@PathVariable String type){
        return orderService.handleOrder(type);
    }
}
```

**service**

```java
@Service
public class OrderServiceImpl implements IOrderService {

    @Autowired
    private OrderStrategyContext context;

    @Override
    public String handleOrder(String type) {
        return context.getBean(type).handleOrder(type);
    }
}
```

**context**

```java
@Component
public class OrderStrategyContext {
    @Autowired
	private StrategyMapper mapper;

    public OrderStrategy getBean(String type){
        String beanName = mapper.getBeanName(type);
        return SpringUtils.getBean(beanName);
    }

}
```


## 第二种实现

第一种方案相较于无尽的if else已经好很多了，但是还是需要增加配置文件或者数据库中新建表来维护类型和对应处理器的映射关系。还可以直接自定义注解来实现这个关系的对应。

**自定义注解HandlerType**

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface HandlerType {
    String value();
}
```

然后在每个具体策略类上加上注解

```java
@Component
@HandlerType("1")
public class NormalHandler implements OrderStrategy {

    @Override
    public String handleOrder(String type) {
        return "普通订单处理完毕";
    }
}
```

```java
@Component
@HandlerType("2")
public class GroupHandler implements OrderStrategy {
    @Override
    public String handleOrder(String type) {
        return "团购订单处理完毕";
    }
}
```

```java
@Component
@HandlerType("3")
public class SecKillHandler implements OrderStrategy {

    @Override
    public String handleOrder(String type) {
        return "秒杀订单处理完毕";
    }
}
```

**策略上下文context修改为**

```java
public class OrderStrategyContext {

    private Map<String,Class> handlerMap;

    public OrderStrategyContext(Map<String,Class> handlerMap){
        this.handlerMap = handlerMap;
    }

    public OrderStrategy getBean(String type){
        Class clazz = handlerMap.get(type);
        if (clazz == null) {
            throw new IllegalArgumentException("not found handler for type :" + type);
        }
        return (OrderStrategy) SpringUtils.getBean(clazz);
    }
}
```

自定义注解后，我们需要将注解的value和对应策略类的bean_name放到上下文的handlerMap中，并将策略上下文对象注册到spring容器里，需要一个处理类**HandlerProcessor** 

```java
@Component
public class HandlerProcessor implements BeanFactoryPostProcessor {

    private static final String HANDLE_PACKAGE = "com.test.handler";

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        Map<String,Class> map = new HashMap<>();
        ClassScaner.scan(HANDLE_PACKAGE, HandlerType.class).forEach(clazz -> {
            //获取注解中对应的类型
            String type = clazz.getAnnotation(HandlerType.class).value();
            //注解的类型值作为key,对应的类作为value,存储在map中
            map.put(type,clazz);
        });
        //初始化HandlerContext,注册到Spring容器中
        OrderStrategyContext context = new OrderStrategyContext(map);
        beanFactory.registerSingleton(OrderStrategyContext.class.getName(),context);
    }
}
```

**ClassScaner**

```java
public class ClassScaner implements ResourceLoaderAware {

    private final List<TypeFilter> includeFilters = new LinkedList<TypeFilter>();
    private final List<TypeFilter> excludeFilters = new LinkedList<TypeFilter>();

    private ResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
    private MetadataReaderFactory metadataReaderFactory = new CachingMetadataReaderFactory(this.resourcePatternResolver);

    @SafeVarargs
    public static Set<Class<?>> scan(String[] basePackages, Class<? extends Annotation>... annotations) {
        ClassScaner cs = new ClassScaner();

        if (ArrayUtils.isNotEmpty(annotations)) {
            for (Class anno : annotations) {
                cs.addIncludeFilter(new AnnotationTypeFilter(anno));
            }
        }

        Set<Class<?>> classes = new HashSet<>();
        for (String s : basePackages) {
            classes.addAll(cs.doScan(s));
        }

        return classes;
    }

    @SafeVarargs
    public static Set<Class<?>> scan(String basePackages, Class<? extends Annotation>... annotations) {
        return ClassScaner.scan(StringUtils.tokenizeToStringArray(basePackages, ",; \t\n"), annotations);
    }

    public final ResourceLoader getResourceLoader() {
        return this.resourcePatternResolver;
    }

    @Override
    public void setResourceLoader(ResourceLoader resourceLoader) {
        this.resourcePatternResolver = ResourcePatternUtils
                .getResourcePatternResolver(resourceLoader);
        this.metadataReaderFactory = new CachingMetadataReaderFactory(
                resourceLoader);
    }

    public void addIncludeFilter(TypeFilter includeFilter) {
        this.includeFilters.add(includeFilter);
    }

    public void addExcludeFilter(TypeFilter excludeFilter) {
        this.excludeFilters.add(0, excludeFilter);
    }

    public void resetFilters(boolean useDefaultFilters) {
        this.includeFilters.clear();
        this.excludeFilters.clear();
    }

    public Set<Class<?>> doScan(String basePackage) {
        Set<Class<?>> classes = new HashSet<>();
        try {
            String packageSearchPath = ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX
                    + org.springframework.util.ClassUtils
                    .convertClassNameToResourcePath(SystemPropertyUtils
                            .resolvePlaceholders(basePackage))
                    + "/**/*.class";
            Resource[] resources = this.resourcePatternResolver
                    .getResources(packageSearchPath);

            for (int i = 0; i < resources.length; i++) {
                Resource resource = resources[i];
                if (resource.isReadable()) {
                    MetadataReader metadataReader = this.metadataReaderFactory.getMetadataReader(resource);
                    if ((includeFilters.size() == 0 && excludeFilters.size() == 0) || matches(metadataReader)) {
                        try {
                            classes.add(Class.forName(metadataReader
                                    .getClassMetadata().getClassName()));
                        } catch (ClassNotFoundException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        } catch (IOException ex) {
            throw new BeanDefinitionStoreException(
                    "I/O failure during classpath scanning", ex);
        }
        return classes;
    }

    protected boolean matches(MetadataReader metadataReader) throws IOException {
        for (TypeFilter tf : this.excludeFilters) {
            if (tf.match(metadataReader, this.metadataReaderFactory)) {
                return false;
            }
        }
        for (TypeFilter tf : this.includeFilters) {
            if (tf.match(metadataReader, this.metadataReaderFactory)) {
                return true;
            }
        }
        return false;
    }
}
```
## 第三种方案
扫描指定的包还是很麻烦,还可以直接使用ioc容器来直接进行操作
将OrderStrategyContext进行修改,不再需要processor类
```java
@Component
public class OrderStrategyContext implements ApplicationContextAware, CommandLineRunner {

    private Map<String,Object> handlerMap = new HashMap<>();

    public OrderStrategy getInstance(String type) {
        Object obj = handlerMap.get(type);
        if (obj == null) {
            throw new IllegalArgumentException("handler not found for type : " + type);
        }
        if (obj instanceof OrderStrategy) {
            return (OrderStrategy) obj;
        } else {
            throw new IllegalArgumentException("handler not found for type : " + type);
        }
    }

    private ApplicationContext context;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = applicationContext;
    }


    @Override
    public void run(String... args) throws Exception {
        this.loadBean();
    }

    public void loadBean() {
        Map<String, Object> beansWithAnnotation = context.getBeansWithAnnotation(HandlerType.class);
        beansWithAnnotation.forEach((handlerBeanName,handlerBean)->{
            Class<?> clazz = handlerBean.getClass();
            HandlerType annotation = clazz.getAnnotation(HandlerType.class);
            String annotationValue = annotation.value();
            handlerMap.put(annotationValue,handlerBean);
        });
    }
}
```


## 启动项目并测试
![1.jpg](https://storyxc.com/images/blog//61b52319c085408ba7b261894ae7faae.jpg)
![3.jpg](https://storyxc.com/images/blog//53af0b1422c84116a55475ddf9ff7168.jpg)