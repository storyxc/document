# springcloud优雅下线服务



## 问题场景

线上问题需要紧急修复部署，但是服务一直在跑，网关还会一直往服务中路由请求进行处理，如果直接停掉服务，客户端会出现业务中断的问题。因此需要在替换更新前先手动下线服务，这样用户请求不会被分发到下线的节点上，就可以直接进行更新而不影响用户体验。



## 实现

### 查询注册中心中服务的状态

```bash
curl -GET -u eureka_username:eureka_password http://eureka_ip:eureka_port/eureka/apps/服务名称/实例ip:实例名称:实例port
```

例如

```bash
curl -GET -u admin:admin123 http://127.0.0.1:19991/eureka/apps/app-platform/127.0.0.1:app-platform-1.0.0-SNAPSHOT:8001
```

#### 结果

```xml
<instance>
  <instanceId>127.0.0.1:app-platform-2.0.0-SNAPSHOT:8001</instanceId>
  <hostName>127.0.0.1</hostName>
  <app>app-platform</app>
  <ipAddr>127.0.0.1</ipAddr>
  <status>UP</status>  # 状态为在线
  <overriddenstatus>UNKNOWN</overriddenstatus> # 重写状态为空
  <port enabled="true">8001</port>
  <securePort enabled="false">443</securePort>
  <countryId>1</countryId>
  <dataCenterInfo class="com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo">
    <name>MyOwn</name>
  </dataCenterInfo>
  <leaseInfo>
    <renewalIntervalInSecs>10</renewalIntervalInSecs>
    <durationInSecs>30</durationInSecs>
    <registrationTimestamp>1636639654493</registrationTimestamp>
    <lastRenewalTimestamp>1636961178498</lastRenewalTimestamp>
    <evictionTimestamp>0</evictionTimestamp>
    <serviceUpTimestamp>1636639654493</serviceUpTimestamp>
  </leaseInfo>
  <metadata>
    <management.port>8001</management.port>
    <nodeId>127.0.0.1_kkg</nodeId>
  </metadata>
  <homePageUrl>http://127.0.0.1:8001/</homePageUrl>
  <statusPageUrl>http://127.0.0.1:8001/actuator/info</statusPageUrl>
  <healthCheckUrl>http://127.0.0.1:8001/actuator/health</healthCheckUrl>
  <vipAddress>app-platform</vipAddress>
  <secureVipAddress>app-platform</secureVipAddress>
  <isCoordinatingDiscoveryServer>false</isCoordinatingDiscoveryServer>
  <lastUpdatedTimestamp>1636639654493</lastUpdatedTimestamp>
  <lastDirtyTimestamp>1636639654480</lastDirtyTimestamp>
  <actionType>ADDED</actionType>
</instance>
```

### 通知注册中心服务下线



```bash
curl -i -X PUT -u eureka_username:eureka_password http://eureka_ip:eureka_port/eureka/apps/服务名称/实例ip:实例名称:实例port/status?value=OUT_OF_SERVICE
```

例如：

```bash
curl -i -X PUT admin:admin123 http://127.0.0.1:19991/eureka/apps/app-platform/127.0.0.1:app-platform-1.0.0-SNAPSHOT:8001/status?value=OUT_OF_SERVICE
```

#### 结果

```bash
HTTP/1.1 200 # 请求成功
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
X-Frame-Options: DENY
Content-Type: application/xml
Content-Length: 0
Date: Mon, 15 Nov 2021 07:30:32 GMT
```

#### 再次查询服务状态

```xml
<instance>
  <instanceId>127.0.0.1:app-platform-2.0.0-SNAPSHOT:8001</instanceId>
  <hostName>127.0.0.1</hostName>
  <app>app-platform</app>
  <ipAddr>127.0.0.1</ipAddr>
  <status>OUT_OF_SERVICE</status> # 服务状态-已下线
  <overriddenstatus>OUT_OF_SERVICE</overriddenstatus> # 重写状态为已下线
  <port enabled="true">8001</port>
  <securePort enabled="false">443</securePort>
  <countryId>1</countryId>
  <dataCenterInfo class="com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo">
    <name>MyOwn</name>
  </dataCenterInfo>
  <leaseInfo>
    <renewalIntervalInSecs>10</renewalIntervalInSecs>
    <durationInSecs>30</durationInSecs>
    <registrationTimestamp>1636639654493</registrationTimestamp>
    <lastRenewalTimestamp>1636961468691</lastRenewalTimestamp>
    <evictionTimestamp>0</evictionTimestamp>
    <serviceUpTimestamp>1636639654493</serviceUpTimestamp>
  </leaseInfo>
  <metadata>
    <management.port>8001</management.port>
    <nodeId>127.0.0.1_kkg</nodeId>
  </metadata>
  <homePageUrl>http://127.0.0.1:8001/</homePageUrl>
  <statusPageUrl>http://127.0.0.1:8001/actuator/info</statusPageUrl>
  <healthCheckUrl>http://127.0.0.1:8001/actuator/health</healthCheckUrl>
  <vipAddress>app-platform</vipAddress>
  <secureVipAddress>app-platform</secureVipAddress>
  <isCoordinatingDiscoveryServer>false</isCoordinatingDiscoveryServer>
  <lastUpdatedTimestamp>1636961432181</lastUpdatedTimestamp>
  <lastDirtyTimestamp>1636639654480</lastDirtyTimestamp>
  <actionType>MODIFIED</actionType>
</instance>
```

可以看到此时，服务状态为已经下线，不过还是要等到网关服务不再路由请求到该服务时再停掉服务。



### 通知注册中心服务上线

```bash
curl -i -X DELETE -u eureka_username:eureka_password http://eureka_ip:eureka_port/eureka/apps/服务名称/实例ip:实例名称:实例port/status
```

例如：

```bash
curl -i -X DELETE -u admin:admin123 http://127.0.0.1:19991/eureka/apps/app-platform/127.0.0.1:app-platform-1.0.0-SNAPSHOT:8001/status
```



#### 结果

```bash
HTTP/1.1 200 # 请求成功
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
X-Frame-Options: DENY
Content-Type: application/xml
Content-Length: 0
Date: Mon, 15 Nov 2021 07:37:11 GMT
```

#### 再次查询服务状态

```xml
<instance>
  <instanceId>127.0.0.1:app-platform-2.0.0-SNAPSHOT:8001</instanceId>
  <hostName>127.0.0.1</hostName>
  <app>app-platform</app>
  <ipAddr>127.0.0.1</ipAddr>
  <status>UP</status> # 此时服务已上线 如果通知后立刻查询,状态可能会是unknown，隔一段时间再查询即可
  <overriddenstatus>UNKNOWN</overriddenstatus>
  <port enabled="true">8001</port>
  <securePort enabled="false">443</securePort>
  <countryId>1</countryId>
  <dataCenterInfo class="com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo">
    <name>MyOwn</name>
  </dataCenterInfo>
  <leaseInfo>
    <renewalIntervalInSecs>10</renewalIntervalInSecs>
    <durationInSecs>30</durationInSecs>
    <registrationTimestamp>1636961828894</registrationTimestamp>
    <lastRenewalTimestamp>1636961861799</lastRenewalTimestamp>
    <evictionTimestamp>0</evictionTimestamp>
    <serviceUpTimestamp>1636639654493</serviceUpTimestamp>
  </leaseInfo>
  <metadata>
    <management.port>8001</management.port>
    <nodeId>127.0.0.1_kkg</nodeId>
  </metadata>
  <homePageUrl>http://127.0.0.1:8001/</homePageUrl>
  <statusPageUrl>http://127.0.0.1:8001/actuator/info</statusPageUrl>
  <healthCheckUrl>http://127.0.0.1:8001/actuator/health</healthCheckUrl>
  <vipAddress>app-platform</vipAddress>
  <secureVipAddress>app-platform</secureVipAddress>
  <isCoordinatingDiscoveryServer>false</isCoordinatingDiscoveryServer>
  <lastUpdatedTimestamp>1636961828894</lastUpdatedTimestamp>
  <lastDirtyTimestamp>1636961828889</lastDirtyTimestamp>
  <actionType>ADDED</actionType>
</instance>
```

