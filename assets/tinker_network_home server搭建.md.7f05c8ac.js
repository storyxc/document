import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.4a66d6f9.js";const u=JSON.parse('{"title":"家庭服务器home server搭建","description":"","frontmatter":{},"headers":[],"relativePath":"tinker/network/home server搭建.md","filePath":"tinker/network/home server搭建.md","lastUpdated":1704522520000}'),p={name:"tinker/network/home server搭建.md"},o=l(`<h1 id="家庭服务器home-server搭建" tabindex="-1">家庭服务器home server搭建 <a class="header-anchor" href="#家庭服务器home-server搭建" aria-label="Permalink to &quot;家庭服务器home server搭建&quot;">​</a></h1><p>一直想搞一台nas玩玩儿，但是看了群晖、威联通这些成品nas低到令人发指的性价比，我最终还是决定diy一台小主机来实现自己的需求。</p><h2 id="需求分析" tabindex="-1">需求分析 <a class="header-anchor" href="#需求分析" aria-label="Permalink to &quot;需求分析&quot;">​</a></h2><h3 id="需求" tabindex="-1">需求 <a class="header-anchor" href="#需求" aria-label="Permalink to &quot;需求&quot;">​</a></h3><ol><li>共享存储</li><li>Docker服务</li><li>跑一些测试程序</li></ol><h3 id="分析" tabindex="-1">分析 <a class="header-anchor" href="#分析" aria-label="Permalink to &quot;分析&quot;">​</a></h3><ol><li></li></ol><p>PC上还有块4T的希捷酷鹰，再添3块4T紫盘组raid5阵列。机箱的盘位就至少需要4个以上，挑了一圈就乔思伯N1（5盘位）和万由的810A（8盘位）能看的过去，虽然万由盘位多但是价格比n1高了大几百，目前也用不到这么多盘位，因此机箱确定了n1，主板也要买itx版型。</p><ol start="2"><li><p>要跑的docker容器比较多，下载器服务、阿里云的webdav容器、直播录制程序容器等等。。。因此内存需要32G以上。</p></li><li><p>确定使用的系统是个比较复杂的过程，因为有过PVE虚拟机翻车的经历，这个服务器又主要承载了数据存储功能，所以要追求稳定，因此首先排除PVE和ESXi这些虚拟机系统，直接物理机装系统。然后我在虚拟机上装了最新版的Truenas scale体验了一下，这个系统是基于debian用python开发的，交互上倒没什么问题，但是因为是个纯nas系统，对主系统限制较多，自由度不高（不能直接装软件），因此也被pass，黑群晖这些就不说了，在我看来还不如truenas。一圈排除下来就只能直接装linux server了。去V2EX论坛问了老哥们的意见，推荐debian的很多，也有建议用最熟悉的系统的，最后我选择了后者，选了比较有把握的ubuntu server，正好ubuntu的22.04发行版刚出，就直接安排上了。</p></li></ol><h2 id="硬件" tabindex="-1">硬件 <a class="header-anchor" href="#硬件" aria-label="Permalink to &quot;硬件&quot;">​</a></h2><p>经过了好几天的挑选，最终敲定了这套配置</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cpu：i3-10100散片</span></span>
<span class="line"><span style="color:#e1e4e8;">主板：七彩虹cvn b460i frozen</span></span>
<span class="line"><span style="color:#e1e4e8;">内存：金士顿16g*2 2666</span></span>
<span class="line"><span style="color:#e1e4e8;">固态：七彩虹 ssd sata3 128g</span></span>
<span class="line"><span style="color:#e1e4e8;">cpu散热：超频3刀锋</span></span>
<span class="line"><span style="color:#e1e4e8;">机械硬盘：西数海康oem紫盘4t*3 </span></span>
<span class="line"><span style="color:#e1e4e8;">电源：tt 350w sfx电源</span></span>
<span class="line"><span style="color:#e1e4e8;">机箱+线材：乔思伯n1</span></span>
<span class="line"><span style="color:#e1e4e8;">扩展卡：乐扩m2转sata3接口扩展卡</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cpu：i3-10100散片</span></span>
<span class="line"><span style="color:#24292e;">主板：七彩虹cvn b460i frozen</span></span>
<span class="line"><span style="color:#24292e;">内存：金士顿16g*2 2666</span></span>
<span class="line"><span style="color:#24292e;">固态：七彩虹 ssd sata3 128g</span></span>
<span class="line"><span style="color:#24292e;">cpu散热：超频3刀锋</span></span>
<span class="line"><span style="color:#24292e;">机械硬盘：西数海康oem紫盘4t*3 </span></span>
<span class="line"><span style="color:#24292e;">电源：tt 350w sfx电源</span></span>
<span class="line"><span style="color:#24292e;">机箱+线材：乔思伯n1</span></span>
<span class="line"><span style="color:#24292e;">扩展卡：乐扩m2转sata3接口扩展卡</span></span></code></pre></div><p>其中散热、固态是在公司的福利商城购买，cpu、机械硬盘、机箱、扩展卡在淘宝购买，主板、电源在京东购买，内存在咸鱼淘的。不算硬盘花费是2480，加上硬盘3755。</p><p>组装完成后：</p><ul><li>灵魂走线，又不是不能用(doge）</li></ul><p><img src="https://storyxc.com/images/blog/D55DA0D4-322D-4A49-9634-9DB667BDD7A4_1_105_c.jpeg" alt="D55DA0D4-322D-4A49-9634-9DB667BDD7A4_1_105_c"></p><ul><li>侧面</li></ul><p><img src="https://storyxc.com/images/blog/6C0A8FED-B95C-4FE5-ACCB-32DD8DF553E8_1_105_c.jpeg" alt="6C0A8FED-B95C-4FE5-ACCB-32DD8DF553E8_1_105_c"></p><p><img src="https://storyxc.com/images/blog/B4E46C72-2CA5-4727-AD52-F3C25F94A74B_1_102_o.jpeg" alt="B4E46C72-2CA5-4727-AD52-F3C25F94A74B_1_102_o"></p><p>跟其他工业风机箱比起来，乔思伯n1这款颜值还是很不错的。</p><h2 id="系统搭建" tabindex="-1">系统搭建 <a class="header-anchor" href="#系统搭建" aria-label="Permalink to &quot;系统搭建&quot;">​</a></h2><h3 id="操作系统安装" tabindex="-1">操作系统安装 <a class="header-anchor" href="#操作系统安装" aria-label="Permalink to &quot;操作系统安装&quot;">​</a></h3><p>ubuntu官网下载最新版的ubuntu-server-22.04，然后rufus刷写到U盘中，使用U盘引导启动。</p><p>安装过程不再赘述，这里记录几个重点步骤：</p><ol><li></li></ol><p>在配置Ubuntu安装镜像这一步最好选择国内的企业/大学镜像站，不然后面安装可能会在下载时卡住。网易镜像源<code>http://mirrors.163.com/ubuntu/</code>，阿里云镜像源<code>https://mirrors.aliyun.com/ubuntu/</code>，清华源<code>https://mirrors.tuna.tsinghua.edu.cn/ubuntu/</code></p><ol start="2"><li>磁盘分区选择自定义，然后根据自己的情况进行分区，我的固态只分了<code>/</code>和<code>/boot</code> 两个区，然后四块4T机械组了raid5。（ubuntu在建立阵列后会立刻进入重建过程，阵列中会有一个分区状态为<code>spare rebuilding</code> ，其他分区为<code>active sync</code>。这个重建过程很久，我4块4T重建总共用了十几个小时，重建完成后阵列下所有分区都会变为<code>active sync</code> 状态</li></ol><p><img src="https://storyxc.com/images/blog/image-20220501014554319.png" alt="image-20220501014554319"></p><h2 id="基础配置" tabindex="-1">基础配置 <a class="header-anchor" href="#基础配置" aria-label="Permalink to &quot;基础配置&quot;">​</a></h2><ul><li><p>开启root登陆</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/ssh/sshd_config</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 添加配置</span></span>
<span class="line"><span style="color:#B392F0;">PermitRootLogin</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 给root修改密码</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">passwd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sshd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/ssh/sshd_config</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 添加配置</span></span>
<span class="line"><span style="color:#6F42C1;">PermitRootLogin</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 给root修改密码</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">passwd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sshd</span></span></code></pre></div></li><li><p>启用密钥登陆</p></li></ul><p>见另一篇博客 <code>阿里云服务器启用密钥登陆并禁用密码登陆</code></p><ul><li><p>时区同步</p><p><code>sudo cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</code></p></li></ul><h2 id="安装服务" tabindex="-1">安装服务 <a class="header-anchor" href="#安装服务" aria-label="Permalink to &quot;安装服务&quot;">​</a></h2><p>这个部分长期更新XD，一点点补上吧。</p><h3 id="samba文件共享服务" tabindex="-1">samba文件共享服务 <a class="header-anchor" href="#samba文件共享服务" aria-label="Permalink to &quot;samba文件共享服务&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 安装samba</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apt</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">samba</span></span>
<span class="line"><span style="color:#6A737D;"># 启动smb</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">smb</span></span>
<span class="line"><span style="color:#6A737D;"># 开机自启</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">smb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建共享文件夹 设置权限770</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">chmod</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">770</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 添加用户和密码</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">smbpasswd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-a</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">用户名</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 修改配置文件，在文件最后添加共享资源设置</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/samba/smb.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[data]</span></span>
<span class="line"><span style="color:#B392F0;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data</span></span>
<span class="line"><span style="color:#B392F0;">available</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yes</span></span>
<span class="line"><span style="color:#B392F0;">browseable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yes</span></span>
<span class="line"><span style="color:#B392F0;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">no</span></span>
<span class="line"><span style="color:#B392F0;">writable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yes</span></span>
<span class="line"><span style="color:#B392F0;">valid</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">users</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">story</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 安装samba</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">samba</span></span>
<span class="line"><span style="color:#6A737D;"># 启动smb</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">smb</span></span>
<span class="line"><span style="color:#6A737D;"># 开机自启</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">smb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建共享文件夹 设置权限770</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">chmod</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">770</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 添加用户和密码</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">smbpasswd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-a</span><span style="color:#24292E;"> </span><span style="color:#032F62;">用户名</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 修改配置文件，在文件最后添加共享资源设置</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/samba/smb.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[data]</span></span>
<span class="line"><span style="color:#6F42C1;">path</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data</span></span>
<span class="line"><span style="color:#6F42C1;">available</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yes</span></span>
<span class="line"><span style="color:#6F42C1;">browseable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yes</span></span>
<span class="line"><span style="color:#6F42C1;">public</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">no</span></span>
<span class="line"><span style="color:#6F42C1;">writable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yes</span></span>
<span class="line"><span style="color:#6F42C1;">valid</span><span style="color:#24292E;"> </span><span style="color:#032F62;">users</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">story</span></span></code></pre></div><blockquote><p>samba共享配置详解</p><p>[temp] #共享资源名称</p><p>comment = Temporary file space #简单的解释，内容无关紧要</p><p>path = /tmp #实际的共享目录</p><p>writable = yes #设置为可写入</p><p>browseable = yes #可以被所有用户浏览到资源名称，</p><p>guest ok = yes #可以让用户随意登录</p><p>public = yes #允许匿名查看</p><p>valid users = 用户名 #设置访问用户</p><p>valid users = @组名 #设置访问组</p><p>readonly = yes #只读</p><p>readonly = no #读写</p><p>hosts deny = 192.168.0.0 #表示禁止所有来自192.168.0.0/24 网段的IP 地址访问</p><p>hosts allow = 192.168.0.24 #表示允许192.168.0.24 这个IP 地址访问</p><p>[homes]为特殊共享目录，表示用户主目录。</p><p>[printers]表示共享打印机。</p><p>原文链接：<a href="https://blog.csdn.net/l1593572468/article/details/121444812" target="_blank" rel="noreferrer">https://blog.csdn.net/l1593572468/article/details/121444812</a></p></blockquote><h3 id="docker安装" tabindex="-1">Docker安装 <a class="header-anchor" href="#docker安装" aria-label="Permalink to &quot;Docker安装&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># Uninstall old versions</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apt-get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">remove</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-engine</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker.io</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">containerd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">runc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Update the apt package index and install packages to allow apt to use a repository over HTTPS:</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apt-get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">update</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apt-get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">ca-certificates</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">gnupg</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">lsb-release</span></span>
<span class="line"><span style="color:#6A737D;"># Add Docker’s official GPG key:</span></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-fsSL</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://download.docker.com/linux/ubuntu/gpg</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gpg</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--dearmor</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-o</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/share/keyrings/docker-archive-keyring.gpg</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Use the following command to set up the stable repository.</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;deb [arch=$(</span><span style="color:#B392F0;">dpkg</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">--print-architecture</span><span style="color:#9ECBFF;">) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  $(</span><span style="color:#B392F0;">lsb_release</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-cs</span><span style="color:#9ECBFF;">) stable&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/apt/sources.list.d/docker.list</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/dev/null</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#6A737D;"># Install Docker Engine</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apt-get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">update</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apt-get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-ce</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-ce-cli</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">containerd.io</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-compose-plugin</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># Uninstall old versions</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apt-get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">remove</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-engine</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker.io</span><span style="color:#24292E;"> </span><span style="color:#032F62;">containerd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">runc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Update the apt package index and install packages to allow apt to use a repository over HTTPS:</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apt-get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">update</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apt-get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">ca-certificates</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">gnupg</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">lsb-release</span></span>
<span class="line"><span style="color:#6A737D;"># Add Docker’s official GPG key:</span></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-fsSL</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://download.docker.com/linux/ubuntu/gpg</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gpg</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--dearmor</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-o</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/share/keyrings/docker-archive-keyring.gpg</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Use the following command to set up the stable repository.</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;deb [arch=$(</span><span style="color:#6F42C1;">dpkg</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">--print-architecture</span><span style="color:#032F62;">) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  $(</span><span style="color:#6F42C1;">lsb_release</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-cs</span><span style="color:#032F62;">) stable&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/apt/sources.list.d/docker.list</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/dev/null</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#6A737D;"># Install Docker Engine</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apt-get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">update</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apt-get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-ce</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-ce-cli</span><span style="color:#24292E;"> </span><span style="color:#032F62;">containerd.io</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-compose-plugin</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span></span></code></pre></div><h3 id="挂载阿里云盘" tabindex="-1">挂载阿里云盘 <a class="header-anchor" href="#挂载阿里云盘" aria-label="Permalink to &quot;挂载阿里云盘&quot;">​</a></h3><p>参考另一篇博客<code>挂载阿里云盘+开机自动挂载</code></p><h3 id="transmission" tabindex="-1">transmission <a class="header-anchor" href="#transmission" aria-label="Permalink to &quot;transmission&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--name=transmission</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TRANSMISSION_WEB_HOME=/transmission-web-control/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PUID=</span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PGID=</span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TZ=Asia/Shanghai</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">USER=</span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">use</span><span style="color:#E1E4E8;">r</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PASS=</span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">pas</span><span style="color:#E1E4E8;">s</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">19091</span><span style="color:#9ECBFF;">:9091</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">51413</span><span style="color:#9ECBFF;">:51413</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">51413</span><span style="color:#9ECBFF;">:51413/udp</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data/docker/transmission/data:/config</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data/downloads/others:/downloads/others</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data/downloads/tvseries:/downloads/tvseries</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data/docker/transmission/watch/folder:/watch</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data/downloads/movies:/downloads/movies</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--restart=always</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">linuxserver/transmission</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--name=transmission</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TRANSMISSION_WEB_HOME=/transmission-web-control/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PUID=</span><span style="color:#005CC5;">1000</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PGID=</span><span style="color:#005CC5;">1000</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TZ=Asia/Shanghai</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">USER=</span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">use</span><span style="color:#24292E;">r</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PASS=</span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">pas</span><span style="color:#24292E;">s</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">19091</span><span style="color:#032F62;">:9091</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">51413</span><span style="color:#032F62;">:51413</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">51413</span><span style="color:#032F62;">:51413/udp</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data/docker/transmission/data:/config</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data/downloads/others:/downloads/others</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data/downloads/tvseries:/downloads/tvseries</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data/docker/transmission/watch/folder:/watch</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data/downloads/movies:/downloads/movies</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--restart=always</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">linuxserver/transmission</span></span></code></pre></div><h3 id="qbittorrent" tabindex="-1">qbittorrent <a class="header-anchor" href="#qbittorrent" aria-label="Permalink to &quot;qbittorrent&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">version:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;3.2&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">services:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">qbittorrent:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">image:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nevinee/qbittorrent:4.3.9</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">container_name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">qbittorrent</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">environment:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PUID=</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PGID=</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TZ=Asia/Shanghai</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">WEBUI_PORT=</span><span style="color:#79B8FF;">18080</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">BT_PORT=</span><span style="color:#79B8FF;">55555</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">volumes:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data/docker/qbittorrent/config:/data</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/repo:/downloads</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">network_mode:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">host</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">restart:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">unless-stopped</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">version:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;3.2&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">services:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">qbittorrent:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">image:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nevinee/qbittorrent:4.3.9</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">container_name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">qbittorrent</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">environment:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PUID=</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PGID=</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TZ=Asia/Shanghai</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">WEBUI_PORT=</span><span style="color:#005CC5;">18080</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">BT_PORT=</span><span style="color:#005CC5;">55555</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">volumes:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data/docker/qbittorrent/config:/data</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/repo:/downloads</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">network_mode:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">host</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">restart:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">unless-stopped</span></span></code></pre></div><h3 id="aria2" tabindex="-1">aria2 <a class="header-anchor" href="#aria2" aria-label="Permalink to &quot;aria2&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">aria2</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">--restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">always</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">--log-opt</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">max-size=</span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TZ=Asia/Shanghai</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PUID=</span><span style="color:#E1E4E8;">$UID </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PGID=</span><span style="color:#E1E4E8;">$GID </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">UMASK_SET=</span><span style="color:#79B8FF;">022</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">RPC_SECRET=</span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">secre</span><span style="color:#E1E4E8;">t</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">RPC_PORT=</span><span style="color:#79B8FF;">16800</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16800</span><span style="color:#9ECBFF;">:16800</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">LISTEN_PORT=</span><span style="color:#79B8FF;">16888</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16888</span><span style="color:#9ECBFF;">:16888</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16888</span><span style="color:#9ECBFF;">:16888/udp</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data/docker/aria2/config:/config</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data/downloads/tvseries:/downloads/tvseries</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data/downloads/movies:/downloads/movies</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data/downloads/others:/downloads/others</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">p3terx/aria2-pro</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">aria2</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">always</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--log-opt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">max-size=</span><span style="color:#005CC5;">1</span><span style="color:#032F62;">m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TZ=Asia/Shanghai</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PUID=</span><span style="color:#24292E;">$UID </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PGID=</span><span style="color:#24292E;">$GID </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">UMASK_SET=</span><span style="color:#005CC5;">022</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">RPC_SECRET=</span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">secre</span><span style="color:#24292E;">t</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">RPC_PORT=</span><span style="color:#005CC5;">16800</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16800</span><span style="color:#032F62;">:16800</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">LISTEN_PORT=</span><span style="color:#005CC5;">16888</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16888</span><span style="color:#032F62;">:16888</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16888</span><span style="color:#032F62;">:16888/udp</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data/docker/aria2/config:/config</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data/downloads/tvseries:/downloads/tvseries</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data/downloads/movies:/downloads/movies</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data/downloads/others:/downloads/others</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">p3terx/aria2-pro</span></span></code></pre></div><h3 id="jellyfin" tabindex="-1">jellyfin <a class="header-anchor" href="#jellyfin" aria-label="Permalink to &quot;jellyfin&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">version:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;3.2&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">services:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">jenkins:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">image:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">jenkins/jenkins:2.332.3-jdk11</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">container_name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">jenkins</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">environment:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TZ=Asia/Shanghai</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">user:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">volumes:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/story/dist:/story/dist</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data/docker/jenkins/jenkins_data:/var/jenkins_home</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/localtime:/etc/localtime:ro</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">ports:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;8099:8080&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">restart:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">unless-stopped</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">version:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;3.2&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">services:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">jenkins:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">image:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">jenkins/jenkins:2.332.3-jdk11</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">container_name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">jenkins</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">environment:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TZ=Asia/Shanghai</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">user:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">volumes:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/story/dist:/story/dist</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data/docker/jenkins/jenkins_data:/var/jenkins_home</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/localtime:/etc/localtime:ro</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ports:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;8099:8080&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">restart:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">unless-stopped</span></span></code></pre></div><h4 id="jellyfin硬解" tabindex="-1">jellyfin硬解 <a class="header-anchor" href="#jellyfin硬解" aria-label="Permalink to &quot;jellyfin硬解&quot;">​</a></h4><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 安装驱动</span></span>
<span class="line"><span style="color:#B392F0;">apt</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">intel-media-va-driver</span></span>
<span class="line"><span style="color:#6A737D;"># 解码支持确认</span></span>
<span class="line"><span style="color:#B392F0;">/usr/lib/jellyfin-ffmpeg/vainfo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 安装驱动</span></span>
<span class="line"><span style="color:#6F42C1;">apt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">intel-media-va-driver</span></span>
<span class="line"><span style="color:#6A737D;"># 解码支持确认</span></span>
<span class="line"><span style="color:#6F42C1;">/usr/lib/jellyfin-ffmpeg/vainfo</span></span></code></pre></div><p><img src="https://storyxc.com/images/blog/43b766ec-e5a4-4f1c-a06b-97c4b9eb7924.png" alt="image-20230828233842999"></p><h3 id="kafka" tabindex="-1">kafka <a class="header-anchor" href="#kafka" aria-label="Permalink to &quot;kafka&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://downloads.apache.org/kafka/3.6.1/kafka_2.13-3.6.1.tgz</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-xzvf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kafka_2.13-3.6.1.tgz</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-C</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://downloads.apache.org/kafka/3.6.1/kafka_2.13-3.6.1.tgz</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-xzvf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kafka_2.13-3.6.1.tgz</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-C</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local</span></span></code></pre></div><p>zookeeper.service</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[Unit]</span></span>
<span class="line"><span style="color:#E1E4E8;">Description</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">zookeeper</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Service]</span></span>
<span class="line"><span style="color:#E1E4E8;">Type</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">forking</span></span>
<span class="line"><span style="color:#E1E4E8;">Environment</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecStart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/usr/local/kafka/bin/zookeeper-server-start.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">-daemon</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/kafka/config/zookeeper.properties</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecStop</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/usr/local/kafka/bin/zookeeper-server-start.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">stop</span></span>
<span class="line"><span style="color:#E1E4E8;">SyslogIdentifier</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">zookeeper</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Install]</span></span>
<span class="line"><span style="color:#E1E4E8;">WantedBy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[Unit]</span></span>
<span class="line"><span style="color:#24292E;">Description</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">zookeeper</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Service]</span></span>
<span class="line"><span style="color:#24292E;">Type</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">forking</span></span>
<span class="line"><span style="color:#24292E;">Environment</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin&quot;</span></span>
<span class="line"><span style="color:#24292E;">ExecStart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/usr/local/kafka/bin/zookeeper-server-start.sh</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">-daemon</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/kafka/config/zookeeper.properties</span></span>
<span class="line"><span style="color:#24292E;">ExecStop</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/usr/local/kafka/bin/zookeeper-server-start.sh</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">stop</span></span>
<span class="line"><span style="color:#24292E;">SyslogIdentifier</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">zookeeper</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Install]</span></span>
<span class="line"><span style="color:#24292E;">WantedBy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">multi-user.target</span></span></code></pre></div><p>kafka.service</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[Unit]</span></span>
<span class="line"><span style="color:#E1E4E8;">Description</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">kafka</span></span>
<span class="line"><span style="color:#E1E4E8;">After</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">zookeeper.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Service]</span></span>
<span class="line"><span style="color:#E1E4E8;">Type</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">forking</span></span>
<span class="line"><span style="color:#E1E4E8;">Environment</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecStart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/usr/local/kafka/bin/kafka-server-start.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">-daemon</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/kafka/config/server.properties</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecStop</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/usr/local/kafka/bin/kafka-server-stop.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Install]</span></span>
<span class="line"><span style="color:#E1E4E8;">WantedBy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[Unit]</span></span>
<span class="line"><span style="color:#24292E;">Description</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">kafka</span></span>
<span class="line"><span style="color:#24292E;">After</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">zookeeper.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Service]</span></span>
<span class="line"><span style="color:#24292E;">Type</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">forking</span></span>
<span class="line"><span style="color:#24292E;">Environment</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin&quot;</span></span>
<span class="line"><span style="color:#24292E;">ExecStart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/usr/local/kafka/bin/kafka-server-start.sh</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">-daemon</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/kafka/config/server.properties</span></span>
<span class="line"><span style="color:#24292E;">ExecStop</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/usr/local/kafka/bin/kafka-server-stop.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Install]</span></span>
<span class="line"><span style="color:#24292E;">WantedBy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">multi-user.target</span></span></code></pre></div><h3 id="onedev" tabindex="-1">onedev <a class="header-anchor" href="#onedev" aria-label="Permalink to &quot;onedev&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">onedev</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/run/docker.sock:/var/run/docker.sock</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mnt/data/docker/onedev:/opt/onedev</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6610</span><span style="color:#9ECBFF;">:6610</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\ </span><span style="color:#9ECBFF;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6611</span><span style="color:#9ECBFF;">:6611</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\ </span><span style="color:#9ECBFF;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ssh</span></span>
<span class="line"><span style="color:#E1E4E8;">  --restart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">always</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">1dev/server:latest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">onedev</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/run/docker.sock:/var/run/docker.sock</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mnt/data/docker/onedev:/opt/onedev</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6610</span><span style="color:#032F62;">:6610</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\ </span><span style="color:#032F62;">#</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6611</span><span style="color:#032F62;">:6611</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\ </span><span style="color:#032F62;">#</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ssh</span></span>
<span class="line"><span style="color:#24292E;">  --restart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">always</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">1dev/server:latest</span></span></code></pre></div><h3 id="rabbitmq" tabindex="-1">rabbitmq <a class="header-anchor" href="#rabbitmq" aria-label="Permalink to &quot;rabbitmq&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apt</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rabbitmq-server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/lib/rabbitmq/bin</span></span>
<span class="line"><span style="color:#6A737D;"># 开启rabbit网页控制台 默认端口号15672,重启rabbitmq服务</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">./rabbitmq-plugins</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rabbitmq_management</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#6A737D;"># rabbitmq默认用户guest不允许远程登陆，且systemd默认的启动用户为rabbitmq，可以改为root</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/lib/systemd/system</span></span>
<span class="line"><span style="color:#B392F0;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rabbitmq-server.service</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#6A737D;"># 新建rabbitmq用户</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/lib/rabbitmq/bin</span></span>
<span class="line"><span style="color:#B392F0;">./rabbitmqctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add_user</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">username</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">password</span></span>
<span class="line"><span style="color:#6A737D;"># 授权</span></span>
<span class="line"><span style="color:#B392F0;">./rabbitmqctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set_user_tags</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">username</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">administrator</span></span>
<span class="line"><span style="color:#B392F0;">./rabbitmqctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set_permissions</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">username</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;.*&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;.*&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;.*&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#6A737D;"># 查看、删除、修改密码</span></span>
<span class="line"><span style="color:#B392F0;">./rabbitmqctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">list_users</span></span>
<span class="line"><span style="color:#B392F0;">./rabbitmqctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">delete_user</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">username</span></span>
<span class="line"><span style="color:#B392F0;">./rabbitmqctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">change_password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">username</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">newpassword</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rabbitmq-server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/lib/rabbitmq/bin</span></span>
<span class="line"><span style="color:#6A737D;"># 开启rabbit网页控制台 默认端口号15672,重启rabbitmq服务</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">./rabbitmq-plugins</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rabbitmq_management</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;"># rabbitmq默认用户guest不允许远程登陆，且systemd默认的启动用户为rabbitmq，可以改为root</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/lib/systemd/system</span></span>
<span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rabbitmq-server.service</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;"># 新建rabbitmq用户</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/lib/rabbitmq/bin</span></span>
<span class="line"><span style="color:#6F42C1;">./rabbitmqctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add_user</span><span style="color:#24292E;"> </span><span style="color:#032F62;">username</span><span style="color:#24292E;"> </span><span style="color:#032F62;">password</span></span>
<span class="line"><span style="color:#6A737D;"># 授权</span></span>
<span class="line"><span style="color:#6F42C1;">./rabbitmqctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set_user_tags</span><span style="color:#24292E;"> </span><span style="color:#032F62;">username</span><span style="color:#24292E;"> </span><span style="color:#032F62;">administrator</span></span>
<span class="line"><span style="color:#6F42C1;">./rabbitmqctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set_permissions</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">username</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;.*&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;.*&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;.*&quot;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;"># 查看、删除、修改密码</span></span>
<span class="line"><span style="color:#6F42C1;">./rabbitmqctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list_users</span></span>
<span class="line"><span style="color:#6F42C1;">./rabbitmqctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">delete_user</span><span style="color:#24292E;"> </span><span style="color:#032F62;">username</span></span>
<span class="line"><span style="color:#6F42C1;">./rabbitmqctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">change_password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">username</span><span style="color:#24292E;"> </span><span style="color:#032F62;">newpassword</span></span></code></pre></div><h3 id="gitea" tabindex="-1">gitea <a class="header-anchor" href="#gitea" aria-label="Permalink to &quot;gitea&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;3&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">gitea</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">external</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">gitea</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">driver</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">local</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">server</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">gitea/gitea:1.16.7</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">gitea</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">DOMAIN=192.168.2.66</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">HTTP_PORT=6610</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">SSH_PORT=6611</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">SSH_LISTEN_PORT=6611</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">always</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">gitea</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">gitea:/data</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/etc/timezone:/etc/timezone:ro</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/etc/localtime:/etc/localtime:ro</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;6610:6610&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;6611:6611&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;3&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">gitea</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">gitea</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">driver</span><span style="color:#24292E;">: </span><span style="color:#032F62;">local</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">gitea/gitea:1.16.7</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">gitea</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">DOMAIN=192.168.2.66</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">HTTP_PORT=6610</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">SSH_PORT=6611</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">SSH_LISTEN_PORT=6611</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">always</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">gitea</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">gitea:/data</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/etc/timezone:/etc/timezone:ro</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/etc/localtime:/etc/localtime:ro</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;6610:6610&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;6611:6611&quot;</span></span></code></pre></div><h4 id="gitea-webhook-allowed-host-list" tabindex="-1">gitea webhook allowed host list <a class="header-anchor" href="#gitea-webhook-allowed-host-list" aria-label="Permalink to &quot;gitea webhook allowed host list&quot;">​</a></h4><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">/var/lib/docker/volumes/gitea_gitea/_data/gitea/conf/app.ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># add the following lines to the end of the file</span></span>
<span class="line"><span style="color:#E1E4E8;">[webhook]</span></span>
<span class="line"><span style="color:#B392F0;">ALLOWED_HOST_LIST</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.2.66</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">/var/lib/docker/volumes/gitea_gitea/_data/gitea/conf/app.ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># add the following lines to the end of the file</span></span>
<span class="line"><span style="color:#24292E;">[webhook]</span></span>
<span class="line"><span style="color:#6F42C1;">ALLOWED_HOST_LIST</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.2.66</span></span></code></pre></div><h4 id="gitea-and-jenkins-webhook" tabindex="-1">gitea and jenkins webhook <a class="header-anchor" href="#gitea-and-jenkins-webhook" aria-label="Permalink to &quot;gitea and jenkins webhook&quot;">​</a></h4><p>In Jenkins: on the job settings page set &quot;Source Code Management&quot; option to &quot;Git&quot;, provide URL to your repo (<a href="http://gitea-url.your.org/username/repo.git" target="_blank" rel="noreferrer">http://gitea-url.your.org/username/repo.git</a>), and in &quot;Poll triggers&quot; section check &quot;Poll SCM&quot; option with no schedule defined. This setup basically tells Jenkins to poll your Gitea repo only when requested via the webhook.</p><p>In Gitea: under repo -&gt; Settings -&gt; Webhooks, add new webhook, set the URL to http://jenkins_url.your.org/gitea-webhook/post, and clear the secret (leave it blank).</p><p>At this point clicking on &quot;Test Delivery&quot; button should produce a successful delivery attempt (green checkmark).</p><h3 id="kafdrop" tabindex="-1">kafdrop <a class="header-anchor" href="#kafdrop" aria-label="Permalink to &quot;kafdrop&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kafkaui</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9000</span><span style="color:#9ECBFF;">:9000</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">KAFKA_BROKERCONNECT=&quot;192.168.2.66:9092&quot;</span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">JVM_OPTS=&quot;-Xms32M -Xmx64M&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">SERVER_SERVLET_CONTEXTPATH=&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">obsidiandynamics/kafdrop</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kafkaui</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9000</span><span style="color:#032F62;">:9000</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">KAFKA_BROKERCONNECT=&quot;192.168.2.66:9092&quot;</span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">JVM_OPTS=&quot;-Xms32M -Xmx64M&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">SERVER_SERVLET_CONTEXTPATH=&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">obsidiandynamics/kafdrop</span></span></code></pre></div><h3 id="cadvisor-docker监控" tabindex="-1">cadvisor Docker监控 <a class="header-anchor" href="#cadvisor-docker监控" aria-label="Permalink to &quot;cadvisor Docker监控&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">cadvisor</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">gcr.io/cadvisor/cadvisor:v0.47.2</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">cadvisor</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/:/rootfs:ro</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/var/run:/var/run:ro</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/sys:/sys:ro</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/var/lib/docker/:/var/lib/docker:ro</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/dev/disk/:/dev/disk:ro</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;28080:8080&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">privileged</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">unless-stopped</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">devices</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/dev/kmsg</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">cadvisor</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">gcr.io/cadvisor/cadvisor:v0.47.2</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">cadvisor</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/:/rootfs:ro</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/var/run:/var/run:ro</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/sys:/sys:ro</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/var/lib/docker/:/var/lib/docker:ro</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/dev/disk/:/dev/disk:ro</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;28080:8080&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">privileged</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">unless-stopped</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">devices</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/dev/kmsg</span></span></code></pre></div><h3 id="grafana-prometheus-node-exporter监控linux系统" tabindex="-1">grafana+prometheus+node_exporter监控linux系统 <a class="header-anchor" href="#grafana-prometheus-node-exporter监控linux系统" aria-label="Permalink to &quot;grafana+prometheus+node_exporter监控linux系统&quot;">​</a></h3><h4 id="node-exporter" tabindex="-1">node_exporter <a class="header-anchor" href="#node-exporter" aria-label="Permalink to &quot;node_exporter&quot;">​</a></h4><ul><li><code>wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz</code></li><li><code>tar -zxvf node_exporter-1.6.1.linux-amd64.tar.gz &amp;&amp; mv node_exporter-1.6.1.linux-amd64/node_exporter /usr/local/bin</code></li></ul><h5 id="systemd" tabindex="-1">systemd <a class="header-anchor" href="#systemd" aria-label="Permalink to &quot;systemd&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 编写systemd服务</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/systemd/system/node_exporter.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=node_exporeter</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network.target</span></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">Type=simple</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/local/bin/node_exporter</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=on-failure</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 更新内核并启动，自启动</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">node_exporter</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">node_exporter</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">node_exporter</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 编写systemd服务</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/systemd/system/node_exporter.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=node_exporeter</span></span>
<span class="line"><span style="color:#032F62;">After=network.target</span></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">Type=simple</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/local/bin/node_exporter</span></span>
<span class="line"><span style="color:#032F62;">Restart=on-failure</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 更新内核并启动，自启动</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">node_exporter</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">node_exporter</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">node_exporter</span></span></code></pre></div><h5 id="init-d" tabindex="-1">init.d <a class="header-anchor" href="#init-d" aria-label="Permalink to &quot;init.d&quot;">​</a></h5><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># openwrt要使用init.d</span></span>
<span class="line"><span style="color:#6A737D;"># /etc/init.d/node_exporter</span></span>
<span class="line"><span style="color:#6A737D;">#!/bin/sh /etc/rc.common</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">START</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">99</span></span>
<span class="line"><span style="color:#E1E4E8;">STOP</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Starting Node Exporter...&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">/usr/bin/node_exporter</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--web.listen-address=</span><span style="color:#9ECBFF;">&quot;:9100&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/dev/null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">2&gt;&amp;1</span><span style="color:#E1E4E8;"> &amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">stop</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Stopping Node Exporter...&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">killall</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">node_exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">restart</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">stop</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">sleep</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">start</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># openwrt要使用init.d</span></span>
<span class="line"><span style="color:#6A737D;"># /etc/init.d/node_exporter</span></span>
<span class="line"><span style="color:#6A737D;">#!/bin/sh /etc/rc.common</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">START</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">99</span></span>
<span class="line"><span style="color:#24292E;">STOP</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">start</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Starting Node Exporter...&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">/usr/bin/node_exporter</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--web.listen-address=</span><span style="color:#032F62;">&quot;:9100&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/dev/null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">2&gt;&amp;1</span><span style="color:#24292E;"> &amp;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">stop</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Stopping Node Exporter...&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">killall</span><span style="color:#24292E;"> </span><span style="color:#032F62;">node_exporter</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">restart</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">stop</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">sleep</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">start</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>/etc/init.d/node_exporter enable &amp;&amp; /etc/init.d/node_exporter start </code></p><h4 id="redis-exporter" tabindex="-1">redis_exporter <a class="header-anchor" href="#redis-exporter" aria-label="Permalink to &quot;redis_exporter&quot;">​</a></h4><ul><li><code>wget https://github.com/oliver006/redis_exporter/releases/download/v1.46.0/redis_exporter-v1.46.0.linux-amd64.tar.gz</code></li><li><code>tar -xvf redis_exporter-v1.46.0.linux-amd64.tar.gz &amp;&amp; mv redis_exporter-v1.46.0.linux-amd64/redis_exporter /usr/local/bin</code></li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 编写systemd服务</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/systemd/system/redis_exporter.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=redis_exporter</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network.target</span></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">Type=simple</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/local/bin/redis_exporter -redis.addr ip:port</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=on-failure</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 更新内核并启动，自启动</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis_exporter</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis_exporter</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis_exporter</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 编写systemd服务</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/systemd/system/redis_exporter.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=redis_exporter</span></span>
<span class="line"><span style="color:#032F62;">After=network.target</span></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">Type=simple</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/local/bin/redis_exporter -redis.addr ip:port</span></span>
<span class="line"><span style="color:#032F62;">Restart=on-failure</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 更新内核并启动，自启动</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis_exporter</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis_exporter</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis_exporter</span></span></code></pre></div><h4 id="grafana-prometheus" tabindex="-1">grafana+prometheus <a class="header-anchor" href="#grafana-prometheus" aria-label="Permalink to &quot;grafana+prometheus&quot;">​</a></h4><div class="language-yml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># docker-compose.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;3&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">grafana</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">grafana/grafana</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">grafana</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">unless-stopped</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">3000:3000</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">user</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">root</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/mnt/data/docker/monitor/grafana/conf/grafana.ini:/etc/grafana/grafana.ini</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/mnt/data/docker/monitor/grafana/data:/var/lib/grafana</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/mnt/data/docker/monitor/grafana/provisioning/dashboards:/etc/grafana/provisioning/dashboards</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/mnt/data/docker/monitor/grafana/provisioning/datasources:/etc/grafana/provisioning/datasources</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">TZ=Asia/shanghai</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">prometheus</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prom/prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">unless-stopped</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">9090:9090</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/mnt/data/docker/monitor/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">prometheus_data:/prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">TZ=Asia/shanghai</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">prometheus_data</span><span style="color:#E1E4E8;">:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># docker-compose.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;3&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">grafana</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">grafana/grafana</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">grafana</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">unless-stopped</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">3000:3000</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">user</span><span style="color:#24292E;">: </span><span style="color:#032F62;">root</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/mnt/data/docker/monitor/grafana/conf/grafana.ini:/etc/grafana/grafana.ini</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/mnt/data/docker/monitor/grafana/data:/var/lib/grafana</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/mnt/data/docker/monitor/grafana/provisioning/dashboards:/etc/grafana/provisioning/dashboards</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/mnt/data/docker/monitor/grafana/provisioning/datasources:/etc/grafana/provisioning/datasources</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">TZ=Asia/shanghai</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">prometheus</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prom/prometheus</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">unless-stopped</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">9090:9090</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/mnt/data/docker/monitor/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">prometheus_data:/prometheus</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">TZ=Asia/shanghai</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">prometheus_data</span><span style="color:#24292E;">:</span></span></code></pre></div><p>prometheus.yml</p><div class="language-yml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">global</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">scrape_interval</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">15s</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">evaluation_interval</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">15s</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">scrape_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;linux&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">scrape_interval</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5s</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">: [ </span><span style="color:#9ECBFF;">&quot;192.168.2.66:9100&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">instance</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">home-server-ubuntu</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;redis&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">scrape_interval</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5s</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">: [ </span><span style="color:#9ECBFF;">&quot;192.168.2.66:9121&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">instance</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">home-server-ubuntu</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;cadvisor&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">: [ </span><span style="color:#9ECBFF;">&quot;192.168.2.66:28080&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">instance</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">home-server-ubuntu</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">global</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">scrape_interval</span><span style="color:#24292E;">: </span><span style="color:#032F62;">15s</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">evaluation_interval</span><span style="color:#24292E;">: </span><span style="color:#032F62;">15s</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">scrape_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;linux&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">scrape_interval</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5s</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">: [ </span><span style="color:#032F62;">&quot;192.168.2.66:9100&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">instance</span><span style="color:#24292E;">: </span><span style="color:#032F62;">home-server-ubuntu</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;redis&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">scrape_interval</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5s</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">: [ </span><span style="color:#032F62;">&quot;192.168.2.66:9121&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">instance</span><span style="color:#24292E;">: </span><span style="color:#032F62;">home-server-ubuntu</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;cadvisor&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">: [ </span><span style="color:#032F62;">&quot;192.168.2.66:28080&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">instance</span><span style="color:#24292E;">: </span><span style="color:#032F62;">home-server-ubuntu</span></span></code></pre></div><ul><li>grafana.ini 从空白容器里复制出一份</li></ul><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker cp grafana:/etc/grafana.ini ~/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker cp grafana:/etc/grafana.ini ~/</span></span></code></pre></div><ul><li><p>grafana监控大盘模板</p><ul><li><p><a href="https://grafana.com/grafana/dashboards/12633-linux/" target="_blank" rel="noreferrer">12633</a>(Linux主机详情)</p></li><li><p><a href="https://grafana.com/grafana/dashboards/1860-node-exporter-full/" target="_blank" rel="noreferrer">1860</a>(Node Exporter Full)</p></li><li><p><a href="https://grafana.com/grafana/dashboards/193-docker-monitoring/" target="_blank" rel="noreferrer">193</a>(Docker monitoring)</p></li><li><p><a href="https://grafana.com/grafana/dashboards/14282-cadvisor-exporter/" target="_blank" rel="noreferrer">14282</a>(Cadvisor exporter)</p></li><li><p><a href="https://grafana.com/grafana/dashboards/11835-redis-dashboard-for-prometheus-redis-exporter-helm-stable-redis-ha/" target="_blank" rel="noreferrer">11835</a>( Redis Dashboard)</p></li></ul></li></ul><h3 id="bitwarden" tabindex="-1">Bitwarden <a class="header-anchor" href="#bitwarden" aria-label="Permalink to &quot;Bitwarden&quot;">​</a></h3><blockquote><p><a href="https://bitwarden.com/help/install-on-premise-linux/" target="_blank" rel="noreferrer">https://bitwarden.com/help/install-on-premise-linux/</a></p></blockquote><h4 id="configure-your-domain" tabindex="-1">Configure your domain <a class="header-anchor" href="#configure-your-domain" aria-label="Permalink to &quot;Configure your domain&quot;">​</a></h4><p>配置域名解析，Bitwarden默认使用<code>80</code>和<code>443</code>端口，可以执行安装后在<code>bwdata/config.yaml</code>修改端口</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">http_prt</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">80</span></span>
<span class="line"><span style="color:#85E89D;">https_port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">443</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">http_prt</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">80</span></span>
<span class="line"><span style="color:#22863A;">https_port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">443</span></span></code></pre></div><blockquote><p>修改完<code>bwdata/config.yaml</code>后需要执行<code>./bitwarden.sh rebuild</code></p></blockquote><h4 id="install-docker-and-docker-compose" tabindex="-1">Install Docker and Docker Compose <a class="header-anchor" href="#install-docker-and-docker-compose" aria-label="Permalink to &quot;Install Docker and Docker Compose&quot;">​</a></h4><p><code>curl -fsSL https://get.docker.com | sudo sh</code></p><h4 id="create-a-bitwarden-user-directory-from-which-to-complete-installation" tabindex="-1">Create a Bitwarden user &amp; directory from which to complete installation. <a class="header-anchor" href="#create-a-bitwarden-user-directory-from-which-to-complete-installation" aria-label="Permalink to &quot;Create a Bitwarden user &amp; directory from which to complete installation.&quot;">​</a></h4><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">adduser</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bitwarden</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">passwd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bitwarden</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">groupadd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">usermod</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-aG</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bitwarden</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/bitwarden</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">chmod</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-R</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">700</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/bitwarden</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">chown</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-R</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bitwarden:bitwarden</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/bitwarden</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">adduser</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bitwarden</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">passwd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bitwarden</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">groupadd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">usermod</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-aG</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bitwarden</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/bitwarden</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">chmod</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-R</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">700</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/bitwarden</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">chown</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-R</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bitwarden:bitwarden</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/bitwarden</span></span></code></pre></div><h4 id="retrieve-an-installation-id-and-key-from-https-bitwarden-com-host" tabindex="-1">Retrieve an installation id and key from [**<a href="https://bitwarden.com/host" target="_blank" rel="noreferrer">https://bitwarden.com/host</a> <a class="header-anchor" href="#retrieve-an-installation-id-and-key-from-https-bitwarden-com-host" aria-label="Permalink to &quot;Retrieve an installation id and key from [**https://bitwarden.com/host&quot;">​</a></h4><p>**](<a href="https://bitwarden.com/host/" target="_blank" rel="noreferrer">https://bitwarden.com/host/</a>) for use in installation.</p><p>For more information, see <a href="https://bitwarden.com/help/hosting-faqs/#general" target="_blank" rel="noreferrer">What are my installation id and installation key used for?</a></p><h4 id="install-bitwarden-on-your-machine" tabindex="-1">Install Bitwarden on your machine. <a class="header-anchor" href="#install-bitwarden-on-your-machine" aria-label="Permalink to &quot;Install Bitwarden on your machine.&quot;">​</a></h4><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Lso</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bitwarden.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;https://func.bitwarden.com/api/dl/?app=self-host&amp;platform=linux&quot;</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">chmod</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">700</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bitwarden.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">./bitwarden.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Lso</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bitwarden.sh</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;https://func.bitwarden.com/api/dl/?app=self-host&amp;platform=linux&quot;</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">chmod</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">700</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bitwarden.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">./bitwarden.sh</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span></span></code></pre></div><h4 id="configure-your-environment-by-adjusting-settings-in-bwdata-env-global-override-env" tabindex="-1">Configure your environment by adjusting settings in <code>./bwdata/env/global.override.env</code>. <a class="header-anchor" href="#configure-your-environment-by-adjusting-settings-in-bwdata-env-global-override-env" aria-label="Permalink to &quot;Configure your environment by adjusting settings in \`./bwdata/env/global.override.env\`.&quot;">​</a></h4><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">globalSettings__mail__replyToEmail</span><span style="color:#E1E4E8;">=email@example.com</span></span>
<span class="line"><span style="color:#F97583;">globalSettings__mail__smtp__host</span><span style="color:#E1E4E8;">=smtp.qq.com</span></span>
<span class="line"><span style="color:#F97583;">globalSettings__mail__smtp__port</span><span style="color:#E1E4E8;">=465</span></span>
<span class="line"><span style="color:#F97583;">globalSettings__mail__smtp__ssl</span><span style="color:#E1E4E8;">=true</span></span>
<span class="line"><span style="color:#F97583;">globalSettings__mail__smtp__username</span><span style="color:#E1E4E8;">=email@example.com</span></span>
<span class="line"><span style="color:#F97583;">globalSettings__mail__smtp__password</span><span style="color:#E1E4E8;">=password</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">globalSettings__disableUserRegistration</span><span style="color:#E1E4E8;">=true </span><span style="color:#6A737D;"># 禁止注册</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">globalSettings__mail__replyToEmail</span><span style="color:#24292E;">=email@example.com</span></span>
<span class="line"><span style="color:#D73A49;">globalSettings__mail__smtp__host</span><span style="color:#24292E;">=smtp.qq.com</span></span>
<span class="line"><span style="color:#D73A49;">globalSettings__mail__smtp__port</span><span style="color:#24292E;">=465</span></span>
<span class="line"><span style="color:#D73A49;">globalSettings__mail__smtp__ssl</span><span style="color:#24292E;">=true</span></span>
<span class="line"><span style="color:#D73A49;">globalSettings__mail__smtp__username</span><span style="color:#24292E;">=email@example.com</span></span>
<span class="line"><span style="color:#D73A49;">globalSettings__mail__smtp__password</span><span style="color:#24292E;">=password</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">globalSettings__disableUserRegistration</span><span style="color:#24292E;">=true </span><span style="color:#6A737D;"># 禁止注册</span></span></code></pre></div><blockquote><p>修改完后执行<code>./bitwarden.sh restart</code></p></blockquote><h4 id="start-your-instance" tabindex="-1">Start your instance <a class="header-anchor" href="#start-your-instance" aria-label="Permalink to &quot;Start your instance&quot;">​</a></h4><p><code>./bitwarden.sh start</code></p><h4 id="backing-up-your-server" tabindex="-1">backing up your server <a class="header-anchor" href="#backing-up-your-server" aria-label="Permalink to &quot;backing up your server&quot;">​</a></h4><p>backup <code>bwdata</code> folder</p><h4 id="migration" tabindex="-1">migration <a class="header-anchor" href="#migration" aria-label="Permalink to &quot;migration&quot;">​</a></h4><blockquote><p><a href="https://bitwarden.com/help/migration/" target="_blank" rel="noreferrer">https://bitwarden.com/help/migration/</a></p><p>如果低版本迁移到高版本，覆盖bwdata后，先执行./bitwarden.sh update</p></blockquote><h4 id="client" tabindex="-1">Client <a class="header-anchor" href="#client" aria-label="Permalink to &quot;Client&quot;">​</a></h4><p><a href="https://bitwarden.com/download/" target="_blank" rel="noreferrer">https://bitwarden.com/download</a></p><h3 id="hoppscotch" tabindex="-1">Hoppscotch <a class="header-anchor" href="#hoppscotch" aria-label="Permalink to &quot;Hoppscotch&quot;">​</a></h3><blockquote><p><a href="https://github.com/hoppscotch/hoppscotch" target="_blank" rel="noreferrer">https://github.com/hoppscotch/hoppscotch</a></p></blockquote><h4 id="docker-compose-yml" tabindex="-1">docker-compose.yml <a class="header-anchor" href="#docker-compose-yml" aria-label="Permalink to &quot;docker-compose.yml&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">hoppscotch</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">hoppscotch</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">hoppscotch/hoppscotch</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;53000:3000&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;53100:3100&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;53170:3170&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">env_file</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">.env</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">unless-stopped</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">links</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">postgresql</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">depends_on</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">postgresql</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">hoppscotch</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">postgresql</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">postgresql</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">postgres</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">POSTGRES_DB</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">db</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">POSTGRES_USER</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">user</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">POSTGRES_PASSWORD</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">passwd</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;5432:5432&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">postgres_data:/var/lib/postgresql/data</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">unless-stopped</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">hoppscotch</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">postgres_data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">hoppscotch</span><span style="color:#E1E4E8;">:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3.8&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">hoppscotch</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">hoppscotch</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">hoppscotch/hoppscotch</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;53000:3000&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;53100:3100&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;53170:3170&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">env_file</span><span style="color:#24292E;">: </span><span style="color:#032F62;">.env</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">unless-stopped</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">links</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">postgresql</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">depends_on</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">postgresql</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">hoppscotch</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">postgresql</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">postgresql</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">postgres</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">POSTGRES_DB</span><span style="color:#24292E;">: </span><span style="color:#032F62;">db</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">POSTGRES_USER</span><span style="color:#24292E;">: </span><span style="color:#032F62;">user</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">POSTGRES_PASSWORD</span><span style="color:#24292E;">: </span><span style="color:#032F62;">passwd</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;5432:5432&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">postgres_data:/var/lib/postgresql/data</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">unless-stopped</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">hoppscotch</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">postgres_data</span><span style="color:#24292E;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">hoppscotch</span><span style="color:#24292E;">:</span></span></code></pre></div><h4 id="env" tabindex="-1">.env <a class="header-anchor" href="#env" aria-label="Permalink to &quot;.env&quot;">​</a></h4><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#-----------------------Backend Config------------------------------#</span></span>
<span class="line"><span style="color:#6A737D;"># Prisma Config</span></span>
<span class="line"><span style="color:#F97583;">DATABASE_URL</span><span style="color:#E1E4E8;">=postgresql://user:passwd@postgresql:5432/db</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Auth Tokens Config</span></span>
<span class="line"><span style="color:#F97583;">JWT_SECRET</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;xxx&quot;</span></span>
<span class="line"><span style="color:#F97583;">TOKEN_SALT_COMPLEXITY</span><span style="color:#E1E4E8;">=10</span></span>
<span class="line"><span style="color:#F97583;">MAGIC_LINK_TOKEN_VALIDITY</span><span style="color:#E1E4E8;">= 3</span></span>
<span class="line"><span style="color:#F97583;">REFRESH_TOKEN_VALIDITY</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;604800000&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># Default validity is 7 days (604800000 ms) in ms</span></span>
<span class="line"><span style="color:#F97583;">ACCESS_TOKEN_VALIDITY</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;86400000&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># Default validity is 1 day (86400000 ms) in ms</span></span>
<span class="line"><span style="color:#F97583;">SESSION_SECRET</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&#39;xxx&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Hoppscotch App Domain Config</span></span>
<span class="line"><span style="color:#F97583;">REDIRECT_URL</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://hoppscotch.example.com&quot;</span></span>
<span class="line"><span style="color:#F97583;">WHITELISTED_ORIGINS</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://hoppscotch.example.com/backend,https://hoppscotch.example.com,https://hoppadmin.example.com&quot;</span></span>
<span class="line"><span style="color:#F97583;">VITE_ALLOWED_AUTH_PROVIDERS</span><span style="color:#E1E4E8;">=GITHUB</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Google Auth Config</span></span>
<span class="line"><span style="color:#6A737D;">#GOOGLE_CLIENT_ID=&quot;************************************************&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#GOOGLE_CLIENT_SECRET=&quot;************************************************&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#GOOGLE_CALLBACK_URL=&quot;http://hoppscotch.example.com:3170/v1/auth/google/callback&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#GOOGLE_SCOPE=&quot;email,profilstoryxc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Github Auth Config</span></span>
<span class="line"><span style="color:#F97583;">GITHUB_CLIENT_ID</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;xxx&quot;</span></span>
<span class="line"><span style="color:#F97583;">GITHUB_CLIENT_SECRET</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;xxx&quot;</span></span>
<span class="line"><span style="color:#F97583;">GITHUB_CALLBACK_URL</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;https://hoppscotch.example.com/backend/v1/auth/github/callback&quot;</span></span>
<span class="line"><span style="color:#F97583;">GITHUB_SCOPE</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;user:email&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Microsoft Auth Config</span></span>
<span class="line"><span style="color:#6A737D;">#MICROSOFT_CLIENT_ID=&quot;************************************************&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#MICROSOFT_CLIENT_SECRET=&quot;************************************************&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#MICROSOFT_CALLBACK_URL=&quot;http://hoppscotch.example.com:3170/v1/auth/microsoft/callback&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#MICROSOFT_SCOPE=&quot;user.read&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#MICROSOFT_TENANT=&quot;common&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Mailer config</span></span>
<span class="line"><span style="color:#F97583;">MAILER_SMTP_URL</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;smtps://user@domain.com:passwd@smtp.domain.com&quot;</span></span>
<span class="line"><span style="color:#F97583;">MAILER_ADDRESS_FROM</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;user@domain.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Rate Limit Config</span></span>
<span class="line"><span style="color:#F97583;">RATE_LIMIT_TTL</span><span style="color:#E1E4E8;">=60 </span><span style="color:#6A737D;"># In seconds</span></span>
<span class="line"><span style="color:#F97583;">RATE_LIMIT_MAX</span><span style="color:#E1E4E8;">=100 </span><span style="color:#6A737D;"># Max requests per IP</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#-----------------------Frontend Config------------------------------#</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Base URLs</span></span>
<span class="line"><span style="color:#F97583;">VITE_BASE_URL</span><span style="color:#E1E4E8;">=https://hoppscotch.example.com</span></span>
<span class="line"><span style="color:#F97583;">VITE_SHORTCODE_BASE_URL</span><span style="color:#E1E4E8;">=https://hoppscotch.example.com</span></span>
<span class="line"><span style="color:#F97583;">VITE_ADMIN_URL</span><span style="color:#E1E4E8;">=https://hoppadmin.example.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Backend URLs</span></span>
<span class="line"><span style="color:#F97583;">VITE_BACKEND_GQL_URL</span><span style="color:#E1E4E8;">=https://hoppscotch.example.com/backend/graphql</span></span>
<span class="line"><span style="color:#F97583;">VITE_BACKEND_WS_URL</span><span style="color:#E1E4E8;">=wss://hoppscotch.example.com/backend/ws/graphql</span></span>
<span class="line"><span style="color:#F97583;">VITE_BACKEND_API_URL</span><span style="color:#E1E4E8;">=https://hoppscotch.example.com/backend/v1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Terms Of Service And Privacy Policy Links (Optional)</span></span>
<span class="line"><span style="color:#F97583;">VITE_APP_TOS_LINK</span><span style="color:#E1E4E8;">=https://docs.hoppscotch.io/support/terms</span></span>
<span class="line"><span style="color:#F97583;">VITE_APP_PRIVACY_POLICY_LINK</span><span style="color:#E1E4E8;">=https://docs.hoppscotch.io/support/privacy</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#-----------------------Backend Config------------------------------#</span></span>
<span class="line"><span style="color:#6A737D;"># Prisma Config</span></span>
<span class="line"><span style="color:#D73A49;">DATABASE_URL</span><span style="color:#24292E;">=postgresql://user:passwd@postgresql:5432/db</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Auth Tokens Config</span></span>
<span class="line"><span style="color:#D73A49;">JWT_SECRET</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;xxx&quot;</span></span>
<span class="line"><span style="color:#D73A49;">TOKEN_SALT_COMPLEXITY</span><span style="color:#24292E;">=10</span></span>
<span class="line"><span style="color:#D73A49;">MAGIC_LINK_TOKEN_VALIDITY</span><span style="color:#24292E;">= 3</span></span>
<span class="line"><span style="color:#D73A49;">REFRESH_TOKEN_VALIDITY</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;604800000&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># Default validity is 7 days (604800000 ms) in ms</span></span>
<span class="line"><span style="color:#D73A49;">ACCESS_TOKEN_VALIDITY</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;86400000&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># Default validity is 1 day (86400000 ms) in ms</span></span>
<span class="line"><span style="color:#D73A49;">SESSION_SECRET</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&#39;xxx&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Hoppscotch App Domain Config</span></span>
<span class="line"><span style="color:#D73A49;">REDIRECT_URL</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://hoppscotch.example.com&quot;</span></span>
<span class="line"><span style="color:#D73A49;">WHITELISTED_ORIGINS</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://hoppscotch.example.com/backend,https://hoppscotch.example.com,https://hoppadmin.example.com&quot;</span></span>
<span class="line"><span style="color:#D73A49;">VITE_ALLOWED_AUTH_PROVIDERS</span><span style="color:#24292E;">=GITHUB</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Google Auth Config</span></span>
<span class="line"><span style="color:#6A737D;">#GOOGLE_CLIENT_ID=&quot;************************************************&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#GOOGLE_CLIENT_SECRET=&quot;************************************************&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#GOOGLE_CALLBACK_URL=&quot;http://hoppscotch.example.com:3170/v1/auth/google/callback&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#GOOGLE_SCOPE=&quot;email,profilstoryxc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Github Auth Config</span></span>
<span class="line"><span style="color:#D73A49;">GITHUB_CLIENT_ID</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;xxx&quot;</span></span>
<span class="line"><span style="color:#D73A49;">GITHUB_CLIENT_SECRET</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;xxx&quot;</span></span>
<span class="line"><span style="color:#D73A49;">GITHUB_CALLBACK_URL</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;https://hoppscotch.example.com/backend/v1/auth/github/callback&quot;</span></span>
<span class="line"><span style="color:#D73A49;">GITHUB_SCOPE</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;user:email&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Microsoft Auth Config</span></span>
<span class="line"><span style="color:#6A737D;">#MICROSOFT_CLIENT_ID=&quot;************************************************&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#MICROSOFT_CLIENT_SECRET=&quot;************************************************&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#MICROSOFT_CALLBACK_URL=&quot;http://hoppscotch.example.com:3170/v1/auth/microsoft/callback&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#MICROSOFT_SCOPE=&quot;user.read&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#MICROSOFT_TENANT=&quot;common&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Mailer config</span></span>
<span class="line"><span style="color:#D73A49;">MAILER_SMTP_URL</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;smtps://user@domain.com:passwd@smtp.domain.com&quot;</span></span>
<span class="line"><span style="color:#D73A49;">MAILER_ADDRESS_FROM</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;user@domain.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Rate Limit Config</span></span>
<span class="line"><span style="color:#D73A49;">RATE_LIMIT_TTL</span><span style="color:#24292E;">=60 </span><span style="color:#6A737D;"># In seconds</span></span>
<span class="line"><span style="color:#D73A49;">RATE_LIMIT_MAX</span><span style="color:#24292E;">=100 </span><span style="color:#6A737D;"># Max requests per IP</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#-----------------------Frontend Config------------------------------#</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Base URLs</span></span>
<span class="line"><span style="color:#D73A49;">VITE_BASE_URL</span><span style="color:#24292E;">=https://hoppscotch.example.com</span></span>
<span class="line"><span style="color:#D73A49;">VITE_SHORTCODE_BASE_URL</span><span style="color:#24292E;">=https://hoppscotch.example.com</span></span>
<span class="line"><span style="color:#D73A49;">VITE_ADMIN_URL</span><span style="color:#24292E;">=https://hoppadmin.example.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Backend URLs</span></span>
<span class="line"><span style="color:#D73A49;">VITE_BACKEND_GQL_URL</span><span style="color:#24292E;">=https://hoppscotch.example.com/backend/graphql</span></span>
<span class="line"><span style="color:#D73A49;">VITE_BACKEND_WS_URL</span><span style="color:#24292E;">=wss://hoppscotch.example.com/backend/ws/graphql</span></span>
<span class="line"><span style="color:#D73A49;">VITE_BACKEND_API_URL</span><span style="color:#24292E;">=https://hoppscotch.example.com/backend/v1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Terms Of Service And Privacy Policy Links (Optional)</span></span>
<span class="line"><span style="color:#D73A49;">VITE_APP_TOS_LINK</span><span style="color:#24292E;">=https://docs.hoppscotch.io/support/terms</span></span>
<span class="line"><span style="color:#D73A49;">VITE_APP_PRIVACY_POLICY_LINK</span><span style="color:#24292E;">=https://docs.hoppscotch.io/support/privacy</span></span></code></pre></div><h4 id="hoppscotch-example-com-conf" tabindex="-1">hoppscotch.example.com.conf <a class="header-anchor" href="#hoppscotch-example-com-conf" aria-label="Permalink to &quot;hoppscotch.example.com.conf&quot;">​</a></h4><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">server</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> listen </span><span style="color:#E1E4E8;">             </span><span style="color:#79B8FF;">443</span><span style="color:#E1E4E8;"> ssl;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> listen </span><span style="color:#E1E4E8;">             [::]:443 ssl;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> server_name </span><span style="color:#E1E4E8;">        hoppscotch.example.com;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># SSL</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_certificate </span><span style="color:#E1E4E8;">    /etc/nginx/ssl/hoppscotch.example.com.crt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_certificate_key </span><span style="color:#E1E4E8;">/etc/nginx/ssl/hoppscotch.example.com.key;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_session_timeout </span><span style="color:#E1E4E8;">5m;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#请按照以下协议配置</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_ciphers </span><span style="color:#E1E4E8;">ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#表示使用的加密套件的类型。</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_protocols </span><span style="color:#E1E4E8;">TLSv1.1 TLSv1.2;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># security</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># logging</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> access_log </span><span style="color:#E1E4E8;">         /var/log/nginx/access.log combined buffer=512k flush=1m;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> error_log </span><span style="color:#E1E4E8;">          /var/log/nginx/error.log</span><span style="color:#79B8FF;"> warn</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># additional config</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">location</span><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">/backend/ws/ </span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_pass </span><span style="color:#E1E4E8;">http://127.0.0.1:53170/;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_set_header </span><span style="color:#E1E4E8;">Upgrade $http_upgrade;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_set_header </span><span style="color:#E1E4E8;">Connection </span><span style="color:#9ECBFF;">&quot;Upgrade&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_set_header </span><span style="color:#E1E4E8;">X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">location</span><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">/backend/ </span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_pass </span><span style="color:#E1E4E8;">http://127.0.0.1:53170/;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">/ </span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_pass </span><span style="color:#E1E4E8;">http://127.0.0.1:53000/;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># HTTP redirect</span></span>
<span class="line"><span style="color:#F97583;">server</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> listen </span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> listen </span><span style="color:#E1E4E8;">     [::]:80;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> server_name </span><span style="color:#E1E4E8;">hoppscotch.example.com;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">301</span><span style="color:#E1E4E8;"> https://hoppscotch.example.com$request_uri;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> listen </span><span style="color:#24292E;">             </span><span style="color:#005CC5;">443</span><span style="color:#24292E;"> ssl;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> listen </span><span style="color:#24292E;">             [::]:443 ssl;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> server_name </span><span style="color:#24292E;">        hoppscotch.example.com;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># SSL</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_certificate </span><span style="color:#24292E;">    /etc/nginx/ssl/hoppscotch.example.com.crt;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_certificate_key </span><span style="color:#24292E;">/etc/nginx/ssl/hoppscotch.example.com.key;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_session_timeout </span><span style="color:#24292E;">5m;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#请按照以下协议配置</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_ciphers </span><span style="color:#24292E;">ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#表示使用的加密套件的类型。</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_protocols </span><span style="color:#24292E;">TLSv1.1 TLSv1.2;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># security</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># logging</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> access_log </span><span style="color:#24292E;">         /var/log/nginx/access.log combined buffer=512k flush=1m;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> error_log </span><span style="color:#24292E;">          /var/log/nginx/error.log</span><span style="color:#005CC5;"> warn</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># additional config</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">location</span><span style="color:#24292E;">  </span><span style="color:#6F42C1;">/backend/ws/ </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_pass </span><span style="color:#24292E;">http://127.0.0.1:53170/;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_set_header </span><span style="color:#24292E;">Upgrade $http_upgrade;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_set_header </span><span style="color:#24292E;">Connection </span><span style="color:#032F62;">&quot;Upgrade&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_set_header </span><span style="color:#24292E;">X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">location</span><span style="color:#24292E;">  </span><span style="color:#6F42C1;">/backend/ </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_pass </span><span style="color:#24292E;">http://127.0.0.1:53170/;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">location</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">/ </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_pass </span><span style="color:#24292E;">http://127.0.0.1:53000/;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># HTTP redirect</span></span>
<span class="line"><span style="color:#D73A49;">server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> listen </span><span style="color:#24292E;">     </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> listen </span><span style="color:#24292E;">     [::]:80;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> server_name </span><span style="color:#24292E;">hoppscotch.example.com;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">      </span><span style="color:#005CC5;">301</span><span style="color:#24292E;"> https://hoppscotch.example.com$request_uri;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="kutt" tabindex="-1">kutt <a class="header-anchor" href="#kutt" aria-label="Permalink to &quot;kutt&quot;">​</a></h3><blockquote><p><a href="https://github.com/thedevs-network/kutt" target="_blank" rel="noreferrer">https://github.com/thedevs-network/kutt</a></p></blockquote><h4 id="docker-compose-yml-1" tabindex="-1">docker-compose.yml <a class="header-anchor" href="#docker-compose-yml-1" aria-label="Permalink to &quot;docker-compose.yml&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;3&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">kutt</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kutt/kutt</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">depends_on</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">postgres</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">redis</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">command</span><span style="color:#E1E4E8;">: [ </span><span style="color:#9ECBFF;">&quot;./wait-for-it.sh&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;postgres:5432&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;--&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;npm&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;start&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;3000:3000&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">env_file</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">.env</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">DB_HOST</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">postgres</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">DB_NAME</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kutt</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">DB_USER</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">user</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">DB_PASSWORD</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">passwd</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">REDIS_HOST</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">redis</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis:6.0-alpine</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">redis_data:/data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">postgres</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">postgres:12-alpine</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">POSTGRES_USER</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">user</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">POSTGRES_PASSWORD</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">passwd</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">POSTGRES_DB</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kutt</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">postgres_data:/var/lib/postgresql/data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">redis_data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">postgres_data</span><span style="color:#E1E4E8;">:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;3&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">kutt</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kutt/kutt</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">depends_on</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">postgres</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">redis</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">command</span><span style="color:#24292E;">: [ </span><span style="color:#032F62;">&quot;./wait-for-it.sh&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;postgres:5432&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;--&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;npm&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;start&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;3000:3000&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">env_file</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">.env</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">DB_HOST</span><span style="color:#24292E;">: </span><span style="color:#032F62;">postgres</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">DB_NAME</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kutt</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">DB_USER</span><span style="color:#24292E;">: </span><span style="color:#032F62;">user</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">DB_PASSWORD</span><span style="color:#24292E;">: </span><span style="color:#032F62;">passwd</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">REDIS_HOST</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">redis</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis:6.0-alpine</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">redis_data:/data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">postgres</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">postgres:12-alpine</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">POSTGRES_USER</span><span style="color:#24292E;">: </span><span style="color:#032F62;">user</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">POSTGRES_PASSWORD</span><span style="color:#24292E;">: </span><span style="color:#032F62;">passwd</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">POSTGRES_DB</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kutt</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">postgres_data:/var/lib/postgresql/data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">redis_data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">postgres_data</span><span style="color:#24292E;">:</span></span></code></pre></div><h4 id="env-1" tabindex="-1">.env <a class="header-anchor" href="#env-1" aria-label="Permalink to &quot;.env&quot;">​</a></h4><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># App port to run on</span></span>
<span class="line"><span style="color:#F97583;">PORT</span><span style="color:#E1E4E8;">=3000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># The name of the site where Kutt is hosted</span></span>
<span class="line"><span style="color:#F97583;">SITE_NAME</span><span style="color:#E1E4E8;">=Kutt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># The domain that this website is on</span></span>
<span class="line"><span style="color:#F97583;">DEFAULT_DOMAIN</span><span style="color:#E1E4E8;">=kutt.domain.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Generated link length</span></span>
<span class="line"><span style="color:#F97583;">LINK_LENGTH</span><span style="color:#E1E4E8;">=5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Postgres database credential details</span></span>
<span class="line"><span style="color:#F97583;">DB_HOST</span><span style="color:#E1E4E8;">=postgres</span></span>
<span class="line"><span style="color:#F97583;">DB_PORT</span><span style="color:#E1E4E8;">=5432</span></span>
<span class="line"><span style="color:#F97583;">DB_NAME</span><span style="color:#E1E4E8;">=postgres</span></span>
<span class="line"><span style="color:#F97583;">DB_USER</span><span style="color:#E1E4E8;">=user</span></span>
<span class="line"><span style="color:#F97583;">DB_PASSWORD</span><span style="color:#E1E4E8;">=passwd</span></span>
<span class="line"><span style="color:#F97583;">DB_SSL</span><span style="color:#E1E4E8;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Redis host and port</span></span>
<span class="line"><span style="color:#F97583;">REDIS_HOST</span><span style="color:#E1E4E8;">=redis</span></span>
<span class="line"><span style="color:#F97583;">REDIS_PORT</span><span style="color:#E1E4E8;">=6379</span></span>
<span class="line"><span style="color:#F97583;">REDIS_PASSWORD</span><span style="color:#E1E4E8;">=</span></span>
<span class="line"><span style="color:#F97583;">REDIS_DB</span><span style="color:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Disable registration</span></span>
<span class="line"><span style="color:#F97583;">DISALLOW_REGISTRATION</span><span style="color:#E1E4E8;">=true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Disable anonymous link creation</span></span>
<span class="line"><span style="color:#F97583;">DISALLOW_ANONYMOUS_LINKS</span><span style="color:#E1E4E8;">=true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># The daily limit for each user</span></span>
<span class="line"><span style="color:#F97583;">USER_LIMIT_PER_DAY</span><span style="color:#E1E4E8;">=50</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Create a cooldown for non-logged in users in minutes</span></span>
<span class="line"><span style="color:#6A737D;"># Set 0 to disable</span></span>
<span class="line"><span style="color:#F97583;">NON_USER_COOLDOWN</span><span style="color:#E1E4E8;">=0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Max number of visits for each link to have detailed stats</span></span>
<span class="line"><span style="color:#F97583;">DEFAULT_MAX_STATS_PER_LINK</span><span style="color:#E1E4E8;">=5000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Use HTTPS for links with custom domain</span></span>
<span class="line"><span style="color:#F97583;">CUSTOM_DOMAIN_USE_HTTPS</span><span style="color:#E1E4E8;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># A passphrase to encrypt JWT. Use a long and secure key.</span></span>
<span class="line"><span style="color:#F97583;">JWT_SECRET</span><span style="color:#E1E4E8;">=xxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Admin emails so they can access admin actions on settings page</span></span>
<span class="line"><span style="color:#6A737D;"># Comma seperated</span></span>
<span class="line"><span style="color:#F97583;">ADMIN_EMAILS</span><span style="color:#E1E4E8;">=user@domain.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Invisible reCaptcha secret key</span></span>
<span class="line"><span style="color:#6A737D;"># Create one in https://www.google.com/recaptcha/intro/</span></span>
<span class="line"><span style="color:#F97583;">RECAPTCHA_SITE_KEY</span><span style="color:#E1E4E8;">=</span></span>
<span class="line"><span style="color:#F97583;">RECAPTCHA_SECRET_KEY</span><span style="color:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Google Cloud API to prevent from users from submitting malware URLs.</span></span>
<span class="line"><span style="color:#6A737D;"># Get it from https://developers.google.com/safe-browsing/v4/get-started</span></span>
<span class="line"><span style="color:#F97583;">GOOGLE_SAFE_BROWSING_KEY</span><span style="color:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Your email host details to use to send verification emails.</span></span>
<span class="line"><span style="color:#6A737D;"># More info on http://nodemailer.com/</span></span>
<span class="line"><span style="color:#6A737D;"># Mail from example &quot;Kutt &lt;support@kutt.it&gt;&quot;. Leave empty to use MAIL_USER</span></span>
<span class="line"><span style="color:#F97583;">MAIL_HOST</span><span style="color:#E1E4E8;">=smtp.domain.com</span></span>
<span class="line"><span style="color:#F97583;">MAIL_PORT</span><span style="color:#E1E4E8;">=465</span></span>
<span class="line"><span style="color:#F97583;">MAIL_SECURE</span><span style="color:#E1E4E8;">=true</span></span>
<span class="line"><span style="color:#F97583;">MAIL_USER</span><span style="color:#E1E4E8;">=user@domain.com</span></span>
<span class="line"><span style="color:#F97583;">MAIL_FROM</span><span style="color:#E1E4E8;">=user@domain.com</span></span>
<span class="line"><span style="color:#F97583;">MAIL_PASSWORD</span><span style="color:#E1E4E8;">=passwd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># The email address that will receive submitted reports.</span></span>
<span class="line"><span style="color:#F97583;">REPORT_EMAIL</span><span style="color:#E1E4E8;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Support email to show on the app</span></span>
<span class="line"><span style="color:#F97583;">CONTACT_EMAIL</span><span style="color:#E1E4E8;">=</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># App port to run on</span></span>
<span class="line"><span style="color:#D73A49;">PORT</span><span style="color:#24292E;">=3000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># The name of the site where Kutt is hosted</span></span>
<span class="line"><span style="color:#D73A49;">SITE_NAME</span><span style="color:#24292E;">=Kutt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># The domain that this website is on</span></span>
<span class="line"><span style="color:#D73A49;">DEFAULT_DOMAIN</span><span style="color:#24292E;">=kutt.domain.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Generated link length</span></span>
<span class="line"><span style="color:#D73A49;">LINK_LENGTH</span><span style="color:#24292E;">=5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Postgres database credential details</span></span>
<span class="line"><span style="color:#D73A49;">DB_HOST</span><span style="color:#24292E;">=postgres</span></span>
<span class="line"><span style="color:#D73A49;">DB_PORT</span><span style="color:#24292E;">=5432</span></span>
<span class="line"><span style="color:#D73A49;">DB_NAME</span><span style="color:#24292E;">=postgres</span></span>
<span class="line"><span style="color:#D73A49;">DB_USER</span><span style="color:#24292E;">=user</span></span>
<span class="line"><span style="color:#D73A49;">DB_PASSWORD</span><span style="color:#24292E;">=passwd</span></span>
<span class="line"><span style="color:#D73A49;">DB_SSL</span><span style="color:#24292E;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Redis host and port</span></span>
<span class="line"><span style="color:#D73A49;">REDIS_HOST</span><span style="color:#24292E;">=redis</span></span>
<span class="line"><span style="color:#D73A49;">REDIS_PORT</span><span style="color:#24292E;">=6379</span></span>
<span class="line"><span style="color:#D73A49;">REDIS_PASSWORD</span><span style="color:#24292E;">=</span></span>
<span class="line"><span style="color:#D73A49;">REDIS_DB</span><span style="color:#24292E;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Disable registration</span></span>
<span class="line"><span style="color:#D73A49;">DISALLOW_REGISTRATION</span><span style="color:#24292E;">=true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Disable anonymous link creation</span></span>
<span class="line"><span style="color:#D73A49;">DISALLOW_ANONYMOUS_LINKS</span><span style="color:#24292E;">=true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># The daily limit for each user</span></span>
<span class="line"><span style="color:#D73A49;">USER_LIMIT_PER_DAY</span><span style="color:#24292E;">=50</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Create a cooldown for non-logged in users in minutes</span></span>
<span class="line"><span style="color:#6A737D;"># Set 0 to disable</span></span>
<span class="line"><span style="color:#D73A49;">NON_USER_COOLDOWN</span><span style="color:#24292E;">=0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Max number of visits for each link to have detailed stats</span></span>
<span class="line"><span style="color:#D73A49;">DEFAULT_MAX_STATS_PER_LINK</span><span style="color:#24292E;">=5000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Use HTTPS for links with custom domain</span></span>
<span class="line"><span style="color:#D73A49;">CUSTOM_DOMAIN_USE_HTTPS</span><span style="color:#24292E;">=false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># A passphrase to encrypt JWT. Use a long and secure key.</span></span>
<span class="line"><span style="color:#D73A49;">JWT_SECRET</span><span style="color:#24292E;">=xxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Admin emails so they can access admin actions on settings page</span></span>
<span class="line"><span style="color:#6A737D;"># Comma seperated</span></span>
<span class="line"><span style="color:#D73A49;">ADMIN_EMAILS</span><span style="color:#24292E;">=user@domain.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Invisible reCaptcha secret key</span></span>
<span class="line"><span style="color:#6A737D;"># Create one in https://www.google.com/recaptcha/intro/</span></span>
<span class="line"><span style="color:#D73A49;">RECAPTCHA_SITE_KEY</span><span style="color:#24292E;">=</span></span>
<span class="line"><span style="color:#D73A49;">RECAPTCHA_SECRET_KEY</span><span style="color:#24292E;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Google Cloud API to prevent from users from submitting malware URLs.</span></span>
<span class="line"><span style="color:#6A737D;"># Get it from https://developers.google.com/safe-browsing/v4/get-started</span></span>
<span class="line"><span style="color:#D73A49;">GOOGLE_SAFE_BROWSING_KEY</span><span style="color:#24292E;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Your email host details to use to send verification emails.</span></span>
<span class="line"><span style="color:#6A737D;"># More info on http://nodemailer.com/</span></span>
<span class="line"><span style="color:#6A737D;"># Mail from example &quot;Kutt &lt;support@kutt.it&gt;&quot;. Leave empty to use MAIL_USER</span></span>
<span class="line"><span style="color:#D73A49;">MAIL_HOST</span><span style="color:#24292E;">=smtp.domain.com</span></span>
<span class="line"><span style="color:#D73A49;">MAIL_PORT</span><span style="color:#24292E;">=465</span></span>
<span class="line"><span style="color:#D73A49;">MAIL_SECURE</span><span style="color:#24292E;">=true</span></span>
<span class="line"><span style="color:#D73A49;">MAIL_USER</span><span style="color:#24292E;">=user@domain.com</span></span>
<span class="line"><span style="color:#D73A49;">MAIL_FROM</span><span style="color:#24292E;">=user@domain.com</span></span>
<span class="line"><span style="color:#D73A49;">MAIL_PASSWORD</span><span style="color:#24292E;">=passwd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># The email address that will receive submitted reports.</span></span>
<span class="line"><span style="color:#D73A49;">REPORT_EMAIL</span><span style="color:#24292E;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Support email to show on the app</span></span>
<span class="line"><span style="color:#D73A49;">CONTACT_EMAIL</span><span style="color:#24292E;">=</span></span></code></pre></div><h4 id="kutt-domain-com-conf" tabindex="-1">kutt.domain.com.conf <a class="header-anchor" href="#kutt-domain-com-conf" aria-label="Permalink to &quot;kutt.domain.com.conf&quot;">​</a></h4><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">server</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> listen </span><span style="color:#E1E4E8;">             </span><span style="color:#79B8FF;">443</span><span style="color:#E1E4E8;"> ssl;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> listen </span><span style="color:#E1E4E8;">             [::]:443 ssl;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> server_name </span><span style="color:#E1E4E8;">        kutt.domain.com;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># SSL</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_certificate </span><span style="color:#E1E4E8;">    /etc/nginx/ssl/kutt.domain.com.crt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_certificate_key </span><span style="color:#E1E4E8;">/etc/nginx/ssl/kutt.domain.com.key;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_session_timeout </span><span style="color:#E1E4E8;">5m;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#请按照以下协议配置</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_ciphers </span><span style="color:#E1E4E8;">ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#表示使用的加密套件的类型。</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> ssl_protocols </span><span style="color:#E1E4E8;">TLSv1.1 TLSv1.2;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># security</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> include </span><span style="color:#E1E4E8;">            nginxconfig.io/security.conf;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># logging</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> access_log </span><span style="color:#E1E4E8;">         /var/log/nginx/access_kutt.log combined buffer=512k flush=1m;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> error_log </span><span style="color:#E1E4E8;">          /var/log/nginx/error_kutt.log</span><span style="color:#79B8FF;"> warn</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># additional config</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#include             nginxconfig.io/general.conf;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">/ </span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_pass </span><span style="color:#E1E4E8;">http://127.0.0.1:3000;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_set_header </span><span style="color:#E1E4E8;">Host $host;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_set_header </span><span style="color:#E1E4E8;">X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_set_header </span><span style="color:#E1E4E8;">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># HTTP redirect</span></span>
<span class="line"><span style="color:#F97583;">server</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> listen </span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> listen </span><span style="color:#E1E4E8;">     [::]:80;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> server_name </span><span style="color:#E1E4E8;">.kutt.domain.com;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">301</span><span style="color:#E1E4E8;"> https://kutt.domain.com$request_uri;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> listen </span><span style="color:#24292E;">             </span><span style="color:#005CC5;">443</span><span style="color:#24292E;"> ssl;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> listen </span><span style="color:#24292E;">             [::]:443 ssl;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> server_name </span><span style="color:#24292E;">        kutt.domain.com;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># SSL</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_certificate </span><span style="color:#24292E;">    /etc/nginx/ssl/kutt.domain.com.crt;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_certificate_key </span><span style="color:#24292E;">/etc/nginx/ssl/kutt.domain.com.key;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_session_timeout </span><span style="color:#24292E;">5m;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#请按照以下协议配置</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_ciphers </span><span style="color:#24292E;">ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#表示使用的加密套件的类型。</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> ssl_protocols </span><span style="color:#24292E;">TLSv1.1 TLSv1.2;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># security</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> include </span><span style="color:#24292E;">            nginxconfig.io/security.conf;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># logging</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> access_log </span><span style="color:#24292E;">         /var/log/nginx/access_kutt.log combined buffer=512k flush=1m;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> error_log </span><span style="color:#24292E;">          /var/log/nginx/error_kutt.log</span><span style="color:#005CC5;"> warn</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># additional config</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#include             nginxconfig.io/general.conf;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">location</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">/ </span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_pass </span><span style="color:#24292E;">http://127.0.0.1:3000;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_set_header </span><span style="color:#24292E;">Host $host;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_set_header </span><span style="color:#24292E;">X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_set_header </span><span style="color:#24292E;">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># HTTP redirect</span></span>
<span class="line"><span style="color:#D73A49;">server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> listen </span><span style="color:#24292E;">     </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> listen </span><span style="color:#24292E;">     [::]:80;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> server_name </span><span style="color:#24292E;">.kutt.domain.com;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">      </span><span style="color:#005CC5;">301</span><span style="color:#24292E;"> https://kutt.domain.com$request_uri;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="nastool" tabindex="-1">NAStool <a class="header-anchor" href="#nastool" aria-label="Permalink to &quot;NAStool&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;3&quot;</span></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">nas-tools</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nastool/nas-tools:latest</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">3000:3000</span><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 默认的webui控制端口</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">./config:/config</span><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;"># 冒号左边请修改为你想保存配置的路径</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/repo/others:/repo/others</span><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;"># 媒体目录，多个目录需要分别映射进来，需要满足配置文件说明中的要求</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/repo/movies:/repo/movies</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/repo/tvseries:/repo/tvseries</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/repo/resources/link:/repo/resources/link</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">PUID=1000</span><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 想切换为哪个用户来运行程序，该用户的uid</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">PGID=1000</span><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 想切换为哪个用户来运行程序，该用户的gid</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">UMASK=022</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 掩码权限，默认000，可以考虑设置为022</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">NASTOOL_AUTO_UPDATE=false</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 如需在启动容器时自动升级程程序请设置为true</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">NASTOOL_CN_UPDATE=false</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 如果开启了容器启动自动升级程序，并且网络不太友好时，可以设置为true，会使用国内源进行软件更新</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#- REPO_URL=https://ghproxy.com/https://github.com/NAStool/nas-tools.git  # 当你访问github网络很差时，可以考虑解释本行注释</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">always</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">network_mode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">bridge</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">hostname</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nas-tools</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nastool</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;3&quot;</span></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">nas-tools</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nastool/nas-tools:latest</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">3000:3000</span><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 默认的webui控制端口</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">./config:/config</span><span style="color:#24292E;">   </span><span style="color:#6A737D;"># 冒号左边请修改为你想保存配置的路径</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/repo/others:/repo/others</span><span style="color:#24292E;">   </span><span style="color:#6A737D;"># 媒体目录，多个目录需要分别映射进来，需要满足配置文件说明中的要求</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/repo/movies:/repo/movies</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/repo/tvseries:/repo/tvseries</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/repo/resources/link:/repo/resources/link</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">PUID=1000</span><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 想切换为哪个用户来运行程序，该用户的uid</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">PGID=1000</span><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 想切换为哪个用户来运行程序，该用户的gid</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">UMASK=022</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 掩码权限，默认000，可以考虑设置为022</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">NASTOOL_AUTO_UPDATE=false</span><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 如需在启动容器时自动升级程程序请设置为true</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">NASTOOL_CN_UPDATE=false</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 如果开启了容器启动自动升级程序，并且网络不太友好时，可以设置为true，会使用国内源进行软件更新</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#- REPO_URL=https://ghproxy.com/https://github.com/NAStool/nas-tools.git  # 当你访问github网络很差时，可以考虑解释本行注释</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">always</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">network_mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">bridge</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">hostname</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nas-tools</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nastool</span></span></code></pre></div><h3 id="telegram-bot-api" tabindex="-1">telegram-bot-api <a class="header-anchor" href="#telegram-bot-api" aria-label="Permalink to &quot;telegram-bot-api&quot;">​</a></h3><h4 id="申请项目" tabindex="-1">申请项目 <a class="header-anchor" href="#申请项目" aria-label="Permalink to &quot;申请项目&quot;">​</a></h4><p><code>https://core.telegram.org/api/obtaining_api_id</code></p><h4 id="编译项目" tabindex="-1">编译项目 <a class="header-anchor" href="#编译项目" aria-label="Permalink to &quot;编译项目&quot;">​</a></h4><blockquote><p>repo：<code>https://github.com/tdlib/telegram-bot-api</code></p><p>generator：<code>https://tdlib.github.io/telegram-bot-api/build.html</code></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">apt-get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">update</span></span>
<span class="line"><span style="color:#B392F0;">apt-get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">upgrade</span></span>
<span class="line"><span style="color:#B392F0;">apt-get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">make</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zlib1g-dev</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">libssl-dev</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gperf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cmake</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">g++</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">clone</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--recursive</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/tdlib/telegram-bot-api.git</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">telegram-bot-api</span></span>
<span class="line"><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-rf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span></span>
<span class="line"><span style="color:#B392F0;">cmake</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-DCMAKE_BUILD_TYPE=Release</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-DCMAKE_INSTALL_PREFIX:PATH=/usr/local</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">..</span></span>
<span class="line"><span style="color:#B392F0;">cmake</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--build</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--target</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">../..</span></span>
<span class="line"><span style="color:#B392F0;">ls</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-l</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/telegram-bot-api</span><span style="color:#79B8FF;">*</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">apt-get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">update</span></span>
<span class="line"><span style="color:#6F42C1;">apt-get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">upgrade</span></span>
<span class="line"><span style="color:#6F42C1;">apt-get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">make</span><span style="color:#24292E;"> </span><span style="color:#032F62;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zlib1g-dev</span><span style="color:#24292E;"> </span><span style="color:#032F62;">libssl-dev</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gperf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cmake</span><span style="color:#24292E;"> </span><span style="color:#032F62;">g++</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">clone</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--recursive</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/tdlib/telegram-bot-api.git</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">telegram-bot-api</span></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-rf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span></span>
<span class="line"><span style="color:#6F42C1;">cmake</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-DCMAKE_BUILD_TYPE=Release</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-DCMAKE_INSTALL_PREFIX:PATH=/usr/local</span><span style="color:#24292E;"> </span><span style="color:#032F62;">..</span></span>
<span class="line"><span style="color:#6F42C1;">cmake</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--build</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--target</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">../..</span></span>
<span class="line"><span style="color:#6F42C1;">ls</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-l</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/telegram-bot-api</span><span style="color:#005CC5;">*</span></span></code></pre></div></blockquote><h4 id="配置启动" tabindex="-1">配置启动 <a class="header-anchor" href="#配置启动" aria-label="Permalink to &quot;配置启动&quot;">​</a></h4><p><code>systemctl edit --force --full tgbot-api.service</code></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[Unit]</span></span>
<span class="line"><span style="color:#E1E4E8;">Description</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">telegram</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">bot</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">api</span></span>
<span class="line"><span style="color:#E1E4E8;">After</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">network.target</span></span>
<span class="line"><span style="color:#E1E4E8;">[Service]</span></span>
<span class="line"><span style="color:#E1E4E8;">Environment</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;TELEGRAM_API_ID=xxx&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">Environment</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;TELEGRAM_API_HASH=xxx&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecStart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/usr/local/bin/telegram-bot-api</span><span style="color:#E1E4E8;"> --http-port</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">16666</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">--local</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--log=/var/log/telegram-bot-api/tg-bot-api.log</span></span>
<span class="line"><span style="color:#E1E4E8;">[Install]</span></span>
<span class="line"><span style="color:#E1E4E8;">WantedBy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[Unit]</span></span>
<span class="line"><span style="color:#24292E;">Description</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">telegram</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bot</span><span style="color:#24292E;"> </span><span style="color:#032F62;">api</span></span>
<span class="line"><span style="color:#24292E;">After</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">network.target</span></span>
<span class="line"><span style="color:#24292E;">[Service]</span></span>
<span class="line"><span style="color:#24292E;">Environment</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;TELEGRAM_API_ID=xxx&quot;</span></span>
<span class="line"><span style="color:#24292E;">Environment</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;TELEGRAM_API_HASH=xxx&quot;</span></span>
<span class="line"><span style="color:#24292E;">ExecStart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/usr/local/bin/telegram-bot-api</span><span style="color:#24292E;"> --http-port</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">16666</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">--local</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--log=/var/log/telegram-bot-api/tg-bot-api.log</span></span>
<span class="line"><span style="color:#24292E;">[Install]</span></span>
<span class="line"><span style="color:#24292E;">WantedBy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">multi-user.target</span></span></code></pre></div><h3 id="immich" tabindex="-1">immich <a class="header-anchor" href="#immich" aria-label="Permalink to &quot;immich&quot;">​</a></h3><blockquote><p><a href="https://github.com/immich-app/immich" target="_blank" rel="noreferrer">https://github.com/immich-app/immich</a></p></blockquote><h3 id="memos" tabindex="-1">memos <a class="header-anchor" href="#memos" aria-label="Permalink to &quot;memos&quot;">​</a></h3><blockquote><p><a href="https://github.com/usememos/memos" target="_blank" rel="noreferrer">https://github.com/usememos/memos</a></p></blockquote>`,148),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{u as __pageData,h as default};
