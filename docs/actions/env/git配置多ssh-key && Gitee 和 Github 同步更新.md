# git配置多ssh-key && Gitee 和 Github 同步更新





## 配置多ssh-key

gitee或者gitlab账号和个人git账号同时在一台机器上使用时，可以为不同git服务器设置不同的ssh-key



1. 生成一个个人github的ssh-key

   `ssh-keygen -t rsa -C 'xxxxx@163.com' -f ~/.ssh/github_id_rsa`

2. 生成一个gitee的ssh-key

   `ssh-keygen -t rsa -C 'xxxxx@company.cn' -f ~/.ssh/gitee_id_rsa`

3. 在`~/.ssh`下新建config文件`vim ~/.ssh/config`，添加以下内容

   ```txt
   # gitee
   Host gitee.com
   HostName gitee.com
   PreferredAuthentications publickey
   IdentityFile ~/.ssh/gitee_id_rsa
   # github
   Host github.com
   HostName github.com
   PreferredAuthentications publickey
   IdentityFile ~/.ssh/github_id_rsa
   ```
   
4. 分别在gitee和github中添加前两步生成的对应地址的公钥

5. ssh命令测试

   ```bash
   ssh -T git@gitee.com
   ssh -T git@github.com
   ```

如果看到 hi xxx！。。。内容则证明配置成功





## Gitee 和 Github 同步更新

假设我们有一个项目同时在github和gitee上都有仓库，当直接使用`git clone`命令拉取的代码默认remote为origin，如果要分别更新，我们要分别在两个本地仓库中push。这时我们可以给本地仓库添加多个origin，然后更新的时候分别推送即可实现一个本地仓库分别推送两个不同的远程仓库。



1. 删除原有的remote地址

   `git remote remove origin`

2. 添加新的远程仓库地址（gitee）

   ```bash
   git remote add 远程仓库名 远程仓库地址
   eg: git remote add gitee git@gitee.com:xxx/xxx.git
   ```

3. 添加新的远程仓库地址（github）

   ```bash
   git remote add 远程仓库名 远程仓库地址
   eg: git remote add github git@github.com:xxx/xxx.git
   ```

   再次查看`git remote`:

   ![image-20210913184204396](https://storyxc.com/images/blog//image-20210913184204396.png)

4. 推送的时候`git push 远程仓库名`即可



### 修改配置文件一次推送多个仓库

修改仓库下.git/config文件，新增内容

```sh
[remote "all"]
        url = repo1.git
        url = repo2.git
        url = repo3.git
```

直接`git push all`