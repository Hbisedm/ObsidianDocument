---
title: Vim的学习使用
date: 2022-07-02 19:53:06
tags: ["Vim的学习使用"]
---
#vim

# Vim的学习使用的笔记
## day1
### 收获&学习心得&心路历程：
- normal模式下使用`HJKL`移动。 
- normal与insert模式的切换。 
- 使用Karabiner-Element切换键盘的Caps与Control，并配置Rule 使用左Control＋HJKL成为方向键的功能。
- vscode配置setting.json达到 insert模式下control ＋ C 不会变成 normal模式。 
### 问题：
在vscode中使用`Control＋[`不能切换到normal模式，原因是setting.json中禁用了`vim.useCtrlKeys`键
## day2
### 收获&学习心得&心路历程： 
- yy复制 p粘贴 dd剪切 
- A 是blank的insert行首
 - I 不是blank的insert行尾 
 - 改键：`ctrl+H` -> ^ `ctrl+L` ->g _ 
 - 进入不是blank行尾可以使用 shift + L ＋i 
 - o 以insert进入下一行 
 - O 以insert进入上一行 
 ### 问题： 
 还是不习惯，需要多敲，形成肌肉记忆。
 
## day3
### 收获&学习心得&心路历程：
- 学习vim的语法(操纵＋范围)
- normal下w、e、b、ge的使用
	- w跳到下个单词的开头
	- e跳到下个单词的结尾
	- b跳到上个单词的开头
	- ge跳到上个单词的结尾
- normal下的操作：c、d、y
	- c 剪切后进入insert
	- d 剪切
	- y 复制
- 组合起来
	- bcw删除当前单词
	- ea当前单词结尾进入insert
	- d ＋ 数字键 ＋e 剪切n个单词
### 问题：
vim里面符号算做一个单词、一个连续字符在空格之前被vim当做一个单词。


## day4

### 收获&学习心得&心路历程：
- x normal模式下 删除当前的字符
- X normal模式下 删除上一个字符
- s normal模式下 删除当前字符并进入insert模式
- S normal模式下 删除当前行并进入insert模式
- r mormal模式下替换当前字符
- R mormal模式下替换多个字符
- redo与undo
	- u undo
	- control + r redo
	- 这里有个撤销块的概念，normal -> insert -> normal 这个insert内输入的字符的过程，就是个撤销块。使用u可以返回到第一个normal。但是如果使用快捷键control+h、j、k、l，会导致这个撤销块分成多个。按多几次u就行了

### 问题：
将这4天的按键还是不太熟悉，再慢慢练习。

## day6
### 收获&学习心得&心路历程： 
- 学习**可视化模式**
	- v 进入可视化
	- V 可视化行
	- C + v 可视化块
- 退出可视化
	- esc
	- `C + [`
	- v
	- V
	- 常用还是使用`ctrl + [`，因为可视化下，v 与 V 可进行切换，可能会混乱
- 导航
	- 配合动作： 进入可视化模式，通过动作来划分即将操作的区域
	- o：可视化模式下，将当前光标回到上一次操作的光标处
	- gv：normal模式下，将光标回到上一次可视化模式的光标处，且进入可视化模式。
- 语法：选中后操作。
	- 这个有时候需要多按几次键盘，
	- 如dd，剪切当前行，若使用可视化模式的话，需要 V ＋d，
	- 如de，剪切当前单词，ved
- 技巧
	- 多行操作的话，需要使用大写的`I` or `A`进入insert模式
	- 尽可能少使用可视化模式，有些操作normal模式能操作的，尽量用normal，可视化模式可能需要多按几次键。
### 问题：
使用系统剪切板和vim的剪切板，可以存到2个独立的空间，方便未来使用`p` or `command + v` ，这个在我这边的实现不了，操作系统mac，vscode#setting.json <C + c> 设置了false or true都实现不了。


## day7
### 收获&学习心得&心路历程： 
- 文本对象的概念
	- 文本是结构化，可以快速选择
	- 用`范围`来解释，较通俗易懂
- 语法
	- 操作 + 内部/外部 + 文本对象
	- 可视化模式 + 内部/外部 + 文本对象 
- 啥是内部、外部
	- 内部就是在一个`文本对象内`
	- 外部就是包含了这个`文本对象`
- 文本对象
	- t <> xml标签内
	- b () 括号内
	- B {} 代码块
	- w 一个单词
	- p 一个段落
	- '' "" ``
	- 一个句子
- vim-vscode插件 (vscode为我们提供，别的vim模式下，没有这2个对象)
	- vim-textobj-arguments (括号里面的参数作为对象)
		- ia 不含包分隔符 => i(内部) a(arguments)
		- aa 包含分隔符=> a(外部) a(arguments)
	- vim-textobj-entire (整个文本作为对象)
		- ae 所有内容 => i(内部) e(entire)
		- ie 当前文本的所有内容，但是不包含前面与后面的空格、换行=> a(外部) e(entire)


### 问题：
仍然需要多多练习，每次中文输入后，记得切shift后ctrl+`[`

## day8 
### 收获&学习心得&心路历程： 
- 如何快速翻页，更加脱离鼠标了。
  - `ctrl + f`forward 向下翻一页
  - `ctrl + b`backward 向上翻一页
  - `ctrl + d` 向下翻半页
  - `ctrl + u` 向上翻半页
  - `ctrl + e` 保留光标向下滚动
  - `ctrl + y` 保留光标向上滚动

- 配置normal模式与可视化模式的`J` `K`
	- `J` -> `5 j`
	- `K` -> `5 k`
	- 这样配置后每次按`shift`+`hjkl`都可以在normal下移动光标，方便操作。
- `zz` 将当前光标所在的行，置于屏幕中间
- `zt`top 将光标置于当前屏幕的上方
- `zb`bottom 将光标置于当前屏幕下班
- `gg` 光标到代码的最开始
- `G` 光标到代码的末位
- `行数 + gg` or `行数 + G` 移动光标到指定的代码行数

### 问题
- 已经用到工作中，有些命令逐渐慢慢形成肌肉记忆
- ciw、daa超级方便快速修改。


## day9
### 收获&学习心得&心路历程： 
今天主要学习到了vim的搜索功能，分为单行搜索与文件内搜索
- 单行搜索
	- `f + 搜索的字符` 当前向后搜索到对应的字符
	- `F + 搜索的字符` 当前向前搜索到对应的字符
	- `t + 搜索的字符` 当前向后搜索到对应的字符的上一个
	- `T + 搜索的字符` 当前向前搜索到对应的字符的上一个
	- `;` 重复上述的操作
	- `,`反转方向重复上述操作
	- 技巧： 
		- 移动光标的时候使用f
		- 剪切的时候使用t
- 全局搜
	- `/` 向后查询
	- `?` 向前查询
	- `n` 重复下个查询
	- `N` 反转重复下个查询
	- `#` 向上查
	- `*` 向下查

### 问题
- 更加快速操作单行操作。
- 查找函数名更加便捷。

## day11
### 收获&学习心得&心路历程：
- vim-easymotion
	- `<leader><leader>`w
	- `<leader><leader>`b
	- `<leader><leader>`e
	- `<leader><leader>`ge
	- `<leader><leader>`j
	- `<leader><leader>`k
	- `<leader><leader><leader>`j
- vim-sneak
	- s + 2个字符 等于f的功能
	- 改建f -> s/z
		- 可视化、normal模式下 
		- operation模式下 
### 问题
配置好每一个改键的作用，写一份json文件
```json
	"vim.easymotion": true,
  "vim.leader": "<space>",
  "vim.useSystemClipboard": true,
  "vim.sneak": true,
  // 用f替换s功能，并把s功能重新赋值 s功能：删除当前光标字母并输入，
  // S功能 删除当前行，并输入
  "vim.normalModeKeyBindingsNonRecursive": [
    // 非递归
    {
      "before": ["f"],
      "after": ["s"]
    },
    {
      "before": ["F"],
      "after": ["S"]
    },
    {
      "before": ["s"],
      "after": ["c", "l"]
    },
    {
      "before": ["S"],
      "after": ["^", "C"]
    }
  ],
  "vim.visualModeKeyBindingsNonRecursive": [
    // 可视化模式 用f替换s
    {
      "before": ["f"],
      "after": ["s"]
    }
    // {
    //   "before": ["F"],
    //   "after": ["S"]
    // }
    // 开了也没啥用
  ],
  "vim.operatorPendingModeKeyBindingsNonRecursive": [
    //  非递归
    {
      "before": ["f"],
      "after": ["z"]
    },
    {
      "before": ["F"],
      "after": ["Z"]
    }
  ],
```

## day12
### 收获&学习心得&心路历程：
- 数字的使用
	- num + operator + 动作
	- operator + num + 动作
	- 可以很好的撤销动作，不用多按几次u
	- 但是这个需要一定思考时间，不能瞬间知道需要按数字几
- 学习`.`的使用，当normal - insert - normal `.`会记录上次的操作，重复记录的动作。
	- 删除一个单词，推荐使用diw，因为可以借助`.`帮我们快速删除，如果使用bde，dbx可能会删不全面。
		- bde只会删除当前光标到最后的字符
		- dbx只会删除一个
	- 核心：一键移动 一键操作
		- 使用搜索模式下，将这个词改了，使用n、N跳到下一个单词的时候可以使用`.`快速修改。
	- 能够重复的动作，就别用数字
### 问题
昨天跟今天的学习知识，对vim的上手越来越便捷。慢慢练习，肌肉记忆慢慢来。

## day13
### 收获&学习心得&心路历程：
今日学习如何快速在单文件与多文件内快速跳转。
- 标记
	- 单文件标记：`m+大写字符` 
	- 多文件标记：`m+大写字符`
- 跳转标记
	- `'+标记字符`跳转到当前行	
	- `+标记字符`跳转到当前行与列
	- gd 跳转到定义
		- function定义
		- 变量定义
		- etc
		- vscode中vue这种sfc需要安装插件才能达到跳转
- 跳转
	- `ctrl + o` 往回跳
	- `ctrl + i` 往前跳
	- 查看跳转历史：`:jumps`
	- 不会记录的跳转：
		- 翻页： `ctrl + f/d/b/u`
		- `shift + jk` 这个是之前改建的，原理是`5j/5k`
	- vim-sneak：只会记录跳转一次，`;`多次使用后，`ctrl + o`也只会回到第一次使用的位置
### 问题
跳转用在写函数的时候，想知道的他的实现，多个模块文件之间的引用，采用`gd`很方便查看它们之间的关系。`ctrl + o` `gd` `m+字符`比较常用的操作。