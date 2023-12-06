# Docker容器内访问MacOS宿主机中的kafka

## kafka配置

```properties
# server.properties
listeners=PLAINTEXT://:9092
advertised.listeners=PLAINTEXT://host.docker.internal:9092
```

## /etc/hosts配置

```bash
127.0.0.1 host.docker.internal
```

## 验证

```shell
# List brokers and topics in cluster
$ docker run -it --rm --network=host --platform=linux/amd64 edenhill/kcat:1.7.1 -b host.docker.internal -L
```

## 原理

### 连接kafka的broker过程

- kafka客户端通过`bootstrap.servers`配置的地址去连接kafka的broker
- broker会返回`advertised.listeners`配置的地址给kafka客户端
- kafka客户端会通过`advertised.listeners`配置的地址去连接kafka的broker

### 分析

#### 容器内连接

如果kafka只配置`listeners=PLAINTEXT://:9092`而不配置`advertised.listeners=PLAINTEXT://host.docker.internal:9092`，那么kafka容器内部的客户端是无法访问到kafka的，因为kafka容器内部的客户端会通过`advertised.listeners`配置的地址去访问kafka，而默认的`advertised.listeners`配置和`listeners`一致，也是`PLAINTEXT://:9092`，对于容器内的客户端来说这个地址是容器内部的地址，所以容器内部的客户端无法访问到宿主机kafka。因此要加上`advertised.listeners=PLAINTEXT://host.docker.internal:9092`。

#### 宿主机上连接

因为配置了`advertised.listeners=PLAINTEXT://host.docker.internal:9092`，所以宿主机上的客户端也会通过`host.docker.internal:9092`访问kafka的broker，所以要在`/etc/hosts`中增加解析`host.docker.internal`到本地回环地址的配置。