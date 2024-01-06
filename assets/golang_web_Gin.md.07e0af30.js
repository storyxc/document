import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.4a66d6f9.js";const q=JSON.parse('{"title":"Gin","description":"","frontmatter":{},"headers":[],"relativePath":"golang/web/Gin.md","filePath":"golang/web/Gin.md","lastUpdated":1704522520000}'),p={name:"golang/web/Gin.md"},o=l(`<h1 id="gin" tabindex="-1">Gin <a class="header-anchor" href="#gin" aria-label="Permalink to &quot;Gin&quot;">​</a></h1><blockquote><p>Gin is a HTTP web framework written in Go (Golang). It features a Martini-like API with much better performance -- up to 40 times faster. If you need smashing performance, get yourself some Gin.</p></blockquote><h2 id="gin安装和基本使用" tabindex="-1">Gin安装和基本使用 <a class="header-anchor" href="#gin安装和基本使用" aria-label="Permalink to &quot;Gin安装和基本使用&quot;">​</a></h2><p><code>go get -u github.com/gin-gonic/gin</code></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/gin-gonic/gin</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/thinkerou/favicon</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建服务</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gin.</span><span style="color:#79B8FF;">Default</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">Use</span><span style="color:#E1E4E8;">(favicon.</span><span style="color:#79B8FF;">New</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./favicon.ico&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">GET</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		c.</span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;Hello World!&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">POST</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/post&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		c.</span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">, gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;message&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;POST Data&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	_ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ginServer.</span><span style="color:#79B8FF;">Run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;:8080&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/gin-gonic/gin</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/thinkerou/favicon</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建服务</span></span>
<span class="line"><span style="color:#24292E;">	ginServer </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> gin.</span><span style="color:#005CC5;">Default</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">Use</span><span style="color:#24292E;">(favicon.</span><span style="color:#005CC5;">New</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./favicon.ico&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">GET</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(c </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">		c.</span><span style="color:#005CC5;">String</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">200</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;Hello World!&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">POST</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/post&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(c </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">		c.</span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">200</span><span style="color:#24292E;">, gin.H{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;message&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;POST Data&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	_ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ginServer.</span><span style="color:#005CC5;">Run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;:8080&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li><p><code>curl -X GET http://localhost:8080</code></p><ul><li><code>Hello World!</code></li></ul></li><li><p><code>curl -X POST http://localhost:8080/post</code></p><ul><li><code>{&quot;message&quot;:&quot;POST Data&quot;}</code></li></ul></li></ul><h2 id="返回一个静态页" tabindex="-1">返回一个静态页 <a class="header-anchor" href="#返回一个静态页" aria-label="Permalink to &quot;返回一个静态页&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/gin-gonic/gin</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/thinkerou/favicon</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建服务</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gin.</span><span style="color:#79B8FF;">Default</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置favicon</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">Use</span><span style="color:#E1E4E8;">(favicon.</span><span style="color:#79B8FF;">New</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./favicon.ico&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 加载静态页</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">LoadHTMLGlob</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;templates/*&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 响应页面给前端</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">GET</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/index&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(context </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		context.</span><span style="color:#79B8FF;">HTML</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;index.html&quot;</span><span style="color:#E1E4E8;">, gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;title&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Main website&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"><span style="color:#E1E4E8;">	_ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ginServer.</span><span style="color:#79B8FF;">Run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;:8080&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/gin-gonic/gin</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/thinkerou/favicon</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建服务</span></span>
<span class="line"><span style="color:#24292E;">	ginServer </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> gin.</span><span style="color:#005CC5;">Default</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置favicon</span></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">Use</span><span style="color:#24292E;">(favicon.</span><span style="color:#005CC5;">New</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./favicon.ico&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 加载静态页</span></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">LoadHTMLGlob</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;templates/*&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 响应页面给前端</span></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">GET</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/index&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(context </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">		context.</span><span style="color:#005CC5;">HTML</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">200</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;index.html&quot;</span><span style="color:#24292E;">, gin.H{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;title&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Main website&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"><span style="color:#24292E;">	_ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ginServer.</span><span style="color:#005CC5;">Run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;:8080&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>访问<code>localhost:8080</code>或<code>localhost:8080/index</code></p><p><img src="https://storyxc.com/images/blog/image-20230701204904138.png" alt="静态页"></p><h2 id="加载资源文件" tabindex="-1">加载资源文件 <a class="header-anchor" href="#加载资源文件" aria-label="Permalink to &quot;加载资源文件&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/gin-gonic/gin</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/thinkerou/favicon</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建服务</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gin.</span><span style="color:#79B8FF;">Default</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置favicon</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">Use</span><span style="color:#E1E4E8;">(favicon.</span><span style="color:#79B8FF;">New</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./favicon.ico&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 加载静态页</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">LoadHTMLGlob</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;templates/*&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 响应页面给前端</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">GET</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/index&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(context </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		context.</span><span style="color:#79B8FF;">HTML</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;index.html&quot;</span><span style="color:#E1E4E8;">, gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;title&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Main website&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"><span style="color:#E1E4E8;">	_ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ginServer.</span><span style="color:#79B8FF;">Run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;:8080&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/gin-gonic/gin</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/thinkerou/favicon</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建服务</span></span>
<span class="line"><span style="color:#24292E;">	ginServer </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> gin.</span><span style="color:#005CC5;">Default</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置favicon</span></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">Use</span><span style="color:#24292E;">(favicon.</span><span style="color:#005CC5;">New</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./favicon.ico&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 加载静态页</span></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">LoadHTMLGlob</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;templates/*&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 响应页面给前端</span></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">GET</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/index&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(context </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">		context.</span><span style="color:#005CC5;">HTML</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">200</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;index.html&quot;</span><span style="color:#24292E;">, gin.H{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;title&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Main website&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"><span style="color:#24292E;">	_ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ginServer.</span><span style="color:#005CC5;">Run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;:8080&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><img src="https://storyxc.com/images/blog/image-20230701204606034.png" alt="加载资源文件"></p><h2 id="restful-api" tabindex="-1">Restful API <a class="header-anchor" href="#restful-api" aria-label="Permalink to &quot;Restful API&quot;">​</a></h2><h3 id="query参数" tabindex="-1">Query参数 <a class="header-anchor" href="#query参数" aria-label="Permalink to &quot;Query参数&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/gin-gonic/gin</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">net/http</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gin.</span><span style="color:#79B8FF;">Default</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">GET</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/user/info&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(context </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		userId </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> context.</span><span style="color:#79B8FF;">Query</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;userId&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		userName </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> context.</span><span style="color:#79B8FF;">Query</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;userName&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		context.</span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">(http.StatusOK, gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;userId&quot;</span><span style="color:#E1E4E8;">:   userId,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;userName&quot;</span><span style="color:#E1E4E8;">: userName,</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	_ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ginServer.</span><span style="color:#79B8FF;">Run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;:8080&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/gin-gonic/gin</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">net/http</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	ginServer </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> gin.</span><span style="color:#005CC5;">Default</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">GET</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/user/info&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(context </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">		userId </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> context.</span><span style="color:#005CC5;">Query</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;userId&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		userName </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> context.</span><span style="color:#005CC5;">Query</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;userName&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		context.</span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">(http.StatusOK, gin.H{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;userId&quot;</span><span style="color:#24292E;">:   userId,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;userName&quot;</span><span style="color:#24292E;">: userName,</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	_ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ginServer.</span><span style="color:#005CC5;">Run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;:8080&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li><code>curl -X GET &#39;http://localhost:8080/user/info?userId=123&amp;userName=小明&#39;</code><ul><li><code>{&quot;userId&quot;:&quot;123&quot;,&quot;userName&quot;:&quot;小明&quot;}</code></li></ul></li></ul><h3 id="body参数" tabindex="-1">Body参数 <a class="header-anchor" href="#body参数" aria-label="Permalink to &quot;Body参数&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">encoding/json</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/gin-gonic/gin</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">net/http</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gin.</span><span style="color:#79B8FF;">Default</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">POST</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/user&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(context </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// request body []byte, err</span></span>
<span class="line"><span style="color:#E1E4E8;">		body, _ </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> context.</span><span style="color:#79B8FF;">GetRawData</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 包装为map类型</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> m </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"><span style="color:#E1E4E8;">		_ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> json.</span><span style="color:#79B8FF;">Unmarshal</span><span style="color:#E1E4E8;">(body, </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">m)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		context.</span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">(http.StatusOK, m)</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	_ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ginServer.</span><span style="color:#79B8FF;">Run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;:8080&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">encoding/json</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/gin-gonic/gin</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">net/http</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	ginServer </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> gin.</span><span style="color:#005CC5;">Default</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">POST</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/user&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(context </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// request body []byte, err</span></span>
<span class="line"><span style="color:#24292E;">		body, _ </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> context.</span><span style="color:#005CC5;">GetRawData</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 包装为map类型</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> m </span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">interface</span><span style="color:#24292E;">{}</span></span>
<span class="line"><span style="color:#24292E;">		_ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> json.</span><span style="color:#005CC5;">Unmarshal</span><span style="color:#24292E;">(body, </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">m)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		context.</span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">(http.StatusOK, m)</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	_ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ginServer.</span><span style="color:#005CC5;">Run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;:8080&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li><code>curl -X POST &#39;http://127.0.0.1:8080/user&#39; --header &#39;Content-Type: application/json&#39; --data &#39;{&quot;userName&quot;: &quot;张三&quot;}&#39;</code><ul><li><code>{&quot;userName&quot;:&quot;张三&quot;}</code></li></ul></li></ul><h3 id="表单参数" tabindex="-1">表单参数 <a class="header-anchor" href="#表单参数" aria-label="Permalink to &quot;表单参数&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;!</span><span style="color:#85E89D;">DOCTYPE</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">charset</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;Title&lt;/</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">link</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">rel</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;stylesheet&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">href</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;/static/base.css&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;Hello World!&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">form</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">action</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;/user/add&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">method</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;post&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;username&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;password&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;password&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;submit&quot;</span><span style="color:#E1E4E8;">&gt;提交&lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">form</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">src</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;/static/base.js&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;!</span><span style="color:#22863A;">DOCTYPE</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">charset</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;Title&lt;/</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">link</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">rel</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;stylesheet&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">href</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;/static/base.css&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;Hello World!&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">form</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">action</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;/user/add&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">method</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;post&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;username&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;password&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;password&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;submit&quot;</span><span style="color:#24292E;">&gt;提交&lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">form</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">src</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;/static/base.js&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/gin-gonic/gin</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">net/http</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gin.</span><span style="color:#79B8FF;">Default</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">LoadHTMLGlob</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;templates/*&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">GET</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/index&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(context </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		context.</span><span style="color:#79B8FF;">HTML</span><span style="color:#E1E4E8;">(http.StatusOK, </span><span style="color:#9ECBFF;">&quot;index.html&quot;</span><span style="color:#E1E4E8;">, gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;title&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Hello World&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">POST</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/user/add&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(context </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		username </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> context.</span><span style="color:#79B8FF;">PostForm</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;username&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		password </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> context.</span><span style="color:#79B8FF;">PostForm</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;password&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		context.</span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">(http.StatusOK, gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;msg&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;success&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;data&quot;</span><span style="color:#E1E4E8;">: gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#9ECBFF;">&quot;username&quot;</span><span style="color:#E1E4E8;">: username,</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#9ECBFF;">&quot;password&quot;</span><span style="color:#E1E4E8;">: password,</span></span>
<span class="line"><span style="color:#E1E4E8;">			},</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	_ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ginServer.</span><span style="color:#79B8FF;">Run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;:8080&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/gin-gonic/gin</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">net/http</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	ginServer </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> gin.</span><span style="color:#005CC5;">Default</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">LoadHTMLGlob</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;templates/*&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">GET</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/index&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(context </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">		context.</span><span style="color:#005CC5;">HTML</span><span style="color:#24292E;">(http.StatusOK, </span><span style="color:#032F62;">&quot;index.html&quot;</span><span style="color:#24292E;">, gin.H{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;title&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Hello World&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">POST</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/user/add&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(context </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">		username </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> context.</span><span style="color:#005CC5;">PostForm</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;username&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		password </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> context.</span><span style="color:#005CC5;">PostForm</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;password&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		context.</span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">(http.StatusOK, gin.H{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;msg&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;success&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;data&quot;</span><span style="color:#24292E;">: gin.H{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#032F62;">&quot;username&quot;</span><span style="color:#24292E;">: username,</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#032F62;">&quot;password&quot;</span><span style="color:#24292E;">: password,</span></span>
<span class="line"><span style="color:#24292E;">			},</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	_ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ginServer.</span><span style="color:#005CC5;">Run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;:8080&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="路由" tabindex="-1">路由 <a class="header-anchor" href="#路由" aria-label="Permalink to &quot;路由&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/gin-gonic/gin</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">net/http</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gin.</span><span style="color:#79B8FF;">Default</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">LoadHTMLGlob</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;templates/*&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 重定向到首页</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">GET</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(context </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		context.</span><span style="color:#79B8FF;">Redirect</span><span style="color:#E1E4E8;">(http.StatusMovedPermanently, </span><span style="color:#9ECBFF;">&quot;/index&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer.</span><span style="color:#79B8FF;">GET</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/index&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(context </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		context.</span><span style="color:#79B8FF;">HTML</span><span style="color:#E1E4E8;">(http.StatusOK, </span><span style="color:#9ECBFF;">&quot;index.html&quot;</span><span style="color:#E1E4E8;">, gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;title&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Hello World&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 404页面</span></span>
<span class="line"><span style="color:#E1E4E8;">  ginServer.</span><span style="color:#79B8FF;">NoRoute</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(context </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		context.</span><span style="color:#79B8FF;">HTML</span><span style="color:#E1E4E8;">(http.StatusNotFound, </span><span style="color:#9ECBFF;">&quot;404.html&quot;</span><span style="color:#E1E4E8;">, gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;title&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;404&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"><span style="color:#E1E4E8;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	_ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ginServer.</span><span style="color:#79B8FF;">Run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;:8080&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/gin-gonic/gin</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">net/http</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	ginServer </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> gin.</span><span style="color:#005CC5;">Default</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">LoadHTMLGlob</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;templates/*&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 重定向到首页</span></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">GET</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(context </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">		context.</span><span style="color:#005CC5;">Redirect</span><span style="color:#24292E;">(http.StatusMovedPermanently, </span><span style="color:#032F62;">&quot;/index&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	ginServer.</span><span style="color:#005CC5;">GET</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/index&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(context </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">		context.</span><span style="color:#005CC5;">HTML</span><span style="color:#24292E;">(http.StatusOK, </span><span style="color:#032F62;">&quot;index.html&quot;</span><span style="color:#24292E;">, gin.H{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;title&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Hello World&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 404页面</span></span>
<span class="line"><span style="color:#24292E;">  ginServer.</span><span style="color:#005CC5;">NoRoute</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(context </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">		context.</span><span style="color:#005CC5;">HTML</span><span style="color:#24292E;">(http.StatusNotFound, </span><span style="color:#032F62;">&quot;404.html&quot;</span><span style="color:#24292E;">, gin.H{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;title&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;404&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"><span style="color:#24292E;">	})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	_ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ginServer.</span><span style="color:#005CC5;">Run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;:8080&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="路由组" tabindex="-1">路由组 <a class="header-anchor" href="#路由组" aria-label="Permalink to &quot;路由组&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/gin-gonic/gin</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gin.</span><span style="color:#79B8FF;">Default</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	userGroup </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> ginServer.</span><span style="color:#79B8FF;">Group</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/user&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	{</span></span>
<span class="line"><span style="color:#E1E4E8;">		userGroup.</span><span style="color:#79B8FF;">GET</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			c.</span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">, gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#9ECBFF;">&quot;message&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;get user&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			})</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"><span style="color:#E1E4E8;">		userGroup.</span><span style="color:#79B8FF;">POST</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/post&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			c.</span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">, gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#9ECBFF;">&quot;message&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;post user&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			})</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	_ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ginServer.</span><span style="color:#79B8FF;">Run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;:8080&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/gin-gonic/gin</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	ginServer </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> gin.</span><span style="color:#005CC5;">Default</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	userGroup </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> ginServer.</span><span style="color:#005CC5;">Group</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/user&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	{</span></span>
<span class="line"><span style="color:#24292E;">		userGroup.</span><span style="color:#005CC5;">GET</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/get&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(c </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">			c.</span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">200</span><span style="color:#24292E;">, gin.H{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#032F62;">&quot;message&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;get user&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			})</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"><span style="color:#24292E;">		userGroup.</span><span style="color:#005CC5;">POST</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/post&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(c </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">			c.</span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">200</span><span style="color:#24292E;">, gin.H{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#032F62;">&quot;message&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;post user&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			})</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	_ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ginServer.</span><span style="color:#005CC5;">Run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;:8080&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="自定义中间件-拦截器" tabindex="-1">自定义中间件 拦截器 <a class="header-anchor" href="#自定义中间件-拦截器" aria-label="Permalink to &quot;自定义中间件 拦截器&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/gin-gonic/gin</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">myHandler</span><span style="color:#E1E4E8;">() gin.HandlerFunc {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(context </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// do something</span></span>
<span class="line"><span style="color:#E1E4E8;">		context.</span><span style="color:#79B8FF;">Set</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;zhangsan&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		context.</span><span style="color:#79B8FF;">Next</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 放行</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// context.Abort() 阻止</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	ginServer </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gin.</span><span style="color:#79B8FF;">Default</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	userGroup </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> ginServer.</span><span style="color:#79B8FF;">Group</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/user&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	{</span></span>
<span class="line"><span style="color:#E1E4E8;">		userGroup.</span><span style="color:#79B8FF;">GET</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">myHandler</span><span style="color:#E1E4E8;">(), </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(c </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">// 获取拦截器里设置的值</span></span>
<span class="line"><span style="color:#E1E4E8;">			name </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> c.</span><span style="color:#79B8FF;">MustGet</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">).(</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			log.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(name)</span></span>
<span class="line"><span style="color:#E1E4E8;">			c.</span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">, gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#9ECBFF;">&quot;message&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;get user&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			})</span></span>
<span class="line"><span style="color:#E1E4E8;">		})</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	_ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ginServer.</span><span style="color:#79B8FF;">Run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;:8080&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 2023/07/01 21:36:53 zhangsan</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/gin-gonic/gin</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">log</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">myHandler</span><span style="color:#24292E;">() gin.HandlerFunc {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(context </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// do something</span></span>
<span class="line"><span style="color:#24292E;">		context.</span><span style="color:#005CC5;">Set</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;zhangsan&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		context.</span><span style="color:#005CC5;">Next</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 放行</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// context.Abort() 阻止</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	ginServer </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> gin.</span><span style="color:#005CC5;">Default</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	userGroup </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> ginServer.</span><span style="color:#005CC5;">Group</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/user&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	{</span></span>
<span class="line"><span style="color:#24292E;">		userGroup.</span><span style="color:#005CC5;">GET</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/get&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">myHandler</span><span style="color:#24292E;">(), </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(c </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">// 获取拦截器里设置的值</span></span>
<span class="line"><span style="color:#24292E;">			name </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> c.</span><span style="color:#005CC5;">MustGet</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">).(</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			log.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(name)</span></span>
<span class="line"><span style="color:#24292E;">			c.</span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">200</span><span style="color:#24292E;">, gin.H{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#032F62;">&quot;message&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;get user&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			})</span></span>
<span class="line"><span style="color:#24292E;">		})</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	_ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ginServer.</span><span style="color:#005CC5;">Run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;:8080&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 2023/07/01 21:36:53 zhangsan</span></span></code></pre></div>`,29),t=[o];function e(c,r,E,y,i,u){return n(),a("div",null,t)}const g=s(p,[["render",e]]);export{q as __pageData,g as default};
