# 多线程爬取梨视频网站的热门视频



```python
from multiprocessing.dummy import Pool
import requests
from lxml import etree
import random
import os


# 体育分类视频url地址
url = 'https://www.pearvideo.com/category_9'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
}


def get_videos():
    page_text = requests.get(url=url, headers=headers).text
    tree = etree.HTML(page_text)
    li_list = tree.xpath('//ul[@id="listvideoListUl"]/li')
    if not os.path.exists('./video'):
        os.mkdir('./video')
    # 存储所有的视频真实地址和名称信息
    video_url_list = []
    for li in li_list:
        # 视频id
        video_id = li.xpath('.//a/@href')[0].split('_')[1]
        # 视频名称
        name = li.xpath('.//div[@class="vervideo-title"]/text()')[0] + '.mp4'
        # 梨视频的video标签是动态加载的,通过请求抓包获取到的ajax地址
        ajax_url = 'https://www.pearvideo.com/videoStatus.jsp'
        query_param = {
            'contId': video_id,
            'mrd': str(random.random())
        }
        # 梨视频有Referer 防盗链验证
        # 需要在普通的ua伪装中加入Referer请求头,否则会一直提示文章已下线
        ajax_headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
            'Referer': 'https://www.pearvideo.com/video_' + video_id
        }
        json_obj = requests.get(url=ajax_url, headers=ajax_headers, params=query_param).json()
        # 响应的地址:https://video.pearvideo.com/mp4/adshort/20210419/1618849825266-15658816_adpkg-ad_hd.mp4
        # 实际的地址:https://video.pearvideo.com/mp4/adshort/20210419/cont-1727112-15658816_adpkg-ad_hd.mp4
        # 实际地址中cont-后是视频id 因此要把这串字符串处理掉
        temp_url = json_obj['videoInfo']['videos']['srcUrl']
        last_index = temp_url.rfind('/')
        # 最后一个/前的内容 https://video.pearvideo.com/mp4/adshort/20210419
        real_video_url = temp_url[:last_index]
        # 最后一个/后的内容根据-切片(不包含) 1618849825266-15658816_adpkg-ad_hd.mp4
        str_list = temp_url[last_index + 1:].split('-')
        for i in range(0, len(str_list)):
            if i == 0:
                real_video_url = real_video_url + '/cont-' + video_id + '-'
            elif i == len(str_list) - 1:
                real_video_url = real_video_url + str_list[i]
            else:
                real_video_url = real_video_url + str_list[i] + '-'
        # 字典存储视频信息
        video_dict = {'name': name, "url": real_video_url}
        video_url_list.append(video_dict)
    return video_url_list


# io操作较耗时,采用多线程进行
def download_video(dict):
    video_name = dict['name']
    video_url = dict['url']
    video_stream = requests.get(url=video_url, headers=headers).content
    with open('./video/' + video_name, 'wb') as f:
        f.write(video_stream)
        print(f'============={video_name}下载完毕===============')


if __name__ == '__main__':
    # 多线程执行下载任务
    pool = Pool(4)
    pool.map(download_video, get_videos())
```

## 流程:

- 根据主链接拿到最热视频的视频id和视频名称

- 通过抓包拿到请求视频真实地址的ajax请求地址，修改参数，添加Referer请求头解决防盗链问题
- 通过ajax请求拿到响应的json对象，解析出我们需要的视频地址
- 通过对比可以得知视频地址是经过了字符串替换的，通过字符串操作得到真实的视频地址
- 将解析出来的视频信息字典统一存在列表，再定义一个持久化方法
- 通过多线程进行持久化操作

