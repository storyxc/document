import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.4a66d6f9.js";const u=JSON.parse('{"title":"Markdown基础语法","description":"","frontmatter":{},"headers":[],"relativePath":"actions/tools/Markdown基础语法.md","filePath":"actions/tools/Markdown基础语法.md","lastUpdated":1704522520000}'),l={name:"actions/tools/Markdown基础语法.md"},p=e(`<h1 id="markdown基础语法" tabindex="-1">Markdown基础语法 <a class="header-anchor" href="#markdown基础语法" aria-label="Permalink to &quot;Markdown基础语法&quot;">​</a></h1><p>Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。</p><p>Markdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。</p><p>Markdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。</p><p>Markdown 编写的文档后缀为 .md, .markdown。</p><h2 id="一、标题" tabindex="-1">一、标题 <a class="header-anchor" href="#一、标题" aria-label="Permalink to &quot;一、标题&quot;">​</a></h2><p>示例:</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 一级标题</span></span>
<span class="line"><span style="color:#e1e4e8;">## 二级标题</span></span>
<span class="line"><span style="color:#e1e4e8;">### 三级标题</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 四级标题</span></span>
<span class="line"><span style="color:#e1e4e8;">##### 五级标题</span></span>
<span class="line"><span style="color:#e1e4e8;">###### 六级标题</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 一级标题</span></span>
<span class="line"><span style="color:#24292e;">## 二级标题</span></span>
<span class="line"><span style="color:#24292e;">### 三级标题</span></span>
<span class="line"><span style="color:#24292e;">#### 四级标题</span></span>
<span class="line"><span style="color:#24292e;">##### 五级标题</span></span>
<span class="line"><span style="color:#24292e;">###### 六级标题</span></span></code></pre></div><h2 id="二、字体" tabindex="-1">二、字体 <a class="header-anchor" href="#二、字体" aria-label="Permalink to &quot;二、字体&quot;">​</a></h2><ul><li><p>加粗 要加粗的文字左右分别用两个*号包起来</p></li><li><p>斜体 要倾斜的文字左右分别用一个*号包起来</p></li><li><p>斜体加粗 要倾斜和加粗的文字左右分别用三个*号包起来</p></li><li><p>删除线 要加删除线的文字左右分别用两个~~号包起来</p></li></ul><p>示例：</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">**这是加粗的文字**</span></span>
<span class="line"><span style="color:#e1e4e8;">*这是倾斜的文字*\`</span></span>
<span class="line"><span style="color:#e1e4e8;">***这是斜体加粗的文字***</span></span>
<span class="line"><span style="color:#e1e4e8;">~~这是加删除线的文字~~</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">**这是加粗的文字**</span></span>
<span class="line"><span style="color:#24292e;">*这是倾斜的文字*\`</span></span>
<span class="line"><span style="color:#24292e;">***这是斜体加粗的文字***</span></span>
<span class="line"><span style="color:#24292e;">~~这是加删除线的文字~~</span></span></code></pre></div><p>效果: <strong>这是加粗的文字</strong><em>这是倾斜的文字</em>\` <em><strong>这是斜体加粗的文字</strong></em><s>这是加删除线的文字</s></p><h2 id="三、引用" tabindex="-1">三、引用 <a class="header-anchor" href="#三、引用" aria-label="Permalink to &quot;三、引用&quot;">​</a></h2><p>只需要在你希望引用的文字前面加上 <code>&gt;</code> 就好，例如：</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; 这是一条引用</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; 这是一条引用</span></span></code></pre></div><p>效果如下:</p><blockquote><p>这是一条引用</p></blockquote><p>引用还可以进行多级嵌套</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; 这是一条引用</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;&gt; 这是一条引用</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;&gt;&gt; 这是一条引用</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; 这是一条引用</span></span>
<span class="line"><span style="color:#24292e;">&gt;&gt; 这是一条引用</span></span>
<span class="line"><span style="color:#24292e;">&gt;&gt;&gt; 这是一条引用</span></span></code></pre></div><p>效果:</p><blockquote><p>这是一条引用</p><blockquote><p>这是一条引用</p><blockquote><p>这是一条引用</p></blockquote></blockquote></blockquote><h2 id="四、分割线" tabindex="-1">四、分割线 <a class="header-anchor" href="#四、分割线" aria-label="Permalink to &quot;四、分割线&quot;">​</a></h2><p>三个或者三个以上的 - 或者 * 都可以。</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;">***</span></span>
<span class="line"><span style="color:#e1e4e8;">*****</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;">***</span></span>
<span class="line"><span style="color:#24292e;">*****</span></span></code></pre></div><hr><hr><hr><hr><h2 id="五、图片" tabindex="-1">五、图片 <a class="header-anchor" href="#五、图片" aria-label="Permalink to &quot;五、图片&quot;">​</a></h2><p>语法:</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">![图片alt](图片地址 &#39;&#39;图片title&#39;&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">图片alt就是显示在图片下面的文字，相当于对图片内容的解释。</span></span>
<span class="line"><span style="color:#e1e4e8;">图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">![图片alt](图片地址 &#39;&#39;图片title&#39;&#39;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">图片alt就是显示在图片下面的文字，相当于对图片内容的解释。</span></span>
<span class="line"><span style="color:#24292e;">图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加</span></span></code></pre></div><p>示例:</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">![示例图片alt](http://io.storyxc.com/images/MegellanicCloud_ZH-CN5132305226_1920x1080.jpg &#39;示例图片title&#39;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">![示例图片alt](http://io.storyxc.com/images/MegellanicCloud_ZH-CN5132305226_1920x1080.jpg &#39;示例图片title&#39;)</span></span></code></pre></div><p>效果: <img src="http://io.storyxc.com/images/MegellanicCloud_ZH-CN5132305226_1920x1080.jpg" alt="示例图片alt" title="示例图片title"></p><h2 id="六、超链接" tabindex="-1">六、超链接 <a class="header-anchor" href="#六、超链接" aria-label="Permalink to &quot;六、超链接&quot;">​</a></h2><p>语法:</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[超链接名](超链接地址 &quot;超链接title&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">title可加可不加</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[超链接名](超链接地址 &quot;超链接title&quot;)</span></span>
<span class="line"><span style="color:#24292e;">title可加可不加</span></span></code></pre></div><p>示例:</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[故事的博客](https://www.storyxc.com &quot;故事的博客&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[故事的博客](https://www.storyxc.com &quot;故事的博客&quot;)</span></span></code></pre></div><p>效果 <a href="https://www.storyxc.com" title="故事的博客" target="_blank" rel="noreferrer">故事的博客</a></p><h2 id="七、列表" tabindex="-1">七、列表 <a class="header-anchor" href="#七、列表" aria-label="Permalink to &quot;七、列表&quot;">​</a></h2><p><strong>无序列表</strong> 语法： 无序列表用 - + * 任何一种都可以 示例:</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">- 列表1</span></span>
<span class="line"><span style="color:#e1e4e8;">+ 列表2</span></span>
<span class="line"><span style="color:#e1e4e8;">* 列表3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">- 列表1</span></span>
<span class="line"><span style="color:#24292e;">+ 列表2</span></span>
<span class="line"><span style="color:#24292e;">* 列表3</span></span></code></pre></div><p>效果</p><ul><li>列表1</li></ul><ul><li>列表2</li></ul><ul><li>列表3</li></ul><p><strong>有序列表</strong> 语法： 数字加点 示例:</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1. 111</span></span>
<span class="line"><span style="color:#e1e4e8;">2. 222</span></span>
<span class="line"><span style="color:#e1e4e8;">3. 333</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1. 111</span></span>
<span class="line"><span style="color:#24292e;">2. 222</span></span>
<span class="line"><span style="color:#24292e;">3. 333</span></span></code></pre></div><p>效果:</p><ol><li>111</li><li>222</li><li>333</li></ol><p><strong>列表嵌套</strong></p><p>上一级和下一级之间tab即可</p><ul><li>第一层 <ul><li>第二层 <ul><li>第三层</li></ul></li></ul></li></ul><h2 id="八、表格" tabindex="-1">八、表格 <a class="header-anchor" href="#八、表格" aria-label="Permalink to &quot;八、表格&quot;">​</a></h2><p>语法:</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">表头|表头|表头</span></span>
<span class="line"><span style="color:#e1e4e8;">---|:--:|---:</span></span>
<span class="line"><span style="color:#e1e4e8;">内容|内容|内容</span></span>
<span class="line"><span style="color:#e1e4e8;">内容|内容|内容</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">第二行分割表头和内容。</span></span>
<span class="line"><span style="color:#e1e4e8;">- 有一个就行，为了对齐，多加了几个</span></span>
<span class="line"><span style="color:#e1e4e8;">文字默认居左</span></span>
<span class="line"><span style="color:#e1e4e8;">-两边加：表示文字居中</span></span>
<span class="line"><span style="color:#e1e4e8;">-右边加：表示文字居右</span></span>
<span class="line"><span style="color:#e1e4e8;">注：原生的语法两边都要用 | 包起来。此处省略</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">姓名|技能|排行</span></span>
<span class="line"><span style="color:#e1e4e8;">--|:--:|--:</span></span>
<span class="line"><span style="color:#e1e4e8;">刘备|哭|大哥</span></span>
<span class="line"><span style="color:#e1e4e8;">关羽|打|二哥</span></span>
<span class="line"><span style="color:#e1e4e8;">张飞|骂|三弟</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">表头|表头|表头</span></span>
<span class="line"><span style="color:#24292e;">---|:--:|---:</span></span>
<span class="line"><span style="color:#24292e;">内容|内容|内容</span></span>
<span class="line"><span style="color:#24292e;">内容|内容|内容</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">第二行分割表头和内容。</span></span>
<span class="line"><span style="color:#24292e;">- 有一个就行，为了对齐，多加了几个</span></span>
<span class="line"><span style="color:#24292e;">文字默认居左</span></span>
<span class="line"><span style="color:#24292e;">-两边加：表示文字居中</span></span>
<span class="line"><span style="color:#24292e;">-右边加：表示文字居右</span></span>
<span class="line"><span style="color:#24292e;">注：原生的语法两边都要用 | 包起来。此处省略</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">姓名|技能|排行</span></span>
<span class="line"><span style="color:#24292e;">--|:--:|--:</span></span>
<span class="line"><span style="color:#24292e;">刘备|哭|大哥</span></span>
<span class="line"><span style="color:#24292e;">关羽|打|二哥</span></span>
<span class="line"><span style="color:#24292e;">张飞|骂|三弟</span></span></code></pre></div><p>效果:</p><table><thead><tr><th>姓名</th><th style="text-align:center;">技能</th><th style="text-align:right;">排行</th></tr></thead><tbody><tr><td>刘备</td><td style="text-align:center;">哭</td><td style="text-align:right;">大哥</td></tr><tr><td>关羽</td><td style="text-align:center;">打</td><td style="text-align:right;">二哥</td></tr><tr><td>张飞</td><td style="text-align:center;">骂</td><td style="text-align:right;">三弟</td></tr></tbody></table><h2 id="九、代码块" tabindex="-1">九、代码块 <a class="header-anchor" href="#九、代码块" aria-label="Permalink to &quot;九、代码块&quot;">​</a></h2><ul><li>单行代码：代码之间分别用一个反引号包起来</li></ul><p>示例:</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">\`这是一行代码\`</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">\`这是一行代码\`</span></span></code></pre></div><p>效果: <code>这是一行代码</code></p><ul><li>代码块 语法: <strong>使用时把括号去掉</strong></li></ul><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">(\`\`\`)语言名</span></span>
<span class="line"><span style="color:#e1e4e8;">	代码</span></span>
<span class="line"><span style="color:#e1e4e8;">(\`\`\`)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">(\`\`\`)语言名</span></span>
<span class="line"><span style="color:#24292e;">	代码</span></span>
<span class="line"><span style="color:#24292e;">(\`\`\`)</span></span></code></pre></div><p>示例:以java为例</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">(\`\`\`)java</span></span>
<span class="line"><span style="color:#e1e4e8;">	public class HelloWorld{</span></span>
<span class="line"><span style="color:#e1e4e8;">		public static void main(Stringargs[]){</span></span>
<span class="line"><span style="color:#e1e4e8;">			System.out.println(&quot;Hello World!&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">(\`\`\`)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">(\`\`\`)java</span></span>
<span class="line"><span style="color:#24292e;">	public class HelloWorld{</span></span>
<span class="line"><span style="color:#24292e;">		public static void main(Stringargs[]){</span></span>
<span class="line"><span style="color:#24292e;">			System.out.println(&quot;Hello World!&quot;);</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">(\`\`\`)</span></span></code></pre></div><p>效果</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HelloWorld</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">[]){</span></span>
<span class="line"><span style="color:#E1E4E8;">		System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Hello World!&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HelloWorld</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">args</span><span style="color:#24292E;">[]){</span></span>
<span class="line"><span style="color:#24292E;">		System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Hello World!&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,71),t=[p];function o(c,i,r,d,y,h){return a(),n("div",null,t)}const b=s(l,[["render",o]]);export{u as __pageData,b as default};
