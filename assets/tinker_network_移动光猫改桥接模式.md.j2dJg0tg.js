import{_ as e,c as t,o,a2 as l}from"./chunks/framework.CQECOx-R.js";const m=JSON.parse('{"title":"移动光猫改桥接模式","description":"","frontmatter":{},"headers":[],"relativePath":"tinker/network/移动光猫改桥接模式.md","filePath":"tinker/network/移动光猫改桥接模式.md","lastUpdated":1742805674000}'),r={name:"tinker/network/移动光猫改桥接模式.md"};function i(n,a,d,c,s,p){return o(),t("div",null,a[0]||(a[0]=[l('<h1 id="移动光猫改桥接模式" tabindex="-1">移动光猫改桥接模式 <a class="header-anchor" href="#移动光猫改桥接模式" aria-label="Permalink to &quot;移动光猫改桥接模式&quot;">​</a></h1><p>坐标广东，移动千兆宽带，服务商的光猫是带路由功能的，但是性能极差，且跑不满带宽。然后我就在公司福利商城买了个小米的A4路由器千兆版，但是拨号还是光猫，然后就动手折腾了下，光猫改桥接模式，拨号功能改为路由器执行。这样把光猫和路由器指责剥离开来，光猫就负责光转电，路由器则进行拨号和提供Wi-Fi功能。</p><h2 id="具体操作" tabindex="-1">具体操作 <a class="header-anchor" href="#具体操作" aria-label="Permalink to &quot;具体操作&quot;">​</a></h2><h3 id="拿到光猫后台的超级管理员账户密码" tabindex="-1">拿到光猫后台的超级管理员账户密码 <a class="header-anchor" href="#拿到光猫后台的超级管理员账户密码" aria-label="Permalink to &quot;拿到光猫后台的超级管理员账户密码&quot;">​</a></h3><p>从网上找到的：</p><p>账号：<code>CMCCAdmin</code></p><p>密码：<code>aDm8H%MdA</code></p><p>这个可能各地不同，如果不行就要找宽带安装师傅或者移动问了。</p><h3 id="用管理员登录后台修改配置" tabindex="-1">用管理员登录后台修改配置 <a class="header-anchor" href="#用管理员登录后台修改配置" aria-label="Permalink to &quot;用管理员登录后台修改配置&quot;">​</a></h3><ol><li>选择网络tab页，在宽带设置中找到名字带有INTERNET的那个连接，这个链接应该是路由模式，把使能单选去掉，把选中的lan口也去掉， 记录下这个通道的vlanid备用，然后点击修改保存，这时候就把拨号禁用了。</li><li>新建一个连接，选择桥模式即桥接模式，勾选使能单选，勾选原来连接选中的lan口，填上刚才记录的vlanid，修改保存。</li></ol><h3 id="登录路由器后台修改配置" tabindex="-1">登录路由器后台修改配置 <a class="header-anchor" href="#登录路由器后台修改配置" aria-label="Permalink to &quot;登录路由器后台修改配置&quot;">​</a></h3><ol><li>将路由上网模式改为PPPoE拨号模式，输入自己的宽带账号密码，移动宽带账号为<code>手机号@139.gd</code>，密码如果不知道可以去移动app上修改宽带密码，输入后点击保存，路由器应该就可以可以进行拨号了</li></ol><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>网络上有些教程说的是直接删掉光猫原有的那个路由模式连接配置，千万别这么干，一定要按照我这种方案取消使能和lan口的操作。这样只是相当于把那个连接禁用了，并不会删除，万一自己配置路由拨号不顺利，还可以重新启用原有的连接进行上网。如果删了，自己又没配置好，那就芭比Q了。</p></div>',13)]))}const _=e(r,[["render",i]]);export{m as __pageData,_ as default};
