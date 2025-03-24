import{_ as i,c as a,o as n,a2 as l}from"./chunks/framework.CQECOx-R.js";const g=JSON.parse('{"title":"关于消息中间件MQ","description":"","frontmatter":{},"headers":[],"relativePath":"java/middleware/关于消息中间件MQ.md","filePath":"java/middleware/关于消息中间件MQ.md","lastUpdated":1742805674000}'),p={name:"java/middleware/关于消息中间件MQ.md"};function h(t,s,e,k,r,d){return n(),a("div",null,s[0]||(s[0]=[l(`<h1 id="关于消息中间件mq" tabindex="-1">关于消息中间件MQ <a class="header-anchor" href="#关于消息中间件mq" aria-label="Permalink to &quot;关于消息中间件MQ&quot;">​</a></h1><p><strong>本文以RabbitMQ为例</strong></p><h2 id="_1-为什么要使用mq" tabindex="-1">1.为什么要使用MQ <a class="header-anchor" href="#_1-为什么要使用mq" aria-label="Permalink to &quot;1.为什么要使用MQ&quot;">​</a></h2><p>这个问题也可以理解为MQ的作用,MQ的作用:</p><ul><li>异步:系统A中产生的一个数据,另外的系统BCD都需要对数据进行操作,不引入MQ时可以用A依次调用BCD的接口进行数据处理,这也就会耗费大量的时间,对于前台是无法接受的.如果引入MQ,可以将A系统的数据写入MQ,其他系统分别去消费数据,可以大大节省时间,优化体验</li><li>解耦:如上面所说的,不使用MQ时,需要在A系统的代码里分别调用BCD的接口,如果BCD的服务宕机就会对A系统产生影响,又或者BCD系统如果后期不需要这个数据了,那就要删除A系统中对应的代码,如果要增加E服务处理A的数据,那又要增加相应的E系统的代码,耦合严重.如果引入MQ,系统中不会存在太大影响,就算其他系统宕机,也不会对A产生影响</li><li>削峰:在高并发的情况下,如秒杀抢购活动,会在短时间内有大量请求涌入,如果流量太大,超过了系统的处理能力,可能就会导致我们的系统,数据库崩溃,可以将用户请求写入MQ,按照系统最大承载能力去处理请求,超过一定的阈值就将请求丢弃或给出错误提示</li></ul><h2 id="_2-消息队列的优缺点" tabindex="-1">2.消息队列的优缺点 <a class="header-anchor" href="#_2-消息队列的优缺点" aria-label="Permalink to &quot;2.消息队列的优缺点&quot;">​</a></h2><p>优点：</p><ul><li>对结构复杂的操作进行解耦，降低了系统的维护成本</li><li>对一个可以异步进行的操作进行异步化，可以减少响应时间</li><li>对高并发请求进行削峰，保证系统稳定性</li></ul><p>缺点：</p><ul><li><p>系统复杂度提高。需要考虑MQ的各种情况，如消息丢失，重复消费，顺序消费等</p></li><li><p>一致性问题。如A系统返回了成功的结果，BC系统成功了但D系统失败了</p></li><li><p>系统可用性问题。如果MQ宕机，可能会导致系统的崩溃</p></li></ul><h2 id="_3-如何保证消息队列高可用" tabindex="-1">3.如何保证消息队列高可用 <a class="header-anchor" href="#_3-如何保证消息队列高可用" aria-label="Permalink to &quot;3.如何保证消息队列高可用&quot;">​</a></h2><p>RabbitMQ有三种模式：单机、普通集群、镜像集群</p><p>**普通集群：**就是在多台服务器上启动多个rabbitmq实例，但是创建的队列只会放在一个rabbitmq实例中，其他的实例会同步这个队列的元数据。消费的时候如果连接了另一个实例，也会从拥有队列的那个实例获取消息然后返回。</p><p><img src="https://storyxc.com/images/blog//8494967-4832d2e63865764d.webp" alt="84949674832d2e63865764d.webp"></p><p>这种方案并不能做到高可用</p><p>**镜像集群：**真正的高可用模式，创建的queue无论元数据还是消息数据都存放在多个实例中，每次写消息到queue时，都会自动把消息同步到多个queue中。</p><p><img src="https://storyxc.com/images/blog//8494967-3a4af86b205cebcf.webp" alt="84949673a4af86b205cebcf.webp"></p><p>优点：实现了高可用，任何一台机器宕机，其他机器能继续使用</p><p>缺点：1、性能消耗较大，所有机器都要进行消息同步 2、没有扩展性，如果有一个queue负载很重，就算增加机器，新增的机器也包含这个queue的全部数据，</p><h2 id="_4-如何保证消息不重复消费" tabindex="-1">4.如何保证消息不重复消费 <a class="header-anchor" href="#_4-如何保证消息不重复消费" aria-label="Permalink to &quot;4.如何保证消息不重复消费&quot;">​</a></h2><p>保证消费的幂等性,让每条消息带一个全局唯一的bizId,具体过程:</p><p>1、消费者获取消息后先根据redis/db是否有该消息</p><p>2、如果不存在，则正常消费，消费完毕后写入redis/db</p><p>3、如果已经存在，证明已经消费过，直接丢弃</p><h2 id="_5-如何保证消息不丢失" tabindex="-1">5.如何保证消息不丢失 <a class="header-anchor" href="#_5-如何保证消息不丢失" aria-label="Permalink to &quot;5.如何保证消息不丢失&quot;">​</a></h2><p>原则：数据不能多也不能少，不能多是指不重复消费，不能少是指不能丢数据</p><p>丢失数据场景：</p><ul><li>生产者丢失数据：生产者发送数据到mq时可能因为网络波动丢失数据</li><li>rabbitmq丢失数据：如果没有开启rabbitmq持久化，一旦mq重启，数据就丢了</li><li>消费者丢失数据：消费者刚消费到还没开始处理，消费者就挂掉了，重启后mq就认为已经消费过了，丢掉了数据</li></ul><p>解决方案：</p><p><strong>针对生产者丢失数据：</strong></p><ul><li>rabbitmq事务，生产者发送消息前开启事务，如果消息没有发送成功生产者会收到异常报错，这时可以回滚并重试发送</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">channel.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">txSelect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //发送消息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Exception </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  channel.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rollback</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //重新发送</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>**缺点：**开启事务会变成阻塞操作，造成生产者的性能和吞吐量的下降</p><ul><li>把channel设置成confirm模式，每次写的消息都会分配一个唯一的id，如果mq接到消息就会回调生产者的接口，通知消息已经收到，如果mq接受报错，也会回调通知，这样可以重试发送数据，伪代码如下</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//开启confirm模式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">channel.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">confirm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//发送消息</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">在生产者服务提供一个回调接口的实现</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(String messageId）{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	//已经收到消息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> nack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(String messageId){</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //重发消息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>**针对mq丢失数据：**开启mq的持久化，将交换机/队列的durable设置为true，表示交换机/队列时持久化的，在服务崩溃或重启后无需重新创建</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RabbitListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     bindings</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">QueueBinding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Queue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;dynamicQueue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">autoDelete</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;false&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">durable</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;true&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            exchange</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Exchange</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;exchange&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">durable</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;true&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ExchangeTypes.DIRECT),</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            key</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;routingKey&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> dynamicQueue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Message message, Channel channel) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;接收消息：&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(message.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getBody</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>如果消息想从rabbitmq崩溃中回复，消息必须实现：</p><ul><li>消息发送前，把投递模式设置为2（持久）来标记为持久消息</li><li>将消息发送到持久交换机</li><li>将消息发送到持久队列</li></ul><p><strong>针对消费者丢失数据</strong>：关闭消费者的autoAck机制，然后每次处理完一条消息，主动发送ack给rabbitmq，如果此时还没发送ack就宕机，mq没有收到ack消息，就会重新将消息重新分配给其他</p><p>强制消费者手动确认：</p><div class="language-yml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spring.rabbitmq.listener.simple.acknowledge-mode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">manual</span></span></code></pre></div><p>消费者手动ack：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">channel.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">basicAck</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(message.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getMessageProperties</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getDeliveryTag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h2 id="_6-如何保证消息的顺序消费" tabindex="-1">6.如何保证消息的顺序消费 <a class="header-anchor" href="#_6-如何保证消息的顺序消费" aria-label="Permalink to &quot;6.如何保证消息的顺序消费&quot;">​</a></h2><p>一个queue一个consumer</p><h2 id="_7-消息积压" tabindex="-1">7.消息积压 <a class="header-anchor" href="#_7-消息积压" aria-label="Permalink to &quot;7.消息积压&quot;">​</a></h2><p>1.先修复consumer的问题,确保恢复消费速度,然后停掉所有consumer</p><p>2.临时建立数十倍的queue</p><p>3.写一个临时分发的consumer程序,部署上去消费积压的消息,消费不做处理,直接轮询写入上一步建好的queue中</p><p>4.重新部署consumer(机器加倍),每一批consumer消费一个临时queue</p>`,51)]))}const c=i(p,[["render",h]]);export{g as __pageData,c as default};
