import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.4a66d6f9.js";const u=JSON.parse('{"title":"Ubuntu-server","description":"","frontmatter":{},"headers":[],"relativePath":"linux/env/Ubuntu-server.md","filePath":"linux/env/Ubuntu-server.md","lastUpdated":1704522520000}'),p={name:"linux/env/Ubuntu-server.md"},e=l(`<h1 id="ubuntu-server" tabindex="-1">Ubuntu-server <a class="header-anchor" href="#ubuntu-server" aria-label="Permalink to &quot;Ubuntu-server&quot;">​</a></h1><h2 id="关闭欢迎提示" tabindex="-1">关闭欢迎提示 <a class="header-anchor" href="#关闭欢迎提示" aria-label="Permalink to &quot;关闭欢迎提示&quot;">​</a></h2><p><code> chmod -x /etc/update-motd.d/*</code></p><h2 id="关闭ssh登录motd广告" tabindex="-1">关闭ssh登录motd广告 <a class="header-anchor" href="#关闭ssh登录motd广告" aria-label="Permalink to &quot;关闭ssh登录motd广告&quot;">​</a></h2><p><code>vim /etc/default/motd-news</code> 将enabled改为0</p><h2 id="关闭ssh登录系统信息" tabindex="-1">关闭ssh登录系统信息 <a class="header-anchor" href="#关闭ssh登录系统信息" aria-label="Permalink to &quot;关闭ssh登录系统信息&quot;">​</a></h2><p><code>apt remove landscape-common landscape-client</code></p><h2 id="系统盘迁移" tabindex="-1">系统盘迁移 <a class="header-anchor" href="#系统盘迁移" aria-label="Permalink to &quot;系统盘迁移&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 1.备份数据</span></span>
<span class="line"><span style="color:#6A737D;"># 2.制作一个linux启动盘 例如live server的</span></span>
<span class="line"><span style="color:#6A737D;"># 3.连接原启动盘和需要迁移到的目标盘</span></span>
<span class="line"><span style="color:#6A737D;"># 4.U盘启动直接进入shell</span></span>
<span class="line"><span style="color:#6A737D;"># 5.查看磁盘信息</span></span>
<span class="line"><span style="color:#B392F0;">lsblk</span></span>
<span class="line"><span style="color:#6A737D;"># 6.dd命令直接全盘迁移</span></span>
<span class="line"><span style="color:#B392F0;">dd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">if=/dev/sda</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">of=/dev/sdb</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bs=</span><span style="color:#79B8FF;">4096</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">conv=sync,noerror</span></span>
<span class="line"><span style="color:#6A737D;"># 7.拷贝完成后使用新磁盘启动</span></span>
<span class="line"><span style="color:#6A737D;"># 8.删除旧分区&amp;resize</span></span>
<span class="line"><span style="color:#B392F0;">fdisk</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/dev/sdX</span></span>
<span class="line"><span style="color:#B392F0;">d</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#删除磁盘最后一个分区</span></span>
<span class="line"><span style="color:#B392F0;">n</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#新建一个分区，扇区开始结束都用默认即可</span></span>
<span class="line"><span style="color:#B392F0;">w</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#写盘保存</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">partprobe</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#重新读取分区表并更新分区信息</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">resize2fs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/dev/sdXX</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#调整文件系统的大小</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 1.备份数据</span></span>
<span class="line"><span style="color:#6A737D;"># 2.制作一个linux启动盘 例如live server的</span></span>
<span class="line"><span style="color:#6A737D;"># 3.连接原启动盘和需要迁移到的目标盘</span></span>
<span class="line"><span style="color:#6A737D;"># 4.U盘启动直接进入shell</span></span>
<span class="line"><span style="color:#6A737D;"># 5.查看磁盘信息</span></span>
<span class="line"><span style="color:#6F42C1;">lsblk</span></span>
<span class="line"><span style="color:#6A737D;"># 6.dd命令直接全盘迁移</span></span>
<span class="line"><span style="color:#6F42C1;">dd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">if=/dev/sda</span><span style="color:#24292E;"> </span><span style="color:#032F62;">of=/dev/sdb</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bs=</span><span style="color:#005CC5;">4096</span><span style="color:#24292E;"> </span><span style="color:#032F62;">conv=sync,noerror</span></span>
<span class="line"><span style="color:#6A737D;"># 7.拷贝完成后使用新磁盘启动</span></span>
<span class="line"><span style="color:#6A737D;"># 8.删除旧分区&amp;resize</span></span>
<span class="line"><span style="color:#6F42C1;">fdisk</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/dev/sdX</span></span>
<span class="line"><span style="color:#6F42C1;">d</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#删除磁盘最后一个分区</span></span>
<span class="line"><span style="color:#6F42C1;">n</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#新建一个分区，扇区开始结束都用默认即可</span></span>
<span class="line"><span style="color:#6F42C1;">w</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#写盘保存</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">partprobe</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#重新读取分区表并更新分区信息</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">resize2fs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/dev/sdXX</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#调整文件系统的大小</span></span></code></pre></div>`,9),o=[e];function c(t,r,i,d,y,E){return n(),a("div",null,o)}const v=s(p,[["render",c]]);export{u as __pageData,v as default};
