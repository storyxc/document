import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.4a66d6f9.js";const D=JSON.parse('{"title":"docker-compose语法","description":"","frontmatter":{},"headers":[],"relativePath":"docker/docker-compose语法.md","filePath":"docker/docker-compose语法.md","lastUpdated":1704522520000}'),p={name:"docker/docker-compose语法.md"},o=l(`<h1 id="docker-compose语法" tabindex="-1">docker-compose语法 <a class="header-anchor" href="#docker-compose语法" aria-label="Permalink to &quot;docker-compose语法&quot;">​</a></h1><h2 id="基础模板" tabindex="-1">基础模板 <a class="header-anchor" href="#基础模板" aria-label="Permalink to &quot;基础模板&quot;">​</a></h2><blockquote><p><a href="https://docs.docker.com/compose/compose-file/03-compose-file/" target="_blank" rel="noreferrer">https://docs.docker.com/compose/compose-file/03-compose-file/</a></p></blockquote><div class="language-yml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;3.8&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># version是compose文件格式版本号 需要和Docker Engine对应 https://docs.docker.com/compose/compose-file/compose-file-v3/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">service1</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">image_name:version</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#指定镜像</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">service1</span><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;">#容器名</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">: #</span><span style="color:#9ECBFF;">指定环境变量</span><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">A=1</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">B=2</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">always</span><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">#重启策略</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#数据卷挂载</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/etc/localtime:/etc/localtime:ro</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 挂载宿主机文件</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">data:/opt/data</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 具名卷挂载</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#端口映射配置</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;6610:6610&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;6611:6611&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">privileged</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 将服务容器配置为以提升的权限运行</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">links</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#定义到另一个服务中的容器的网络链接,可以在此容器直接用服务名访问另一个容器，links也有服务之间的隐式依赖关系，因此也决定了服务启动的顺序。</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">service2</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">env_file</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">./a.env</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">./b.env</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">devices</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;/dev/ttyUSB0:/dev/ttyUSB0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;/dev/sda:/dev/xvda:rwm&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">dns</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#79B8FF;">8.8.8.8</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">service2</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">build</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#构建配置</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">context</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">.</span><span style="color:#E1E4E8;">               </span><span style="color:#6A737D;">#指定包含Dockerfile的目录或一个git仓库的url</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">dockerfile</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">webapp.Dockerfile</span><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">#指定要使用的Dockerfile名称，默认找Dockerfile，和dockerfile_inline参数不能同时使用</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">dockerfile_inline</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#直接在compose文件里写Dockerfile指令 和dockerfile参数不能同时使用</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">FROM xxx</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">RUN some command</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">service2</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">network_mode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;host&quot;</span><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#配置网络模式，none(禁用所有容器网络)/host(使用宿主接口)/service:{name}(只能访问指定服务)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#指定容器连接的docker网络</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">netA</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">netB</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">depends_on</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#依赖某个服务，决定了服务的启动和关闭顺序</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">service3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">netA</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">netB</span><span style="color:#E1E4E8;">:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;3.8&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># version是compose文件格式版本号 需要和Docker Engine对应 https://docs.docker.com/compose/compose-file/compose-file-v3/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">service1</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">image_name:version</span><span style="color:#24292E;">  </span><span style="color:#6A737D;">#指定镜像</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">service1</span><span style="color:#24292E;">       </span><span style="color:#6A737D;">#容器名</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">: #</span><span style="color:#032F62;">指定环境变量</span><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">A=1</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">B=2</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">always</span><span style="color:#24292E;">            </span><span style="color:#6A737D;">#重启策略</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#数据卷挂载</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/etc/localtime:/etc/localtime:ro</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 挂载宿主机文件</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">data:/opt/data</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 具名卷挂载</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#端口映射配置</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;6610:6610&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;6611:6611&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">privileged</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 将服务容器配置为以提升的权限运行</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">links</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#定义到另一个服务中的容器的网络链接,可以在此容器直接用服务名访问另一个容器，links也有服务之间的隐式依赖关系，因此也决定了服务启动的顺序。</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">service2</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">env_file</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">./a.env</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">./b.env</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">devices</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;/dev/ttyUSB0:/dev/ttyUSB0&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;/dev/sda:/dev/xvda:rwm&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">dns</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#005CC5;">8.8.8.8</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">service2</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">build</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#构建配置</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">context</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">.</span><span style="color:#24292E;">               </span><span style="color:#6A737D;">#指定包含Dockerfile的目录或一个git仓库的url</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">dockerfile</span><span style="color:#24292E;">: </span><span style="color:#032F62;">webapp.Dockerfile</span><span style="color:#24292E;">   </span><span style="color:#6A737D;">#指定要使用的Dockerfile名称，默认找Dockerfile，和dockerfile_inline参数不能同时使用</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">dockerfile_inline</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#直接在compose文件里写Dockerfile指令 和dockerfile参数不能同时使用</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">FROM xxx</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">RUN some command</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">service2</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">network_mode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;host&quot;</span><span style="color:#24292E;">      </span><span style="color:#6A737D;">#配置网络模式，none(禁用所有容器网络)/host(使用宿主接口)/service:{name}(只能访问指定服务)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">networks</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#指定容器连接的docker网络</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">netA</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">netB</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">depends_on</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#依赖某个服务，决定了服务的启动和关闭顺序</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">service3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">netA</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">netB</span><span style="color:#24292E;">:</span></span></code></pre></div>`,4),e=[o];function c(t,r,E,y,i,d){return n(),a("div",null,e)}const m=s(p,[["render",c]]);export{D as __pageData,m as default};
