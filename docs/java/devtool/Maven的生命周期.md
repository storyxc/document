# Maven的生命周期

maven共有三个标准生命周期：

- clean：项目清理的处理
- default：项目部署的处理

- site：站点文件生成的处理



## Maven的构建生命周期

| 阶段          | 处理     | 描述                                                     |
| :------------ | :------- | :------------------------------------------------------- |
| 验证 validate | 验证项目 | 验证项目是否正确且所有必须信息是可用的                   |
| 编译 compile  | 执行编译 | 源代码编译在此阶段完成                                   |
| 测试 Test     | 测试     | 使用适当的单元测试框架（例如JUnit）运行测试。            |
| 包装 package  | 打包     | 创建JAR/WAR包如在 pom.xml 中定义提及的包                 |
| 检查 verify   | 检查     | 对集成测试的结果进行检查，以保证质量达标                 |
| 安装 install  | 安装     | 安装打包的项目到本地仓库，以供其他项目使用               |
| 部署 deploy   | 部署     | 拷贝最终的工程包到远程仓库中，以共享给其他开发人员和工程 |



平常用到最多的是mvn clean package或者mvn install，两者都会在target生成最终的jar或war文件，区别在于install命令还会将生成的jar或war包安装至本地仓库。而当需要跨项目引用jar包时，我们需要把自己的jar包上传至maven私服（远程仓库）中，之前还傻傻的直接动手去maven私服手动上传jar包，不过相比于mvn deploy肯定是麻烦很多的，maven的deploy可以很方便的将我们工程中的jar发布至maven私服中方便团队间的jar包共享。



::: tip

当deploy快照版本时，maven会给快照打上时间戳以区分快照的版本，因为快照可能会频繁变更。maven会以包名是否包含SNAPSHOT来判断是否快照。

:::





## Clean 生命周期

当我们执行 mvn post-clean 命令时，Maven 调用 clean 生命周期，它包含以下阶段：

- pre-clean：执行一些需要在clean之前完成的工作
- clean：移除所有上一次构建生成的文件
- post-clean：执行一些需要在clean之后立刻完成的工作

mvn clean 中的 clean 就是上面的 clean，在一个生命周期中，运行某个阶段的时候，它之前的所有阶段都会被运行，也就是说，如果执行 mvn clean 将运行以下两个生命周期阶段：

```
pre-clean, clean
```

如果我们运行 mvn post-clean ，则运行以下三个生命周期阶段：

```
pre-clean, clean, post-clean
```





## Site 生命周期

Maven Site 插件一般用来创建新的报告文档、部署站点等。

- pre-site：执行一些需要在生成站点文档之前完成的工作
- site：生成项目的站点文档
- post-site： 执行一些需要在生成站点文档之后完成的工作，并且为部署做准备
- site-deploy：将生成的站点文档部署到特定的服务器上
