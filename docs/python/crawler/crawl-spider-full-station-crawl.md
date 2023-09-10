# CrawlSpider全站爬取



## CrawlSpider

CrawlSpider是Spider的一个子类，具有提取指定规则链接的功能

CrawlSpider的作用：

- 全站爬取
  - 基于Spider手动请求
  - 基于CrawlSpider

## 项目创建

- `scrapy startproject crawl_spider`
- `cd  crawl_spider`
- 创建基于CrawlSpider的爬虫类：`scrapy genspider -t crawl storyxc xxx.com` 相比普通的增加了`-t crawl`参数



### 链接提取器

根据指定规则（allow=‘正则表达式“）提取符合要求的所有url

```python
link = LinkExtractor(allow=r'id=1&page=\d+')
```

### 规则解析器

将链接提取器提取到的链接进行指定规则（callback）的解析

```python
rules = (
    Rule(link, callback='parse_item', follow=True),
)
```

- follow参数的作用：
  - True：可以将链接提取器继续作用到链接提取器提取到的链接（递归）
  - False：只提取起始页的数据



## 案例：提取东莞阳光问政平台的问政标题和编号

### 爬虫类

```python
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from crawl_spider.items import CrawlSpiderItem,DetailItem


class StoryxcSpider(CrawlSpider):
    name = 'storyxc'
    start_urls = ['http://wz.sun0769.com/political/index/politicsNewest']

    # 链接提取器,符合正则表达式的链接都会被提取
    link = LinkExtractor(allow=r'id=1&page=\d+')
    detail_link = LinkExtractor(allow=r'\/political\/politics\/index\?id=\d+')

    rules = (
        Rule(link, callback='parse_item', follow=True),
        Rule(detail_link, callback='parse_detail'),
    )

    def parse_item(self, response):
        li_list = response.xpath('/html/body/div[2]/div[3]/ul[2]/li')
        for li in li_list:
            wz_id = li.xpath('./span[1]/text()').extract_first()
            wz_title = li.xpath('./span[3]/a/text()').extract_first()
            item = CrawlSpiderItem()
            item['num'] = wz_id
            item['title'] = wz_title
            yield item

    def parse_detail(self, response):
        id = response.xpath('/html/body/div[3]/div[2]/div[2]/div[1]/span[4]/text()').extract_first()
        id = id.replace('编号：','')
        content = ''.join(response.xpath('/html/body/div[3]/div[2]/div[2]/div[2]/pre/text()').extract())
        item = DetailItem()
        item['num'] = id
        item['content'] = content
        yield item

```

### item类

```python
# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class CrawlSpiderItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title =scrapy.Field()
    num = scrapy.Field()

class DetailItem(scrapy.Item):
    num = scrapy.Field()
    content = scrapy.Field()
```

### Pipeline类

```python
# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from crawl_spider.items import CrawlSpiderItem, DetailItem
import pymysql


class CrawlSpiderPipeline:
    def process_item(self, item, spider):
        if item.__class__.__name__ == 'DetailItem':
            with Mysql() as conn:
                cursor = conn.cursor()
                try:
                    cursor.execute(
                        'insert into tb_wz_content(id,content) values("%s","%s")' % (
                            item['num'],item['content']))
                    conn.commit()
                except:
                    print('插入问政内容失败!')
                    conn.rollback()


        else:
            with Mysql() as conn:
                cursor = conn.cursor()
                try:
                    cursor.execute(
                        'insert into tb_wz_title(id,title) values("%s","%s")' % (item['num'],item['title']))
                    conn.commit()
                except:
                    print('插入问政标题失败!')
                    conn.rollback()


class Mysql(object):
    def __enter__(self):
        self.connection = pymysql.connect(host='127.0.0.1', port=3306, user='root', password='root', database='python')
        return self.connection

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.connection.close()
```

### settings

```python
BOT_NAME = 'crawl_spider'

SPIDER_MODULES = ['crawl_spider.spiders']
NEWSPIDER_MODULE = 'crawl_spider.spiders'


# Crawl responsibly by identifying yourself (and your website) on the user-agent
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'

# Obey robots.txt rules
ROBOTSTXT_OBEY = False



ITEM_PIPELINES = {
   'crawl_spider.pipelines.CrawlSpiderPipeline': 300,
}
```

启动爬虫：

数据库会新增数据

![image-20210502012334780](https://storyxc.com/images/blog//image-20210502012334780.png)