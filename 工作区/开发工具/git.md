---
title: git的理解使用
tags: ["git"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期六, 十一月 26日 2022, 3:16:02 下午
---
#git

# git的理解使用

## 本地创建远程分支

```bash
git push origin feature-xxx:feature-xxx
```

## Git 撤回操作

[远程提交后 突然要撤回](https://blog.csdn.net/xs20691718/article/details/51901161)

> [look this](https://ohshitgit.com/zh)

### Git Reset 撤回

```js
# 简单操作（暴力撤回到指定）
1. git reflog 找出目标HEAD
2. git reset --hard `目标HEAD` 如 `git reset --hard HEAD@{23}`
```

`git reset` 通常用来把代码重置到过去的某个版本，有五种模式（`--mixed`、`--soft`、`--hard`、`--merge`）

另外 `git reset` 比较暴力，要慎用，比如现在提交五次了，然后使用这个命令重置到第一次，那么第二三四五次提交记录会全部没了的，找不回来的，这种情况记得新建个分支来执行这种操作就没事了，或者使用 `git revert`

- mixed (默认模式) 重置并撤销 git commit 以及 git add，**保留**编辑器中所有修改
- soft  重置并撤销 git commit，但不撤销 git add，**保留**编辑器中所有修改
- hard 重置并撤销 git commit 以及 git add，并且**删除**编辑器中所有修改
- merge 取消某次合并
- keep 取消某次合并

```bash
# 后面一长串就是我复制的 commitID 或者说是 hash，长得就是这样子的  
# 等同于 git reset commitID，因为 --mixed 是默认模式，所以可以不写  
# 重置并撤销 git commit 以及 git add，保留编辑器中所有修改  
git reset --mixed afcfbcb940164de24cc4f8c866e1da3a18382e10  
  
# 重置并撤销 git commit，但不撤销 git add，保留编辑器中所有修改  
git reset --soft commitID  
  
# 重置并撤销 git commit 以及 git add，并且删除编辑器中所有修改  
git reset --hard commitID  
  
# 取消某次合并  
git reset --merge commitID  
  
git reset --keep commitID  
  
# 把暂存区所有文件退回到工作区，相当于撤销 git add .  
git reset HEAD  
# 把暂存区的 test.js 重新放回工作区，和 git restore --staged test.js 作用一样  
git reset HEAD test.js  
# 重置到上一个版本  
git reset --hard HEAD^  
# 重置到上上一个版本，以此类推  
git reset --hard HEAD^^  
# 重置到指定版本  
git reset --hard commitID
```

另外关于叫法本地仓库一般说重置、还原、撤销都行，远程仓库一般叫回滚

### 还原 Revert

`git revert` 和 `git reset` 有点类似，只是比 `reset` 稍微温柔一点，没那么暴力。

revert分两种情况

- 正常提交
- merge合并的提交

### 正常提交的commit

```bash
# 撤销正常提交的 commit
git revert commitID
```

### merge合并而成的commit

```bash
git show 当前的commitID
commit d4d61e51ea89ce36b01ea14047948630be46d93a (HEAD -> feat-a)
# 这里会多一行Merge 后面的两个commit指的是从哪两个合并过来的
Merge: e0774ae 7ecfb20

# 这种case下 使用revert
# 撤销 merge 的 commit 提交需要加参数来区分撤销哪一个分支上的内容  
# 也就是指定上面 Merge: e0774ae 7ecfb20，这两个 id 中的哪一个  
# -m 接收一个参数是数字，取值 1 或 2，表示 Merge 的第一个还是第二个 id
git revert -m 2 

```


## 挑拣 Cherry-pick

> 简单说：调一个提交记录到当前分支

和 merge 不同的是：`cherry-pick` 合并的是某一次 `commit` 提交的文件，`merge` 合并的是整个分支。且 `merge` 会额外多一条 `merge commit` 的记录，而 `cherry-pick` 不会。

```bash
# 这样就把其他分支的一个 commit 合入当前分支了  
git cherry-pick commitID  
  
# 如果需要把多个 commit 合过来如下，这多个 commitID 可以是来自不同分支的  
git cherry-pick commitID1 commitID2 commitID3
```

## Git Message 提交规范

feat: 新功能、新特性
fix: 修改 bug perf: 更改代码，以提高性能
refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
docs: 文档修改
style: 代码格式修改, 注意不是 css 修改（例如分号修改）
test: 测试用例新增、修改
build: 影响项目构建或依赖项修改
revert: 恢复上一次提交
ci: 持续集成相关文件修改
chore: 其他修改（不在上述类型中的修改）
release: 发布新版本 workflow: 工作流相关文件修改


### 添加远程仓库

运行 `git remote add <shortname> <url>` 添加一个新的远程 Git 仓库，同时指定一个方便使用的简写.

> 一般shortname为**origin**

### 查看当前的远程仓库

```
git remote -l
```

### 远程仓库中抓取与拉取

```
$ git fetch <remote>
```

### 本地关联远程

```
git branch --set-upstream-to=<shortname>/main main
```

> 拒绝合并无关的历史

```
git merge blog/main --allow-unrelated-histories
```

## 分离HEAD

```shell
git checkout hash值
```

## 相对引用

### `^`

使用 `^` 向上移动 1 个提交记录
所以 `main^` 相当于“`main` 的父节点”。
`main^^` 是 `main` 的第二个父节点

### `~`

使用 `~<num>` 向上移动多个提交记录，如 `~3`

### 强制修改分支位置

可以直接使用 `-f` 选项让分支指向另一个提交。例如:

```shell
git branch -f main HEAD~3
```

上面的命令会将 main 分支强制指向 HEAD 的第 3 级父提交。

> 这里的HEAD是当前HEAD所在的分支，不是强制移动分支那个HEAD


## 撤销变更

### 本地
`git reset` 通过把分支记录回退几个提交记录来实现撤销改动。你可以将这想象成“改写历史”。`git reset` 向上移动分支，原来指向的提交记录就跟从来没有提交过一样。

### 远程
虽然在你的本地分支中使用 `git reset` 很方便，但是这种“改写历史”的方法对大家一起使用的远程分支是无效的哦！
为了撤销更改并**分享**给别人，我们需要使用 `git revert`。来看演示：`git revert HEAD`


## 变基 Rebase

> [rebase 用法小结](https://www.jianshu.com/p/4a8f4af4e803)

### 将多次commit合成一个

git merge 和 git rebase 都是可以合并分支，合并用法也是一样，不同的一个是在 commit 记录的处理上

- `git merge` 会新建一条新的 commit ，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会保留之前每个分支的 commit 历史。

- `git rebase`会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，放到目标分的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记录了。

> merge 多个提交记录分叉
> rebase 一个提交记录

### 实战操作

- 合并一些指定提交记录范围
- 将某一段 commit范围 粘贴到另一个分支上

#### 合并一些指定提交记录范围

##### Rebase


![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202211202108440.png)

> 在当前的分支进行操作

```bash
git rebase -i <提交记录开始> <提交记录结束>
```

如果没有指定结束，默认就当做HEAD

##### Reset

这个case 也可以使用`reset`实现

```bash
git reset --soft commitId 
git commit -m 'xxx'
```

- 恢复到指定的记录(soft 只恢复到指定记录的暂存区(在此之后的记录清理掉)，不清理原来工作区的代码)
- 再重新提交

这样的话 `git log` 也是看不到中间的提交记录列表

#### 将某一段 Commit 粘贴到另一个分支上

如果是一两个， 可以使用`cherry-pick` 方便一下

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202211202108163.png)

> **在develop分支下执行**

```bash 
git rebase -i <startpoint> <endpoint> --onto master
```

其中，`[startpoint]` `[endpoint]`仍然和上一个命令一样指定了一个编辑区间(前开后闭)，`--onto`的意思是要将该指定的提交复制到哪个分支上。

因为`[startpoint]` `[endpoint]`指定的是一个前开后闭的区间，为了让这个区间包含C提交，我们将区间起始点向后退了一步

```bash
▶ $ git rebase -i 0402c50f21c0ae926dd869a4061c5b63b2c54ca1^ 3ce90b1f863874ffa92107e208dba295fcaf9ad0 --onto newBranch
成功变基并更新 detached HEAD。
▶ $ git status
头指针分离自 refs/heads/feat-a
无文件要提交，干净的工作区
```

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202211202139539.png)

现在它是个游离的头部HEAD

```bash
# 回到目标分支
git checkout newBranch

# 重置到指定的游离hash
git reset --hard  commentId
```

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202211202142529.png)

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202211202143734.png)


## 开发可能遇到的case

### 切换分支保留修改

> 在`feat-xxx`分支上正在开发，由于某原因不得不去`main` 分支修改东西，现在开发进行一半，不想提交，又想保留当前的代码

使用 `git stash` 储存起来

```bash
git stash

git checkout main

# 修改完

git checkout feat-xxx

# 拿出来
git stash pop

# 删除所有的储存
git stash clear 
```

### 切换分支转移修改

> 打开到一半，突然发现当前在`main`分支， 实际要在`feat-xxx`分支上开发， 想要当前编辑的内容，丢到 `feat-xxx`分支上 ，然后切到`feat-xxx`上去开发

```bash
git stash

git checkout feat-xxx

git stash pop

# 或者 查看储存列表
git stash list
# 取出储存中指定的部分修改
git stash apply stash@{0}

git stash clear
```

合并时发生冲突用 `git merge abort` 或 `git reset --merge` 都可以取消合并

### Revert 之后重新上线 diff丢失

### 合并冲突不想合并了

合并时、或者拉取时等，发现有冲突，可能是其他同事提交的，自己不知道怎么冲突怎么选择，或者其他原因，总之不想合并了，都可以用 `--abort` 取消，比如合并的时候发现有冲突不想合并了

```bash
git merge --abort
```

### 解决冲突

一般在ide里面都有很好的可视化界面提供选择哪段代码

## PR

[如何提交PR](https://www.freecodecamp.org/chinese/news/how-to-make-your-first-pull-request-on-github/)

## 整理提交记录

### 一些常用的 Git 命令

> [学习git](https://mp.weixin.qq.com/s/1NolHgaQ_b4T69wJiy8BkA)

```bash

## 配置用户名与邮箱
$ git --version   # 查看git的版本信息
$ git config --global user.name   # 获取当前登录的用户
$ git config --global user.email  # 获取当前登录用户的邮箱

## 登录git

# 如果刚没有获取到用户配置，则只能拉取代码，不能修改  要是使用git，你要告诉git是谁在使用
$ git config --global user.name 'userName'    # 设置git账户，userName为你的git账号，
$ git config --global user.email 'email'
# 获取Git配置信息，执行以下命令：
$ git config –list


## 配置https和ssh推送时保存用户名和密码


# https提交保存用户名和密码
$ git config --global credential.helper store
# 生成公钥私钥，将公钥配置到GitHub，ssh提交就可以免输入用户名密码
# 三次回车即可生成 ssh key
$ ssh-keygen -t rsa
# 查看已生成的公钥
$ cat ~/.ssh/id_rsa.pub




## 推送到远程仓库正确流程

1. git init # 初始化仓库
2. git add .(文件name) # 添加文件到本地仓库
3. git commit -m "first commit" # 添加文件描述信息
4. git remote add origin 远程仓库地址 # 链接远程仓库，创建主分支
5. git pull origin master --allow-unrelated-histories # 把本地仓库的变化连接到远程仓库主分支
6. git push -u origin master # 把本地仓库的文件推送到远程仓库



## 新建本地仓库

# 在当前目录新建一个Git代码库
$ git init
# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]
# 下载一个项目和它的整个代码历史
$ git clone [url]


## 配置(全局和项目)

# Git的设置文件为.gitconfig，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。
# 显示当前的Git配置
$ git config --list
# 编辑Git配置文件
$ git config -e [--global]
# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"


## 增加删除文件

# 添加指定文件到暂存区
$ git add [file1][file2] ...
# 添加指定目录到暂存区，包括子目录
$ git add [dir]
# 添加当前目录的所有文件到暂存区
$ git add .
# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p
# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...
# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]
# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]


## 代码提交

# 提交暂存区到仓库区
$ git commit -m [message]
# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]
# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a
# 提交时显示所有diff信息
$ git commit -v
# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]
# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...


## 分支

# 列出所有本地分支
$ git branch
# 列出所有远程分支
$ git branch -r
# 列出所有本地分支和远程分支
$ git branch -a
# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]
# 新建一个分支，并切换到该分支
$ git checkout -b [branch]
# 新建一个分支，指向指定commit
$ git branch [branch] [commit]
# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]
# 切换到指定分支，并更新工作区
$ git checkout [branch-name]
# 切换到上一个分支
$ git checkout -
# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]
# 合并指定分支到当前分支
$ git merge [branch]
# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]
# 删除分支
$ git branch -d [branch-name]
# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]


## 标签

# 列出所有tag
$ git tag
# 新建一个tag在当前commit
$ git tag [tag]
# 新建一个tag在指定commit
$ git tag [tag] [commit]
# 删除本地tag
$ git tag -d [tag]
# 删除远程tag
$ git push origin :refs/tags/[tagName]
# 查看tag信息
$ git show [tag]
# 提交指定tag
$ git push [remote] [tag]
# 提交所有tag
$ git push [remote] --tags
# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]


## 查看信息


# 查看目录
$ ls -al	或者$ ll
# 查看仓库状态，显示有变更的文件
$ git status
# 显示当前分支的版本历史
$ git log
# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat
# 搜索提交历史，根据关键词
$ git log -S [keyword]
# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s
# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature
# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]
# 显示指定文件相关的每一次diff
$ git log -p [file]
# 显示过去5次提交
$ git log -5 --pretty --oneline
# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn
# 显示指定文件是什么人在什么时间修改过
$ git blame [file]
# 显示暂存区和工作区的差异
$ git diff
# 显示暂存区和上一个commit的差异
$ git diff --cached [file]
# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD
# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]
# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"
# 显示某次提交的元数据和内容变化
$ git show [commit]
# 显示某次提交发生变化的文件
$ git show --name-only [commit]
# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]
# 显示当前分支的最近几次提交
$ git reflog


## 远程同步

# 下载远程仓库的所有变动
$ git fetch [remote]
# 显示所有远程仓库
$ git remote -v
# 显示某个远程仓库的信息
$ git remote show [remote]
# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]
# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]
# 上传本地指定分支到远程仓库
$ git push [remote] [branch]
# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force
# 推送所有分支到远程仓库
$ git push [remote] --all



## 撤销

# 恢复暂存区的指定文件到工作区
$ git checkout [file]
# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]
# 恢复暂存区的所有文件到工作区
$ git checkout .
# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]
# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard
# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]
# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]
# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]
# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]
# 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash pop



# 从当前目录的所有文件中查找文本内容：
$ git grep "Hello"
# 在某一版本中搜索文本：
$ git grep "Hello" v2.5
# 生成一个可供发布的压缩包
$ git archive



## on my zsh 简化git命令

g - git
gst - git status
gl - git pull
gup - git pull --rebase
gp - git push
gd - git diff
gdc - git diff --cached
gdv - git diff -w "$@" | view
gc - git commit -v
gc! - git commit -v --amend
gca - git commit -v -a
gca! - git commit -v -a --amend
gcmsg - git commit -m
gco - git checkout
gcm - git checkout master
gr - git remote
grv - git remote -v
grmv - git remote rename
grrm - git remote remove
gsetr - git remote set-url
grup - git remote update
grbi - git rebase -i
grbc - git rebase --continue
grba - git rebase --abort
gb - git branch
gba - git branch -a
gcount - git shortlog -sn
gcl - git config --list
gcp - git cherry-pick
glg - git log --stat --max-count=10
glgg - git log --graph --max-count=10
glgga - git log --graph --decorate --all
glo - git log --oneline --decorate --color
glog - git log --oneline --decorate --color --graph
gss - git status -s
ga - git add
gm - git merge
grh - git reset HEAD
grhh - git reset HEAD --hard
gclean - git reset --hard && git clean -dfx
gwc - git whatchanged -p --abbrev-commit --pretty=medium
gsts - git stash show --text
gsta - git stash
gstp - git stash pop
gstd - git stash drop
ggpull - git pull origin $(current_branch)
ggpur - git pull --rebase origin $(current_branch)
ggpush - git push origin $(current_branch)
ggpnp - git pull origin $(current_branch) && git push origin $(current_branch)
glp - _git_log_prettily


```





