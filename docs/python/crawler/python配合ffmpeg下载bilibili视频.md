# python配合ffmpeg下载bilibili视频

直接上代码

::: tip

需要提前下载ffmpeg并配置环境变量，ffmpeg下载地址：http://www.ffmpeg.org/download.html

:::


```python
import requests
import re
import json
import os
import subprocess

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
    'Referer': 'https://www.bilibili.com'
}

"""
    requests获取页面源码
"""


def send_request(b_url):
    data = requests.get(url=b_url, headers=headers).text
    return data


"""
    正则匹配视频和音频的真实地址
"""


def get_play_info(data):
    json_data = json.loads(re.findall('<script>window\.__playinfo__=(.*?)</script>', data)[0])
    video_url = json_data['data']['dash']['video'][0]['backupUrl'][0]
    audio_url = json_data['data']['dash']['audio'][0]['backupUrl'][0]
    return video_url, audio_url


"""
    分别下载视频和音频文件后利用ffmpeg合并
"""


def download(info_list, info):
    print(f'开始下载: {info}')
    video_data = requests.get(url=info_list[0], headers=headers).content
    audio_data = requests.get(url=info_list[1], headers=headers).content
    desktop = os.path.join(os.path.expanduser("~"), 'Desktop')
    video_path = desktop + '\\' + info
    audio_path = desktop + '\\' + info + '_.mp3'
    # 如果视频名称中有'-' 执行ffmpeg合并的时候会报错
    video_path = video_path.replace('-',' ')
    audio_path = audio_path.replace('-',' ')
    with open(video_path + '_temp.mp4', 'wb') as f:
        f.write(video_data)
    with open(audio_path, 'wb') as f:
        f.write(audio_data)
    cmd = 'ffmpeg -y -i ' + video_path + '_temp.mp4' + ' -i ' \
          + audio_path + ' -c:v copy -c:a aac -strict experimental ' + video_path + '.mp4'
    print(cmd)
    subprocess.Popen(cmd, shell=True)
    # os.system(cmd)
    print('下载完成')


if __name__ == '__main__':
    url = input('请输入要下载的b站视频链接:')
    page_data = send_request(url)
    # 解析视频的名称
    title = re.findall('<h1 title=\"(.*?)\" class=\"video-title', page_data)[0]
    play_info_list = get_play_info(page_data)
    download(play_info_list, title)
```