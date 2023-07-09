# ribbon刷新服务列表间隔和canal的坑

> ribbon有个参数可以用来调整刷新server list的时间间隔参数。

## ServerListRefreshInterval

`ribbon-loadbalancer-2.2.0-sources.jar!/com/netflix/client/config/CommonClientConfigKey.java`
```java
    public static final IClientConfigKey<Integer> ServerListRefreshInterval = new CommonClientConfigKey<Integer>("ServerListRefreshInterval"){};
```

## PollingServerListUpdater

`ribbon-loadbalancer-2.2.0-sources.jar!/com/netflix/loadbalancer/PollingServerListUpdater.java`

```java
    private static long getRefreshIntervalMs(IClientConfig clientConfig) {
        return clientConfig.get(CommonClientConfigKey.ServerListRefreshInterval, LISTOFSERVERS_CACHE_REPEAT_INTERVAL);
    }
    
    @Override
    public synchronized void start(final UpdateAction updateAction) {
        if (isActive.compareAndSet(false, true)) {
            final Runnable wrapperRunnable = new Runnable() {
                @Override
                public void run() {
                    if (!isActive.get()) {
                        if (scheduledFuture != null) {
                            scheduledFuture.cancel(true);
                        }
                        return;
                    }
                    try {
                        updateAction.doUpdate();
                        lastUpdated = System.currentTimeMillis();
                    } catch (Exception e) {
                        logger.warn("Failed one update cycle", e);
                    }
                }
            };
 
            scheduledFuture = getRefreshExecutor().scheduleWithFixedDelay(
                    wrapperRunnable,
                    initialDelayMs,
                    refreshIntervalMs,
                    TimeUnit.MILLISECONDS
            );
        } else {
            logger.info("Already active, no-op");
        }
    }

```

可以看到有个定时线程,每隔一定时间会去刷新服务的列表,因此,这个时间不要改的太长,默认应该是30s,公司的测试环境不知道是哪位大佬出于什么考虑改的,我反正已经改回去了 = =.




## canal的坑

公司用canal主要是因为有新旧两个系统,两个系统同时在运转,目前还没有完全迁移,因此用canal保证新旧系统数据的一致性,这次主要是修复一个楼层信息不同步的bug,问题是更新的时候有个状态字段被写死了,没有用kafka里消息体里的数据更新,这个小问题上周就修复了,自测通过了的,这周测试复测结果发现什么操作都同步不了.这使我一度陷入了自我怀疑....
然后去看监控的服务日志,发现确实是什么数据库的变更都检测不到了,因为不熟悉这套东西,看了半天也没看出来问题,只能求助我们头儿,然后据他说这个问题经常出现,然后就删了canal实例里面的meta.bat文件,然后运行./restart.sh,重启之后果然恢复正常了,具体啥原因我还没搞懂,日后研究明白了再补充


后续:canal提供了tsdb时序数据库,上次碰到的canal报错问题,是因为监控表的元数据跟现有数据不一致导致的,tsdb中会记录所有对监控的表的操作记录,但是有一张表加了两个字段(57+2)后,这两条alter语句不知道什么情况没有被记录到tsdb的history表中,导致监控到的表的列数不匹配,canal认为还是57列,实际为59,由于是测试环境,所以直接把这张表copy了一份然后把原表删了,再把copy的表改个名字就ok了