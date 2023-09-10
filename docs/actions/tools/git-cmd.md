# git命令整理


版本控制工具一直用的GIT，之前提交代码都是用IDEA集成的GIT可视化工具，命令行几乎不怎么用，由于接下来项目要整合到微服务平台中，项目代码管理也要迁到Gerrit，idea的集成支持不太好，所以整理下GIT的命令，方便后面使用命令行提交代码。
![180874352b52aaf65be47442.jpg](https://storyxc.com/images/blog//18087435-2b52aaf65be47442.jpg)

```
Remote:远程仓库
Reporsitory:本地仓库
WorkSpace:工作区
Index:暂存区
```

## 撤回修改
- `git commit --amend` :提交完发现漏掉了几个文件没有添加，或者提交信息写错了,此时，可以运行带有 --amend 选项的提交命令来重新提交

- `git checkout -- <file>`  把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：

  一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

  一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

- `git reset [--soft | --mixed | --hard] [HEAD]` 

  - 使用soft只会移动HEAD到上一个版本,可以理解为撤回上一次commit,暂存区和工作区不受影响
  - 使用mixed在移动HEAD到上一个版本,并且回退暂存区的内容,工作区不受影响
  - 使用hard,除了移动HEAD指针,取消暂存内容,还会覆盖回退工作区内容,属于比较危险的命令,谨慎使用
  - 不加括号中的参数 默认参数为mixed, 如果想回退多个版本可以修改为HEAD^^^或HEAD~3代表回退3个版本,依此类推

- 关于`git checkout`和`git reset`建议看下这篇文章,[git重置](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E7%BD%AE%E6%8F%AD%E5%AF%86#_git_reset)



## 切换分支

`git checkout branch_name`

切换分之前要注意本地分支是否有未commit的文件，如果有可以撤销改动，或者commit，再或者使用git stash将当前分支的改动临时保存起来，使当前分支的工作空间和暂存区变干净。然后再进行切换分支；切换回之前的分支，需要恢复被临时保存的改动

## 暂存和恢复本地修改

`git stash -u`

恢复本地修改:

1.先查看有多少个临时保存的改动

`git stash list`

2.再用`git stash apply --index stash@{n}`，n为使用git stash list查看到的某个改动的数字

3.再用`git stash drop stash@{n}`删除临时保存的改动

如果只有一个临时的stash，那么可以直接`git stash apply`即可恢复上次的临时保存记录

## 创建本地分支

基于本地master分支创建test分支为例：

先切换到master分支：`git checkout master`

建分支： `git branch test`

切分支：`git checkout test`

或者

建分支后切到该分支：`git checkout -b test master`



以基于某次commit id创建test分支为例：

`git checkout -b test 0faceff`

其中的0faceff为commit id的前7位



以基于某个tag创建test分支为例

`git checkout -b test v0.1.0`

v0.1.0为tag的名称

## 查看分支

`git branch`: 只显示本地分支名，当前分支名前有星号

`git branch -v`：显示本地分支名，当前分支前有星号，显示commit id

`git branch -vv`：显示本地分支名，当前分支名前有星号，显示commit id，显示追踪的远程分支名

`git branch -a`：显示所有分支名（包括远程分支）

`git branch -r`：查看远程分支名

## 删除本地分支

普通删除：`git branch -d branch_name`

强制删除（分支上有修改未合并到其他分支）：`git branch -D branch_name`


## 更新代码

`git pull`或者`git fetch`

`git pull -v --progress "origin"`命令可以显示更详细的信息，git pull命令会fetch所有的远程分支的信息到本地，同时当前本地分支会被合并。

如果本地有修改文件，而且远程仓库也修改了该文件，pull会失败，提示本地的修改会被合并覆盖，此时可以commit本地的修改或者stash本地的修改，再pull。

## 修改代码

首先使用`git checkout branch_name`切换到正确分支，pull，新建或修改代码，再使用git add 文件名把修改或新增的文件添加到暂存区，再执行commit命令提交到本地仓库。

其中:

`git add 某个文件`

`git add 多个文件`（文件名用空格隔开）

`git add -u `添加所有修改的文件到暂存区

`git add .`添加所有修改和新增的文件到暂存区

`git add -A`：添加所有修改，新增和删除的文件到暂存区

`git commit 文件名 -m "注释"`：commit某个文件

`git commit 文件1 文件2 -m "注释"` commit多个文件，用空格隔开

`git commit -m "注释"`commit所有文件

如果是删除文件，可以使用

`rm 文件`

`git add 文件`

`git commit 文件 -m  "注释"`

如果是重命名文件或者移动文件，可以使用

`git mv 源文件路径 目标文件路径`

`git commit 文件 -m "注释"`

- **每次编辑前先进行pull操作，避免再push时产生合并冲突**

### push代码带远程仓库

本地代码从本地branch_name分支推到远端branch_name分支：

`git checkout branch_name`

`git pull`

`git push origin HEAD:refs/for/branch_name`

或者

`git checkout branch_name`

`git pull`

`git push origin branch_name:refs/for/branch_name`



### 查看信息

**`git status` 显示有变更的文件**

**`git log` 显示当前分支的版本历史**

`git log --stat` 显示commit历史，以及每次commit发生变更的文件

`git log -S [keyword] `搜索提交历史，根据关键词

`git log [tag] HEAD --pretty=format:%s` 显示某个commit之后的所有变动，每个commit占据一行

`git log [tag] HEAD --grep feature` 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件

`git log -p [file] `显示指定文件相关的每一次diff

`git log -5 --pretty --oneline` 显示过去5次提交

`git shortlog -sn `显示所有提交过的用户，按提交次数排序

`git blame [file]` 显示指定文件是什么人在什么时间修改过

**`git diff` 显示暂存区和工作区的代码差异**

`git diff --cached [file]` 显示暂存区和上一个commit的差异

`git diff HEAD` 显示工作区与当前分支最新commit之间的差异

`git diff [first-branch]...[second-branch]` 显示两次提交之间的差异

`git diff --shortstat "@{0 day ago}" `显示今天你写了多少行代码

`git show [commit]` 显示某次提交的元数据和内容变化

`git show --name-only [commit] `显示某次提交发生变化的文件

`git show [commit]:[filename] `显示某次提交时，某个文件的内容

`git rebase [branch] `从本地master拉取代码更新当前分支：branch 一般为master

## fetch vs pull

git fetch是将远程的最新内容拉到本地，用户在检查了以后决定是否合并到本地分支中。
 而git pull 则是将远程的最新内容拉下来后直接合并，即：git pull = git fetch + git merge，这样可能会产生冲突，需要手动解决。


