import{_ as i,c as a,o as t,a2 as l}from"./chunks/framework.CQECOx-R.js";const r=JSON.parse('{"title":"Centos7安装Python3环境","description":"","frontmatter":{},"headers":[],"relativePath":"linux/env/Centos7安装Python3环境.md","filePath":"linux/env/Centos7安装Python3环境.md","lastUpdated":1742805674000}'),n={name:"linux/env/Centos7安装Python3环境.md"};function h(p,s,e,k,F,d){return t(),a("div",null,s[0]||(s[0]=[l(`<h1 id="centos7安装python3环境" tabindex="-1">Centos7安装Python3环境 <a class="header-anchor" href="#centos7安装python3环境" aria-label="Permalink to &quot;Centos7安装Python3环境&quot;">​</a></h1><ol><li>安装编译工具</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> groupinstall</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Development tools&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zlib-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bzip2-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> openssl-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ncurses-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sqlite-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> readline-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tk-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gdbm-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> db4-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libpcap-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xz-devel</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libffi-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zlib1g-dev</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zlib</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span></span></code></pre></div><ol start="2"><li>下载安装包</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://www.python.org/ftp/python/3.7.2/Python-3.7.2.tar.xz</span></span></code></pre></div><p>这一步骤提示我wget命令找不到，所以要先安装wget</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wget</span></span></code></pre></div><p>再次执行下载安装包的命令</p><ol start="3"><li>下载完成后解压并安装</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/python3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -xvf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  Python-3.7.2.tar.xz</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Python-3.7.2</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定安装位置 提高运行速度 第三个是为了解决pip需要用到ssl</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --prefix=/usr/local/python3</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --with-ssl</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div><blockquote><p>./configure --prefix=/usr/local/python3 --enable-optimizations --with-ssl --enable-optimizations参数可能在低版本gcc导致编译报错 去掉即可</p></blockquote><ol start="4"><li>创建软链接</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ln</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/python3/bin/python3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/bin/python3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ln</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/python3/bin/pip3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/bin/pip3</span></span></code></pre></div><ol start="5"><li>验证</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">python3</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip3</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span></span></code></pre></div>`,15)]))}const g=i(n,[["render",h]]);export{r as __pageData,g as default};
