---
title: Obsidian同步
date: 2022-07-27 22:42:12
tags: ["Obsidian同步"]
---
#Obsidian 

# Obsidian同步的笔记
> 同步于ipad与 Mac

安装 Obsidian git插件

> 完成同步以及一些插件的使用配置

## 配置一些快捷键

### 配置git

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202207281002509.png)

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202207281002470.png)

> 后面个人工作流加入了Manico 所以`option`键经常用到，把git的快捷键改成了`control`键

### 配置文章输入模板

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202207281004723.png)

配置快捷键使用

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202212201723495.png)


### 配置日记

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202207281005601.png)


### 配置图床

picGo启动后会有个本地的服务器，安装picGo插件即可，默认配的就是那个端口号**36677**
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202207281007075.png)

### 安装表格插件 Advanced Tables

| 安装 | 即可 |
| ---- | ---- |
| 能用 | 就行     |

### 安装vim插件 vimrc Support

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202207281013002.png)

### 切换达到vscode的快捷键`command + p`

> 将原来的`comand + p` 改为其他的 比如 `command + o`

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202212201709424.png)


## Ipad

> 安装`ISH Shell`

app Store安装ISH


使用apk安装git
```shell
apk add git
```

git 一直卡住，一直拉不了远程仓库

ish里面可以使用mount 挂载命令 去指定挂载ipad的目录

后面在ipad安装working Copy，使用它去拉取远程仓库，但是吧这个东西copy到指定目录出来的东西是zip压缩包。。。

然后通过ish解压这个压缩包

这样就可以达到同步远程仓库的文件了。

但是这样真的太麻烦了。

后续找其他方法取代一下。

目前使用vitePress 部署整个obsidian 方便看


### 参考链接
- ['iSH，你的IOS设备移动开发终端使用教程1（在iPad上安装Linux） - 知乎'](https://zhuanlan.zhihu.com/p/133748589)
- [同步](https://gist.github.com/DannyQuah/f686c0e43b741468e12515cd79017489)
