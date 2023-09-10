# 自定义MybatisPlusGenerator



## 入口类

```java
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.core.toolkit.StringPool;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.baomidou.mybatisplus.generator.config.rules.DateType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xc
 * @description
 * @date 2023/5/19 09:20
 */
public class MybatisPlusCodeGenerator {

    private static final String projectPath = System.getProperty("user.dir");

    public static void main(String[] args) {
        //====================配置变量区域=====================//
        String author = "storyxc";// 生成文件的作者，可以不填
        String rootPackage = "com.storyxc";// 生成的entity、controller、service等包所在的公共上一级包路径全限定名
        String modelModuleName = "storyxc-model";
        String serviceModuleName = "storyxc-web";
        String controllerModuleName = "storyxc-web";
        // 数据库配置
        String url="jdbc:mysql://127.0.0.1/story?useUnicode=true&characterEncoding=UTF-8&useSSL=false";
        String driverClassName = "com.mysql.cj.jdbc.Driver";// 或者com.mysql.cj.jdbc.Driver
        String username = "root";
        String password = "root";

        String[] tableNames = new String[]{""};
        String pkgName = "";
        //====================配置变量区域=====================//
        String[] tablePrefix = new String[]{""};
        // 代码生成器
        AutoGenerator generator = new AutoGenerator();
        // 全局配置
        GlobalConfig globalConfig = new GlobalConfig();
        globalConfig.setOutputDir(projectPath + "/" + modelModuleName + "/src/main/java");// 生成文件的输出目录
        globalConfig.setFileOverride(false);// 是否覆盖已有文件，默认false
        globalConfig.setOpen(false);// 是否打开输出目录
        globalConfig.setAuthor(author);
        globalConfig.setServiceName("%sService");// 去掉service接口的首字母I
        globalConfig.setBaseResultMap(true);// 开启 BaseResultMap
        globalConfig.setDateType(DateType.ONLY_DATE);// 只使用 java.util.date代替
        globalConfig.setIdType(IdType.ASSIGN_ID);// 分配ID (主键类型为number或string）
        generator.setGlobalConfig(globalConfig);

        // 数据源配置
        DataSourceConfig dataSourceConfig = new DataSourceConfig();
        dataSourceConfig.setUrl(url);
        dataSourceConfig.setDbType(DbType.MYSQL);// 数据库类型
        dataSourceConfig.setDriverName(driverClassName);
        dataSourceConfig.setUsername(username);
        dataSourceConfig.setPassword(password);
        generator.setDataSource(dataSourceConfig);

        // 包配置
        PackageConfig packageConfig = new PackageConfig();
        //packageConfig.setModuleName(scanner("模块名"));
        packageConfig.setParent(rootPackage);
        packageConfig.setController("controller" + (StrUtil.isNotBlank(pkgName) ? "." + pkgName : ""));
        packageConfig.setService("service" + (StrUtil.isNotBlank(pkgName) ? "." + pkgName : ""));
        packageConfig.setServiceImpl("service" + (StrUtil.isNotBlank(pkgName) ? "." + pkgName + ".impl" : ".impl"));
        packageConfig.setEntity("dao.entity" + (StrUtil.isNotBlank(pkgName) ? "." + pkgName : ""));
        packageConfig.setMapper("dao.mapper" + (StrUtil.isNotBlank(pkgName) ? "." + pkgName : ""));

        //packageConfig.setXml("dao.mapper.xml");
        generator.setPackageInfo(packageConfig);

        // 注意：模板引擎在mybatisplus依赖中的templates目录下，可以依照此默认模板进行自定义

        // 策略配置：配置根据哪张表生成代码
        StrategyConfig strategy = new StrategyConfig();
        strategy.setInclude(tableNames);// 表名，多个英文逗号分割（与exclude二选一配置）
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        // strategy.setSuperEntityClass("你自己的父类实体,没有就不用设置!");
        strategy.setEntityLombokModel(true);// lombok模型，@Accessors(chain = true)setter链式操作
        strategy.setRestControllerStyle(true);// controller生成@RestController
        strategy.setEntityTableFieldAnnotationEnable(true);// 是否生成实体时，生成字段注解
        // strategy.setEntityColumnConstant(true);// 是否生成字段常量（默认 false）
        strategy.setTablePrefix(tablePrefix);// 生成实体时去掉表前缀

        TemplateConfig templateConfig = new TemplateConfig();
        templateConfig.setController(null);
        templateConfig.setService(null);
        templateConfig.setServiceImpl(null);
        templateConfig.setXml(null);
        templateConfig.setMapper(null);
        templateConfig.setEntity(null);
        generator.setTemplate(templateConfig);


        generator.setStrategy(strategy);
        generator.setTemplateEngine(new FreemarkerTemplateEngine());

        /**
         * 自定义输出路径
         */
        // controller
        List<FileOutConfig> focList = new ArrayList<>();

        // mapper.xml
        focList.add(new FileOutConfig("/templates/story-entity.java.ftl") {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // 自定义输出文件名 ， 如果你 Entity 设置了前后缀、此处注意 xml 的名称会跟着发生变化！！
                return projectPath + "/" + modelModuleName + "/src/main/java/" + rootPackage.replace(".", "/") + "/dao/entity/" + pkgName + "/" + tableInfo.getEntityName() + StringPool.DOT_JAVA;
            }
        });

        focList.add(new FileOutConfig("/templates/story-controller.java.ftl") {
            @Override
            public String outputFile(TableInfo tableInfo) {
                return projectPath + "/" + controllerModuleName + "/src/main/java/" + rootPackage.replace(".", "/") + "/controller/" + pkgName + "/" + tableInfo.getEntityName() + "Controller" + StringPool.DOT_JAVA;
            }
        });
        // service
        focList.add(new FileOutConfig("/templates/service.java.ftl") {
            @Override
            public String outputFile(TableInfo tableInfo) {
                return projectPath + "/" + serviceModuleName + "/src/main/java/" + rootPackage.replace(".", "/") + "/service/" + pkgName + "/" +  tableInfo.getEntityName() + "Service" + StringPool.DOT_JAVA;
            }
        });

        // serviceImpl
        focList.add(new FileOutConfig("/templates/story-serviceImpl.java.ftl") {
            @Override
            public String outputFile(TableInfo tableInfo) {
                return projectPath + "/" + serviceModuleName + "/src/main/java/" + rootPackage.replace(".", "/") + "/service/" + pkgName + "/impl/" + tableInfo.getEntityName() + "ServiceImpl" + StringPool.DOT_JAVA;
            }
        });

        // mapper.java
        // service
        focList.add(new FileOutConfig("/templates/story-mapper.java.ftl") {
            @Override
            public String outputFile(TableInfo tableInfo) {
                return projectPath + "/" + modelModuleName + "/src/main/java/" + rootPackage.replace(".", "/") + "/dao/mapper/" + pkgName + "/" +  tableInfo.getEntityName() + "Mapper" + StringPool.DOT_JAVA;
            }
        });

        // mapper.xml
        focList.add(new FileOutConfig("/templates/mapper.xml.ftl") {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // 自定义输出文件名 ， 如果你 Entity 设置了前后缀、此处注意 xml 的名称会跟着发生变化！！
                return projectPath + "/" + modelModuleName + "/src/main/resources/mapper/" + pkgName + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });

        InjectionConfig injectionConfig = new InjectionConfig() {
            @Override
            public void initMap() { }
        };
        injectionConfig.setFileOutConfigList(focList);

        generator.setCfg(injectionConfig);
        generator.execute();
    }
}
```

## 模板

:::warning

模板不能使用IDE格式化，否则生成的文件缩进会有问题

:::

### story-entity.java.ftl

```xml
package ${package.Entity};

<#list table.importPackages as pkg>
import ${pkg};
</#list>
<#if swagger2>
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
</#if>
<#if entityLombokModel>
import lombok.Data;
import lombok.EqualsAndHashCode;
    <#if chainModel>
import lombok.experimental.Accessors;
    </#if>
</#if>
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.experimental.FieldNameConstants;

/**
 * ${table.comment!}
 *
 * @author ${author}
 * @since ${date}
 */
<#if entityLombokModel>
@Data
    <#if superEntityClass??>
@EqualsAndHashCode(callSuper = true)
    <#else>
@EqualsAndHashCode(callSuper = false)
    </#if>
    <#if chainModel>
@Accessors(chain = true)
    </#if>
</#if>
<#if table.convert>
@TableName("${table.name}")
</#if>
<#if swagger2>
@ApiModel(value="${entity}对象", description="${table.comment!}")
</#if>
@FieldNameConstants
<#if superEntityClass??>
public class ${entity} extends ${superEntityClass}<#if activeRecord><${entity}></#if> {
<#elseif activeRecord>
public class ${entity} extends Model<${entity}> {
<#else>
public class ${entity} implements Serializable {
</#if>

<#if entitySerialVersionUID>
    private static final long serialVersionUID = 1L;
</#if>
<#-- ----------  BEGIN 字段循环遍历  ---------->
<#list table.fields as field>
    <#if field.keyFlag>
        <#assign keyPropertyName="${field.propertyName}"/>
    </#if>

    @Schema(description = "${field.comment}")
    <#if field.keyFlag>
        <#-- 主键 -->
        <#if field.keyIdentityFlag>
    @TableId(value = "${field.annotationColumnName}", type = IdType.AUTO)
        <#elseif idType??>
    @TableId(value = "${field.annotationColumnName}", type = IdType.${idType})
        <#elseif field.convert>
    @TableId("${field.annotationColumnName}")
        </#if>
        <#-- 普通字段 -->
    <#elseif field.fill??>
    <#-- -----   存在字段填充设置   ----->
        <#if field.convert>
    @TableField(value = "${field.annotationColumnName}", fill = FieldFill.${field.fill})
        <#else>
    @TableField(fill = FieldFill.${field.fill})
        </#if>
    <#elseif field.convert>
    @TableField("${field.annotationColumnName}")
    </#if>
    <#-- 乐观锁注解 -->
    <#if (versionFieldName!"") == field.name>
    @Version
    </#if>
    <#-- 逻辑删除注解 -->
    <#if (logicDeleteFieldName!"") == field.name>
    @TableLogic
    </#if>
    private ${field.propertyType} ${field.propertyName};
</#list>
<#------------  END 字段循环遍历  ---------->

<#if !entityLombokModel>
    <#list table.fields as field>
        <#if field.propertyType == "boolean">
            <#assign getprefix="is"/>
        <#else>
            <#assign getprefix="get"/>
        </#if>
    public ${field.propertyType} ${getprefix}${field.capitalName}() {
        return ${field.propertyName};
    }

    <#if chainModel>
    public ${entity} set${field.capitalName}(${field.propertyType} ${field.propertyName}) {
    <#else>
    public void set${field.capitalName}(${field.propertyType} ${field.propertyName}) {
    </#if>
        this.${field.propertyName} = ${field.propertyName};
        <#if chainModel>
        return this;
        </#if>
    }
    </#list>
</#if>

<#if entityColumnConstant>
    <#list table.fields as field>
    public static final String ${field.name?upper_case} = "${field.name}";

    </#list>
</#if>
<#if activeRecord>
    @Override
    protected Serializable pkVal() {
    <#if keyPropertyName??>
        return this.${keyPropertyName};
    <#else>
        return null;
    </#if>
    }

</#if>
<#if !entityLombokModel>
    @Override
    public String toString() {
        return "${entity}{" +
    <#list table.fields as field>
        <#if field_index==0>
            "${field.propertyName}=" + ${field.propertyName} +
        <#else>
            ", ${field.propertyName}=" + ${field.propertyName} +
        </#if>
    </#list>
        "}";
    }
</#if>
}
```

### story-controller.java.ftl

```xml
package ${package.Controller};

import ${package.Service}.${table.serviceName};
import org.springframework.web.bind.annotation.RequestMapping;
<#if restControllerStyle>
import org.springframework.web.bind.annotation.RestController;
<#else>
import org.springframework.stereotype.Controller;
</#if>
<#if superControllerClassPackage??>
import ${superControllerClassPackage};
</#if>
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * ${table.comment!} 前端控制器
 *
 * @author ${author}
 * @since ${date}
 */
@Tag(name = "")
@Slf4j
@RequiredArgsConstructor
<#if restControllerStyle>
@RestController
<#else>
@Controller
</#if>
@RequestMapping("<#if package.ModuleName?? && package.ModuleName != "">/${package.ModuleName}</#if>/<#if controllerMappingHyphenStyle??>${controllerMappingHyphen}<#else>${table.entityPath}</#if>")
<#if kotlin>
class ${table.controllerName}<#if superControllerClass??> : ${superControllerClass}()</#if>
<#else>
<#if superControllerClass??>
public class ${table.controllerName} extends ${superControllerClass} {
<#else>
public class ${table.controllerName} {
</#if>
    private final ${table.serviceName} ${table.serviceName?uncap_first};

}
</#if>
```

### story-serviceImpl.java.ftl

```xml
package ${package.ServiceImpl};

import ${package.Entity}.${entity};
import ${package.Mapper}.${table.mapperName};
import ${package.Service}.${table.serviceName};
import ${superServiceImplClassPackage};
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * ${table.comment!} 服务实现类
 *
 * @author ${author}
 * @since ${date}
 */
@Slf4j
@RequiredArgsConstructor
@Service
<#if kotlin>
open class ${table.serviceImplName} : ${superServiceImplClass}<${table.mapperName}, ${entity}>(), ${table.serviceName} {

}
<#else>
public class ${table.serviceImplName} extends ${superServiceImplClass}<${table.mapperName}, ${entity}> implements ${table.serviceName} {

}
</#if>
```

### story-mapper.java.ftl

```java
package ${package.Mapper};

import ${package.Entity}.${entity};
import ${superMapperClassPackage};
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * ${table.comment!} Mapper 接口
 * </p>
 *
 * @author ${author}
 * @since ${date}
 */
<#if kotlin>
interface ${table.mapperName} : ${superMapperClass}<${entity}>
<#else>
@Mapper
public interface ${table.mapperName} extends ${superMapperClass}<${entity}> {

}
</#if>
```

