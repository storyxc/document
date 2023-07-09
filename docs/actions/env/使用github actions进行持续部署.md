# 使用github actions进行持续部署

> Github Actions官方文档https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name



## Github Actions是什么

Github推出的持续集成工具



## 使用

### 配置

Github Actions的配置文件叫做workflow文件，需要存放在repo根路径下的`./github/workflows`目录中。workflow文件使用`yaml`格式编写，文件名可以自定义，后缀统一为`yml`，一个repo中可以有多个workflow，Github只要发现`./github/workflows`目录中有`.yml`文件就会自动运行。

本博客的workflow文件：

```yml
# 自定义当前执行文件的名称
name: vuepress
# 整个流程在main分支发生push事件时触发
on:
  push:
    branches:
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest # 运行在ubuntu-latest环境的虚拟机中
    strategy:
      matrix:              # 矩阵
        node-version: [10.x]
    steps: # 每个 job 由多个 step 构成，它会从上至下依次执行。
    # 获取仓库源码
    - name: Checkout
      uses: actions/checkout@v2         # github actions提供了一些官方的action，例如checkout @v2是action的版本
    # 安装node
    - name: Use Node.js ${{ matrix.node-version }} # 定义好的node版本
      uses: actions/setup-node@v1 # 作用：安装nodejs
      with:
        node-version: ${{ matrix.node-version }} # 定义好的node版本
    # 构建和部署
    - name: Deploy
      env: # 环境变量
        GITHUB_TOKEN: ${{ secrets.vuepress_actions_access_token }}
      run: npm install && npm run deploy # npm run deploy需要在package.json中定义"deploy: bash deploy.sh"
```



steps:

- checkout源码到workflow中
- 安装指定版本的node环境
- 从仓库的设置中读取配置好的access_token，安装依赖，执行项目中的deploy.sh脚本



### 配置access_token

1. 在github个人设置页面找到开发者设置

![image-20220421224529199](https://storyxc.com/images/blog/image-20220421224529199.png)

2. 选择个人access tokens，选择生成新token

![image-20220421224739995](https://storyxc.com/images/blog/image-20220421224739995.png)

3. 将生成好的token保存，关闭页面后将不会再显示此token，然后回到仓库保存

![repo](https://storyxc.com/images/blog/image-20220421224939828.png)

### Deploy.sh

```shell
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'blog.storyxc.com' > CNAME

if [ -z "${GITHUB_TOKEN}" ]; then
  echo "GITHUB_TOKEN is not set"
  exit 1
else
  msg='github actions自动部署'
  githubUrl=https://storyxc:${GITHUB_TOKEN}@github.com/storyxc/vuepress.git
  git config --global user.name "storyxc"
  git config --global user.email "storyxc@163.com"
fi

git init
git add -A
git commit -m "${msg}"

git push -f $githubUrl master:gh-pages

cd -
```

> 这里我是用了github pages发布，然后配置了自定义域名，这个域名要在服务商域名解析配置CNAME，然后在仓库的page页面添加自定义域名即可
>
> ![image-20220421230458141](https://storyxc.com/images/blog/image-20220421230458141.png)



## 流程梳理

- 配置workflow，推送代码到触发job的分支
- github actions会根据workflow中的配置拉代码，打包，然后调用deploy.sh，将生成的静态文件推送到gh-page分支
- gh-page分支配置github page，自定义域名
