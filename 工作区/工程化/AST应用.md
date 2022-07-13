---

title: AST

date: 2022-05-25 18:16:56

tags: ["工程化"]

excerpt: AST的概念与使用

---



#工程化

# AST



## 什么是AST



`AST` 是 `Abstract Syntax Tree` 的简称，是前端工程化绕不过的一个名词。它涉及到工程化诸多环节的应用，比如:

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

// AST
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

### 词法分析 (Lexical Analysis)

词法分析用以将代码转化为 `Token` 流，维护一个关于 Token 的数组

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





## AST的应用

[html的AST解析器](https://juejin.cn/post/6844903958574530568)

可参考一个最简编译器的实现 [the super tiny compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)

## 参考链接

[AST是啥和它的应用](https://q.shanyue.tech/engineering/756.html#ast-%E7%9A%84%E7%94%9F%E6%88%90)