import{_ as i,c as a,o as t,a2 as e}from"./chunks/framework.CQECOx-R.js";const r=JSON.parse('{"title":"FFmpeg相关","description":"","frontmatter":{},"headers":[],"relativePath":"linux/applications/FFmpeg相关.md","filePath":"linux/applications/FFmpeg相关.md","lastUpdated":1742805674000}'),l={name:"linux/applications/FFmpeg相关.md"};function p(h,s,n,d,k,o){return t(),a("div",null,s[0]||(s[0]=[e('<h1 id="ffmpeg相关" tabindex="-1">FFmpeg相关 <a class="header-anchor" href="#ffmpeg相关" aria-label="Permalink to &quot;FFmpeg相关&quot;">​</a></h1><blockquote><p>FFmpeg: A complete, cross-platform solution to record, convert and stream audio and video.</p></blockquote><h3 id="提取视频文件中的音频文件并输出" tabindex="-1">提取视频文件中的音频文件并输出 <a class="header-anchor" href="#提取视频文件中的音频文件并输出" aria-label="Permalink to &quot;提取视频文件中的音频文件并输出&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ffmpeg</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> input.mp4</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -vn</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -acodec</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libmp3lame</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -q:a</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/Downloads/output.mp3</span></span></code></pre></div><ul><li><code>-vn</code>:禁用复制视频流，只提取音频流</li><li><code>-acodec libmp3lame</code>：指定输出使用 LAME MP3 编码器进行编码。</li><li><code>-q:a 0</code>：设置输出音频的质量。<code>0</code> 表示最高品质。</li></ul><h3 id="yt-dlp下载最高质量音频并由ffmpeg输出mp3" tabindex="-1">yt-dlp下载最高质量音频并由ffmpeg输出mp3 <a class="header-anchor" href="#yt-dlp下载最高质量音频并由ffmpeg输出mp3" aria-label="Permalink to &quot;yt-dlp下载最高质量音频并由ffmpeg输出mp3&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yt-dlp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bestaudio</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;https://www.youtube.com/watch?v=xxx&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> -</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ffmpeg</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pipe:0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -vn</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -acodec</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libmp3lame</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -q:a</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/downloads/output.mp3</span></span></code></pre></div><h3 id="yt-dlp下载最高质量视频-音频并合成一个视频" tabindex="-1">yt-dlp下载最高质量视频&amp;音频并合成一个视频 <a class="header-anchor" href="#yt-dlp下载最高质量视频-音频并合成一个视频" aria-label="Permalink to &quot;yt-dlp下载最高质量视频&amp;音频并合成一个视频&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yt-dlp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bestvideo+bestaudio</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;https://www.youtube.com/watch?v=example&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/Downloads/output.mp4</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --recode-video</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mp4</span></span></code></pre></div>',9)]))}const c=i(l,[["render",p]]);export{r as __pageData,c as default};
