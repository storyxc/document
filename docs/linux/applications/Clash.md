# Clash

> Repo：https://github.com/Dreamacro/clash
>
> Premium Binary：https://github.com/Dreamacro/clash/releases/tag/premium
>
> Configuration：https://dreamacro.github.io/clash/configuration/configuration-reference.html



## 配置

- 下载最新版的premium内核二进制文件

- 编写配置文件

  ```yaml
  # /etc/clash/config.yaml
  
  # (HTTP and SOCKS5 in one port)
  mixed-port: 7890
  # RESTful API for clash
  external-controller: 127.0.0.1:9090
  secret: 123456
  allow-lan: false
  mode: rule
  log-level: warning
  
  tun:
    enable: true
    stack: system # system gvisor
    auto-route: true
    auto-detect-interface: true
    dns-hijack:
      - tcp://any:53 # DNS hijacking might result in a failure, if the system DNS is at a private IP address (since auto-route does not capture private network traffic).
  
  dns:
    enable: true
    listen: 0.0.0.0:7874
    ipv6: false
    default-nameserver:
      - 114.114.114.114
    nameserver:
      - 114.114.114.114
    fallback:
      - 8.8.8.8
    enhanced-mode: fake-ip # fake-ip redir-host
    fake-ip-range: 198.18.0.1/16
    fake-ip-filter:
    - "*.lan"
    - "*.localdomain"
    - "*.example"
    - "*.invalid"
    - "*.localhost"
    - "*.test"
    - "*.local"
    - "*.home.arpa"
    - time.*.com
    - time.*.gov
    - time.*.edu.cn
    - time.*.apple.com
    - time-ios.apple.com
    - time1.*.com
    - time2.*.com
    - time3.*.com
    - time4.*.com
    - time5.*.com
    - time6.*.com
    - time7.*.com
    - ntp.*.com
    - ntp1.*.com
    - ntp2.*.com
    - ntp3.*.com
    - ntp4.*.com
    - ntp5.*.com
    - ntp6.*.com
    - ntp7.*.com
    - "*.time.edu.cn"
    - "*.ntp.org.cn"
    - "+.pool.ntp.org"
    - time1.cloud.tencent.com
    - music.163.com
    - "*.music.163.com"
    - "*.126.net"
    - musicapi.taihe.com
    - music.taihe.com
    - songsearch.kugou.com
    - trackercdn.kugou.com
    - "*.kuwo.cn"
    - api-jooxtt.sanook.com
    - api.joox.com
    - joox.com
    - y.qq.com
    - "*.y.qq.com"
    - streamoc.music.tc.qq.com
    - mobileoc.music.tc.qq.com
    - isure.stream.qqmusic.qq.com
    - dl.stream.qqmusic.qq.com
    - aqqmusic.tc.qq.com
    - amobile.music.tc.qq.com
    - "*.xiami.com"
    - "*.music.migu.cn"
    - music.migu.cn
    - "+.msftconnecttest.com"
    - "+.msftncsi.com"
    - localhost.ptlogin2.qq.com
    - localhost.sec.qq.com
    - "+.qq.com"
    - "+.tencent.com"
    - "+.srv.nintendo.net"
    - "*.n.n.srv.nintendo.net"
    - "+.stun.playstation.net"
    - xbox.*.*.microsoft.com
    - "*.*.xboxlive.com"
    - xbox.*.microsoft.com
    - xnotify.xboxlive.com
    - "+.battlenet.com.cn"
    - "+.wotgame.cn"
    - "+.wggames.cn"
    - "+.wowsgame.cn"
    - "+.wargaming.net"
    - proxy.golang.org
    - stun.*.*
    - stun.*.*.*
    - "+.stun.*.*"
    - "+.stun.*.*.*"
    - "+.stun.*.*.*.*"
    - "+.stun.*.*.*.*.*"
    - heartbeat.belkin.com
    - "*.linksys.com"
    - "*.linksyssmartwifi.com"
    - mobileoc.music.tc.qq.com
    - isure.stream.qqmusic.qq.com
    - dl.stream.qqmusic.qq.com
    - aqqmusic.tc.qq.com
    - amobile.music.tc.qq.com
    - "*.xiami.com"
    - "*.music.migu.cn"
    - music.migu.cn
    - "+.msftconnecttest.com"
    - "+.msftncsi.com"
    - localhost.ptlogin2.qq.com
    - localhost.sec.qq.com
    - "+.qq.com"
    - "+.tencent.com"
    - "+.srv.nintendo.net"
    - "*.n.n.srv.nintendo.net"
    - "+.stun.playstation.net"
    - xbox.*.*.microsoft.com
    - "*.*.xboxlive.com"
    - xbox.*.microsoft.com
    - xnotify.xboxlive.com
    - "+.battlenet.com.cn"
    - "+.wotgame.cn"
    - "+.wggames.cn"
    - "+.wowsgame.cn"
    - "+.wargaming.net"
    - proxy.golang.org
    - stun.*.*
    - stun.*.*.*
    - "+.stun.*.*"
    - "+.stun.*.*.*"
    - "+.stun.*.*.*.*"
    - "+.stun.*.*.*.*.*"
    - heartbeat.belkin.com
    - "*.linksys.com"
    - "*.linksyssmartwifi.com"
    - "*.router.asus.com"
    - mesu.apple.com
    - swscan.apple.com
    - swquery.apple.com
    - swdownload.apple.com
    - swcdn.apple.com
    - swdist.apple.com
    - lens.l.google.com
    - stun.l.google.com
    - "+.nflxvideo.net"
    - "*.square-enix.com"
    - "*.finalfantasyxiv.com"
    - "*.ffxiv.com"
    - "*.ff14.sdo.com"
    - ff.dorado.sdo.com
    - "*.mcdn.bilivideo.cn"
    - "+.media.dssott.com"
    - shark007.net
    - Mijia Cloud
    - "+.cmbchina.com"
    - "+.cmbimg.com"
    - local.adguard.org
    - "+.sandai.net"
    - "+.n0808.com"
      
  proxy-providers:
    provider:
      type: http
      path: ./profile/provider.yaml
      url: subscription.url
      interval: 36000
      health-check:
        enable: true
        url: http://www.gstatic.com/generate_204
        interval: 3600
  
  proxy-groups:
    - name: PROXY
      type: select
      use:
        - provider
  
  rule-providers:
    reject:
      type: http
      behavior: domain
      url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/reject.txt"
      path: ./ruleset/reject.yaml
      interval: 86400
  
    icloud:
      type: http
      behavior: domain
      url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/icloud.txt"
      path: ./ruleset/icloud.yaml
      interval: 86400
  
    apple:
      type: http
      behavior: domain
      url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/apple.txt"
      path: ./ruleset/apple.yaml
      interval: 86400
  
    # google:
    #   type: http
    #   behavior: domain
    #   url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt"
    #   path: ./ruleset/google.yaml
    #   interval: 86400
  
    proxy:
      type: http
      behavior: domain
      url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/proxy.txt"
      path: ./ruleset/proxy.yaml
      interval: 86400
  
    direct:
      type: http
      behavior: domain
      url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/direct.txt"
      path: ./ruleset/direct.yaml
      interval: 86400
    private:
      type: http
      behavior: domain
      url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/private.txt"
      path: ./ruleset/private.yaml
      interval: 86400
  
    gfw:
      type: http
      behavior: domain
      url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/gfw.txt"
      path: ./ruleset/gfw.yaml
      interval: 86400
  
    tld-not-cn:
      type: http
      behavior: domain
      url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/tld-not-cn.txt"
      path: ./ruleset/tld-not-cn.yaml
      interval: 86400
  
    telegramcidr:
      type: http
      behavior: ipcidr
      url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/telegramcidr.txt"
      path: ./ruleset/telegramcidr.yaml
      interval: 86400
  
    cncidr:
      type: http
      behavior: ipcidr
      url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/cncidr.txt"
      path: ./ruleset/cncidr.yaml
      interval: 86400
  
    lancidr:
      type: http
      behavior: ipcidr
      url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/lancidr.txt"
      path: ./ruleset/lancidr.yaml
      interval: 86400
  
    applications:
      type: http
      behavior: classical
      url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/applications.txt"
      path: ./ruleset/applications.yaml
      interval: 86400
  
  
  # Script Shortcuts enables the use of script in rules mode. By default, DNS resolution takes place for SCRIPT rules. no-resolve can be appended to the rule to prevent the resolution. (i.e.: SCRIPT,quic,DIRECT,no-resolve)
  script:
    engine: expr # or starlark (10x to 20x slower)
    shortcuts:
      quic: network == 'udp' and dst_port == 443
      curl: resolve_process_name() == 'curl'
      # curl: resolve_process_path() == '/usr/bin/curl'
      not_common_port: dst_port not in [21, 22, 23, 53, 80, 123, 143, 194, 443, 465, 587, 853, 993, 995, 998, 2052, 2053, 2082, 2083, 2086, 2095, 2096, 5222, 5228, 5229, 5230, 8080, 8443, 8880, 8888, 8889]
  
  
  rules:
    - SCRIPT,not_common_port,DIRECT # 只代理常规端口，常用于防止PT、BT的流量走代理
    - SCRIPT,quic,REJECT
    - DST-PORT,22,DIRECT
    - RULE-SET,applications,DIRECT
    - DOMAIN,clash.razord.top,DIRECT
    - DOMAIN,yacd.haishan.me,DIRECT
    - RULE-SET,private,DIRECT
    - RULE-SET,reject,REJECT
    - RULE-SET,icloud,DIRECT
    - RULE-SET,apple,DIRECT
    # - RULE-SET,google,DIRECT
    - RULE-SET,proxy,PROXY
    - RULE-SET,direct,DIRECT
    - RULE-SET,lancidr,DIRECT
    - RULE-SET,cncidr,DIRECT
    - RULE-SET,telegramcidr,PROXY
    - GEOIP,LAN,DIRECT
    - GEOIP,CN,DIRECT
    - MATCH,PROXY
  ```

## 管理API

- 获取代理信息：`curl -X GET http://127.0.0.1:9090/proxies --header 'Authorization: Bearer 123456'`
- 获取指定代理信息：`curl -X GET http://127.0.0.1:9090/proxies/PROXY --header 'Authorization: Bearer 123456'`
- 选择指定节点：`curl -X UT http://127.0.0.1:9090/proxies/PROXY --header 'Authorization: Bearer 123456' --header "Content-Type: application/json" -d '{"name": "代理节点名称"}''`