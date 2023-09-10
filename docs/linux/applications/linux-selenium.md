# Linux中使用selenium



## 安装linux版chrome

### centos
`wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm`

`yum install google-chrome-stable_current_x86_64.rpm`

## 安装相关库

`yum install mesa-libOSMesa-devel gnu-free-sans-fonts wqy-zenhei-fonts`


### ubuntu
`wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb`
`sudo dpkg -i google-chrome-stable_current_amd64.deb `



> 安装报错 
>
> dpkg: error processing package google-chrome-stable (--install):
>  dependency problems - leaving unconfigured
> Processing triggers for mime-support (3.64ubuntu1) ...
> Processing triggers for man-db (2.9.1-1) ...
> Errors were encountered while processing:
>  google-chrome-stable

使用`sudo apt-get install -f`修复依赖关系，

*如果系统中有某个软件包不满足依赖条件,这个命令就会自动修复,将要安装那个软件包依赖的软件包。*

## 安装chromedriver

淘宝源地址：`http://npm.taobao.org/mirrors/chromedriver/`

需要根据不同版本的chrome进行选择下载，比如我安装的chrome是96版本的，那么chromedriver就需要找对应的96版本

![image-20220104161559216](https://storyxc.com/images/blog//image-20220104161559216.png)

这里选择一个最近更新的即可

![image-20220104161718088](https://storyxc.com/images/blog//image-20220104161718088.png)

这里下载linux版本,下载后解压，把解压后的chromedriver可执行文件移动到path下，例如`/usr/bin`

```bash
wget http://npm.taobao.org/mirrors/chromedriver/96.0.4664.45/chromedriver_linux64.zip

unzip chromedriver_linux64.zip

mv chromedriver /usr/bin

chmod +x /usr/bin/chromedriver
```



## 使用python测试

linux下无头浏览器模式：

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(chrome_options=chrome_options)
driver.get("https://www.baidu.com")

with open("./baidu.html", "w", encoding="utf-8") as fp:
        fp.write(driver.page_source)
```