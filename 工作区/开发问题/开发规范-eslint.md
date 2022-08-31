---
title: 开发规范-eslint的笔记
tags: ["开发规范-eslint"]
创建时间: 星期三, 八月 31日 2022, 10:57:07 晚上
修改时间: 星期三, 八月 31日 2022, 11:14:16 晚上
---
#eslint #开发规范

# 开发规范-eslint的笔记

- 基本使用
- plugins与config的区别

## 使用

1. `pnpm add eslint --save-dev`
2. `pnpm create @eslint/config` 跟着cli的提示安装就行

```js
{
  "env": { //环境
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended", // 继承哪个文件（一样的结构）
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": { // 解析规范
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}

```


### 为啥需要eslint
js是动态语言，编写代码的时候没有合理的警告，（合理指的是 代码规范性，正常代码的不该出现的写法，毕竟写代码的人鱼龙混杂。。。）

### eslint的作用
js经过 ESpree 解析 成对应代码的AST ，eslint 是对这颗ast树进行解析和处理的工具。

## Plugins

`plugins`属性

`eslint-plugin-xxx`提供了一些功能，但是使用起来的话需要与`rules`配合

例子:
引入react插件，它里面有很多功能，使用它其中一个`jsx-boolean-value`功能
```js
//	.eslintrc.js
module.exports = {
  plugins: [
    'eslint-plugin-react'
  ],
  rules: {
    'eslint-plugin-react/jsx-boolean-value': 2
  }
}
```

### 创建自定义插件
[generator-eslint](https://www.npmjs.com/package/generator-eslint) 使用这个库进行创建

## Config

`extends`属性
简单理解就是 抄别人的预设


### 注意点
- 创建自定义config的时候，项目名需要是`eslint-config-xxx` (规定)
- 用户使用时，`extends: ['xxx']` 对应的名称就行



## 参考链接
[config plugin 区别](https://juejin.cn/post/6859291468138774535)
[eslint小册](https://sudongyuer.github.io/learn-eslint/)
[官网](https://eslint.org/)