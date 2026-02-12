import{_ as p,o as s,c as n,a2 as e}from"./chunks/framework.BGfUC0LL.js";const h=JSON.parse('{"title":"cpu占用率高排查思路","description":"","frontmatter":{},"headers":[],"relativePath":"java/others/cpu占用率高排查思路.md","filePath":"java/others/cpu占用率高排查思路.md","lastUpdated":1770864474000}'),t={name:"java/others/cpu占用率高排查思路.md"};function c(o,a,d,i,l,r){return s(),n("div",null,[...a[0]||(a[0]=[e(`<h1 id="cpu占用率高排查思路" tabindex="-1">cpu占用率高排查思路 <a class="header-anchor" href="#cpu占用率高排查思路" aria-label="Permalink to &quot;cpu占用率高排查思路&quot;">​</a></h1><p>1.<code>top</code>命令找出cpu占用率高的进程pid</p><p>2.<code>top -H -p pid</code> 找出cpu占用率高的线程tid</p><p>3.<code>printf &quot;%x&quot; tid</code>命令打印出tid的十六进制形式</p><p>4.<code>jstack pid | grep 十六进制tid -A 行数</code>打印堆栈信息 或者 <code>jstack pid &gt;&gt; log.txt</code>将堆栈信息保存在文件中，再从文件中查找对应线程的信息</p><p>5.<code>jstat -gcutil pid 5000</code> 每隔5秒打印一次gc情况</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>S0：幸存1区当前使用比例</span></span>
<span class="line"><span>S1：幸存2区当前使用比例</span></span>
<span class="line"><span>E：伊甸园区使用比例</span></span>
<span class="line"><span>O：老年代使用比例</span></span>
<span class="line"><span>M：元数据区使用比例</span></span>
<span class="line"><span>CCS：压缩使用比例</span></span>
<span class="line"><span>YGC：年轻代垃圾回收次数</span></span>
<span class="line"><span>FGC：老年代垃圾回收次数</span></span>
<span class="line"><span>FGCT：老年代垃圾回收消耗时间</span></span>
<span class="line"><span>GCT：垃圾回收消耗总时间</span></span></code></pre></div><p>6.<code>jmap -heap pid</code> 查看堆内存详细信息</p><p>7.<code>jmap -histo pid &gt; xxx.log</code> 输出gc日志到文件</p>`,9)])])}const _=p(t,[["render",c]]);export{h as __pageData,_ as default};
