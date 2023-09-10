# macOS开启终端的代理

例如要走socks5的代理

- 直接在终端运行

```bash
export https_proxy=socks5://127.0.0.1:10880
```

这样配置只对当前终端有效，不会影响其他



- 修改终端配置文件 例如.zshrc

```bash
export http_proxy=socks5://127.0.0.1:10880
export https_proxy=socks5://127.0.0.1:10880
```

修改后保存，然后`source ~/.zshrc`立即成效。重启终端后即可全局代理。



也可以通过alias建立个别名，这样可以快速开启代理，编辑.zshrc 添加

`alias proxy_on='export https_proxy=socks5://127.0.0.1:10880'`

