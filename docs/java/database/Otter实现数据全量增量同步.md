# Otter实现数据全量增量同步



otter是一款基于数据库增量日志解析，准实时同步到本机房或异地机房的mysql/oracle数据库. 一个分布式数据库同步系统

仓库地址：`https://github.com/alibaba/otter`



## 前置工作

- 源库开启binlog，并且必须是ROW模式

- 需要启动zookeeper

- otter是基于canal的，但是otter项目本身内嵌了canal，所以无需独立启动canal-server

- 初始化otter数据库

  - ```sql
    CREATE DATABASE /*!32312 IF NOT EXISTS*/ `otter` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
    
    USE `otter`;
    
    SET sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
    
    CREATE TABLE `ALARM_RULE` (
      `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
      `MONITOR_NAME` varchar(1024) DEFAULT NULL,
      `RECEIVER_KEY` varchar(1024) DEFAULT NULL,
      `STATUS` varchar(32) DEFAULT NULL,
      `PIPELINE_ID` bigint(20) NOT NULL,
      `DESCRIPTION` varchar(256) DEFAULT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      `MATCH_VALUE` varchar(1024) DEFAULT NULL,
      `PARAMETERS` text DEFAULT NULL,
      PRIMARY KEY (`ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `AUTOKEEPER_CLUSTER` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `CLUSTER_NAME` varchar(200) NOT NULL,
      `SERVER_LIST` varchar(1024) NOT NULL,
      `DESCRIPTION` varchar(200) DEFAULT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `CANAL` (
      `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
      `NAME` varchar(200) DEFAULT NULL,
      `DESCRIPTION` varchar(200) DEFAULT NULL,
      `PARAMETERS` text DEFAULT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      UNIQUE KEY `CANALUNIQUE` (`NAME`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `CHANNEL` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `NAME` varchar(200) NOT NULL,
      `DESCRIPTION` varchar(200) DEFAULT NULL,
      `PARAMETERS` text DEFAULT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      UNIQUE KEY `CHANNELUNIQUE` (`NAME`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `COLUMN_PAIR` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `SOURCE_COLUMN` varchar(200) DEFAULT NULL,
      `TARGET_COLUMN` varchar(200) DEFAULT NULL,
      `DATA_MEDIA_PAIR_ID` bigint(20) NOT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      KEY `idx_DATA_MEDIA_PAIR_ID` (`DATA_MEDIA_PAIR_ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `COLUMN_PAIR_GROUP` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `DATA_MEDIA_PAIR_ID` bigint(20) NOT NULL,
      `COLUMN_PAIR_CONTENT` text DEFAULT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      KEY `idx_DATA_MEDIA_PAIR_ID` (`DATA_MEDIA_PAIR_ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `DATA_MEDIA` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `NAME` varchar(200) NOT NULL,
      `NAMESPACE` varchar(200) NOT NULL,
      `PROPERTIES` varchar(1000) NOT NULL,
      `DATA_MEDIA_SOURCE_ID` bigint(20) NOT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      UNIQUE KEY `DATAMEDIAUNIQUE` (`NAME`,`NAMESPACE`,`DATA_MEDIA_SOURCE_ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `DATA_MEDIA_PAIR` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `PULLWEIGHT` bigint(20) DEFAULT NULL,
      `PUSHWEIGHT` bigint(20) DEFAULT NULL,
      `RESOLVER` text DEFAULT NULL,
      `FILTER` text DEFAULT NULL,
      `SOURCE_DATA_MEDIA_ID` bigint(20) DEFAULT NULL,
      `TARGET_DATA_MEDIA_ID` bigint(20) DEFAULT NULL,
      `PIPELINE_ID` bigint(20) NOT NULL,
      `COLUMN_PAIR_MODE` varchar(20) DEFAULT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      KEY `idx_PipelineID` (`PIPELINE_ID`,`ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `DATA_MEDIA_SOURCE` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `NAME` varchar(200) NOT NULL,
      `TYPE` varchar(20) NOT NULL,
      `PROPERTIES` varchar(1000) NOT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      UNIQUE KEY `DATAMEDIASOURCEUNIQUE` (`NAME`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `DELAY_STAT` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `DELAY_TIME` bigint(20) NOT NULL,
      `DELAY_NUMBER` bigint(20) NOT NULL,
      `PIPELINE_ID` bigint(20) NOT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      KEY `idx_PipelineID_GmtModified_ID` (`PIPELINE_ID`,`GMT_MODIFIED`,`ID`),
      KEY `idx_Pipeline_GmtCreate` (`PIPELINE_ID`,`GMT_CREATE`),
      KEY `idx_GmtCreate_id` (`GMT_CREATE`,`ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `LOG_RECORD` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `NID` varchar(200) DEFAULT NULL,
      `CHANNEL_ID` varchar(200) NOT NULL,
      `PIPELINE_ID` varchar(200) NOT NULL,
      `TITLE` varchar(1000) DEFAULT NULL,
      `MESSAGE` text DEFAULT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      KEY `logRecord_pipelineId` (`PIPELINE_ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `NODE` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `NAME` varchar(200) NOT NULL,
      `IP` varchar(200) NOT NULL,
      `PORT` bigint(20) NOT NULL,
      `DESCRIPTION` varchar(200) DEFAULT NULL,
      `PARAMETERS` text DEFAULT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      UNIQUE KEY `NODEUNIQUE` (`NAME`,`IP`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `PIPELINE` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `NAME` varchar(200) NOT NULL,
      `DESCRIPTION` varchar(200) DEFAULT NULL,
      `PARAMETERS` text DEFAULT NULL,
      `CHANNEL_ID` bigint(20) NOT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      UNIQUE KEY `PIPELINEUNIQUE` (`NAME`,`CHANNEL_ID`),
      KEY `idx_ChannelID` (`CHANNEL_ID`,`ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `PIPELINE_NODE_RELATION` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `NODE_ID` bigint(20) NOT NULL,
      `PIPELINE_ID` bigint(20) NOT NULL,
      `LOCATION` varchar(20) NOT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      KEY `idx_PipelineID` (`PIPELINE_ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `SYSTEM_PARAMETER` (
      `ID` bigint(20) unsigned NOT NULL,
      `VALUE` text DEFAULT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    
    CREATE TABLE `TABLE_HISTORY_STAT` (
      `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
      `FILE_SIZE` bigint(20) DEFAULT NULL,
      `FILE_COUNT` bigint(20) DEFAULT NULL,
      `INSERT_COUNT` bigint(20) DEFAULT NULL,
      `UPDATE_COUNT` bigint(20) DEFAULT NULL,
      `DELETE_COUNT` bigint(20) DEFAULT NULL,
      `DATA_MEDIA_PAIR_ID` bigint(20) DEFAULT NULL,
      `PIPELINE_ID` bigint(20) DEFAULT NULL,
      `START_TIME` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `END_TIME` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      KEY `idx_DATA_MEDIA_PAIR_ID_END_TIME` (`DATA_MEDIA_PAIR_ID`,`END_TIME`),
      KEY `idx_GmtCreate_id` (`GMT_CREATE`,`ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `TABLE_STAT` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `FILE_SIZE` bigint(20) NOT NULL,
      `FILE_COUNT` bigint(20) NOT NULL,
      `INSERT_COUNT` bigint(20) NOT NULL,
      `UPDATE_COUNT` bigint(20) NOT NULL,
      `DELETE_COUNT` bigint(20) NOT NULL,
      `DATA_MEDIA_PAIR_ID` bigint(20) NOT NULL,
      `PIPELINE_ID` bigint(20) NOT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      KEY `idx_PipelineID_DataMediaPairID` (`PIPELINE_ID`,`DATA_MEDIA_PAIR_ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `THROUGHPUT_STAT` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `TYPE` varchar(20) NOT NULL,
      `NUMBER` bigint(20) NOT NULL,
      `SIZE` bigint(20) NOT NULL,
      `PIPELINE_ID` bigint(20) NOT NULL,
      `START_TIME` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `END_TIME` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      KEY `idx_PipelineID_Type_GmtCreate_ID` (`PIPELINE_ID`,`TYPE`,`GMT_CREATE`,`ID`),
      KEY `idx_PipelineID_Type_EndTime_ID` (`PIPELINE_ID`,`TYPE`,`END_TIME`,`ID`),
      KEY `idx_GmtCreate_id` (`GMT_CREATE`,`ID`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE `USER` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `USERNAME` varchar(20) NOT NULL,
      `PASSWORD` varchar(20) NOT NULL,
      `AUTHORIZETYPE` varchar(20) NOT NULL,
      `DEPARTMENT` varchar(20) NOT NULL,
      `REALNAME` varchar(20) NOT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      UNIQUE KEY `USERUNIQUE` (`USERNAME`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE  `DATA_MATRIX` (
      `ID` bigint(20) NOT NULL AUTO_INCREMENT,
      `GROUP_KEY` varchar(200) DEFAULT NULL,
      `MASTER` varchar(200) DEFAULT NULL,
      `SLAVE` varchar(200) DEFAULT NULL,
      `DESCRIPTION` varchar(200) DEFAULT NULL,
      `GMT_CREATE` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
      `GMT_MODIFIED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`ID`),
      KEY `GROUPKEY` (`GROUP_KEY`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    
    CREATE TABLE IF NOT EXISTS `meta_history` (
      `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
      `gmt_create` datetime NOT NULL COMMENT '创建时间',
      `gmt_modified` datetime NOT NULL COMMENT '修改时间',
      `destination` varchar(128) DEFAULT NULL COMMENT '通道名称',
      `binlog_file` varchar(64) DEFAULT NULL COMMENT 'binlog文件名',
      `binlog_offest` bigint(20) DEFAULT NULL COMMENT 'binlog偏移量',
      `binlog_master_id` varchar(64) DEFAULT NULL COMMENT 'binlog节点id',
      `binlog_timestamp` bigint(20) DEFAULT NULL COMMENT 'binlog应用的时间戳',
      `use_schema` varchar(1024) DEFAULT NULL COMMENT '执行sql时对应的schema',
      `sql_schema` varchar(1024) DEFAULT NULL COMMENT '对应的schema',
      `sql_table` varchar(1024) DEFAULT NULL COMMENT '对应的table',
      `sql_text` longtext DEFAULT NULL COMMENT '执行的sql',
      `sql_type` varchar(256) DEFAULT NULL COMMENT 'sql类型',
      `extra` text DEFAULT NULL COMMENT '额外的扩展信息',
      PRIMARY KEY (`id`),
      UNIQUE KEY binlog_file_offest(`destination`,`binlog_master_id`,`binlog_file`,`binlog_offest`),
      KEY `destination` (`destination`),
      KEY `destination_timestamp` (`destination`,`binlog_timestamp`),
      KEY `gmt_modified` (`gmt_modified`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='表结构变化明细表';
    
    CREATE TABLE IF NOT EXISTS `meta_snapshot` (
      `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
      `gmt_create` datetime NOT NULL COMMENT '创建时间',
      `gmt_modified` datetime NOT NULL COMMENT '修改时间',
      `destination` varchar(128) DEFAULT NULL COMMENT '通道名称',
      `binlog_file` varchar(64) DEFAULT NULL COMMENT 'binlog文件名',
      `binlog_offest` bigint(20) DEFAULT NULL COMMENT 'binlog偏移量',
      `binlog_master_id` varchar(64) DEFAULT NULL COMMENT 'binlog节点id',
      `binlog_timestamp` bigint(20) DEFAULT NULL COMMENT 'binlog应用的时间戳',
      `data` longtext DEFAULT NULL COMMENT '表结构数据',
      `extra` text DEFAULT NULL COMMENT '额外的扩展信息',
      PRIMARY KEY (`id`),
      UNIQUE KEY binlog_file_offest(`destination`,`binlog_master_id`,`binlog_file`,`binlog_offest`),
      KEY `destination` (`destination`),
      KEY `destination_timestamp` (`destination`,`binlog_timestamp`),
      KEY `gmt_modified` (`gmt_modified`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='表结构记录表快照表';
    
    
    insert into USER(ID,USERNAME,PASSWORD,AUTHORIZETYPE,DEPARTMENT,REALNAME,GMT_CREATE,GMT_MODIFIED) values(null,'admin','801fc357a5a74743894a','ADMIN','admin','admin',now(),now());
    insert into USER(ID,USERNAME,PASSWORD,AUTHORIZETYPE,DEPARTMENT,REALNAME,GMT_CREATE,GMT_MODIFIED) values(null,'guest','471e02a154a2121dc577','OPERATOR','guest','guest',now(),now());
    
    ```

## manager配置

```
## otter manager domain name
otter.domainName = xxx.com
## otter manager http port
otter.port = 

## otter manager database config
otter.database.driver.class.name = com.mysql.jdbc.Driver
otter.database.driver.url = jdbc:mysql://127.0.0.1:3306/otter?useUnicode=true&characterEncoding=UTF-8&useSSL=false
otter.database.driver.username = 
otter.database.driver.password = 

## otter communication port
otter.communication.manager.port = 1099
## default zookeeper address
otter.zookeeper.cluster.default = 127.0.0.1:2181
```

修改完关键配置后即可执行bin/startup.sh启动manager服务，webUI访问时默认是游客，admin密码默认为`admin`,otter没有提供权限控制，游客用户也能看到所有配置信息，因此不能暴露在公网。

> 坑：startup.sh中的java启动参数-Xss（单个线程栈内存）值都设置的是256k,使用jdk1.8是无法启动的，需要调成大一点例如512k
>
> `The stack size specified is too small, Specify at least 384k`

切换到admin用户后需要配置zookeeper & node信息，这个node的id为1

![image-20230228201401938](https://storyxc.com/images/blog/image-20230228201401938.png)

## node配置

在node/conf下执行`echo 1 > nid`，调整node配置后启动node，看到node状态为已启动即可

![image-20230228201429514](https://storyxc.com/images/blog/image-20230228201429514.png)

## 数据源配置

配置两个数据源，一个作为源库，一个作为目标库

## 数据表配置

表明可以用模糊匹配，也可以指定具体的表

## canal配置

监听源库，开启tsdb监控表结构变化



## 配置Channel

### 添加channel

基于日志变更、行记录模式

### 添加pipeline

select和load机器直接选node，同步数据来源的canal选择刚才配置的

### 配置映射关系列表

添加源表和目标表的映射，视图模式的include/exclude分别代表选中的字段同步/选中的字段排除（不同步），配置好映射关系后保存

> 批量添加
>
> schema1,table1,sourceId1,schema2,table2,sourceId2
>
> schema1,table1,sourceId1为源表信息
>
> schema2,table2,sourceId2为目标表信息
>
> sourceId是数据源的id，在数据源配置页面可以找到
>
> 映射权重 (对应的数字越大，同步会越后面得到同步，优先同步权重小的数据)

## 启动channel

启动channel即可测试源库源表的数据变更后，目标库的目标表是否跟着一起更新。





## 全量数据同步

### 方案1

上述介绍的是增量同步数据的基本操作，但是往往源表中已经有了大量的存量数据需要全量同步一次。

Otter官方提供了一种叫`自由门`的方案可以用于：

- 数据订正
- 全量数据同步

原理是基于otter系统表retl_buffer，插入特定数据，otter系统感知后回根据表明和pk提取对应记录和正常增量同步数据一起同步到目标库

#### 前提

- 已经建好了两个表的同步channel并且启动

#### retl库建表sql

```sql
/*
供 otter 使用， otter 需要对 retl.* 的读写权限，以及对业务表的读写权限
1. 创建database retl
*/
CREATE DATABASE retl;

/* 2. 用户授权 给同步用户授权 */
CREATE USER retl@'%' IDENTIFIED BY 'retl';
GRANT USAGE ON *.* TO `retl`@'%';
GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO `retl`@'%';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON `retl`.* TO `retl`@'%';
/* 业务表授权，这里可以限定只授权同步业务的表 */
GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO `retl`@'%';  

/* 3. 创建系统表 */
USE retl;
DROP TABLE IF EXISTS retl.retl_buffer;
DROP TABLE IF EXISTS retl.retl_mark;
DROP TABLE IF EXISTS retl.xdual;

CREATE TABLE retl_buffer
(	
	ID BIGINT(20) AUTO_INCREMENT,
	TABLE_ID INT(11) NOT NULL,
	FULL_NAME varchar(512),
	TYPE CHAR(1) NOT NULL,
	PK_DATA VARCHAR(256) NOT NULL,
	GMT_CREATE TIMESTAMP NOT NULL,
	GMT_MODIFIED TIMESTAMP NOT NULL,
	CONSTRAINT RETL_BUFFER_ID PRIMARY KEY (ID) 
)  ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE retl_mark
(	
	ID BIGINT AUTO_INCREMENT,
	CHANNEL_ID INT(11),
	CHANNEL_INFO varchar(128),
	CONSTRAINT RETL_MARK_ID PRIMARY KEY (ID) 
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE xdual (
  ID BIGINT(20) NOT NULL AUTO_INCREMENT,
  X timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ID)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/* 4. 插入初始化数据 */
INSERT INTO retl.xdual(id, x) VALUES (1,now()) ON DUPLICATE KEY UPDATE x = now();
```

#### 全量同步操作

```
insert into retl.retl_buffer(ID,TABLE_ID, FULL_NAME,TYPE,PK_DATA,GMT_CREATE,GMT_MODIFIED) (select null,0,'$schema.table$','I',id,now(),now() from $schema.table$); 
```

> 例如：insert into retl.retl_buffer(ID,TABLE_ID, FULL_NAME,TYPE,PK_DATA,GMT_CREATE,GMT_MODIFIED) (select null,0,'test.user','I',id,now(),now() from test.user); 





### 方案2

上述基于数据库插入记录触发otter同步的方案，如果数据量大会比较耗时。也可以直接把源表数据导出并记录导出时binlog的position，先将全量数据导入一次目标表，再基于导出数据时的binlog的position进行增量同步。

#### 导出数据

`mysqldump -uxxx -pxxx --single-transaction --master-data=2 --databases xxx --tables xxx > data.sql`

这样，导出的data.sql文件中会有一行信息，记录导出时的binlog文件和position

![image-20230228203126413](https://storyxc.com/images/blog/image-20230228203126413.png)

#### 导入数据

在目标库执行导入sql

#### 配置canal的读取postion

![image-20230228203443257](https://storyxc.com/images/blog/image-20230228203443257.png)

后续新建channel的操作和普通增量同步一样即可。


## 踩坑

### 更换zookeeper后manager webui无法访问
更换zookeeper后，manager管理页面无法进入，报错内容类似`org.I0Itec.zkclient.exception.ZkNoNodeException: org.apache.zookeeper.KeeperException$NoNodeException: KeeperErrorCode = NoNode for /otter/channel/3/3/process`。原因是otter会在zookepper中存储一些节点信息，更换zookeeper后，需要复制节点数据，或者删除数据库中的channel、pipeline等表的数据内容
或者访问 http://域名:端口/system_reduction.htm，点击一键修复即可。

### canal指定的binlog被清除
`show master logs`
`show binlog events in 'binlog.000048' from 1226 limit 4;`
更新canal中的位点配置重新启动

### 读取从库binlog
- 低权限用户需要授权，否则无法读取binlog`GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'xxx'@'%' IDENTIFIED BY '';`
- 从库需要设置`log_slave_updates=1`，将主库binlog中的操作写入到从库的binlog中，默认是关闭的，虽然数据可以同步，但是从库binlog没有记录这些内容。