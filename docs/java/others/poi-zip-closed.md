# POI踩坑-zip file is closed

前几天做一个大批量数据异步的导入,采用的是之前用过的事件模式处理,大致流程是用户上传excel文件后,主线程对excel表头进行校验,如果通过校验,则开辟子线程进行业务处理,主线程返回响应.

整个导入流程和原来做的没什么区别,就是这次整个业务流程都放在子线程中进行处理,原来做的那个导入是只是主线程读数据,读到设定的阈值时则新开线程进行数据的持久化.

之前的那个系统做的功能是没有什么问题的,只是前台需要等待主线程读取完数据,后台在异步的分批插入数据到db,主线程读取数据这个过程前端页面一直在loading,体验不是很好.
这次为了优化用户体验,整个读取和业务流程操作都放在子线程中,并且新增了进度条展示,但是出现了标题的Zip File is closed异常,但不能完全重现,时而出现,时而正常.完整堆栈信息如下:
```java
Exception in thread "main" java.lang.IllegalStateException: Zip File is closed
	at org.apache.poi.openxml4j.util.ZipFileZipEntrySource.getEntries(ZipFileZipEntrySource.java:45)
	at org.apache.poi.openxml4j.opc.ZipPackage.getPartsImpl(ZipPackage.java:161)
	at org.apache.poi.openxml4j.opc.OPCPackage.getParts(OPCPackage.java:662)
	at org.apache.poi.openxml4j.opc.OPCPackage.open(OPCPackage.java:223)
	at org.apache.poi.openxml4j.opc.OPCPackage.open(OPCPackage.java:186)
	at com.test.util.POIEventModeHandler.handleExcel(POIEventModeHandler.java:482)
	at com.test.util.Test.main(Test.java:20)
```
追踪源码后发现,出现这个异常时,读取的zipentry为null,简单点说就是读了个不存在的文件.

然后我才想起来项目里文件上传有个对应的拦截器,请求过来之后,拦截器会把前台传的文件先保存在服务器的临时目录中,我们的controller里拿到的文件路径封装的是服务器上的临时文件目录,而不是前台那个MultipartFile的,在controller响应的时候,这个拦截器又把临时文件删除了.所以我这个问题就是线程执行的随机性导致的,正常的时候先执行了子线程中读取临时文件的方法,此时再切换到主线程返回响应时,拦截器无法删除这个文件,而如果一直先执行的是主线程,拦截器会先把文件删掉,这个时候子线程执行open那个临时文件就会出现zip file is closed的异常.

由于拦截器是公用的,而且原来的逻辑是响应后删除临时文件避免服务器磁盘占用,所以处理方案就是主线程在新建子线程任务之前把这个临时文件再copy一份让子线程去读取这个copy,子线程的finally中再把这个copy的文件删除即可.

- 补充
在搜这个问题的时候还看到有人直接用request中的multipartfile进行读取也会报这个错的情况,原因是客户端的文件路径poi没法直接读到,但是还有人直接用poi处理inputStream也会报错,所以推荐大家在使用poi事件模式读取前台上传的文件时,先将文件保存在服务器端,然后去读取服务器上的文件,处理完后再删除即可.