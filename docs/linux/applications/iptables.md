# iptables



iptables是一个用户级程序，用于操作内核级的网络模块`netfilter`

## 表和链

iptables的功能由表的形式呈现，每张表由若干个链组成，每个链可以分配一组规则

iptables有五张内建表，按照优先级高到底分别是：Raw、Mangle、NAT、Filter、Security

### Raw

此表负责数据包标记，决定数据包是否被状态跟踪机制处理，Raw表有2个内建链

- PREROUTING：用于通过任何网络接口到达的数据包
- OUTPUT：针对本地进程产生的数据包

### Mangle

此表负责更改数据包内容,Mangle表有5个内建链

- PREROUTING
- OUTPUT
- FORWARD
- INPUT
- POSTROUTING

### NAT

此表负责数据包的ip地址转换，NAT表有3种内建链

- PREROUTING：处理刚到达本机并在路由转发前的数据包。它会转换数据包中的目标IP地址（destination ip address），通常用于DNAT(destination NAT)。
- POSTROUTING：处理即将离开本机的数据包。它会转换数据包中的源IP地址（source ip address），通常用于SNAT（source NAT）。
- OUTPUT：处理本机产生的数据包。

### Filter

此表负责过滤数据包，iptables的默认表，具有3种内建链

- INPUT：处理来自外部的数据。
- OUTPUT：处理向外发送的数据。
- FORWARD：将数据转发到本机的其他网卡设备上。

### Security

新加入的特性，用于强制访问控制（MAC）网络规则，有3种内建链

- INPUT
- OUTPUT
- FORWARD

## iptables数据包处理流程图

![v2-6c9358844d8f440486551d925dfe36b5_1440w](https://storyxc.com/images/blog/v2-6c9358844d8f440486551d925dfe36b5_1440w.jpg)

## iptables语法

### 语法

`iptables [-t 表名] 命令选项 [链名] [匹配条件] [-j 策略] `

iptables命令包含五个部分

- 表名：要操作的表，不指定时默认操作Filter表
- 链名：要操作的链，不指定链时默认表内所有链
- 命令选项：要进行的操作

- 匹配条件：定义规则适用哪些数据包（匹配哪些数据包）
- 策略：匹配数据的目标执行的操作，说白了就是packet匹配上规则后该干嘛

### 常见的命令选项

- -A 在指定链的末尾添加（append）一条新的规则
- -D 删除（delete）指定链中的某一条规则，可以按规则序号和内容删除
- -I 在指定链中插入（insert）一条新的规则，默认在第一行添加
- -R 修改、替换（replace）指定链中的某一条规则，可以按规则序号和内容替换
- -L 列出（list）指定链中所有的规则进行查看
- -E 重命名用户定义的链，不改变链本身
- -F 清空（flush）
- -N 新建（new-chain）一条用户自己定义的规则链
- -X 删除指定表中用户自定义的规则链（delete-chain）
- -P 设置指定链的默认策略（policy）
- -Z 将所有表的所有链的字节和数据包计数器清零
- -n 使用数字形式（numeric）显示输出结果
- -v 查看规则表详细信息（verbose）的信息
- -V 查看版本(version)
- -h 获取帮助（help）

### 常见策略（target）

- ACCEPT：允许数据包通过。

- DROP：直接丢弃数据包，不给任何回应信息，这时候客户端会感觉自己的请求泥牛入海了，过了超时时间才会有反应。

- REJECT：拒绝数据包通过，必要时会给数据发送端一个响应的信息，客户端刚请求就会收到拒绝的信息。

- SNAT：源地址转换，解决内网用户用同一个公网地址上网的问题。

- MASQUERADE：是SNAT的一种特殊形式，适用于动态的、临时会变的ip上。

- DNAT：目标地址转换。

- REDIRECT：在本机做端口映射。

### 添加规则

- -A：在链的末尾追加一条规则，例如`iptables -A INPUT -s 127.0.0.1 -p tcp --dport 3306 -j ACCEPT`
- -I：在链的开头（或指定序号）插入一条规则，例如`iptables -I INPUT -p tcp -j ACCEPT`或`iptables -I INPUT 2 -p tcp -j ACCEPT`

### 查看规则

- -L：列出所有规则

- -n：以数字形式显示地址、端口等信息

- -v：显示更详细规则信息

- --line-numbers：显示规则序号

### 删除规则

- 删除nat表INPUT链的第三条规则：`iptables -t nat -D INPUT 3`

- 清空nat表所有规则：`iptables -t nat -F`

### 给指定的链设置默认策略

- `iptables -t filter -P FORWARD DROP`

### 通用匹配

#### 协议匹配 -p（protocol）

- 指定规则的协议，如tcp, udp, icmp等，可以使用**all**来指定所有协议。
- 如果不指定**-p**参数，则默认是**all**值。这并不明智，请总是明确指定协议名称。
- 可以使用协议名(如tcp)，或者是协议值（比如6代表tcp）来指定协议。映射关系请查看/etc/protocols
- 还可以使用**–protocol**参数代替**-p**参数

#### 地址匹配 -s -d：

##### -s 源地址

- 指定数据包的源地址
- 参数可以使IP地址、网络地址、主机名
- 例如：-s 192.168.1.101指定IP地址
- 例如：-s 192.168.1.10/24指定网络地址
- 如果不指定-s参数，就代表所有地址
- 还可以使用**–src**或者**–source**

##### -d 目标地址

- 指定目的地址
- 参数和**-s**相同
- 还可以使用**–dst**或者**–destination**

#### 接口匹配 -i -o

##### -i 输入接口（input interface）

- **-i**代表输入接口(input interface)
- **-i**指定了要处理来自哪个接口的数据包
- 这些数据包即将进入INPUT, FORWARD, PREROUTE链
- 例如：**-i eth0**指定了要处理经由eth0进入的数据包
- 如果不指定**-i**参数，那么将处理进入所有接口的数据包
- 如果出现**!** -i eth0，那么将处理所有经由**eth0以外的接口**进入的数据包
- 如果出现-i eth**+**，那么将处理所有经由**eth开头的接口**进入的数据包
- 还可以使用**–in-interface**参数

##### -o 输出（out interface）

- **-o**代表”output interface”
- **-o**指定了数据包由哪个接口输出
- 这些数据包即将进入FORWARD, OUTPUT, POSTROUTING链
- 如果不指定**-o**选项，那么系统上的所有接口都可以作为输出接口
- 如果出现**!** -o eth0，那么将从**eth0以外的接口**输出
- 如果出现-i eth**+**，那么将仅从**eth开头的接口**输出
- 还可以使用**–out-interface**参数

### 隐含匹配

#### 端口匹配

##### -–sport 源端口（source port） 针对-p tcp 或者 -p udp

- 缺省情况下，将匹配所有端口
- 可以指定端口号或者端口名称，例如”–sport 22″与”–sport ssh”。
- /etc/services文件描述了上述映射关系。
- 从性能上讲，使用端口号更好
- 使用冒号可以匹配端口范围，如”–sport 22:100″
- 还可以使用”–source-port”

##### –-dport 目的端口（destination port） 针对-p tcp 或者 -p udp

- 参数和–sport类似
- 还可以使用”–destination-port”

##### -–tcp-flags TCP标志 针对-p tcp

- 可以指定由逗号分隔的多个参数
- 有效值可以是：SYN, ACK, FIN, RST, URG, PSH
- 可以使用**ALL**或者**NONE**

##### -–icmp-type ICMP类型 针对-p icmp

- –icmp-type 0 表示Echo Reply
- –icmp-type 8 表示Echo

### 显式匹配

多端口匹配 -m multiport --sport 源端口列表 -m multiport --dport 目的端口列表
IP范围匹配 -m iprange --src-range IP范围
MAC地址匹配 -m mac –mac1-source MAC地址
状态匹配 -m state --state 连接状态

```shell
iptables -A INPUT -p tcp -m multiport --dport 25,80,110,143 -j ACCEPT
iptables -A FORWARD -p tcp -m iprange --src-range 192.168.4.21-192.168.4.28 -j ACCEPT
iptables -A INPUT -m mac --mac-source 00:0c:29:c0:55:3f -j DROP
iptables -P INPUT DROP
iptables -I INPUT -p tcp -m multiport --dport 80-82,85 -j ACCEPT
iptables -I INPUT -p tcp -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
```

