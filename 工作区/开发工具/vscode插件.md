
---
title: vscodePlugins
date: 2022-07-13 13:31:26
tags: ["vscode", "vue", "plugins"]
---
#plugin #vue #vscode 

# vscode-vue-plugins的笔记
## 插件列表
**1、Auto Rename Tag**

修改html标签自动补全，改了首标签，尾部自动变。**webstrom自带**

**2、Code Runner**

自动检测packjson文件执行npm命令。**webstrom自带**

3、样式Material Theme

webstrom也有这样的插件，但是vscode丑好多

**4、eslint**

必须的

**5、GitLens — Git supercharged**

可以查看git所有提交记录，并且代码上面自动有提示

**6、Prettier**

必须的，注意有一个配置你不开启是没法自动格式化的，并且必须自己按保存，然后自动格式化。这个比webstrom好

注意"editor.formatOnSave": true,

该配置是自动保存的关键，因为安装插件是没有自动开启的，也不知道配置哪个，这个自己放在s

7、Settings Sync

把你的配置信息同步到git上面，这样就不会丢失信息了，换电脑都不怕，注意一定要记得保存秘钥和gistid

**提供一个额外的方式，你可以把你的.vscode文件保存下来，然后移植到新电脑，这样也可以转移你的所有配置**

8、vetur

写vue肯定要有

9、Visual Studio IntelliCode

这个还没使用，好像是可以记录你的代码习惯

**10、vscode-elm-jump**

常规的代码跳转定义，按ctrl，和webstrom一样

**11、Vue CSS Peek**

和webstrom一样，按ctrl可以跳转css定义，按ctrl，和webstrom一样

12、vue-helper

让你在vue单文件里面的变量函数跳转定义，按ctrl，和webstrom一样

13、Bracket Pair Colorizer 2

标识各种不一样的括号，挺好用的

14、Image preview

绝对路径下直接预览图片，vue文件的@就没用了

15、别名路径跳转，

名字就是这个，直接搜索就行了，提供关于import定义的跳转

  
  
  
  
  
## 引用
[参考链接](https://juejin.cn/post/6844904098538455047  )