# swagger+knife4j

## swagger2风格

### POM

```xml
<dependencies>
	<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
	</dependency>
	<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.2</version>
	</dependency>
</dependencies>
```
### swagger config

```java
// swagger config
@Configuration
@EnableOpenApi
@EnableKnife4j
public class SwaggerConfig {

    @Bean
    public Docket createRestApi() {
        // 返回文档摘要信息
        return new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo())
                .enable(true)
                .select()
                // .apis(RequestHandlerSelectors.withMethodAnnotation(Operation.class))
                .apis(RequestHandlerSelectors.basePackage("com.storyxc"))
                .paths(PathSelectors.any())
                .build();
                .globalRequestParameters(getGlobalRequestParameters())
                .globalResponses(HttpMethod.GET, getGlobalResponseMessage())
                .globalResponses(HttpMethod.POST, getGlobalResponseMessage());
    }

    /**
     * 生成接口信息，包括标题、联系人等
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("接口文档")
                .description("如有雷同，纯属故意")
                .contact(new Contact("storyxc", "", "storyxc@163.com"))
                .version("1.0")
                .build();
    }

    /**
     * 封装全局通用参数
     */
    private List<RequestParameter> getGlobalRequestParameters() {
        List<RequestParameter> parameters = new ArrayList<>();
        parameters.add(new RequestParameterBuilder()
                .name("token")
                .description("token")
                .required(true)
                .in(ParameterType.QUERY)
                .query(q -> q.model(m -> m.scalarModel(ScalarType.STRING)))
                .required(false)
                .build());
        return parameters;
    }

    /**
     * 封装通用响应信息
     */
    private List<Response> getGlobalResponseMessage() {
        List<Response> responseList = new ArrayList<>();
        responseList.add(new ResponseBuilder().code("404").description("未找到资源").build());
        return responseList;
    }
}
```

### WebMvcConfig

```java
@Configuration
@RequiredArgsConstructor
public class WebMvcConfiguration implements WebMvcConfigurer {
    private final TokenInterceptor tokenInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOriginPatterns("*").allowedMethods("*").allowCredentials(true).maxAge(3600);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        String[] ignore = {
                "/doc.html**",
                "/webjars/js/**",
                "/webjars/css/**",
                "/swagger-ui/**",
                "/swagger-resources/**",
                "/v3/**"
        };
        registry.addInterceptor(tokenInterceptor).addPathPatterns("/**").excludePathPatterns(ignore);
    }
}
```

### swagger2注解

- `@Api`:定义接口分组名称
- `@ApiImplicitParam`: 单个参数注释
- `@ApiImplicitParams`:多个参数注释
- `@ApiModel`:实体类定义
- `@ApiModelProperty`:实体属性定义
- `@ApiOperation`:接口定义
- `@ApiParam`:参数注释
- `@ApiResponse`:响应码
- `@ApiResponses`:多个响应码



## knife4j+OpenApi3.0风格

### POM

```xml
<dependencies>    
	<dependency>
     <groupId>com.github.xiaoymin</groupId>
     <artifactId>knife4j-openapi3-spring-boot-starter</artifactId>
     <version>4.1.0</version>
  </dependency>
</dependencies>
```

### swagger config

```java
@Configuration
public class Swagger3Config {
    @Bean
    public GlobalOpenApiCustomizer orderGlobalOpenApiCustomizer() {
        return openApi -> {
            Info info = openApi.getInfo();
            // 可以覆写信息
            info.title("API");
            info.version("1.0");
        };
    }

    @Bean
    public GroupedOpenApi opcenterApi() {
        String[] packagedToMatch = {"com.storyxc.controller.wallpaper"};
        return GroupedOpenApi.builder().group("wallpaper")
                // token header
                .addOperationCustomizer(((operation, handlerMethod) -> operation.addParametersItem(
                        new HeaderParameter()
                                .name("token")
                                .description("token")
                                .required(true)
                                .schema(new io.swagger.v3.oas.models.media.StringSchema())
                                .allowEmptyValue(false)
                )))
                .packagesToScan(packagedToMatch).build();
    }

    @Bean
    public GroupedOpenApi adminApi() {
        return GroupedOpenApi.builder()
                .group("admin")
                .packagesToScan("com.storyxc.controller.admin")
                .build();
    }

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("story")
                        .version("1.0")
                        .description("API服务")
                        .termsOfService("https://storyxc.com")
                        .license(new License().name("GPLv3")
                                .url("https://www.gnu.org/licenses/gpl-3.0.html"))
                        .contact(new Contact().name("storyxc").email("storyxc@163.cn").url("https://storyxc.com"))
                        .summary("API服务")
                );
    }
}
```

### WebMvcConfig

```java
@Configuration
@RequiredArgsConstructor
public class WebMvcConfiguration implements WebMvcConfigurer {
    private final TokenInterceptor tokenInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
          .allowedOriginPatterns("*")
          .allowedMethods("*")
          .allowCredentials(true)
          .maxAge(3600);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        String[] ignore = {
                "/doc.html**",
                "/webjars/js/**",
                "/webjars/css/**",
                "/swagger-ui/**",
                "/swagger-resources/**",
                "/v3/**"
        };
        registry.addInterceptor(tokenInterceptor).addPathPatterns("/**").excludePathPatterns(ignore);
    }
}
```

### application.yaml

```yml
springdoc:
  api-docs:
    enabled: true

knife4j:
  enable: true #增强模式
  production: false #是否生产，生产会关闭knife4j 需要开启增强模式生效
  setting:
    swagger-model-name: 模型
  documents:
    - name: 项目文档
      locations: classpath:doc/*
      group: wallpaper
    - name: sql
      locations: classpath:sql/*
      group: sql
```

### OpenApi3注解

| Swagger3                                                     | 注解说明                                              |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| @Tag(name = “接口类描述”)                                    | Controller 类                                         |
| @Operation(summary =“接口方法描述”)                          | Controller 方法                                       |
| @Parameters                                                  | Controller 方法                                       |
| @Parameter(description=“参数描述”)                           | Controller 方法上 @Parameters 里Controller 方法的参数 |
| @Parameter(hidden = true) 、@Operation(hidden = true)@Hidden | 排除或隐藏api                                         |
| @Schema                                                      | DTO实体DTO实体属性                                    |
