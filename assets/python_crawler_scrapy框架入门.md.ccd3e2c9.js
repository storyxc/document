import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.4a66d6f9.js";const h=JSON.parse('{"title":"scrapy框架入门","description":"","frontmatter":{},"headers":[],"relativePath":"python/crawler/scrapy框架入门.md","filePath":"python/crawler/scrapy框架入门.md","lastUpdated":1704522520000}'),l={name:"python/crawler/scrapy框架入门.md"},o=p(`<h1 id="scrapy框架入门" tabindex="-1">scrapy框架入门 <a class="header-anchor" href="#scrapy框架入门" aria-label="Permalink to &quot;scrapy框架入门&quot;">​</a></h1><p>高性能的持久化存储，高性能的数据解析，分布式。</p><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h2><ul><li>安装：<code>pip install scrapy</code></li><li>创建项目：<code>scrapy startproject yourProjectName</code></li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">story_spider/</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">scrapy.cfg</span><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># 部署配置文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">story_spider/</span><span style="color:#E1E4E8;">             </span><span style="color:#6A737D;"># Python模块,代码写在这个目录下</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">__init__.py</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">items.py</span><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;"># 项目项定义文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">pipelines.py</span><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># 项目管道文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">settings.py</span><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;"># 项目设置文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">spiders/</span><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;"># 我们的爬虫/蜘蛛 目录</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">__init__.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">story_spider/</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">scrapy.cfg</span><span style="color:#24292E;">            </span><span style="color:#6A737D;"># 部署配置文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">story_spider/</span><span style="color:#24292E;">             </span><span style="color:#6A737D;"># Python模块,代码写在这个目录下</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">__init__.py</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">items.py</span><span style="color:#24292E;">          </span><span style="color:#6A737D;"># 项目项定义文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">pipelines.py</span><span style="color:#24292E;">      </span><span style="color:#6A737D;"># 项目管道文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">settings.py</span><span style="color:#24292E;">       </span><span style="color:#6A737D;"># 项目设置文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">spiders/</span><span style="color:#24292E;">          </span><span style="color:#6A737D;"># 我们的爬虫/蜘蛛 目录</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">__init__.py</span></span></code></pre></div><ul><li><p>在spiders目录中创建一个爬虫文件</p><ul><li><code>cd 项目目录</code>（spriders文件夹所在的目录）</li><li><code>scrapy genspider storyxc storyxc.com</code></li></ul></li><li><p>爬虫文件内容</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> scrapy</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 必须继承scrapy.Spider</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StoryxcSpider</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Spider</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 爬虫文件的名称:爬虫源文件的一个唯一标识</span></span>
<span class="line"><span style="color:#E1E4E8;">    name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;storyxc&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送</span></span>
<span class="line"><span style="color:#E1E4E8;">    allowed_domains </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;storyxc.com&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送</span></span>
<span class="line"><span style="color:#E1E4E8;">    start_urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;https://www.storyxc.com/&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;http://blog.storyxc.com&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 用作数据解析:response参数表示的是请求成功后的响应对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(self, response):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(response)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> scrapy</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 必须继承scrapy.Spider</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StoryxcSpider</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Spider</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 爬虫文件的名称:爬虫源文件的一个唯一标识</span></span>
<span class="line"><span style="color:#24292E;">    name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;storyxc&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送</span></span>
<span class="line"><span style="color:#24292E;">    allowed_domains </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;storyxc.com&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送</span></span>
<span class="line"><span style="color:#24292E;">    start_urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;https://www.storyxc.com/&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;http://blog.storyxc.com&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 用作数据解析:response参数表示的是请求成功后的响应对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(self, response):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(response)</span></span></code></pre></div><blockquote><p>修改settings.py中的ROBOTSTXT_OBEY = False</p><p>执行工程命令后可以加 --nolog</p><p>也可以在setting.py中添加：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#显示指定级别的日志信息</span></span>
<span class="line"><span style="color:#e1e4e8;">LOG_LEVEL = &#39;ERROR&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#显示指定级别的日志信息</span></span>
<span class="line"><span style="color:#24292e;">LOG_LEVEL = &#39;ERROR&#39;</span></span></code></pre></div></blockquote></li><li><p>执行工程<code>scrapy crawl storyxc</code>，日志信息</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">200 https://www.storyxc.com/</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">200 https://blog.storyxc.com/</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">200 https://www.storyxc.com/</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">200 https://blog.storyxc.com/</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div></li></ul><h2 id="scrapy数据解析" tabindex="-1">scrapy数据解析 <a class="header-anchor" href="#scrapy数据解析" aria-label="Permalink to &quot;scrapy数据解析&quot;">​</a></h2><p>解析糗事百科段子的作者和段子内容</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> scrapy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 必须继承scrapy.Spider</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StoryxcSpider</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Spider</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 爬虫文件的名称:爬虫源文件的一个唯一标识</span></span>
<span class="line"><span style="color:#E1E4E8;">    name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;storyxc&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># allowed_domains = [&#39;storyxc.com&#39;]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送</span></span>
<span class="line"><span style="color:#E1E4E8;">    start_urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;https://www.qiushibaike.com/text/&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 用作数据解析:response参数表示的是请求成功后的响应对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(self, response):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 解析:作者的名称+段子内容</span></span>
<span class="line"><span style="color:#E1E4E8;">        div_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.xpath(</span><span style="color:#9ECBFF;">&#39;//div[@id=&quot;content&quot;]/div/div[2]/div&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> div </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> div_list:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># extract()方法可以提取Selector对象中的data参数字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># extract_first()提取的是list数组里面的第一个字符串,</span></span>
<span class="line"><span style="color:#E1E4E8;">            author </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> div.xpath(</span><span style="color:#9ECBFF;">&#39;./div[1]/a[2]/h2/text()&#39;</span><span style="color:#E1E4E8;">).extract_first()</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># 列表调用了extract()表示将每一个Selector对象中的data字符串提取出来</span></span>
<span class="line"><span style="color:#E1E4E8;">            content </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">.join(div.xpath(</span><span style="color:#9ECBFF;">&#39;./a[1]/div[1]/span//text()&#39;</span><span style="color:#E1E4E8;">).extract())</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(author,content)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> scrapy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 必须继承scrapy.Spider</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StoryxcSpider</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Spider</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 爬虫文件的名称:爬虫源文件的一个唯一标识</span></span>
<span class="line"><span style="color:#24292E;">    name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;storyxc&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># allowed_domains = [&#39;storyxc.com&#39;]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送</span></span>
<span class="line"><span style="color:#24292E;">    start_urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;https://www.qiushibaike.com/text/&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 用作数据解析:response参数表示的是请求成功后的响应对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(self, response):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 解析:作者的名称+段子内容</span></span>
<span class="line"><span style="color:#24292E;">        div_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.xpath(</span><span style="color:#032F62;">&#39;//div[@id=&quot;content&quot;]/div/div[2]/div&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> div </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> div_list:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># extract()方法可以提取Selector对象中的data参数字符串</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># extract_first()提取的是list数组里面的第一个字符串,</span></span>
<span class="line"><span style="color:#24292E;">            author </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> div.xpath(</span><span style="color:#032F62;">&#39;./div[1]/a[2]/h2/text()&#39;</span><span style="color:#24292E;">).extract_first()</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># 列表调用了extract()表示将每一个Selector对象中的data字符串提取出来</span></span>
<span class="line"><span style="color:#24292E;">            content </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">.join(div.xpath(</span><span style="color:#032F62;">&#39;./a[1]/div[1]/span//text()&#39;</span><span style="color:#24292E;">).extract())</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(author,content)</span></span></code></pre></div><h2 id="基于终端指令持久化存储" tabindex="-1">基于终端指令持久化存储 <a class="header-anchor" href="#基于终端指令持久化存储" aria-label="Permalink to &quot;基于终端指令持久化存储&quot;">​</a></h2><p>代码改造：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> scrapy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 必须继承scrapy.Spider</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StoryxcSpider</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Spider</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 爬虫文件的名称:爬虫源文件的一个唯一标识</span></span>
<span class="line"><span style="color:#E1E4E8;">    name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;storyxc&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># allowed_domains = [&#39;storyxc.com&#39;]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送</span></span>
<span class="line"><span style="color:#E1E4E8;">    start_urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;https://www.qiushibaike.com/text/&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 用作数据解析:response参数表示的是请求成功后的响应对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(self, response):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 解析:作者的名称+段子内容</span></span>
<span class="line"><span style="color:#E1E4E8;">        div_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.xpath(</span><span style="color:#9ECBFF;">&#39;//div[@id=&quot;content&quot;]/div/div[2]/div&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        data_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> div </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> div_list:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># extract()方法可以提取Selector对象中的data参数字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># extract_first()提取的是list数组里面的第一个字符串,</span></span>
<span class="line"><span style="color:#E1E4E8;">            author </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> div.xpath(</span><span style="color:#9ECBFF;">&#39;./div[1]/a[2]/h2/text()&#39;</span><span style="color:#E1E4E8;">).extract_first()</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># 列表调用了extract()表示将每一个Selector对象中的data字符串提取出来</span></span>
<span class="line"><span style="color:#E1E4E8;">            content </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">.join(div.xpath(</span><span style="color:#9ECBFF;">&#39;./a[1]/div[1]/span//text()&#39;</span><span style="color:#E1E4E8;">).extract())</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">dict</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&#39;author&#39;</span><span style="color:#E1E4E8;">:author,</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&#39;content&#39;</span><span style="color:#E1E4E8;">:content</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            data_list.append(</span><span style="color:#79B8FF;">dict</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> data_list</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> scrapy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 必须继承scrapy.Spider</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StoryxcSpider</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Spider</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 爬虫文件的名称:爬虫源文件的一个唯一标识</span></span>
<span class="line"><span style="color:#24292E;">    name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;storyxc&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 允许的域名:用来限定start_urls列表中哪些url可以进行请求发送</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># allowed_domains = [&#39;storyxc.com&#39;]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 起始的url列表,该列表中存放的url会被scrapy自动进行请求的发送</span></span>
<span class="line"><span style="color:#24292E;">    start_urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;https://www.qiushibaike.com/text/&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 用作数据解析:response参数表示的是请求成功后的响应对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(self, response):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 解析:作者的名称+段子内容</span></span>
<span class="line"><span style="color:#24292E;">        div_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.xpath(</span><span style="color:#032F62;">&#39;//div[@id=&quot;content&quot;]/div/div[2]/div&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        data_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> div </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> div_list:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># extract()方法可以提取Selector对象中的data参数字符串</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># extract_first()提取的是list数组里面的第一个字符串,</span></span>
<span class="line"><span style="color:#24292E;">            author </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> div.xpath(</span><span style="color:#032F62;">&#39;./div[1]/a[2]/h2/text()&#39;</span><span style="color:#24292E;">).extract_first()</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># 列表调用了extract()表示将每一个Selector对象中的data字符串提取出来</span></span>
<span class="line"><span style="color:#24292E;">            content </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">.join(div.xpath(</span><span style="color:#032F62;">&#39;./a[1]/div[1]/span//text()&#39;</span><span style="color:#24292E;">).extract())</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">dict</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&#39;author&#39;</span><span style="color:#24292E;">:author,</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&#39;content&#39;</span><span style="color:#24292E;">:content</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            data_list.append(</span><span style="color:#005CC5;">dict</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> data_list</span></span></code></pre></div><ul><li>只能将parse方法返回的内容存储到本地文件中</li><li>持久化存储的格式只有&#39;json&#39;, &#39;jsonlines&#39;, &#39;jl&#39;, &#39;csv&#39;, &#39;xml&#39;, &#39;marshal&#39;, &#39;pickle&#39;</li><li>指令：<code>scrapy crawl xxx -o path</code></li></ul><h2 id="基于管道持久化存储" tabindex="-1">基于管道持久化存储 <a class="header-anchor" href="#基于管道持久化存储" aria-label="Permalink to &quot;基于管道持久化存储&quot;">​</a></h2><p>流程：</p><ul><li><p>数据解析</p></li><li><p>在item类中定义相关的属性</p><ul><li>fieldName = scrapy.Field()</li></ul></li><li><p>将解析的数据封装存储到Item类型的对象中</p></li><li><p>将item类型的对象提交给管道进行持久化存储的操作</p></li><li><p>在管道类的process_item函数中要将其接受到的item对象中存储的数据进行持久化操作</p></li><li><p>在settings.py中开启管道</p></li></ul><h3 id="代码改造" tabindex="-1">代码改造 <a class="header-anchor" href="#代码改造" aria-label="Permalink to &quot;代码改造&quot;">​</a></h3><div class="language-Python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">Python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> scrapy</span></span>
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
<span class="line"><span style="color:#E1E4E8;">    start_urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;https://www.qiushibaike.com/text/&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 用作数据解析:response参数表示的是请求成功后的响应对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(self, response):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 解析:作者的名称+段子内容</span></span>
<span class="line"><span style="color:#E1E4E8;">        div_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.xpath(</span><span style="color:#9ECBFF;">&#39;//div[@id=&quot;content&quot;]/div/div[2]/div&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        data_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> div </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> div_list:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># extract()方法可以提取Selector对象中的data参数字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># extract_first()提取的是list数组里面的第一个字符串,</span></span>
<span class="line"><span style="color:#E1E4E8;">            author </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> div.xpath(</span><span style="color:#9ECBFF;">&#39;./div[1]/a[2]/h2/text()&#39;</span><span style="color:#E1E4E8;">).extract_first()</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># 列表调用了extract()表示将每一个Selector对象中的data字符串提取出来</span></span>
<span class="line"><span style="color:#E1E4E8;">            content </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">.join(div.xpath(</span><span style="color:#9ECBFF;">&#39;./a[1]/div[1]/span//text()&#39;</span><span style="color:#E1E4E8;">).extract())</span></span>
<span class="line"><span style="color:#E1E4E8;">            item </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> StorySpiderItem()</span></span>
<span class="line"><span style="color:#E1E4E8;">            item[</span><span style="color:#9ECBFF;">&#39;author&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> author</span></span>
<span class="line"><span style="color:#E1E4E8;">            item[</span><span style="color:#9ECBFF;">&#39;content&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> content</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">yield</span><span style="color:#E1E4E8;"> item</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> scrapy</span></span>
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
<span class="line"><span style="color:#24292E;">    start_urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;https://www.qiushibaike.com/text/&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 用作数据解析:response参数表示的是请求成功后的响应对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(self, response):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 解析:作者的名称+段子内容</span></span>
<span class="line"><span style="color:#24292E;">        div_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.xpath(</span><span style="color:#032F62;">&#39;//div[@id=&quot;content&quot;]/div/div[2]/div&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        data_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> div </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> div_list:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># extract()方法可以提取Selector对象中的data参数字符串</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># extract_first()提取的是list数组里面的第一个字符串,</span></span>
<span class="line"><span style="color:#24292E;">            author </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> div.xpath(</span><span style="color:#032F62;">&#39;./div[1]/a[2]/h2/text()&#39;</span><span style="color:#24292E;">).extract_first()</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># 列表调用了extract()表示将每一个Selector对象中的data字符串提取出来</span></span>
<span class="line"><span style="color:#24292E;">            content </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">.join(div.xpath(</span><span style="color:#032F62;">&#39;./a[1]/div[1]/span//text()&#39;</span><span style="color:#24292E;">).extract())</span></span>
<span class="line"><span style="color:#24292E;">            item </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> StorySpiderItem()</span></span>
<span class="line"><span style="color:#24292E;">            item[</span><span style="color:#032F62;">&#39;author&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> author</span></span>
<span class="line"><span style="color:#24292E;">            item[</span><span style="color:#032F62;">&#39;content&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> content</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">yield</span><span style="color:#24292E;"> item</span></span></code></pre></div><h3 id="items模块" tabindex="-1">items模块 <a class="header-anchor" href="#items模块" aria-label="Permalink to &quot;items模块&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> scrapy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StorySpiderItem</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Item</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># define the fields for your item here like:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># name = scrapy.Field()</span></span>
<span class="line"><span style="color:#E1E4E8;">    author </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#E1E4E8;">    content </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scrapy.Field()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> scrapy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StorySpiderItem</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Item</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># define the fields for your item here like:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># name = scrapy.Field()</span></span>
<span class="line"><span style="color:#24292E;">    author </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#24292E;">    content </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scrapy.Field()</span></span></code></pre></div><h3 id="pipelines模块" tabindex="-1">pipelines模块 <a class="header-anchor" href="#pipelines模块" aria-label="Permalink to &quot;pipelines模块&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StorySpiderPipeline</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    fp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">None</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># open_spider方法只会在爬虫开始时调用一次,可以用于数据初始化操作</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">open_spider</span><span style="color:#E1E4E8;">(self, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;开始执行爬虫...&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.fp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">open</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./qiubai.txt&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;w&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">encoding</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;utf-8&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># close_spider会在结束时调用一次</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">close_spider</span><span style="color:#E1E4E8;">(self, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;爬虫执行结束...&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.fp.close()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 专门用来处理item对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 该方法可以接收爬虫文件提交的item对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_item</span><span style="color:#E1E4E8;">(self, item, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        author </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> item[</span><span style="color:#9ECBFF;">&#39;author&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        content </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> item[</span><span style="color:#9ECBFF;">&#39;content&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.fp.write(author </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;:&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> content </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> item</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StorySpiderPipeline</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    fp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">None</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># open_spider方法只会在爬虫开始时调用一次,可以用于数据初始化操作</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">open_spider</span><span style="color:#24292E;">(self, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;开始执行爬虫...&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.fp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">open</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./qiubai.txt&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;w&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">encoding</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># close_spider会在结束时调用一次</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">close_spider</span><span style="color:#24292E;">(self, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;爬虫执行结束...&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.fp.close()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 专门用来处理item对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 该方法可以接收爬虫文件提交的item对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_item</span><span style="color:#24292E;">(self, item, spider):</span></span>
<span class="line"><span style="color:#24292E;">        author </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> item[</span><span style="color:#032F62;">&#39;author&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        content </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> item[</span><span style="color:#032F62;">&#39;content&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.fp.write(author </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;:&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> content </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> item</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>return item可以使item继续传递到下一个即将被执行的管道类中，以此可以实现多个管道类的操作，比如一份数据持久化到文件，一份数据持久化到数据库</p></div><h3 id="配置文件中开启管道" tabindex="-1">配置文件中开启管道 <a class="header-anchor" href="#配置文件中开启管道" aria-label="Permalink to &quot;配置文件中开启管道&quot;">​</a></h3><p>settings.py中修改</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># Configure item pipelines</span></span>
<span class="line"><span style="color:#6A737D;"># See https://docs.scrapy.org/en/latest/topics/item-pipeline.html</span></span>
<span class="line"><span style="color:#79B8FF;">ITEM_PIPELINES</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 300表示优先级,数值越小,优先级越高</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">&#39;story_spider.pipelines.StorySpiderPipeline&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># Configure item pipelines</span></span>
<span class="line"><span style="color:#6A737D;"># See https://docs.scrapy.org/en/latest/topics/item-pipeline.html</span></span>
<span class="line"><span style="color:#005CC5;">ITEM_PIPELINES</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 300表示优先级,数值越小,优先级越高</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">&#39;story_spider.pipelines.StorySpiderPipeline&#39;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="执行爬虫" tabindex="-1">执行爬虫 <a class="header-anchor" href="#执行爬虫" aria-label="Permalink to &quot;执行爬虫&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">scrapy crawl storyxc</span></span>
<span class="line"><span style="color:#E1E4E8;">开始执行爬虫</span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">爬虫执行结束</span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">目录下生成了qiubai.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">scrapy crawl storyxc</span></span>
<span class="line"><span style="color:#24292E;">开始执行爬虫</span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">爬虫执行结束</span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">目录下生成了qiubai.txt</span></span></code></pre></div>`,28),e=[o];function t(c,r,y,E,i,d){return n(),a("div",null,e)}const u=s(l,[["render",t]]);export{h as __pageData,u as default};
