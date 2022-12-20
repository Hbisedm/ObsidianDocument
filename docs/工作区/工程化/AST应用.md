---
title: AST
tags: ["工程化"]
excerpt: AST的概念与使用
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期六, 十一月 19日 2022, 7:32:50 晚上
---
#工程化 #AST

# AST

## 什么是AST
> `AST` 是 `Abstract Syntax Tree` 的简称，是前端工程化绕不过的一个名词。它涉及到工程化诸多环节的应用，比如:

1. 如何将 Typescript 转化为 Javascript (typescript)
2. 如何将 SASS/LESS 转化为 CSS (sass/less)
3. 如何将 ES6+ 转化为 ES5 (babel)
4. 如何将 Javascript 代码进行格式化 (eslint/prettier)
5. 如何识别 React 项目中的 JSX (babel)
6. GraphQL、MDX、Vue SFC 等等

而在语言转换的过程中，实质上就是对其 AST 的操作，核心步骤就是 AST 三步走

1. Code -> AST (Parse)
2. AST -> AST (Transform)
3. AST -> Code (Generate)

> TS转换JS的过程：TS的Code 转成 TS的AST；TS的AST转成JS的AST；JS的AST转成JS的Code

![img](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205292105187.webp)

以下是一段代码，及其对应的 AST（抽象的语法树）

```js
// Code
const a = 4

// 对应的AST
{
  "type": "Program",
  "start": 0,
  "end": 11,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 11,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 6,
          "end": 11,
          "id": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "start": 10,
            "end": 11,
            "value": 4,
            "raw": "4"
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "module"
}
```

不同的语言拥有不同的解析器，比如 Javascript 的解析器和 CSS 的解析器就完全不同。（一般JS的解析器是babel，CSS的解析器是postCss）

对相同的语言，也存在诸多的解析器，也就会生成多种 AST，如 `babel` 与 `espree`。

在 [AST Explorer (opens new window)](https://astexplorer.net/)中，列举了诸多语言的解析器(Parser)，及转化器(Transformer)。

![image-20220529211605976](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205292116023.png)

![image-20220529211636863](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205292116906.png)

使用不同的解析器，就会解析出不同的AST

## 生成的AST
> 生成AST的过程分为两步——词法分析、语法分析。
### 词法分析 (Lexical Analysis)

词法分析用以将代码转化为 `Token` 流，维护一个关于 Token 的数组

可以把 tokens 看作是一个扁平的语法片段数组，描述了代码片段在整个代码中的位置和记录当前值的一些信息

![img](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205292122553.webp)

```js
// Code
a = 3

// Token
[
  { type: { ... }, value: "a", start: 0, end: 1, loc: { ... } },
  { type: { ... }, value: "=", start: 2, end: 3, loc: { ... } },
  { type: { ... }, value: "3", start: 4, end: 5, loc: { ... } },
  ...
]
```

词法分析后的 Token 流也有诸多应用，如:

1. 代码检查，如 eslint 判断是否以分号结尾，判断是否含有分号的 token
2. 语法高亮，如 highlight/prism 使之代码高亮
3. 模板语法，如 ejs 等模板也离不开

### 语法分析 (Syntactic Analysis)

语法分析阶段会把 token (令牌) 转换成 AST 的形式，这个阶段会使用token中的信息把它们转换成一个 AST 的表述结构，使用type属性记录当前的类型

语法分析将 Token 流转化为结构化的 AST，方便操作

```js
{
  "type": "Program",
  "start": 0,
  "end": 5,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 5,
      "expression": {
        "type": "AssignmentExpression",
        "start": 0,
        "end": 5,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 1,
          "name": "a"
        },
        "right": {
          "type": "Literal",
          "start": 4,
          "end": 5,
          "value": 3,
          "raw": "3"
        }
      }
    }
  ],
  "sourceType": "module"
}
```


### 常用的 AST 节点类型对照表

| 类型原名称              | 中文名称         | 描述                                                  |
| ----------------------- | ---------------- | ----------------------------------------------------- |
| Program                 | 程序主体         | 整段代码的主体                                        |
| VariableDeclaration     | 变量声明         | 声明一个变量，例如 var let const                      |
| FunctionDeclaration     | 函数声明         | 声明一个函数，例如 function                           |
| ExpressionStatement     | 表达式语句       | 通常是调用一个函数，例如 console.log()                |
| BlockStatement          | 块语句           | 包裹在 {} 块内的代码，例如 if (condition){var a = 1;} |
| BreakStatement          | 中断语句         | 通常指 break                                          |
| ContinueStatement       | 持续语句         | 通常指 continue                                       |
| ReturnStatement         | 返回语句         | 通常指 return                                         |
| SwitchStatement         | Switch 语句      | 通常指 Switch Case 语句中的 Switch                    |
| IfStatement             | If 控制流语句    | 控制流语句，通常指 if(condition){}else{}              |
| Identifier              | 标识符           | 标识，例如声明变量时 var identi = 5 中的 identi       |
| CallExpression          | 调用表达式       | 通常指调用一个函数，例如 console.log()                |
| BinaryExpression        | 二进制表达式     | 通常指运算，例如 1+2                                  |
| MemberExpressionh       | 成员表达式       | 通常指调用对象的成员，例如 console 对象的 log 成员    |
| ArrayExpression         | 数组表达式       | 通常指一个数组，例如 [1, 3, 5]                        |
| FunctionExpression      | 函数表达式       | 例如const func = function () {}                       |
| ArrowFunctionExpression | 箭头函数表达式   | 例如const func = ()=> {}                              |
| AwaitExpression         | await表达式      | 例如let val = await f()                               |
| ObjectMethod            | 对象中定义的方法 | 例如 let obj = { fn () {} }                           |
| NewExpression           | New 表达式       | 通常指使用 New 关键词                                 |
| AssignmentExpression    | 赋值表达式       | 通常指将函数的返回值赋值给变量                        |
| UpdateExpression        | 更新表达式       | 通常指更新成员值，例如 i++                            |
| Literal                 | 字面量           | 字面量                                                |
| BooleanLiteral          | 布尔型字面量     | 布尔值，例如 true false                               |
| NumericLiteral          | 数字型字面量     | 数字，例如 100                                        |
| StringLiteral           | 字符型字面量     | 字符串，例如 vansenb                                  |
| SwitchCase              | Case 语句        | 通常指 Switch 语句中的 Case                           |






## AST的应用

[html的AST解析器](https://juejin.cn/post/6844903958574530568)

可参考一个最简编译器的实现 [the super tiny compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)


> 下面介绍下 JS AST -> 字节码 -> 解释编译执行代码的过程

## 生成字节码
js代码生成为AST，若要执行需要通过V8 的解释器(也叫Ignition)转为字节码再转为机器码
> 为啥不直接转机器码？
1. 早期V8是这么做的，但后来因为机器码的体积太大了，引发了严重内存占用问题。
2. 字节码可以在不同的平台上经过解释器跑达到相同的结果。

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202207141501320.png)
> 很容易得出，字节码是比机器码轻量得多的代码。那 V8 为什么要使用字节码，字节码到底是个什么东西？

字节码是介于AST与机器码直接的一种代码。但是与特定类型的机器码无关。字节码需要通过解释器将其转为机器码然后运行。
字节码仍然需要转换为机器码，但和原来不同的是，现在不用一次性将全部的字节码都转换成机器码，而是通过解释器来**逐行**执行字节码，**省去了生成二进制文件**的操作，这样就大大**降低了内存**的压力。

## 执行代码
> 编译器和解释器的 根本区别在于前者会编译生成二进制文件但后者不会。

上文说道字节码是逐行执行，但是如果发现某一部分代码重复出现，那么V8将它记作**热点代码**(HotSpot)，然后代码**编译**成机器码保存起来。

这个用来编译的工具就是V8的`编译器`(也叫做`TurboFan`) , 因此在这样的机制下，代码执行的时间越久，那么执行效率会越来越高，因为有越来越多的字节码被标记为`热点代码`，遇到它们时直接执行相应的机器码，不用再次将转换为机器码。

其实当你听到有人说 JS 就是一门解释器语言的时候，其实这个说法是有问题的。因为字节码不仅配合了解释器，而且还和编译器打交道，所以 JS 并不是完全的解释型语言。

并且，这种字节码跟编译器和解释器结合的技术，我们称之为`即时编译`, 也就是我们经常听到的`JIT`。（这里和Java的JIT与Android的NDK编程应该是同个东西吧）

V8中执行一段JS代码的过程：
1. 首先通过词法分析和语法分析生成 `AST`
2. 将 AST 转换为字节码
3. 由解释器逐行执行字节码，遇到热点代码启动编译器进行编译，生成对应的机器码, 以优化执行效率


## 参考链接
[AST是啥和它的应用](https://q.shanyue.tech/engineering/756.html#ast-%E7%9A%84%E7%94%9F%E6%88%90)
[V8如何执行一段JS代码](https://sanyuan0704.top/blogs/javascript/js-v8/003.html)