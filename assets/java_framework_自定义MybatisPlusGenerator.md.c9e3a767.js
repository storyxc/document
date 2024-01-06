import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.4a66d6f9.js";const F=JSON.parse('{"title":"自定义MybatisPlusGenerator","description":"","frontmatter":{},"headers":[],"relativePath":"java/framework/自定义MybatisPlusGenerator.md","filePath":"java/framework/自定义MybatisPlusGenerator.md","lastUpdated":1704522520000}'),p={name:"java/framework/自定义MybatisPlusGenerator.md"},o=l(`<h1 id="自定义mybatisplusgenerator" tabindex="-1">自定义MybatisPlusGenerator <a class="header-anchor" href="#自定义mybatisplusgenerator" aria-label="Permalink to &quot;自定义MybatisPlusGenerator&quot;">​</a></h1><h2 id="入口类" tabindex="-1">入口类 <a class="header-anchor" href="#入口类" aria-label="Permalink to &quot;入口类&quot;">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> cn.hutool.core.util.StrUtil;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.baomidou.mybatisplus.annotation.DbType;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.baomidou.mybatisplus.annotation.IdType;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.baomidou.mybatisplus.core.toolkit.StringPool;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.baomidou.mybatisplus.generator.AutoGenerator;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.baomidou.mybatisplus.generator.InjectionConfig;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.baomidou.mybatisplus.generator.config.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.baomidou.mybatisplus.generator.config.po.TableInfo;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.baomidou.mybatisplus.generator.config.rules.DateType;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.ArrayList;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.List;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> xc</span></span>
<span class="line"><span style="color:#6A737D;"> * @description</span></span>
<span class="line"><span style="color:#6A737D;"> * @date 2023/5/19 09:20</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MybatisPlusCodeGenerator</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String projectPath </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> System.</span><span style="color:#B392F0;">getProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user.dir&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//====================配置变量区域=====================//</span></span>
<span class="line"><span style="color:#E1E4E8;">        String author </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;storyxc&quot;</span><span style="color:#E1E4E8;">;</span><span style="color:#6A737D;">// 生成文件的作者，可以不填</span></span>
<span class="line"><span style="color:#E1E4E8;">        String rootPackage </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;com.storyxc&quot;</span><span style="color:#E1E4E8;">;</span><span style="color:#6A737D;">// 生成的entity、controller、service等包所在的公共上一级包路径全限定名</span></span>
<span class="line"><span style="color:#E1E4E8;">        String modelModuleName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;storyxc-model&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        String serviceModuleName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;storyxc-web&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        String controllerModuleName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;storyxc-web&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 数据库配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        String url</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;jdbc:mysql://127.0.0.1/story?useUnicode=true&amp;characterEncoding=UTF-8&amp;useSSL=false&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        String driverClassName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;com.mysql.cj.jdbc.Driver&quot;</span><span style="color:#E1E4E8;">;</span><span style="color:#6A737D;">// 或者com.mysql.cj.jdbc.Driver</span></span>
<span class="line"><span style="color:#E1E4E8;">        String username </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;root&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        String password </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;root&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] tableNames </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[]{</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">        String pkgName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//====================配置变量区域=====================//</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] tablePrefix </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[]{</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 代码生成器</span></span>
<span class="line"><span style="color:#E1E4E8;">        AutoGenerator generator </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AutoGenerator</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 全局配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        GlobalConfig globalConfig </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">GlobalConfig</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        globalConfig.</span><span style="color:#B392F0;">setOutputDir</span><span style="color:#E1E4E8;">(projectPath </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> modelModuleName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/src/main/java&quot;</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">// 生成文件的输出目录</span></span>
<span class="line"><span style="color:#E1E4E8;">        globalConfig.</span><span style="color:#B392F0;">setFileOverride</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">// 是否覆盖已有文件，默认false</span></span>
<span class="line"><span style="color:#E1E4E8;">        globalConfig.</span><span style="color:#B392F0;">setOpen</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">// 是否打开输出目录</span></span>
<span class="line"><span style="color:#E1E4E8;">        globalConfig.</span><span style="color:#B392F0;">setAuthor</span><span style="color:#E1E4E8;">(author);</span></span>
<span class="line"><span style="color:#E1E4E8;">        globalConfig.</span><span style="color:#B392F0;">setServiceName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;%sService&quot;</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">// 去掉service接口的首字母I</span></span>
<span class="line"><span style="color:#E1E4E8;">        globalConfig.</span><span style="color:#B392F0;">setBaseResultMap</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">// 开启 BaseResultMap</span></span>
<span class="line"><span style="color:#E1E4E8;">        globalConfig.</span><span style="color:#B392F0;">setDateType</span><span style="color:#E1E4E8;">(DateType.ONLY_DATE);</span><span style="color:#6A737D;">// 只使用 java.util.date代替</span></span>
<span class="line"><span style="color:#E1E4E8;">        globalConfig.</span><span style="color:#B392F0;">setIdType</span><span style="color:#E1E4E8;">(IdType.ASSIGN_ID);</span><span style="color:#6A737D;">// 分配ID (主键类型为number或string）</span></span>
<span class="line"><span style="color:#E1E4E8;">        generator.</span><span style="color:#B392F0;">setGlobalConfig</span><span style="color:#E1E4E8;">(globalConfig);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 数据源配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        DataSourceConfig dataSourceConfig </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DataSourceConfig</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        dataSourceConfig.</span><span style="color:#B392F0;">setUrl</span><span style="color:#E1E4E8;">(url);</span></span>
<span class="line"><span style="color:#E1E4E8;">        dataSourceConfig.</span><span style="color:#B392F0;">setDbType</span><span style="color:#E1E4E8;">(DbType.MYSQL);</span><span style="color:#6A737D;">// 数据库类型</span></span>
<span class="line"><span style="color:#E1E4E8;">        dataSourceConfig.</span><span style="color:#B392F0;">setDriverName</span><span style="color:#E1E4E8;">(driverClassName);</span></span>
<span class="line"><span style="color:#E1E4E8;">        dataSourceConfig.</span><span style="color:#B392F0;">setUsername</span><span style="color:#E1E4E8;">(username);</span></span>
<span class="line"><span style="color:#E1E4E8;">        dataSourceConfig.</span><span style="color:#B392F0;">setPassword</span><span style="color:#E1E4E8;">(password);</span></span>
<span class="line"><span style="color:#E1E4E8;">        generator.</span><span style="color:#B392F0;">setDataSource</span><span style="color:#E1E4E8;">(dataSourceConfig);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 包配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        PackageConfig packageConfig </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PackageConfig</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//packageConfig.setModuleName(scanner(&quot;模块名&quot;));</span></span>
<span class="line"><span style="color:#E1E4E8;">        packageConfig.</span><span style="color:#B392F0;">setParent</span><span style="color:#E1E4E8;">(rootPackage);</span></span>
<span class="line"><span style="color:#E1E4E8;">        packageConfig.</span><span style="color:#B392F0;">setController</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;controller&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> (StrUtil.</span><span style="color:#B392F0;">isNotBlank</span><span style="color:#E1E4E8;">(pkgName) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> pkgName </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        packageConfig.</span><span style="color:#B392F0;">setService</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;service&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> (StrUtil.</span><span style="color:#B392F0;">isNotBlank</span><span style="color:#E1E4E8;">(pkgName) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> pkgName </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        packageConfig.</span><span style="color:#B392F0;">setServiceImpl</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;service&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> (StrUtil.</span><span style="color:#B392F0;">isNotBlank</span><span style="color:#E1E4E8;">(pkgName) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> pkgName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;.impl&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;.impl&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        packageConfig.</span><span style="color:#B392F0;">setEntity</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;dao.entity&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> (StrUtil.</span><span style="color:#B392F0;">isNotBlank</span><span style="color:#E1E4E8;">(pkgName) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> pkgName </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        packageConfig.</span><span style="color:#B392F0;">setMapper</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;dao.mapper&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> (StrUtil.</span><span style="color:#B392F0;">isNotBlank</span><span style="color:#E1E4E8;">(pkgName) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> pkgName </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//packageConfig.setXml(&quot;dao.mapper.xml&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        generator.</span><span style="color:#B392F0;">setPackageInfo</span><span style="color:#E1E4E8;">(packageConfig);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 注意：模板引擎在mybatisplus依赖中的templates目录下，可以依照此默认模板进行自定义</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 策略配置：配置根据哪张表生成代码</span></span>
<span class="line"><span style="color:#E1E4E8;">        StrategyConfig strategy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StrategyConfig</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setInclude</span><span style="color:#E1E4E8;">(tableNames);</span><span style="color:#6A737D;">// 表名，多个英文逗号分割（与exclude二选一配置）</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setNaming</span><span style="color:#E1E4E8;">(NamingStrategy.underline_to_camel);</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setColumnNaming</span><span style="color:#E1E4E8;">(NamingStrategy.underline_to_camel);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// strategy.setSuperEntityClass(&quot;你自己的父类实体,没有就不用设置!&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setEntityLombokModel</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">// lombok模型，@Accessors(chain = true)setter链式操作</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setRestControllerStyle</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">// controller生成@RestController</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setEntityTableFieldAnnotationEnable</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">// 是否生成实体时，生成字段注解</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// strategy.setEntityColumnConstant(true);// 是否生成字段常量（默认 false）</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setTablePrefix</span><span style="color:#E1E4E8;">(tablePrefix);</span><span style="color:#6A737D;">// 生成实体时去掉表前缀</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        TemplateConfig templateConfig </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TemplateConfig</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        templateConfig.</span><span style="color:#B392F0;">setController</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        templateConfig.</span><span style="color:#B392F0;">setService</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        templateConfig.</span><span style="color:#B392F0;">setServiceImpl</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        templateConfig.</span><span style="color:#B392F0;">setXml</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        templateConfig.</span><span style="color:#B392F0;">setMapper</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        templateConfig.</span><span style="color:#B392F0;">setEntity</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        generator.</span><span style="color:#B392F0;">setTemplate</span><span style="color:#E1E4E8;">(templateConfig);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        generator.</span><span style="color:#B392F0;">setStrategy</span><span style="color:#E1E4E8;">(strategy);</span></span>
<span class="line"><span style="color:#E1E4E8;">        generator.</span><span style="color:#B392F0;">setTemplateEngine</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FreemarkerTemplateEngine</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">         * 自定义输出路径</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// controller</span></span>
<span class="line"><span style="color:#E1E4E8;">        List&lt;</span><span style="color:#F97583;">FileOutConfig</span><span style="color:#E1E4E8;">&gt; focList </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayList&lt;&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// mapper.xml</span></span>
<span class="line"><span style="color:#E1E4E8;">        focList.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FileOutConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/templates/story-entity.java.ftl&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">outputFile</span><span style="color:#E1E4E8;">(TableInfo </span><span style="color:#FFAB70;">tableInfo</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 自定义输出文件名 ， 如果你 Entity 设置了前后缀、此处注意 xml 的名称会跟着发生变化！！</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> projectPath </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> modelModuleName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/src/main/java/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> rootPackage.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/dao/entity/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> pkgName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> tableInfo.</span><span style="color:#B392F0;">getEntityName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> StringPool.DOT_JAVA;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        focList.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FileOutConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/templates/story-controller.java.ftl&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">outputFile</span><span style="color:#E1E4E8;">(TableInfo </span><span style="color:#FFAB70;">tableInfo</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> projectPath </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> controllerModuleName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/src/main/java/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> rootPackage.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/controller/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> pkgName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> tableInfo.</span><span style="color:#B392F0;">getEntityName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Controller&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> StringPool.DOT_JAVA;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// service</span></span>
<span class="line"><span style="color:#E1E4E8;">        focList.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FileOutConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/templates/service.java.ftl&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">outputFile</span><span style="color:#E1E4E8;">(TableInfo </span><span style="color:#FFAB70;">tableInfo</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> projectPath </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> serviceModuleName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/src/main/java/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> rootPackage.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/service/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> pkgName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">  tableInfo.</span><span style="color:#B392F0;">getEntityName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Service&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> StringPool.DOT_JAVA;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// serviceImpl</span></span>
<span class="line"><span style="color:#E1E4E8;">        focList.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FileOutConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/templates/story-serviceImpl.java.ftl&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">outputFile</span><span style="color:#E1E4E8;">(TableInfo </span><span style="color:#FFAB70;">tableInfo</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> projectPath </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> serviceModuleName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/src/main/java/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> rootPackage.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/service/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> pkgName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/impl/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> tableInfo.</span><span style="color:#B392F0;">getEntityName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;ServiceImpl&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> StringPool.DOT_JAVA;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// mapper.java</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// service</span></span>
<span class="line"><span style="color:#E1E4E8;">        focList.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FileOutConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/templates/story-mapper.java.ftl&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">outputFile</span><span style="color:#E1E4E8;">(TableInfo </span><span style="color:#FFAB70;">tableInfo</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> projectPath </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> modelModuleName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/src/main/java/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> rootPackage.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/dao/mapper/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> pkgName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">  tableInfo.</span><span style="color:#B392F0;">getEntityName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Mapper&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> StringPool.DOT_JAVA;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// mapper.xml</span></span>
<span class="line"><span style="color:#E1E4E8;">        focList.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FileOutConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/templates/mapper.xml.ftl&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">outputFile</span><span style="color:#E1E4E8;">(TableInfo </span><span style="color:#FFAB70;">tableInfo</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 自定义输出文件名 ， 如果你 Entity 设置了前后缀、此处注意 xml 的名称会跟着发生变化！！</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> projectPath </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> modelModuleName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/src/main/resources/mapper/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> pkgName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> tableInfo.</span><span style="color:#B392F0;">getEntityName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Mapper&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> StringPool.DOT_XML;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        InjectionConfig injectionConfig </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InjectionConfig</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">initMap</span><span style="color:#E1E4E8;">() { }</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"><span style="color:#E1E4E8;">        injectionConfig.</span><span style="color:#B392F0;">setFileOutConfigList</span><span style="color:#E1E4E8;">(focList);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        generator.</span><span style="color:#B392F0;">setCfg</span><span style="color:#E1E4E8;">(injectionConfig);</span></span>
<span class="line"><span style="color:#E1E4E8;">        generator.</span><span style="color:#B392F0;">execute</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> cn.hutool.core.util.StrUtil;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.baomidou.mybatisplus.annotation.DbType;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.baomidou.mybatisplus.annotation.IdType;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.baomidou.mybatisplus.core.toolkit.StringPool;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.baomidou.mybatisplus.generator.AutoGenerator;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.baomidou.mybatisplus.generator.InjectionConfig;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.baomidou.mybatisplus.generator.config.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.baomidou.mybatisplus.generator.config.po.TableInfo;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.baomidou.mybatisplus.generator.config.rules.DateType;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.ArrayList;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.List;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> xc</span></span>
<span class="line"><span style="color:#6A737D;"> * @description</span></span>
<span class="line"><span style="color:#6A737D;"> * @date 2023/5/19 09:20</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MybatisPlusCodeGenerator</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String projectPath </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> System.</span><span style="color:#6F42C1;">getProperty</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user.dir&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//====================配置变量区域=====================//</span></span>
<span class="line"><span style="color:#24292E;">        String author </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;storyxc&quot;</span><span style="color:#24292E;">;</span><span style="color:#6A737D;">// 生成文件的作者，可以不填</span></span>
<span class="line"><span style="color:#24292E;">        String rootPackage </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;com.storyxc&quot;</span><span style="color:#24292E;">;</span><span style="color:#6A737D;">// 生成的entity、controller、service等包所在的公共上一级包路径全限定名</span></span>
<span class="line"><span style="color:#24292E;">        String modelModuleName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;storyxc-model&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        String serviceModuleName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;storyxc-web&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        String controllerModuleName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;storyxc-web&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 数据库配置</span></span>
<span class="line"><span style="color:#24292E;">        String url</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;jdbc:mysql://127.0.0.1/story?useUnicode=true&amp;characterEncoding=UTF-8&amp;useSSL=false&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        String driverClassName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;com.mysql.cj.jdbc.Driver&quot;</span><span style="color:#24292E;">;</span><span style="color:#6A737D;">// 或者com.mysql.cj.jdbc.Driver</span></span>
<span class="line"><span style="color:#24292E;">        String username </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;root&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        String password </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;root&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] tableNames </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[]{</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">        String pkgName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//====================配置变量区域=====================//</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] tablePrefix </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[]{</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 代码生成器</span></span>
<span class="line"><span style="color:#24292E;">        AutoGenerator generator </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AutoGenerator</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 全局配置</span></span>
<span class="line"><span style="color:#24292E;">        GlobalConfig globalConfig </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">GlobalConfig</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        globalConfig.</span><span style="color:#6F42C1;">setOutputDir</span><span style="color:#24292E;">(projectPath </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> modelModuleName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/src/main/java&quot;</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">// 生成文件的输出目录</span></span>
<span class="line"><span style="color:#24292E;">        globalConfig.</span><span style="color:#6F42C1;">setFileOverride</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">// 是否覆盖已有文件，默认false</span></span>
<span class="line"><span style="color:#24292E;">        globalConfig.</span><span style="color:#6F42C1;">setOpen</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">// 是否打开输出目录</span></span>
<span class="line"><span style="color:#24292E;">        globalConfig.</span><span style="color:#6F42C1;">setAuthor</span><span style="color:#24292E;">(author);</span></span>
<span class="line"><span style="color:#24292E;">        globalConfig.</span><span style="color:#6F42C1;">setServiceName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;%sService&quot;</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">// 去掉service接口的首字母I</span></span>
<span class="line"><span style="color:#24292E;">        globalConfig.</span><span style="color:#6F42C1;">setBaseResultMap</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">// 开启 BaseResultMap</span></span>
<span class="line"><span style="color:#24292E;">        globalConfig.</span><span style="color:#6F42C1;">setDateType</span><span style="color:#24292E;">(DateType.ONLY_DATE);</span><span style="color:#6A737D;">// 只使用 java.util.date代替</span></span>
<span class="line"><span style="color:#24292E;">        globalConfig.</span><span style="color:#6F42C1;">setIdType</span><span style="color:#24292E;">(IdType.ASSIGN_ID);</span><span style="color:#6A737D;">// 分配ID (主键类型为number或string）</span></span>
<span class="line"><span style="color:#24292E;">        generator.</span><span style="color:#6F42C1;">setGlobalConfig</span><span style="color:#24292E;">(globalConfig);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 数据源配置</span></span>
<span class="line"><span style="color:#24292E;">        DataSourceConfig dataSourceConfig </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DataSourceConfig</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        dataSourceConfig.</span><span style="color:#6F42C1;">setUrl</span><span style="color:#24292E;">(url);</span></span>
<span class="line"><span style="color:#24292E;">        dataSourceConfig.</span><span style="color:#6F42C1;">setDbType</span><span style="color:#24292E;">(DbType.MYSQL);</span><span style="color:#6A737D;">// 数据库类型</span></span>
<span class="line"><span style="color:#24292E;">        dataSourceConfig.</span><span style="color:#6F42C1;">setDriverName</span><span style="color:#24292E;">(driverClassName);</span></span>
<span class="line"><span style="color:#24292E;">        dataSourceConfig.</span><span style="color:#6F42C1;">setUsername</span><span style="color:#24292E;">(username);</span></span>
<span class="line"><span style="color:#24292E;">        dataSourceConfig.</span><span style="color:#6F42C1;">setPassword</span><span style="color:#24292E;">(password);</span></span>
<span class="line"><span style="color:#24292E;">        generator.</span><span style="color:#6F42C1;">setDataSource</span><span style="color:#24292E;">(dataSourceConfig);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 包配置</span></span>
<span class="line"><span style="color:#24292E;">        PackageConfig packageConfig </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PackageConfig</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//packageConfig.setModuleName(scanner(&quot;模块名&quot;));</span></span>
<span class="line"><span style="color:#24292E;">        packageConfig.</span><span style="color:#6F42C1;">setParent</span><span style="color:#24292E;">(rootPackage);</span></span>
<span class="line"><span style="color:#24292E;">        packageConfig.</span><span style="color:#6F42C1;">setController</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;controller&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> (StrUtil.</span><span style="color:#6F42C1;">isNotBlank</span><span style="color:#24292E;">(pkgName) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> pkgName </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        packageConfig.</span><span style="color:#6F42C1;">setService</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;service&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> (StrUtil.</span><span style="color:#6F42C1;">isNotBlank</span><span style="color:#24292E;">(pkgName) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> pkgName </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        packageConfig.</span><span style="color:#6F42C1;">setServiceImpl</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;service&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> (StrUtil.</span><span style="color:#6F42C1;">isNotBlank</span><span style="color:#24292E;">(pkgName) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> pkgName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;.impl&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;.impl&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        packageConfig.</span><span style="color:#6F42C1;">setEntity</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;dao.entity&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> (StrUtil.</span><span style="color:#6F42C1;">isNotBlank</span><span style="color:#24292E;">(pkgName) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> pkgName </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        packageConfig.</span><span style="color:#6F42C1;">setMapper</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;dao.mapper&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> (StrUtil.</span><span style="color:#6F42C1;">isNotBlank</span><span style="color:#24292E;">(pkgName) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> pkgName </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//packageConfig.setXml(&quot;dao.mapper.xml&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        generator.</span><span style="color:#6F42C1;">setPackageInfo</span><span style="color:#24292E;">(packageConfig);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 注意：模板引擎在mybatisplus依赖中的templates目录下，可以依照此默认模板进行自定义</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 策略配置：配置根据哪张表生成代码</span></span>
<span class="line"><span style="color:#24292E;">        StrategyConfig strategy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StrategyConfig</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setInclude</span><span style="color:#24292E;">(tableNames);</span><span style="color:#6A737D;">// 表名，多个英文逗号分割（与exclude二选一配置）</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setNaming</span><span style="color:#24292E;">(NamingStrategy.underline_to_camel);</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setColumnNaming</span><span style="color:#24292E;">(NamingStrategy.underline_to_camel);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// strategy.setSuperEntityClass(&quot;你自己的父类实体,没有就不用设置!&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setEntityLombokModel</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">// lombok模型，@Accessors(chain = true)setter链式操作</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setRestControllerStyle</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">// controller生成@RestController</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setEntityTableFieldAnnotationEnable</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">// 是否生成实体时，生成字段注解</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// strategy.setEntityColumnConstant(true);// 是否生成字段常量（默认 false）</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setTablePrefix</span><span style="color:#24292E;">(tablePrefix);</span><span style="color:#6A737D;">// 生成实体时去掉表前缀</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        TemplateConfig templateConfig </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TemplateConfig</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        templateConfig.</span><span style="color:#6F42C1;">setController</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        templateConfig.</span><span style="color:#6F42C1;">setService</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        templateConfig.</span><span style="color:#6F42C1;">setServiceImpl</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        templateConfig.</span><span style="color:#6F42C1;">setXml</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        templateConfig.</span><span style="color:#6F42C1;">setMapper</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        templateConfig.</span><span style="color:#6F42C1;">setEntity</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        generator.</span><span style="color:#6F42C1;">setTemplate</span><span style="color:#24292E;">(templateConfig);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        generator.</span><span style="color:#6F42C1;">setStrategy</span><span style="color:#24292E;">(strategy);</span></span>
<span class="line"><span style="color:#24292E;">        generator.</span><span style="color:#6F42C1;">setTemplateEngine</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FreemarkerTemplateEngine</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">         * 自定义输出路径</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// controller</span></span>
<span class="line"><span style="color:#24292E;">        List&lt;</span><span style="color:#D73A49;">FileOutConfig</span><span style="color:#24292E;">&gt; focList </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayList&lt;&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// mapper.xml</span></span>
<span class="line"><span style="color:#24292E;">        focList.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FileOutConfig</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/templates/story-entity.java.ftl&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">outputFile</span><span style="color:#24292E;">(TableInfo </span><span style="color:#E36209;">tableInfo</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 自定义输出文件名 ， 如果你 Entity 设置了前后缀、此处注意 xml 的名称会跟着发生变化！！</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> projectPath </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> modelModuleName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/src/main/java/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> rootPackage.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/dao/entity/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> pkgName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> tableInfo.</span><span style="color:#6F42C1;">getEntityName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> StringPool.DOT_JAVA;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        focList.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FileOutConfig</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/templates/story-controller.java.ftl&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">outputFile</span><span style="color:#24292E;">(TableInfo </span><span style="color:#E36209;">tableInfo</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> projectPath </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> controllerModuleName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/src/main/java/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> rootPackage.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/controller/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> pkgName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> tableInfo.</span><span style="color:#6F42C1;">getEntityName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Controller&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> StringPool.DOT_JAVA;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// service</span></span>
<span class="line"><span style="color:#24292E;">        focList.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FileOutConfig</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/templates/service.java.ftl&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">outputFile</span><span style="color:#24292E;">(TableInfo </span><span style="color:#E36209;">tableInfo</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> projectPath </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> serviceModuleName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/src/main/java/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> rootPackage.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/service/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> pkgName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;">  tableInfo.</span><span style="color:#6F42C1;">getEntityName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Service&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> StringPool.DOT_JAVA;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// serviceImpl</span></span>
<span class="line"><span style="color:#24292E;">        focList.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FileOutConfig</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/templates/story-serviceImpl.java.ftl&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">outputFile</span><span style="color:#24292E;">(TableInfo </span><span style="color:#E36209;">tableInfo</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> projectPath </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> serviceModuleName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/src/main/java/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> rootPackage.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/service/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> pkgName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/impl/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> tableInfo.</span><span style="color:#6F42C1;">getEntityName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;ServiceImpl&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> StringPool.DOT_JAVA;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// mapper.java</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// service</span></span>
<span class="line"><span style="color:#24292E;">        focList.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FileOutConfig</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/templates/story-mapper.java.ftl&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">outputFile</span><span style="color:#24292E;">(TableInfo </span><span style="color:#E36209;">tableInfo</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> projectPath </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> modelModuleName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/src/main/java/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> rootPackage.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/dao/mapper/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> pkgName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;">  tableInfo.</span><span style="color:#6F42C1;">getEntityName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Mapper&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> StringPool.DOT_JAVA;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// mapper.xml</span></span>
<span class="line"><span style="color:#24292E;">        focList.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FileOutConfig</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/templates/mapper.xml.ftl&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">outputFile</span><span style="color:#24292E;">(TableInfo </span><span style="color:#E36209;">tableInfo</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 自定义输出文件名 ， 如果你 Entity 设置了前后缀、此处注意 xml 的名称会跟着发生变化！！</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> projectPath </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> modelModuleName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/src/main/resources/mapper/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> pkgName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> tableInfo.</span><span style="color:#6F42C1;">getEntityName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Mapper&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> StringPool.DOT_XML;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        InjectionConfig injectionConfig </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InjectionConfig</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">initMap</span><span style="color:#24292E;">() { }</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">        injectionConfig.</span><span style="color:#6F42C1;">setFileOutConfigList</span><span style="color:#24292E;">(focList);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        generator.</span><span style="color:#6F42C1;">setCfg</span><span style="color:#24292E;">(injectionConfig);</span></span>
<span class="line"><span style="color:#24292E;">        generator.</span><span style="color:#6F42C1;">execute</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="模板" tabindex="-1">模板 <a class="header-anchor" href="#模板" aria-label="Permalink to &quot;模板&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>模板不能使用IDE格式化，否则生成的文件缩进会有问题</p></div><h3 id="story-entity-java-ftl" tabindex="-1">story-entity.java.ftl <a class="header-anchor" href="#story-entity-java-ftl" aria-label="Permalink to &quot;story-entity.java.ftl&quot;">​</a></h3><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">package \${package.Entity};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#list table.importPackages as pkg&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import \${pkg};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#list&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if swagger2&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import io.swagger.annotations.ApiModel;</span></span>
<span class="line"><span style="color:#E1E4E8;">import io.swagger.annotations.ApiModelProperty;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if entityLombokModel&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import lombok.Data;</span></span>
<span class="line"><span style="color:#E1E4E8;">import lombok.EqualsAndHashCode;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#if chainModel&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import lombok.experimental.Accessors;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import io.swagger.v3.oas.annotations.media.Schema;</span></span>
<span class="line"><span style="color:#E1E4E8;">import lombok.experimental.FieldNameConstants;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">/**</span></span>
<span class="line"><span style="color:#E1E4E8;"> * \${table.comment!}</span></span>
<span class="line"><span style="color:#E1E4E8;"> *</span></span>
<span class="line"><span style="color:#E1E4E8;"> * @author \${author}</span></span>
<span class="line"><span style="color:#E1E4E8;"> * @since \${date}</span></span>
<span class="line"><span style="color:#E1E4E8;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if entityLombokModel&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">@Data</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#if superEntityClass??&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">@EqualsAndHashCode(callSuper = true)</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">@EqualsAndHashCode(callSuper = false)</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#if chainModel&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">@Accessors(chain = true)</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if table.convert&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">@TableName(&quot;\${table.name}&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if swagger2&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">@ApiModel(value=&quot;\${entity}对象&quot;, description=&quot;\${table.comment!}&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">@FieldNameConstants</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if superEntityClass??&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">public class \${entity} extends \${superEntityClass}&lt;#if activeRecord&gt;&lt;\${entity}&gt;&lt;/#if&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#elseif activeRecord&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">public class \${entity} extends Model&lt;\${entity}&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">public class \${entity} implements Serializable {</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if entitySerialVersionUID&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    private static final long serialVersionUID = 1L;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#-- ----------  BEGIN 字段循环遍历  ----------&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#list table.fields as field&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#if field.keyFlag&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#assign keyPropertyName=&quot;\${field.propertyName}&quot;/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/#if&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @Schema(description = &quot;\${field.comment}&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#if field.keyFlag&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#-- 主键 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#if field.keyIdentityFlag&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @TableId(value = &quot;\${field.annotationColumnName}&quot;, type = IdType.AUTO)</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#elseif idType??&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @TableId(value = &quot;\${field.annotationColumnName}&quot;, type = IdType.\${idType})</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#elseif field.convert&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @TableId(&quot;\${field.annotationColumnName}&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#-- 普通字段 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#elseif field.fill??&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#-- -----   存在字段填充设置   -----&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#if field.convert&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @TableField(value = &quot;\${field.annotationColumnName}&quot;, fill = FieldFill.\${field.fill})</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @TableField(fill = FieldFill.\${field.fill})</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#elseif field.convert&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @TableField(&quot;\${field.annotationColumnName}&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#-- 乐观锁注解 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#if (versionFieldName!&quot;&quot;) == field.name&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Version</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#-- 逻辑删除注解 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#if (logicDeleteFieldName!&quot;&quot;) == field.name&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @TableLogic</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    private \${field.propertyType} \${field.propertyName};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#list&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#------------  END 字段循环遍历  ----------&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if !entityLombokModel&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#list table.fields as field&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#if field.propertyType == &quot;boolean&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;#assign getprefix=&quot;is&quot;/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;#assign getprefix=&quot;get&quot;/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public \${field.propertyType} \${getprefix}\${field.capitalName}() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return \${field.propertyName};</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#if chainModel&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public \${entity} set\${field.capitalName}(\${field.propertyType} \${field.propertyName}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public void set\${field.capitalName}(\${field.propertyType} \${field.propertyName}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        this.\${field.propertyName} = \${field.propertyName};</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#if chainModel&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        return this;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/#list&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if entityColumnConstant&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#list table.fields as field&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static final String \${field.name?upper_case} = &quot;\${field.name}&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/#list&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if activeRecord&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    protected Serializable pkVal() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#if keyPropertyName??&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        return this.\${keyPropertyName};</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        return null;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if !entityLombokModel&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    public String toString() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return &quot;\${entity}{&quot; +</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;#list table.fields as field&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#if field_index==0&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &quot;\${field.propertyName}=&quot; + \${field.propertyName} +</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;#else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &quot;, \${field.propertyName}=&quot; + \${field.propertyName} +</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/#list&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &quot;}&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">package \${package.Entity};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;#list table.importPackages as pkg&gt;</span></span>
<span class="line"><span style="color:#24292E;">import \${pkg};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#list&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if swagger2&gt;</span></span>
<span class="line"><span style="color:#24292E;">import io.swagger.annotations.ApiModel;</span></span>
<span class="line"><span style="color:#24292E;">import io.swagger.annotations.ApiModelProperty;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if entityLombokModel&gt;</span></span>
<span class="line"><span style="color:#24292E;">import lombok.Data;</span></span>
<span class="line"><span style="color:#24292E;">import lombok.EqualsAndHashCode;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#if chainModel&gt;</span></span>
<span class="line"><span style="color:#24292E;">import lombok.experimental.Accessors;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">import io.swagger.v3.oas.annotations.media.Schema;</span></span>
<span class="line"><span style="color:#24292E;">import lombok.experimental.FieldNameConstants;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">/**</span></span>
<span class="line"><span style="color:#24292E;"> * \${table.comment!}</span></span>
<span class="line"><span style="color:#24292E;"> *</span></span>
<span class="line"><span style="color:#24292E;"> * @author \${author}</span></span>
<span class="line"><span style="color:#24292E;"> * @since \${date}</span></span>
<span class="line"><span style="color:#24292E;"> */</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if entityLombokModel&gt;</span></span>
<span class="line"><span style="color:#24292E;">@Data</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#if superEntityClass??&gt;</span></span>
<span class="line"><span style="color:#24292E;">@EqualsAndHashCode(callSuper = true)</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#else&gt;</span></span>
<span class="line"><span style="color:#24292E;">@EqualsAndHashCode(callSuper = false)</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#if chainModel&gt;</span></span>
<span class="line"><span style="color:#24292E;">@Accessors(chain = true)</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if table.convert&gt;</span></span>
<span class="line"><span style="color:#24292E;">@TableName(&quot;\${table.name}&quot;)</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if swagger2&gt;</span></span>
<span class="line"><span style="color:#24292E;">@ApiModel(value=&quot;\${entity}对象&quot;, description=&quot;\${table.comment!}&quot;)</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">@FieldNameConstants</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if superEntityClass??&gt;</span></span>
<span class="line"><span style="color:#24292E;">public class \${entity} extends \${superEntityClass}&lt;#if activeRecord&gt;&lt;\${entity}&gt;&lt;/#if&gt; {</span></span>
<span class="line"><span style="color:#24292E;">&lt;#elseif activeRecord&gt;</span></span>
<span class="line"><span style="color:#24292E;">public class \${entity} extends Model&lt;\${entity}&gt; {</span></span>
<span class="line"><span style="color:#24292E;">&lt;#else&gt;</span></span>
<span class="line"><span style="color:#24292E;">public class \${entity} implements Serializable {</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;#if entitySerialVersionUID&gt;</span></span>
<span class="line"><span style="color:#24292E;">    private static final long serialVersionUID = 1L;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#-- ----------  BEGIN 字段循环遍历  ----------&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#list table.fields as field&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#if field.keyFlag&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#assign keyPropertyName=&quot;\${field.propertyName}&quot;/&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/#if&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @Schema(description = &quot;\${field.comment}&quot;)</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#if field.keyFlag&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#-- 主键 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#if field.keyIdentityFlag&gt;</span></span>
<span class="line"><span style="color:#24292E;">    @TableId(value = &quot;\${field.annotationColumnName}&quot;, type = IdType.AUTO)</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#elseif idType??&gt;</span></span>
<span class="line"><span style="color:#24292E;">    @TableId(value = &quot;\${field.annotationColumnName}&quot;, type = IdType.\${idType})</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#elseif field.convert&gt;</span></span>
<span class="line"><span style="color:#24292E;">    @TableId(&quot;\${field.annotationColumnName}&quot;)</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#-- 普通字段 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#elseif field.fill??&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#-- -----   存在字段填充设置   -----&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#if field.convert&gt;</span></span>
<span class="line"><span style="color:#24292E;">    @TableField(value = &quot;\${field.annotationColumnName}&quot;, fill = FieldFill.\${field.fill})</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#else&gt;</span></span>
<span class="line"><span style="color:#24292E;">    @TableField(fill = FieldFill.\${field.fill})</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#elseif field.convert&gt;</span></span>
<span class="line"><span style="color:#24292E;">    @TableField(&quot;\${field.annotationColumnName}&quot;)</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#-- 乐观锁注解 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#if (versionFieldName!&quot;&quot;) == field.name&gt;</span></span>
<span class="line"><span style="color:#24292E;">    @Version</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#-- 逻辑删除注解 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#if (logicDeleteFieldName!&quot;&quot;) == field.name&gt;</span></span>
<span class="line"><span style="color:#24292E;">    @TableLogic</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">    private \${field.propertyType} \${field.propertyName};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#list&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#------------  END 字段循环遍历  ----------&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;#if !entityLombokModel&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#list table.fields as field&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#if field.propertyType == &quot;boolean&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;#assign getprefix=&quot;is&quot;/&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#else&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;#assign getprefix=&quot;get&quot;/&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">    public \${field.propertyType} \${getprefix}\${field.capitalName}() {</span></span>
<span class="line"><span style="color:#24292E;">        return \${field.propertyName};</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    &lt;#if chainModel&gt;</span></span>
<span class="line"><span style="color:#24292E;">    public \${entity} set\${field.capitalName}(\${field.propertyType} \${field.propertyName}) {</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#else&gt;</span></span>
<span class="line"><span style="color:#24292E;">    public void set\${field.capitalName}(\${field.propertyType} \${field.propertyName}) {</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">        this.\${field.propertyName} = \${field.propertyName};</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#if chainModel&gt;</span></span>
<span class="line"><span style="color:#24292E;">        return this;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/#list&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;#if entityColumnConstant&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#list table.fields as field&gt;</span></span>
<span class="line"><span style="color:#24292E;">    public static final String \${field.name?upper_case} = &quot;\${field.name}&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    &lt;/#list&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if activeRecord&gt;</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    protected Serializable pkVal() {</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#if keyPropertyName??&gt;</span></span>
<span class="line"><span style="color:#24292E;">        return this.\${keyPropertyName};</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#else&gt;</span></span>
<span class="line"><span style="color:#24292E;">        return null;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if !entityLombokModel&gt;</span></span>
<span class="line"><span style="color:#24292E;">    @Override</span></span>
<span class="line"><span style="color:#24292E;">    public String toString() {</span></span>
<span class="line"><span style="color:#24292E;">        return &quot;\${entity}{&quot; +</span></span>
<span class="line"><span style="color:#24292E;">    &lt;#list table.fields as field&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#if field_index==0&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &quot;\${field.propertyName}=&quot; + \${field.propertyName} +</span></span>
<span class="line"><span style="color:#24292E;">        &lt;#else&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &quot;, \${field.propertyName}=&quot; + \${field.propertyName} +</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/#list&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &quot;}&quot;;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="story-controller-java-ftl" tabindex="-1">story-controller.java.ftl <a class="header-anchor" href="#story-controller-java-ftl" aria-label="Permalink to &quot;story-controller.java.ftl&quot;">​</a></h3><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">package \${package.Controller};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">import \${package.Service}.\${table.serviceName};</span></span>
<span class="line"><span style="color:#E1E4E8;">import org.springframework.web.bind.annotation.RequestMapping;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if restControllerStyle&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import org.springframework.web.bind.annotation.RestController;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import org.springframework.stereotype.Controller;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if superControllerClassPackage??&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import \${superControllerClassPackage};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import io.swagger.v3.oas.annotations.tags.Tag;</span></span>
<span class="line"><span style="color:#E1E4E8;">import lombok.RequiredArgsConstructor;</span></span>
<span class="line"><span style="color:#E1E4E8;">import lombok.extern.slf4j.Slf4j;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">/**</span></span>
<span class="line"><span style="color:#E1E4E8;"> * \${table.comment!} 前端控制器</span></span>
<span class="line"><span style="color:#E1E4E8;"> *</span></span>
<span class="line"><span style="color:#E1E4E8;"> * @author \${author}</span></span>
<span class="line"><span style="color:#E1E4E8;"> * @since \${date}</span></span>
<span class="line"><span style="color:#E1E4E8;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">@Tag(name = &quot;&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">@Slf4j</span></span>
<span class="line"><span style="color:#E1E4E8;">@RequiredArgsConstructor</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if restControllerStyle&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">@RestController</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">@Controller</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">@RequestMapping(&quot;&lt;#if package.ModuleName?? </span><span style="color:#FDAEB7;font-style:italic;">&amp;&amp;</span><span style="color:#E1E4E8;"> package.ModuleName != &quot;&quot;&gt;/\${package.ModuleName}&lt;/#if&gt;/&lt;#if controllerMappingHyphenStyle??&gt;\${controllerMappingHyphen}&lt;#else&gt;\${table.entityPath}&lt;/#if&gt;&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if kotlin&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">class \${table.controllerName}&lt;#if superControllerClass??&gt; : \${superControllerClass}()&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if superControllerClass??&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">public class \${table.controllerName} extends \${superControllerClass} {</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">public class \${table.controllerName} {</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    private final \${table.serviceName} \${table.serviceName?uncap_first};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">package \${package.Controller};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">import \${package.Service}.\${table.serviceName};</span></span>
<span class="line"><span style="color:#24292E;">import org.springframework.web.bind.annotation.RequestMapping;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if restControllerStyle&gt;</span></span>
<span class="line"><span style="color:#24292E;">import org.springframework.web.bind.annotation.RestController;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#else&gt;</span></span>
<span class="line"><span style="color:#24292E;">import org.springframework.stereotype.Controller;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if superControllerClassPackage??&gt;</span></span>
<span class="line"><span style="color:#24292E;">import \${superControllerClassPackage};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">import io.swagger.v3.oas.annotations.tags.Tag;</span></span>
<span class="line"><span style="color:#24292E;">import lombok.RequiredArgsConstructor;</span></span>
<span class="line"><span style="color:#24292E;">import lombok.extern.slf4j.Slf4j;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">/**</span></span>
<span class="line"><span style="color:#24292E;"> * \${table.comment!} 前端控制器</span></span>
<span class="line"><span style="color:#24292E;"> *</span></span>
<span class="line"><span style="color:#24292E;"> * @author \${author}</span></span>
<span class="line"><span style="color:#24292E;"> * @since \${date}</span></span>
<span class="line"><span style="color:#24292E;"> */</span></span>
<span class="line"><span style="color:#24292E;">@Tag(name = &quot;&quot;)</span></span>
<span class="line"><span style="color:#24292E;">@Slf4j</span></span>
<span class="line"><span style="color:#24292E;">@RequiredArgsConstructor</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if restControllerStyle&gt;</span></span>
<span class="line"><span style="color:#24292E;">@RestController</span></span>
<span class="line"><span style="color:#24292E;">&lt;#else&gt;</span></span>
<span class="line"><span style="color:#24292E;">@Controller</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">@RequestMapping(&quot;&lt;#if package.ModuleName?? </span><span style="color:#B31D28;font-style:italic;">&amp;&amp;</span><span style="color:#24292E;"> package.ModuleName != &quot;&quot;&gt;/\${package.ModuleName}&lt;/#if&gt;/&lt;#if controllerMappingHyphenStyle??&gt;\${controllerMappingHyphen}&lt;#else&gt;\${table.entityPath}&lt;/#if&gt;&quot;)</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if kotlin&gt;</span></span>
<span class="line"><span style="color:#24292E;">class \${table.controllerName}&lt;#if superControllerClass??&gt; : \${superControllerClass}()&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#else&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if superControllerClass??&gt;</span></span>
<span class="line"><span style="color:#24292E;">public class \${table.controllerName} extends \${superControllerClass} {</span></span>
<span class="line"><span style="color:#24292E;">&lt;#else&gt;</span></span>
<span class="line"><span style="color:#24292E;">public class \${table.controllerName} {</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span>
<span class="line"><span style="color:#24292E;">    private final \${table.serviceName} \${table.serviceName?uncap_first};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span></code></pre></div><h3 id="story-serviceimpl-java-ftl" tabindex="-1">story-serviceImpl.java.ftl <a class="header-anchor" href="#story-serviceimpl-java-ftl" aria-label="Permalink to &quot;story-serviceImpl.java.ftl&quot;">​</a></h3><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">package \${package.ServiceImpl};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">import \${package.Entity}.\${entity};</span></span>
<span class="line"><span style="color:#E1E4E8;">import \${package.Mapper}.\${table.mapperName};</span></span>
<span class="line"><span style="color:#E1E4E8;">import \${package.Service}.\${table.serviceName};</span></span>
<span class="line"><span style="color:#E1E4E8;">import \${superServiceImplClassPackage};</span></span>
<span class="line"><span style="color:#E1E4E8;">import org.springframework.stereotype.Service;</span></span>
<span class="line"><span style="color:#E1E4E8;">import lombok.RequiredArgsConstructor;</span></span>
<span class="line"><span style="color:#E1E4E8;">import lombok.extern.slf4j.Slf4j;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">/**</span></span>
<span class="line"><span style="color:#E1E4E8;"> * \${table.comment!} 服务实现类</span></span>
<span class="line"><span style="color:#E1E4E8;"> *</span></span>
<span class="line"><span style="color:#E1E4E8;"> * @author \${author}</span></span>
<span class="line"><span style="color:#E1E4E8;"> * @since \${date}</span></span>
<span class="line"><span style="color:#E1E4E8;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">@Slf4j</span></span>
<span class="line"><span style="color:#E1E4E8;">@RequiredArgsConstructor</span></span>
<span class="line"><span style="color:#E1E4E8;">@Service</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#if kotlin&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">open class \${table.serviceImplName} : \${superServiceImplClass}&lt;\${table.mapperName}, \${entity}&gt;(), \${table.serviceName} {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;#else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">public class \${table.serviceImplName} extends \${superServiceImplClass}&lt;\${table.mapperName}, \${entity}&gt; implements \${table.serviceName} {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/#if&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">package \${package.ServiceImpl};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">import \${package.Entity}.\${entity};</span></span>
<span class="line"><span style="color:#24292E;">import \${package.Mapper}.\${table.mapperName};</span></span>
<span class="line"><span style="color:#24292E;">import \${package.Service}.\${table.serviceName};</span></span>
<span class="line"><span style="color:#24292E;">import \${superServiceImplClassPackage};</span></span>
<span class="line"><span style="color:#24292E;">import org.springframework.stereotype.Service;</span></span>
<span class="line"><span style="color:#24292E;">import lombok.RequiredArgsConstructor;</span></span>
<span class="line"><span style="color:#24292E;">import lombok.extern.slf4j.Slf4j;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">/**</span></span>
<span class="line"><span style="color:#24292E;"> * \${table.comment!} 服务实现类</span></span>
<span class="line"><span style="color:#24292E;"> *</span></span>
<span class="line"><span style="color:#24292E;"> * @author \${author}</span></span>
<span class="line"><span style="color:#24292E;"> * @since \${date}</span></span>
<span class="line"><span style="color:#24292E;"> */</span></span>
<span class="line"><span style="color:#24292E;">@Slf4j</span></span>
<span class="line"><span style="color:#24292E;">@RequiredArgsConstructor</span></span>
<span class="line"><span style="color:#24292E;">@Service</span></span>
<span class="line"><span style="color:#24292E;">&lt;#if kotlin&gt;</span></span>
<span class="line"><span style="color:#24292E;">open class \${table.serviceImplName} : \${superServiceImplClass}&lt;\${table.mapperName}, \${entity}&gt;(), \${table.serviceName} {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;#else&gt;</span></span>
<span class="line"><span style="color:#24292E;">public class \${table.serviceImplName} extends \${superServiceImplClass}&lt;\${table.mapperName}, \${entity}&gt; implements \${table.serviceName} {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/#if&gt;</span></span></code></pre></div><h3 id="story-mapper-java-ftl" tabindex="-1">story-mapper.java.ftl <a class="header-anchor" href="#story-mapper-java-ftl" aria-label="Permalink to &quot;story-mapper.java.ftl&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> \${</span><span style="color:#FDAEB7;font-style:italic;">package</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">M</span><span style="color:#E1E4E8;">apper};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> \${</span><span style="color:#FDAEB7;font-style:italic;">package</span><span style="color:#E1E4E8;">.Entity}.\${entity};</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> \${superMapperClassPackage};</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.apache.ibatis.annotations.Mapper;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * &lt;p&gt;</span></span>
<span class="line"><span style="color:#6A737D;"> * \${table.comment!} Mapper 接口</span></span>
<span class="line"><span style="color:#6A737D;"> * &lt;/p&gt;</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> \${author}</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@since</span><span style="color:#6A737D;"> \${date}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">#</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> kotlin</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;">{table.mapperName} </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \${superMapperClass}</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">\${entity}</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">#</span><span style="color:#F97583;">else&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Mapper</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;">{table.mapperName} extends \${superMapperClass}</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">\${entity}</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">#</span><span style="color:#F97583;">if&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> \${</span><span style="color:#B31D28;font-style:italic;">package</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">M</span><span style="color:#24292E;">apper};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> \${</span><span style="color:#B31D28;font-style:italic;">package</span><span style="color:#24292E;">.Entity}.\${entity};</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> \${superMapperClassPackage};</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.apache.ibatis.annotations.Mapper;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * &lt;p&gt;</span></span>
<span class="line"><span style="color:#6A737D;"> * \${table.comment!} Mapper 接口</span></span>
<span class="line"><span style="color:#6A737D;"> * &lt;/p&gt;</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> \${author}</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@since</span><span style="color:#6A737D;"> \${date}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">#</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> kotlin</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">$</span><span style="color:#24292E;">{table.mapperName} </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \${superMapperClass}</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">\${entity}</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">#</span><span style="color:#D73A49;">else&gt;</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Mapper</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">$</span><span style="color:#24292E;">{table.mapperName} extends \${superMapperClass}</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">\${entity}</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">#</span><span style="color:#D73A49;">if&gt;</span></span></code></pre></div>`,13),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const m=s(p,[["render",t]]);export{F as __pageData,m as default};
