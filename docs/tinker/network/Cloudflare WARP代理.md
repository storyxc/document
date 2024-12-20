# Cloudflare WARP代理

## 背景

一些服务会对IP有比较高的要求，比如chatgpt的客户端、netflix等流媒体平台，如果出口服务器的IP不够“干净”就无法正常使用。这种情况就可以使用Cloudflare WARP进行代理。

## Linux下的客户端安装及配置

> https://developers.cloudflare.com/warp-client/get-started/linux/

### 安装(debian系统)

```shell

# Add cloudflare gpg key
curl -fsSL https://pkg.cloudflareclient.com/pubkey.gpg | sudo gpg --yes --dearmor --output /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg


# Add this repo to your apt repositories
echo "deb [signed-by=/usr/share/keyrings/cloudflare-warp-archive-keyring.gpg] https://pkg.cloudflareclient.com/ $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/cloudflare-client.list


# Install
sudo apt update && sudo apt install cloudflare-warp
```

### 注册客户端并连接

`warp-cli registration new`

`warp-cli connect`

### 切换模式为proxy并测试

`warp-cli mode proxy`

此时WARP会使用socks5本机代理，端口为40000

测试：

`curl -x "socks5://127.0.0.1:40000" ipinfo.io`

可以看到ip已经不是本机ip而是cloudflare的ip



`curl -x "socks5://127.0.0.1:40000" https://www.cloudflare.com/cdn-cgi/trace`

这里warp=on就说明WARP代理开启成功



### 配置分流

给个x-ui面板下的简单配置示例，具体的改动点就是将WARP的socks5代理配置到出站，然后路由中增加需要通过WARP分流的规则

```json
{
  "log": null,
  "routing": {
    "rules": [
      {
        "inboundTag": [
          "api"
        ],
        "outboundTag": "api",
        "type": "field"
      },
      {
        "ip": [
          "geoip:private"
        ],
        "outboundTag": "blocked",
        "type": "field"
      },
      {
        "outboundTag": "blocked",
        "protocol": [
          "bittorrent"
        ],
        "type": "field"
      },
      {
        "type": "field",
        "outboundTag": "warp",
        "domain": [
          "geosite:netflix",
          "geosite:openai"
        ]
    }
    ]
  },
  "dns": null,
  "inbounds": [
    {
      "listen": "127.0.0.1",
      "port": 62789,
      "protocol": "dokodemo-door",
      "settings": {
        "address": "127.0.0.1"
      },
      "streamSettings": null,
      "tag": "api",
      "sniffing": null
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
    },
    {
      "protocol": "blackhole",
      "settings": {},
      "tag": "blocked"
    },
    {
      "tag": "warp",
      "protocol": "socks",
      "settings": {
        "servers": [
          {
            "address": "127.0.0.1",
            "port": 40000
          }
        ]
      }
    }
  ],
  "transport": null,
  "policy": {
    "levels": {
      "0": {
        "handshake": 10,
        "connIdle": 100,
        "uplinkOnly": 2,
        "downlinkOnly": 3,
        "statsUserUplink": true,
        "statsUserDownlink": true,
        "bufferSize": 10240
      }
    },
    "system": {
      "statsInboundDownlink": true,
      "statsInboundUplink": true
    }
  },
  "api": {
    "services": [
      "HandlerService",
      "LoggerService",
      "StatsService"
    ],
    "tag": "api"
  },
  "stats": {},
  "reverse": null,
  "fakeDns": null
}
```

