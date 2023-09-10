# 分布式定时任务解决方案xxl-job

## 背景
今天领导让我了解下分布式定时任务的内容,对项目中目前的定时任务改造一下,公司目前项目中封装的定时任务注解是基于spring的scheduler的,单机环境下没问题,但是为了服务的高可用生产都是集群部署的,会导致任务多次运行的问题,上家公司用的ssm,定时任务选型是Quartz,生产上采用的quartz的集群部署,quartz集群是不会出现任务重复执行的,原理跟下文讲到的xxl-job一样都是通过数据库表来加锁实现


## xxl-job
Xxl-job官网:https://www.xuxueli.com/xxl-job/

XXL-JOB是一个分布式任务调度平台，其核心设计目标是开发迅速、学习简单、轻量级、易扩展。现已开放源代码并接入多家公司线上产品线，开箱即用。

选择xxl-job的原因有以下几点:

- 调度和任务解耦,有单独的调度中心及控制台
- 代码易扩展
- 实现的功能比较全面



使用流程:

- 执行doc中的sql脚本,建相关的库表,具体表的作用可阅读帮助文档
- 修改xxl-job-admin配置文件后可以直接启动admin应用
- 修改执行器应用中配置文件,注意匹配admin的相关信息

- copy一份示例执行器的代码 修改应用端口和执行端口
- 启动两个示例执行器应用(模拟集群)
- 打开控制台可以看到已经注册上了两个节点
![Snipaste_20210318_201851.png](https://storyxc.com/images/blog//Snipaste_2021-03-18_20-18-51.png)

- 在控制台任务管理中修改任务的相关信息,这里只试个最简单的,更多高级配置请看使用文档

![Snipaste_20210318_202127.png](https://storyxc.com/images/blog//Snipaste_2021-03-18_20-21-27.png)

![Snipaste_20210318_202218.png](https://storyxc.com/images/blog//Snipaste_2021-03-18_20-22-18.png)

![Snipaste_20210318_202226.png](https://storyxc.com/images/blog//Snipaste_2021-03-18_20-22-26.png)

可以在控制台的调度记录中看到,集群模式下任务也只执行了一次.







除了cron任务,xxl-job中还支持周期性的任务,shell任务等.路由策略还支持轮询,一致性哈希,故障转移等,在admin中配置好java.mail信息,在控制配置任务时添加告警邮件,在任务调度出现异常时还会邮件告警





集成到微服务系统的思路:

- 数据库建表
- 新建一个job-admin服务将xxl-job-admin迁移,修改配置信息
- 在需要定时任务的业务服务中引入xxl-core依赖
- 在任务类中实现业务逻辑,任务方法上加上@XxlJob(value = "xxHandler")
- admin服务启动后启动具体的业务服务
- 在调度中心新建任务,配置相关信息,注意JobHandler的值为@XxlJob注解的Value