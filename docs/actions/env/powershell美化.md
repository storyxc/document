# powershell美化

> https://ohmyposh.dev/docs/

## 安装windows terminal和powershell

- https://github.com/microsoft/terminal

- https://docs.microsoft.com/zh-cn/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2



## 安装oh-my-posh

```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://ohmyposh.dev/install.ps1'))
```



## 安装Nerd Fonts

如果不安装Nerd Fonts会有乱码情况，oh-my-posh推荐安装[Meslo LGM NF](https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/Meslo.zip)字体，也可以从https://www.nerdfonts.com/font-downloads自行选择下载。下载后解压放到C:\windows\Fonts文件夹中。编辑Windows Terminal默认设置将默认字体改为喜欢的Nerd Fonts。



## 编辑profile

`code $PROFILE`或`notepad $PROFILE`

```shell
oh-my-posh init pwsh | Invoke-Expression # 默认主题

oh-my-posh init pwsh --config C:\Users\story\AppData\Local\Programs\oh-my-posh\themes\robbyrussel.omp.json | Invoke-Expression # --config可以配置喜欢的主题

--config 'https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/jandedobbeleer.omp.json' # 也可以配置远程主题
```
```shell
# 设置预测文本来源为历史记录
Set-PSReadLineOption -PredictionSource History
# 设置向上键为后向搜索历史记录
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
# 设置向下键为前向搜索历史纪录
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward

```

windows安装后默认的主题文件夹为：`C:\Users\[your username]\AppData\Local\Programs\oh-my-posh\themes`，也可以通过`echo $env:POSH_THEMES_PATH`命令查看主题的路径

### 挑选喜欢的主题

- https://ohmyposh.dev/docs/themes



配置立即生效：

```
. $PROFILE
```



效果图：

- 默认：

  ![image-20220607011525725](https://storyxc.com/images/blog/image-20220607011525725.png)

- jandedobbeleer：

  ![image-20220607011557983](https://storyxc.com/images/blog/image-20220607011557983.png)
