# 分布式爬虫和增量式爬虫



## 分布式爬虫

### 概念

搭建集群，让集群对一组资源进行联合爬取

### 作用

提升爬取数据效率

### 实现

- 安装scrapy-redis组件

- 原生scrapy无法实现分布式爬虫

  - 调度器不可被集群共享
  - 管道不可被集群共享

- scrapy-redis组件作用

  - 给原生scrapy提供被共享的调度器和管道

- 实现流程

  - 创建工程

  - 创建一个基于CrawlSpider的爬虫

  - 修改爬虫文件

    - 爬虫文件添加`from scrapy_redis.spiders import RedisCrawlSpider`
    - 注释掉start_urls和allowed_domains
    - 新增属性`redis_key = 'story'`，代表被共享的调度器队列的名称

    - 编写数据解析操作
    - 将当前爬虫类的父类修改成`RedisCrawlSpider`

  - settings配置新增

    - 指定使用可以共享的管道

      ```python
      ITEM_PIPELINES = {
          'scrapy_redis.pipelines.RedisPipeline' : 400
      }
      ```

    - 指定可以共享的调度器

      ```python
      # 增加一个去重容器的配置,使用redis的set来存储请求数据,实现请求去重持久化
      DUPEFLTER_CLASS = "scrapy_redis.dupefilter.RFPDupeFilter"
      # 使用scrapy-redis组件自己的调度器
      SCHEDULER = "scrapy_redis.scheduler.Scheduler"
      # 配置调度器是否要持久化-爬虫结束要不要清空redis请求队列和去重的set
      SCHEDULER_PERSIST = True
      ```

  - 配置redis的配置文件

    - `bind 127.0.0.1`注释掉
    - 关闭保护模式:`protected-mode` 改为no 

  - 启动redis

  - 启动工程，进入到爬虫文件的目录后`scrapy runspider xxx`

  - 向调度器队列中放入起始url

    - `lpush redis_key url`

## 增量式爬虫

### 概念

检测网站数据更新情况，只会爬取网站最新更新的数据

### 实现

- 指定起始url
- 基于CrawlSpider获取其他页码链接
- 基于Rule对其他页码进行请求
- 从每一个页码对应源码中解析出详情页的url
-  ==检测详情页的url是否被请求过（redis/mysql)==
- 对详情页发起请求
- 持久化存储

