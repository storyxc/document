# macos开机自动执行脚本
linux开机启动可以用systemd很方便的实现，mac上稍微复杂一些，需要自己写个.plist文件



## 简介

launchd 是 Mac OS 下用于初始化系统环境的关键进程，它是内核装载成功之后在 OS 环境下启动的第一个进程，可以用来控制服务的自动启动或者关闭。

它的作用就是我们平时说的守护进程，简单来说，用户守护进程是作为系统的一部分运行在后台的非图形化程序。

采用这种方式来配置自启动项很简单，只需要一个 plist 文件，该文件存在的目录有：

用户登陆前 LaunchDaemons：

~/Library/LaunchDaemons

用户登录后 LaunchAgents：

~/Library/LaunchAgents

## 脚本
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN""http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>KeepAlive</key>
        <dict>
            <key>SuccessfulExit</key>
            <false/>
        </dict>
        <key>Label</key>
        <string>com.storyxc.frpc</string>
        <key>ProgramArguments</key>
        <array>
            <string>/Users/story/project/widget/frp/frpc</string>
            <string>-c</string>
            <string>/Users/story/project/widget/frp/frpc.ini</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
    </dict>
</plist>
```

将脚本命名为frpc.plist，然后移动到`~/Library/LaunchAgents/`下

## 载入plist文件

启动服务：

`launchctl [load|enable|bootstrap] -w plist_path`

卸载服务：

`launchctl [unload|disable|bootout] -w plist_path`

## 设置别名

```zsh
# frpc启动、停止
alias frpc.start='launchctl load -w ~/Library/LaunchAgents/frpc.plist'
alias frpc.stop='launchctl unload -w ~/Library/LaunchAgents/frpc.plist'
```

