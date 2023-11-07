# kafka实践

## 下载

官方地址:https://kafka.apache.org/downloads.html

## kafka入门介绍

### kafka作为一个分布式流平台，意味着什么

- 发布和订阅消息（流），在这方面它类似一个消息队列
- 以容错（故障转移）的方式存储消息（流）
- 在消息流发生时处理它们

### kafka的优势

- 构建实时的数据管道，可靠的获取系统和应用程序间的数据
- 构建实时流的应用程序，对数据流进行转换或反应

### kafka的几个概念

- kafka作为集群运行在一个或多个服务器上
- kafka集群存储的消息是以topic为类别记录的
- 每个消息由一个key，一个value和时间戳构成

### kafka四个核心API

- Product API：发布消息到一个或多个topic中
- Consumer API：订阅一个或多个topic，并处理产生的消息
- Streams API：充当一个流处理器 ，从一个或多个topic消费输入流，并产生一个输出流到一个或多个输出topic，有效地将输入流转换到输出流
- Connector API：可构建或运行可重用的生产者或消费者，将topic连接到现有的应用程序或数据系统。例如连接到关系型数据库的连接器可以捕捉表的每个变更

## 快速启动kafka

官方文档:http://kafka.apache.org/quickstart

::: tip

强烈建议新学习一项新内容的时候尽量阅读英文原版文档

:::

### 启动kafka需要的运行环境

使用kafka自带的zookeeper启动

```bash
tar -xzf kafka_2.13-2.8.0.tgz
cd kafka_2.13-2.8.0
bin/zookeeper-server-start.sh config/zookeeper.properties & #后台启动
```

> 在kafka0.5x版本后已经自带了zookeeper, 而在最新的kafka2.8版本中,不再需要zookeeper服务,官网把这种称之为KRaft模式

### 打开另一个命令终端启动kafka服务

```bash
bin/kafka-server-start.sh config/server.properties
```

等所有服务等启动完毕,kafka就已经是可用的了

### 创建一个主题(topic)

创建一个名为quickstart-events的topic,只有一个分区和一个备份

```bash
bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic quickstart-events

查看已创建的topic信息

​```bash
[root@localhost kafka_2.13-2.8.0]# bin/kafka-topics.sh --describe --topic quickstart-events --bootstrap-server localhost:9092
Topic: quickstart-events        TopicId: iOM06pJVQV-y_A6QkmfeHw PartitionCount: 1       ReplicationFactor: 1  Configs: segment.bytes=1073741824
        Topic: quickstart-events        Partition: 0    Leader: 0       Replicas: 0     Isr: 0
```

### 发送消息到Topic

kafka提供了一个命令行工具,可以从输入文件或命令行中读取消息并发送给kafka集群,每一行是一条消息.运行`producer(生产者)`
,然后再控制台输入几条消息到服务器

```bash
bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
```

输入此命令后进入交互模式,便可以开始发送消息到topic

```bash
>hello
>hello world
>this is first kafka message
>
```

可以使用`Ctrl+C`退出交互模式

### 消费Topic中的消息

打开另外一个终端窗口运行命令

```bash
bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092
```

可以看到输出了刚才我们通过生产者终端发送的消息

```bash
hello
hello world
this is first kafka message
```

此时如果我们再在生产者终端发送消息,消费者终端也能实时进行消费,同样可以使用`Ctrl+C`
退出消费者的交互模式,消息会被持久化到kafka中,所以消息可以被消费多次以及被多个消费者消费,比如我们再打开一个窗口,执行消费的命令

```bash
[root@localhost kafka_2.13-2.8.0]# bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092
hello
hello world
this is first kafka message

可以看到,新的消费者又消费到了刚才的消息


```

## Kafka的Java客户端

### 依赖

```xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
</dependency>
<dependency>
<groupId>org.apache.kafka</groupId>
<artifactId>kafka-streams</artifactId>
</dependency>
<dependency>
<groupId>org.springframework.kafka</groupId>
<artifactId>spring-kafka</artifactId>
</dependency>

<dependency>
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-test</artifactId>
<scope>test</scope>
</dependency>
<dependency>
<groupId>org.springframework.kafka</groupId>
<artifactId>spring-kafka-test</artifactId>
<scope>test</scope>
</dependency>
```

### 修改kafka配置

```bash
修改config/server.properties
listeners=PLAINTEXT://0.0.0.0:9092
advertised.listeners=PLAINTEXT://192.168.174.130:9092
```

### 开放虚拟机端口9092

`firewall-cmd --zone=public --add-port=9092/tcp --permanent`

`firewall-cmd --reload`

### 生产者

```java
/**
 * @author xc
 * @description
 * @createdTime 2021/5/10 23:58
 */
public class KafkaProducerTests {
    @Test
    void kafkaProducerTest() {
        Properties properties = new Properties();
        properties.put("bootstrap.servers", "192.168.174.130:9092");
        properties.put("acks", "all");
        properties.put("retries", 0);
        properties.put("batch.size", 16384);
        properties.put("linger.ms", 1);
        properties.put("buffer.memory", 33554432);
        properties.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        properties.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        KafkaProducer<String, String> producer = new KafkaProducer<>(properties);
        for (int i = 0; i < 100; i++) {
            producer.send(new ProducerRecord<String, String>("test", Integer.toString(i), "Kafka message " + i));
            System.out.println("发送了消息");
        }
        producer.close();

    }
}
```

- `send()`方法是异步的,添加消息到缓冲区等待发送并立即return,生产者会将单个消息批量在一起进行发送

- `ack`是判断是否发送成功的,`all`将会阻塞消息,这种性能是最低的,但是是最可靠的

- `retries`,如果请求失败,生产者会自动重试,如果启用重试,可能会产生重复消息

- producer缓存每个分区未发送的消息,缓存的大小通过`batch.size`配置指定,数值较大会产生更大的批次并需要更大的内存

  默认缓冲可立即发送,即使缓存空间没有满,但是如果想减少请求的数量,可设置`linger.ms`大于0,这将让生产者在发送请求前等待一会儿,希望更多的消息来填补到缓冲区中

- `buffer.memory`
  控制生产者可用的缓存总量,如果消息发送速度比其传输到服务器的快,将会耗尽缓存空间,当缓存空间耗尽时,其他发送调用将会被阻塞,阻塞实践的阈值通过`max.block.ms`
  设定,之后它将抛出一个TimeoutException

- `key.serializer`和`value.serializer`将用户提供的key和value对象ProducerRecord转换成字节,可以使用附带 的*
  *ByteArraySerializer**或**StringSeriializer**处理byte或string类型

### 消费者

```java
/**
 * @author xc
 * @description
 * @createdTime 2021/5/10 23:59
 */
public class KafkaConsumerTests {
    @Test
    void kafkaConsumerTest(){
        Properties props = new Properties();
        props.setProperty("bootstrap.servers", "192.168.174.130:9092");
        props.setProperty("group.id", "test");
        props.setProperty("enable.auto.commit", "true");
        props.setProperty("auto.commit.interval.ms", "1000");
        props.setProperty("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.setProperty("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
        consumer.subscribe(Collections.singletonList("test"));
        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
            for (ConsumerRecord<String, String> record : records)
                System.out.printf("offset = %d, key = %s, value = %s%n", record.offset(), record.key(), record.value());
        }
    }
}
```

- `enable.auto.commit`自动提交偏移量,`auto.commit.interval.ms`控制提交的频率
- 客户端订阅了名为`test`的topic,消费者组叫test
-
broker通过心跳检测test消费组中的进程,消费者会自动ping集群,告诉集群他还活着,只要消费者停止心跳的时间超过了`session.timeout.ms`
就会被认定为故障,它的分区将会被分配到别的进程

### 启动

先启动消费者,后启动生产者,可以看到消费者的终端输出了

```bash
offset = 502, key = 0, value = Kafka message 0
offset = 503, key = 1, value = Kafka message 1
offset = 504, key = 2, value = Kafka message 2
offset = 505, key = 3, value = Kafka message 3
offset = 506, key = 4, value = Kafka message 4
offset = 507, key = 5, value = Kafka message 5
offset = 508, key = 6, value = Kafka message 6
offset = 509, key = 7, value = Kafka message 7
offset = 510, key = 8, value = Kafka message 8
offset = 511, key = 9, value = Kafka message 9
offset = 512, key = 10, value = Kafka message 10
offset = 513, key = 11, value = Kafka message 11
offset = 514, key = 12, value = Kafka message 12
offset = 515, key = 13, value = Kafka message 13
offset = 516, key = 14, value = Kafka message 14
offset = 517, key = 15, value = Kafka message 15
offset = 518, key = 16, value = Kafka message 16
offset = 519, key = 17, value = Kafka message 17
offset = 520, key = 18, value = Kafka message 18
offset = 521, key = 19, value = Kafka message 19
offset = 522, key = 20, value = Kafka message 20
......
```

## springboot集成kafka

### 依赖

```xml

<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
```

### 生产者

```java
/**
 * @author xc
 * @description
 * @createdTime 2021/5/10 21:49
 */
@RestController
@RequestMapping("/kafka")
public class KafkaDemoProducer {

    @Autowired
    private KafkaTemplate kafkaTemplate;

    @GetMapping("/send/{msg}")
    public String sendMessage(@PathVariable String msg) {
        ListenableFuture send = kafkaTemplate.send("springboot-kafka", "测试发送:" + msg + "-" + System.currentTimeMillis());
        System.out.println(send);
        return "发送成功";
    }
}
```

### 消费者

```java
/**
 * @author xc
 * @description
 * @createdTime 2021/5/15 23:55
 */
@Component
public class KafkaDemoConsumer {


    @KafkaListener(topics = {"springboot-kafka"})
    public void onReceive(ConsumerRecord<?, ?> record) {
        System.out.println("接收消息:" + record.topic() + "-" + record.partition() + "-" + record.value());
    }
}
```

### 测试

- 启动应用

- 发送消息

  ![](https://storyxc.com/images/blog//image-20210516155645928.png)

- 日志

```bash
2021-05-16 15:56:18.430  INFO 10808 --- [nio-8080-exec-1] o.a.kafka.common.utils.AppInfoParser     : Kafka version: 2.6.0
2021-05-16 15:56:18.430  INFO 10808 --- [nio-8080-exec-1] o.a.kafka.common.utils.AppInfoParser     : Kafka commitId: 62abe01bee039651
2021-05-16 15:56:18.430  INFO 10808 --- [nio-8080-exec-1] o.a.kafka.common.utils.AppInfoParser     : Kafka startTimeMs: 1621151778430
2021-05-16 15:56:18.435  INFO 10808 --- [ad | producer-1] org.apache.kafka.clients.Metadata        : [Producer clientId=producer-1] Cluster ID: t54vUJ_qTWm-o8WmD-dfag
org.springframework.util.concurrent.SettableListenableFuture@2a59dc33
接收消息:springboot-kafka-0-测试发送:hello-1621151778418
```

