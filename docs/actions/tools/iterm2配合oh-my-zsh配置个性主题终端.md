# iterm2配合oh-my-zsh配置个性主题终端

## 安装iterm2

官网下载：https://iterm2.com/

## 安装oh my zsh

官网：https://ohmyz.sh/

安装脚本：`sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

因为网络原因无法执行这个脚本的可以找gitee上的国内源

## 更改iterm2的主题颜色为dracula

### 在iterm2的dracula主题仓库中下载color文件

仓库地址：` https://github.com/dracula/iterm.git`

![image-20211119150619779](https://storyxc.com/images/blog//image-20211119150619779.png)

### 打开iterm2导入刚下载的color文件

![image-20211119150804269](https://storyxc.com/images/blog//image-20211119150804269.png)

如图，导入完之后就可以选择导入的dracula主题颜色

## 安装命令高亮插件

### clone代码到本地

`git clone https://github.com/zsh-users/zsh-syntax-highlighting $ZSH_CUSTOM/plugins/zsh-syntax-highlighting`

## 安装历史指令提示插件

### clone代码到本地

`git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions`

## 修改.zshrc配置

- ~~`source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh`~~
- ~~`source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh`~~

```shell
# ~/.zshrc
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

### 效果

![image-20211119151720033](https://storyxc.com/images/blog//image-20211119151720033.png)

## powerlevel10k主题

> https://github.com/romkatv/powerlevel10k

```shell
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc

p10k configure
```