# mysql启动报错排查及处理

今天访问我自己的老博客（www.storyxc.com）发现网站挂掉了，ssh上去看了一下nginx和我自己的java后台博客服务都挂掉了，可能是阿里云抽风服务器重启了。然后重启了nignx和服务访问了一下，查询一直在pending，再去看后台日志，发现获取不到连接，估计是mysql也挂了。

```log
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: org.springframework.jdbc.CannotGetJdbcConnectionException: Failed to obtain JDBC Connection; nested exception is com.mysql.cj.jdbc.exceptions.Communi
cationsException: Communications link failure

The last packet sent successfully to the server was 0 milliseconds ago. The driver has not received any packets from the server.
### The error may exist in class path resource [mapper/ArticleDao.xml]
### The error may involve com.storyxc.mapper.ArticleDao.queryHotArticle
### The error occurred while executing a query
### Cause: org.springframework.jdbc.CannotGetJdbcConnectionException: Failed to obtain JDBC Connection; nested exception is com.mysql.cj.jdbc.exceptions.CommunicationsException: Communic
ations link failure

The last packet sent successfully to the server was 0 milliseconds ago. The driver has not received any packets from the server.
        at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExceptionTranslator.java:77) ~[mybatis-spring-1.3.1.jar!/:1.3.1]
        at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:446) ~[mybatis-spring-1.3.1.jar!/:1.3.1]
        at com.sun.proxy.$Proxy61.selectList(Unknown Source) ~[na:na]
        at org.mybatis.spring.SqlSessionTemplate.selectList(SqlSessionTemplate.java:230) ~[mybatis-spring-1.3.1.jar!/:1.3.1]
        at org.apache.ibatis.binding.MapperMethod.executeForMany(MapperMethod.java:137) ~[mybatis-3.4.5.jar!/:3.4.5]
        at org.apache.ibatis.binding.MapperMethod.execute(MapperMethod.java:75) ~[mybatis-3.4.5.jar!/:3.4.5]
        at org.apache.ibatis.binding.MapperProxy.invoke(MapperProxy.java:59) ~[mybatis-3.4.5.jar!/:3.4.5]
        at com.sun.proxy.$Proxy82.queryHotArticle(Unknown Source) ~[na:na]
        at com.storyxc.service.impl.ArticleServiceImpl.queryHotArticle(ArticleServiceImpl.java:113) ~[classes!/:1.0-SNAPSHOT]
        at com.storyxc.service.impl.ArticleServiceImpl$$FastClassBySpringCGLIB$$edb0e759.invoke(<generated>) ~[classes!/:1.0-SNAPSHOT]
        at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218) ~[spring-core-5.1.6.RELEASE.jar!/:5.1.6.RELEASE]
        at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:684) ~[spring-aop-5.1.6.RELEASE.jar!/:5.1.6.RELEASE]
        at com.storyxc.service.impl.ArticleServiceImpl$$EnhancerBySpringCGLIB$$5695fd69.queryHotArticle(<generated>) ~[classes!/:1.0-SNAPSHOT]
        at com.storyxc.controller.ArticleController.queryHotArticle(ArticleController.java:73) ~[classes!/:1.0-SNAPSHOT]
        at com.storyxc.controller.ArticleController$$FastClassBySpringCGLIB$$954e681b.invoke(<generated>) ~[classes!/:1.0-SNAPSHOT]
        at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218) ~[spring-core-5.1.6.RELEASE.jar!/:5.1.6.RELEASE]
        at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:684) ~[spring-aop-5.1.6.RELEASE.jar!/:5.1.6.RELEASE]
        at com.storyxc.controller.ArticleController$$EnhancerBySpringCGLIB$$7f3f634c.queryHotArticle(<generated>) ~[classes!/:1.0-SNAPSHOT]
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:1.8.0_282]
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[na:1.8.0_282]
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_282]
        at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_282]
```

然后尝试重启mysql：`service mysql start`

直接报错：`Starting MySQL...The server quit without updating PID file [FAILED]b/mysql/iz2ze09hymnzdn4lgmltlmz.pid).`

但就这样的报错没法排查，试图看下mysql的错误日志：`less /var/log/mysql/error.log`结果没有，

这才想起来当时没给mysql配置错误日志路径。



给mysql配置错误文件的路径：vim /etc/my.cnf

在[mysqld]下面加一行：`log_error=/var/log/mysql/error.log` ，然后创建/var/log/mysql这个目录

再次启动，依旧报错，但这次我们可以去看错误日志了。继续 `less /var/log/mysql/error.log`



```log
210627 00:34:02 mysqld_safe Starting mysqld daemon with databases from /var/lib/mysql
2021-06-27 00:34:03 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2021-06-27 00:34:03 3127 [Note] Plugin 'FEDERATED' is disabled.
2021-06-27 00:34:03 3127 [Note] InnoDB: Using atomics to ref count buffer pool pages
2021-06-27 00:34:03 3127 [Note] InnoDB: The InnoDB memory heap is disabled
2021-06-27 00:34:03 3127 [Note] InnoDB: Mutexes and rw_locks use GCC atomic builtins
2021-06-27 00:34:03 3127 [Note] InnoDB: Memory barrier is not used
2021-06-27 00:34:03 3127 [Note] InnoDB: Compressed tables use zlib 1.2.3
2021-06-27 00:34:03 3127 [Note] InnoDB: Using Linux native AIO
2021-06-27 00:34:03 3127 [Note] InnoDB: Not using CPU crc32 instructions
2021-06-27 00:34:03 3127 [Note] InnoDB: Initializing buffer pool, size = 128.0M
InnoDB: mmap(136019968 bytes) failed; errno 12
2021-06-27 00:34:03 3127 [ERROR] InnoDB: Cannot allocate memory for the buffer pool
2021-06-27 00:34:03 3127 [ERROR] Plugin 'InnoDB' init function returned error.
2021-06-27 00:34:03 3127 [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.
2021-06-27 00:34:03 3127 [ERROR] Unknown/unsupported storage engine: InnoDB
2021-06-27 00:34:03 3127 [ERROR] Aborting

2021-06-27 00:34:03 3127 [Note] Binlog end
```



查看内存情况：`free -h`，由于我买的是阿里云的轻量级应用服务器-穷逼版，只有2G内存

```bash
                    total        used        free      shared  buff/cache   available
     Mem:           1.8G        1.2G        245M         88M        323M        268M
     Swap:           0B          0B          0B
```
swap为0，执行命令建立临时分区

```bash
dd if=/dev/zero of=/swap bs=1M count=128  //创建一个swap文件，大小为128M
mkswap /swap                              //将swap文件变为swap分区文件
swapon /swap                              //将其映射为swap分区
```

再次查看内存：

```bash
              total        used        free      shared  buff/cache   available
Mem:           1.8G        1.3G         82M         88M        463M        236M
Swap:          127M          0B        127M
```



swap分区已存在，执行命令使系统重启swap分区自动加载：vim /etc/fstab

```bash
/swap swap swap defaults 0 0
```



再次启动 还是他喵不行，执行命令查看下当前内存占用大户。

`ps -eo pid,ppid,%mem,%cpu,cmd --sort=-%mem | head`

```bash
  PID  PPID %MEM %CPU CMD
19872     1 14.0 45.7 ./phpupdate
20228     1 14.0 45.7 /etc/phpupdate
 9372     1  8.0  1.3 java -jar storyxc.jar
27880     1  3.1  0.0 /opt/openoffice4/program/soffice.bin -headless -accept=socket,host=127.0.0.1,port=8100;urp; -nofirststartwizard
13389     1  2.6  0.0 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
23244 21287  2.3  4.7 ./networkmanager 15
13322     1  1.3  0.0 /usr/bin/containerd
  489   455  1.0  0.1 CmsGoAgent-Worker start
19905     1  0.6  0.0 ./phpguard
```

好家伙，从哪冒出来的phpupdate 直接全杀掉，世界瞬间清净了，腾出来600M的内存,

再次启动mysql，成功，问题解决。