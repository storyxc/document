import{_ as a,c as i,o as n,a2 as p}from"./chunks/framework.CQECOx-R.js";const d=JSON.parse('{"title":"mysql启动报错排查及处理","description":"","frontmatter":{},"headers":[],"relativePath":"actions/env/mysql启动报错排查及处理.md","filePath":"actions/env/mysql启动报错排查及处理.md","lastUpdated":1742805674000}'),e={name:"actions/env/mysql启动报错排查及处理.md"};function t(l,s,h,r,k,o){return n(),i("div",null,s[0]||(s[0]=[p(`<h1 id="mysql启动报错排查及处理" tabindex="-1">mysql启动报错排查及处理 <a class="header-anchor" href="#mysql启动报错排查及处理" aria-label="Permalink to &quot;mysql启动报错排查及处理&quot;">​</a></h1><p>今天访问我自己的老博客（www.storyxc.com ）发现网站挂掉了，ssh上去看了一下nginx和我自己的java后台博客服务都挂掉了，可能是阿里云抽风服务器重启了。然后重启了nignx和服务访问了一下，查询一直在pending，再去看后台日志，发现获取不到连接，估计是mysql也挂了。</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: </span></span>
<span class="line"><span>### Error querying database.  Cause: org.springframework.jdbc.CannotGetJdbcConnectionException: Failed to obtain JDBC Connection; nested exception is com.mysql.cj.jdbc.exceptions.Communi</span></span>
<span class="line"><span>cationsException: Communications link failure</span></span>
<span class="line"><span></span></span>
<span class="line"><span>The last packet sent successfully to the server was 0 milliseconds ago. The driver has not received any packets from the server.</span></span>
<span class="line"><span>### The error may exist in class path resource [mapper/ArticleDao.xml]</span></span>
<span class="line"><span>### The error may involve com.storyxc.mapper.ArticleDao.queryHotArticle</span></span>
<span class="line"><span>### The error occurred while executing a query</span></span>
<span class="line"><span>### Cause: org.springframework.jdbc.CannotGetJdbcConnectionException: Failed to obtain JDBC Connection; nested exception is com.mysql.cj.jdbc.exceptions.CommunicationsException: Communic</span></span>
<span class="line"><span>ations link failure</span></span>
<span class="line"><span></span></span>
<span class="line"><span>The last packet sent successfully to the server was 0 milliseconds ago. The driver has not received any packets from the server.</span></span>
<span class="line"><span>        at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExceptionTranslator.java:77) ~[mybatis-spring-1.3.1.jar!/:1.3.1]</span></span>
<span class="line"><span>        at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:446) ~[mybatis-spring-1.3.1.jar!/:1.3.1]</span></span>
<span class="line"><span>        at com.sun.proxy.$Proxy61.selectList(Unknown Source) ~[na:na]</span></span>
<span class="line"><span>        at org.mybatis.spring.SqlSessionTemplate.selectList(SqlSessionTemplate.java:230) ~[mybatis-spring-1.3.1.jar!/:1.3.1]</span></span>
<span class="line"><span>        at org.apache.ibatis.binding.MapperMethod.executeForMany(MapperMethod.java:137) ~[mybatis-3.4.5.jar!/:3.4.5]</span></span>
<span class="line"><span>        at org.apache.ibatis.binding.MapperMethod.execute(MapperMethod.java:75) ~[mybatis-3.4.5.jar!/:3.4.5]</span></span>
<span class="line"><span>        at org.apache.ibatis.binding.MapperProxy.invoke(MapperProxy.java:59) ~[mybatis-3.4.5.jar!/:3.4.5]</span></span>
<span class="line"><span>        at com.sun.proxy.$Proxy82.queryHotArticle(Unknown Source) ~[na:na]</span></span>
<span class="line"><span>        at com.storyxc.service.impl.ArticleServiceImpl.queryHotArticle(ArticleServiceImpl.java:113) ~[classes!/:1.0-SNAPSHOT]</span></span>
<span class="line"><span>        at com.storyxc.service.impl.ArticleServiceImpl$$FastClassBySpringCGLIB$$edb0e759.invoke(&lt;generated&gt;) ~[classes!/:1.0-SNAPSHOT]</span></span>
<span class="line"><span>        at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218) ~[spring-core-5.1.6.RELEASE.jar!/:5.1.6.RELEASE]</span></span>
<span class="line"><span>        at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:684) ~[spring-aop-5.1.6.RELEASE.jar!/:5.1.6.RELEASE]</span></span>
<span class="line"><span>        at com.storyxc.service.impl.ArticleServiceImpl$$EnhancerBySpringCGLIB$$5695fd69.queryHotArticle(&lt;generated&gt;) ~[classes!/:1.0-SNAPSHOT]</span></span>
<span class="line"><span>        at com.storyxc.controller.ArticleController.queryHotArticle(ArticleController.java:73) ~[classes!/:1.0-SNAPSHOT]</span></span>
<span class="line"><span>        at com.storyxc.controller.ArticleController$$FastClassBySpringCGLIB$$954e681b.invoke(&lt;generated&gt;) ~[classes!/:1.0-SNAPSHOT]</span></span>
<span class="line"><span>        at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218) ~[spring-core-5.1.6.RELEASE.jar!/:5.1.6.RELEASE]</span></span>
<span class="line"><span>        at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:684) ~[spring-aop-5.1.6.RELEASE.jar!/:5.1.6.RELEASE]</span></span>
<span class="line"><span>        at com.storyxc.controller.ArticleController$$EnhancerBySpringCGLIB$$7f3f634c.queryHotArticle(&lt;generated&gt;) ~[classes!/:1.0-SNAPSHOT]</span></span>
<span class="line"><span>        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:1.8.0_282]</span></span>
<span class="line"><span>        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[na:1.8.0_282]</span></span>
<span class="line"><span>        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_282]</span></span>
<span class="line"><span>        at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_282]</span></span></code></pre></div><p>然后尝试重启mysql：<code>service mysql start</code></p><p>直接报错：<code>Starting MySQL...The server quit without updating PID file [FAILED]b/mysql/iz2ze09hymnzdn4lgmltlmz.pid).</code></p><p>但就这样的报错没法排查，试图看下mysql的错误日志：<code>less /var/log/mysql/error.log</code>结果没有，</p><p>这才想起来当时没给mysql配置错误日志路径。</p><p>给mysql配置错误文件的路径：vim /etc/my.cnf</p><p>在[mysqld]下面加一行：<code>log_error=/var/log/mysql/error.log</code> ，然后创建/var/log/mysql这个目录</p><p>再次启动，依旧报错，但这次我们可以去看错误日志了。继续 <code>less /var/log/mysql/error.log</code></p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>210627 00:34:02 mysqld_safe Starting mysqld daemon with databases from /var/lib/mysql</span></span>
<span class="line"><span>2021-06-27 00:34:03 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [Note] Plugin &#39;FEDERATED&#39; is disabled.</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [Note] InnoDB: Using atomics to ref count buffer pool pages</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [Note] InnoDB: The InnoDB memory heap is disabled</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [Note] InnoDB: Mutexes and rw_locks use GCC atomic builtins</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [Note] InnoDB: Memory barrier is not used</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [Note] InnoDB: Compressed tables use zlib 1.2.3</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [Note] InnoDB: Using Linux native AIO</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [Note] InnoDB: Not using CPU crc32 instructions</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [Note] InnoDB: Initializing buffer pool, size = 128.0M</span></span>
<span class="line"><span>InnoDB: mmap(136019968 bytes) failed; errno 12</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [ERROR] InnoDB: Cannot allocate memory for the buffer pool</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [ERROR] Plugin &#39;InnoDB&#39; init function returned error.</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [ERROR] Plugin &#39;InnoDB&#39; registration as a STORAGE ENGINE failed.</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [ERROR] Unknown/unsupported storage engine: InnoDB</span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [ERROR] Aborting</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2021-06-27 00:34:03 3127 [Note] Binlog end</span></span></code></pre></div><p>查看内存情况：<code>free -h</code>，由于我买的是阿里云的轻量级应用服务器-穷逼版，只有2G内存</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">                    total</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        used</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        free</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      shared</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  buff/cache</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   available</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     Mem:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">           1.8G</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        1.2G</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        245M</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         88M</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        323M</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        268M</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     Swap:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">           0B</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          0B</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          0B</span></span></code></pre></div><p>swap为0，执行命令建立临时分区</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> if=/dev/zero</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> of=/swap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bs=1M</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> count=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">128</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  //创建一个swap文件，大小为128M</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkswap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /swap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                              //将swap文件变为swap分区文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">swapon</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /swap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                              //将其映射为swap分区</span></span></code></pre></div><p>再次查看内存：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">              total</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        used</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        free</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      shared</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  buff/cache</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   available</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Mem:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">           1.8G</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        1.3G</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         82M</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         88M</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        463M</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        236M</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Swap:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          127M</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          0B</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        127M</span></span></code></pre></div><p>swap分区已存在，执行命令使系统重启swap分区自动加载：vim /etc/fstab</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/swap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> swap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> swap</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> defaults</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span></code></pre></div><p>再次启动 还是他喵不行，执行命令查看下当前内存占用大户。</p><p><code>ps -eo pid,ppid,%mem,%cpu,cmd --sort=-%mem | head</code></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  PID</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  PPID</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %MEM</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %CPU</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CMD</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">19872</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 14.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 45.7</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./phpupdate</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">20228</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 14.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 45.7</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/phpupdate</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 9372</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  8.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  1.3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> java</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -jar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> storyxc.jar</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">27880</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  3.1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  0.0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /opt/openoffice4/program/soffice.bin</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -headless</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -accept=socket,host=127.0.0.1,port=8100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">urp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-nofirststartwizard</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">13389</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  2.6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  0.0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/bin/dockerd</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -H</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fd://</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --containerd=/run/containerd/containerd.sock</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">23244</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 21287</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  2.3</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  4.7</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./networkmanager</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 15</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">13322</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  1.3</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  0.0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/bin/containerd</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  489</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   455</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  1.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  0.1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CmsGoAgent-Worker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">19905</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  0.6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  0.0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./phpguard</span></span></code></pre></div><p>好家伙，从哪冒出来的phpupdate 直接全杀掉，世界瞬间清净了，腾出来600M的内存,</p><p>再次启动mysql，成功，问题解决。</p>`,24)]))}const F=a(e,[["render",t]]);export{d as __pageData,F as default};
