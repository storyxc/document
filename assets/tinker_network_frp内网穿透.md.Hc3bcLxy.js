import{_ as i,o as a,c as n,a2 as p}from"./chunks/framework.BGfUC0LL.js";const o=JSON.parse('{"title":"frp内网穿透","description":"","frontmatter":{},"headers":[],"relativePath":"tinker/network/frp内网穿透.md","filePath":"tinker/network/frp内网穿透.md","lastUpdated":1770864474000}'),l={name:"tinker/network/frp内网穿透.md"};function t(e,s,h,k,r,d){return a(),n("div",null,[...s[0]||(s[0]=[p(`<h1 id="frp内网穿透" tabindex="-1">frp内网穿透 <a class="header-anchor" href="#frp内网穿透" aria-label="Permalink to &quot;frp内网穿透&quot;">​</a></h1><p>家庭服务器由于是移动宽带（大内网），没有办法申请公网ip，这样不在家的时候就无法进行服务器管理了。如果有公网ip，可以使用ddns，也可以用花生壳这类内网穿透工具。或者自己有一台有公网ip的云主机，可以通过frp应用来实现内网穿透。frp仓库地址：<code>https://github.com/fatedier/frp</code></p><h2 id="frp使用" tabindex="-1">frp使用 <a class="header-anchor" href="#frp使用" aria-label="Permalink to &quot;frp使用&quot;">​</a></h2><p>具体使用可以查看<a href="https://gofrp.org/docs/" target="_blank" rel="noreferrer">frp使用文档</a>，这里介绍下我用的场景：带sk校验的安全的ssh连接</p><p>在云主机上部署fprs，配置如下：</p><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[common]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bind_addr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 0.0.0.0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bind_port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 7000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">token</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = xxx</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/systemd/system/frps.service</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Description=frps</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">After=network.target</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Type=simple</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ExecStart=/usr/bin/frps -c /etc/frps/frps.ini</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Restart=on-failure</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span></code></pre></div><ul><li>在需要暴露到内网的机器A上部署 frpc，配置如下：</li></ul><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[common]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server_addr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = x.x.x.x</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server_port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 7000</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">token</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = xxx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[ssh]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = tcp</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local_ip</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 127.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local_port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 22</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">remote_port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 6001</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[secret_ssh]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = stcp</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 只有 sk 一致的用户才能访问到此服务</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">sk</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = abcdefg</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local_ip</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 127.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local_port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 22</span></span></code></pre></div><p>在需要访问内网的机器上执行命令连接内网服务，例如用户为root</p><p><code>ssh -oPort=6001 root@x.x.x.x</code></p><ul><li>在需要访问内网的机器B上部署frpc，配置如下：</li></ul><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[common]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server_addr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = x.x.x.x</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server_port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 7000</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">token</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = xxx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[secret_ssh_visitor]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = stcp</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># stcp 的访问者</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">role</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = visitor</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 要访问的 stcp 代理的名字</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = secret_ssh</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">sk</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = abcdefg</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 绑定本地端口用于访问 SSH 服务</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bind_addr</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 127.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bind_port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = 6000</span></span></code></pre></div><p>在需要访问内网的机器上执行命令连接内网服务，例如用户为root</p><p><code>ssh -oPort 6000 root@127.0.0.1</code></p><p>如果内网机器开启了密钥登录，则需要指定内网服务器的私钥文件</p><p><code>ssh -oPort 6000 -i identityFile root@127.0.0.1</code></p>`,17)])])}const E=i(l,[["render",t]]);export{o as __pageData,E as default};
