# 使用spring validation进行参数校验

后台的参数校验如果全写在业务代码里会导致代码很臃肿，此时可以引入Spring Validation来进行参数校验，还可以自定义校验规则，自定义参数校验异常等





## 简单使用

1. 项目引入spring-boot-starter-web依赖

```xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-validator</artifactId>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

2. 在需要校验的对象前，加上@Validated注解，在对象字段上使用具体校验规则的注解即可。如果是嵌套对象，则在嵌套的对象上使用@Valid注解表明需要嵌套校验

   ```java
   public String receive(@RequestBody @Validated StatementDto dto, BindingResult result) {
   		if (result.hasErrors()) {
   			throw new ParameterNotValidException(result);
   		}
   		return "test";
   	}
   ```

   ```java
   public class QchjcCustomerStatementDto implements Serializable {
   
   	@NotEmpty(message = "不能为空")
   	@Valid
   	private List<OrderDto> order;
   
   	@DecimalMin(value = "0",message = "金额需大于等于0.00")
   	private BigDecimal amount;
   }
   ```

   :::tip

   @Validated注解标记的参数会被spring进行校验，校验的信息会存放到其后的BindingResult中，如果有多个参数需要校验可以采用如下形式：(@Validated Person person, BindingResult fooBindingResult ，@Validated Bar bar, BindingResult barBindingResult);即一个校验类对应一个校验结果。

   :::

## 常用校验

1. JSR303/JSR-349: JSR303是一项标准,只提供规范不提供实现，规定一些校验规范即校验注解，如@Null，@NotNull，@Pattern，位于javax.validation.constraints包下。JSR-349是其的升级版本，添加了一些新特性。

   1. @Null 被注释的元素必须为null

   2. @NotNull 被注释的元素必须不为null

   3. @AssertTrue 被注释的元素必须为true

   4. @AssertFalse 被注释的元素必须为false

   5. @Min(value) 被注释的元素必须是一个数字，其值必须大于等于指定的最小值

   6. @Max(value) 被注释的元素必须是一个数字，其值必须小于等于指定的最大值

   7. @DecimalMin(value) 被注释的元素必须是一个数字，其值必须大于等于指定

      最小值

   8. @DecimalMax(value) 被注释的元素必须是一个数字，其值必须小于等于指定

      最大值

   9. @Size(max, min) 被注释的元素的大小必须在指定的范围内

   10. @Digits (integer, fraction) 被注释的元素必须是一个数字，其值必须在可接受的范围内

   11. @Past 被注释的元素必须是一个过去的日期

   12. @Future 被注释的元素必须是一个将来的日期

   13. @Pattern(value) 被注释的元素必须符合指定的正则表达式

2. hibernate validation：hibernate validation是对这个规范的实现，并增加了一些其他校验注解，如@Email，@Length，@Range等等
   1. @Email 被注释的元素必须是电子邮箱地址
   2. @Length 被注释的字符串的大小必须在指定的范围内
   3. @NotEmpty 被注释的字符串的必须非空
   4. @Range 被注释的元素必须在合适的范围内
3. spring validation：spring validation对hibernate validation进行了二次封装，在springmvc模块中添加了自动校验，并将校验信息封装进了特定的类中
   

## 统一异常处理

如果方法参数中不声明BindingResult，那么spring校验不通过后会直接抛出BindException，体验很不好。因此我们可以进行自定义异常处理。

- 自定义异常

```java
public class ParameterNotValidException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    private BindingResult bindingResult;

    public ParameterNotValidException(BindingResult bindingResult) {
        this.bindingResult = bindingResult;
    }

    public BindingResult getBindingResult() {
        return bindingResult;
    }

    @Override
    public String getMessage() {
        return "参数校验不通过";
    }
}
```

- 统一异常处理

```java
@ControllerAdvice
public class ExceptionHandler {
    /**
     * 方法参数校验异常处理
     */
    @ExceptionHandler(ParameterNotValidException.class)
    @ResponseBody
    public O handleMethodArgumentNotValidException(ParameterNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        FieldError fieldError = bindingResult.getFieldError();
        String field = fieldError.getField();
        String defaultMessage = fieldError.getDefaultMessage();
        O o = new O();
        o.setResultCode(500);
        o.setSuccess(false);
        o.setResultMessage(field + ":" + defaultMessage);
        return o;
    }
}
```

## 自定义校验规则

例如，我们需要新增一个校验规则，数字类型必须大于0

- 新建校验注解

  ```java
  @Target(ElementType.FIELD)
  @Retention(RetentionPolicy.RUNTIME)
  @Constraint(validatedBy = GreaterThanZeroValidator.class)//标注校验由哪些类执行，可以是多个
  public @interface GreaterThanZero {
      String message();
  
      Class<?>[] groups() default {};//在不同接口中参数可能校验的规则不同，可以创建不同的组，并在校验规则标记组，在controller层也标记组，这样就可以不同接口实现不同校验规则
  
      Class<?>[] payload() default {};
  }
  ```

  > 一个标注(annotation) 是通过`@interface`关键字来定义的. 这个标注中的属性是声明成类似方法的样式的. 根据Bean Validation API 规范的要求
  >
  > 
  >
  > - message属性, 这个属性被用来定义默认得消息模版, 当这个约束条件被验证失败的时候,通过此属性来输出错误信息.
  >
  > - 
  >
  >   groups 属性, 用于指定这个约束条件属于哪(些)个校验组.这个的默认值必须是`Class<?>`类型到空到数组.
  >
  > - `payload` 属性, Bean Validation API 的使用者可以通过此属性来给约束条件指定严重级别. 这个属性并不被API自身所使用.
  >
  >   ```java
  >   public class Severity {
  >       public static class Info extends Payload {};
  >       public static class Error extends Payload {};
  >   }
  >   
  >   public class ContactDetails {
  >       @NotNull(message="Name is mandatory", payload=Severity.Error.class)
  >       private String name;
  >   
  >       @NotNull(message="Phone number not specified, but not mandatory", payload=Severity.Info.class)
  >       private String phoneNumber;
  >   
  >       // ...
  >   }
  >   ```
  >
  >   这样, 在校验完一个`ContactDetails` 的示例之后, 你就可以通过调用`ConstraintViolation.getConstraintDescriptor().getPayload()`来得到之前指定到错误级别了,并且可以根据这个信息来决定接下来到行为.

- 校验规则类

  ```java
  public class GreaterThanZeroValidator implements ConstraintValidator<GreaterThanZero, Object> {
      @Override
      public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
          if (o == null) {
              return false;
          }
          if (o instanceof Number) {
              return ((Number) o).intValue() > 0;
          }
  
          return false;
      }
  }
  ```

  - `ConstraintValidator`定义了两个泛型参数, 第一个是这个校验器所服务到标注类型, 第二个这个校验器所支持到被校验元素到类型.如果一个约束标注支持多种类型到被校验元素的话, 那么需要为每个所支持的类型定义一个`ConstraintValidator`,并且注册到约束标注中.这个验证器的实现就很平常了
  -  `initialize()` 方法传进来一个所要验证的标注类型的实例
  - `isValid()`是实现真正的校验逻辑的地方