import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.4a66d6f9.js";const u=JSON.parse('{"title":"增量式爬虫实践案例 下载指定b站up主的所有作品","description":"","frontmatter":{},"headers":[],"relativePath":"python/crawler/增量式爬虫实践案例 下载指定b站up主的所有作品.md","filePath":"python/crawler/增量式爬虫实践案例 下载指定b站up主的所有作品.md","lastUpdated":1704522520000}'),l={name:"python/crawler/增量式爬虫实践案例 下载指定b站up主的所有作品.md"},o=p(`<h1 id="增量式爬虫实践案例-下载指定b站up主的所有作品" tabindex="-1">增量式爬虫实践案例 下载指定b站up主的所有作品 <a class="header-anchor" href="#增量式爬虫实践案例-下载指定b站up主的所有作品" aria-label="Permalink to &quot;增量式爬虫实践案例 下载指定b站up主的所有作品&quot;">​</a></h1><h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>增量式爬取指定的up主的所有投稿作品，即实现一个增量式爬虫。</p><p>这次示范的up主是个妹子😏<a href="https://space.bilibili.com/17485141/video" target="_blank" rel="noreferrer">kototo</a>使用了scrapy框架，主要是为了练手，不使用框架反而会更简单一些。</p><p>python模块：scrapy、selenium、requests、pymysql</p><p>其他环境：ffmpeg、mysql</p><h2 id="创建一个项目并创建爬虫" tabindex="-1">创建一个项目并创建爬虫 <a class="header-anchor" href="#创建一个项目并创建爬虫" aria-label="Permalink to &quot;创建一个项目并创建爬虫&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">startproject</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kototo</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kototo</span></span>
<span class="line"><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">genspider</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kototo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bilibili.com</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;"> </span><span style="color:#032F62;">startproject</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kototo</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kototo</span></span>
<span class="line"><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;"> </span><span style="color:#032F62;">genspider</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kototo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bilibili.com</span></span></code></pre></div><h2 id="爬虫类" tabindex="-1">爬虫类 <a class="header-anchor" href="#爬虫类" aria-label="Permalink to &quot;爬虫类&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> scrapy</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> selenium </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> webdriver</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> re</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> json</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> requests</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> os</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> kototo.items </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> KototoItem</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> pymysql</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">KototoSpider</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Spider</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;kototo&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    start_urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__init__</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        构造器,主要初始化了selenium对象并实现无头浏览器,以及</span></span>
<span class="line"><span style="color:#9ECBFF;">        初始化需要爬取的url地址,因为b站的翻页是js实现的,所以要手动处理一下</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">().</span><span style="color:#79B8FF;">__init__</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 构造无头浏览器</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> selenium.webdriver.chrome.options </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Options</span></span>
<span class="line"><span style="color:#E1E4E8;">        chrome_options </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Options()</span></span>
<span class="line"><span style="color:#E1E4E8;">        chrome_options.add_argument(</span><span style="color:#9ECBFF;">&#39;--headless&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        chrome_options.add_argument(</span><span style="color:#9ECBFF;">&#39;--disable-gpu&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.bro </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> webdriver.Chrome(</span><span style="color:#FFAB70;">chrome_options</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">chrome_options)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 指定的up主的投稿页面,可以提到外面使用input输入</span></span>
<span class="line"><span style="color:#E1E4E8;">        space_url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://space.bilibili.com/17485141/video&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 初始化需要爬取的列表页</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.init_start_urls(</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.start_urls, space_url)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 创建桌面文件夹</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.desktop_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> os.path.join(os.path.expanduser(</span><span style="color:#9ECBFF;">&#39;~&#39;</span><span style="color:#E1E4E8;">), </span><span style="color:#9ECBFF;">&#39;Desktop</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.name </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">not</span><span style="color:#E1E4E8;"> os.path.exists(</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.desktop_path):</span></span>
<span class="line"><span style="color:#E1E4E8;">            os.mkdir(</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.desktop_path)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(self, response):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        解析方法,解析列表页的视频li,拿到标题和详情页,然后主动请求详情页</span></span>
<span class="line"><span style="color:#9ECBFF;">        :param response: </span></span>
<span class="line"><span style="color:#9ECBFF;">        :return: </span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        li_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.xpath(</span><span style="color:#9ECBFF;">&#39;//*[@id=&quot;submit-video-list&quot;]/ul[2]/li&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> li </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> li_list:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(li.xpath(</span><span style="color:#9ECBFF;">&#39;./a[2]/@title&#39;</span><span style="color:#E1E4E8;">).extract_first())</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(detail_url </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> li.xpath(</span><span style="color:#9ECBFF;">&#39;./a[2]/@href&#39;</span><span style="color:#E1E4E8;">).extract_first()[</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">:])</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">yield</span><span style="color:#E1E4E8;"> scrapy.Request(</span><span style="color:#FFAB70;">url</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">detail_url, </span><span style="color:#FFAB70;">callback</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.parse_detail)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse_detail</span><span style="color:#E1E4E8;">(self, response):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        增量爬取: 解析详情页的音视频地址并交给管道处理</span></span>
<span class="line"><span style="color:#9ECBFF;">        使用mysql实现</span></span>
<span class="line"><span style="color:#9ECBFF;">        :param response: </span></span>
<span class="line"><span style="color:#9ECBFF;">        :return: </span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        title </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.xpath(</span><span style="color:#9ECBFF;">&#39;//*[@id=&quot;viewbox_report&quot;]/h1/@title&#39;</span><span style="color:#E1E4E8;">).extract_first()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 替换掉视频名称中无法用在文件名中或会导致cmd命令出错的字符</span></span>
<span class="line"><span style="color:#E1E4E8;">        title </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> title.replace(</span><span style="color:#9ECBFF;">&#39;-&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">).replace(</span><span style="color:#9ECBFF;">&#39; &#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">).replace(</span><span style="color:#9ECBFF;">&#39;/&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">).replace(</span><span style="color:#9ECBFF;">&#39;|&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        play_info_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.get_play_info(response)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 这里使用mysql的唯一索引实现增量爬取,如果是服务器上跑也可以用redis</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.insert_info(title, play_info_list[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]):</span></span>
<span class="line"><span style="color:#E1E4E8;">            video_temp_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.desktop_path </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> title </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;_temp.mp4&#39;</span><span style="color:#E1E4E8;">).replace(</span><span style="color:#9ECBFF;">&#39;-&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">            video_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.desktop_path </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> title </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;.mp4&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            audio_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.desktop_path </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> title </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;.mp3&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            item </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> KototoItem()</span></span>
<span class="line"><span style="color:#E1E4E8;">            item[</span><span style="color:#9ECBFF;">&#39;video_url&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> play_info_list[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">            item[</span><span style="color:#9ECBFF;">&#39;audio_url&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> play_info_list[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">            item[</span><span style="color:#9ECBFF;">&#39;video_path&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> video_path</span></span>
<span class="line"><span style="color:#E1E4E8;">            item[</span><span style="color:#9ECBFF;">&#39;audio_path&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> audio_path</span></span>
<span class="line"><span style="color:#E1E4E8;">            item[</span><span style="color:#9ECBFF;">&#39;video_temp_path&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> video_temp_path</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">yield</span><span style="color:#E1E4E8;"> item</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(title </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;: 已经下载过了!&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">insert_info</span><span style="color:#E1E4E8;">(self, vtitle, vurl):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        mysql持久化存储爬取过的视频内容信息</span></span>
<span class="line"><span style="color:#9ECBFF;">        :param vtitle: 标题</span></span>
<span class="line"><span style="color:#9ECBFF;">        :param vurl: 视频链接</span></span>
<span class="line"><span style="color:#9ECBFF;">        :return: </span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> Mysql() </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> conn:</span></span>
<span class="line"><span style="color:#E1E4E8;">            cursor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> conn.cursor(pymysql.cursors.DictCursor)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                sql </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;insert into tb_kototo(title,url) values(&quot;</span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;,&quot;</span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;)&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> (vtitle, vurl)</span></span>
<span class="line"><span style="color:#E1E4E8;">                res </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cursor.execute(sql)</span></span>
<span class="line"><span style="color:#E1E4E8;">                conn.commit()</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> res </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">True</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">except</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get_play_info</span><span style="color:#E1E4E8;">(self, resp):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        解析详情页的源代码,提取其中的视频和文件真实地址</span></span>
<span class="line"><span style="color:#9ECBFF;">        :param resp: </span></span>
<span class="line"><span style="color:#9ECBFF;">        :return: </span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        json_data </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> json.loads(re.findall(</span><span style="color:#9ECBFF;">&#39;&lt;script&gt;window\\.__playinfo__=(.*?)&lt;/script&gt;&#39;</span><span style="color:#E1E4E8;">, resp.text)[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 拿到视频和音频的真实链接地址</span></span>
<span class="line"><span style="color:#E1E4E8;">        video_url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> json_data[</span><span style="color:#9ECBFF;">&#39;data&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&#39;dash&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&#39;video&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&#39;backupUrl&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        audio_url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> json_data[</span><span style="color:#9ECBFF;">&#39;data&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&#39;dash&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&#39;audio&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&#39;backupUrl&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> video_url, audio_url</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">init_start_urls</span><span style="color:#E1E4E8;">(self, url_list, person_page):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        初始化需要爬取的列表页,由于b站使用js翻页,无法在源码中找到翻页地址,</span></span>
<span class="line"><span style="color:#9ECBFF;">        需要自己手动实现解析翻页url的操作</span></span>
<span class="line"><span style="color:#9ECBFF;">        :param url_list: </span></span>
<span class="line"><span style="color:#9ECBFF;">        :param person_page: </span></span>
<span class="line"><span style="color:#9ECBFF;">        :return: </span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        mid </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> re.findall(</span><span style="color:#9ECBFF;">&#39;https://space.bilibili.com/(.*?)/video\\w*&#39;</span><span style="color:#E1E4E8;">, person_page)[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://api.bilibili.com/x/space/arc/search?mid=&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> mid </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&amp;ps=30&amp;tid=0&amp;pn=1&amp;keyword=&amp;order=pubdate&amp;jsonp=jsonp&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        headers </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;User-Agent&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;Referer&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;https://www.bilibili.com&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        json_data </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> requests.get(</span><span style="color:#FFAB70;">url</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">url, </span><span style="color:#FFAB70;">headers</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">headers).json()</span></span>
<span class="line"><span style="color:#E1E4E8;">        total_count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> json_data[</span><span style="color:#9ECBFF;">&#39;data&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&#39;page&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&#39;count&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        page_size </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> json_data[</span><span style="color:#9ECBFF;">&#39;data&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&#39;page&#39;</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&#39;ps&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> total_count </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> page_size:</span></span>
<span class="line"><span style="color:#E1E4E8;">            page_count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">elif</span><span style="color:#E1E4E8;"> total_count </span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> page_size </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            page_count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> total_count </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> page_size</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            page_count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> total_count </span><span style="color:#F97583;">//</span><span style="color:#E1E4E8;"> page_size </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        url_template </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://space.bilibili.com/&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> mid </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/video?tid=0&amp;page=&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;</span><span style="color:#79B8FF;">%d</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&amp;keyword=&amp;order=pubdate&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">range</span><span style="color:#E1E4E8;">(page_count):</span></span>
<span class="line"><span style="color:#E1E4E8;">            page_no </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">            url_list.append(url_template </span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> page_no)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">closed</span><span style="color:#E1E4E8;">(self, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        爬虫结束关闭selenium窗口</span></span>
<span class="line"><span style="color:#9ECBFF;">        :param spider: </span></span>
<span class="line"><span style="color:#9ECBFF;">        :return: </span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.bro.quit()</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Mysql</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">object</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__enter__</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.connection </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> pymysql.connect(</span><span style="color:#FFAB70;">host</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;127.0.0.1&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">port</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">3306</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">user</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">password</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">database</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;python&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.connection</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__exit__</span><span style="color:#E1E4E8;">(self, exc_type, exc_val, exc_tb):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.connection.close()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> scrapy</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> selenium </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> webdriver</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> re</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> json</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> requests</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> os</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> kototo.items </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> KototoItem</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> pymysql</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">KototoSpider</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Spider</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;kototo&#39;</span></span>
<span class="line"><span style="color:#24292E;">    start_urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__init__</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">        构造器,主要初始化了selenium对象并实现无头浏览器,以及</span></span>
<span class="line"><span style="color:#032F62;">        初始化需要爬取的url地址,因为b站的翻页是js实现的,所以要手动处理一下</span></span>
<span class="line"><span style="color:#032F62;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">().</span><span style="color:#005CC5;">__init__</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 构造无头浏览器</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> selenium.webdriver.chrome.options </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Options</span></span>
<span class="line"><span style="color:#24292E;">        chrome_options </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Options()</span></span>
<span class="line"><span style="color:#24292E;">        chrome_options.add_argument(</span><span style="color:#032F62;">&#39;--headless&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        chrome_options.add_argument(</span><span style="color:#032F62;">&#39;--disable-gpu&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.bro </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> webdriver.Chrome(</span><span style="color:#E36209;">chrome_options</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">chrome_options)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 指定的up主的投稿页面,可以提到外面使用input输入</span></span>
<span class="line"><span style="color:#24292E;">        space_url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://space.bilibili.com/17485141/video&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 初始化需要爬取的列表页</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.init_start_urls(</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.start_urls, space_url)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 创建桌面文件夹</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.desktop_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> os.path.join(os.path.expanduser(</span><span style="color:#032F62;">&#39;~&#39;</span><span style="color:#24292E;">), </span><span style="color:#032F62;">&#39;Desktop</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">not</span><span style="color:#24292E;"> os.path.exists(</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.desktop_path):</span></span>
<span class="line"><span style="color:#24292E;">            os.mkdir(</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.desktop_path)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(self, response):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">        解析方法,解析列表页的视频li,拿到标题和详情页,然后主动请求详情页</span></span>
<span class="line"><span style="color:#032F62;">        :param response: </span></span>
<span class="line"><span style="color:#032F62;">        :return: </span></span>
<span class="line"><span style="color:#032F62;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        li_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.xpath(</span><span style="color:#032F62;">&#39;//*[@id=&quot;submit-video-list&quot;]/ul[2]/li&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> li </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> li_list:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(li.xpath(</span><span style="color:#032F62;">&#39;./a[2]/@title&#39;</span><span style="color:#24292E;">).extract_first())</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(detail_url </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> li.xpath(</span><span style="color:#032F62;">&#39;./a[2]/@href&#39;</span><span style="color:#24292E;">).extract_first()[</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">:])</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">yield</span><span style="color:#24292E;"> scrapy.Request(</span><span style="color:#E36209;">url</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">detail_url, </span><span style="color:#E36209;">callback</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.parse_detail)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse_detail</span><span style="color:#24292E;">(self, response):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">        增量爬取: 解析详情页的音视频地址并交给管道处理</span></span>
<span class="line"><span style="color:#032F62;">        使用mysql实现</span></span>
<span class="line"><span style="color:#032F62;">        :param response: </span></span>
<span class="line"><span style="color:#032F62;">        :return: </span></span>
<span class="line"><span style="color:#032F62;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        title </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.xpath(</span><span style="color:#032F62;">&#39;//*[@id=&quot;viewbox_report&quot;]/h1/@title&#39;</span><span style="color:#24292E;">).extract_first()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 替换掉视频名称中无法用在文件名中或会导致cmd命令出错的字符</span></span>
<span class="line"><span style="color:#24292E;">        title </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> title.replace(</span><span style="color:#032F62;">&#39;-&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">).replace(</span><span style="color:#032F62;">&#39; &#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">).replace(</span><span style="color:#032F62;">&#39;/&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">).replace(</span><span style="color:#032F62;">&#39;|&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        play_info_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.get_play_info(response)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 这里使用mysql的唯一索引实现增量爬取,如果是服务器上跑也可以用redis</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.insert_info(title, play_info_list[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]):</span></span>
<span class="line"><span style="color:#24292E;">            video_temp_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.desktop_path </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> title </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;_temp.mp4&#39;</span><span style="color:#24292E;">).replace(</span><span style="color:#032F62;">&#39;-&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">            video_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.desktop_path </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> title </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;.mp4&#39;</span></span>
<span class="line"><span style="color:#24292E;">            audio_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.desktop_path </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> title </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;.mp3&#39;</span></span>
<span class="line"><span style="color:#24292E;">            item </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> KototoItem()</span></span>
<span class="line"><span style="color:#24292E;">            item[</span><span style="color:#032F62;">&#39;video_url&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> play_info_list[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">            item[</span><span style="color:#032F62;">&#39;audio_url&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> play_info_list[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">            item[</span><span style="color:#032F62;">&#39;video_path&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> video_path</span></span>
<span class="line"><span style="color:#24292E;">            item[</span><span style="color:#032F62;">&#39;audio_path&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> audio_path</span></span>
<span class="line"><span style="color:#24292E;">            item[</span><span style="color:#032F62;">&#39;video_temp_path&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> video_temp_path</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">yield</span><span style="color:#24292E;"> item</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(title </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;: 已经下载过了!&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">insert_info</span><span style="color:#24292E;">(self, vtitle, vurl):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">        mysql持久化存储爬取过的视频内容信息</span></span>
<span class="line"><span style="color:#032F62;">        :param vtitle: 标题</span></span>
<span class="line"><span style="color:#032F62;">        :param vurl: 视频链接</span></span>
<span class="line"><span style="color:#032F62;">        :return: </span></span>
<span class="line"><span style="color:#032F62;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> Mysql() </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> conn:</span></span>
<span class="line"><span style="color:#24292E;">            cursor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> conn.cursor(pymysql.cursors.DictCursor)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">try</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                sql </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;insert into tb_kototo(title,url) values(&quot;</span><span style="color:#005CC5;">%s</span><span style="color:#032F62;">&quot;,&quot;</span><span style="color:#005CC5;">%s</span><span style="color:#032F62;">&quot;)&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> (vtitle, vurl)</span></span>
<span class="line"><span style="color:#24292E;">                res </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cursor.execute(sql)</span></span>
<span class="line"><span style="color:#24292E;">                conn.commit()</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> res </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">True</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">else</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">except</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get_play_info</span><span style="color:#24292E;">(self, resp):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">        解析详情页的源代码,提取其中的视频和文件真实地址</span></span>
<span class="line"><span style="color:#032F62;">        :param resp: </span></span>
<span class="line"><span style="color:#032F62;">        :return: </span></span>
<span class="line"><span style="color:#032F62;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        json_data </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> json.loads(re.findall(</span><span style="color:#032F62;">&#39;&lt;script&gt;window\\.__playinfo__=(.*?)&lt;/script&gt;&#39;</span><span style="color:#24292E;">, resp.text)[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">])</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 拿到视频和音频的真实链接地址</span></span>
<span class="line"><span style="color:#24292E;">        video_url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> json_data[</span><span style="color:#032F62;">&#39;data&#39;</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&#39;dash&#39;</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&#39;video&#39;</span><span style="color:#24292E;">][</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&#39;backupUrl&#39;</span><span style="color:#24292E;">][</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        audio_url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> json_data[</span><span style="color:#032F62;">&#39;data&#39;</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&#39;dash&#39;</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&#39;audio&#39;</span><span style="color:#24292E;">][</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&#39;backupUrl&#39;</span><span style="color:#24292E;">][</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> video_url, audio_url</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">init_start_urls</span><span style="color:#24292E;">(self, url_list, person_page):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">        初始化需要爬取的列表页,由于b站使用js翻页,无法在源码中找到翻页地址,</span></span>
<span class="line"><span style="color:#032F62;">        需要自己手动实现解析翻页url的操作</span></span>
<span class="line"><span style="color:#032F62;">        :param url_list: </span></span>
<span class="line"><span style="color:#032F62;">        :param person_page: </span></span>
<span class="line"><span style="color:#032F62;">        :return: </span></span>
<span class="line"><span style="color:#032F62;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        mid </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> re.findall(</span><span style="color:#032F62;">&#39;https://space.bilibili.com/(.*?)/video\\w*&#39;</span><span style="color:#24292E;">, person_page)[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://api.bilibili.com/x/space/arc/search?mid=&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> mid </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&amp;ps=30&amp;tid=0&amp;pn=1&amp;keyword=&amp;order=pubdate&amp;jsonp=jsonp&#39;</span></span>
<span class="line"><span style="color:#24292E;">        headers </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;User-Agent&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;Referer&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;https://www.bilibili.com&#39;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        json_data </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> requests.get(</span><span style="color:#E36209;">url</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">url, </span><span style="color:#E36209;">headers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">headers).json()</span></span>
<span class="line"><span style="color:#24292E;">        total_count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> json_data[</span><span style="color:#032F62;">&#39;data&#39;</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&#39;page&#39;</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&#39;count&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        page_size </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> json_data[</span><span style="color:#032F62;">&#39;data&#39;</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&#39;page&#39;</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&#39;ps&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> total_count </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> page_size:</span></span>
<span class="line"><span style="color:#24292E;">            page_count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">elif</span><span style="color:#24292E;"> total_count </span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> page_size </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            page_count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> total_count </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> page_size</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            page_count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> total_count </span><span style="color:#D73A49;">//</span><span style="color:#24292E;"> page_size </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        url_template </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://space.bilibili.com/&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> mid </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/video?tid=0&amp;page=&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;</span><span style="color:#005CC5;">%d</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&amp;keyword=&amp;order=pubdate&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">range</span><span style="color:#24292E;">(page_count):</span></span>
<span class="line"><span style="color:#24292E;">            page_no </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">            url_list.append(url_template </span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> page_no)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">closed</span><span style="color:#24292E;">(self, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">        爬虫结束关闭selenium窗口</span></span>
<span class="line"><span style="color:#032F62;">        :param spider: </span></span>
<span class="line"><span style="color:#032F62;">        :return: </span></span>
<span class="line"><span style="color:#032F62;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.bro.quit()</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Mysql</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">object</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__enter__</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.connection </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pymysql.connect(</span><span style="color:#E36209;">host</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;127.0.0.1&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">port</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">3306</span><span style="color:#24292E;">, </span><span style="color:#E36209;">user</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">password</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">database</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;python&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.connection</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__exit__</span><span style="color:#24292E;">(self, exc_type, exc_val, exc_tb):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.connection.close()</span></span></code></pre></div><h2 id="下载中间件" tabindex="-1">下载中间件 <a class="header-anchor" href="#下载中间件" aria-label="Permalink to &quot;下载中间件&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># Define here the models for your spider middleware</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6A737D;"># See documentation in:</span></span>
<span class="line"><span style="color:#6A737D;"># https://docs.scrapy.org/en/latest/topics/spider-middleware.html</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> scrapy </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> signals</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># useful for handling different item types with a single interface</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> itemadapter </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> is_item, ItemAdapter</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">KototoSpiderMiddleware</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># Not all methods need to be defined. If a method is not defined,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># scrapy acts as if the spider middleware does not modify the</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># passed objects.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">@</span><span style="color:#79B8FF;">classmethod</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">from_crawler</span><span style="color:#E1E4E8;">(cls, crawler):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># This method is used by Scrapy to create your spiders.</span></span>
<span class="line"><span style="color:#E1E4E8;">        s </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">cls</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        crawler.signals.connect(s.spider_opened, </span><span style="color:#FFAB70;">signal</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">signals.spider_opened)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_spider_input</span><span style="color:#E1E4E8;">(self, response, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># Called for each response that goes through the spider</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># middleware and into the spider.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># Should return None or raise an exception.</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">None</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_spider_output</span><span style="color:#E1E4E8;">(self, response, result, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># Called with the results returned from the Spider, after</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># it has processed the response.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># Must return an iterable of Request, or item objects.</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> result:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">yield</span><span style="color:#E1E4E8;"> i</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_spider_exception</span><span style="color:#E1E4E8;">(self, response, exception, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># Called when a spider or process_spider_input() method</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># (from other spider middleware) raises an exception.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># Should return either None or an iterable of Request or item objects.</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">pass</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_start_requests</span><span style="color:#E1E4E8;">(self, start_requests, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># Called with the start requests of the spider, and works</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># similarly to the process_spider_output() method, except</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># that it doesn’t have a response associated.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># Must return only requests (not items).</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> r </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> start_requests:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">yield</span><span style="color:#E1E4E8;"> r</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">spider_opened</span><span style="color:#E1E4E8;">(self, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        spider.logger.info(</span><span style="color:#9ECBFF;">&#39;Spider opened: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> spider.name)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">KototoDownloaderMiddleware</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_request</span><span style="color:#E1E4E8;">(self, request, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">None</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_response</span><span style="color:#E1E4E8;">(self, request, response, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        篡改列表页的响应数据:</span></span>
<span class="line"><span style="color:#9ECBFF;">            视频列表是通过ajax请求动态加载的,因此要通过selenium去加载这部分数据</span></span>
<span class="line"><span style="color:#9ECBFF;">            并篡改响应内容</span></span>
<span class="line"><span style="color:#9ECBFF;">        :param request: </span></span>
<span class="line"><span style="color:#9ECBFF;">        :param response: </span></span>
<span class="line"><span style="color:#9ECBFF;">        :param spider: </span></span>
<span class="line"><span style="color:#9ECBFF;">        :return: </span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> spider.start_urls</span></span>
<span class="line"><span style="color:#E1E4E8;">        bro </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> spider.bro</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> scrapy.http </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> HtmlResponse</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> time </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> sleep</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> request.url </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> urls:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">            如果是列表页就进行响应篡改操作</span></span>
<span class="line"><span style="color:#9ECBFF;">            &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            bro.get(request.url)</span></span>
<span class="line"><span style="color:#E1E4E8;">            sleep(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">            page_data </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> bro.page_source</span></span>
<span class="line"><span style="color:#E1E4E8;">            new_response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> HtmlResponse(</span><span style="color:#FFAB70;">url</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">request.url, </span><span style="color:#FFAB70;">body</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">page_data, </span><span style="color:#FFAB70;">encoding</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;utf-8&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">request</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">request)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># 返回篡改过的响应对象</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> new_response</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> response</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_exception</span><span style="color:#E1E4E8;">(self, request, exception, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">pass</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#6A737D;"># Define here the models for your spider middleware</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6A737D;"># See documentation in:</span></span>
<span class="line"><span style="color:#6A737D;"># https://docs.scrapy.org/en/latest/topics/spider-middleware.html</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> scrapy </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> signals</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># useful for handling different item types with a single interface</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> itemadapter </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> is_item, ItemAdapter</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">KototoSpiderMiddleware</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># Not all methods need to be defined. If a method is not defined,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># scrapy acts as if the spider middleware does not modify the</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># passed objects.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">@</span><span style="color:#005CC5;">classmethod</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">from_crawler</span><span style="color:#24292E;">(cls, crawler):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># This method is used by Scrapy to create your spiders.</span></span>
<span class="line"><span style="color:#24292E;">        s </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">cls</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        crawler.signals.connect(s.spider_opened, </span><span style="color:#E36209;">signal</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">signals.spider_opened)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_spider_input</span><span style="color:#24292E;">(self, response, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># Called for each response that goes through the spider</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># middleware and into the spider.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># Should return None or raise an exception.</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">None</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_spider_output</span><span style="color:#24292E;">(self, response, result, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># Called with the results returned from the Spider, after</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># it has processed the response.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># Must return an iterable of Request, or item objects.</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> result:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">yield</span><span style="color:#24292E;"> i</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_spider_exception</span><span style="color:#24292E;">(self, response, exception, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># Called when a spider or process_spider_input() method</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># (from other spider middleware) raises an exception.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># Should return either None or an iterable of Request or item objects.</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">pass</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_start_requests</span><span style="color:#24292E;">(self, start_requests, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># Called with the start requests of the spider, and works</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># similarly to the process_spider_output() method, except</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># that it doesn’t have a response associated.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># Must return only requests (not items).</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> r </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> start_requests:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">yield</span><span style="color:#24292E;"> r</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">spider_opened</span><span style="color:#24292E;">(self, spider):</span></span>
<span class="line"><span style="color:#24292E;">        spider.logger.info(</span><span style="color:#032F62;">&#39;Spider opened: </span><span style="color:#005CC5;">%s</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> spider.name)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">KototoDownloaderMiddleware</span><span style="color:#24292E;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_request</span><span style="color:#24292E;">(self, request, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">None</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_response</span><span style="color:#24292E;">(self, request, response, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">        篡改列表页的响应数据:</span></span>
<span class="line"><span style="color:#032F62;">            视频列表是通过ajax请求动态加载的,因此要通过selenium去加载这部分数据</span></span>
<span class="line"><span style="color:#032F62;">            并篡改响应内容</span></span>
<span class="line"><span style="color:#032F62;">        :param request: </span></span>
<span class="line"><span style="color:#032F62;">        :param response: </span></span>
<span class="line"><span style="color:#032F62;">        :param spider: </span></span>
<span class="line"><span style="color:#032F62;">        :return: </span></span>
<span class="line"><span style="color:#032F62;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> spider.start_urls</span></span>
<span class="line"><span style="color:#24292E;">        bro </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> spider.bro</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> scrapy.http </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> HtmlResponse</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> time </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> sleep</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> request.url </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> urls:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">            如果是列表页就进行响应篡改操作</span></span>
<span class="line"><span style="color:#032F62;">            &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">            bro.get(request.url)</span></span>
<span class="line"><span style="color:#24292E;">            sleep(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">            page_data </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> bro.page_source</span></span>
<span class="line"><span style="color:#24292E;">            new_response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> HtmlResponse(</span><span style="color:#E36209;">url</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">request.url, </span><span style="color:#E36209;">body</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">page_data, </span><span style="color:#E36209;">encoding</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">request</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">request)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># 返回篡改过的响应对象</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> new_response</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> response</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_exception</span><span style="color:#24292E;">(self, request, exception, spider):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">pass</span></span></code></pre></div><h2 id="item" tabindex="-1">Item <a class="header-anchor" href="#item" aria-label="Permalink to &quot;Item&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> scrapy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">KototoItem</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">scrapy</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Item</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    video_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#E1E4E8;">    video_url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#E1E4E8;">    audio_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#E1E4E8;">    audio_url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#E1E4E8;">    video_temp_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scrapy.Field()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> scrapy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">KototoItem</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">scrapy</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Item</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    video_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#24292E;">    video_url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#24292E;">    audio_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#24292E;">    audio_url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scrapy.Field()</span></span>
<span class="line"><span style="color:#24292E;">    video_temp_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scrapy.Field()</span></span></code></pre></div><h2 id="pipeline" tabindex="-1">Pipeline <a class="header-anchor" href="#pipeline" aria-label="Permalink to &quot;Pipeline&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> requests</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> os</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">headers </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;User-Agent&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;Referer&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;https://www.bilibili.com&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">KototoPipeline</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">object</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_item</span><span style="color:#E1E4E8;">(self, item, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        video </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> item[</span><span style="color:#9ECBFF;">&#39;video_url&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        audio </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> item[</span><span style="color:#9ECBFF;">&#39;audio_url&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        video_temp_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> item[</span><span style="color:#9ECBFF;">&#39;video_temp_path&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        audio_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> item[</span><span style="color:#9ECBFF;">&#39;audio_path&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        video_data </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> requests.get(</span><span style="color:#FFAB70;">url</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">video, </span><span style="color:#FFAB70;">headers</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">headers).content</span></span>
<span class="line"><span style="color:#E1E4E8;">        audio_data </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> requests.get(</span><span style="color:#FFAB70;">url</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">audio, </span><span style="color:#FFAB70;">headers</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">headers).content</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">open</span><span style="color:#E1E4E8;">(video_temp_path, </span><span style="color:#9ECBFF;">&#39;wb&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> f:</span></span>
<span class="line"><span style="color:#E1E4E8;">            f.write(video_data)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">open</span><span style="color:#E1E4E8;">(audio_path, </span><span style="color:#9ECBFF;">&#39;wb&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> f:</span></span>
<span class="line"><span style="color:#E1E4E8;">            f.write(audio_data)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> item</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MergePipeline</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">object</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    删除临时文件</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_item</span><span style="color:#E1E4E8;">(self, item, spider):</span></span>
<span class="line"><span style="color:#E1E4E8;">        video_temp_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> item[</span><span style="color:#9ECBFF;">&#39;video_temp_path&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        audio_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> item[</span><span style="color:#9ECBFF;">&#39;audio_path&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        video_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> item[</span><span style="color:#9ECBFF;">&#39;video_path&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        cmd </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ffmpeg -y -i &#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> video_temp_path </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39; -i &#39;</span><span style="color:#E1E4E8;"> \\</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> audio_path </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39; -c:v copy -c:a aac -strict experimental &#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> video_path</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(cmd)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># subprocess.Popen(cmd, shell=True)</span></span>
<span class="line"><span style="color:#E1E4E8;">        os.system(cmd)</span></span>
<span class="line"><span style="color:#E1E4E8;">        os.remove(video_temp_path)</span></span>
<span class="line"><span style="color:#E1E4E8;">        os.remove(audio_path)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(video_path, </span><span style="color:#9ECBFF;">&#39;下载完成&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> item</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> requests</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> os</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">headers </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;User-Agent&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;Referer&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;https://www.bilibili.com&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">KototoPipeline</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">object</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_item</span><span style="color:#24292E;">(self, item, spider):</span></span>
<span class="line"><span style="color:#24292E;">        video </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> item[</span><span style="color:#032F62;">&#39;video_url&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        audio </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> item[</span><span style="color:#032F62;">&#39;audio_url&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        video_temp_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> item[</span><span style="color:#032F62;">&#39;video_temp_path&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        audio_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> item[</span><span style="color:#032F62;">&#39;audio_path&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        video_data </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> requests.get(</span><span style="color:#E36209;">url</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">video, </span><span style="color:#E36209;">headers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">headers).content</span></span>
<span class="line"><span style="color:#24292E;">        audio_data </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> requests.get(</span><span style="color:#E36209;">url</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">audio, </span><span style="color:#E36209;">headers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">headers).content</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">open</span><span style="color:#24292E;">(video_temp_path, </span><span style="color:#032F62;">&#39;wb&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> f:</span></span>
<span class="line"><span style="color:#24292E;">            f.write(video_data)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">open</span><span style="color:#24292E;">(audio_path, </span><span style="color:#032F62;">&#39;wb&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> f:</span></span>
<span class="line"><span style="color:#24292E;">            f.write(audio_data)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> item</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MergePipeline</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">object</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">    删除临时文件</span></span>
<span class="line"><span style="color:#032F62;">    &quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_item</span><span style="color:#24292E;">(self, item, spider):</span></span>
<span class="line"><span style="color:#24292E;">        video_temp_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> item[</span><span style="color:#032F62;">&#39;video_temp_path&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        audio_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> item[</span><span style="color:#032F62;">&#39;audio_path&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        video_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> item[</span><span style="color:#032F62;">&#39;video_path&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        cmd </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ffmpeg -y -i &#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> video_temp_path </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39; -i &#39;</span><span style="color:#24292E;"> \\</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> audio_path </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39; -c:v copy -c:a aac -strict experimental &#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> video_path</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(cmd)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># subprocess.Popen(cmd, shell=True)</span></span>
<span class="line"><span style="color:#24292E;">        os.system(cmd)</span></span>
<span class="line"><span style="color:#24292E;">        os.remove(video_temp_path)</span></span>
<span class="line"><span style="color:#24292E;">        os.remove(audio_path)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(video_path, </span><span style="color:#032F62;">&#39;下载完成&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> item</span></span></code></pre></div><h2 id="settings" tabindex="-1">settings <a class="header-anchor" href="#settings" aria-label="Permalink to &quot;settings&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">BOT_NAME</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;kototo&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">SPIDER_MODULES</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;kototo.spiders&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#79B8FF;">NEWSPIDER_MODULE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;kototo.spiders&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">USER_AGENT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">ROBOTSTXT_OBEY</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">DEFAULT_REQUEST_HEADERS</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;Accept&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;Referer&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;https://space.bilibili.com/17485141/video&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;Origin&#39;</span><span style="color:#E1E4E8;">:  </span><span style="color:#9ECBFF;">&#39;https://space.bilibili.com&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#79B8FF;">FILES_STORE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./files&#39;</span></span>
<span class="line"><span style="color:#79B8FF;">DOWNLOADER_MIDDLEWARES</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">&#39;kototo.middlewares.KototoDownloaderMiddleware&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">543</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">ITEM_PIPELINES</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 下载</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">&#39;kototo.pipelines.KototoPipeline&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;"># 合并</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;kototo.pipelines.MergePipeline&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">BOT_NAME</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;kototo&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">SPIDER_MODULES</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;kototo.spiders&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#005CC5;">NEWSPIDER_MODULE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;kototo.spiders&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">USER_AGENT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">ROBOTSTXT_OBEY</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">DEFAULT_REQUEST_HEADERS</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;Accept&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;Referer&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;https://space.bilibili.com/17485141/video&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;Origin&#39;</span><span style="color:#24292E;">:  </span><span style="color:#032F62;">&#39;https://space.bilibili.com&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#005CC5;">FILES_STORE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./files&#39;</span></span>
<span class="line"><span style="color:#005CC5;">DOWNLOADER_MIDDLEWARES</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">&#39;kototo.middlewares.KototoDownloaderMiddleware&#39;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">543</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">ITEM_PIPELINES</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 下载</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">&#39;kototo.pipelines.KototoPipeline&#39;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;"># 合并</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;kototo.pipelines.MergePipeline&#39;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="启动" tabindex="-1">启动 <a class="header-anchor" href="#启动" aria-label="Permalink to &quot;启动&quot;">​</a></h2><ul><li><p>命令启动：<code>scrapy crawl kototo</code></p></li><li><p>配置pycharm启动（推荐）</p><p><img src="https://storyxc.com/images/blog//image-20210503002914982.png" alt="image-20210503002914982"></p></li></ul><h3 id="下载结果" tabindex="-1">下载结果 <a class="header-anchor" href="#下载结果" aria-label="Permalink to &quot;下载结果&quot;">​</a></h3><p><img src="https://storyxc.com/images/blog//image-20210503003351357.png" alt="image-20210503003351357"></p><h3 id="mysql" tabindex="-1">mysql <a class="header-anchor" href="#mysql" aria-label="Permalink to &quot;mysql&quot;">​</a></h3><p><img src="https://storyxc.com/images/blog//image-20210503003551035.png" alt="image-20210503003551035"></p><h2 id="再次尝试下载时" tabindex="-1">再次尝试下载时 <a class="header-anchor" href="#再次尝试下载时" aria-label="Permalink to &quot;再次尝试下载时&quot;">​</a></h2><p><img src="https://storyxc.com/images/blog//image-20210503003617326.png" alt="image-20210503003617326"></p><p>已经爬取过的资源会提示已经下载过，只会处理更新的内容。</p>`,27),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const _=s(l,[["render",t]]);export{u as __pageData,_ as default};
