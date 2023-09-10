# nexus无法下载依赖的问题记录

maven私服突然无法下载依赖，在idea中使用命令查看下详细错误信息`mvn clean install -U -e -X`

Client报错信息：

```txt
Caused by: org.eclipse.aether.transfer.ArtifactTransferException: Could not transfer artifact org.springframework.boot:spring-boot:jar:2.4.1 from/to nexus (xxxxxxxxxxxxxxxxxxxxxxxxx): GET request of: org/springframework/boot/spring-boot/2.4.1/spring-boot-2.4.1.jar from nexus failed
```

```txt
Could not transfer artifact org.springframework.boot:spring-boot:jar:2.4.1 from/to nexus (xxxxxxxxxxxxxxxxxxxxxx): GET request of: org/springframework/boot/spring-boot/2.4.1/spring-boot-2.4.1.jar from nexus failed: Premature end of Content-Length delimited message body (expected: 1,302,347; received: 76,515) -> [Help 1]
```

服务端错误日志：

```txt
2022-04-10 16:51:14,488+0800 INFO  [qtp1752276351-145] *UNKNOWN org.apache.shiro.session.mgt.AbstractValidatingSessionManager - Enabling session validation scheduler...
2022-04-10 16:51:14,502+0800 INFO  [qtp1752276351-51] *UNKNOWN org.sonatype.nexus.internal.security.anonymous.AnonymousManagerImpl - Loaded configuration: AnonymousConfiguration{enabled=false, userId='anonymous', realmName='NexusAuthorizingRealm'}
2022-04-10 16:51:15,233+0800 WARN  [qtp1752276351-48] deployment org.sonatype.nexus.repository.httpbridge.internal.ViewServlet - Failure servicing: GET /repository/maven-public/org/springframework/boot/spring-boot/2.4.1/spring-boot-2.4.1.jar
org.eclipse.jetty.io.EofException: null
	at org.eclipse.jetty.io.ChannelEndPoint.flush(ChannelEndPoint.java:284)
	at org.eclipse.jetty.io.WriteFlusher.flush(WriteFlusher.java:393)
	at org.eclipse.jetty.io.WriteFlusher.write(WriteFlusher.java:277)
	at org.eclipse.jetty.io.AbstractEndPoint.write(AbstractEndPoint.java:380)
	at org.eclipse.jetty.server.HttpConnection$SendCallback.process(HttpConnection.java:826)
	at org.eclipse.jetty.util.IteratingCallback.processing(IteratingCallback.java:241)
	at org.eclipse.jetty.util.IteratingCallback.iterate(IteratingCallback.java:224)
	at org.eclipse.jetty.server.HttpConnection.send(HttpConnection.java:550)
	at org.eclipse.jetty.server.HttpChannel.sendResponse(HttpChannel.java:850)
	at org.eclipse.jetty.server.HttpChannel.write(HttpChannel.java:921)
	at org.eclipse.jetty.server.HttpOutput.write(HttpOutput.java:249)
	at org.eclipse.jetty.server.HttpOutput.write(HttpOutput.java:225)
	at org.eclipse.jetty.server.HttpOutput.write(HttpOutput.java:524)
	at com.google.common.io.ByteStreams.copy(ByteStreams.java:113)
	at org.sonatype.nexus.repository.view.Payload.copy(Payload.java:61)
	at org.sonatype.nexus.repository.view.Content.copy(Content.java:116)
	at org.sonatype.nexus.repository.httpbridge.internal.DefaultHttpResponseSender.send(DefaultHttpResponseSender.java:81)
	at org.sonatype.nexus.repository.httpbridge.internal.ViewServlet.dispatchAndSend(ViewServlet.java:228)
	at org.sonatype.nexus.repository.httpbridge.internal.ViewServlet.doService(ViewServlet.java:174)
	at org.sonatype.nexus.repository.httpbridge.internal.ViewServlet.service(ViewServlet.java:126)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:790)
	at com.google.inject.servlet.ServletDefinition.doServiceImpl(ServletDefinition.java:286)
	at com.google.inject.servlet.ServletDefinition.doService(ServletDefinition.java:276)
	at com.google.inject.servlet.ServletDefinition.service(ServletDefinition.java:181)
	at com.google.inject.servlet.DynamicServletPipeline.service(DynamicServletPipeline.java:71)
	at com.google.inject.servlet.FilterChainInvocation.doFilter(FilterChainInvocation.java:85)
	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:112)
	at com.google.inject.servlet.FilterChainInvocation.doFilter(FilterChainInvocation.java:82)
	at org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:61)
	at org.apache.shiro.web.servlet.AdviceFilter.executeChain(AdviceFilter.java:108)
	at org.apache.shiro.web.servlet.AdviceFilter.doFilterInternal(AdviceFilter.java:137)
	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)
	at org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:66)
	at org.apache.shiro.web.servlet.AdviceFilter.executeChain(AdviceFilter.java:108)
	at org.apache.shiro.web.servlet.AdviceFilter.doFilterInternal(AdviceFilter.java:137)
	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)
	at org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:66)
	at org.apache.shiro.web.servlet.AdviceFilter.executeChain(AdviceFilter.java:108)
	at org.apache.shiro.web.servlet.AdviceFilter.doFilterInternal(AdviceFilter.java:137)
	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)
	at org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:66)
	at org.apache.shiro.web.servlet.AdviceFilter.executeChain(AdviceFilter.java:108)
	at org.apache.shiro.web.servlet.AdviceFilter.doFilterInternal(AdviceFilter.java:137)
	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)
	at org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:66)
	at org.apache.shiro.web.servlet.AbstractShiroFilter.executeChain(AbstractShiroFilter.java:449)
	at org.sonatype.nexus.security.SecurityFilter.executeChain(SecurityFilter.java:85)
	at org.apache.shiro.web.servlet.AbstractShiroFilter$1.call(AbstractShiroFilter.java:365)
	at org.apache.shiro.subject.support.SubjectCallable.doCall(SubjectCallable.java:90)
	at org.apache.shiro.subject.support.SubjectCallable.call(SubjectCallable.java:83)
	at org.apache.shiro.subject.support.DelegatingSubject.execute(DelegatingSubject.java:383)
	at org.apache.shiro.web.servlet.AbstractShiroFilter.doFilterInternal(AbstractShiroFilter.java:362)
	at org.sonatype.nexus.security.SecurityFilter.doFilterInternal(SecurityFilter.java:101)
	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)
	at com.google.inject.servlet.FilterChainInvocation.doFilter(FilterChainInvocation.java:82)
	at org.sonatype.nexus.repository.httpbridge.internal.ExhaustRequestFilter.doFilter(ExhaustRequestFilter.java:80)
	at com.google.inject.servlet.FilterChainInvocation.doFilter(FilterChainInvocation.java:82)
	at com.sonatype.nexus.licensing.internal.LicensingRedirectFilter.doFilter(LicensingRedirectFilter.java:114)
	at com.google.inject.servlet.FilterChainInvocation.doFilter(FilterChainInvocation.java:82)
	at com.codahale.metrics.servlet.AbstractInstrumentedFilter.doFilter(AbstractInstrumentedFilter.java:112)
	at com.google.inject.servlet.FilterChainInvocation.doFilter(FilterChainInvocation.java:82)
	at org.sonatype.nexus.internal.web.ErrorPageFilter.doFilter(ErrorPageFilter.java:79)
	at com.google.inject.servlet.FilterChainInvocation.doFilter(FilterChainInvocation.java:82)
	at org.sonatype.nexus.internal.web.EnvironmentFilter.doFilter(EnvironmentFilter.java:101)
	at com.google.inject.servlet.FilterChainInvocation.doFilter(FilterChainInvocation.java:82)
	at org.sonatype.nexus.internal.web.HeaderPatternFilter.doFilter(HeaderPatternFilter.java:98)
	at com.google.inject.servlet.FilterChainInvocation.doFilter(FilterChainInvocation.java:82)
	at com.google.inject.servlet.DynamicFilterPipeline.dispatch(DynamicFilterPipeline.java:104)
	at com.google.inject.servlet.GuiceFilter.doFilter(GuiceFilter.java:135)
	at org.sonatype.nexus.bootstrap.osgi.DelegatingFilter.doFilter(DelegatingFilter.java:73)
	at org.eclipse.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1602)
	at org.eclipse.jetty.servlet.ServletHandler.doHandle(ServletHandler.java:540)
	at org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:146)
	at org.eclipse.jetty.security.SecurityHandler.handle(SecurityHandler.java:548)
	at org.eclipse.jetty.server.handler.HandlerWrapper.handle(HandlerWrapper.java:132)
	at org.eclipse.jetty.server.handler.ScopedHandler.nextHandle(ScopedHandler.java:257)
	at org.eclipse.jetty.server.session.SessionHandler.doHandle(SessionHandler.java:1700)
	at org.eclipse.jetty.server.handler.ScopedHandler.nextHandle(ScopedHandler.java:255)
	at org.eclipse.jetty.server.handler.ContextHandler.doHandle(ContextHandler.java:1345)
	at org.eclipse.jetty.server.handler.ScopedHandler.nextScope(ScopedHandler.java:203)
	at org.eclipse.jetty.servlet.ServletHandler.doScope(ServletHandler.java:480)
	at org.eclipse.jetty.server.session.SessionHandler.doScope(SessionHandler.java:1667)
	at org.eclipse.jetty.server.handler.ScopedHandler.nextScope(ScopedHandler.java:201)
	at org.eclipse.jetty.server.handler.ContextHandler.doScope(ContextHandler.java:1247)
	at org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:144)
	at org.eclipse.jetty.server.handler.HandlerWrapper.handle(HandlerWrapper.java:132)
	at com.codahale.metrics.jetty9.InstrumentedHandler.handle(InstrumentedHandler.java:239)
	at org.eclipse.jetty.server.handler.HandlerCollection.handle(HandlerCollection.java:152)
	at org.eclipse.jetty.server.handler.HandlerWrapper.handle(HandlerWrapper.java:132)
	at org.eclipse.jetty.server.Server.handle(Server.java:505)
	at org.eclipse.jetty.server.HttpChannel.handle(HttpChannel.java:370)
	at org.eclipse.jetty.server.HttpConnection.onFillable(HttpConnection.java:267)
	at org.eclipse.jetty.io.AbstractConnection$ReadCallback.succeeded(AbstractConnection.java:305)
	at org.eclipse.jetty.io.FillInterest.fillable(FillInterest.java:103)
	at org.eclipse.jetty.io.ChannelEndPoint$2.run(ChannelEndPoint.java:117)
	at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.runTask(EatWhatYouKill.java:333)
	at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.doProduce(EatWhatYouKill.java:310)
	at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.tryProduce(EatWhatYouKill.java:168)
	at org.eclipse.jetty.util.thread.strategy.EatWhatYouKill.run(EatWhatYouKill.java:126)
	at org.eclipse.jetty.util.thread.ReservedThreadExecutor$ReservedThread.run(ReservedThreadExecutor.java:366)
	at org.eclipse.jetty.util.thread.QueuedThreadPool.runJob(QueuedThreadPool.java:698)
	at org.eclipse.jetty.util.thread.QueuedThreadPool$Runner.run(QueuedThreadPool.java:804)
	at java.lang.Thread.run(Thread.java:748)
Caused by: java.io.IOException: Connection reset by peer
	at sun.nio.ch.FileDispatcherImpl.write0(Native Method)
	at sun.nio.ch.SocketDispatcher.write(SocketDispatcher.java:47)
	at sun.nio.ch.IOUtil.writeFromNativeBuffer(IOUtil.java:93)
	at sun.nio.ch.IOUtil.write(IOUtil.java:51)
	at sun.nio.ch.SocketChannelImpl.write(SocketChannelImpl.java:471)
	at org.eclipse.jetty.io.ChannelEndPoint.flush(ChannelEndPoint.java:262)
	... 102 common frames omitted
```



## 解决

![image-20220410223038569](https://storyxc.com/images/blog/image-20220410223038569.png)

在nginx的location配置中增加`proxy_max_temp_file_size 0;`