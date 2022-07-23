---
title: git
date: 2022-07-15 23:39:13
tags: ["git"]
---
#git

# git的理解使用

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



## 整理提交记录




