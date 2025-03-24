import{_ as i,c as a,o as l,a2 as n}from"./chunks/framework.CQECOx-R.js";const E=JSON.parse('{"title":"jQuery","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/base/jQuery.md","filePath":"frontend/base/jQuery.md","lastUpdated":1742805674000}'),e={name:"frontend/base/jQuery.md"};function t(h,s,p,k,r,d){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="jquery" tabindex="-1">jQuery <a class="header-anchor" href="#jquery" aria-label="Permalink to &quot;jQuery&quot;">​</a></h1><h2 id="顶级对象" tabindex="-1">顶级对象 <a class="header-anchor" href="#顶级对象" aria-label="Permalink to &quot;顶级对象&quot;">​</a></h2><p><code>$</code>是jQuery的别称，也是jQuery的顶级对象，相当于原生JavaScript肿的window，把元素用<code>$</code>包装成jQuery对象，就可以调用jQuery的方法。</p><h2 id="入口函数" tabindex="-1">入口函数 <a class="header-anchor" href="#入口函数" aria-label="Permalink to &quot;入口函数&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(document).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ready</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //do something</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //do something</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h2 id="dom对象和jquery对象" tabindex="-1">DOM对象和jQuery对象 <a class="header-anchor" href="#dom对象和jquery对象" aria-label="Permalink to &quot;DOM对象和jQuery对象&quot;">​</a></h2><ul><li>用原生JS获取的对象是DOM对象</li><li>jQuery方法获取的元素是jQuery对象，本质是<code>$</code>对DOM对象包装后产生的对象（伪数组形式存储）</li><li>DOM和jQuery对象互相转换 <ul><li>DOM对象转jQuery对象：<code>$(dom对象)</code></li><li>jQuery对象转DOM对象 <ul><li><code>$(&#39;div&#39;)[index]</code></li><li><code>$(&#39;div&#39;).get(index)</code></li></ul></li></ul></li></ul><h2 id="jquery常用api" tabindex="-1">jQuery常用API <a class="header-anchor" href="#jquery常用api" aria-label="Permalink to &quot;jQuery常用API&quot;">​</a></h2><h3 id="选择器" tabindex="-1">选择器 <a class="header-anchor" href="#选择器" aria-label="Permalink to &quot;选择器&quot;">​</a></h3><ul><li><code>$(&quot;选择器&quot;)</code></li><li>筛选选择器 <ul><li><code>$(&#39;li:first&#39;)</code></li><li><code>$(&#39;li:last&#39;)</code></li><li><code>$(&#39;li:eq(2)&#39;)</code>：索引号等于2</li><li><code>$(&#39;li:odd&#39;)</code>:索引号为奇数</li><li><code>$(&#39;li:even&#39;)</code>：索引号为偶数</li></ul></li><li>筛选方法 <ul><li>parent()</li><li>children(selector)</li><li>find(selector)</li><li>siblings(selector):查找兄弟节点 不包括本身</li><li>nextAll([expr])：查找当前元素之后所有同辈元素</li><li>prevtAll([expr])：查找当前之前所有同辈元素</li><li>hasClass(class)</li><li>eq(index)</li></ul></li></ul><blockquote><p>遍历DOM元素（伪数组形式存储）的过程叫隐式迭代：给匹配到的所有元素进行循环遍历，执行相应的方法，而不用手动进行循环调用</p><p>jQuery支持链式编程</p></blockquote><h3 id="样式操作" tabindex="-1">样式操作 <a class="header-anchor" href="#样式操作" aria-label="Permalink to &quot;样式操作&quot;">​</a></h3><ul><li>操作样式：<code>jQuery对象.css(属性, 值)</code></li><li>参数可以是对象形式，设置多组样式:<code>jQuery对象.css({&quot;color&quot;: &quot;pink&quot;, &quot;font-size&quot;: &quot;15px&quot;})</code> (属性可以不用加引号)</li><li>获取样式属性值：<code>jQuery对象.css(属性)</code></li><li>设置类样式： <ul><li><code>jQuery对象.addClass(className)</code></li><li><code>jQuery对象.removeClass(className)</code></li><li><code>jQuery对象.toggleClass(className)</code></li></ul></li></ul><h3 id="效果" tabindex="-1">效果 <a class="header-anchor" href="#效果" aria-label="Permalink to &quot;效果&quot;">​</a></h3><h4 id="显示隐藏" tabindex="-1">显示隐藏 <a class="header-anchor" href="#显示隐藏" aria-label="Permalink to &quot;显示隐藏&quot;">​</a></h4><ul><li>show([speed, [easing], [fn]]) <ul><li>参数都可以省略，无动画直接显示</li><li>speed：三种预设速度之一的字符串(slow/normal/fast)或表示动画时长的毫秒数值</li><li>easing：用来切换指定效果，默认<code>swing</code>，可用参数<code>linear</code></li><li>fn：回调函数，在动画完成时执行的函数，每个元素执行一次</li></ul></li><li>hide()</li><li>toggle()</li></ul><h4 id="滑动" tabindex="-1">滑动 <a class="header-anchor" href="#滑动" aria-label="Permalink to &quot;滑动&quot;">​</a></h4><ul><li>slideDown()</li><li>slideUp()</li><li>slideToggle()</li></ul><blockquote><p>动画队列停止排队：stop()，必须写在动画的前面</p><p>jQuery对象.children(&quot;ul&quot;).stop().slideToggle()</p></blockquote><h4 id="淡入淡出" tabindex="-1">淡入淡出 <a class="header-anchor" href="#淡入淡出" aria-label="Permalink to &quot;淡入淡出&quot;">​</a></h4><ul><li>fadeIn()</li><li>fadeOut()</li><li>fadeToggle()</li><li>fadeTo([[speed], opacity, [easing], [fn]]):修改透明度</li></ul><h4 id="自定义动画" tabindex="-1">自定义动画 <a class="header-anchor" href="#自定义动画" aria-label="Permalink to &quot;自定义动画&quot;">​</a></h4><ul><li>animate(params, [speed], [easing],[fn])</li><li>params:想要更改的样式属性，以对象形式传递，必传。属性名可以不带引号，如果是复合属性需要采取驼峰命名</li></ul><h3 id="属性操作" tabindex="-1">属性操作 <a class="header-anchor" href="#属性操作" aria-label="Permalink to &quot;属性操作&quot;">​</a></h3><ul><li>prop(属性名):获取元素固有属性</li><li>prop(属性名, 值)：设置元素固有属性</li><li>attr(属性名)：获取元素自定义属性</li><li>attr(属性名, 值)：设置元素自定义属性</li><li>data()：可以在指定元素上存取数据，并不会修改DOM元素结构，页面刷新，存放的数据会被移除，也可以获取h5自定义属性，不用data-开头</li></ul><h3 id="文本属性" tabindex="-1">文本属性 <a class="header-anchor" href="#文本属性" aria-label="Permalink to &quot;文本属性&quot;">​</a></h3><ul><li>html()：相当于原生js中的innerHTML</li><li>text()：相当于原生js中的innerText</li><li>val()：相当于原生js的value</li></ul><h3 id="元素操作" tabindex="-1">元素操作 <a class="header-anchor" href="#元素操作" aria-label="Permalink to &quot;元素操作&quot;">​</a></h3><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>- jQuery对象.each(function(index, domElement) { } )：遍历匹配的每一个元素，index是索引号，domElement是DOM元素对象，不是jQuery对象</span></span>
<span class="line"><span>- $.each(obj, function(index, domElement) { })：遍历指定对象</span></span>
<span class="line"><span>- 创建元素：var li = $(&quot;&lt;li&gt; &lt;/li&gt;&quot;)</span></span>
<span class="line"><span>- 添加元素</span></span>
<span class="line"><span>  - element.append(li)：拼接到最后</span></span>
<span class="line"><span>  - element.prepend(li)：插入到最前</span></span>
<span class="line"><span>  - element.before(li)：放到元素之后</span></span>
<span class="line"><span>  - element.after(li)：放到元素之前</span></span>
<span class="line"><span>- 删除元素</span></span>
<span class="line"><span>  - element.remove()：删除匹配的元素</span></span>
<span class="line"><span>  - element.empty()：删除匹配元素的子节点</span></span>
<span class="line"><span>  - element.html(&quot;&quot;)：等价于empty()</span></span></code></pre></div><h3 id="尺寸、位置操作" tabindex="-1">尺寸、位置操作 <a class="header-anchor" href="#尺寸、位置操作" aria-label="Permalink to &quot;尺寸、位置操作&quot;">​</a></h3><h4 id="尺寸" tabindex="-1">尺寸 <a class="header-anchor" href="#尺寸" aria-label="Permalink to &quot;尺寸&quot;">​</a></h4><ul><li>width()/height()：只包含宽高</li><li>innerWidth()/innerHeight()：+padding</li><li>outerWidth()/outerHeight()：+padding、border</li><li>outerWidth(true)/outerHeight(true)：+padding、border、margin</li></ul><h4 id="位置" tabindex="-1">位置 <a class="header-anchor" href="#位置" aria-label="Permalink to &quot;位置&quot;">​</a></h4><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>- offset()：设置或返回被选元素相对于文档(document)的偏移坐标，跟父级没有关系</span></span>
<span class="line"><span>    - 有两个属性left、top</span></span>
<span class="line"><span>    - 修改传递对象{top: 10, left: 30}</span></span>
<span class="line"><span>- position()：返回被选元素相对**带有定位父级**偏移坐标，如果父级都没有定位，以文档为准</span></span>
<span class="line"><span>- scrollTop()/scrollLeft()：被卷去的头部/左侧</span></span>
<span class="line"><span>    - 可以传递参数直接跳到指定位置</span></span></code></pre></div><h3 id="jquery事件" tabindex="-1">jQuery事件 <a class="header-anchor" href="#jquery事件" aria-label="Permalink to &quot;jQuery事件&quot;">​</a></h3><h4 id="事件注册" tabindex="-1">事件注册 <a class="header-anchor" href="#事件注册" aria-label="Permalink to &quot;事件注册&quot;">​</a></h4><ul><li><code>element.事件(function(){})</code></li></ul><h4 id="事件处理" tabindex="-1">事件处理 <a class="header-anchor" href="#事件处理" aria-label="Permalink to &quot;事件处理&quot;">​</a></h4><h5 id="on" tabindex="-1">on <a class="header-anchor" href="#on" aria-label="Permalink to &quot;on&quot;">​</a></h5><ul><li><code>element.on(events, [selector], fn)</code><ul><li>events：一个或多个用空格分隔的事件类型，如click、keydown</li><li>selector：元素的子元素选择器</li><li>fn：回调函数，即绑定在元素身上的侦听函数</li></ul></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;div&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    mouseenter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">css</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;background&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;skyblue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">css</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;background&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;red&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;div&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;mouseenter mouseleave&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toggleClass</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;current&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h5 id="事件委托" tabindex="-1">事件委托 <a class="header-anchor" href="#事件委托" aria-label="Permalink to &quot;事件委托&quot;">​</a></h5><p>事件绑定在父元素上</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ul&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;click&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;li&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    alert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;111&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h5 id="on可以给未来元素绑定事件" tabindex="-1">on可以给未来元素绑定事件 <a class="header-anchor" href="#on可以给未来元素绑定事件" aria-label="Permalink to &quot;on可以给未来元素绑定事件&quot;">​</a></h5><h5 id="事件解绑off" tabindex="-1">事件解绑off <a class="header-anchor" href="#事件解绑off" aria-label="Permalink to &quot;事件解绑off&quot;">​</a></h5><ul><li><code>element.off()</code>解绑所有</li><li><code>element.off(事件1，事件2...)</code>解绑指定</li></ul><h6 id="只触发一次的事件one" tabindex="-1">只触发一次的事件one <a class="header-anchor" href="#只触发一次的事件one" aria-label="Permalink to &quot;只触发一次的事件one&quot;">​</a></h6><p><code>element.one(事件,fn)</code></p><h5 id="自动触发" tabindex="-1">自动触发 <a class="header-anchor" href="#自动触发" aria-label="Permalink to &quot;自动触发&quot;">​</a></h5><ul><li>element.事件()</li><li>element.trigger(事件)</li><li>element.triggerHandler(事件)：不会触发元素的默认行为</li></ul><h4 id="事件对象" tabindex="-1">事件对象 <a class="header-anchor" href="#事件对象" aria-label="Permalink to &quot;事件对象&quot;">​</a></h4><p>事件被触发，就会有事件对象的产生</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">element.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(events, [selector], </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(event)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    event.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">preventDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//阻止默认行为</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//阻止默认行为</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    event.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">stopPropagation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//阻止冒泡</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h3 id="其他方法" tabindex="-1">其他方法 <a class="header-anchor" href="#其他方法" aria-label="Permalink to &quot;其他方法&quot;">​</a></h3><h4 id="拷贝对象" tabindex="-1">拷贝对象 <a class="header-anchor" href="#拷贝对象" aria-label="Permalink to &quot;拷贝对象&quot;">​</a></h4><p><code>$.extend([deep], target, object1, [objectN])</code></p><ul><li><p>deep:true-深拷贝，默认false-浅拷贝</p></li><li><p>target：目标对象</p></li><li><p>object：源对象</p></li><li><p>objectN：第N个源对象，会覆盖前面的相同属性</p></li></ul><h4 id="多库共存" tabindex="-1">多库共存 <a class="header-anchor" href="#多库共存" aria-label="Permalink to &quot;多库共存&quot;">​</a></h4><ul><li><code>$</code>统一改为<code>jQuery</code></li><li>新的名称<code>$.noConflict()</code>/<code>jQuery.noConflict()</code></li></ul><h4 id="jquery插件" tabindex="-1">jQuery插件 <a class="header-anchor" href="#jquery插件" aria-label="Permalink to &quot;jQuery插件&quot;">​</a></h4><ul><li>瀑布流</li><li>图片懒加载</li><li>全屏滚动:fullpage.js</li><li>Bootstrap组件、插件</li></ul><h2 id="jquery请求" tabindex="-1">jQuery请求 <a class="header-anchor" href="#jquery请求" aria-label="Permalink to &quot;jQuery请求&quot;">​</a></h2><ul><li><p><code>$.get(url, [data], [callback])</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#btn&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;click&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      $.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;xxx.com/api/getXxx&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;a=b&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div></li><li><p><code>$.post(url, [data], [callback])</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#btn&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;click&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      $.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;xxx.com/api/getXxx&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;a&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;b&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div></li><li><p><code>$.ajax()</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ajax</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  url: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  data: {},</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  success</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div></li></ul>`,64)]))}const c=i(e,[["render",t]]);export{E as __pageData,c as default};
