import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.4a66d6f9.js";const u=JSON.parse('{"title":"scrapy进阶","description":"","frontmatter":{},"headers":[],"relativePath":"python/crawler/scrapy进阶.md","filePath":"python/crawler/scrapy进阶.md","lastUpdated":1704522520000}'),p={name:"python/crawler/scrapy进阶.md"},e=l(`<h1 id="scrapy进阶" tabindex="-1">scrapy进阶 <a class="header-anchor" href="#scrapy进阶" aria-label="Permalink to &quot;scrapy进阶&quot;">​</a></h1><h2 id="全站数据爬取" tabindex="-1">全站数据爬取 <a class="header-anchor" href="#全站数据爬取" aria-label="Permalink to &quot;全站数据爬取&quot;">​</a></h2><ul><li><p>将网站中某板块下的全部页码对应页面数据进行爬取</p></li><li><p>需求:爬取<a href="http://www.521609.com/meinvxiaohua/%E7%9A%84%E6%89%80%E6%9C%89%E9%A1%B5%E7%A0%81%E7%9A%84%E6%89%80%E6%9C%89%E7%85%A7%E7%89%87%E5%90%8D%E7%A7%B0" target="_blank" rel="noreferrer">http://www.521609.com/meinvxiaohua/的所有页码的所有照片名称</a></p></li><li><p>实现方式</p><ul><li><p>将所有页面url添加到start_urls列表</p></li><li><p>手动进行请求发送</p></li></ul></li></ul><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> scrapy</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> story_spider.items </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> StorySpiderItem</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 必须继承scrapy.Spider</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StoryxcSpider</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Spider</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 爬虫文件的名称:爬虫源文件的一个唯一标识</span></span>
<span class="line"><span style="color:#E1E4E8;">    name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;storyxc&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># allowed_domains = [&#39;storyxc.com&#39;]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送</span></span>
<span class="line"><span style="color:#E1E4E8;">    start_urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;http://www.521609.com/meinvxiaohua/&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    url_template </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;http://www.521609.com/meinvxiaohua/list12</span><span style="color:#79B8FF;">%d</span><span style="color:#9ECBFF;">.html&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    page_num </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(self, response):</span></span>
<span class="line"><span style="color:#E1E4E8;">        li_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.xpath(</span><span style="color:#9ECBFF;">&#39;//div[@id=&quot;content&quot;]/div[2]/div[2]/ul/li&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> li </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> li_list:</span></span>
<span class="line"><span style="color:#E1E4E8;">            img_name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> li.xpath(</span><span style="color:#9ECBFF;">&#39;./a[2]//text()&#39;</span><span style="color:#E1E4E8;">).extract_first()</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(img_name)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.page_num </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">11</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            next_url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">format</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.url_template </span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.page_num)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.page_num </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># 手动请求发送:yield scrapy.Request(url,callback)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># callback专门用作数据解析</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">yield</span><span style="color:#E1E4E8;"> scrapy.Request(</span><span style="color:#FFAB70;">url</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">next_url, </span><span style="color:#FFAB70;">callback</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.parse)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> scrapy</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> story_spider.items </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> StorySpiderItem</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 必须继承scrapy.Spider</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StoryxcSpider</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Spider</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 爬虫文件的名称:爬虫源文件的一个唯一标识</span></span>
<span class="line"><span style="color:#24292E;">    name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;storyxc&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># allowed_domains = [&#39;storyxc.com&#39;]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送</span></span>
<span class="line"><span style="color:#24292E;">    start_urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;http://www.521609.com/meinvxiaohua/&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    url_template </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;http://www.521609.com/meinvxiaohua/list12</span><span style="color:#005CC5;">%d</span><span style="color:#032F62;">.html&#39;</span></span>
<span class="line"><span style="color:#24292E;">    page_num </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(self, response):</span></span>
<span class="line"><span style="color:#24292E;">        li_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.xpath(</span><span style="color:#032F62;">&#39;//div[@id=&quot;content&quot;]/div[2]/div[2]/ul/li&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> li </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> li_list:</span></span>
<span class="line"><span style="color:#24292E;">            img_name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> li.xpath(</span><span style="color:#032F62;">&#39;./a[2]//text()&#39;</span><span style="color:#24292E;">).extract_first()</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(img_name)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.page_num </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">11</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            next_url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">format</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.url_template </span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.page_num)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.page_num </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># 手动请求发送:yield scrapy.Request(url,callback)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># callback专门用作数据解析</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">yield</span><span style="color:#24292E;"> scrapy.Request(</span><span style="color:#E36209;">url</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">next_url, </span><span style="color:#E36209;">callback</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.parse)</span></span></code></pre></div><h2 id="五大核心组件" tabindex="-1">五大核心组件 <a class="header-anchor" href="#五大核心组件" aria-label="Permalink to &quot;五大核心组件&quot;">​</a></h2><ul><li>引擎</li><li>调度器</li><li>下载器</li><li>Spider</li><li>管道</li></ul><p>流程:</p><ul><li><p>spider中产生url，对url进行请求发送</p></li><li><p>url会被封装成请求对象交给引擎，引擎把请求给调度器</p></li><li><p>调度器会使用过滤器将引擎提交的请求去重，将去重后的请求对象放入队列</p></li><li><p>调度器会把请求对象从队列中调度给引擎，引擎把请求交给下载器</p></li><li><p>下载器去互联网中进行数据下载，将数据封装在response里返回给引擎</p></li><li><p>引擎将response返回给spider，spider对数据进行解析，将数据封装到item当中，交给引擎</p></li><li><p>引擎把item交给管道</p></li><li><p>管道进行持久化存储</p></li></ul><p><img src="https://storyxc.com/images/blog//1-200F3200S0420.png" alt="gzuo"></p><h2 id="请求传参" tabindex="-1">请求传参 <a class="header-anchor" href="#请求传参" aria-label="Permalink to &quot;请求传参&quot;">​</a></h2><ul><li><p>使用场景：如果爬取解析的数据不再同一张页面中（深度爬取）</p></li><li><p><code>yield scrapy.Request(url,callback,meta= {&#39;item&#39;:item})</code></p><ul><li>请求传参 item可以传递给callback回调函数</li></ul></li></ul><h2 id="图片爬取之imagepipeline" tabindex="-1">图片爬取之ImagePipeline <a class="header-anchor" href="#图片爬取之imagepipeline" aria-label="Permalink to &quot;图片爬取之ImagePipeline&quot;">​</a></h2><ul><li>字符串持久化：xpath解析交给管道持久化</li><li>图片持久化：xpath解析出src属性，单独对图片地址发起请求获取图片二进制类型数据</li></ul><h3 id="imagepipeline" tabindex="-1">ImagePipeline <a class="header-anchor" href="#imagepipeline" aria-label="Permalink to &quot;ImagePipeline&quot;">​</a></h3><p>只需要解析出img的src属性进行解析并提交到管道,管道就会对图片的src进行请求发送获取二进制数据</p><h4 id="爬虫文件" tabindex="-1">爬虫文件 <a class="header-anchor" href="#爬虫文件" aria-label="Permalink to &quot;爬虫文件&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> scrapy</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> story_spider.items </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> StorySpiderItem</span></span>
<span class="line"><span style="color:#6A737D;"># 必须继承scrapy.Spider</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StoryxcSpider</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Spider</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 爬虫文件的名称:爬虫源文件的一个唯一标识</span></span>
<span class="line"><span style="color:#E1E4E8;">    name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;storyxc&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># allowed_domains = [&#39;storyxc.com&#39;]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送</span></span>
<span class="line"><span style="color:#E1E4E8;">    start_urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;http://sc.chinaz.com/tupian/&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(self, response):</span></span>
<span class="line"><span style="color:#E1E4E8;">        div_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.xpath(</span><span style="color:#9ECBFF;">&#39;//div[@id=&quot;container&quot;]/div&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> div </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> div_list:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># 该网站有懒加载,要使用伪属性</span></span>
<span class="line"><span style="color:#E1E4E8;">            src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> div.xpath(</span><span style="color:#9ECBFF;">&#39;./div/a/img/@src2&#39;</span><span style="color:#E1E4E8;">).extract_first()</span></span>
<span class="line"><span style="color:#E1E4E8;">            real_src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https:&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> src</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># print(real_src)</span></span>
<span class="line"><span style="color:#E1E4E8;">            item </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> StorySpiderItem()</span></span>
<span class="line"><span style="color:#E1E4E8;">            item[</span><span style="color:#9ECBFF;">&#39;src&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> real_src</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">yield</span><span style="color:#E1E4E8;"> item</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> scrapy</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> story_spider.items </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> StorySpiderItem</span></span>
<span class="line"><span style="color:#6A737D;"># 必须继承scrapy.Spider</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StoryxcSpider</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Spider</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 爬虫文件的名称:爬虫源文件的一个唯一标识</span></span>
<span class="line"><span style="color:#24292E;">    name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;storyxc&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># allowed_domains = [&#39;storyxc.com&#39;]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送</span></span>
<span class="line"><span style="color:#24292E;">    start_urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;http://sc.chinaz.com/tupian/&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(self, response):</span></span>
<span class="line"><span style="color:#24292E;">        div_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.xpath(</span><span style="color:#032F62;">&#39;//div[@id=&quot;container&quot;]/div&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> div </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> div_list:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># 该网站有懒加载,要使用伪属性</span></span>
<span class="line"><span style="color:#24292E;">            src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> div.xpath(</span><span style="color:#032F62;">&#39;./div/a/img/@src2&#39;</span><span style="color:#24292E;">).extract_first()</span></span>
<span class="line"><span style="color:#24292E;">            real_src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https:&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> src</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># print(real_src)</span></span>
<span class="line"><span style="color:#24292E;">            item </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> StorySpiderItem()</span></span>
<span class="line"><span style="color:#24292E;">            item[</span><span style="color:#032F62;">&#39;src&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> real_src</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">yield</span><span style="color:#24292E;"> item</span></span></code></pre></div><h4 id="items" tabindex="-1">Items <a class="header-anchor" href="#items" aria-label="Permalink to &quot;Items&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># Define here the models for your scraped items</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6A737D;"># See documentation in:</span></span>
<span class="line"><span style="color:#6A737D;"># https://docs.scrapy.org/en/latest/topics/items.html</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> scrapy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StorySpiderItem</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Item</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># define the fields for your item here like:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># name = scrapy.Field()</span></span>
<span class="line"><span style="color:#E1E4E8;">    src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scrapy.Field()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># Define here the models for your scraped items</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6A737D;"># See documentation in:</span></span>
<span class="line"><span style="color:#6A737D;"># https://docs.scrapy.org/en/latest/topics/items.html</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> scrapy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StorySpiderItem</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Item</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># define the fields for your item here like:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># name = scrapy.Field()</span></span>
<span class="line"><span style="color:#24292E;">    src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scrapy.Field()</span></span></code></pre></div><h4 id="pipeline" tabindex="-1">Pipeline <a class="header-anchor" href="#pipeline" aria-label="Permalink to &quot;Pipeline&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># Define your item pipelines here</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># Don&#39;t forget to add your pipeline to the ITEM_PIPELINES setting</span></span>
<span class="line"><span style="color:#e1e4e8;"># See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># useful for handling different item types with a single interface</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">from scrapy.pipelines.images import ImagesPipeline</span></span>
<span class="line"><span style="color:#e1e4e8;">import scrapy</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">class ImagePipeline(ImagesPipeline):</span></span>
<span class="line"><span style="color:#e1e4e8;">    # 根据图片地址进行图片数据的请求</span></span>
<span class="line"><span style="color:#e1e4e8;">    def get_media_requests(self, item, info):</span></span>
<span class="line"><span style="color:#e1e4e8;">        print(item[&#39;src&#39;])</span></span>
<span class="line"><span style="color:#e1e4e8;">        yield scrapy.Request(item[&#39;src&#39;])</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    def file_path(self, request, response=None, info=None, *, item=None):</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 指定图片存储路径</span></span>
<span class="line"><span style="color:#e1e4e8;">        imageName = request.url.split(&#39;/&#39;)[-1]</span></span>
<span class="line"><span style="color:#e1e4e8;">        return imageName</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    def item_completed(self, results, item, info):</span></span>
<span class="line"><span style="color:#e1e4e8;">        return item  # 返回给下一个被执行的管道类</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;"># Define your item pipelines here</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># Don&#39;t forget to add your pipeline to the ITEM_PIPELINES setting</span></span>
<span class="line"><span style="color:#24292e;"># See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># useful for handling different item types with a single interface</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">from scrapy.pipelines.images import ImagesPipeline</span></span>
<span class="line"><span style="color:#24292e;">import scrapy</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">class ImagePipeline(ImagesPipeline):</span></span>
<span class="line"><span style="color:#24292e;">    # 根据图片地址进行图片数据的请求</span></span>
<span class="line"><span style="color:#24292e;">    def get_media_requests(self, item, info):</span></span>
<span class="line"><span style="color:#24292e;">        print(item[&#39;src&#39;])</span></span>
<span class="line"><span style="color:#24292e;">        yield scrapy.Request(item[&#39;src&#39;])</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    def file_path(self, request, response=None, info=None, *, item=None):</span></span>
<span class="line"><span style="color:#24292e;">        # 指定图片存储路径</span></span>
<span class="line"><span style="color:#24292e;">        imageName = request.url.split(&#39;/&#39;)[-1]</span></span>
<span class="line"><span style="color:#24292e;">        return imageName</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    def item_completed(self, results, item, info):</span></span>
<span class="line"><span style="color:#24292e;">        return item  # 返回给下一个被执行的管道类</span></span></code></pre></div><h4 id="settings" tabindex="-1">settings <a class="header-anchor" href="#settings" aria-label="Permalink to &quot;settings&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 保存的文件夹</span></span>
<span class="line"><span style="color:#e1e4e8;">IMAGES_STORE = &#39;./imgs&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 启用管道</span></span>
<span class="line"><span style="color:#e1e4e8;">ITEM_PIPELINES = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    # 300表示优先级,数值越小,优先级越高</span></span>
<span class="line"><span style="color:#e1e4e8;">   &#39;story_spider.pipelines.ImagePipeline&#39;: 300</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 保存的文件夹</span></span>
<span class="line"><span style="color:#24292e;">IMAGES_STORE = &#39;./imgs&#39;</span></span>
<span class="line"><span style="color:#24292e;"># 启用管道</span></span>
<span class="line"><span style="color:#24292e;">ITEM_PIPELINES = {</span></span>
<span class="line"><span style="color:#24292e;">    # 300表示优先级,数值越小,优先级越高</span></span>
<span class="line"><span style="color:#24292e;">   &#39;story_spider.pipelines.ImagePipeline&#39;: 300</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>这里直接运行不会报错,但是会发现也没有下载成功,但是实际上url已经能拿到了,把日志的级别放开后,查看日志信息会发现有一句<code> 2021-05-01 13:22:48 [scrapy.middleware] WARNING: Disabled ImgsPipeline: ImagesPipeline requires installing Pillow 4.0.0 or later</code></p><p>提示使用ImagesPipeline还需要安装下pillow :<code>pip install pillow</code></p><p>这个很坑,不仔细看找不到,排查了半天才解决</p></div><p>安装完pillow后启动爬虫，可以看到图片已经下载完成</p><h2 id="中间件" tabindex="-1">中间件 <a class="header-anchor" href="#中间件" aria-label="Permalink to &quot;中间件&quot;">​</a></h2><ul><li>下载中间件 <ul><li>位置：引擎和下载器之间</li><li>作用：批量拦截到整个工程中所有的请求和响应</li><li>拦截请求： <ul><li>UA伪装</li><li>代理IP设置</li></ul></li><li>拦截响应： <ul><li>篡改响应数据，响应对象</li></ul></li><li>核心方法： <ul><li>process_request：拦截请求</li><li>process_response：拦截响应</li><li>processs_exception：拦截发生异常的请求</li></ul></li></ul></li><li>爬虫中间件 <ul><li>位置：在引擎及爬虫</li><li>作用：处理spider的输入(response)和输出(item及requests).</li></ul></li></ul><h3 id="下载中间件" tabindex="-1">下载中间件 <a class="header-anchor" href="#下载中间件" aria-label="Permalink to &quot;下载中间件&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_request</span><span style="color:#E1E4E8;">(self, request, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># UA 伪装,也可以设置ua池,随机设置</span></span>
<span class="line"><span style="color:#E1E4E8;">        request.headers[</span><span style="color:#9ECBFF;">&#39;User-Agent&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 设置代理</span></span>
<span class="line"><span style="color:#E1E4E8;">        request.meta[</span><span style="color:#9ECBFF;">&#39;proxy&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://ip:port&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">None</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_response</span><span style="color:#E1E4E8;">(self, request, response, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># Called with the response returned from the downloader.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># Must either;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># - return a Response object</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># - return a Request object</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># - or raise IgnoreRequest</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> response</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_exception</span><span style="color:#E1E4E8;">(self, request, exception, spider):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># Called when a download handler or a process_request()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># (from other downloader middleware) raises an exception.</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 发生异常的请求切换代理 也可以实现代理池,指定切换逻辑</span></span>
<span class="line"><span style="color:#E1E4E8;">        request.meta[</span><span style="color:#9ECBFF;">&#39;proxy&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://ip:port&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># Must either:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># - return None: continue processing this exception</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># - return a Response object: stops process_exception() chain</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># - return a Request object: stops process_exception() chain</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> request </span><span style="color:#6A737D;">#将修正后的request重新进行发送</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_request</span><span style="color:#24292E;">(self, request, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># UA 伪装,也可以设置ua池,随机设置</span></span>
<span class="line"><span style="color:#24292E;">        request.headers[</span><span style="color:#032F62;">&#39;User-Agent&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 设置代理</span></span>
<span class="line"><span style="color:#24292E;">        request.meta[</span><span style="color:#032F62;">&#39;proxy&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://ip:port&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">None</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_response</span><span style="color:#24292E;">(self, request, response, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># Called with the response returned from the downloader.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># Must either;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># - return a Response object</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># - return a Request object</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># - or raise IgnoreRequest</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> response</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_exception</span><span style="color:#24292E;">(self, request, exception, spider):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># Called when a download handler or a process_request()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># (from other downloader middleware) raises an exception.</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 发生异常的请求切换代理 也可以实现代理池,指定切换逻辑</span></span>
<span class="line"><span style="color:#24292E;">        request.meta[</span><span style="color:#032F62;">&#39;proxy&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://ip:port&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># Must either:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># - return None: continue processing this exception</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># - return a Response object: stops process_exception() chain</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># - return a Request object: stops process_exception() chain</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> request </span><span style="color:#6A737D;">#将修正后的request重新进行发送</span></span></code></pre></div><h2 id="案例-爬取网易新闻指定分类下的新闻标题和内容" tabindex="-1">案例:爬取网易新闻指定分类下的新闻标题和内容 <a class="header-anchor" href="#案例-爬取网易新闻指定分类下的新闻标题和内容" aria-label="Permalink to &quot;案例:爬取网易新闻指定分类下的新闻标题和内容&quot;">​</a></h2><h3 id="爬虫类" tabindex="-1">爬虫类 <a class="header-anchor" href="#爬虫类" aria-label="Permalink to &quot;爬虫类&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> scrapy</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> story_spider.items </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> StorySpiderItem</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 必须继承scrapy.Spider</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StoryxcSpider</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Spider</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 爬虫文件的名称:爬虫源文件的一个唯一标识</span></span>
<span class="line"><span style="color:#E1E4E8;">    name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;storyxc&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># allowed_domains = [&#39;storyxc.com&#39;]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送</span></span>
<span class="line"><span style="color:#E1E4E8;">    start_urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;https://news.163.com/&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    module_urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__init__</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">().</span><span style="color:#79B8FF;">__init__</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> selenium </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> webdriver</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.browser </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> webdriver.Chrome()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(self, response):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        li_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.xpath(</span><span style="color:#9ECBFF;">&#39;//*[@id=&quot;index2016_wrap&quot;]/div[1]/div[2]/div[2]/div[2]/div[2]/div/ul/li&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        need_index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> need_index:</span></span>
<span class="line"><span style="color:#E1E4E8;">            module_url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> li_list[index].xpath(</span><span style="color:#9ECBFF;">&#39;./a/@href&#39;</span><span style="color:#E1E4E8;">).extract_first()</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.module_urls.append(module_url)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> url </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.module_urls:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">yield</span><span style="color:#E1E4E8;"> scrapy.Request(url, </span><span style="color:#FFAB70;">callback</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.parse_module)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#  解析篡改过的 已经添加了动态加载数据的响应信息</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse_module</span><span style="color:#E1E4E8;">(self, response):</span></span>
<span class="line"><span style="color:#E1E4E8;">        div_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.xpath(</span><span style="color:#9ECBFF;">&#39;/html/body/div/div[3]/div[4]/div[1]/div[1]/div/ul/li/div/div&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> div </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> div_list:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># news_title = div.xpath(&#39;./div/div[1]/h3/a/text()&#39;).extract_first()</span></span>
<span class="line"><span style="color:#E1E4E8;">            detail_url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> div.xpath(</span><span style="color:#9ECBFF;">&#39;./div/div[1]/h3/a/@href&#39;</span><span style="color:#E1E4E8;">).extract_first()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">yield</span><span style="color:#E1E4E8;"> scrapy.Request(</span><span style="color:#FFAB70;">url</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">detail_url,</span><span style="color:#FFAB70;">callback</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.parse_detail)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 解析新闻详情页</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse_detail</span><span style="color:#E1E4E8;">(self, response):</span></span>
<span class="line"><span style="color:#E1E4E8;">        title </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.xpath(</span><span style="color:#9ECBFF;">&#39;//*[@id=&quot;container&quot;]/div[1]/h1/text()&#39;</span><span style="color:#E1E4E8;">).extract_first()</span></span>
<span class="line"><span style="color:#E1E4E8;">        detail_text </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.xpath(</span><span style="color:#9ECBFF;">&#39;//*[@id=&quot;content&quot;]/div[2]//text()&#39;</span><span style="color:#E1E4E8;">).extract()</span></span>
<span class="line"><span style="color:#E1E4E8;">        detail_text </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">.join(detail_text)</span></span>
<span class="line"><span style="color:#E1E4E8;">        item </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> StorySpiderItem()</span></span>
<span class="line"><span style="color:#E1E4E8;">        item[</span><span style="color:#9ECBFF;">&#39;title&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> title</span></span>
<span class="line"><span style="color:#E1E4E8;">        item[</span><span style="color:#9ECBFF;">&#39;content&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> detail_text</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">yield</span><span style="color:#E1E4E8;"> item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">closed</span><span style="color:#E1E4E8;">(self,spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.browser.quit()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> scrapy</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> story_spider.items </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> StorySpiderItem</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 必须继承scrapy.Spider</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StoryxcSpider</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Spider</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 爬虫文件的名称:爬虫源文件的一个唯一标识</span></span>
<span class="line"><span style="color:#24292E;">    name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;storyxc&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># allowed_domains = [&#39;storyxc.com&#39;]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送</span></span>
<span class="line"><span style="color:#24292E;">    start_urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;https://news.163.com/&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    module_urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__init__</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">().</span><span style="color:#005CC5;">__init__</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> selenium </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> webdriver</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.browser </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> webdriver.Chrome()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(self, response):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        li_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.xpath(</span><span style="color:#032F62;">&#39;//*[@id=&quot;index2016_wrap&quot;]/div[1]/div[2]/div[2]/div[2]/div[2]/div/ul/li&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        need_index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">6</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> need_index:</span></span>
<span class="line"><span style="color:#24292E;">            module_url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> li_list[index].xpath(</span><span style="color:#032F62;">&#39;./a/@href&#39;</span><span style="color:#24292E;">).extract_first()</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.module_urls.append(module_url)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> url </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.module_urls:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">yield</span><span style="color:#24292E;"> scrapy.Request(url, </span><span style="color:#E36209;">callback</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.parse_module)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#  解析篡改过的 已经添加了动态加载数据的响应信息</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse_module</span><span style="color:#24292E;">(self, response):</span></span>
<span class="line"><span style="color:#24292E;">        div_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.xpath(</span><span style="color:#032F62;">&#39;/html/body/div/div[3]/div[4]/div[1]/div[1]/div/ul/li/div/div&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> div </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> div_list:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># news_title = div.xpath(&#39;./div/div[1]/h3/a/text()&#39;).extract_first()</span></span>
<span class="line"><span style="color:#24292E;">            detail_url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> div.xpath(</span><span style="color:#032F62;">&#39;./div/div[1]/h3/a/@href&#39;</span><span style="color:#24292E;">).extract_first()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">yield</span><span style="color:#24292E;"> scrapy.Request(</span><span style="color:#E36209;">url</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">detail_url,</span><span style="color:#E36209;">callback</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.parse_detail)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 解析新闻详情页</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse_detail</span><span style="color:#24292E;">(self, response):</span></span>
<span class="line"><span style="color:#24292E;">        title </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.xpath(</span><span style="color:#032F62;">&#39;//*[@id=&quot;container&quot;]/div[1]/h1/text()&#39;</span><span style="color:#24292E;">).extract_first()</span></span>
<span class="line"><span style="color:#24292E;">        detail_text </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.xpath(</span><span style="color:#032F62;">&#39;//*[@id=&quot;content&quot;]/div[2]//text()&#39;</span><span style="color:#24292E;">).extract()</span></span>
<span class="line"><span style="color:#24292E;">        detail_text </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">.join(detail_text)</span></span>
<span class="line"><span style="color:#24292E;">        item </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> StorySpiderItem()</span></span>
<span class="line"><span style="color:#24292E;">        item[</span><span style="color:#032F62;">&#39;title&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> title</span></span>
<span class="line"><span style="color:#24292E;">        item[</span><span style="color:#032F62;">&#39;content&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> detail_text</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">yield</span><span style="color:#24292E;"> item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">closed</span><span style="color:#24292E;">(self,spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.browser.quit()</span></span></code></pre></div><h3 id="中间件类" tabindex="-1">中间件类 <a class="header-anchor" href="#中间件类" aria-label="Permalink to &quot;中间件类&quot;">​</a></h3><p>只展示了下载中间件</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StorySpiderDownloaderMiddleware</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_request</span><span style="color:#E1E4E8;">(self, request, spider):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">None</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 拦截模块对应的响应对象,进行篡改</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 由于是动态加载的内容,使用selenium</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_response</span><span style="color:#E1E4E8;">(self, request, response, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 过滤指定的响应对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> spider.module_urls</span></span>
<span class="line"><span style="color:#E1E4E8;">        bro </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> spider.browser</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> scrapy.http </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> HtmlResponse</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> time </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> sleep</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 只有指定模块url的数据才使用selenium请求并进行篡改数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> request.url </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> urls:</span></span>
<span class="line"><span style="color:#E1E4E8;">            bro.get(request.url) </span><span style="color:#6A737D;"># selenium请求详情页</span></span>
<span class="line"><span style="color:#E1E4E8;">            sleep(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">            page_data </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> bro.page_source </span><span style="color:#6A737D;"># 包含了动态加载的新闻数据</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># 要爬取的指定模块的响应内容</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># 实例化一个新的响应对象 (包含动态加载的新闻数据),替代原来的响应对象</span></span>
<span class="line"><span style="color:#E1E4E8;">            new_res </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> HtmlResponse(</span><span style="color:#FFAB70;">url</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">request.url,</span><span style="color:#FFAB70;">body</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">page_data,</span><span style="color:#FFAB70;">encoding</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;utf-8&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">request</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">request)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> new_res</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> response</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_exception</span><span style="color:#E1E4E8;">(self, request, exception, spider):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> request </span><span style="color:#6A737D;">#将修正后的request重新进行发送</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StorySpiderDownloaderMiddleware</span><span style="color:#24292E;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_request</span><span style="color:#24292E;">(self, request, spider):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">None</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 拦截模块对应的响应对象,进行篡改</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 由于是动态加载的内容,使用selenium</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_response</span><span style="color:#24292E;">(self, request, response, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 过滤指定的响应对象</span></span>
<span class="line"><span style="color:#24292E;">        urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> spider.module_urls</span></span>
<span class="line"><span style="color:#24292E;">        bro </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> spider.browser</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> scrapy.http </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> HtmlResponse</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> time </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> sleep</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 只有指定模块url的数据才使用selenium请求并进行篡改数据</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> request.url </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> urls:</span></span>
<span class="line"><span style="color:#24292E;">            bro.get(request.url) </span><span style="color:#6A737D;"># selenium请求详情页</span></span>
<span class="line"><span style="color:#24292E;">            sleep(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">            page_data </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> bro.page_source </span><span style="color:#6A737D;"># 包含了动态加载的新闻数据</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># 要爬取的指定模块的响应内容</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># 实例化一个新的响应对象 (包含动态加载的新闻数据),替代原来的响应对象</span></span>
<span class="line"><span style="color:#24292E;">            new_res </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> HtmlResponse(</span><span style="color:#E36209;">url</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">request.url,</span><span style="color:#E36209;">body</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">page_data,</span><span style="color:#E36209;">encoding</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">,</span><span style="color:#E36209;">request</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">request)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> new_res</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> response</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_exception</span><span style="color:#24292E;">(self, request, exception, spider):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> request </span><span style="color:#6A737D;">#将修正后的request重新进行发送</span></span></code></pre></div><h3 id="item类" tabindex="-1">Item类 <a class="header-anchor" href="#item类" aria-label="Permalink to &quot;Item类&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> scrapy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StorySpiderItem</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Item</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># define the fields for your item here like:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># name = scrapy.Field()</span></span>
<span class="line"><span style="color:#E1E4E8;">    title </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#E1E4E8;">    content </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scrapy.Field()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> scrapy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StorySpiderItem</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Item</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># define the fields for your item here like:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># name = scrapy.Field()</span></span>
<span class="line"><span style="color:#24292E;">    title </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#24292E;">    content </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scrapy.Field()</span></span></code></pre></div><h3 id="pipeline类" tabindex="-1">Pipeline类 <a class="header-anchor" href="#pipeline类" aria-label="Permalink to &quot;Pipeline类&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StroyxcPipeline</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">object</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    fp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">None</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">open_spider</span><span style="color:#E1E4E8;">(self, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.fp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">open</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./163news.txt&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;w&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">encoding</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;utf-8&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_item</span><span style="color:#E1E4E8;">(self, item, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.fp.write(item[</span><span style="color:#9ECBFF;">&#39;title&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;:&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> item[</span><span style="color:#9ECBFF;">&#39;content&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">close_spider</span><span style="color:#E1E4E8;">(self, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.fp.close()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StroyxcPipeline</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">object</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    fp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">None</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">open_spider</span><span style="color:#24292E;">(self, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.fp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">open</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./163news.txt&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;w&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">encoding</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_item</span><span style="color:#24292E;">(self, item, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.fp.write(item[</span><span style="color:#032F62;">&#39;title&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;:&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> item[</span><span style="color:#032F62;">&#39;content&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> item</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">close_spider</span><span style="color:#24292E;">(self, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.fp.close()</span></span></code></pre></div><h3 id="settings配置" tabindex="-1">settings配置 <a class="header-anchor" href="#settings配置" aria-label="Permalink to &quot;settings配置&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">BOT_NAME</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;story_spider&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">SPIDER_MODULES</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;story_spider.spiders&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#79B8FF;">NEWSPIDER_MODULE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;story_spider.spiders&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Crawl responsibly by identifying yourself (and your website) on the user-agent</span></span>
<span class="line"><span style="color:#79B8FF;">USER_AGENT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Obey robots.txt rules</span></span>
<span class="line"><span style="color:#79B8FF;">ROBOTSTXT_OBEY</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Enable or disable downloader middlewares</span></span>
<span class="line"><span style="color:#6A737D;"># See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html</span></span>
<span class="line"><span style="color:#79B8FF;">DOWNLOADER_MIDDLEWARES</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">&#39;story_spider.middlewares.StorySpiderDownloaderMiddleware&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">543</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Configure item pipelines</span></span>
<span class="line"><span style="color:#6A737D;"># See https://docs.scrapy.org/en/latest/topics/item-pipeline.html</span></span>
<span class="line"><span style="color:#79B8FF;">ITEM_PIPELINES</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 300表示优先级,数值越小,优先级越高</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">&#39;story_spider.pipelines.StroyxcPipeline&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">300</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">BOT_NAME</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;story_spider&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">SPIDER_MODULES</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;story_spider.spiders&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#005CC5;">NEWSPIDER_MODULE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;story_spider.spiders&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Crawl responsibly by identifying yourself (and your website) on the user-agent</span></span>
<span class="line"><span style="color:#005CC5;">USER_AGENT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Obey robots.txt rules</span></span>
<span class="line"><span style="color:#005CC5;">ROBOTSTXT_OBEY</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Enable or disable downloader middlewares</span></span>
<span class="line"><span style="color:#6A737D;"># See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html</span></span>
<span class="line"><span style="color:#005CC5;">DOWNLOADER_MIDDLEWARES</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">&#39;story_spider.middlewares.StorySpiderDownloaderMiddleware&#39;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">543</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Configure item pipelines</span></span>
<span class="line"><span style="color:#6A737D;"># See https://docs.scrapy.org/en/latest/topics/item-pipeline.html</span></span>
<span class="line"><span style="color:#005CC5;">ITEM_PIPELINES</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 300表示优先级,数值越小,优先级越高</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">&#39;story_spider.pipelines.StroyxcPipeline&#39;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">300</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>运行结果：</p><p><img src="https://storyxc.com/images/blog//image-20210501172946555.png" alt="image-20210501172946555"></p><h2 id="scrapy调试" tabindex="-1">scrapy调试 <a class="header-anchor" href="#scrapy调试" aria-label="Permalink to &quot;scrapy调试&quot;">​</a></h2><ul><li><p>pycharm中编辑运行/debug配置</p></li><li><p>点击加号添加一个新的配置,选择python,给配置命个名,比如scrapy</p></li><li><p>script path选择python目录下的<code>Lib/site-packages/scrapycmdline.py</code></p></li><li><p>parameter填<code>crawl yourSpiderName</code></p></li><li><p>working directory填写爬虫项目路径</p></li><li><p>保存,再debug运行scrapy这个配置就行</p></li></ul><p>例如:</p><p><img src="https://storyxc.com/images/blog//image-20210502101609233.png" alt="image-20210502101609233"></p>`,47),o=[e];function t(r,c,y,E,i,d){return n(),a("div",null,o)}const m=s(p,[["render",t]]);export{u as __pageData,m as default};
