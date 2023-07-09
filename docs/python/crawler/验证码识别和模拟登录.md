# 验证码识别和模拟登录

## 超级鹰验证码识别平台

地址：https://www.chaojiying.com/

使用方法：

1. 注册并登陆
2. 点击[开发文档](https://www.chaojiying.com/api.html)，选择自己使用的语言下载使用demo，比如python
3. 解压后得到demo实例，配置自己的用户名密码和软件id，软件id在用户中心的侧边栏最下方选择软件ID即可
4. 根据需要识别的验证码类型配置具体类型，比如4-6位英文数字的类型编号为1902
5. 充值，每次识别根据不同的类型有不同题分的定价，这个平台1元=1000题分
6. 开始开发

## 超级鹰识别古诗文网验证码案例



### 识别案例代码

```python
import requests
from lxml import etree
from story.code import StoryClient
import os


if __name__ == '__main__':
    url = 'https://so.gushiwen.cn/user/login.aspx'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
    }
    page_text = requests.get(url=url, headers=headers).text
    tree = etree.HTML(page_text)
    # 验证码url地址
    code_url = 'https://so.gushiwen.cn' + tree.xpath('//*[@id="imgCode"]/@src')[0]
    img_data = requests.get(url=code_url, headers=headers).content
    if not os.path.exists('./img'):
        os.mkdir('./img')
    with open('./img/code.jpg', 'wb') as f:
        f.write(img_data)
    client = StoryClient()
    with open('./img/code.jpp','rb') as f:
        im = f.read()
        res = client.post_pic(im,1902)['pic_str']
        print(res)
```

### 超级鹰使用demo代码：

这里我微调了一下，把用户信息在代码里写死了，可以根据自己情况调整

```python
import requests
from hashlib import md5


class StoryClient(object):

    def __init__(self):
        self.username = '超级鹰用户名'
        password = '超级鹰密码'.encode('utf8')
        self.password = md5(password).hexdigest()
        self.soft_id = '超级鹰软件ID'
        self.base_params = {
            'user': self.username,
            'pass2': self.password,
            'softid': self.soft_id,
        }
        self.headers = {
            'Connection': 'Keep-Alive',
            'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
        }

    def post_pic(self, im, codetype):
        """
        im: 图片字节
        codetype: 题目类型 参考 http://www.chaojiying.com/price.html
        """
        params = {
            'codetype': codetype,
        }
        params.update(self.base_params)
        files = {'userfile': ('ccc.jpg', im)}
        r = requests.post('http://upload.chaojiying.net/Upload/Processing.php', data=params, files=files,
                          headers=self.headers)
        return r.json()

    def ReportError(self, im_id):
        """
        im_id:报错题目的图片ID
        """
        params = {
            'id': im_id,
        }
        params.update(self.base_params)
        r = requests.post('http://upload.chaojiying.net/Upload/ReportError.php', data=params, headers=self.headers)
        return r.json()


if __name__ == '__main__':
    client = StoryClient()  
    im = open('a.jpg', 'rb').read()  # 本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
    print(client.post_pic(im, 1902))  # 1902 验证码类型  官方网站>>价格体系 3.4+版 print 后要加()

```

### 流程：

- 请求登录页面并保存验证码图片
- 上传验证码图片到超级鹰并识别



## 人人网模拟登录

```python
import requests
from lxml import etree
from story.code import StoryClient

if __name__ == '__main__':
    url = 'http://www.renren.com/SysHome.do'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
    }
    # 使用session发送请求
    session = requests.session()
    # page_text = requests.get(url=url, headers=headers).text
    page_text = session.get(url=url, headers=headers).text
    tree = etree.HTML(page_text)
    code_url = tree.xpath('//*[@id="verifyPic_login"]/@src')[0]
    code_img_data = requests.get(url=code_url, headers=headers).content
    path = './img/code.jpg'
    with open(path, 'wb') as f:
        f.write(code_img_data)
    # 超级鹰客户端
    client = StoryClient()
    with open(path, 'rb') as r:
        im = r.read()
    code = client.post_pic(im, 1902)['pic_str']
    login_url = 'http://www.renren.com/ajaxLogin/login?1=1&uniqueTimestamp=2021312240804'
    data = {
        'email': '人人网用户名',
        'icode': code,
        'origURL': 'http://www.renren.com/home',
        'domain': 'renren.com',
        'key_id': 1,
        'captcha_type': 'web_login',
        'password': '人人网密码',
        'rkey': 'asdfasdf',
        'f': ''
    }
    #response = requests.post(url=login_url, headers=headers, data=data)
    # 使用session
    response = session.post(url=login_url, headers=headers, data=data)
    print(response.status_code)
    login_page_data = response.text
    with open('renren.html', 'w', encoding='utf-8') as f:
        f.write(login_page_data)

    detail_url = 'http://www.renren.com/6666666/profile'
    # detail_text = requests.get(url=detail_url,headers=headers).text
    # 使用session
    detail_text = session.get(url=detail_url,headers=headers).text
    with open('./detail.html','w',encoding='utf-8') as dw:
        dw.write(detail_text)
```

### 流程：

- 请求登录页，抓取验证码上传到超级鹰识别
- 浏览器抓包，拿到登录按钮的触发事件发送的login请求内容，复制出来并调整格式（代码中的data部分）
- http是无状态的，登录后要想访问个人主页，需要携带cookie发送请求，可以手动抓包cookie到代码中，推荐使用requests.session()发送请求，然后可以继续爬取需要的个人主页详情信息
- 超级鹰客户端部分见上一个案例中的demo代码