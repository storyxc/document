import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.4a66d6f9.js";const m=JSON.parse('{"title":"Linux常用指令","description":"","frontmatter":{},"headers":[],"relativePath":"linux/env/Linux常用指令.md","filePath":"linux/env/Linux常用指令.md","lastUpdated":1704522520000}'),e={name:"linux/env/Linux常用指令.md"},p=l(`<h1 id="linux常用指令" tabindex="-1">Linux常用指令 <a class="header-anchor" href="#linux常用指令" aria-label="Permalink to &quot;Linux常用指令&quot;">​</a></h1><h2 id="设置时区" tabindex="-1">设置时区 <a class="header-anchor" href="#设置时区" aria-label="Permalink to &quot;设置时区&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 查看当前时间、时区</span></span>
<span class="line"><span style="color:#B392F0;">date</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#6A737D;"># 列出可用时区</span></span>
<span class="line"><span style="color:#B392F0;">timedatectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">list-timezones</span></span>
<span class="line"><span style="color:#6A737D;"># 设置时区</span></span>
<span class="line"><span style="color:#B392F0;">timedatectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-timezone</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Asia/Shanghai</span></span>
<span class="line"><span style="color:#6A737D;"># 确认已经更改</span></span>
<span class="line"><span style="color:#B392F0;">timedatectl</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 查看当前时间、时区</span></span>
<span class="line"><span style="color:#6F42C1;">date</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;"># 列出可用时区</span></span>
<span class="line"><span style="color:#6F42C1;">timedatectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list-timezones</span></span>
<span class="line"><span style="color:#6A737D;"># 设置时区</span></span>
<span class="line"><span style="color:#6F42C1;">timedatectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-timezone</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Asia/Shanghai</span></span>
<span class="line"><span style="color:#6A737D;"># 确认已经更改</span></span>
<span class="line"><span style="color:#6F42C1;">timedatectl</span></span></code></pre></div><h2 id="修改主机名" tabindex="-1">修改主机名 <a class="header-anchor" href="#修改主机名" aria-label="Permalink to &quot;修改主机名&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 查看主机信息</span></span>
<span class="line"><span style="color:#B392F0;">hostnamectl</span></span>
<span class="line"><span style="color:#6A737D;"># 修改主机名</span></span>
<span class="line"><span style="color:#B392F0;">hostnamectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-hostname</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">newhostname</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 查看主机信息</span></span>
<span class="line"><span style="color:#6F42C1;">hostnamectl</span></span>
<span class="line"><span style="color:#6A737D;"># 修改主机名</span></span>
<span class="line"><span style="color:#6F42C1;">hostnamectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-hostname</span><span style="color:#24292E;"> </span><span style="color:#032F62;">newhostname</span></span></code></pre></div>`,5),o=[p];function t(c,i,r,d,h,y){return a(),n("div",null,o)}const E=s(e,[["render",t]]);export{m as __pageData,E as default};
