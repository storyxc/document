import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.4a66d6f9.js";const u=JSON.parse('{"title":"SpringMVC的执行流程源码分析","description":"","frontmatter":{},"headers":[],"relativePath":"java/framework/SpringMVC的执行流程源码分析.md","filePath":"java/framework/SpringMVC的执行流程源码分析.md","lastUpdated":1704522520000}'),p={name:"java/framework/SpringMVC的执行流程源码分析.md"},e=l(`<h1 id="springmvc的执行流程源码分析" tabindex="-1">SpringMVC的执行流程源码分析 <a class="header-anchor" href="#springmvc的执行流程源码分析" aria-label="Permalink to &quot;SpringMVC的执行流程源码分析&quot;">​</a></h1><h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>一个常见的面试/笔试题: SpringMVC的执行流程</p><p>答:</p><p>1、前端请求到核心前端控制器DispatcherServlet</p><p>2、DispatcherServlet收到请求调用HandlerMapping处理器映射器。</p><p>3、处理器映射器找到具体的处理器，生成处理器对象及处理器拦截器(如果有则生成)一并返回给DispatcherServlet。</p><p>4、 DispatcherServlet调用HandlerAdapter处理器适配器。</p><p>5、HandlerAdapter经过适配调用具体的处理器(Controller，也叫后端控制器)。</p><p>6、Controller执行完成返回ModelAndView。</p><p>7、HandlerAdapter将controller执行结果ModelAndView返回给DispatcherServlet。</p><p>8、DispatcherServlet将ModelAndView传给ViewReslover视图解析器。</p><p>9、ViewReslover解析后返回具体View.</p><p>10、DispatcherServlet根据View进行渲染视图（即将模型数据填充至视图中）。</p><p>11、DispatcherServlet响应用户。</p><p>为了应付面试相信很多人和我一样死记硬背过，今天就来看下源码，看看这个流程的庐山真面目。</p><p>首先找到DispatcherServlet类，看看它的继承关系 <img src="https://storyxc.com/images/blog//7c35641772854695a2f11a2d11a15fc9.png" alt="diagram.png"></p><h2 id="_1-dispathcerservlet的初始化过程" tabindex="-1">1.DispathcerServlet的初始化过程 <a class="header-anchor" href="#_1-dispathcerservlet的初始化过程" aria-label="Permalink to &quot;1.DispathcerServlet的初始化过程&quot;">​</a></h2><p>过程图 <img src="https://storyxc.com/images/blog//4ce896811eba43288927b367844052a7.jpg" alt="2.jpg"></p><p>初始化方法</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">	 * This implementation calls {@link #initStrategies}.</span></span>
<span class="line"><span style="color:#6A737D;">	 */</span></span>
<span class="line"><span style="color:#E1E4E8;">	@</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onRefresh</span><span style="color:#E1E4E8;">(ApplicationContext context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">initStrategies</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	/**</span></span>
<span class="line"><span style="color:#6A737D;">	 * Initialize the strategy objects that this servlet uses.</span></span>
<span class="line"><span style="color:#6A737D;">	 * &lt;p&gt;May be overridden in subclasses in order to initialize further strategy objects.</span></span>
<span class="line"><span style="color:#6A737D;">	 */</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">initStrategies</span><span style="color:#E1E4E8;">(ApplicationContext context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">initMultipartResolver</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">initLocaleResolver</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">initThemeResolver</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">initHandlerMappings</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">initHandlerAdapters</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">initHandlerExceptionResolvers</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">initRequestToViewNameTranslator</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">initViewResolvers</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">initFlashMapManager</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">	 * This implementation calls {@link #initStrategies}.</span></span>
<span class="line"><span style="color:#6A737D;">	 */</span></span>
<span class="line"><span style="color:#24292E;">	@</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onRefresh</span><span style="color:#24292E;">(ApplicationContext context) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">initStrategies</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">	/**</span></span>
<span class="line"><span style="color:#6A737D;">	 * Initialize the strategy objects that this servlet uses.</span></span>
<span class="line"><span style="color:#6A737D;">	 * &lt;p&gt;May be overridden in subclasses in order to initialize further strategy objects.</span></span>
<span class="line"><span style="color:#6A737D;">	 */</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">initStrategies</span><span style="color:#24292E;">(ApplicationContext context) {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">initMultipartResolver</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">initLocaleResolver</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">initThemeResolver</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">initHandlerMappings</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">initHandlerAdapters</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">initHandlerExceptionResolvers</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">initRequestToViewNameTranslator</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">initViewResolvers</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">initFlashMapManager</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span></code></pre></div><p>可以看到initStrategies方法初始化了9个组件，其中不乏文章开头中问题涉及到的组件</p><p>这九个初始化方法做的事情如下：</p><ul><li>initMultipartResolver：初始化MultipartResolver，用于处理文件上传服务，如果有文件上传，那么就会将当前的HttpServletRequest包装成DefaultMultipartHttpServletRequest，并且将每个上传的内容封装成CommonsMultipartFile对象。需要在dispatcherServlet-servlet.xml中配置文件上传解</li><li>initLocaleResolver：用于处理应用的国际化问题，本地化解析策略。</li><li>initThemeResolver：用于定义一个主题。</li><li>initHandlerMapping：用于定义请求映射关系。</li><li>initHandlerAdapters：用于根据Handler的类型定义不同的处理规则。</li><li>initHandlerExceptionResolvers：当Handler处理出错后，会通过此将错误日志记录在log文件中，默认实现类是SimpleMappingExceptionResolver</li><li>initRequestToViewNameTranslators：将指定的ViewName按照定义的RequestToViewNameTranslators替换成想要的格式。</li><li>initViewResolvers：用于将View解析成页面。</li><li>initFlashMapManager：用于生成FlashMap管理器。</li></ul><h2 id="_2-dispatcherservlet如何处理用户请求" tabindex="-1">2.DispatcherServlet如何处理用户请求 <a class="header-anchor" href="#_2-dispatcherservlet如何处理用户请求" aria-label="Permalink to &quot;2.DispatcherServlet如何处理用户请求&quot;">​</a></h2><p>首先要明确DispatcherServlet也是一个Servlet，也要遵守servlet接口的规范，servlet通过service方法来根据不同的请求方式来执行doGet，doPost等方法。而FrameworkServlet重写了service方法，并调用了processRequest方法，processRequest方法中又调用了抽象方法doService，DispatcherServlet实现了doService方法，并在该方法中调用了doDispatch方法，doDispatch方法就是具体的请求处理过程</p><p>过程图： <img src="https://storyxc.com/images/blog//172f19f1372a4d1db544830425c13fa1.jpeg" alt="3.jpeg"></p><h2 id="_3-dodispatch方法" tabindex="-1">3.doDispatch方法 <a class="header-anchor" href="#_3-dodispatch方法" aria-label="Permalink to &quot;3.doDispatch方法&quot;">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">	 * Process the actual dispatching to the handler.</span></span>
<span class="line"><span style="color:#6A737D;">	 * &lt;p&gt;The handler will be obtained by applying the servlet&#39;s HandlerMappings in order.</span></span>
<span class="line"><span style="color:#6A737D;">	 * The HandlerAdapter will be obtained by querying the servlet&#39;s installed HandlerAdapters</span></span>
<span class="line"><span style="color:#6A737D;">	 * to find the first that supports the handler class.</span></span>
<span class="line"><span style="color:#6A737D;">	 * &lt;p&gt;All HTTP methods are handled by this method. It&#39;s up to HandlerAdapters or handlers</span></span>
<span class="line"><span style="color:#6A737D;">	 * themselves to decide which methods are acceptable.</span></span>
<span class="line"><span style="color:#6A737D;">	 * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">request</span><span style="color:#6A737D;"> current HTTP request</span></span>
<span class="line"><span style="color:#6A737D;">	 * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">response</span><span style="color:#6A737D;"> current HTTP response</span></span>
<span class="line"><span style="color:#6A737D;">	 * </span><span style="color:#F97583;">@throws</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">Exception</span><span style="color:#6A737D;"> in case of any kind of processing failure</span></span>
<span class="line"><span style="color:#6A737D;">	 */</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doDispatch</span><span style="color:#E1E4E8;">(HttpServletRequest request, HttpServletResponse response) throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">		HttpServletRequest processedRequest </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> request;</span></span>
<span class="line"><span style="color:#E1E4E8;">		HandlerExecutionChain mappedHandler </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> multipartRequestParsed </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		WebAsyncManager asyncManager </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> WebAsyncUtils.</span><span style="color:#B392F0;">getAsyncManager</span><span style="color:#E1E4E8;">(request);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			ModelAndView mv </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">			Exception dispatchException </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//判断是否为上传文件的请求，如果不是就返回原始的request，否则做相应的处理</span></span>
<span class="line"><span style="color:#E1E4E8;">				processedRequest </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">checkMultipart</span><span style="color:#E1E4E8;">(request);</span></span>
<span class="line"><span style="color:#E1E4E8;">				multipartRequestParsed </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (processedRequest </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> request);</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// Determine handler for the current request.</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//找到当前请求对应的处理器，返回的是对应的处理器及拦截器集合</span></span>
<span class="line"><span style="color:#E1E4E8;">				mappedHandler </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getHandler</span><span style="color:#E1E4E8;">(processedRequest);</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (mappedHandler </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#B392F0;">noHandlerFound</span><span style="color:#E1E4E8;">(processedRequest, response);</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// Determine handler adapter for the current request.</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//根据上一步找到的处理器，再找到对应的处理器适配器</span></span>
<span class="line"><span style="color:#E1E4E8;">				HandlerAdapter ha </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getHandlerAdapter</span><span style="color:#E1E4E8;">(mappedHandler.</span><span style="color:#B392F0;">getHandler</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// Process last-modified header, if supported by the handler.</span></span>
<span class="line"><span style="color:#E1E4E8;">				String method </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> request.</span><span style="color:#B392F0;">getMethod</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> isGet </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;GET&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(method);</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (isGet </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;HEAD&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(method)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> lastModified </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ha.</span><span style="color:#B392F0;">getLastModified</span><span style="color:#E1E4E8;">(request, mappedHandler.</span><span style="color:#B392F0;">getHandler</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ServletWebRequest</span><span style="color:#E1E4E8;">(request, response).</span><span style="color:#B392F0;">checkNotModified</span><span style="color:#E1E4E8;">(lastModified) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> isGet) {</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">					}</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">//这里执行了所有的拦截器中的preHandle方法 也就是为什么拦截器总在controller前先执行</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">mappedHandler.</span><span style="color:#B392F0;">applyPreHandle</span><span style="color:#E1E4E8;">(processedRequest, response)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// Actually invoke the handler.</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//调用处理器的处理方法</span></span>
<span class="line"><span style="color:#E1E4E8;">				mv </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ha.</span><span style="color:#B392F0;">handle</span><span style="color:#E1E4E8;">(processedRequest, response, mappedHandler.</span><span style="color:#B392F0;">getHandler</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (asyncManager.</span><span style="color:#B392F0;">isConcurrentHandlingStarted</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">//设置modelAndView的默认名</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">applyDefaultViewName</span><span style="color:#E1E4E8;">(processedRequest, mv);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//执行拦截器的postHanle方法</span></span>
<span class="line"><span style="color:#E1E4E8;">				mappedHandler.</span><span style="color:#B392F0;">applyPostHandle</span><span style="color:#E1E4E8;">(processedRequest, response, mv);</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Exception </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				dispatchException </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ex;</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Throwable </span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// As of 4.3, we&#39;re processing Errors thrown from handler methods as well,</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// making them available for @ExceptionHandler methods and other scenarios.</span></span>
<span class="line"><span style="color:#E1E4E8;">				dispatchException </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NestedServletException</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Handler dispatch failed&quot;</span><span style="color:#E1E4E8;">, err);</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//处理modelAndView并渲染</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">processDispatchResult</span><span style="color:#E1E4E8;">(processedRequest, response, mappedHandler, mv, dispatchException);</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Exception </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">triggerAfterCompletion</span><span style="color:#E1E4E8;">(processedRequest, response, mappedHandler, ex);</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Throwable </span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">triggerAfterCompletion</span><span style="color:#E1E4E8;">(processedRequest, response, mappedHandler,</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NestedServletException</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Handler processing failed&quot;</span><span style="color:#E1E4E8;">, err));</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (asyncManager.</span><span style="color:#B392F0;">isConcurrentHandlingStarted</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// Instead of postHandle and afterCompletion</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (mappedHandler </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					mappedHandler.</span><span style="color:#B392F0;">applyAfterConcurrentHandlingStarted</span><span style="color:#E1E4E8;">(processedRequest, response);</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// Clean up any resources used by a multipart request.</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (multipartRequestParsed) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#B392F0;">cleanupMultipart</span><span style="color:#E1E4E8;">(processedRequest);</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">	 * Process the actual dispatching to the handler.</span></span>
<span class="line"><span style="color:#6A737D;">	 * &lt;p&gt;The handler will be obtained by applying the servlet&#39;s HandlerMappings in order.</span></span>
<span class="line"><span style="color:#6A737D;">	 * The HandlerAdapter will be obtained by querying the servlet&#39;s installed HandlerAdapters</span></span>
<span class="line"><span style="color:#6A737D;">	 * to find the first that supports the handler class.</span></span>
<span class="line"><span style="color:#6A737D;">	 * &lt;p&gt;All HTTP methods are handled by this method. It&#39;s up to HandlerAdapters or handlers</span></span>
<span class="line"><span style="color:#6A737D;">	 * themselves to decide which methods are acceptable.</span></span>
<span class="line"><span style="color:#6A737D;">	 * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">request</span><span style="color:#6A737D;"> current HTTP request</span></span>
<span class="line"><span style="color:#6A737D;">	 * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">response</span><span style="color:#6A737D;"> current HTTP response</span></span>
<span class="line"><span style="color:#6A737D;">	 * </span><span style="color:#D73A49;">@throws</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">Exception</span><span style="color:#6A737D;"> in case of any kind of processing failure</span></span>
<span class="line"><span style="color:#6A737D;">	 */</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doDispatch</span><span style="color:#24292E;">(HttpServletRequest request, HttpServletResponse response) throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">		HttpServletRequest processedRequest </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> request;</span></span>
<span class="line"><span style="color:#24292E;">		HandlerExecutionChain mappedHandler </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> multipartRequestParsed </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		WebAsyncManager asyncManager </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> WebAsyncUtils.</span><span style="color:#6F42C1;">getAsyncManager</span><span style="color:#24292E;">(request);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			ModelAndView mv </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">			Exception dispatchException </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//判断是否为上传文件的请求，如果不是就返回原始的request，否则做相应的处理</span></span>
<span class="line"><span style="color:#24292E;">				processedRequest </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">checkMultipart</span><span style="color:#24292E;">(request);</span></span>
<span class="line"><span style="color:#24292E;">				multipartRequestParsed </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (processedRequest </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> request);</span></span>
<span class="line"><span style="color:#24292E;">				</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// Determine handler for the current request.</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//找到当前请求对应的处理器，返回的是对应的处理器及拦截器集合</span></span>
<span class="line"><span style="color:#24292E;">				mappedHandler </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getHandler</span><span style="color:#24292E;">(processedRequest);</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (mappedHandler </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#6F42C1;">noHandlerFound</span><span style="color:#24292E;">(processedRequest, response);</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// Determine handler adapter for the current request.</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//根据上一步找到的处理器，再找到对应的处理器适配器</span></span>
<span class="line"><span style="color:#24292E;">				HandlerAdapter ha </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getHandlerAdapter</span><span style="color:#24292E;">(mappedHandler.</span><span style="color:#6F42C1;">getHandler</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// Process last-modified header, if supported by the handler.</span></span>
<span class="line"><span style="color:#24292E;">				String method </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> request.</span><span style="color:#6F42C1;">getMethod</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> isGet </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;GET&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(method);</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (isGet </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;HEAD&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(method)) {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> lastModified </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ha.</span><span style="color:#6F42C1;">getLastModified</span><span style="color:#24292E;">(request, mappedHandler.</span><span style="color:#6F42C1;">getHandler</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ServletWebRequest</span><span style="color:#24292E;">(request, response).</span><span style="color:#6F42C1;">checkNotModified</span><span style="color:#24292E;">(lastModified) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> isGet) {</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">					}</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">//这里执行了所有的拦截器中的preHandle方法 也就是为什么拦截器总在controller前先执行</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">mappedHandler.</span><span style="color:#6F42C1;">applyPreHandle</span><span style="color:#24292E;">(processedRequest, response)) {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// Actually invoke the handler.</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//调用处理器的处理方法</span></span>
<span class="line"><span style="color:#24292E;">				mv </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ha.</span><span style="color:#6F42C1;">handle</span><span style="color:#24292E;">(processedRequest, response, mappedHandler.</span><span style="color:#6F42C1;">getHandler</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (asyncManager.</span><span style="color:#6F42C1;">isConcurrentHandlingStarted</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">//设置modelAndView的默认名</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">applyDefaultViewName</span><span style="color:#24292E;">(processedRequest, mv);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//执行拦截器的postHanle方法</span></span>
<span class="line"><span style="color:#24292E;">				mappedHandler.</span><span style="color:#6F42C1;">applyPostHandle</span><span style="color:#24292E;">(processedRequest, response, mv);</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Exception </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				dispatchException </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ex;</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Throwable </span><span style="color:#E36209;">err</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// As of 4.3, we&#39;re processing Errors thrown from handler methods as well,</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// making them available for @ExceptionHandler methods and other scenarios.</span></span>
<span class="line"><span style="color:#24292E;">				dispatchException </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NestedServletException</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Handler dispatch failed&quot;</span><span style="color:#24292E;">, err);</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//处理modelAndView并渲染</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">processDispatchResult</span><span style="color:#24292E;">(processedRequest, response, mappedHandler, mv, dispatchException);</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Exception </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">triggerAfterCompletion</span><span style="color:#24292E;">(processedRequest, response, mappedHandler, ex);</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Throwable </span><span style="color:#E36209;">err</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">triggerAfterCompletion</span><span style="color:#24292E;">(processedRequest, response, mappedHandler,</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NestedServletException</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Handler processing failed&quot;</span><span style="color:#24292E;">, err));</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (asyncManager.</span><span style="color:#6F42C1;">isConcurrentHandlingStarted</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// Instead of postHandle and afterCompletion</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (mappedHandler </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">					mappedHandler.</span><span style="color:#6F42C1;">applyAfterConcurrentHandlingStarted</span><span style="color:#24292E;">(processedRequest, response);</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// Clean up any resources used by a multipart request.</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (multipartRequestParsed) {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#6F42C1;">cleanupMultipart</span><span style="color:#24292E;">(processedRequest);</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span></code></pre></div><h3 id="_1-gethandler方法" tabindex="-1">1.getHandler方法 <a class="header-anchor" href="#_1-gethandler方法" aria-label="Permalink to &quot;1.getHandler方法&quot;">​</a></h3><p>该方法返回的是HandlerExecutionChain对象,其中包含了处理器和过滤器的集合,这里调用了handlerMapping的getHandler方法,该方法主要调用了<code>getHandlerExecutionChain</code>方法,handlerMapping的集合是在初始化dispatchServlet的时候从beanFactory中查找并封装的,具体的handlerMappings初始化细节可以看<code>initHandlerMappings</code>方法,handlerMapping有多种类型,对应不同的请求,比如请求静态资源的和请求接口的等,此处我们以请求一个查询接口为例</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">protected HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception {</span></span>
<span class="line"><span style="color:#e1e4e8;">   if (this.handlerMappings != null) {</span></span>
<span class="line"><span style="color:#e1e4e8;">   		//循环所有的handlerMapping,直到找到对应的handler</span></span>
<span class="line"><span style="color:#e1e4e8;">      for (HandlerMapping mapping : this.handlerMappings) {</span></span>
<span class="line"><span style="color:#e1e4e8;">         HandlerExecutionChain handler = mapping.getHandler(request);</span></span>
<span class="line"><span style="color:#e1e4e8;">         if (handler != null) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            return handler;</span></span>
<span class="line"><span style="color:#e1e4e8;">         }</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;">   return null;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">protected HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception {</span></span>
<span class="line"><span style="color:#24292e;">   if (this.handlerMappings != null) {</span></span>
<span class="line"><span style="color:#24292e;">   		//循环所有的handlerMapping,直到找到对应的handler</span></span>
<span class="line"><span style="color:#24292e;">      for (HandlerMapping mapping : this.handlerMappings) {</span></span>
<span class="line"><span style="color:#24292e;">         HandlerExecutionChain handler = mapping.getHandler(request);</span></span>
<span class="line"><span style="color:#24292e;">         if (handler != null) {</span></span>
<span class="line"><span style="color:#24292e;">            return handler;</span></span>
<span class="line"><span style="color:#24292e;">         }</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;">   return null;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li><code>getHandlerExecutionChain</code>方法</li></ul><p><strong>这里调用的是AbstractHandlerMethodMapping的getHandlerInternal方法,该方法又调用了同一个类中的lookupHandlerMethod方法</strong></p><ul><li><p>lookupHandlerMethod方法会根据请求的uri在mappingRegistry中查询已经注册了的请求路径(requestMapping注解中的路径),如果能直接从map中get到非空的list,就直接根据list匹配对应的HandleMethod对象,如果mappingRegistry中get不到,就尝试使用uri路径匹配,例如带有url参数的这种格式/test/{username}的格式,{username}会被替换为.*的正则表达式去进行匹配,匹配到后返回;</p></li><li><p><code>getHandlerExecutionChain</code>方法则是根据请求的路径匹配拦截器的路径,如果有匹配到的,就添加到执行链当中</p></li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> HandlerExecutionChain </span><span style="color:#B392F0;">getHandler</span><span style="color:#E1E4E8;">(HttpServletRequest request) throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">    	</span><span style="color:#6A737D;">//根据request找到对应的handler</span></span>
<span class="line"><span style="color:#E1E4E8;">		Object handler </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getHandlerInternal</span><span style="color:#E1E4E8;">(request);</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (handler </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			handler </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getDefaultHandler</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (handler </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// Bean name or resolved handler?</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (handler </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> String) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			String handlerName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (String) handler;</span></span>
<span class="line"><span style="color:#E1E4E8;">			handler </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">obtainApplicationContext</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(handlerName);</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		HandlerExecutionChain executionChain </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getHandlerExecutionChain</span><span style="color:#E1E4E8;">(handler, request);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (logger.</span><span style="color:#B392F0;">isTraceEnabled</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			logger.</span><span style="color:#B392F0;">trace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Mapped to &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> handler);</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (logger.</span><span style="color:#B392F0;">isDebugEnabled</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">request.</span><span style="color:#B392F0;">getDispatcherType</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(DispatcherType.ASYNC)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			logger.</span><span style="color:#B392F0;">debug</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Mapped to &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> executionChain.</span><span style="color:#B392F0;">getHandler</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (CorsUtils.</span><span style="color:#B392F0;">isCorsRequest</span><span style="color:#E1E4E8;">(request)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			CorsConfiguration globalConfig </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.corsConfigurationSource.</span><span style="color:#B392F0;">getCorsConfiguration</span><span style="color:#E1E4E8;">(request);</span></span>
<span class="line"><span style="color:#E1E4E8;">			CorsConfiguration handlerConfig </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getCorsConfiguration</span><span style="color:#E1E4E8;">(handler, request);</span></span>
<span class="line"><span style="color:#E1E4E8;">			CorsConfiguration config </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (globalConfig </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> globalConfig.</span><span style="color:#B392F0;">combine</span><span style="color:#E1E4E8;">(handlerConfig) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> handlerConfig);</span></span>
<span class="line"><span style="color:#E1E4E8;">			executionChain </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getCorsHandlerExecutionChain</span><span style="color:#E1E4E8;">(request, executionChain, config);</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> executionChain;</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> HandlerExecutionChain </span><span style="color:#B392F0;">getHandlerExecutionChain</span><span style="color:#E1E4E8;">(Object handler, HttpServletRequest request) {</span></span>
<span class="line"><span style="color:#E1E4E8;">		HandlerExecutionChain chain </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (handler </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> HandlerExecutionChain </span><span style="color:#F97583;">?</span></span>
<span class="line"><span style="color:#E1E4E8;">				(HandlerExecutionChain) handler </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HandlerExecutionChain</span><span style="color:#E1E4E8;">(handler));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		String lookupPath </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.urlPathHelper.</span><span style="color:#B392F0;">getLookupPathForRequest</span><span style="color:#E1E4E8;">(request);</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (HandlerInterceptor interceptor </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.adaptedInterceptors) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (interceptor </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> MappedInterceptor) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				MappedInterceptor mappedInterceptor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (MappedInterceptor) interceptor;</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (mappedInterceptor.</span><span style="color:#B392F0;">matches</span><span style="color:#E1E4E8;">(lookupPath, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.pathMatcher)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					chain.</span><span style="color:#B392F0;">addInterceptor</span><span style="color:#E1E4E8;">(mappedInterceptor.</span><span style="color:#B392F0;">getInterceptor</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				chain.</span><span style="color:#B392F0;">addInterceptor</span><span style="color:#E1E4E8;">(interceptor);</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> chain;</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> HandlerExecutionChain </span><span style="color:#6F42C1;">getHandler</span><span style="color:#24292E;">(HttpServletRequest request) throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">    	</span><span style="color:#6A737D;">//根据request找到对应的handler</span></span>
<span class="line"><span style="color:#24292E;">		Object handler </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getHandlerInternal</span><span style="color:#24292E;">(request);</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (handler </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			handler </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getDefaultHandler</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (handler </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// Bean name or resolved handler?</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (handler </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> String) {</span></span>
<span class="line"><span style="color:#24292E;">			String handlerName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (String) handler;</span></span>
<span class="line"><span style="color:#24292E;">			handler </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">obtainApplicationContext</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(handlerName);</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		HandlerExecutionChain executionChain </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getHandlerExecutionChain</span><span style="color:#24292E;">(handler, request);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (logger.</span><span style="color:#6F42C1;">isTraceEnabled</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">			logger.</span><span style="color:#6F42C1;">trace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Mapped to &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> handler);</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (logger.</span><span style="color:#6F42C1;">isDebugEnabled</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">request.</span><span style="color:#6F42C1;">getDispatcherType</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(DispatcherType.ASYNC)) {</span></span>
<span class="line"><span style="color:#24292E;">			logger.</span><span style="color:#6F42C1;">debug</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Mapped to &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> executionChain.</span><span style="color:#6F42C1;">getHandler</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (CorsUtils.</span><span style="color:#6F42C1;">isCorsRequest</span><span style="color:#24292E;">(request)) {</span></span>
<span class="line"><span style="color:#24292E;">			CorsConfiguration globalConfig </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.corsConfigurationSource.</span><span style="color:#6F42C1;">getCorsConfiguration</span><span style="color:#24292E;">(request);</span></span>
<span class="line"><span style="color:#24292E;">			CorsConfiguration handlerConfig </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getCorsConfiguration</span><span style="color:#24292E;">(handler, request);</span></span>
<span class="line"><span style="color:#24292E;">			CorsConfiguration config </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (globalConfig </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> globalConfig.</span><span style="color:#6F42C1;">combine</span><span style="color:#24292E;">(handlerConfig) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> handlerConfig);</span></span>
<span class="line"><span style="color:#24292E;">			executionChain </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getCorsHandlerExecutionChain</span><span style="color:#24292E;">(request, executionChain, config);</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> executionChain;</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> HandlerExecutionChain </span><span style="color:#6F42C1;">getHandlerExecutionChain</span><span style="color:#24292E;">(Object handler, HttpServletRequest request) {</span></span>
<span class="line"><span style="color:#24292E;">		HandlerExecutionChain chain </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (handler </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> HandlerExecutionChain </span><span style="color:#D73A49;">?</span></span>
<span class="line"><span style="color:#24292E;">				(HandlerExecutionChain) handler </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HandlerExecutionChain</span><span style="color:#24292E;">(handler));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		String lookupPath </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.urlPathHelper.</span><span style="color:#6F42C1;">getLookupPathForRequest</span><span style="color:#24292E;">(request);</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (HandlerInterceptor interceptor </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.adaptedInterceptors) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (interceptor </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> MappedInterceptor) {</span></span>
<span class="line"><span style="color:#24292E;">				MappedInterceptor mappedInterceptor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (MappedInterceptor) interceptor;</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (mappedInterceptor.</span><span style="color:#6F42C1;">matches</span><span style="color:#24292E;">(lookupPath, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.pathMatcher)) {</span></span>
<span class="line"><span style="color:#24292E;">					chain.</span><span style="color:#6F42C1;">addInterceptor</span><span style="color:#24292E;">(mappedInterceptor.</span><span style="color:#6F42C1;">getInterceptor</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				chain.</span><span style="color:#6F42C1;">addInterceptor</span><span style="color:#24292E;">(interceptor);</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> chain;</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span></code></pre></div><h3 id="_2-gethandleradapter方法" tabindex="-1">2.getHandlerAdapter方法 <a class="header-anchor" href="#_2-gethandleradapter方法" aria-label="Permalink to &quot;2.getHandlerAdapter方法&quot;">​</a></h3><p>这个方法比较简单,就是从handlerAdapter集合中遍历找到支持当前请求的处理器适配器,用到了handlerAdapter的supports方法,测试的接口请求会调用AbstractHandlerMethodAdapter这个类的supports方法</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * This implementation expects the handler to be an {@link HandlerMethod}.</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">handler</span><span style="color:#6A737D;"> the handler instance to check</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> whether or not this adapter can adapt the given handler</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">supports</span><span style="color:#E1E4E8;">(Object handler) {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (handler </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> HandlerMethod </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">supportsInternal</span><span style="color:#E1E4E8;">((HandlerMethod) handler));</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * This implementation expects the handler to be an {@link HandlerMethod}.</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">handler</span><span style="color:#6A737D;"> the handler instance to check</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> whether or not this adapter can adapt the given handler</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">supports</span><span style="color:#24292E;">(Object handler) {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (handler </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> HandlerMethod </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">supportsInternal</span><span style="color:#24292E;">((HandlerMethod) handler));</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_3-handle方法" tabindex="-1">3.handle方法 <a class="header-anchor" href="#_3-handle方法" aria-label="Permalink to &quot;3.handle方法&quot;">​</a></h3><p>在找到对应的处理器适配器后,会执行拦截器的preHandle方法,然后执行处理器适配器的handle方法,这个就是实际上调用我们所写的controller了,该方法有几个实现 <img src="https://storyxc.com/images/blog//Snipaste_2020-07-16_13-13-23.jpg" alt="Snipaste_20200716_131323.jpg"> 这里调用的是AbstractHandlerMethodAdapter的方法,该方法调用了抽象方法<code>handleInternal</code>,它的实现在RequestMappingHandlerAdapter类中</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> ModelAndView </span><span style="color:#B392F0;">handleInternal</span><span style="color:#E1E4E8;">(HttpServletRequest request,</span></span>
<span class="line"><span style="color:#E1E4E8;">      HttpServletResponse response, HandlerMethod handlerMethod) throws Exception {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   ModelAndView mav;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#B392F0;">checkRequest</span><span style="color:#E1E4E8;">(request);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// Execute invokeHandlerMethod in synchronized block if required.</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.synchronizeOnSession) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      HttpSession session </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> request.</span><span style="color:#B392F0;">getSession</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (session </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         Object mutex </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> WebUtils.</span><span style="color:#B392F0;">getSessionMutex</span><span style="color:#E1E4E8;">(session);</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (mutex) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            mav </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">invokeHandlerMethod</span><span style="color:#E1E4E8;">(request, response, handlerMethod);</span></span>
<span class="line"><span style="color:#E1E4E8;">         }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#6A737D;">// No HttpSession available -&gt; no mutex necessary</span></span>
<span class="line"><span style="color:#E1E4E8;">         mav </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">invokeHandlerMethod</span><span style="color:#E1E4E8;">(request, response, handlerMethod);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// No synchronization on session demanded at all...</span></span>
<span class="line"><span style="color:#E1E4E8;">      mav </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">invokeHandlerMethod</span><span style="color:#E1E4E8;">(request, response, handlerMethod);</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">response.</span><span style="color:#B392F0;">containsHeader</span><span style="color:#E1E4E8;">(HEADER_CACHE_CONTROL)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">getSessionAttributesHandler</span><span style="color:#E1E4E8;">(handlerMethod).</span><span style="color:#B392F0;">hasSessionAttributes</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">applyCacheSeconds</span><span style="color:#E1E4E8;">(response, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.cacheSecondsForSessionAttributeHandlers);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">prepareResponse</span><span style="color:#E1E4E8;">(response);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> mav;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> ModelAndView </span><span style="color:#6F42C1;">handleInternal</span><span style="color:#24292E;">(HttpServletRequest request,</span></span>
<span class="line"><span style="color:#24292E;">      HttpServletResponse response, HandlerMethod handlerMethod) throws Exception {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   ModelAndView mav;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6F42C1;">checkRequest</span><span style="color:#24292E;">(request);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// Execute invokeHandlerMethod in synchronized block if required.</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.synchronizeOnSession) {</span></span>
<span class="line"><span style="color:#24292E;">      HttpSession session </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> request.</span><span style="color:#6F42C1;">getSession</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (session </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">         Object mutex </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> WebUtils.</span><span style="color:#6F42C1;">getSessionMutex</span><span style="color:#24292E;">(session);</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (mutex) {</span></span>
<span class="line"><span style="color:#24292E;">            mav </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">invokeHandlerMethod</span><span style="color:#24292E;">(request, response, handlerMethod);</span></span>
<span class="line"><span style="color:#24292E;">         }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6A737D;">// No HttpSession available -&gt; no mutex necessary</span></span>
<span class="line"><span style="color:#24292E;">         mav </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">invokeHandlerMethod</span><span style="color:#24292E;">(request, response, handlerMethod);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// No synchronization on session demanded at all...</span></span>
<span class="line"><span style="color:#24292E;">      mav </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">invokeHandlerMethod</span><span style="color:#24292E;">(request, response, handlerMethod);</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">response.</span><span style="color:#6F42C1;">containsHeader</span><span style="color:#24292E;">(HEADER_CACHE_CONTROL)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">getSessionAttributesHandler</span><span style="color:#24292E;">(handlerMethod).</span><span style="color:#6F42C1;">hasSessionAttributes</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">applyCacheSeconds</span><span style="color:#24292E;">(response, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.cacheSecondsForSessionAttributeHandlers);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">prepareResponse</span><span style="color:#24292E;">(response);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> mav;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>其中重点在invokeHandlerMethod方法,这个方法首先初始化了一个新的handlerMethod对象,添加了相关的解析组件,返回值处理器等等,然后执行了invokeAndHandle方法,然后最终调用了InvocableHandlerMethod类中的<code>doInvoke</code>方法</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> ModelAndView </span><span style="color:#B392F0;">invokeHandlerMethod</span><span style="color:#E1E4E8;">(HttpServletRequest request,</span></span>
<span class="line"><span style="color:#E1E4E8;">      HttpServletResponse response, HandlerMethod handlerMethod) throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">   ServletWebRequest webRequest </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ServletWebRequest</span><span style="color:#E1E4E8;">(request, response);</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      WebDataBinderFactory binderFactory </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getDataBinderFactory</span><span style="color:#E1E4E8;">(handlerMethod);</span></span>
<span class="line"><span style="color:#E1E4E8;">      ModelFactory modelFactory </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getModelFactory</span><span style="color:#E1E4E8;">(handlerMethod, binderFactory);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      ServletInvocableHandlerMethod invocableMethod </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createInvocableHandlerMethod</span><span style="color:#E1E4E8;">(handlerMethod);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.argumentResolvers </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         invocableMethod.</span><span style="color:#B392F0;">setHandlerMethodArgumentResolvers</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.argumentResolvers);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.returnValueHandlers </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         invocableMethod.</span><span style="color:#B392F0;">setHandlerMethodReturnValueHandlers</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.returnValueHandlers);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      invocableMethod.</span><span style="color:#B392F0;">setDataBinderFactory</span><span style="color:#E1E4E8;">(binderFactory);</span></span>
<span class="line"><span style="color:#E1E4E8;">      invocableMethod.</span><span style="color:#B392F0;">setParameterNameDiscoverer</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.parameterNameDiscoverer);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      ModelAndViewContainer mavContainer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ModelAndViewContainer</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      mavContainer.</span><span style="color:#B392F0;">addAllAttributes</span><span style="color:#E1E4E8;">(RequestContextUtils.</span><span style="color:#B392F0;">getInputFlashMap</span><span style="color:#E1E4E8;">(request));</span></span>
<span class="line"><span style="color:#E1E4E8;">      modelFactory.</span><span style="color:#B392F0;">initModel</span><span style="color:#E1E4E8;">(webRequest, mavContainer, invocableMethod);</span></span>
<span class="line"><span style="color:#E1E4E8;">      mavContainer.</span><span style="color:#B392F0;">setIgnoreDefaultModelOnRedirect</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.ignoreDefaultModelOnRedirect);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      AsyncWebRequest asyncWebRequest </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> WebAsyncUtils.</span><span style="color:#B392F0;">createAsyncWebRequest</span><span style="color:#E1E4E8;">(request, response);</span></span>
<span class="line"><span style="color:#E1E4E8;">      asyncWebRequest.</span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.asyncRequestTimeout);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      WebAsyncManager asyncManager </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> WebAsyncUtils.</span><span style="color:#B392F0;">getAsyncManager</span><span style="color:#E1E4E8;">(request);</span></span>
<span class="line"><span style="color:#E1E4E8;">      asyncManager.</span><span style="color:#B392F0;">setTaskExecutor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.taskExecutor);</span></span>
<span class="line"><span style="color:#E1E4E8;">      asyncManager.</span><span style="color:#B392F0;">setAsyncWebRequest</span><span style="color:#E1E4E8;">(asyncWebRequest);</span></span>
<span class="line"><span style="color:#E1E4E8;">      asyncManager.</span><span style="color:#B392F0;">registerCallableInterceptors</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.callableInterceptors);</span></span>
<span class="line"><span style="color:#E1E4E8;">      asyncManager.</span><span style="color:#B392F0;">registerDeferredResultInterceptors</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.deferredResultInterceptors);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (asyncManager.</span><span style="color:#B392F0;">hasConcurrentResult</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         Object result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> asyncManager.</span><span style="color:#B392F0;">getConcurrentResult</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">         mavContainer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (ModelAndViewContainer) asyncManager.</span><span style="color:#B392F0;">getConcurrentResultContext</span><span style="color:#E1E4E8;">()[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">         asyncManager.</span><span style="color:#B392F0;">clearConcurrentResult</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">         LogFormatUtils.</span><span style="color:#B392F0;">traceDebug</span><span style="color:#E1E4E8;">(logger, traceOn </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            String formatted </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> LogFormatUtils.</span><span style="color:#B392F0;">formatValue</span><span style="color:#E1E4E8;">(result, </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">traceOn);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Resume with async result [&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> formatted </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;]&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">         });</span></span>
<span class="line"><span style="color:#E1E4E8;">         invocableMethod </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> invocableMethod.</span><span style="color:#B392F0;">wrapConcurrentResult</span><span style="color:#E1E4E8;">(result);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      invocableMethod.</span><span style="color:#B392F0;">invokeAndHandle</span><span style="color:#E1E4E8;">(webRequest, mavContainer);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (asyncManager.</span><span style="color:#B392F0;">isConcurrentHandlingStarted</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getModelAndView</span><span style="color:#E1E4E8;">(mavContainer, modelFactory, webRequest);</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      webRequest.</span><span style="color:#B392F0;">requestCompleted</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> ModelAndView </span><span style="color:#6F42C1;">invokeHandlerMethod</span><span style="color:#24292E;">(HttpServletRequest request,</span></span>
<span class="line"><span style="color:#24292E;">      HttpServletResponse response, HandlerMethod handlerMethod) throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">   ServletWebRequest webRequest </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ServletWebRequest</span><span style="color:#24292E;">(request, response);</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      WebDataBinderFactory binderFactory </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getDataBinderFactory</span><span style="color:#24292E;">(handlerMethod);</span></span>
<span class="line"><span style="color:#24292E;">      ModelFactory modelFactory </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getModelFactory</span><span style="color:#24292E;">(handlerMethod, binderFactory);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      ServletInvocableHandlerMethod invocableMethod </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createInvocableHandlerMethod</span><span style="color:#24292E;">(handlerMethod);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.argumentResolvers </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">         invocableMethod.</span><span style="color:#6F42C1;">setHandlerMethodArgumentResolvers</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.argumentResolvers);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.returnValueHandlers </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">         invocableMethod.</span><span style="color:#6F42C1;">setHandlerMethodReturnValueHandlers</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.returnValueHandlers);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      invocableMethod.</span><span style="color:#6F42C1;">setDataBinderFactory</span><span style="color:#24292E;">(binderFactory);</span></span>
<span class="line"><span style="color:#24292E;">      invocableMethod.</span><span style="color:#6F42C1;">setParameterNameDiscoverer</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.parameterNameDiscoverer);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      ModelAndViewContainer mavContainer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ModelAndViewContainer</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      mavContainer.</span><span style="color:#6F42C1;">addAllAttributes</span><span style="color:#24292E;">(RequestContextUtils.</span><span style="color:#6F42C1;">getInputFlashMap</span><span style="color:#24292E;">(request));</span></span>
<span class="line"><span style="color:#24292E;">      modelFactory.</span><span style="color:#6F42C1;">initModel</span><span style="color:#24292E;">(webRequest, mavContainer, invocableMethod);</span></span>
<span class="line"><span style="color:#24292E;">      mavContainer.</span><span style="color:#6F42C1;">setIgnoreDefaultModelOnRedirect</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.ignoreDefaultModelOnRedirect);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      AsyncWebRequest asyncWebRequest </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> WebAsyncUtils.</span><span style="color:#6F42C1;">createAsyncWebRequest</span><span style="color:#24292E;">(request, response);</span></span>
<span class="line"><span style="color:#24292E;">      asyncWebRequest.</span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.asyncRequestTimeout);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      WebAsyncManager asyncManager </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> WebAsyncUtils.</span><span style="color:#6F42C1;">getAsyncManager</span><span style="color:#24292E;">(request);</span></span>
<span class="line"><span style="color:#24292E;">      asyncManager.</span><span style="color:#6F42C1;">setTaskExecutor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.taskExecutor);</span></span>
<span class="line"><span style="color:#24292E;">      asyncManager.</span><span style="color:#6F42C1;">setAsyncWebRequest</span><span style="color:#24292E;">(asyncWebRequest);</span></span>
<span class="line"><span style="color:#24292E;">      asyncManager.</span><span style="color:#6F42C1;">registerCallableInterceptors</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.callableInterceptors);</span></span>
<span class="line"><span style="color:#24292E;">      asyncManager.</span><span style="color:#6F42C1;">registerDeferredResultInterceptors</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.deferredResultInterceptors);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (asyncManager.</span><span style="color:#6F42C1;">hasConcurrentResult</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">         Object result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> asyncManager.</span><span style="color:#6F42C1;">getConcurrentResult</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">         mavContainer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (ModelAndViewContainer) asyncManager.</span><span style="color:#6F42C1;">getConcurrentResultContext</span><span style="color:#24292E;">()[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">         asyncManager.</span><span style="color:#6F42C1;">clearConcurrentResult</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">         LogFormatUtils.</span><span style="color:#6F42C1;">traceDebug</span><span style="color:#24292E;">(logger, traceOn </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            String formatted </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> LogFormatUtils.</span><span style="color:#6F42C1;">formatValue</span><span style="color:#24292E;">(result, </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">traceOn);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Resume with async result [&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> formatted </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;]&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">         });</span></span>
<span class="line"><span style="color:#24292E;">         invocableMethod </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> invocableMethod.</span><span style="color:#6F42C1;">wrapConcurrentResult</span><span style="color:#24292E;">(result);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      invocableMethod.</span><span style="color:#6F42C1;">invokeAndHandle</span><span style="color:#24292E;">(webRequest, mavContainer);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (asyncManager.</span><span style="color:#6F42C1;">isConcurrentHandlingStarted</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getModelAndView</span><span style="color:#24292E;">(mavContainer, modelFactory, webRequest);</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      webRequest.</span><span style="color:#6F42C1;">requestCompleted</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>doInvoke方法</li></ul><p>这里就比较明显了,首先利用暴力反射将方法设置为可访问的,然后直接反射调用并返回结果</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Invoke the handler method with the given argument values.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Nullable</span></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">doInvoke</span><span style="color:#E1E4E8;">(Object... args) throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">   ReflectionUtils.</span><span style="color:#B392F0;">makeAccessible</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">getBridgedMethod</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getBridgedMethod</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">invoke</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(), args);</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (IllegalArgumentException </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">assertTargetBean</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">getBridgedMethod</span><span style="color:#E1E4E8;">(), </span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(), args);</span></span>
<span class="line"><span style="color:#E1E4E8;">      String text </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (ex.</span><span style="color:#B392F0;">getMessage</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> ex.</span><span style="color:#B392F0;">getMessage</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Illegal argument&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IllegalStateException</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">formatInvokeError</span><span style="color:#E1E4E8;">(text, args), ex);</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (InvocationTargetException </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// Unwrap for HandlerExceptionResolvers ...</span></span>
<span class="line"><span style="color:#E1E4E8;">      Throwable targetException </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ex.</span><span style="color:#B392F0;">getTargetException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (targetException </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> RuntimeException) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> (RuntimeException) targetException;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (targetException </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> Error) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> (Error) targetException;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (targetException </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> Exception) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> (Exception) targetException;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IllegalStateException</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">formatInvokeError</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Invocation failure&quot;</span><span style="color:#E1E4E8;">, args), targetException);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Invoke the handler method with the given argument values.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Nullable</span></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">doInvoke</span><span style="color:#24292E;">(Object... args) throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">   ReflectionUtils.</span><span style="color:#6F42C1;">makeAccessible</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">getBridgedMethod</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getBridgedMethod</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">invoke</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(), args);</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (IllegalArgumentException </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">assertTargetBean</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">getBridgedMethod</span><span style="color:#24292E;">(), </span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(), args);</span></span>
<span class="line"><span style="color:#24292E;">      String text </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (ex.</span><span style="color:#6F42C1;">getMessage</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> ex.</span><span style="color:#6F42C1;">getMessage</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Illegal argument&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IllegalStateException</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">formatInvokeError</span><span style="color:#24292E;">(text, args), ex);</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (InvocationTargetException </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// Unwrap for HandlerExceptionResolvers ...</span></span>
<span class="line"><span style="color:#24292E;">      Throwable targetException </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ex.</span><span style="color:#6F42C1;">getTargetException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (targetException </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> RuntimeException) {</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> (RuntimeException) targetException;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (targetException </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> Error) {</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> (Error) targetException;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (targetException </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> Exception) {</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> (Exception) targetException;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IllegalStateException</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">formatInvokeError</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Invocation failure&quot;</span><span style="color:#24292E;">, args), targetException);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>返回modelAndview对象后就是渲染的一些操作</p>`,48),o=[e];function t(r,c,E,y,i,d){return n(),a("div",null,o)}const F=s(p,[["render",t]]);export{u as __pageData,F as default};
