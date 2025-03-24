import{_ as a,c as o,o as p,a2 as l}from"./chunks/framework.CQECOx-R.js";const h=JSON.parse('{"title":"kafka重复消费问题处理","description":"","frontmatter":{},"headers":[],"relativePath":"java/middleware/kakfa重复消费问题处理.md","filePath":"java/middleware/kakfa重复消费问题处理.md","lastUpdated":1742805674000}'),t={name:"java/middleware/kakfa重复消费问题处理.md"};function s(n,e,r,i,c,m){return p(),o("div",null,e[0]||(e[0]=[l('<h1 id="kafka重复消费问题处理" tabindex="-1">kafka重复消费问题处理 <a class="header-anchor" href="#kafka重复消费问题处理" aria-label="Permalink to &quot;kafka重复消费问题处理&quot;">​</a></h1><h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>最近在支援开发公司的财务对账系统，其中涉及一个功能点是某个对账单创建开票申请后，需要更新对账单的开票申请状态（未申请，部分申请，全部申请），这里使用了kafka,当创建开票申请后生产者即发送一条消息，消费者再去进行消费。</p><p>然后就碰到个问题，生产者这里是有事务的，因此会出现事务还没提交，开票申请数据还没有写入到数据库中，但是消息已经发送到kafka了，此时消费者直接消费消息时是查询不到这批开票申请数据的，就会出现创建开票申请业务实际成功了，但是对账单的开票申请状态仍为未申请。所以用了一个笨方法解决这个问题，在消费者线程中<code>sleep(5000)</code>，来确保消费到消息时生产者的事务已经提交。</p><p>在测试环境测试少量账单&amp;开票申请数据时是完全没有问题的，但是上了生产之后会有批量的账单数据推送过来，创建了大量的开票申请。这时候就发现异常情况了：消息队列中堆积了大量的消息，虽然日志一直还在正常跑，但是offset一直没变，并且过一段时间还会重复消费已经跑过日志的消息。</p><h2 id="重复消费的原因" tabindex="-1">重复消费的原因 <a class="header-anchor" href="#重复消费的原因" aria-label="Permalink to &quot;重复消费的原因&quot;">​</a></h2><p>消费重复消费的根本原因都是：已经消费了数据，但是offset并没有提交。</p><p>网上找到的资料里有一段这么写的：</p><blockquote><p><strong>kafka消息重复消费很大一部分原因在于发生了再均衡。</strong></p><p>1）消费者宕机、重启等。导致消息已经消费但是没有提交offset。</p><p>2）消费者使用自动提交offset，但当还没有提交的时候，有新的消费者加入或者移除，发生了rebalance。再次消费的时候，消费者会根据提交的偏移量来，于是重复消费了数据。</p><p>3）消息处理耗时，或者消费者拉取的消息量太多，处理耗时，超过了max.poll.interval.ms的配置时间，导致认为当前消费者已经死掉，触发再均衡。</p></blockquote><p>日志：</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>This member will leave the group because consumer poll timeout has expired. This means the time between subsequent calls to poll() was longer than the configured max.poll.interval.ms, which typically implies that the poll loop is spending too much time processing messages. You can address this either by increasing max.poll.interval.ms or by reducing the maximum size of batches returned in poll() with max.poll.records.</span></span></code></pre></div><p>这里我碰到的情况就是第三种，因为消费者consumer每次拉取的消息较多，且有线程<code>sleep</code>的操作，所以导致处理超时了，超过<code>max.poll.interval.ms</code>的时间就会触发<code>rebalance</code>,然后就会重新分配消费者再次消费上次拉取的那批数据，这就是重复消费的原因。</p><h2 id="处理方案" tabindex="-1">处理方案 <a class="header-anchor" href="#处理方案" aria-label="Permalink to &quot;处理方案&quot;">​</a></h2><p>了解了超时的原因，就好解决了，根据日志中的提示，我们可以调整<code>max.poll.interval.ms</code>和<code>max.poll.records</code>两个参数</p><ol><li>增加<code>max.poll.interval.ms</code>的值，默认值为300000,单位是ms，即5分钟，可以调整为10分钟</li><li>减少<code>max.poll.records</code>的值，默认是500，可以调整为100</li><li>减少业务代码中线程休眠的时间</li></ol><p>参考资料：</p><ol><li><a href="https://docs.confluent.io/platform/current/installation/configuration/consumer-configs.html" target="_blank" rel="noreferrer">https://docs.confluent.io/platform/current/installation/configuration/consumer-configs.html</a></li><li><a href="https://www.cnblogs.com/yangyongjie/p/14675119.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/yangyongjie/p/14675119.html</a></li></ol><blockquote><p><strong>Kafka知识回顾</strong></p><p>1、消费者常见参数</p><p>①：fetch.min.bytes，配置Consumer一次拉取请求中能从Kafka中拉取的最小数据量，默认为1B，如果小于这个参数配置的值，就需要进行等待，直到数据量满足这个参数的配置大小。调大可以提交吞吐量，但也会造成延迟</p><p>②：fetch.max.bytes，一次拉取数据的最大数据量，默认为52428800B，也就是50M，但是如果设置的值过小，甚至小于每条消息的值，实际上也是能消费成功的</p><p>③：fetch.wait.max.ms，若是不满足fetch.min.bytes时，等待消费端请求的最长等待时间，默认是500ms</p><p>④：max.poll.records，单次poll调用返回的最大消息记录数，如果处理逻辑很轻量，可以适当提高该值。一次从kafka中poll出来的数据条数,max.poll.records条数据需要在在session.timeout.ms这个时间内处理完，默认值为500</p><p>⑤：consumer.poll(100) ，100 毫秒是一个超时时间，一旦拿到足够多的数据（fetch.min.bytes 参数设置），consumer.poll(100)会立即返回 ConsumerRecords&lt;String, String&gt; records。如果没有拿到足够多的数据，会阻塞100ms，但不会超过100ms就会返回</p><p>⑥：session. timeout. ms ，默认值是10s，该参数是 Consumer Group 主动检测 (组内成员comsummer)崩溃的时间间隔。若超过这个时间内没有收到心跳报文，则认为此消费者已经下线。将触发再均衡操作</p><p>⑦：max.poll.interval.ms，两次拉取消息的间隔，默认5分钟；通过消费组管理消费者时，该配置指定拉取消息线程最长空闲时间，若超过这个时间间隔没有发起poll操作，则消费组认为该消费者已离开了消费组，将进行再均衡操作（将分区分配给组内其他消费者成员）</p><p>若超过这个时间则报如下异常：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>org.apache.kafka.clients.consumer.CommitFailedException: Commit cannot be completed since the group has already rebalanced and assigned the partitions to another member. This means that the time between subsequent calls to poll() was longer than the configured max.poll.interval.ms, which typically implies that the poll loop is spending too much time message processing. You can address this either by increasing the session timeout or by reducing the maximum size of batches returned in poll() with max.poll.records.</span></span></code></pre></div><p>即：无法完成提交，因为组已经重新平衡并将分区分配给另一个成员。这意味着对poll()的后续调用之间的时间比配置的max.poll.interval.ms长，这通常意味着poll循环花费了太多的时间来处理消息。</p><p>可以通过增加max.poll.interval.ms来解决这个问题，也可以通过减少在poll()中使用max.poll.records返回的批的最大大小来解决这个问题</p><p>2、poll机制</p><p>①：每次poll的消息处理完成之后再进行下一次poll，是同步操作</p><p>②：每次poll之前检查是否可以进行位移提交，如果可以，那么就会提交上一次轮询的位移</p><p>③：每次poll时，consumer都将尝试使用上次消费的offset作为起始offset，然后依次拉取消息</p><p>④：poll(long timeout)，timeout指等待轮询缓冲区的数据所花费的时间，单位是毫秒</p><p>3、再均衡 rebalance</p><p>将分区的所有权从一个消费者转移到其他消费者的行为称为再均衡（重平衡，rebalance）。</p><p>消费者通过向组织协调者（kafka broker）发送心跳来维护自己是消费者组的一员并确认其拥有的分区。对于不同不的消费群体来说，其组织协调者可以是不同的。只要消费者定期发送心跳，就会认为 消费者是存活的并处理其分区中的消息。当消费者检索记录或者提交它所消费的记录时就会发送心跳。</p><p>如果过了一段时间Kafka停止发送心跳了，会话（session）就会过期，组织协调者就会认为这个consumer已经死亡，就会触发一次重平衡。如果消费者宕机并且停止发送消息，组织协调者会等待几秒钟，确认它死亡了才会触发重平衡。在这段时间里，死亡的消费者将不处理任何消息。在清理消费者时，消费者将通知协调者它要离开群组，组织协调者会触发一次重平衡，尽量降低处理停顿。</p><p>重平衡是一把双刃剑，它为消费者群组带来高可用性和伸缩性的同时，还有有一些明显的缺点(bug)，而这些 bug 到现在社区还无法修改。也就是说，在重平衡期间，消费者组中的消费者实例都会停止消费（Stop The World），等待重平衡的完成。而且重平衡这个过程很慢。</p><p></p><p>触发再均衡的情况：</p><p>①：有新的消费者加入消费组、或已有消费者主动离开组</p><p>②：消费者超过session时间未发送心跳（已有 consumer 崩溃了）</p><p>③：一次poll()之后的消息处理时间超过了max.poll.interval.ms的配置时间，因为一次poll()处理完才会触发下次poll() （已有 consumer 崩溃了）</p><p>④：订阅主题数发生变更</p><p>⑤：订阅主题的分区数发生变更</p><p><strong>三、重复消费的解决方案</strong></p><p>由于网络问题，重复消费不可避免，因此，消费者需要实现消费幂等。</p><p>方案：</p><p>①：消息表</p><p>②：数据库唯一索引</p><p>③：缓存消费过的消息id</p><p><strong>四、项目kafka重复消费的排查</strong></p><p>重复消费问题1：</p><p>每次拉取的消息记录数max.poll.records为100，poll最大拉取间隔max.poll.interval.ms为 300s，消息处理过于耗时导致时长大于了这个值，导致再均衡发生重复消费</p><p>解决办法：</p><p>①：减少每次拉取的消息记录数和增大poll之间的时间间隔</p><p>②：拉取到消息之后异步处理（保证成功消费）</p></blockquote>',18)]))}const u=a(t,[["render",s]]);export{h as __pageData,u as default};
