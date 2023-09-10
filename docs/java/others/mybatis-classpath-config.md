# mybatis的classpath配置导致的jar包读取问题

今天同事碰到个问题，在服务中引入了另一个服务的mapper文件后找不到其中配置的resultMap引发报错。后经排查是因为配置文件中classpath的配置问题引起的。

`classpath:`: 只会从当前服务的class目录下寻找文件

`classpath*:`: 会从class目录下寻找文件，还会从引入的依赖（打包后lib文件夹中的jar包）中寻找文件

所以当把mybatis的classpath配置从`classpath:`改为`classpath*:`后问题能解决了
