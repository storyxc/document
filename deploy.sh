#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'blog.storyxc.com' > CNAME

if [ -z "${GH_TOKEN}" ]; then
  echo "GH_TOKEN is not set"
  exit 1
else
  msg='github actions自动部署'
  githubUrl=https://storyxc:${GH_TOKEN}@github.com/storyxc/document.git
  git config --global user.name "storyxc"
  git config --global user.email "storyxc@163.com"
fi

git init
git add -A
git commit -m "${msg}"

git push -f "$githubUrl" master:gh-pages

cd -

rm -rf docs/.vuepress/dist