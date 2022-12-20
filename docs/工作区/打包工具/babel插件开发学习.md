---
title: babel插件开发学习的笔记
tags: ["babel插件开发学习"]
创建时间: 星期六, 十一月 19日 2022, 1:19:00 下午
修改时间: 星期日, 十一月 20日 2022, 4:33:03 下午
---
#babel #plugins

# babel插件开发学习的笔记

> 目的: 学习babel的插件开发、重温ast
> 参考: [如何给所有的async函数添加try/catch？](https://juejin.cn/post/7155434131831128094)

## babel插件的实现思路

- 借助AST抽象语法树，遍历查找代码中的await关键字
- 找到await节点后，从父路径中查找声明的async函数，获取该函数的body（函数中包含的代码）
- 创建try/catch语句，将原来async的body放入其中
- 最后将async的body替换成创建的try/catch语句


## 核心-AST

> AST有两个阶段 词法分析 和 语法分析

[[AST应用#词法分析 (Lexical Analysis)]]
[[AST应用#语法分析 (Syntactic Analysis)]]

source -> token -> AST

[[AST应用#常用的 AST 节点类型对照表]]

## Await 的AST结构

没增加try-catch的样子

```js
async function fn() {
   await f()
}
```

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202211191408853.png)

增加try-catch后

```js
async function fn() {
    try {
        await f()
    } catch (e) {
        console.log(e)
    }
}
```

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202211191414858.png)

> **通过AST结构对比，插件的核心就是将原始函数的body放到try语句中**

了解目的后接下来开始开发

### babel的集合模块们

> **Babel 实际上是一组模块的集合**。本节我们将探索一些主要的模块，解释它们是做什么的以及如何使用它们。

- babylon
	- source => ast
- babel-traverse
	- 根据自定义case循环处理ast的结构
- babel-types
	- Babel Types模块是一个用于 AST 节点的 Lodash 式工具库

	```js
	import traverse from "babel-traverse";
	import * as t from "babel-types";
	
	traverse(ast, {
	  enter(path) {
	    if (t.isIdentifier(path.node, { name: "n" })) {
	      path.node.name = "x";
	    }
	  }
	});
	``` 

- babel-generator
	- Babel Generator模块是 Babel 的代码生成器，它读取AST并将其转换为代码和源码映射（sourcemaps）。
- babel-template
	- babel-template 是另一个虽然很小但却非常有用的模块。 它能让你编写字符串形式且带有占位符的代码来代替手动编码， 尤其是生成的大规模 AST的时候。 在计算机科学中，这种能力被称为准引用（quasiquotes）。

### 开发插件

> 让我们把这些知识和插件的 API融合在一起来编写第一个 Babel 插件吧。

> 由于你将会经常这样使用，所以直接取出 babel.types会非常方便

>  返回 `visitor`属性是这个插件的主要访问者

> Visitor 中的每个函数接收2个参数：path 和 state

```js
export default function({ types: t }) {
  return {
    visitor: {
      Identifier(path, state) {},
      ASTNodeTypeHere(path, state) {}
    }
  };
};
```

 简单理解：
 1. function的参数对象里面的types 就是 `babel-types`
 2. vistor中每个方法第一个参数`path.node` 就是 拿到当前代码的AST
 3. vistor中每个方法第二个参数`state`就是 拿到一系列状态的集合

#### 检查路径（Path）

> babel-types 的第一个参数

```js
{
  "parent": {...},
  "node": {...},
  "hub": {...},
  "contexts": [],
  "data": {},
  "shouldSkip": false,
  "shouldStop": false,
  "removed": false,
  "state": null,
  "opts": null,
  "skipKeys": null,
  "parentPath": null,
  "context": null,
  "container": null,
  "listKey": null,
  "inList": false,
  "parentKey": null,
  "key": null,
  "scope": null,
  "type": null,
  "typeAnnotation": null
}
```

### 状态(state)

就是一系列状态的集合，包含诸如当前 plugin 的信息、plugin 传入的配置参数信息，甚至当前节点的 path 信息也能获取到，当然也可以把 babel 插件处理过程中的自定义状态存储到state对象中。


### 实现代码

https://github.com/Hbisedm/auto-add-try-catch-to-await-case

