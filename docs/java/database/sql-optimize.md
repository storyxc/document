# SQL优化学习


## MySQL查询的流程
![v233c07d2bec1fd9f093e45fd448aaacfa_hd.jpg](https://storyxc.com/images/blog//v2-33c07d2bec1fd9f093e45fd448aaacfa_hd.jpg)
- 客户端将查询发送至服务器
- 服务器检查查询缓存，如果找到了，就从缓存中返回结果，否则进行下一步
- 服务器解析，预处理
-  查询优化器优化查询
-  生成执行计划，执行引擎调用存储引擎API执行查询
- 服务器将结果发送回客户端



### 1.客户端连接阶段

`show processlist`命令可以查看mysql连接的状态，以我自己的阿里云服务器为例

![1.png](https://storyxc.com/images/blog//058461b82cd84f30b2f0f58005a8cd04.png)

常见的状态：

- Sleep：线程正在等待客户端发送数据
- Query：连接线程正在执行查询
- Locked：线程正在等待表锁的释放
- Sorting result：线程正在对结果进行排序
- Sending data：向请求端返回数据

完整状态列表说明请见官网[地址](https://dev.mysql.com/doc/refman/5.7/en/general-thread-states.html)

### 2.查询缓存

在解析一个查询语句之前，==如果查询缓存是打开的==(默认是关闭的,浪费性能)，那么MySQL会优先检查这个查询是否命中查询缓存中的数据，如果命中缓存直接从缓存中拿到结果并返回给客户端。这种情况下，查询不会被解析，不用生成执行计划，不会被执行。

可以使用`show variables like 'query_cache%'`来查看缓存的设置情况

![Snipaste_20210302_130903](https://storyxc.com/images/blog//Snipaste_2021-03-02_13-09-03.png)
如图,`query_cache_type`一栏时OFF关闭状态,如要开启可以修改my.cnf文件设置query_cache_type=1

query_cache_type=0时表示关闭，1时表示打开，2表示只要select 中明确指定SQL_CACHE才缓存。

### 3.解析、预处理、优化阶段

MySQL通过关键字将SQL语句进行解析，并生成一棵对应的“解析树”。MySQL解析器将使用MySQL语法规则验证和解析查询。语法树被校验合法后由优化器转成查询计划，一条语句可以有很多种执行方式，最后返回相同的结果。优化器的作用就是找到这其中最好的执行计划。

执行计划可以用==explain==命令查看，详见后文。

### 4.查询执行引擎

在解析和优化阶段，MySQL将生成查询对应的执行计划，MySQL的查询执行引擎则根据这个执行计划来完成整个查询。最常使用的也是比较最多的引擎是MyISAM引擎和InnoDB引擎。mysql5.5开始的默认存储引擎已经变更为innodb。





## 慢查询

可以使用`show variable like 'long_query_time'`命令来查看慢查询的时间

![Snipaste_20210302_134903.png](https://storyxc.com/images/blog//Snipaste_2021-03-02_13-49-03.png)

可以看到MySQL中默认的慢查询为10s，然而这个时间属于根本无法接受的地步了,可以将这个时间设置为业务可以接受的范围.

一般的慢SQL定位:业务驱动,测试驱动,慢查询日志

### 开启慢查询日志

使用`SHOW VARIABLES LIKE 'SLOW_QUERY_LOG'`命令查看是否开启了慢查询日志保存

![Snipaste_20210302_135529.png](https://storyxc.com/images/blog//Snipaste_2021-03-02_13-55-29.png)

可以看到默认是没有开启的

可以使用以下命令开启保存慢查询日志(==重启mysql后会失效==)   

```sql
set global slow_query_log = on //-- 打开慢日志
set global slow_query_log_file = '/var/lib/mysql/test-slow.log' //--慢日志保存位置
set global log_queries_not_using_indexes = on //-- 没有命中索引的是否要记录慢日志
set global long_query_time = 2 (秒) //-- 执行时间超过多少为慢日志
```

或者直接修改my.cnf文件添加相应配置后重启mysql(==永久生效==)





## Explain命令

EXPLAIN可以帮助开发人员分析SQL问题，EXPLAIN显示了MySQL如何使用使用SQL执行计划，可以帮助开发人员写出更优化的查询语句。使用方法，在select语句前加上Explain就可以了

例如:`EXPLAIN SELECT * FROM ARTICLE WHERE ARTICLE_ID = '1'`

![Snipaste_20210302_145846.png](https://storyxc.com/images/blog//Snipaste_2021-03-02_14-58-46.png)
结果列说明:

### 1.id

这是SELECT的查询序列号,表示查询中执行select子句或操作表的顺序,id相同，执行顺序从上到下,id不同，id值越大执行优先级越高

### 2.select_type

表示SELECT语句的类型

- SIMPLE:简单的select查询(不使用连接查询或者子查询)
- PRIMARY:表示主查询，或者是最外层的查询语句，最外层查询为PRIMARY，也就是最后加载的就是PRIMARY
- UNION:表示连接查询的第二个或者后面的查询语句,不依赖外部查询的结果集
- DEPENDENT UNION:union中的第二个或后面的select语句，取决于外面的查询。
- UNION RESULT:连接查询的结果；
-  SUBQUERY:子查询中的第1个SELECT语句；不依赖于外部查询的结果集
- DEPENDENT SUBQUERY:子查询中的第1个SELECT，依赖于外面的查询；
- DERIVED:导出表的SELECT（FROM子句的子查询）,MySQL会递归执行这些子查询，把结果放在临时表里
- DEPENDENT DERIVED:派生表依赖于另一个表
- MATERIALIZED:物化子查询
- UNCACHEABLE SUBQUERY:子查询，其结果无法缓存，必须针对外部查询的每一行重新进行评估

- UNCACHEABLE UNION:UNION中的第二个或随后的 select 查询，属于不可缓存的子查询



### 3.table 

表示查询的表

### 4.type

表示表的连接类型,从最好到最差的连接类型为

system > const > eq_ref > ref > ref_or_null > index_merge > unique_subquery > index_subquery > range > index > ALL

1. **system**：表仅有一行，这是const类型的特列，平时不会出现，这个也可以忽略不计。

2. **const**：数据表最多只有一个匹配行，因为只匹配一行数据，所以很快

3. **eq_ref**：mysql手册是这样说的:"对于每个来自于前面的表的行组合，从该表中读取一行。这可能是最好的联接类型，除了const类型。它用在一个索引的所有部分被联接使用并且索引是UNIQUE或PRIMARY KEY"。eq_ref可以用于使用=比较带索引的列。

4. **ref**：查询条件索引既不是UNIQUE也不是PRIMARY KEY的情况。ref可用于=或<或>操作符的带索引的列。

5. **ref_or_null**：该连接类型如同ref，但是添加了MySQL可以专门搜索包含NULL值的行。在解决子查询中经常使用该联接类型的优化。

6. **index_merge**：该连接类型表示使用了索引合并优化方法。在这种情况下，key列包含了使用的索引的清单，key_len包含了使用的索引的最长的关键元素。

7. **unique_subquery**：该类型替换了下面形式的IN子查询的ref: value IN (SELECT primary_key FROM single_table WHERE some_expr) unique_subquery是一个索引查找函数,可以完全替换子查询,效率更高。

8. **index_subquery**：该连接类型类似于unique_subquery。可以替换IN子查询,但只适合下列形式的子查询中的非唯一索引: value IN (SELECT key_column FROM single_table WHERE some_expr)

9. **range**：只检索给定范围的行,使用一个索引来选择行。key列显示使用了哪个索引。key_len包含所使用索引的最长关键元素。当使用＝、＜＞、＞、＞＝、＜、＜＝、IS NULL、＜＝＞、BETWEEN或者IN操作符用常量比较关键字列时，类型为range

10. **index**：该连接类型与ALL相同,除了只有索引树被扫描。通常比ALL快,因为索引文件通常比数据文件小。

    这个类型发生在这两种方式：

    **1)**如果索引是查询的覆盖索引，并且可用于满足表中所需的所有数据，则仅扫描索引树。在这种情况下，Extra列显示为 Using index  

     **2)**使用对索引的读取执行全表扫描，以按索引顺序查找数据行。 Uses index没有出现在 Extra列中。

11. **ALL**：对于每个来自于先前的表的行组合,进行完整的表扫描。（性能最差）



### 5.possible_keys

指MySQL能使用哪个索引在该表中找到行。如果为空，没有相关的索引。这时如果要提升性能，可以通过检验WHERE子句，看它是否引用某些列或适合索引的列来提高查询性能。如果是这样，可以创建适合的索引来提高查询的性能。

### 6.key

表示查询实际使用的索引，如果没有选择索引，该列的值是NULL。如果为primary的话，表示使用了主键。要想强制MySQL使用或忽视possible_keys列中的索引，在查询中使用FORCE INDEX、USE INDEX或者IGNORE INDEX

### 7.key_len

表示MySQL选择的索引字段按字节计算的长度，若键是NULL，则长度为NULL。通过key_len值可以确定MySQL将实际使用一个多列索引中的几个字段

### 8.ref

表示使用哪个列或常数与索引一起来查询记录。

### 9.rows

显示MySQL在表中进行查询时必须检查的行数。

### 10.extra

表示MySQL在处理查询时的详细信息

* Distinct:MySQL发现第1个匹配行后,停止为当前的行组合搜索更多的行。
* Not exists:MySQL能够对查询进行LEFT JOIN优化,发现1个匹配LEFT JOIN标准的行后,不再为前面的的行组合在该表内检查更多的行。
* range checked for each record (index map: #):MySQL没有发现好的可以使用的索引,但发现如果来自前面的表的列值已知,可能部分索引可以使用。
* Using filesort:MySQL需要额外的一次传递,以找出如何按排序顺序检索行。
* Using index:从只使用索引树中的信息而不需要进一步搜索读取实际的行来检索表中的列信息。
* Using temporary:为了解决查询,MySQL需要创建一个临时表来容纳结果。
* Using where:WHERE 子句用于限制哪一个行匹配下一个表或发送到客户。
* Using sort_union(...), Using union(...), Using intersect(...):这些函数说明如何为index_merge联接类型合并索引扫描。
* Using index for group-by:类似于访问表的Using index方式,Using index for group-by表示MySQL发现了一个索引,可以用来查 询GROUP BY或DISTINCT查询的所有列,而不要额外搜索硬盘访问实际的表。





**贴一个美团技术团队的文章:[MySQL索引原理及慢查询优化](https://tech.meituan.com/2014/06/30/mysql-index.html),以下内容引用自该文章**


## 建索引的几大原则

1.最左前缀匹配原则，非常重要的原则，mysql会一直向右匹配直到遇到范围查询(>、<、between、like)就停止匹配，比如a = 1 and b = 2 and c > 3 and d = 4 如果建立(a,b,c,d)顺序的索引，d是用不到索引的，如果建立(a,b,d,c)的索引则都可以用到，a,b,d的顺序可以任意调整。

2.=和in可以乱序，比如a = 1 and b = 2 and c = 3 建立(a,b,c)索引可以任意顺序，mysql的查询优化器会帮你优化成索引可以识别的形式。

3.尽量选择区分度高的列作为索引，区分度的公式是count(distinct col)/count(*)，表示字段不重复的比例，比例越大我们扫描的记录数越少，唯一键的区分度是1，而一些状态、性别字段可能在大数据面前区分度就是0，那可能有人会问，这个比例有什么经验值吗？使用场景不同，这个值也很难确定，一般需要join的字段我们都要求是0.1以上，即平均1条扫描10条记录。

4.索引列不能参与计算，保持列“干净”，比如from_unixtime(create_time) = ’2014-05-29’就不能使用到索引，原因很简单，b+树中存的都是数据表中的字段值，但进行检索时，需要把所有元素都应用函数才能比较，显然成本太大。所以语句应该写成create_time = unix_timestamp(’2014-05-29’)。

5.尽量的扩展索引，不要新建索引。比如表中已经有a的索引，现在要加(a,b)的索引，那么只需要修改原来的索引即可。



## 慢查询优化基本步骤

0.先运行看看是否真的很慢，注意设置SQL_NO_CACHE

1.where条件单表查，锁定最小返回记录表。这句话的意思是把查询语句的where都应用到表中返回的记录数最小的表开始查起，单表每个字段分别查询，看哪个字段的区分度最高

2.explain查看执行计划，是否与1预期一致（从锁定记录较少的表开始查询）

3.order by limit 形式的sql语句让排序的表优先查

4.了解业务方使用场景

5.加索引时参照建索引的几大原则

6.观察结果，不符合预期继续从0分析

