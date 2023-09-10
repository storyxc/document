# Spring配置和条件化组件加载注解

- `@ConditionalOnProperty`：该注解用于根据配置属性的值来决定是否启用或禁用特定的配置项。通过指定属性名称和值，可以在配置文件中动态地控制应用程序的行为。
- `@ConditionalOnClass`：该注解在类路径中存在特定的类时才会生效。它可以用来根据是否引入了某个类来决定是否加载或配置相关的组件。
- `@EnableConfigurationProperties`：该注解用于启用特定的配置属性绑定功能。它通常与 @ConfigurationProperties 注解一起使用，用于将配置文件中的属性值绑定到对应的 Java 对象中。
- `@ConfigurationProperties`：将配置文件中的属性值映射到指定的Java类。
- `@ConditionalOnBean`：根据指定的bean的存在与否，有条件地加载一个组件。
- `@Conditional`：根据指定的条件，有条件地加载一个组件。可以使用自定义条件类。
- `@ConditionalOnMissingBean`：如果指定的bean不存在，则有条件地加载一个组件。
- `@ConditionalOnMissingClass`：如果类路径中缺少指定的类，则有条件地加载一个组件。
- `@AutoConfigureBefore`：用于指定某个自动配置类在另一个指定的自动配置类之前生效。它可以控制自动配置类的加载顺序，确保特定的自动配置类在其他自动配置之前被应用。

- `@ConditionalOnExpression`：根据指定的SpEL表达式，有条件地加载一个组件。
- `@ConditionalOnWebApplication`：根据应用程序是否为Web应用程序，有条件地加载一个组件。
- `@ConditionalOnResource`：根据指定资源的存在与否，有条件地加载一个组件。