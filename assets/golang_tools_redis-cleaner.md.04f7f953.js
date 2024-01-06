import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.4a66d6f9.js";const d=JSON.parse('{"title":"Redis-cleaner","description":"","frontmatter":{},"headers":[],"relativePath":"golang/tools/redis-cleaner.md","filePath":"golang/tools/redis-cleaner.md","lastUpdated":1704522520000}'),p={name:"golang/tools/redis-cleaner.md"},o=l(`<h1 id="redis-cleaner" tabindex="-1">Redis-cleaner <a class="header-anchor" href="#redis-cleaner" aria-label="Permalink to &quot;Redis-cleaner&quot;">​</a></h1><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">context</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/redis/go-redis/v9</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	ctx </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> context.</span><span style="color:#79B8FF;">Background</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 创建Redis客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">	client </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> redis.</span><span style="color:#79B8FF;">NewClient</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">redis.Options{</span></span>
<span class="line"><span style="color:#E1E4E8;">		Addr: </span><span style="color:#9ECBFF;">&quot;localhost:6379&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		DB:   </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 定义匹配模式和批量处理大小</span></span>
<span class="line"><span style="color:#E1E4E8;">	matchPattern </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;*&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	batchSize </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 设置游标初始值和删除计数器</span></span>
<span class="line"><span style="color:#E1E4E8;">	startCursor </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">uint64</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	keysDeleted </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">	memSaved </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 扫描Redis中的key</span></span>
<span class="line"><span style="color:#E1E4E8;">		keys, cursor, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#79B8FF;">Scan</span><span style="color:#E1E4E8;">(ctx, startCursor, matchPattern, </span><span style="color:#79B8FF;">int64</span><span style="color:#E1E4E8;">(batchSize)).</span><span style="color:#79B8FF;">Result</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			log.</span><span style="color:#79B8FF;">Fatal</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 检查每个key的过期时间并删除符合条件的键</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> _, key </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> keys {</span></span>
<span class="line"><span style="color:#E1E4E8;">			ttl, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#79B8FF;">TTL</span><span style="color:#E1E4E8;">(ctx, key).</span><span style="color:#79B8FF;">Result</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				log.</span><span style="color:#79B8FF;">Fatal</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// 如果过期时间大于15年，则删除该键</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ttl.</span><span style="color:#79B8FF;">Hours</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">24</span><span style="color:#F97583;">*</span><span style="color:#79B8FF;">365</span><span style="color:#F97583;">*</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				mem, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#79B8FF;">MemoryUsage</span><span style="color:#E1E4E8;">(ctx, key).</span><span style="color:#79B8FF;">Result</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">					log.</span><span style="color:#79B8FF;">Fatal</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">				err </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#79B8FF;">Del</span><span style="color:#E1E4E8;">(ctx, key).</span><span style="color:#79B8FF;">Err</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">					log.</span><span style="color:#79B8FF;">Fatal</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">				memSaved </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">int</span><span style="color:#E1E4E8;">(mem)</span></span>
<span class="line"><span style="color:#E1E4E8;">				keysDeleted</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 如果游标为0，则表示已完成遍历</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> cursor </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		startCursor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cursor</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;已删除 </span><span style="color:#79B8FF;">%d</span><span style="color:#9ECBFF;"> 个过期时间大于10年的键</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, keysDeleted)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;已释放 </span><span style="color:#79B8FF;">%d</span><span style="color:#9ECBFF;"> MB内存</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, memSaved</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">1024</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">1024</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 关闭Redis客户端连接</span></span>
<span class="line"><span style="color:#E1E4E8;">	err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#79B8FF;">Close</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#79B8FF;">Fatal</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">context</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/redis/go-redis/v9</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">log</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	ctx </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> context.</span><span style="color:#005CC5;">Background</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 创建Redis客户端</span></span>
<span class="line"><span style="color:#24292E;">	client </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> redis.</span><span style="color:#005CC5;">NewClient</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">redis.Options{</span></span>
<span class="line"><span style="color:#24292E;">		Addr: </span><span style="color:#032F62;">&quot;localhost:6379&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		DB:   </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 定义匹配模式和批量处理大小</span></span>
<span class="line"><span style="color:#24292E;">	matchPattern </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;*&quot;</span></span>
<span class="line"><span style="color:#24292E;">	batchSize </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 设置游标初始值和删除计数器</span></span>
<span class="line"><span style="color:#24292E;">	startCursor </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">uint64</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	keysDeleted </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">	memSaved </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 扫描Redis中的key</span></span>
<span class="line"><span style="color:#24292E;">		keys, cursor, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> client.</span><span style="color:#005CC5;">Scan</span><span style="color:#24292E;">(ctx, startCursor, matchPattern, </span><span style="color:#005CC5;">int64</span><span style="color:#24292E;">(batchSize)).</span><span style="color:#005CC5;">Result</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			log.</span><span style="color:#005CC5;">Fatal</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 检查每个key的过期时间并删除符合条件的键</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> _, key </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> keys {</span></span>
<span class="line"><span style="color:#24292E;">			ttl, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> client.</span><span style="color:#005CC5;">TTL</span><span style="color:#24292E;">(ctx, key).</span><span style="color:#005CC5;">Result</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				log.</span><span style="color:#005CC5;">Fatal</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// 如果过期时间大于15年，则删除该键</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ttl.</span><span style="color:#005CC5;">Hours</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">24</span><span style="color:#D73A49;">*</span><span style="color:#005CC5;">365</span><span style="color:#D73A49;">*</span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				mem, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> client.</span><span style="color:#005CC5;">MemoryUsage</span><span style="color:#24292E;">(ctx, key).</span><span style="color:#005CC5;">Result</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">					log.</span><span style="color:#005CC5;">Fatal</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">				err </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#005CC5;">Del</span><span style="color:#24292E;">(ctx, key).</span><span style="color:#005CC5;">Err</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">					log.</span><span style="color:#005CC5;">Fatal</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">				memSaved </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">int</span><span style="color:#24292E;">(mem)</span></span>
<span class="line"><span style="color:#24292E;">				keysDeleted</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 如果游标为0，则表示已完成遍历</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> cursor </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		startCursor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cursor</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;已删除 </span><span style="color:#005CC5;">%d</span><span style="color:#032F62;"> 个过期时间大于10年的键</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, keysDeleted)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;已释放 </span><span style="color:#005CC5;">%d</span><span style="color:#032F62;"> MB内存</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, memSaved</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">1024</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">1024</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 关闭Redis客户端连接</span></span>
<span class="line"><span style="color:#24292E;">	err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> client.</span><span style="color:#005CC5;">Close</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		log.</span><span style="color:#005CC5;">Fatal</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,2),t=[o];function e(c,r,E,y,i,F){return n(),a("div",null,t)}const u=s(p,[["render",e]]);export{d as __pageData,u as default};
