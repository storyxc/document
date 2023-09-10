# Mybatis Generator配置

> 1. 仓库地址:https://github.com/mybatis/generator
> 2. 官方文档:http://www.mybatis.org/generator/index.html

mbg逆向工程能快速生成实体类和mapper文件以及xml，提升开发效率。记录下不同持久层框架对应的mbg配置备忘。



- mbg的context标签可以自定义targetRuntime，具体的区别可以在http://mybatis.org/generator/quickstart.html#target-runtime-information-and-samples查看。MyBatis3，生成的代码量比较大，会有byExample和selective相关的代码生成。MyBatis3Simple生成的代码量比较小，不会有byExample和selective方法生成。

- 常用运行方式（还包含 ant、命令行、eclipse）

  - java代码
  - maven plugin

- maven依赖

  ```xml
  <dependency>
  			<groupId>org.mybatis.generator</groupId>
  			<artifactId>mybatis-generator-core</artifactId>
  			<version>1.3.5</version>
  </dependency>
  <dependency>
         <groupId>mysql</groupId>
         <artifactId>mysql-connector-java</artifactId>
         <version>8.0.16</version>
  </dependency>
  ```

  使用maven插件时

  ```xml
  <build>
          <plugins>
              <plugin>
                  <groupId>org.mybatis.generator</groupId>
                  <artifactId>mybatis-generator-maven-plugin</artifactId>
                  <version>1.3.5</version>
                  <configuration>
                      <!-- 在控制台打印执行日志 -->
                      <verbose>true</verbose>
                      <!-- 重复生成时会覆盖之前的文件-->
                      <overwrite>true</overwrite>
                   <configurationFile>src/main/resources/generatorConfig.xml</configurationFile>
                  </configuration>
                  <dependencies>
                      <dependency>
                          <groupId>mysql</groupId>
                          <artifactId>mysql-connector-java</artifactId>
                          <version>8.0.16</version>
                      </dependency>
                  </dependencies>
              </plugin>
          </plugins>
      </build>
  ```

  

## 通用mapper

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>

    <context id="Mysql" targetRuntime="MyBatis3Simple"
             defaultModelType="flat">

        <!--property*,-->
        <property name="beginningDelimiter" value="`"/>
        <property name="endingDelimiter" value="`"/>

        <!--plugin*,-->
        <!-- 为继承的BaseMapper接口添加对应的实现类 -->
        <plugin type="tk.mybatis.mapper.generator.MapperPlugin">
            <property name="mappers" value="cn.xxx.CustomBaseMapper"/>
        </plugin>

        <!--commentGenerator?,-->
        <!--<commentGenerator type="mybatis.generator.MyCommentGenerator"></commentGenerator>-->

        <!--jdbcConnection,-->
        <jdbcConnection driverClass="com.mysql.jdbc.Driver"
                        connectionURL="jdbc:mysql://xxx.xxx.xxx/xxx?autoReconnect=true&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;zeroDateTimeBehavior=convertToNull&amp;tinyInt1isBit=false&amp;useSSL=false"
                        userId=""
                        password="">
        </jdbcConnection>

        <!--javaTypeResolver?, 自定义jdbcType和javaType的映射关系，比如默认的TINYINT会对应Java的Byte类型，如果我们想让TINYINT对应JavaType为Integer就需要在解析类中自定义，这种方式适合源码方式运行mbg，使用maven plugin会比较麻烦-->
        <javaTypeResolver type="mybatis.generator.MyJavaTypeResolver"></javaTypeResolver>

        <!--javaModelGenerator,-->
        <javaModelGenerator targetPackage="cn.xxx.dao.entity"
                            targetProject="/Users/story/project/xx/src/main/java">
            <!--<property name="rootClass" value="xx.BaseEntity"/>  entity会继承的类-->
        </javaModelGenerator>

        <!--sqlMapGenerator?,-->
        <sqlMapGenerator targetPackage="mapper"
                         targetProject="/Users/story/project/xx/src/main/resources"/>

        <!--javaClientGenerator?,-->
        <javaClientGenerator targetPackage="cn.superdesk.app.wechat.dao.mapper"
                             targetProject="/Users/story/project/xxx/src/main/java"
                             type="XMLMAPPER"/>

        <!--table+-->
        <table tableName="tb_xx" domainObjectName="XxEntity">
            <generatedKey column="id" sqlStatement="Mysql" identity="true"/>
        </table>
        
    </context>

</generatorConfiguration>
```

- 生成的Mapper统一继承的接口

```java
public interface CustomBaseMapper<T> extends tk.mybatis.mapper.common.BaseMapper<T>, MySqlMapper<T> {

}
```

- 自定义类型解析器

```java
public class MyJavaTypeResolver implements JavaTypeResolver {

    protected List<String> warnings;

    protected Properties properties;

    protected Context context;

    protected boolean forceBigDecimals;

    protected Map<Integer, JavaTypeResolverDefaultImpl.JdbcTypeInformation> typeMap;

    public MyJavaTypeResolver() {
        super();
        properties = new Properties();
        typeMap = new HashMap<Integer, JavaTypeResolverDefaultImpl.JdbcTypeInformation>();

        typeMap.put(Types.ARRAY, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("ARRAY", //$NON-NLS-1$
                new FullyQualifiedJavaType(Object.class.getName())));
        typeMap.put(Types.BIGINT, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("BIGINT", //$NON-NLS-1$
                new FullyQualifiedJavaType(Long.class.getName())));
        typeMap.put(Types.BINARY, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("BINARY", //$NON-NLS-1$
                new FullyQualifiedJavaType("byte[]"))); //$NON-NLS-1$
        typeMap.put(Types.BIT, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("BIT", //$NON-NLS-1$
                new FullyQualifiedJavaType(Boolean.class.getName())));
        typeMap.put(Types.BLOB, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("BLOB", //$NON-NLS-1$
                new FullyQualifiedJavaType("byte[]"))); //$NON-NLS-1$
        typeMap.put(Types.BOOLEAN, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("BOOLEAN", //$NON-NLS-1$
                new FullyQualifiedJavaType(Boolean.class.getName())));
        typeMap.put(Types.CHAR, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("CHAR", //$NON-NLS-1$
                new FullyQualifiedJavaType(String.class.getName())));
        typeMap.put(Types.CLOB, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("CLOB", //$NON-NLS-1$
                new FullyQualifiedJavaType(String.class.getName())));
        typeMap.put(Types.DATALINK, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("DATALINK", //$NON-NLS-1$
                new FullyQualifiedJavaType(Object.class.getName())));
        typeMap.put(Types.DATE, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("DATE", //$NON-NLS-1$
                new FullyQualifiedJavaType(Date.class.getName())));
        typeMap.put(Types.DISTINCT, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("DISTINCT", //$NON-NLS-1$
                new FullyQualifiedJavaType(Object.class.getName())));
        typeMap.put(Types.DOUBLE, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("DOUBLE", //$NON-NLS-1$
                new FullyQualifiedJavaType(Double.class.getName())));
        typeMap.put(Types.FLOAT, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("FLOAT", //$NON-NLS-1$
                new FullyQualifiedJavaType(Double.class.getName())));
        typeMap.put(Types.INTEGER, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("INTEGER", //$NON-NLS-1$
                new FullyQualifiedJavaType(Integer.class.getName())));
        typeMap.put(Types.JAVA_OBJECT, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("JAVA_OBJECT", //$NON-NLS-1$
                new FullyQualifiedJavaType(Object.class.getName())));
        typeMap.put(Jdbc4Types.LONGNVARCHAR, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("LONGNVARCHAR", //$NON-NLS-1$
                new FullyQualifiedJavaType(String.class.getName())));
        typeMap.put(Types.LONGVARBINARY, new JavaTypeResolverDefaultImpl.JdbcTypeInformation(
                "LONGVARBINARY", //$NON-NLS-1$
                new FullyQualifiedJavaType("byte[]"))); //$NON-NLS-1$
        typeMap.put(Types.LONGVARCHAR, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("LONGVARCHAR", //$NON-NLS-1$
                new FullyQualifiedJavaType(String.class.getName())));
        typeMap.put(Jdbc4Types.NCHAR, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("NCHAR", //$NON-NLS-1$
                new FullyQualifiedJavaType(String.class.getName())));
        typeMap.put(Jdbc4Types.NCLOB, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("NCLOB", //$NON-NLS-1$
                new FullyQualifiedJavaType(String.class.getName())));
        typeMap.put(Jdbc4Types.NVARCHAR, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("NVARCHAR", //$NON-NLS-1$
                new FullyQualifiedJavaType(String.class.getName())));
        typeMap.put(Types.NULL, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("NULL", //$NON-NLS-1$
                new FullyQualifiedJavaType(Object.class.getName())));
        typeMap.put(Types.OTHER, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("OTHER", //$NON-NLS-1$
                new FullyQualifiedJavaType(Object.class.getName())));
        typeMap.put(Types.REAL, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("REAL", //$NON-NLS-1$
                new FullyQualifiedJavaType(Float.class.getName())));
        typeMap.put(Types.REF, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("REF", //$NON-NLS-1$
                new FullyQualifiedJavaType(Object.class.getName())));
        typeMap.put(Types.SMALLINT, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("SMALLINT", //$NON-NLS-1$
                new FullyQualifiedJavaType(Integer.class.getName())));
        typeMap.put(Types.STRUCT, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("STRUCT", //$NON-NLS-1$
                new FullyQualifiedJavaType(Object.class.getName())));
        typeMap.put(Types.TIME, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("TIME", //$NON-NLS-1$
                new FullyQualifiedJavaType(Date.class.getName())));
        typeMap.put(Types.TIMESTAMP, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("TIMESTAMP", //$NON-NLS-1$
                new FullyQualifiedJavaType(Date.class.getName())));

        typeMap.put(Types.TINYINT, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("TINYINT", //$NON-NLS-1$
                new FullyQualifiedJavaType(Integer.class.getName())));

        typeMap.put(Types.VARBINARY, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("VARBINARY", //$NON-NLS-1$
                new FullyQualifiedJavaType("byte[]"))); //$NON-NLS-1$
        typeMap.put(Types.VARCHAR, new JavaTypeResolverDefaultImpl.JdbcTypeInformation("VARCHAR", //$NON-NLS-1$
                new FullyQualifiedJavaType(String.class.getName())));

    }

    @Override
    public void addConfigurationProperties(Properties properties) {
        this.properties.putAll(properties);
        forceBigDecimals = StringUtility.isTrue(properties.getProperty(PropertyRegistry.TYPE_RESOLVER_FORCE_BIG_DECIMALS));
    }

    @Override
    public FullyQualifiedJavaType calculateJavaType(
            IntrospectedColumn introspectedColumn) {
        FullyQualifiedJavaType answer;
        JavaTypeResolverDefaultImpl.JdbcTypeInformation jdbcTypeInformation = typeMap
                .get(introspectedColumn.getJdbcType());

        if (jdbcTypeInformation == null) {
            switch (introspectedColumn.getJdbcType()) {
                case Types.DECIMAL:
                case Types.NUMERIC:
                    if (introspectedColumn.getScale() > 0
                            || introspectedColumn.getLength() > 18
                            || forceBigDecimals) {
                        answer = new FullyQualifiedJavaType(BigDecimal.class
                                .getName());
                    } else if (introspectedColumn.getLength() > 9) {
                        answer = new FullyQualifiedJavaType(Long.class.getName());
                    } else if (introspectedColumn.getLength() > 4) {
                        answer = new FullyQualifiedJavaType(Integer.class.getName());
                    } else {
                        answer = new FullyQualifiedJavaType(Short.class.getName());
                    }
                    break;

                default:
                    answer = null;
                    break;
            }
        } else {
            answer = jdbcTypeInformation.getFullyQualifiedJavaType();
        }

        return answer;
    }

    @Override
    public String calculateJdbcTypeName(IntrospectedColumn introspectedColumn) {
        String answer;
        JavaTypeResolverDefaultImpl.JdbcTypeInformation jdbcTypeInformation = typeMap
                .get(introspectedColumn.getJdbcType());

        if (jdbcTypeInformation == null) {
            switch (introspectedColumn.getJdbcType()) {
                case Types.DECIMAL:
                    answer = "DECIMAL"; //$NON-NLS-1$
                    break;
                case Types.NUMERIC:
                    answer = "NUMERIC"; //$NON-NLS-1$
                    break;
                default:
                    answer = null;
                    break;
            }
        } else {
            answer = jdbcTypeInformation.getJdbcTypeName();
        }

        return answer;
    }

    @Override
    public void setWarnings(List<String> warnings) {
        this.warnings = warnings;
    }

    @Override
    public void setContext(Context context) {
        this.context = context;
    }

    public static class JdbcTypeInformation {
        private String jdbcTypeName;

        private FullyQualifiedJavaType fullyQualifiedJavaType;

        public JdbcTypeInformation(String jdbcTypeName,
                                   FullyQualifiedJavaType fullyQualifiedJavaType) {
            this.jdbcTypeName = jdbcTypeName;
            this.fullyQualifiedJavaType = fullyQualifiedJavaType;
        }

        public String getJdbcTypeName() {
            return jdbcTypeName;
        }

        public FullyQualifiedJavaType getFullyQualifiedJavaType() {
            return fullyQualifiedJavaType;
        }
    }
}
```

- 入口方法

```java
public class MyBatisGeneratorTool {
    public static void main(String[] args) {

        URL resource = Thread.currentThread().getContextClassLoader().getResource("");

        System.out.println(resource.getPath());

        List<String>        warnings   = new ArrayList<String>();
        boolean             overwrite  = true;
        File                configFile = new File(resource.getPath() + "../../src/test/resources/generator/generatorConfig.xml");
        ConfigurationParser cp         = new ConfigurationParser(warnings);
        Configuration       config     = null;

        try {
            config = cp.parseConfiguration(configFile);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (XMLParserException e) {
            e.printStackTrace();
        }

        DefaultShellCallback callback         = new DefaultShellCallback(overwrite);
        MyBatisGenerator     myBatisGenerator = null;

        try {
            myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
        } catch (InvalidConfigurationException e) {
            e.printStackTrace();
        }

        try {
            myBatisGenerator.generate(null);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

![image-20220409210512601](https://storyxc.com/images/blog/image-20220409210512601.png)

## mybatis-plus

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!-- context 是逆向工程的主要配置信息 -->
    <!-- id：起个名字 -->
    <!-- targetRuntime：设置生成的文件适用于那个 mybatis 版本 -->
    <context id="default" targetRuntime="MyBatis3">
        <!--optional,指在创建class时，对注释进行控制-->
        <commentGenerator>
            <property name="suppressDate" value="true"/>
            <!-- 是否去除自动生成的注释 true：是 ： false:否 -->
            <property name="suppressAllComments" value="true"/>
        </commentGenerator>
        <!--jdbc的数据库连接 wg_insert 为数据库名字-->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://xxx/xx?autoReconnect=true&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;zeroDateTimeBehavior=convertToNull&amp;tinyInt1isBit=false&amp;useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;nullCatalogMeansCurrent=true"
                        userId=""
                        password="">
        </jdbcConnection>
        <!--非必须，类型处理器，在数据库类型和java类型之间的转换控制-->
        <javaTypeResolver>
            <!-- 默认情况下数据库中的 decimal，bigInt 在 Java 对应是 sql 下的 BigDecimal 类 -->
            <!-- 不是 double 和 long 类型 -->
            <!-- 使用常用的基本类型代替 sql 包下的引用类型 -->
            <property name="forceBigDecimals" value="false"/>
        </javaTypeResolver>
        <!-- targetPackage：生成的实体类所在的包 -->
        <!-- targetProject：生成的实体类所在的硬盘位置 -->
        <javaModelGenerator targetPackage="xxx"
                            targetProject="/Users/story/project/xxx/src/main/java">
            <!-- 是否允许子包 -->
            <property name="enableSubPackages" value="false"/>
            <!-- 是否对modal添加构造函数 -->
<!--            <property name="constructorBased" value="true"/>-->
            <!-- 是否清理从数据库中查询出的字符串左右两边的空白字符 -->
<!--            <property name="trimStrings" value="true"/>-->
            <!-- 建立modal对象是否不可改变 即生成的modal对象不会有setter方法，只有构造方法 -->
<!--            <property name="immutable" value="false"/>-->
        </javaModelGenerator>
        <!-- targetPackage 和 targetProject：生成的 mapper 文件的包和位置 -->
        <sqlMapGenerator targetPackage="xx"
                         targetProject="/Users/story/project/xx/src/main/resources">
            <!-- 针对数据库的一个配置，是否把 schema 作为字包名 -->
            <property name="enableSubPackages" value="false"/>
        </sqlMapGenerator>
        <!-- targetPackage 和 targetProject：生成的 interface 文件的包和位置 -->
        <javaClientGenerator type="XMLMAPPER"
                             targetPackage="xx" targetProject="/Users/story/project/xxx/src/main/java">
            <!-- 针对 oracle 数据库的一个配置，是否把 schema 作为字包名 -->
            <property name="enableSubPackages" value="false"/>
        </javaClientGenerator>
        <!-- tableName是数据库中的表名，domainObjectName是生成的JAVA模型名，后面的参数不用改，要生成更多的表就在下面继续加table标签 -->
        <table tableName="xxx" domainObjectName="XxxEntity">
        </table>
    </context>
</generatorConfiguration>
```

![image-20220409211128783](https://storyxc.com/images/blog/image-20220409211128783.png)