---
title: 开发规范
date: 2022-06-03 11:30:09
tags: ["开发规范"]
---
#规范

# 开发规范的笔记
> 团队开发中，规范的重要性，不用多说。
> 由于每个开发者的IDE不同，即使IDE相同也会因为每个人的配置不一样导致格式化的结果不一样。如何确保团队内开发人员采用统一的格式化配置呢？
> 使用[prettier](https://prettier.io/)，

官方首先告诉你，Prettier 是一个 Opinionated 的代码格式化工具 
> 当前编写的代码 -> AST -> Prettier格式化后的代码

## prettier的使用
安装依赖
```bash
yarn add --dev --exact prettier
```

使用命令对代码进行格式化
```bash
yarn prettier --write src/index.ts
```

配置vscode对代码进行格式化
进入首选项
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206031417402.png)

配置vscode设置保存时自动格式化代码
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206031415004.png)

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206251341252.png)


Prettier 和已有的各种 Linters 是什么关系？以前一直用 JSLint 或 TSLint，甚至还会用到 StyleLint。现在 Prettier 支持 JS、TS、CSS，能够自动重新格式化这些代码，还有必要用各种 Linters 吗？如果 Prettier 和 ESLint/TSLint 一起用又会怎么样呢？

## Prettier 和各种 Linters 是什么关系？如何配合使用？
各种 Linters 是按照规则(Rules)去检查代码的，遇到不符合规则的代码就会提示你，有的规则还能自动帮你解决冲突。

当 ESLint 遇到 incorrect code 的时候，会提示你违反规则，让你修改代码以符合规则。

而 Prettier 则不会这么麻烦，它根本不管你之前符不符合什么规则，都先把你的代码解析成 AST，然后按照它自己的风格给你重新输出代码。

换句话说，Prettier 对应的是各种 Linters 的 Formatting rules 这一类规则。而且你用了 Prettier 之后，就不会再违反这类规则了！不需要你自己手动修改代码。

Prettier 和 Linters 的整合需要做两件事：

1.  禁用 Linters 自己的 Formatting rules，让 Prettier 接管这些职责。这些配置有现成的 Config，Linters 的配置继承这个 Config 就可以了。
2.  让 Linters 执行时首先能够调用 Prettier 格式化带啊，然后再检查 Code-quality 类规则。这是 由 Linters 的 Plugin 实现的。

使用prettier-eslint

```powershell
// 创建工程初始化的时候用
npm init prettier-eslint
// 或直接使用
npx create-prettier-eslint
```

[使用视频](https://vdn.vzuu.com/SD/v3_869e5642-d829-11e9-8f28-0a580a41862b.mp4?disable_local_cache=1&bu=http-da4bec50&c=avc.0.0&f=mp4&expiration=1654241303&auth_key=1654241303-0-0-fa2c2831adfb9fe45ea2319667b4f58c&v=ali&pu=da4bec50)





## 参考链接
https://zhuanlan.zhihu.com/p/81764012