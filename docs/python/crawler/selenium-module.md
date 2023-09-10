# selenium模块

selenium是一个用于web应用程序测试的工具,selenium测试直接运行在浏览器中,就像真正的用户在操作一样

selenium在爬虫中的应用:

- 便捷的获取网站动态加载的数据
- 便捷的实现模拟登录

selenium模块:

- 基于浏览器自动化的一个模块



## 使用流程

- 环境安装：`pip install selenium`
- 下载浏览器驱动程序

>http://chromedriver.storage.googleapis.com/index.html 驱动程序

- 实例化浏览器对象
- 编写基于浏览器对象操作的代码

```python
from selenium import webdriver
from lxml import etree
import time

# 实例化一个浏览器对象
browser = webdriver.Chrome(executable_path=r'D:\install\tools\chromedriver\chromedriver.exe')
# 访问url
browser.get('https://movie.douban.com/typerank?type_name=%E5%89%A7%E6%83%85&type=11&interval_id=100:90&action=')
# 获取页面源码内容
page_text = browser.page_source

tree = etree.HTML(page_text)
span_list = tree.xpath('//div[@class="movie-content"]/div[1]/div[1]/span[1]')
for span in span_list:
    name = span.xpath('.//a/text()')
    print(name)
time.sleep(5)
# 退出
browser.quit()
    
res:
['肖申克的救赎']
['霸王别姬']
['控方证人']
['伊丽莎白']
['阿甘正传']
['美丽人生']
['辛德勒的名单']
['茶馆']
['控方证人']
['十二怒汉（电视版）']
['这个杀手不太冷']
['千与千寻']
['泰坦尼克号']
['忠犬八公的故事']
['十二怒汉']
['泰坦尼克号 3D版']
['背靠背，脸对脸']
['灿烂人生']
['横空出世']
['遥望南方的童年']
```



## 简单操作

```python
from selenium import webdriver
from time import sleep

bro = webdriver.Chrome(executable_path=r'D:\install\tools\chromedriver\chromedriver.exe')
bro.get('https://www.taobao.com/')
# 找到搜索框
input_ = bro.find_element_by_id('q')
# 输入值
input_.send_keys('macbook')
# 执行js
bro.execute_script('window.scrollTo(0,document.body.scrollHeight)')
sleep(2)
# 点击搜索按钮
btn = bro.find_element_by_xpath('//*[@id="J_TSearchForm"]/div[1]/button')
btn.click()

sleep(2)

bro.get('https://www.baidu.com')
sleep(1)
# 后退
bro.back()

sleep(1)
# 前进
bro.forward()
sleep(1)
bro.quit()
```

## iframe和动作链

- 如果定位的标签存在于iframe中,则必须使用`switch_to.frame(id)`
- 动作链: from selenium.webdriver import ActionChains
  - 实例化: `action = ActionChains(browser)
  - click_and_hold(div)长按点击操作
  - move_by_offset(x,y)
  - perform() 让动作链立即执行
  - action.release() 释放动作链



## qq空间模拟登录

```python
from selenium import webdriver
import time

url = 'https://qzone.qq.com/'
browser = webdriver.Chrome()
browser.get(url)
browser.switch_to.frame('login_frame')
btn = browser.find_element_by_id('switcher_plogin')
btn.click()
uname_input = browser.find_element_by_id('u')
pwd_input = browser.find_element_by_id('p')
uname_input.send_keys('1234')
pwd_input.send_keys('123411234')
login_btn = browser.find_element_by_id('login_button')
login_btn.click()
time.sleep(5)
browser.quit()
```

## 无头浏览器+规避检测

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import ChromeOptions
from time import sleep

# 实现无可视化节目(无头浏览器)
chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
# 实现规避检测
option = ChromeOptions()
option.add_experimental_option('excludeSwitches', ['enable-automation'])
bro = webdriver.Chrome(chrome_options=chrome_options, options=option)
bro.get('https://www.baidu.com')
print(bro.page_source)
sleep(2)
bro.quit()
```

## 12306模拟登录

```python
from selenium import webdriver
from time import sleep
from story.code import StoryClient
from PIL import Image
from selenium.webdriver import ActionChains
from selenium.webdriver import ChromeOptions

option = ChromeOptions()
option.add_experimental_option('excludeSwitches', ['enable-automation'])
# 访问12306
url = 'https://www.12306.cn/index/index.html'
bro = webdriver.Chrome(options=option)
bro.get(url)
script = 'Object.defineProperty(navigator,"webdriver",{get:()=>undefined,});'
bro.execute_script(script)
# 点击登录标签
sleep(5)
a_btn = bro.find_element_by_xpath('/html/body/div[2]/div/div[1]/div/div/ul/li[5]/a[1]')
a_btn.click()
sleep(2)
# 点击账号登录按钮
account_login = bro.find_element_by_xpath('/html/body/div[2]/div[2]/ul/li[2]/a')
account_login.click()
sleep(5)
# 保存页面截图
bro.save_screenshot('page.png')
# 确定验证码图片对应的左上角和右下角的坐标,进行裁剪
code_element = bro.find_element_by_id('J-loginImgArea')
location = code_element.location  # 左上角坐标(x,y)
size = code_element.size  # 验证码图片的长和宽
rangle = (
int(location['x']), int(location['y']), int(location['x'] + size['width']), int(location['y'] + size['height']))
# 截取验证码图片
image = Image.open('./page.png')
frame = image.crop(rangle)
print(rangle)
frame.save('./code.png')
# 超级鹰识别验证码
client = StoryClient()
im = open('./code.png', 'rb').read()
res = client.post_pic(im, 9004)['pic_str']
print(res)
# 输入用户名和密码
uname_input = bro.find_element_by_id('J-userName')
pwd_input = bro.find_element_by_id('J-password')
uname_input.send_keys('aaaaaaaaaaaa')
pwd_input.send_keys('bbbbbbbbbbb')
sleep(5)
# 处理识别结果
all_position_list = []  # 即将被点击的坐标
if '|' in res:
    list_1 = res.split('|')
    count_1 = len(list_1)
    for i in range(count_1):
        xy_list = []
        x = int(list_1[i].split(',')[0])
        y = int(list_1[i].split(',')[1])
        xy_list.append(x)
        xy_list.append(y)
        all_position_list.append(xy_list)
else:
    x = int(res.split(',')[0])
    y = int(res.split(',')[1])
    xy_list = []
    xy_list.append(x)
    xy_list.append(y)
    all_position_list.append(xy_list)

print(all_position_list)
# 使用动作链点击验证码
for l in all_position_list:
    x = l[0]
    y = l[1]
    # 参照物是截取的验证码区域
    ActionChains(bro).move_to_element_with_offset(code_element, x, y).click().perform()
sleep(5)
login_btn = bro.find_element_by_id('J-login')
login_btn.click()
sleep(2)
#滑动验证码
span = bro.find_element_by_xpath('//*[@id="nc_1_n1z"]')
# 对div_tag进行滑动操作
action = ActionChains(bro)
action.click_and_hold(span).perform()
action.drag_and_drop_by_offset(span, 400, 0).perform()
action.release()

sleep(10)
bro.quit()
```

最后一步滑块验证码无法通过,还需要优化