# git配置socks5代理解决github上down代码慢的问题

```bash
# 设置代理
git config --global http.proxy 'socks5://127.0.0.1:10880'

git config --global https.proxy 'socks5://127.0.0.1:10880'

# 取消代理
git config --global --unset http.proxy

git config --global --unset https.proxy
```

端口号根据自己本地的代理端口填写