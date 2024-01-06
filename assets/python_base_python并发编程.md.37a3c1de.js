import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.4a66d6f9.js";const d=JSON.parse('{"title":"python并发编程","description":"","frontmatter":{},"headers":[],"relativePath":"python/base/python并发编程.md","filePath":"python/base/python并发编程.md","lastUpdated":1704522520000}'),p={name:"python/base/python并发编程.md"},o=l(`<h1 id="python并发编程" tabindex="-1">python并发编程 <a class="header-anchor" href="#python并发编程" aria-label="Permalink to &quot;python并发编程&quot;">​</a></h1><h2 id="python对并发编程的支持" tabindex="-1">python对并发编程的支持 <a class="header-anchor" href="#python对并发编程的支持" aria-label="Permalink to &quot;python对并发编程的支持&quot;">​</a></h2><ul><li><p>多线程：threading，利用CPU运算和IO可以同时执行，让CPU不会干巴巴等待IO完成</p></li><li><p>多进程：multiprocessing，利用多核CPU的能力，真正的并行执行任务</p></li><li><p>异步IO：asyncio，在单线程中利用CPU和IO同时执行的原理，实现函数异步执行</p></li><li><p>使用Lock对资源加锁，防止冲突访问</p></li><li><p>使用Queue实现不同线程、进程之间的数据通信，实现生产者消费者模式</p></li><li><p>使用线程池Pool、进程池Pool，简化线程、进程任务的提交、等待结束、获取结果</p></li><li><p>使用subprocess启动外部程序的进程，并进行输出交互</p></li></ul><h2 id="如何选择多线程-多进程-多协程" tabindex="-1">如何选择多线程/多进程/多协程 <a class="header-anchor" href="#如何选择多线程-多进程-多协程" aria-label="Permalink to &quot;如何选择多线程/多进程/多协程&quot;">​</a></h2><h3 id="什么是cpu密集型、io密集型" tabindex="-1">什么是CPU密集型、IO密集型 <a class="header-anchor" href="#什么是cpu密集型、io密集型" aria-label="Permalink to &quot;什么是CPU密集型、IO密集型&quot;">​</a></h3><p>CPU密集型计算：也叫计算密集型，指I/O很短时间内就完成，CPU需要大量计算和处理，特点是CPU占用率很高，例如解压缩，加密解密，正则匹配等。</p><p>I/O密集型计算：硬盘、内存、网络的读写操作，例如文件处理、网络爬虫、读写数据库等。</p><h3 id="对比" tabindex="-1">对比 <a class="header-anchor" href="#对比" aria-label="Permalink to &quot;对比&quot;">​</a></h3><p>多进程Process（multiprocessing）：</p><ul><li>优点：可以利用多核CPU进行并行运算</li><li>缺点：占用资源多，可启动数目少</li><li>适用于：计算密集型任务，例如解压缩、加解密。。</li></ul><p>多线程Thread（threading）：</p><ul><li><p>一个进程中可以启动多个线程</p></li><li><p>相比进程更轻量级，占用资源更少。但只能单CPU并发执行，不能利用多CPU（GIL，全局解释器锁）</p></li><li><p>相比协程，线程启动数目有限制，占用内存资源，有线程切换的开销</p></li><li><p>适用于：IO密集型任务，同时运行的任务数目要求不高</p></li></ul><p>多协程Coroutine（asyncio）：</p><ul><li><p>一个线程中可以启动多个协程</p></li><li><p>优点：内存开销最小，启动数量最多</p></li><li><p>缺点：支持的库有限（aiohttp vs requests），代码实现较为复杂</p></li><li><p>适用于：I/O密集型任务，需要超多任务运行且有现有库支持的场景</p></li></ul><h2 id="多线程" tabindex="-1">多线程 <a class="header-anchor" href="#多线程" aria-label="Permalink to &quot;多线程&quot;">​</a></h2><h3 id="多线程的两种实现方式" tabindex="-1">多线程的两种实现方式 <a class="header-anchor" href="#多线程的两种实现方式" aria-label="Permalink to &quot;多线程的两种实现方式&quot;">​</a></h3><h4 id="通过threading模块的thread类" tabindex="-1">通过threading模块的Thread类 <a class="header-anchor" href="#通过threading模块的thread类" aria-label="Permalink to &quot;通过threading模块的Thread类&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> threading</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> requests</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> threading</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#F97583;">f</span><span style="color:#9ECBFF;">&#39;https://www.cnblogs.com/#p</span><span style="color:#79B8FF;">{</span><span style="color:#E1E4E8;">i</span><span style="color:#79B8FF;">}</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">range</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">craw</span><span style="color:#E1E4E8;">(url):</span></span>
<span class="line"><span style="color:#E1E4E8;">    r </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> requests.get(url)</span></span>
<span class="line"><span style="color:#E1E4E8;">    time.sleep(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(url, </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;">(r.text))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;__main__&#39;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    start </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> time.time()</span></span>
<span class="line"><span style="color:#E1E4E8;">    t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> threading.Thread(</span><span style="color:#FFAB70;">target</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">craw, </span><span style="color:#FFAB70;">args</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">(urls[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">],))</span></span>
<span class="line"><span style="color:#E1E4E8;">    t.start()</span></span>
<span class="line"><span style="color:#E1E4E8;">    t.join()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">f</span><span style="color:#9ECBFF;">&#39;cost </span><span style="color:#79B8FF;">{</span><span style="color:#E1E4E8;">start </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> time.time()</span><span style="color:#79B8FF;">}</span><span style="color:#9ECBFF;">s&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> threading</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> requests</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> threading</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#D73A49;">f</span><span style="color:#032F62;">&#39;https://www.cnblogs.com/#p</span><span style="color:#005CC5;">{</span><span style="color:#24292E;">i</span><span style="color:#005CC5;">}</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">range</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">50</span><span style="color:#24292E;">)]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">craw</span><span style="color:#24292E;">(url):</span></span>
<span class="line"><span style="color:#24292E;">    r </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> requests.get(url)</span></span>
<span class="line"><span style="color:#24292E;">    time.sleep(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(url, </span><span style="color:#005CC5;">len</span><span style="color:#24292E;">(r.text))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;__main__&#39;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    start </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> time.time()</span></span>
<span class="line"><span style="color:#24292E;">    t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> threading.Thread(</span><span style="color:#E36209;">target</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">craw, </span><span style="color:#E36209;">args</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">(urls[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">],))</span></span>
<span class="line"><span style="color:#24292E;">    t.start()</span></span>
<span class="line"><span style="color:#24292E;">    t.join()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">f</span><span style="color:#032F62;">&#39;cost </span><span style="color:#005CC5;">{</span><span style="color:#24292E;">start </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> time.time()</span><span style="color:#005CC5;">}</span><span style="color:#032F62;">s&#39;</span><span style="color:#24292E;">)</span></span></code></pre></div><h4 id="通过继承thread类" tabindex="-1">通过继承Thread类 <a class="header-anchor" href="#通过继承thread类" aria-label="Permalink to &quot;通过继承Thread类&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> requests</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> threading</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> blog_spider </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> urls</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyThread</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">threading</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__init__</span><span style="color:#E1E4E8;">(self, url):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">().</span><span style="color:#79B8FF;">__init__</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> url</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        r </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> requests.get(</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.url)</span></span>
<span class="line"><span style="color:#E1E4E8;">        time.sleep(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.url, </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;">(r.text))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;__main__&#39;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    start </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> time.time()</span></span>
<span class="line"><span style="color:#E1E4E8;">    t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> MyThread(urls[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"><span style="color:#E1E4E8;">    t.start()</span></span>
<span class="line"><span style="color:#E1E4E8;">    t.join()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(time.time() </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> start)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> requests</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> threading</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> blog_spider </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> urls</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyThread</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">threading</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__init__</span><span style="color:#24292E;">(self, url):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">().</span><span style="color:#005CC5;">__init__</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> url</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        r </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> requests.get(</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.url)</span></span>
<span class="line"><span style="color:#24292E;">        time.sleep(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.url, </span><span style="color:#005CC5;">len</span><span style="color:#24292E;">(r.text))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;__main__&#39;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    start </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> time.time()</span></span>
<span class="line"><span style="color:#24292E;">    t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> MyThread(urls[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">])</span></span>
<span class="line"><span style="color:#24292E;">    t.start()</span></span>
<span class="line"><span style="color:#24292E;">    t.join()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(time.time() </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> start)</span></span></code></pre></div><h3 id="线程同步" tabindex="-1">线程同步 <a class="header-anchor" href="#线程同步" aria-label="Permalink to &quot;线程同步&quot;">​</a></h3><h4 id="使用-thread-对象的-lock-实现" tabindex="-1">使用 Thread 对象的 Lock 实现 <a class="header-anchor" href="#使用-thread-对象的-lock-实现" aria-label="Permalink to &quot;使用 Thread 对象的 Lock 实现&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> threading</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyThread</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">threading</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__init__</span><span style="color:#E1E4E8;">(self, thread_id, name, counter):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">().</span><span style="color:#79B8FF;">__init__</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">name)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> name</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.thread_id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> thread_id</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.counter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> counter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;开启线程: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.name)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 获取锁.用于线程同步</span></span>
<span class="line"><span style="color:#E1E4E8;">        my_lock.acquire()</span></span>
<span class="line"><span style="color:#E1E4E8;">        print_time(</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.name, </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.counter, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        my_lock.release()</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">print_time</span><span style="color:#E1E4E8;">(thread_name, delay, counter):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> counter:</span></span>
<span class="line"><span style="color:#E1E4E8;">        time.sleep(delay)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">f</span><span style="color:#9ECBFF;">&quot;#</span><span style="color:#79B8FF;">{</span><span style="color:#E1E4E8;">thread_name</span><span style="color:#79B8FF;">}</span><span style="color:#9ECBFF;">: </span><span style="color:#79B8FF;">{</span><span style="color:#E1E4E8;">time.ctime(time.time())</span><span style="color:#79B8FF;">}</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        counter </span><span style="color:#F97583;">-=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">my_lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> threading.Lock()</span></span>
<span class="line"><span style="color:#E1E4E8;">threads </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#6A737D;"># 创建新线程</span></span>
<span class="line"><span style="color:#E1E4E8;">thread1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> MyThread(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;Thread-1&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">thread2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> MyThread(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;Thread-2&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">thread1.start()</span></span>
<span class="line"><span style="color:#E1E4E8;">thread2.start()</span></span>
<span class="line"><span style="color:#6A737D;"># 添加到线程列表</span></span>
<span class="line"><span style="color:#E1E4E8;">threads.append(thread1)</span></span>
<span class="line"><span style="color:#E1E4E8;">threads.append(thread2)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> threads:</span></span>
<span class="line"><span style="color:#E1E4E8;">    t.join()</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;退出主线程&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> threading</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyThread</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">threading</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__init__</span><span style="color:#24292E;">(self, thread_id, name, counter):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">().</span><span style="color:#005CC5;">__init__</span><span style="color:#24292E;">(</span><span style="color:#E36209;">name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">name)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> name</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.thread_id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> thread_id</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.counter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> counter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;开启线程: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.name)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 获取锁.用于线程同步</span></span>
<span class="line"><span style="color:#24292E;">        my_lock.acquire()</span></span>
<span class="line"><span style="color:#24292E;">        print_time(</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.name, </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.counter, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        my_lock.release()</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">print_time</span><span style="color:#24292E;">(thread_name, delay, counter):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> counter:</span></span>
<span class="line"><span style="color:#24292E;">        time.sleep(delay)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">f</span><span style="color:#032F62;">&quot;#</span><span style="color:#005CC5;">{</span><span style="color:#24292E;">thread_name</span><span style="color:#005CC5;">}</span><span style="color:#032F62;">: </span><span style="color:#005CC5;">{</span><span style="color:#24292E;">time.ctime(time.time())</span><span style="color:#005CC5;">}</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        counter </span><span style="color:#D73A49;">-=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">my_lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> threading.Lock()</span></span>
<span class="line"><span style="color:#24292E;">threads </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#6A737D;"># 创建新线程</span></span>
<span class="line"><span style="color:#24292E;">thread1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> MyThread(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;Thread-1&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">thread2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> MyThread(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;Thread-2&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">thread1.start()</span></span>
<span class="line"><span style="color:#24292E;">thread2.start()</span></span>
<span class="line"><span style="color:#6A737D;"># 添加到线程列表</span></span>
<span class="line"><span style="color:#24292E;">threads.append(thread1)</span></span>
<span class="line"><span style="color:#24292E;">threads.append(thread2)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> threads:</span></span>
<span class="line"><span style="color:#24292E;">    t.join()</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;退出主线程&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>结果:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">开启线程:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Thread-1</span></span>
<span class="line"><span style="color:#B392F0;">开启线程:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Thread-2</span></span>
<span class="line"><span style="color:#6A737D;">#Thread-1: Mon Apr 12 21:54:42 2021</span></span>
<span class="line"><span style="color:#6A737D;">#Thread-1: Mon Apr 12 21:54:43 2021</span></span>
<span class="line"><span style="color:#6A737D;">#Thread-1: Mon Apr 12 21:54:44 2021</span></span>
<span class="line"><span style="color:#6A737D;">#Thread-2: Mon Apr 12 21:54:46 2021</span></span>
<span class="line"><span style="color:#6A737D;">#Thread-2: Mon Apr 12 21:54:48 2021</span></span>
<span class="line"><span style="color:#6A737D;">#Thread-2: Mon Apr 12 21:54:50 2021</span></span>
<span class="line"><span style="color:#B392F0;">退出主线程</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">开启线程:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Thread-1</span></span>
<span class="line"><span style="color:#6F42C1;">开启线程:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Thread-2</span></span>
<span class="line"><span style="color:#6A737D;">#Thread-1: Mon Apr 12 21:54:42 2021</span></span>
<span class="line"><span style="color:#6A737D;">#Thread-1: Mon Apr 12 21:54:43 2021</span></span>
<span class="line"><span style="color:#6A737D;">#Thread-1: Mon Apr 12 21:54:44 2021</span></span>
<span class="line"><span style="color:#6A737D;">#Thread-2: Mon Apr 12 21:54:46 2021</span></span>
<span class="line"><span style="color:#6A737D;">#Thread-2: Mon Apr 12 21:54:48 2021</span></span>
<span class="line"><span style="color:#6A737D;">#Thread-2: Mon Apr 12 21:54:50 2021</span></span>
<span class="line"><span style="color:#6F42C1;">退出主线程</span></span></code></pre></div><h4 id="lock的使用方式" tabindex="-1">Lock的使用方式 <a class="header-anchor" href="#lock的使用方式" aria-label="Permalink to &quot;Lock的使用方式&quot;">​</a></h4><p>1.try-finally模式</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> threading </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> threading.lock()</span></span>
<span class="line"><span style="color:#E1E4E8;">lock.acquire()</span></span>
<span class="line"><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#do something</span></span>
<span class="line"><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    lock.release()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> threading </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> threading.lock()</span></span>
<span class="line"><span style="color:#24292E;">lock.acquire()</span></span>
<span class="line"><span style="color:#D73A49;">try</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#do something</span></span>
<span class="line"><span style="color:#D73A49;">finally</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    lock.release()</span></span></code></pre></div><ol start="2"><li>with模式</li></ol><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> threading</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> threading.lock()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> lock:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># do something</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> threading</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> threading.lock()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">with</span><span style="color:#24292E;"> lock:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># do something</span></span></code></pre></div><h3 id="生产者消费者模型" tabindex="-1">生产者消费者模型 <a class="header-anchor" href="#生产者消费者模型" aria-label="Permalink to &quot;生产者消费者模型&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> requests</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> bs4 </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> BeautifulSoup</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">urls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#F97583;">f</span><span style="color:#9ECBFF;">&#39;https://www.cnblogs.com/#p</span><span style="color:#79B8FF;">{</span><span style="color:#E1E4E8;">i</span><span style="color:#79B8FF;">}</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">range</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">craw</span><span style="color:#E1E4E8;">(url):</span></span>
<span class="line"><span style="color:#E1E4E8;">    r </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> requests.get(url)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> r.text</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(html):</span></span>
<span class="line"><span style="color:#E1E4E8;">    soup </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> BeautifulSoup(html, </span><span style="color:#9ECBFF;">&#39;html.parser&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    links </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> soup.find_all(</span><span style="color:#9ECBFF;">&#39;a&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">class_</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;post-item-title&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> [(link.get(</span><span style="color:#9ECBFF;">&#39;href&#39;</span><span style="color:#E1E4E8;">), link.get_text()) </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> link </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> links]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> requests</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> bs4 </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> BeautifulSoup</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">urls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#D73A49;">f</span><span style="color:#032F62;">&#39;https://www.cnblogs.com/#p</span><span style="color:#005CC5;">{</span><span style="color:#24292E;">i</span><span style="color:#005CC5;">}</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">range</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">50</span><span style="color:#24292E;">)]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">craw</span><span style="color:#24292E;">(url):</span></span>
<span class="line"><span style="color:#24292E;">    r </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> requests.get(url)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> r.text</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(html):</span></span>
<span class="line"><span style="color:#24292E;">    soup </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> BeautifulSoup(html, </span><span style="color:#032F62;">&#39;html.parser&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    links </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> soup.find_all(</span><span style="color:#032F62;">&#39;a&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">class_</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;post-item-title&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> [(link.get(</span><span style="color:#032F62;">&#39;href&#39;</span><span style="color:#24292E;">), link.get_text()) </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> link </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> links]</span></span></code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> queue</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> threading</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> random</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> blog_spider</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">do_crawl</span><span style="color:#E1E4E8;">(url_queue: queue.Queue, html_queue: queue.Queue):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">True</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> url_queue.get()</span></span>
<span class="line"><span style="color:#E1E4E8;">        html </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> blog_spider.craw(url)</span></span>
<span class="line"><span style="color:#E1E4E8;">        html_queue.put(html)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">do_parse</span><span style="color:#E1E4E8;">(html_queue: queue.Queue, fout):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">True</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        html </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> html_queue.get()</span></span>
<span class="line"><span style="color:#E1E4E8;">        results </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> blog_spider.parse(html)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> results:</span></span>
<span class="line"><span style="color:#E1E4E8;">            fout.write(</span><span style="color:#79B8FF;">str</span><span style="color:#E1E4E8;">(result) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        time.sleep(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;__main__&#39;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    url_queue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> queue.Queue()</span></span>
<span class="line"><span style="color:#E1E4E8;">    html_queue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> queue.Queue()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> url </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> blog_spider.urls:</span></span>
<span class="line"><span style="color:#E1E4E8;">        url_queue.put(url)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">range</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">        t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> threading.Thread(</span><span style="color:#FFAB70;">target</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">do_crawl, </span><span style="color:#FFAB70;">args</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">(url_queue, html_queue), </span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;crawl-</span><span style="color:#79B8FF;">{}</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">.format(i))</span></span>
<span class="line"><span style="color:#E1E4E8;">        t.start()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    fout </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">open</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;results.txt&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;w&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">range</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">        t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> threading.Thread(</span><span style="color:#FFAB70;">target</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">do_parse, </span><span style="color:#FFAB70;">args</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">(html_queue, fout), </span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;parse-</span><span style="color:#79B8FF;">{}</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">.format(i))</span></span>
<span class="line"><span style="color:#E1E4E8;">        t.start()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> queue</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> threading</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> random</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> blog_spider</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">do_crawl</span><span style="color:#24292E;">(url_queue: queue.Queue, html_queue: queue.Queue):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">True</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> url_queue.get()</span></span>
<span class="line"><span style="color:#24292E;">        html </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> blog_spider.craw(url)</span></span>
<span class="line"><span style="color:#24292E;">        html_queue.put(html)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">do_parse</span><span style="color:#24292E;">(html_queue: queue.Queue, fout):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">True</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        html </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> html_queue.get()</span></span>
<span class="line"><span style="color:#24292E;">        results </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> blog_spider.parse(html)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> results:</span></span>
<span class="line"><span style="color:#24292E;">            fout.write(</span><span style="color:#005CC5;">str</span><span style="color:#24292E;">(result) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        time.sleep(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;__main__&#39;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    url_queue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> queue.Queue()</span></span>
<span class="line"><span style="color:#24292E;">    html_queue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> queue.Queue()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> url </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> blog_spider.urls:</span></span>
<span class="line"><span style="color:#24292E;">        url_queue.put(url)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">range</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">        t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> threading.Thread(</span><span style="color:#E36209;">target</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">do_crawl, </span><span style="color:#E36209;">args</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">(url_queue, html_queue), </span><span style="color:#E36209;">name</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;crawl-</span><span style="color:#005CC5;">{}</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">.format(i))</span></span>
<span class="line"><span style="color:#24292E;">        t.start()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    fout </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">open</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;results.txt&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;w&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">range</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">        t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> threading.Thread(</span><span style="color:#E36209;">target</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">do_parse, </span><span style="color:#E36209;">args</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">(html_queue, fout), </span><span style="color:#E36209;">name</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;parse-</span><span style="color:#005CC5;">{}</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">.format(i))</span></span>
<span class="line"><span style="color:#24292E;">        t.start()</span></span></code></pre></div><h4 id="线程优先级队列实现" tabindex="-1">线程优先级队列实现 <a class="header-anchor" href="#线程优先级队列实现" aria-label="Permalink to &quot;线程优先级队列实现&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> queue</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> threading</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">exitFlag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyThread</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">threading</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__init__</span><span style="color:#E1E4E8;">(self, thread_id, name, q):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">().</span><span style="color:#79B8FF;">__init__</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">name)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.threadId </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> thread_id</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> name</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.q </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> q</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(self):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;开启线程: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.name)</span></span>
<span class="line"><span style="color:#E1E4E8;">        process_data(</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.name, </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.q)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;退出线程: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.name)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_data</span><span style="color:#E1E4E8;">(name, q):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">not</span><span style="color:#E1E4E8;"> exitFlag:</span></span>
<span class="line"><span style="color:#E1E4E8;">        queueLock.acquire()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">not</span><span style="color:#E1E4E8;"> workQueue.empty():</span></span>
<span class="line"><span style="color:#E1E4E8;">            data </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> q.get()</span></span>
<span class="line"><span style="color:#E1E4E8;">            queueLock.release()</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">f</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">{</span><span style="color:#E1E4E8;">name</span><span style="color:#79B8FF;">}</span><span style="color:#9ECBFF;"> processing </span><span style="color:#79B8FF;">{</span><span style="color:#E1E4E8;">data</span><span style="color:#79B8FF;">}</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            queueLock.release()</span></span>
<span class="line"><span style="color:#E1E4E8;">        time.sleep(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">threadList </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;Thread-1&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;Thread-2&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;Thread-3&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">queueLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> threading.Lock()</span></span>
<span class="line"><span style="color:#E1E4E8;">nameList </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;ONE&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;TWO&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;THREE&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;FOUR&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;FIVE&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">workQueue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> queue.Queue(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">threads </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">threadId </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> tname </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> threadList:</span></span>
<span class="line"><span style="color:#E1E4E8;">    thread </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> MyThread(threadId, tname, workQueue)</span></span>
<span class="line"><span style="color:#E1E4E8;">    thread.start()</span></span>
<span class="line"><span style="color:#E1E4E8;">    threads.append(thread)</span></span>
<span class="line"><span style="color:#E1E4E8;">    threadId </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">queueLock.acquire()</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> name </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> nameList:</span></span>
<span class="line"><span style="color:#E1E4E8;">    workQueue.put(name)</span></span>
<span class="line"><span style="color:#E1E4E8;">queueLock.release()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">not</span><span style="color:#E1E4E8;"> workQueue.empty():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">pass</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">exitFlag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> threads:</span></span>
<span class="line"><span style="color:#E1E4E8;">    t.join()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;主线程退出&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> queue</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> threading</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">exitFlag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyThread</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">threading</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__init__</span><span style="color:#24292E;">(self, thread_id, name, q):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">().</span><span style="color:#005CC5;">__init__</span><span style="color:#24292E;">(</span><span style="color:#E36209;">name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">name)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.threadId </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> thread_id</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> name</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.q </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> q</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(self):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;开启线程: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.name)</span></span>
<span class="line"><span style="color:#24292E;">        process_data(</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.name, </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.q)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;退出线程: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.name)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_data</span><span style="color:#24292E;">(name, q):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">not</span><span style="color:#24292E;"> exitFlag:</span></span>
<span class="line"><span style="color:#24292E;">        queueLock.acquire()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">not</span><span style="color:#24292E;"> workQueue.empty():</span></span>
<span class="line"><span style="color:#24292E;">            data </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> q.get()</span></span>
<span class="line"><span style="color:#24292E;">            queueLock.release()</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">f</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">{</span><span style="color:#24292E;">name</span><span style="color:#005CC5;">}</span><span style="color:#032F62;"> processing </span><span style="color:#005CC5;">{</span><span style="color:#24292E;">data</span><span style="color:#005CC5;">}</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            queueLock.release()</span></span>
<span class="line"><span style="color:#24292E;">        time.sleep(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">threadList </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;Thread-1&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;Thread-2&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;Thread-3&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">queueLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> threading.Lock()</span></span>
<span class="line"><span style="color:#24292E;">nameList </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;ONE&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;TWO&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;THREE&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;FOUR&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;FIVE&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">workQueue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> queue.Queue(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">threads </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">threadId </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> tname </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> threadList:</span></span>
<span class="line"><span style="color:#24292E;">    thread </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> MyThread(threadId, tname, workQueue)</span></span>
<span class="line"><span style="color:#24292E;">    thread.start()</span></span>
<span class="line"><span style="color:#24292E;">    threads.append(thread)</span></span>
<span class="line"><span style="color:#24292E;">    threadId </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">queueLock.acquire()</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> name </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> nameList:</span></span>
<span class="line"><span style="color:#24292E;">    workQueue.put(name)</span></span>
<span class="line"><span style="color:#24292E;">queueLock.release()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">while</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">not</span><span style="color:#24292E;"> workQueue.empty():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pass</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">exitFlag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> threads:</span></span>
<span class="line"><span style="color:#24292E;">    t.join()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;主线程退出&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>运行结果:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">开启线程:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Thread-1</span></span>
<span class="line"><span style="color:#B392F0;">开启线程:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Thread-2</span></span>
<span class="line"><span style="color:#B392F0;">开启线程:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Thread-3</span></span>
<span class="line"><span style="color:#B392F0;">Thread-1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">processing</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ONE</span></span>
<span class="line"><span style="color:#B392F0;">Thread-2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">processing</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TWO</span></span>
<span class="line"><span style="color:#B392F0;">Thread-3</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">processing</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">THREE</span></span>
<span class="line"><span style="color:#B392F0;">Thread-2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">processing</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">FOUR</span></span>
<span class="line"><span style="color:#B392F0;">Thread-1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">processing</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">FIVE</span></span>
<span class="line"><span style="color:#B392F0;">退出线程:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Thread-2</span></span>
<span class="line"><span style="color:#B392F0;">退出线程:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Thread-1</span></span>
<span class="line"><span style="color:#B392F0;">退出线程:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Thread-3</span></span>
<span class="line"><span style="color:#B392F0;">主线程退出</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">开启线程:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Thread-1</span></span>
<span class="line"><span style="color:#6F42C1;">开启线程:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Thread-2</span></span>
<span class="line"><span style="color:#6F42C1;">开启线程:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Thread-3</span></span>
<span class="line"><span style="color:#6F42C1;">Thread-1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">processing</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ONE</span></span>
<span class="line"><span style="color:#6F42C1;">Thread-2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">processing</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TWO</span></span>
<span class="line"><span style="color:#6F42C1;">Thread-3</span><span style="color:#24292E;"> </span><span style="color:#032F62;">processing</span><span style="color:#24292E;"> </span><span style="color:#032F62;">THREE</span></span>
<span class="line"><span style="color:#6F42C1;">Thread-2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">processing</span><span style="color:#24292E;"> </span><span style="color:#032F62;">FOUR</span></span>
<span class="line"><span style="color:#6F42C1;">Thread-1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">processing</span><span style="color:#24292E;"> </span><span style="color:#032F62;">FIVE</span></span>
<span class="line"><span style="color:#6F42C1;">退出线程:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Thread-2</span></span>
<span class="line"><span style="color:#6F42C1;">退出线程:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Thread-1</span></span>
<span class="line"><span style="color:#6F42C1;">退出线程:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Thread-3</span></span>
<span class="line"><span style="color:#6F42C1;">主线程退出</span></span></code></pre></div><h3 id="多线程线程池threadpoolexecutor" tabindex="-1">多线程线程池ThreadPoolExecutor <a class="header-anchor" href="#多线程线程池threadpoolexecutor" aria-label="Permalink to &quot;多线程线程池ThreadPoolExecutor&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> concurrent.futures </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ThreadPoolExecutor, as_completed</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get_data</span><span style="color:#E1E4E8;">(times):</span></span>
<span class="line"><span style="color:#E1E4E8;">    time.sleep(times)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;get data </span><span style="color:#79B8FF;">{}</span><span style="color:#9ECBFF;"> success&quot;</span><span style="color:#E1E4E8;">.format(times))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">thread_pool </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ThreadPoolExecutor(</span><span style="color:#FFAB70;">max_workers</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">task1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> thread_pool.submit(get_data, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">task2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> thread_pool.submit(get_data, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">datas </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;"># submit后直接返回</span></span>
<span class="line"><span style="color:#E1E4E8;">all_tasks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [thread_pool.submit(get_data, data) </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> data </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> datas]</span></span>
<span class="line"><span style="color:#6A737D;"># as_complete底层是生成器</span></span>
<span class="line"><span style="color:#6A737D;"># for future in as_completed(all_tasks):</span></span>
<span class="line"><span style="color:#6A737D;">#    res = future.result()</span></span>
<span class="line"><span style="color:#6A737D;">#    print(res)</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> data </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> thread_pool.map(get_data, datas):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;get </span><span style="color:#79B8FF;">{}</span><span style="color:#9ECBFF;"> data &quot;</span><span style="color:#E1E4E8;">.format(data))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> concurrent.futures </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ThreadPoolExecutor, as_completed</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get_data</span><span style="color:#24292E;">(times):</span></span>
<span class="line"><span style="color:#24292E;">    time.sleep(times)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;get data </span><span style="color:#005CC5;">{}</span><span style="color:#032F62;"> success&quot;</span><span style="color:#24292E;">.format(times))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">thread_pool </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ThreadPoolExecutor(</span><span style="color:#E36209;">max_workers</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">task1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> thread_pool.submit(get_data, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">task2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> thread_pool.submit(get_data, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">datas </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#6A737D;"># submit后直接返回</span></span>
<span class="line"><span style="color:#24292E;">all_tasks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [thread_pool.submit(get_data, data) </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> data </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> datas]</span></span>
<span class="line"><span style="color:#6A737D;"># as_complete底层是生成器</span></span>
<span class="line"><span style="color:#6A737D;"># for future in as_completed(all_tasks):</span></span>
<span class="line"><span style="color:#6A737D;">#    res = future.result()</span></span>
<span class="line"><span style="color:#6A737D;">#    print(res)</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> data </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> thread_pool.map(get_data, datas):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;get </span><span style="color:#005CC5;">{}</span><span style="color:#032F62;"> data &quot;</span><span style="color:#24292E;">.format(data))</span></span></code></pre></div><h4 id="threadpoolexecutor提交任务的两种方式" tabindex="-1">ThreadPoolExecutor提交任务的两种方式 <a class="header-anchor" href="#threadpoolexecutor提交任务的两种方式" aria-label="Permalink to &quot;ThreadPoolExecutor提交任务的两种方式&quot;">​</a></h4><ul><li>pool.map(func, params):func为处理函数，params为所有待处理的数据，返回值为按顺序返回。<strong>这种方式适合任务数据全部准备好一次提交处理的场景</strong></li><li>future = pool.submit(func,param):func为处理函数，param为待处理的一条数据，返回值为future。<strong>这种方式适合一条条数据提交处理的场景</strong>。处理多个future集合futures时，可以直接遍历，也可以配合<code>as_complete</code>使用，这种方式是按任务完成顺序返回。</li></ul><h2 id="多进程" tabindex="-1">多进程 <a class="header-anchor" href="#多进程" aria-label="Permalink to &quot;多进程&quot;">​</a></h2><p>对于io操作来说，使用多线程</p><p>对于耗cpu的操作，用多进程</p><ul><li>进程的切换代价高于多线程</li></ul><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> concurrent.futures </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ProcessPoolExecutor</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> multiprocessing</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 多进程编程</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get_html</span><span style="color:#E1E4E8;">(n):</span></span>
<span class="line"><span style="color:#E1E4E8;">    time.sleep(n)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> n</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;__main__&#39;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># progress = multiprocessing.Process(target=get_html, args=(2,))</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># print(progress.pid)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># progress.start()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># print(progress.pid)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># progress.join()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># print(&#39;main progress end&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 使用进程池</span></span>
<span class="line"><span style="color:#E1E4E8;">    pool </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> multiprocessing.Pool(multiprocessing.cpu_count())</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># res = pool.apply_async(get_html, args=(3,))</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 不再接受任务</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># pool.close()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 等待所有任务完成</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># pool.join()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># print(res)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># print(res.get())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># imap 按顺序</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># for res in pool.imap(get_html, [1, 5, 3]):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#    print(&quot;{} sleep success&quot;.format(res))</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># imap_unordered 按完成时间</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> res </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> pool.imap_unordered(get_html, [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">]):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">{}</span><span style="color:#9ECBFF;"> sleep success&quot;</span><span style="color:#E1E4E8;">.format(res))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> concurrent.futures </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ProcessPoolExecutor</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> multiprocessing</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 多进程编程</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get_html</span><span style="color:#24292E;">(n):</span></span>
<span class="line"><span style="color:#24292E;">    time.sleep(n)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> n</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;__main__&#39;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># progress = multiprocessing.Process(target=get_html, args=(2,))</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># print(progress.pid)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># progress.start()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># print(progress.pid)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># progress.join()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># print(&#39;main progress end&#39;)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 使用进程池</span></span>
<span class="line"><span style="color:#24292E;">    pool </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> multiprocessing.Pool(multiprocessing.cpu_count())</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># res = pool.apply_async(get_html, args=(3,))</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 不再接受任务</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># pool.close()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 等待所有任务完成</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># pool.join()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># print(res)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># print(res.get())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># imap 按顺序</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># for res in pool.imap(get_html, [1, 5, 3]):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#    print(&quot;{} sleep success&quot;.format(res))</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># imap_unordered 按完成时间</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> res </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> pool.imap_unordered(get_html, [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">]):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">{}</span><span style="color:#032F62;"> sleep success&quot;</span><span style="color:#24292E;">.format(res))</span></span></code></pre></div><h3 id="进程间通信" tabindex="-1">进程间通信 <a class="header-anchor" href="#进程间通信" aria-label="Permalink to &quot;进程间通信&quot;">​</a></h3><ul><li>使用multiprocessing中的Queue 用法和threading的Queue类似</li><li>全局共享变量不适用与进程间通信（进程间的数据是隔离的）</li><li>multiprocessing中的Queue不能用于进程池pool中的进程通信</li><li>pool中的进程间通信需要使用multiprocessing中的Manager实例化后的queue（Manager().Queue())</li><li>使用Pipe管道实现进程间通信 receive，send = Pipe() 只能适用于两个进程间通信</li><li>Manager().dict()等数据结构进行进程间通信</li></ul><p><img src="https://storyxc.com/images/blog/image-20220511013302618.png" alt="image-20220511013302618"></p><h2 id="协程" tabindex="-1">协程 <a class="header-anchor" href="#协程" aria-label="Permalink to &quot;协程&quot;">​</a></h2><p>协程，又称微线程，纤程。英文名Coroutine。是一种用户态的上下文切换技术。协程的作用是在执行函数A时可以随时中断去执行函数B，然后中断函数B继续执行函数A（可以自由切换）。但这一过程并不是函数调用，这一整个过程看似像多线程，然而协程只有一个线程执行。</p><h3 id="协程的优势" tabindex="-1">协程的优势 <a class="header-anchor" href="#协程的优势" aria-label="Permalink to &quot;协程的优势&quot;">​</a></h3><ul><li>效率极高，因为子程序切换不是线程切换，由程序自身控制，没有切换线程的开销，所以与多线程相比，线程的数量越多，协程的性能优势越明显。</li><li>不需要多线程的同步机制，因为只有一个线程，也不存在同时写变量的线程安全问题，在控制共享资源时也不需要加锁，因此执行效率高很多。</li></ul><blockquote><p>协程可以处理IO密集型程序的效率问题，但是CPU密集型不是它的长处，要充分发挥CPU的利用率可以结合多进程+协程</p></blockquote><p>实现协程的方式：</p><ul><li>yield关键字</li><li>asyncio装饰器</li><li>async、await关键字（推荐）</li></ul><h3 id="事件循环" tabindex="-1">事件循环 <a class="header-anchor" href="#事件循环" aria-label="Permalink to &quot;事件循环&quot;">​</a></h3><p>asyncio模块中，每一个进程都有一个事件循环。把一些函数注册到事件循环上，当满足事件发生的时候，调用相应的协程函数</p><blockquote><p>事件循环的作用是管理所有的事件，在整个程序运行过程中不断循环执行，追踪事件发生的顺序将它们放到队列中，当主线程空闲的时候，调用相应的事件处理者处理事件。</p></blockquote><p>伪代码：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">任务列表 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [任务1,任务2,任务3</span><span style="color:#79B8FF;">...</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> true:</span></span>
<span class="line"><span style="color:#E1E4E8;">    可执行的任务列表,已完成的任务列表 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> 检查所有任务,将可执行的和已完成的任务返回</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> 就绪任务 </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> 可执行的任务:</span></span>
<span class="line"><span style="color:#E1E4E8;">        执行就绪任务</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> 已完成的任务 </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> 已完成的任务:</span></span>
<span class="line"><span style="color:#E1E4E8;">        剔除已完成的任务</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    如果任务列表的全部任务都已完成,终止循环</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">任务列表 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [任务1,任务2,任务3</span><span style="color:#005CC5;">...</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">while</span><span style="color:#24292E;"> true:</span></span>
<span class="line"><span style="color:#24292E;">    可执行的任务列表,已完成的任务列表 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> 检查所有任务,将可执行的和已完成的任务返回</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> 就绪任务 </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> 可执行的任务:</span></span>
<span class="line"><span style="color:#24292E;">        执行就绪任务</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> 已完成的任务 </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> 已完成的任务:</span></span>
<span class="line"><span style="color:#24292E;">        剔除已完成的任务</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    如果任务列表的全部任务都已完成,终止循环</span></span></code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 生成或获取一个事件循环</span></span>
<span class="line"><span style="color:#E1E4E8;">loop </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncio.get_event_loop()</span></span>
<span class="line"><span style="color:#6A737D;"># 将任务放到任务列表</span></span>
<span class="line"><span style="color:#E1E4E8;">loop.run_until_complete(任务)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 生成或获取一个事件循环</span></span>
<span class="line"><span style="color:#24292E;">loop </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncio.get_event_loop()</span></span>
<span class="line"><span style="color:#6A737D;"># 将任务放到任务列表</span></span>
<span class="line"><span style="color:#24292E;">loop.run_until_complete(任务)</span></span></code></pre></div><p><img src="https://storyxc.com/images/blog/image-20220511014404071.png" alt="image-20220511014404071"></p><h3 id="协程函数" tabindex="-1">协程函数 <a class="header-anchor" href="#协程函数" aria-label="Permalink to &quot;协程函数&quot;">​</a></h3><p>定义函数时，如果是<code>async def 函数</code>的函数，就是一个协程函数</p><h3 id="协程对象" tabindex="-1">协程对象 <a class="header-anchor" href="#协程对象" aria-label="Permalink to &quot;协程对象&quot;">​</a></h3><p>执行协程函数得到的对象</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>执行协程函数创建协程对象，函数内部代码不会立即执行</p><p>如果想运行协程函数内部代码，必须将协程对象交给事件循环处理</p></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 定义一个协程函数</span></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">func</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;异步编程&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 生成一个事件循环</span></span>
<span class="line"><span style="color:#E1E4E8;">loop </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncio.get_event_loop()</span></span>
<span class="line"><span style="color:#6A737D;"># 得到协程对象</span></span>
<span class="line"><span style="color:#E1E4E8;">res </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> func()</span></span>
<span class="line"><span style="color:#6A737D;"># 将协程对象交给事件循环</span></span>
<span class="line"><span style="color:#E1E4E8;">loop.run_until_complete(res)</span></span>
<span class="line"><span style="color:#6A737D;"># asyncio.run(res)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">res:</span></span>
<span class="line"><span style="color:#E1E4E8;">异步编程</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 定义一个协程函数</span></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">func</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;异步编程&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 生成一个事件循环</span></span>
<span class="line"><span style="color:#24292E;">loop </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncio.get_event_loop()</span></span>
<span class="line"><span style="color:#6A737D;"># 得到协程对象</span></span>
<span class="line"><span style="color:#24292E;">res </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> func()</span></span>
<span class="line"><span style="color:#6A737D;"># 将协程对象交给事件循环</span></span>
<span class="line"><span style="color:#24292E;">loop.run_until_complete(res)</span></span>
<span class="line"><span style="color:#6A737D;"># asyncio.run(res)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">res:</span></span>
<span class="line"><span style="color:#24292E;">异步编程</span></span></code></pre></div><p>如果不把协程对象放入事件循环</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 定义一个协程函数</span></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">func</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;异步编程&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 生成一个事件循环</span></span>
<span class="line"><span style="color:#E1E4E8;">loop </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncio.get_event_loop()</span></span>
<span class="line"><span style="color:#6A737D;"># 得到协程对象</span></span>
<span class="line"><span style="color:#E1E4E8;">res </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> func()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">res:</span></span>
<span class="line"><span style="color:#E1E4E8;">sys:</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">RuntimeWarning</span><span style="color:#E1E4E8;">: coroutine </span><span style="color:#9ECBFF;">&#39;func&#39;</span><span style="color:#E1E4E8;"> was never awaited</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 定义一个协程函数</span></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">func</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;异步编程&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 生成一个事件循环</span></span>
<span class="line"><span style="color:#24292E;">loop </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncio.get_event_loop()</span></span>
<span class="line"><span style="color:#6A737D;"># 得到协程对象</span></span>
<span class="line"><span style="color:#24292E;">res </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> func()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">res:</span></span>
<span class="line"><span style="color:#24292E;">sys:</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">RuntimeWarning</span><span style="color:#24292E;">: coroutine </span><span style="color:#032F62;">&#39;func&#39;</span><span style="color:#24292E;"> was never awaited</span></span></code></pre></div><h2 id="异步io" tabindex="-1">异步IO <a class="header-anchor" href="#异步io" aria-label="Permalink to &quot;异步IO&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> asyncio</span></span>
<span class="line"><span style="color:#6A737D;"># 获取事件循环</span></span>
<span class="line"><span style="color:#E1E4E8;">loop </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncio.get_event_loop()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 定义协程函数</span></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hello</span><span style="color:#E1E4E8;">(count):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">f</span><span style="color:#9ECBFF;">&quot;Hello World! </span><span style="color:#79B8FF;">{</span><span style="color:#E1E4E8;">count</span><span style="color:#79B8FF;">}</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> asyncio.sleep(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建task列表</span></span>
<span class="line"><span style="color:#E1E4E8;">tasks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [loop.create_task(hello(count)) </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> count </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">range</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"><span style="color:#6A737D;"># 执行事件列表</span></span>
<span class="line"><span style="color:#E1E4E8;">loop.run_until_complete(asyncio.wait(tasks))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> asyncio</span></span>
<span class="line"><span style="color:#6A737D;"># 获取事件循环</span></span>
<span class="line"><span style="color:#24292E;">loop </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncio.get_event_loop()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 定义协程函数</span></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hello</span><span style="color:#24292E;">(count):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">f</span><span style="color:#032F62;">&quot;Hello World! </span><span style="color:#005CC5;">{</span><span style="color:#24292E;">count</span><span style="color:#005CC5;">}</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> asyncio.sleep(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建task列表</span></span>
<span class="line"><span style="color:#24292E;">tasks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [loop.create_task(hello(count)) </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> count </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">range</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#6A737D;"># 执行事件列表</span></span>
<span class="line"><span style="color:#24292E;">loop.run_until_complete(asyncio.wait(tasks))</span></span></code></pre></div><h3 id="异步io爬虫" tabindex="-1">异步IO爬虫 <a class="header-anchor" href="#异步io爬虫" aria-label="Permalink to &quot;异步IO爬虫&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> asyncio</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> aiohttp</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> blog_spider</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">async_craw</span><span style="color:#E1E4E8;">(url):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;开始爬取：&#39;</span><span style="color:#E1E4E8;">, url)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> aiohttp.ClientSession() </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> session:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> session.get(url) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> response:</span></span>
<span class="line"><span style="color:#E1E4E8;">            result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> response.text()</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;爬取结束：&#39;</span><span style="color:#E1E4E8;">, url, </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;">(result))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">loop </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncio.get_event_loop()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">tasks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [loop.create_task(async_craw(url)) </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> url </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> blog_spider.urls]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">start </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> time.time()</span></span>
<span class="line"><span style="color:#E1E4E8;">loop.run_until_complete(asyncio.wait(tasks))</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;耗时：&#39;</span><span style="color:#E1E4E8;">, time.time() </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> start)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">--</span><span style="color:#F97583;">-</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> asyncio</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> aiohttp</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> blog_spider</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">async_craw</span><span style="color:#24292E;">(url):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;开始爬取：&#39;</span><span style="color:#24292E;">, url)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> aiohttp.ClientSession() </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> session:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> session.get(url) </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> response:</span></span>
<span class="line"><span style="color:#24292E;">            result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> response.text()</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;爬取结束：&#39;</span><span style="color:#24292E;">, url, </span><span style="color:#005CC5;">len</span><span style="color:#24292E;">(result))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">loop </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncio.get_event_loop()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">tasks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [loop.create_task(async_craw(url)) </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> url </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> blog_spider.urls]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">start </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> time.time()</span></span>
<span class="line"><span style="color:#24292E;">loop.run_until_complete(asyncio.wait(tasks))</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;耗时：&#39;</span><span style="color:#24292E;">, time.time() </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> start)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">--</span><span style="color:#D73A49;">-</span></span></code></pre></div><h3 id="使用信号量控制异步爬虫并发度" tabindex="-1">使用信号量控制异步爬虫并发度 <a class="header-anchor" href="#使用信号量控制异步爬虫并发度" aria-label="Permalink to &quot;使用信号量控制异步爬虫并发度&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sem </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncio.Semaphore(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> sem:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># work with shared resource</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">----------------------------------</span><span style="color:#F97583;">-</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">sem </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncio.Semaphore(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> sem.acquire()</span></span>
<span class="line"><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># work with shared resource</span></span>
<span class="line"><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    sem.release()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sem </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncio.Semaphore(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> sem:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># work with shared resource</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">----------------------------------</span><span style="color:#D73A49;">-</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">sem </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncio.Semaphore(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">await</span><span style="color:#24292E;"> sem.acquire()</span></span>
<span class="line"><span style="color:#D73A49;">try</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># work with shared resource</span></span>
<span class="line"><span style="color:#D73A49;">finally</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    sem.release()</span></span></code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> asyncio</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> aiohttp</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> blog_spider</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">sem </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncio.Semaphore(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">async_craw</span><span style="color:#E1E4E8;">(url):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;开始爬取：&#39;</span><span style="color:#E1E4E8;">, url)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> sem:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> aiohttp.ClientSession() </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> session:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> session.get(url) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> response:</span></span>
<span class="line"><span style="color:#E1E4E8;">                result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> response.text()</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;爬取结束：&#39;</span><span style="color:#E1E4E8;">, url, </span><span style="color:#79B8FF;">len</span><span style="color:#E1E4E8;">(result))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">loop </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncio.get_event_loop()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">tasks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [loop.create_task(async_craw(url)) </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> url </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> blog_spider.urls]</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"><span style="color:#E1E4E8;">start </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> time.time()</span></span>
<span class="line"><span style="color:#E1E4E8;">loop.run_until_complete(asyncio.wait(tasks))</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;耗时：&#39;</span><span style="color:#E1E4E8;">, time.time() </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> start)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> asyncio</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> aiohttp</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> blog_spider</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">sem </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncio.Semaphore(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">async_craw</span><span style="color:#24292E;">(url):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;开始爬取：&#39;</span><span style="color:#24292E;">, url)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> sem:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> aiohttp.ClientSession() </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> session:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> session.get(url) </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> response:</span></span>
<span class="line"><span style="color:#24292E;">                result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> response.text()</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;爬取结束：&#39;</span><span style="color:#24292E;">, url, </span><span style="color:#005CC5;">len</span><span style="color:#24292E;">(result))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">loop </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncio.get_event_loop()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">tasks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [loop.create_task(async_craw(url)) </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> url </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> blog_spider.urls]</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"><span style="color:#24292E;">start </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> time.time()</span></span>
<span class="line"><span style="color:#24292E;">loop.run_until_complete(asyncio.wait(tasks))</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;耗时：&#39;</span><span style="color:#24292E;">, time.time() </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> start)</span></span></code></pre></div><h3 id="python3-7后的新语法" tabindex="-1">python3.7后的新语法 <a class="header-anchor" href="#python3-7后的新语法" aria-label="Permalink to &quot;python3.7后的新语法&quot;">​</a></h3><p>使用<code>asyncio.run()</code>代替原来创建事件循环，使用事件循环执行函数的操作</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> asyncio</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> blog_spider</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># async def 定义协程函数</span></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">async_craw</span><span style="color:#E1E4E8;">(url):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;开始爬取：&#39;</span><span style="color:#E1E4E8;">, url)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 触发io操作，调用其他协程</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> asyncio.sleep(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;爬取完成：&#39;</span><span style="color:#E1E4E8;">, url)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 创建协程列表</span></span>
<span class="line"><span style="color:#E1E4E8;">    tasks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [async_craw(url) </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> url </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> blog_spider.urls]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># asyncio.gather(*task)表示协同执行tasks列表里的所有协程</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> asyncio.gather(</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">tasks)</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#E1E4E8;">asyncio.run(main())</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> asyncio</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> blog_spider</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># async def 定义协程函数</span></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">async_craw</span><span style="color:#24292E;">(url):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;开始爬取：&#39;</span><span style="color:#24292E;">, url)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 触发io操作，调用其他协程</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> asyncio.sleep(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;爬取完成：&#39;</span><span style="color:#24292E;">, url)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 创建协程列表</span></span>
<span class="line"><span style="color:#24292E;">    tasks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [async_craw(url) </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> url </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> blog_spider.urls]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># asyncio.gather(*task)表示协同执行tasks列表里的所有协程</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> asyncio.gather(</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">tasks)</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#24292E;">asyncio.run(main())</span></span></code></pre></div><h3 id="asyncio-wait和asyncio-gather异同" tabindex="-1">asyncio.wait和asyncio.gather异同 <a class="header-anchor" href="#asyncio-wait和asyncio-gather异同" aria-label="Permalink to &quot;asyncio.wait和asyncio.gather异同&quot;">​</a></h3><ul><li><strong>相同</strong>：从功能上看，<code>asyncio.wait</code> 和 <code>asyncio.gather</code> 实现的效果是相同的，都是把所有 Task 任务结果收集起来。</li><li><strong>不同</strong>：<code>asyncio.wait</code> 会返回两个值：<code>done</code> 和 <code>pending</code>，<code>done</code> 为已完成的协程 <code>Task</code>，<code>pending</code> 为超时未完成的协程 <code>Task</code>，需通过 <code>future.result</code> 调用 <code>Task</code> 的 <code>result</code>；而<code>asyncio.gather</code> 返回的是所有已完成 <code>Task</code> 的 <code>result</code>，不需要再进行调用或其他操作，就可以得到全部结果。</li></ul><h2 id="await关键字" tabindex="-1">await关键字 <a class="header-anchor" href="#await关键字" aria-label="Permalink to &quot;await关键字&quot;">​</a></h2><p>await + 可等待的对象（协程对象、Future对象、Task对象 -&gt; io等待）</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">func</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;异步编程&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> asyncio.sleep(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;结束&quot;</span><span style="color:#E1E4E8;">,response)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">asyncio.run(func())</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">func</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;异步编程&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> asyncio.sleep(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;结束&quot;</span><span style="color:#24292E;">,response)</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">asyncio.run(func())</span></span></code></pre></div><p>示例:</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">others</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;start&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> asyncio.sleep(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;end&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;返回值&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">func</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;执行协程函数内部代码&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 遇到IO操作挂起当前协程,等到IO完成后继续运行,当前协程挂起时,事件循环可以执行其他协程</span></span>
<span class="line"><span style="color:#E1E4E8;">    response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> others()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">f</span><span style="color:#9ECBFF;">&#39;IO的结果是:</span><span style="color:#79B8FF;">{</span><span style="color:#E1E4E8;">response</span><span style="color:#79B8FF;">}</span><span style="color:#9ECBFF;"> &#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">asyncio.run(func())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">res:</span></span>
<span class="line"><span style="color:#E1E4E8;">执行协程函数内部代码</span></span>
<span class="line"><span style="color:#E1E4E8;">start</span></span>
<span class="line"><span style="color:#E1E4E8;">end</span></span>
<span class="line"><span style="color:#E1E4E8;">IO的结果是:返回值</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">others</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;start&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> asyncio.sleep(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;end&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;返回值&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">func</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;执行协程函数内部代码&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 遇到IO操作挂起当前协程,等到IO完成后继续运行,当前协程挂起时,事件循环可以执行其他协程</span></span>
<span class="line"><span style="color:#24292E;">    response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> others()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">f</span><span style="color:#032F62;">&#39;IO的结果是:</span><span style="color:#005CC5;">{</span><span style="color:#24292E;">response</span><span style="color:#005CC5;">}</span><span style="color:#032F62;"> &#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">asyncio.run(func())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">res:</span></span>
<span class="line"><span style="color:#24292E;">执行协程函数内部代码</span></span>
<span class="line"><span style="color:#24292E;">start</span></span>
<span class="line"><span style="color:#24292E;">end</span></span>
<span class="line"><span style="color:#24292E;">IO的结果是:返回值</span></span></code></pre></div><h2 id="task对象" tabindex="-1">Task对象 <a class="header-anchor" href="#task对象" aria-label="Permalink to &quot;Task对象&quot;">​</a></h2><p>Tasks用于并发调度协程，是对协程对象的一种封装，其中包含了任务的各个状态。通过<code>asyncio.create_task()</code>函数创建Task对象，这样可以让协程加入事件循环中等待调度执行。还可以使用低层级的<code>loop.create_task()</code>或<code>asyncio.ensure_future()</code>函数。不建议手动实例化Task对象。</p><p>示例1：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">func</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> asyncio.sleep(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;返回值&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;main函数开始&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 创建task对象,将当前执行func函数的任务添加到事件循环</span></span>
<span class="line"><span style="color:#E1E4E8;">    task1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncio.create_task(func())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    task2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncio.create_task(func())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;main函数结束&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 当执行某协程遇到IO操作,会自动切换执行其他任务</span></span>
<span class="line"><span style="color:#E1E4E8;">    res1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> task1</span></span>
<span class="line"><span style="color:#E1E4E8;">    res2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> task2</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(res1, res2)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">asyncio.run(main())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">res:</span></span>
<span class="line"><span style="color:#E1E4E8;">main函数开始</span></span>
<span class="line"><span style="color:#E1E4E8;">main函数结束</span></span>
<span class="line"><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">返回值 返回值</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">func</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> asyncio.sleep(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;返回值&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;main函数开始&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 创建task对象,将当前执行func函数的任务添加到事件循环</span></span>
<span class="line"><span style="color:#24292E;">    task1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncio.create_task(func())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    task2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncio.create_task(func())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;main函数结束&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 当执行某协程遇到IO操作,会自动切换执行其他任务</span></span>
<span class="line"><span style="color:#24292E;">    res1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> task1</span></span>
<span class="line"><span style="color:#24292E;">    res2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> task2</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(res1, res2)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">asyncio.run(main())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">res:</span></span>
<span class="line"><span style="color:#24292E;">main函数开始</span></span>
<span class="line"><span style="color:#24292E;">main函数结束</span></span>
<span class="line"><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">返回值 返回值</span></span></code></pre></div><p>示例2：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">func</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> asyncio.sleep(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;返回值&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;main函数开始&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    task_list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">       asyncio.create_task(func()),</span></span>
<span class="line"><span style="color:#E1E4E8;">       asyncio.create_task(func())</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;main函数结束&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    done,pending </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> asyncio.wait(task_list,</span><span style="color:#FFAB70;">timeout</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">None</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(done)</span></span>
<span class="line"><span style="color:#E1E4E8;">asyncio.run(main())</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> asyncio</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">func</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> asyncio.sleep(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;返回值&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;main函数开始&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    task_list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">       asyncio.create_task(func()),</span></span>
<span class="line"><span style="color:#24292E;">       asyncio.create_task(func())</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;main函数结束&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    done,pending </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> asyncio.wait(task_list,</span><span style="color:#E36209;">timeout</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">None</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(done)</span></span>
<span class="line"><span style="color:#24292E;">asyncio.run(main())</span></span></code></pre></div><h2 id="asyncio-future对象" tabindex="-1">asyncio.Future对象 <a class="header-anchor" href="#asyncio-future对象" aria-label="Permalink to &quot;asyncio.Future对象&quot;">​</a></h2><p>Task继承了Future,Task对象内部await的结果的处理基于Future对象</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    loop </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncio.get_running_loop()</span></span>
<span class="line"><span style="color:#E1E4E8;">    _future </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> loop.create_future()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> _future</span></span>
<span class="line"><span style="color:#E1E4E8;">asyncio.run(main())</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    loop </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncio.get_running_loop()</span></span>
<span class="line"><span style="color:#24292E;">    _future </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> loop.create_future()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> _future</span></span>
<span class="line"><span style="color:#24292E;">asyncio.run(main())</span></span></code></pre></div><h2 id="concurrent-futures-future对象" tabindex="-1">concurrent.futures.Future对象 <a class="header-anchor" href="#concurrent-futures-future对象" aria-label="Permalink to &quot;concurrent.futures.Future对象&quot;">​</a></h2><p>使用线程池/进程池实现异步操作时用到的对象</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> concurrent.futures </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Future</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> concurrent.futures.thread </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ThreadPoolExecutor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">func</span><span style="color:#E1E4E8;">(value):</span></span>
<span class="line"><span style="color:#E1E4E8;">    time.sleep(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(value)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">pool </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ThreadPoolExecutory(</span><span style="color:#FFAB70;">max_workers</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">range</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fut </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> pool.submit(func,</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(fut)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> concurrent.futures </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Future</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> concurrent.futures.thread </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ThreadPoolExecutor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">func</span><span style="color:#24292E;">(value):</span></span>
<span class="line"><span style="color:#24292E;">    time.sleep(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(value)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">pool </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ThreadPoolExecutory(</span><span style="color:#E36209;">max_workers</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">range</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	fut </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pool.submit(func,</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(fut)</span></span></code></pre></div>`,100),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const h=s(p,[["render",c]]);export{d as __pageData,h as default};
