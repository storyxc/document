# FFmpeg相关

> FFmpeg: A complete, cross-platform solution to record, convert and stream audio and video.

### 提取视频文件中的音频文件并输出

```shell
ffmpeg -i input.mp4 -vn -acodec libmp3lame -q:a 0 ~/Downloads/output.mp3
```

- `-vn`:禁用复制视频流，只提取音频流
- `-acodec libmp3lame`：指定输出使用 LAME MP3 编码器进行编码。
- `-q:a 0`：设置输出音频的质量。`0` 表示最高品质。

### yt-dlp下载最高质量音频并由ffmpeg输出mp3

```shell
yt-dlp -f bestaudio "https://www.youtube.com/watch?v=xxx" -o - | ffmpeg -i pipe:0 -vn -acodec libmp3lame -q:a 0 ~/downloads/output.mp3
```

### yt-dlp下载最高质量视频&音频并合成一个视频

```shell
yt-dlp -f bestvideo+bestaudio "https://www.youtube.com/watch?v=example" -o ~/Downloads/output.mp4 --recode-video mp4
```

