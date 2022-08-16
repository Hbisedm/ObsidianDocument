---
title: Vim的学习使用的笔记
tags: ["Vim的学习使用"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期二, 八月 16日 2022, 11:37:39 晚上
---
#vim

# Vim的学习使用的笔记
> 参加一个vim的训练营，主要是围绕vim的基本使用，vscode的一些插件、改键达到键盘替代鼠标的效果。


## day1
### 收获&学习心得&心路历程：
- normal模式下使用`HJKL`移动。
- normal与insert模式的切换j。
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

## day14
### 收获&学习心得&心路历程：
学习处理包裹字符的符号
- vim-surround
	- `c + s + <existing> + <desired>`修改包裹字符
	- `y + s + <motion> + <desired>`增加包裹字符 motion -> iw ie ...
	- `d + s + <existing>`删除包裹字符
	- `S + <desired>` 可视化模式下大写S处理包裹字符
### 问题
比较常用的是 normal下的增删改操作，若需要处理多个再用可视化模式下的`S`


## Day 15
### 复习日
文本对象 p -> 段落

行数 + gg / G 跳转到对应的行数

`.`的使用
快速替换 进入搜索模式匹对后，ciw 修改 返回normal 使用n/N ＋ `.`

标记 单文件与多文件 快速跳转到位置
gd 跳转到定义or实现

处理包裹字符的符号

## day16
### 收获&学习心得&心路历程
> 目的：学习替换字符串

> vim替换字符串公式
>`:[range]s[ubstitute]/{pattern}/{string}/[ﬂags]`

`[]`为可选的
- range 范围
	- % 全文
	- $ 当前到文件尾部
	- num,num 指定行数范围
- substitute 一般简写s
- flags
	- g 全部替换当前范围内匹配的字符串
	- c 可选替换当前范围内匹配的字符串

可视化模式： 选中的范围

gb 多选当前单词 ：按n次gb匹配n次当前单词

### 问题

`gcl`注释当前行代码
公式需要脑海记下，运用多次后才可以达到肌肉记忆。
平时记录使用obsidian 没有vim-surround

## day17
### 收获&学习心得&心路历程

> 目的：学习键盘模拟鼠标悬浮、切换大小写、注释代码

- 悬浮
	- gh
- 切换大小写
	- gu + 范围 范围内容转为小写
	- gU + 范围 范围内容转为大写
	- 可视化模式下
		- u 选中内容转为小写
		- U 选中内容转为大写
	- ~ 当前当前光标的字符大小写
- 注释代码
	- gc 注释单行 -> `//`
	- gC 注释多行 -> `/* */`
	- tip： 可视化模式与normal通用。


## day18
### 收获&学习心得&心路历程

> 学习如何切换窗口，

- 新建窗口
	- C-w v
	- C-w s
- 切换窗口
	- C-w hjkl
	- C-w w
- 关闭窗口
	- C-w c
	- C-w o 保留当前窗口，关闭其他窗口

使用vscode改键，快速上手
- 新建窗口
	- Command + \
	- Command + Ctrl + \
- 关闭窗口
	- Command + w
	- Comanand + k + w
- 切换窗口
	- shift + 方向键

### 问题
遇到窗口内tab如何切换的问题。问了群里的小伙伴，哦，还有个gt gT的切换


## day19

### 收获&学习心得&心路历程

目的： 学习删除一个函数

- % 用于匹配括号
- vim-indent-object

- dap 基于段落 => 段落：空格隔开为一个段落
- daI 基于缩进， 需要在函数体内
	- 改键 i maps I 少按shift
- `V$%d`
	- 改键 `<leader> d f` -> `V $ % d`
	- 缺点：需要在函数的定义那一行使用，且需要参数都要在同一行。
以后删除就用：
- 函数定义的行使用 `<leader> d f`
- 函数内部使用`dai`


## day20

### 收获&学习心得&心路历程

> 学习宏操作。
> 宏：可以录制一系列操作。

- 开始录制：q + 寄存器名称 如 qa
- 结束录制：q
- 查看录制好的宏：`:reg<空格><寄存器名称>` 如`:reg a`
- 使用： `@寄存器名称` 如`@a`
- 调用最后一次执行的宏 `@@`
- 重复执行： 数字键 + @ + 寄存器 如 `5@a` 五次执行宏a
- 安全机制：调用失败会有个报错提示
- 追加宏： qA
- 修改宏： （vscode插件没效果，切换到终端的vim没问题）
	- 取出来
		- `"<寄存器名称>p` 如`"ap` 复制a的宏操作过程出来
		- `:put<空格><寄存器名称>` 如`:put a`
	- 修改：
		- `"<寄存器名称>yw`
		- `"<寄存器名称>yy`
- 录制技巧：
	- 定好光标位置
	- 移动时候使用相对位置
		- 如：w、e 、f ....
		- hjkl是绝对位置







## day21

### 收获&学习心得&心路历程

> 今日学习如何配置vscode的命令。

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202207220947640.png)

这里可以查看vscode的命令列表

```json
"vim.normalModeKeyBindingsNonRecursive": [

	{
      "before": ["<Leader>", "f", "d"],
      "commands": ["editor.action.formatDocument"]
    },
    {
      "before": ["<Leader>", "r", "n"],
      "commands": ["editor.action.rename"]
    },
     {
      "before": ["<Leader>", "["],
      "commands": [
        {
          "command": "editor.fold"
        },
        {
          "command": "vim.remap",
          "args": {
            "after": ["$", "%"]
          }
        }
      ]
    }
]
```

举个例子： 配置上面的formatDocument，先在vscode命令里面找到，命令ID 即`editor.action.formatDocument`，然后diy normal模式下的值 `<Leader>+f+d`。
其他命令类似如此的配置。

## day22

### 收获&学习心得&心路历程

> 操作文件

- 切到 ﬁles explorer 区域
	- `ctrl + ;` 互相切换editor 区域与 files explorer
	- `ctrl + '` 切换到editor
- 新建文件
	- `a`
	- `Leader + n + f`
	- 插件 file Utils
- 新建文件夹
	- `A`
	- `Leader + n + d`
- 重命名文件
	- `r`
- 删除文件
	- `d`

主要在vscode中查找对应的命令，接着在`keybinding.json`中添加自定义按键


## day23

### 收获&学习心得&心路历程

> 学习vscode的窗口操作

- 新建项目 `shift + command + n`
- 进入指定的项目 `ctrl + r`
- 切换项目 command + `
- 关闭项目 `command + w`

这个学习后，直接不用每次都去找项目了。直接`ctrl + r`超级快捷


## day24

### 收获&学习心得&心路历程

> 学习vscode的搜索

- 全局搜索
	- shift + command + f
	- 搜索输入框的移动 command + up / down
	- 搜索详情的打开关闭 shift + command + j
- 工作区搜索
	- command + t
- 当前文件搜索
	- command + shift + o
		- @ + : 会排序变量和函数
- 搜索命令
	- command + shift + p
- 搜索文件
	- command + p
- 切换文件
	- vim gt、gT
	- ctrl + tab（ctrl 按住 tab按一次切一次）

- `>` 搜索命令
- `@` 搜索当前文件
- `#` 全局搜索

## day25

### 收获&学习心得&心路历程

> 学习快捷地编码

- 显示编码动作
	- 如输入一个外部文件，需要引入的代码，是可以这个
	- `command + .`
- 显示输入建议
	- 如函数参数的输入建议
	- `shift + command + enter`
- 触发建议
	- 如当前编码时的建议变量
	- `command + i`
- 移动行
	- `option + up/down`
- 增加行
	- `comand + enter` 向下增加
	- `command + shift + enter` 向上增加
- 删除前面的单词
	- `option + delete`
	- `option + ctrl + delete`
- 跳转到错误的地方： `F8` (这是基于整个工作区的跳转，不是当前文件)
- 选择所有出现的当前单词
	- `command + F2`
	- `gb` 是一个一个的选择

## day26

### 收获&学习心得&心路历程

> 学习发现使用快捷键的场景

- 显示、隐藏资源管理器 `command + b`
- live server
	- 启动服务 `command + I command + O`
	- 关闭服务 `command + I command + C`
- 预览Markdown文件
	- 分屏预览 `command + k + v`
	- 直接预览 `command + shift + v`
- 显示当前文件的路径的Finder `command + K + R`
- copy当前文件的绝对路径 `command + K + P`

## day27

### 收获&学习心得&心路历程

> 学习[[git]]的一些使用

- 打开source control面板
	- `shift + control + g`
	- `<Leader> + g + g`
- stage change `<Leader> + g + s`
- commit `<Leader> + g + c`
- diff `<Leader> + g + d + f`
- unstage change `<Leader> + g + u`
- discard change `<Leader> + g + cl`
- edamagit(一个插件)


# day28

## 收获&学习心得&心路历程

- 只用homebrew安装lazygit
- zsh配置文件配置下别名`alias lg='lazygit`
- 在一个含有`.git`的目录下使用终端输入`lg`
- 进入lazygit
- 使用`x` or `?` 查看命令
- 使用`H` `L`可以移动区域
- 使用`J` `K` 进入区域内进行移动
- 空格切换状态
- 暂存区使用`a`选择全部进行暂存切换
- 使用`c`进行提交
- `p`拉取远程
- `P`推送远程
- `M`合并到当前HEAR

## day29

### 收获&学习心得&心路历程

> 学习vscode snippets

- 安装一些插件
	- 使用vscode的插件，搜索snippets
	- 安装需要的snippets
	- vue snippets 、ES6
- 使用插件里面的prefix快速生成需要的代码
- 可以用户自定义snippets[官网链接](https://code.visualstudio.com/docs/editor/userdefinedsnippets)



## day30

### 收获&学习心得&心路历程

> 学习快捷的重构操作

vscode提供了一些重构操作，但往往不够使用
快捷键
- `command + .`
- `ctrl + shift + r`

安装一些插件
- abracadabra
- hocus pocus
	- 先用后赋值
	- 配置`<Leader> + f + f` `<Leader> + v + v`创建当前需要的函数or变量名
- javascript booster
	- 与abracadabra互补

## day31

### 收获&学习心得&心路历程

> 学习Vspace code插件的使用过

- 安装vspace code
	- 初始化操作
		- 配置setting.json的
		- 可视化 "vim.visualModeKeyBindingsNonRecursive"
		- normal "vim.normalModeKeyBindingsNonRecursive"

```json
		{
	      "before": ["<space>", ";"],
	      "commands": ["vspacecode.space"]
	    }
```

  - 配置keybindings.json
```json
	    {
    "key": "space",
    "command": "vspacecode.space",
    "when": "activeEditorGroupEmpty && focusedView == '' && !whichkeyActive && !inputFocus"
  },
  // Trigger vspacecode when sidebar is in focus
  {
    "key": "space",
    "command": "vspacecode.space",
    "when": "sideBarFocus && !inputFocus && !whichkeyActive"
  },
``` 

编辑区是用`空格+;` 不是编辑区使用`空格`

也可以修改默认的配置，具体参考[官方文档](https://vspacecode.github.io/docs/menu-customization)


# day32

## 收获&学习心得&心路历程

> 学习vscode内的终端快捷操作

1. 打开终端
	- `command + j`
	- `ctrl + 波浪线`
	- 改键`workbench.action.terminal.toggleTerminal` 为`ctrl + ,`
3. 清空终端
	- `command + k`
3. 分屏
	- `command + \`
4. 分屏切换
	- 改键
		- `workbench.action.terminal.focusNextPane`
		- `workbench.action.terminal.focusPreviousPane`
	- `command + [`
	- `command + ]`
6. 关闭终端
	- 改键 `workbench.action.terminal.kill`
	- `shift + alt + q`
8. 新建终端
	- 改键 `workbench.action.terminal.new`
	- `shift + alt + n`
10. 窗口切换
	- `shift + command + [`
	- `shift + command + ]`
11. 直接打开外部终端 需要再编辑区使用，不能在终端使用！！！
	- 使用iterm2作为外部终端
	- `shift + cmd +c`

- 如何查找想要的配置的快捷键
- google
- vscode github
- 知道默认快捷键的前提下，复制对应的命令进行配置

常用：
- 切换终端
- 开启外部终端
- 清空终端



# day33

## 收获&学习心得&心路历程

> 使用vscode进行debug的快捷操作

常规操作和其他ide差不多都是`F5 F8 F9 F10 F11`

但是键盘离得太远了。不太方便按

- 开始debug `F5`
- 停止debug `shift F5`
- 重新debug `shift + commmand + 0` 0表示重零开始
	- workbench.action.debug.restart
- 打断点 `shift + command + 9`
	- editor.debug.action.toggleBreakpoint
- 进入下一步 `command + '`
	- workbench.action.debug.stepOver
- 进入函数内下一步 `command + shift + '`
	- workbench.action.debug.stepInto
- 跳过断点 `F5`
- 也可以使用Vspacecoce `command + ; + d + d` 快速进入debug模式

## day33

### 收获&学习心得&心路历程

> 在Chrome中使用vim去操作浏览器

有2款插件vimium 与vimium C
选择使用vimium C 功能更加强大点

- `？`查看帮助面板
- 移动
	- `j`
	- `k`
	- `u`
	- `d`
	- `gg`
	- `G`
- 点击网页中的链接和按钮
	- `f` 跳转
	- `F` 打开新窗体
- 历史记录
	- `H` 回退
	- `L` 前进
- 切换标签
	- `K` 下一个
	- `J` 上一个




## day34

### 收获&学习心得&心路历程

- `g + i` 找到当前页面显示的输入框， 并将锚点指向它
- `y + y` 复制当前页面的地址
- `p` 将当前页面跳转到剪切板里面的地址
- `P` 打开个新的标签页跳转剪切板的地址
- `r` 刷新 `command + r`
- `x` 关闭 `command + w`
- `y + v` 进入可视化模式
- 改键
	(改键wiki)[https://github.com/gdh1995/vimium-c/wiki/Use-in-another-keyboard-layout]




## day35

### 收获&学习心得&心路历程

- 搜索功能 可配置搜索引擎快捷键 如`g` google、 `b` baidu、配了个b站 `bl`
	- o
	- O (打开新一个标签页)
- 搜索收藏夹中书签内容
	- b
	- B(打开新一个标签页)
- 显示搜索框、编辑当前标签的URL地址栏
	- ge
	- gE(打开新一个标签页)
- 浏览器当前打开的所有标签页选择
	- T
- 搜索当前页面内容和vim操作一样
	- `/ + 搜索内容`
	- `n` 向下搜索
	- `N` 向上搜索


## day36

### 收获&学习心得&心路历程

> 学习标签的切换

切换到最左为止标签页 `g0` 改键 `gH`
切换到最右为止标签页 `g$` 改键 `gL`

打开新的标签页 `t` 自定义打开的页面， 可以在配置中修改
复制当前标签页 `yt`

关闭标签页 `x`
恢复最近关闭的标签页 `X`

移动当前标签页到下一个窗口 `W`
切换到最近访问的标签页 `^` 改键 `g[`

向左移动标签页 `<<` 有点类似代码缩进的意思
向右移动标签页 `>>`

固定or取消固定标签页 `option + p`


## day37

### 收获&学习心得&心路历程

> 学习一些常用操作
- 标记当前网页位置 `m` 与点
- 返回网页的上一层 gu
- 返回网页的首页 gU 这两个 与 `H` 配合起来 当然这对hash的路由是没作用，需要是history
- 暂停vim的使用 i
- 连续点击 `option + f`
- 从文本框取消与恢复焦点 `F2`



## day38

### 收获&学习心得&心路历程

> 学习使用快捷键操作谷歌浏览器的devtool

- 打开devtool
	- 显示隐藏当前 `command + option + i`
	- 显示隐藏控制台 `command + option + j`
	- 进入元素选择 `command + shift + c`
- 焦点聚焦控制台 `ctrl + 点`
- 清空控制台 `command + k`
- 搜索文件 `command + p`
- 切换面板 `command + [` `command + ]`
- element or source 显示 控制台 `esc`
- devTool开启vscode快捷键


## day39

### 收获&学习心得&心路历程

> 学习使用Chrome的Debug

打断点、取消断点 `command + b`
跳过断点 `command + shift + b`
step over `cmd + '` `F10`
step into `cmd + ;` `F11`
停止当前的断点 `F5` `cmd + \`
开启or关闭所有的断点 `command + f8`
选中的代码打印出来 `command + shfit + e`
跳转函数 `command + shift + o`
跳转到指定行 `ctrl + g`

有些和之前的vscode debug 一样，比如当时的改键也是根据Chrome的 `step over` `step into`


## day40

### 收获&学习心得&心路历程

> 学习iterm2的一些导航操作

- 新建窗口
	- 左右`command + d`
	- 上下`command + shift + d`
- 切换窗口
	- `command + [/]` 更习惯这个
	- `command + option + 方向键`
- 新建标签 `command + t`
- 关闭 `command + w`
- 切换标签
	- `command + 数字键`
	- `command + 方向键`