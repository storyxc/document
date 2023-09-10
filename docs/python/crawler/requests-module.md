# requests模块入门

requests模块是python中原生的一款基于网络请求的模块，功能强大，简单便捷，效率极高。

作用：模拟浏览器发请求

- 指定url
- 发起请求
- 获取响应
- 持久化存储



## 入门程序

环境安装：pip install requests

```python
import requests

# 爬取搜狗首页的数据

if __name__ == '__main__':
    url = "https://www.sogou.com"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
    }

    response = requests.get(url,headers)
    page_text = response.text
    print(page_text)
    with open("./sogou.html", "w", encoding="utf-8") as fp:
        fp.write(page_text)
    print("爬取结束")
```





:::warning

坑1：ValueError：requests check_hostname requires server_hostname

坑2：requests.exceptions.SSLError: hostname '127.0.0.1' doesn't match None of。。

网上有说降低requests版本的，有安装乱七八糟东西的，最后是降低了urllib3的版本解决的，据说是高版本的urllib有个bug

pip install urllib3==1.25.8

:::

## 简易网页采集器

```python
import requests

if __name__ == '__main__':
    url = 'https://www.sogou.com/web'
    keyword = input('enter your keyword: ')
    # UA伪装
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
    }
    param = {
        'query': keyword
    }
    response = requests.get(url, params=param,headers=headers)
    resp = response.text
    file_name = keyword + '.html'
    with open(file_name, 'w', encoding='utf-8') as f:
        f.write(resp)
    print(file_name, '保存成功')

```

## 百度翻译内容提取

```python
import requests
import json

if __name__ == '__main__':
    url = 'https://fanyi.baidu.com/sug'
    keyword = {
        'kw': 'dog'
    }
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
    }
    response = requests.post(url=url, data=keyword, headers=headers)
    _json = response.json()
    file_name = keyword.get('kw') + '.json'
    with open(file_name, 'w', encoding='utf-8') as f:
        json.dump(_json,f,ensure_ascii=False)
    print('json存储成功')

```

结果：

```json
{
  "errno": 0,
  "data": [
    {
      "k": "dog",
      "v": "n. 狗; 蹩脚货; 丑女人; 卑鄙小人 v. 困扰; 跟踪"
    },
    {
      "k": "DOG",
      "v": "abbr. Data Output Gate 数据输出门"
    },
    {
      "k": "doge",
      "v": "n. 共和国总督"
    },
    {
      "k": "dogm",
      "v": "abbr. dogmatic 教条的; 独断的; dogmatism 教条主义; dogmatist"
    },
    {
      "k": "Dogo",
      "v": "[地名] [马里、尼日尔、乍得] 多戈; [地名] [韩国] 道高"
    }
  ]
}
```



## 豆瓣电影排行榜

```python
import requests
import json

if __name__ == '__main__':
    url = 'https://movie.douban.com/j/chart/top_list'
    total = 748
    limit = 20
    start = 0
    params = {
        'type': 11,
        'interval_id': '100:90',
        'action': '',
        'start': start,
        'limit': limit
    }
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
    }
    result = total // limit
    res_list = []
    if result:
        for i in range(result if total // limit == 0 else result + 1):
            start += 20
            res = requests.get(url=url, params=params, headers=headers)
            res_json = res.json()
            res_list.append(res_json)
    with open('douban_movie.json', 'w', encoding='utf-8') as f:
        json.dump(res_list, f, ensure_ascii=False)

    print('over')
```

## 国家药品管理局化妆品生产许可信息

```python
import requests
import json

if __name__ == '__main__':
    # 列表页ajax
    url = 'http://scxk.nmpa.gov.cn:81/xk/itownet/portalAction.do?method=getXkzsList'
    # 详情页ajax
    detail_url = 'http://scxk.nmpa.gov.cn:81/xk/itownet/portalAction.do?method=getXkzsById'

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
    }
    params = {
        'on': True,
        'page': 1,
        'pageSize': 15,
        'productName': '',
        'conditionType': 1,
        'applyname': '',
        'applysn': ''
    }

    detail_params = {
        'id': ''
    }
    # 数据容器
    data_list = []
    # 列表页响应
    response = requests.post(url=url, params=params, headers=headers)
    res_obj = response.json()
    # 提取列表信息遍历
    res_list = res_obj.get('list')
    for data in res_list:
        # id是详情页请求的参数
        detail_id = data.get('ID')
        detail_params['id'] = detail_id
        # 详情页响应
        resp = requests.post(url=detail_url, params=detail_params, headers=headers)
        res_obj = resp.json()
        # 容器保存
        data_list.append(res_obj)
    # 持久化存储
    with open('make_up_xkz.json', 'a', encoding='utf-8') as f:
        json.dump(data_list, f, ensure_ascii=False)
    print('over')

```





## 正则表达式匹配

### 爬取糗事百科图片

```python
import requests
import re

if __name__ == '__main__':
    for i in range(13):
        page_no = str(i + 1)
        url = 'https://www.qiushibaike.com/imgrank/page/%d'
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
        }
        url = format(url % page_no)
        page_txt = requests.get(url=url, headers=headers).text
        exp = '<div class="thumb">.*?<img src="(.*?)" alt.*?</div>'
        src_list = re.findall(exp, page_txt, re.S)
        # print(src_list)
        for src in src_list:
            url = 'https:' + src
            # 向图片url发请求保存
            stream = requests.get(url=url, headers=headers).content
            # 文件名
            src = src.split('/')[-1]
            img_path = './img/' + src
            f = open(img_path, 'wb')
            f.write(stream)
            print(img_path, '下载成功')

```





## XPath解析

### 解析58二手房标题

```python
from lxml import etree
import requests

if __name__ == '__main__':
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
    }
    url = 'https://bj.58.com/ershoufang/'
    page_text = requests.get(url=url, headers=headers).text
    tree = etree.HTML(page_text)
    div_list = tree.xpath('//div[@class="property"]')
    with open('58.txt', 'w', encoding='utf-8') as f:
        for div in div_list:
            title = div.xpath('.//h3[@class="property-content-title-name"]/text()')
            f.write(title[0]+'\r\n')
```

### 多线程爬取美女图片

```python
import requests
from lxml import etree
import os
from concurrent.futures import ThreadPoolExecutor


def download_pic(page_no, real_url, first_page_url, ):
    print('=============开始下载第 ' + str(page_no) + ' 页=================')
    if not page_no == 1:
        pattern = '_' + str(page_no)
        init_url = format(real_url % pattern)
    else:
        init_url = first_page_url
    down_page_text = requests.get(url=init_url, headers=headers).text
    down_tree = etree.HTML(down_page_text)
    li_list = down_tree.xpath('//div[@class="slist"]//li')
    for li in li_list:
        img_url = 'https://pic.netbian.com' + li.xpath('.//img/@src')[0]
        img_name = li.xpath('.//img/@alt')[0] + '.jpg'
        img_name = img_name.encode('iso-8859-1').decode('gbk')
        with open('./beauty/' + img_name, 'wb') as f:
            stream = requests.get(url=img_url, headers=headers).content
            f.write(stream)
            print(img_name, ' 下载成功')


if __name__ == '__main__':
    url = 'https://pic.netbian.com/4kmeinv/index.html'
    next_url = 'https://pic.netbian.com/4kmeinv/index%s.html'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
    }

    if not os.path.exists('./beauty'):
        os.mkdir('./beauty')
    page_text = requests.get(url=url, headers=headers).text
    tree = etree.HTML(page_text)
    page_info = tree.xpath('//div[@class="page"]/a[7]/text()')
    total_page_no = int(page_info[0])
    thread_pool = ThreadPoolExecutor(max_workers=60)
    for i in range(total_page_no):
        i += 1
        thread_pool.submit(download_pic, i, next_url, url)

```

### 全国城市名称爬取

```python
import requests
from lxml import etree

if __name__ == '__main__':
    url = 'https://www.aqistudy.cn/historydata'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
    }
    page_text = requests.get(url=url, headers=headers).text
    tree = etree.HTML(page_text)
    cities = tree.xpath('//div[@class="bottom"]/ul//li/a/text()')
    print(len(cities))
```

