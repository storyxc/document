# kafka常用命令记录

> 环境信息：MacOS 13.4.1
>
> Kafka版本：Homebrew Kafka_3.4.0

## topic

##### 新建topic

`kafka-topics --create --topic topic-name --partitions 4 --replication-factor 2 --bootstrap-server localhost:9092`

##### 查看所有topic

`kafka-topics --bootstrap-server 127.0.0.1:9092 --list`

##### 查看topic信息

`kafka-topics --bootstrap-server 127.0.0.1:9092 --describe --topic topic-name`

##### 修改topic分区数

`kafka-topics --bootstrap-server 127.0.0.1:9092 --alter --partitions 2 --topic topic-name`

##### 删除topic

`kafka-topics --bootstrap-server 127.0.0.1:9092 --delete --topic topic-name`

## 消费者组

##### 查看所有消费者组

`kafka-consumer-groups --bootstrap-server 127.0.0.1:9092 --list`

##### 查看消费者组详情

`kafka-consumer-groups --bootstrap-server 127.0.0.1:9092 --describe --group topic-name`

##### 查看消费者组里具体成员

`kafka-consumer-groups --bootstrap-server 127.0.0.1:9092 --describe --members --group topic-name`

## 消费者console

##### 查看topic中的所有消息

`kafka-console-consumer --bootstrap-server 127.0.0.1:9092  --topic topic-name --from-beginning`

##### 指定分区、offset的消息

`kafka-console-consumer --bootstrap-server 127.0.0.1:9092 --topic topic-name --partition 0 --offset 1`