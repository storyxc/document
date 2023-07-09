# canal部署

canal官方仓库:`https://github.com/alibaba/canal/`

wiki:`https://github.com/alibaba/canal/wiki`

canal的用途是基于mysql的binlog日志解析，提供增量数据的订阅和消费。简单的场景：通过canal监控mysql数据变更从而及时更新redis中对应的缓存。

本文主要介绍canal在服务器端的部署，包括`canal-admin`,`canal-tsdb配置`以及`instance`配置。

首先需要下载canal的发行版，下载地址：https://github.com/alibaba/canal/releases，可自行选择版本，这里直接选择最新的v1.1.5。系统版本为centos7。

## canal admin

- 解压

```bash
tar zxvf canal.admin-1.1.5.tar.gz -C /home/install/canal/admin
```

- 执行conf文件夹中的canal_manager.sql建表

  ![image-20210617000438523](https://storyxc.com/images/blog//image-20210617000438523.png)

  修改conf文件夹中的application.yml

  ![image-20210617001123953](https://storyxc.com/images/blog//image-20210617001123953.png)

  - 开放admin控制台的端口，以默认的8089为例

    开放端口：`firewall-cmd --zone=public --add-port=8089/tcp --permanent`

    配置立即生效：`firewall-cmd --reload`

- 执行bin目录的startup.sh

- 访问8089端口

  ![image-20210617001200010](https://storyxc.com/images/blog//image-20210617001200010.png)

  

- 使用默认账号密码 admin/123456即可登录

- ![image-20210617001457272](https://storyxc.com/images/blog//image-20210617001457272.png)



> > canal-admin的核心模型主要有：
>
> 1. instance，对应canal-server里的instance，一个最小的订阅mysql的队列
> 2. server，对应canal-server，一个server里可以包含多个instance
> 3. 集群，对应一组canal-server，组合在一起面向高可用HA的运维
>
> 简单解释：
>
> 1. instance因为是最原始的业务订阅诉求，它会和 server/集群 这两个面向资源服务属性的进行关联，比如instance A绑定到server A上或者集群 A上，
> 2. 有了任务和资源的绑定关系后，对应的资源服务就会接收到这个任务配置，在对应的资源上动态加载instance，并提供服务
>    - 动态加载的过程，对应配置文件中的autoScan配置，只不过基于canal-admin之后可就以变为远程的web操作，而不需要在机器上运维配置文件
> 3. 将server抽象成资源之后，原本canal-server运行所需要的canal.properties/instance.properties配置文件就需要在web ui上进行统一运维，每个server只需要以最基本的启动配置 (比如知道一下canal-admin的manager地址，以及访问配置的账号、密码即可)

- 新建server，按照图中配置即可

  ![image-20210617001928077](https://storyxc.com/images/blog//image-20210617001928077.png)

  > 配置项：
  >
  > - 所属集群，可以选择为单机 或者 集群。一般单机Server的模式主要用于一次性的任务或者测试任务
  > - Server名称，唯一即可，方便自己记忆
  > - Server Ip，机器ip
  > - admin端口，canal 1.1.4版本新增的能力，会在canal-server上提供远程管理操作，默认值11110
  > - tcp端口，canal提供netty数据订阅服务的端口
  > - metric端口， promethues的exporter监控数据端口 (未来会对接监控)

## canal deployer

- 解压

```bash
tar xzvf canal.deployer-1.1.5.tar.gz -C /home/install/canal/deployer
```

- 用conf目录下的canal_local.properties替换canal.properties

- 执行bin目录下的startup.sh

- 直接在canal admin的webUI界面中配置instance即可
  - ![image-20210617002844737](https://storyxc.com/images/blog//image-20210617002844737.png)
