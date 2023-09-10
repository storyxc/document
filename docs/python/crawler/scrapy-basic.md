# scrapy框架入门

高性能的持久化存储，高性能的数据解析，分布式。

## 使用

- 安装：`pip install scrapy`
- 创建项目：`scrapy startproject yourProjectName`



```bash
story_spider/
    scrapy.cfg            # 部署配置文件

    story_spider/             # Python模块,代码写在这个目录下
        __init__.py

        items.py          # 项目项定义文件

        pipelines.py      # 项目管道文件

        settings.py       # 项目设置文件

        spiders/          # 我们的爬虫/蜘蛛 目录
            __init__.py
```

- 在spiders目录中创建一个爬虫文件
  - `cd 项目目录`（spriders文件夹所在的目录）
  - `scrapy genspider storyxc storyxc.com`

- 爬虫文件内容

  ```python
  import scrapy
  	
  
  # 必须继承scrapy.Spider
  class StoryxcSpider(scrapy.Spider):
      # 爬虫文件的名称:爬虫源文件的一个唯一标识
      name = 'storyxc'
      # 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送
      allowed_domains = ['storyxc.com']
      # 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送
      start_urls = ['https://www.storyxc.com/', 'http://blog.storyxc.com']
  
      # 用作数据解析:response参数表示的是请求成功后的响应对象
      def parse(self, response):
          print(response)
  ```

  >修改settings.py中的ROBOTSTXT_OBEY = False
  >
  >执行工程命令后可以加 --nolog
  >
  >也可以在setting.py中添加：
  >
  >```
  >#显示指定级别的日志信息
  >LOG_LEVEL = 'ERROR' 
  >```

- 执行工程`scrapy crawl storyxc`，日志信息

  ```bash
  <200 https://www.storyxc.com/>
  <200 https://blog.storyxc.com/>
  ```

  

## scrapy数据解析

解析糗事百科段子的作者和段子内容

```python
import scrapy


# 必须继承scrapy.Spider
class StoryxcSpider(scrapy.Spider):
    # 爬虫文件的名称:爬虫源文件的一个唯一标识
    name = 'storyxc'
    # 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送
    # allowed_domains = ['storyxc.com']
    # 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送
    start_urls = ['https://www.qiushibaike.com/text/']

    # 用作数据解析:response参数表示的是请求成功后的响应对象
    def parse(self, response):
        # 解析:作者的名称+段子内容
        div_list = response.xpath('//div[@id="content"]/div/div[2]/div')
        for div in div_list:
            # extract()方法可以提取Selector对象中的data参数字符串
            # extract_first()提取的是list数组里面的第一个字符串,
            author = div.xpath('./div[1]/a[2]/h2/text()').extract_first()
            # 列表调用了extract()表示将每一个Selector对象中的data字符串提取出来
            content = ''.join(div.xpath('./a[1]/div[1]/span//text()').extract())
            print(author,content)
```

## 基于终端指令持久化存储

代码改造：

```python
import scrapy


# 必须继承scrapy.Spider
class StoryxcSpider(scrapy.Spider):
    # 爬虫文件的名称:爬虫源文件的一个唯一标识
    name = 'storyxc'
    # 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送
    # allowed_domains = ['storyxc.com']
    # 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送
    start_urls = ['https://www.qiushibaike.com/text/']

    # 用作数据解析:response参数表示的是请求成功后的响应对象
    def parse(self, response):
        # 解析:作者的名称+段子内容
        div_list = response.xpath('//div[@id="content"]/div/div[2]/div')
        data_list = []
        for div in div_list:
            # extract()方法可以提取Selector对象中的data参数字符串
            # extract_first()提取的是list数组里面的第一个字符串,
            author = div.xpath('./div[1]/a[2]/h2/text()').extract_first()
            # 列表调用了extract()表示将每一个Selector对象中的data字符串提取出来
            content = ''.join(div.xpath('./a[1]/div[1]/span//text()').extract())
            dict = {
                'author':author,
                'content':content
            }
            data_list.append(dict)
        return data_list
```

- 只能将parse方法返回的内容存储到本地文件中
- 持久化存储的格式只有'json', 'jsonlines', 'jl', 'csv', 'xml', 'marshal', 'pickle'
- 指令：`scrapy crawl xxx -o path`

## 基于管道持久化存储

流程：

- 数据解析
- 在item类中定义相关的属性
  - fieldName = scrapy.Field()
- 将解析的数据封装存储到Item类型的对象中

- 将item类型的对象提交给管道进行持久化存储的操作

- 在管道类的process_item函数中要将其接受到的item对象中存储的数据进行持久化操作

- 在settings.py中开启管道



### 代码改造

```Python
import scrapy
from story_spider.items import StorySpiderItem


# 必须继承scrapy.Spider
class StoryxcSpider(scrapy.Spider):
    # 爬虫文件的名称:爬虫源文件的一个唯一标识
    name = 'storyxc'
    # 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送
    # allowed_domains = ['storyxc.com']
    # 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送
    start_urls = ['https://www.qiushibaike.com/text/']

    # 用作数据解析:response参数表示的是请求成功后的响应对象
    def parse(self, response):
        # 解析:作者的名称+段子内容
        div_list = response.xpath('//div[@id="content"]/div/div[2]/div')
        data_list = []
        for div in div_list:
            # extract()方法可以提取Selector对象中的data参数字符串
            # extract_first()提取的是list数组里面的第一个字符串,
            author = div.xpath('./div[1]/a[2]/h2/text()').extract_first()
            # 列表调用了extract()表示将每一个Selector对象中的data字符串提取出来
            content = ''.join(div.xpath('./a[1]/div[1]/span//text()').extract())
            item = StorySpiderItem()
            item['author'] = author
            item['content'] = content
            yield item
```

### items模块

```python
import scrapy


class StorySpiderItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    author = scrapy.Field()
    content = scrapy.Field()
```

### pipelines模块

```python
class StorySpiderPipeline:
    fp = None

    # open_spider方法只会在爬虫开始时调用一次,可以用于数据初始化操作
    def open_spider(self, spider):
        print('开始执行爬虫...')
        self.fp = open('./qiubai.txt', 'w', encoding='utf-8')

    # close_spider会在结束时调用一次
    def close_spider(self, spider):
        print('爬虫执行结束...')
        self.fp.close()

    # 专门用来处理item对象
    # 该方法可以接收爬虫文件提交的item对象
    def process_item(self, item, spider):
        author = item['author']
        content = item['content']
        self.fp.write(author + ':' + content + '\n')
        return item
```

::: tip

return item可以使item继续传递到下一个即将被执行的管道类中，以此可以实现多个管道类的操作，比如一份数据持久化到文件，一份数据持久化到数据库

:::

### 配置文件中开启管道

settings.py中修改

```python
# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
    # 300表示优先级,数值越小,优先级越高
   'story_spider.pipelines.StorySpiderPipeline': 300,
}
```

### 执行爬虫

```python
scrapy crawl storyxc
开始执行爬虫...
爬虫执行结束...
目录下生成了qiubai.txt
```



