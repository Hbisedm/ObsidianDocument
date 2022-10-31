---
title: 工程化基础II的笔记
tags: ["工程化基础I"]
创建时间: 星期六, 十月 29日 2022, 4:22:52 下午
修改时间: 星期六, 十月 29日 2022, 9:53:31 晚上
---
#工程化

# 工程化基础II的笔记

## 模块化设计

在了解 Node 项目之后，就要开始通过编码来加强对 Node.js 的熟悉程度了，但在开始使用之前，还需要了解一些概念。

在未来的日子里（不限于本教程，与前端工程化相关的工作内容息息相关），会频繁的接触到两个词：模块（ Module ）和包（ Package ）。

模块和包是 Node 开发最重要的组成部分，不管是全部自己实现一个项目，还是依赖各种第三方轮子来协助开发，项目的构成都离不开这两者。

### 模块化解决了什么问题

在软件工程的设计原则里，有一个原则叫 “单一职责” 。

假设一个代码块负责了多个职责的功能支持，在后续的迭代过程中，维护成本会极大的增加，虽然只需要修改这个代码块，但需要兼顾职责 1 、职责 2 、职责 3 … 等多个职责的兼容性，稍不注意就会引起工程运行的崩溃。

“单一职责” 的目的就是减少功能维护带来的风险，把代码块的职责单一化，让代码的可维护性更高。

一个完整业务的内部实现，不应该把各种代码都耦合在一起，而应该按照职责去划分好代码块，再进行组合，形成一个 “高内聚，低耦合” 的工程设计。

模块化就是由此而来，**在前端工程里，每个单一职责的代码块，就叫做模块（ Module ） ，模块有自己的作用域，功能与业务解耦，非常方便复用和移植**。

### 如何模块化

| 模块化方案 | 全称                        | 适用范围     |
| ---------- | --------------------------- | ------------ |
| CJS        | CommonJS                    | Node         |
| AMD        | Async Module Definition     | 浏览器       |
| CMD        | Common Module Definition    | 浏览器       |
| UMD        | Universal Module Definition | Node和浏览器 |
| ESM        | ES Module                   | Node和浏览器 |

其中 AMD 、CMD 、 UMD 都已经属于偏过去式的模块化方案，在新的业务里，结合各种编译工具，可以直接用最新的 ESM 方案来实现模块化，所以可以在后续有接触的时候再了解。

ESM （ ES Module ） 是 JavaScript 在 ES6（ ECMAScript 2015 ）版本推出的模块化标准，旨在成为浏览器和服务端通用的模块解决方案。

CJS （ CommonJS ） 原本是**服务端的模块化标准**（设计之初也叫 ServerJS ），是为 JavaScript 设计的用于浏览器之外的一个模块化方案， Node 默认支持了该规范，在 Node 12 之前也只支持 CJS ，但从 Node 12 开始，已经同时支持 ES Module 的使用。

至此，不论是 Node 端还是浏览器端， ES Module 是统一的模块化标准了！

但由于历史原因， CJS 在 Node 端依然是非常主流的模块化写法，所以还是值得进行了解，因此下面的内容将主要介绍 CJS 和 ESM 这两种模块化规范是如何实际运用。

#### CJS设计模块

虽然现在推荐使用 ES Module 作为模块化标准，但是日后在实际工作的过程中，还是不免会遇到要维护一些老项目，因此了解 CommonJS 还是非常有必要的。


#### 用 ES Module 设计模块

这是因为不论是通过 `<script type="module" />` 标签还是通过 `import` 语句导入，模块的路径都必须是以 `/` 、 `./` 或者是 `../` 开头，因此无法直接通过 npm 包名进行导入。

这种情况下需要借助另外一个 script 类型： `importmap` ，在 server/index.html 里追加 `<script type="importmap" />` 这一段代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ESM run in browser</title>
  </head>
  <body>
    <!-- 注意需要先通过 `importmap` 引入 npm 包的 CDN -->
    <script type="importmap">
      {
        "imports": {
          "md5": "https://esm.run/md5"
        }
      }
    </script>

    <!-- 然后才能在 `module` 里 `import xx from 'xx'` -->
    <script type="module" src="./index.mjs"></script>
  </body>
</html>
```

再次刷新页面，可以看到控制台成功输出了 `b10a8db164e0754105b7a99be72e3fe5` 这个字符串，也就是 `Hello World` 被 MD5 处理后的结果。

可以看到 `importmap` 的声明方式和 package.json 的 dependencies 字段非常相似， JSON 的 key 是包名称， value 则是支持 ESM 的远程地址。

md5 对应的远程地址是使用了来自 `esm.run` 网站的 URL ，而不是 npm 包同步到 jsDelivr CDN 或者 UNPKG CDN 的地址，这是因为 md5 这个包本身不支持 ES Module ，需要通过 `esm.run` 这个网站进行在线转换才可以在 `<script type="module" />` 上使用。

该网站的服务是 jsDelivr CDN 所属的服务商提供，因此也可以通过 jsDelivr CDN 的 URL 添加 `/+esm` 参数来达到转换效果，以 md5 包为例：

bash

```js
# 默认是一个 CJS 包
https://cdn.jsdelivr.net/npm/md5

# 可添加 `/+esm` 参数变成 ESM 包
https://cdn.jsdelivr.net/npm/md5/+esm
```

总的来说，现阶段在浏览器使用 ES Module 并不是一个很好的选择，建议开发者还是使用构建工具来开发，工具可以抹平这些浏览器差异化问题，降低开发成本。

## 组件化

### 什么是组件化

模块化属于 JavaScript 的概念，但作为一个页面，都知道它是由 HTML + CSS + JS 三部分组成的，既然 JS 代码可以按照不同的功能、需求划分成模块，那么页面是否也可以呢？

答案是肯定的！组件化就是由此而来。

在前端工程项目里，页面可以理解为一个积木作品，组件则是用来搭建这个作品的一块又一块积木。

### 解决问题

模块化属于 JavaScript 的概念，把代码块的职责单一化，一个函数、一个类都可以独立成一个模块。

但这只解决了逻辑部分的问题，一个页面除了逻辑，还有骨架（ HTML ）和样式（ CSS ），组件就是把一些可复用的 HTML 结构和 CSS 样式再做一层抽离，然后再放置到需要展示的位置。

常见的组件有：页头、页脚、导航栏、侧边栏… 甚至小到一个用户头像也可以抽离成组件，因为头像可能只是尺寸、圆角不同而已。

每个组件都有自己的 “作用域” ， JavaScript 部分利用 [模块化](https://vue3.chengpeiquan.com/guide.html#%E5%AD%A6%E4%B9%A0%E6%A8%A1%E5%9D%97%E5%8C%96%E8%AE%BE%E8%AE%A1) 来实现作用域隔离， HTML 和 CSS 代码则借助 [Style Scoped](https://vue3.chengpeiquan.com/component.html#style-scoped) 来生成独有的 hash ，避免全局污染，这些方案组合起来，使得组件与组件之间的代码不会互相影响。

## 依赖包和插件

在实际业务中，经常会用到各种各样的插件，插件在 Node 项目里的体现是一个又一个的依赖包。

虽然也可以把插件的代码文件手动放到的源码文件夹里引入，但并不是一个最佳的选择，本节内容将带了解 Node 的依赖包。

### 什么是包

在 Node 项目里，包可以简单理解为模块的集合，一个包可以只提供一个模块的功能，也可以作为多个模块的集合集中管理。

包通常是发布在官方的包管理平台 npmjs 上面，开发者需要使用的时候，可以通过包管理器安装到项目里，并在的代码里引入，开箱即用（详见： 依赖包的管理 ）。

使用 npm 包可以减少在项目中重复造轮子，提高项目的开发效率，也可以极大的缩小项目源码的体积（详见：[什么是 node_modules](https://vue3.chengpeiquan.com/guide.html#%E4%BB%80%E4%B9%88%E6%98%AF-node-modules)）。

包管理平台官网：[https://www.npmjs.com](https://www.npmjs.com/)

### 什么是node_modules

node_modules 是 Node 项目下用于存放已安装的依赖包的目录，如果不存在，会自动创建。

如果是本地依赖，会存在于项目根目录下，如果是全局依赖，会存在于环境变量关联的路径下，详见下方的管理依赖部分内容的讲解。


https://vue3.chengpeiquan.com/guide.html#%E4%BE%9D%E8%B5%96%E5%8C%85%E5%92%8C%E6%8F%92%E4%BB%B6


其实包的用法和在导入模块的用法可以说是完全一样的，区别主要在于，包是需要安装了才能用，而模块是需要自己编写。


## 控制编译代码的兼容性

作为一名前端工程师，了解如何控制代码的兼容性是非常重要的能力。

在 “了解前端工程化” 的 [为什么要使用构建工具](https://vue3.chengpeiquan.com/engineering.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E4%BD%BF%E7%94%A8%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7) 一节里，已简单介绍过 Polyfill 的作用，以及介绍了构建工具可以通过 [Babel](https://github.com/babel/babel) 等方案自动化处理代码的兼容问题，这一小节将讲解 Babel 的配置和使用，亲自体验如何控制代码的兼容性转换。

### 如何查询兼容性

在开始学习使用 Babel 之前，需要先掌握一个小技能：了解如何查询代码在不同浏览器上的兼容性。

说起浏览器兼容性，前端工程师应该都不陌生，特别是初学者很容易会遇到在自己的浏览器上布局正确、功能正常，而在其他人的电脑或者手机上访问就会有布局错位或者运行报错的问题出现，最常见的场景就是开发者使用的是功能强大的 Chrome 浏览器，而产品用户使用了 IE 浏览器。

这是因为网页开发使用的 HTML / CSS / JavaScript 每年都在更新新版本，推出更好用的新 API ，或者废弃部分过时的旧 API ，不同的浏览器在版本更新过程中，对这些新 API 的支持程度并不一致，如果使用了新 API 而没有做好兼容支持，很容易就会在低版本浏览器上出现问题。

为了保证程序可以正确的在不同版本浏览器之间运行，就需要根据产品要支持的目标浏览器范围，去选择兼容性最好的编程方案。

在 Web 开发有一个网站非常知名：[Can I use](https://caniuse.com/) ，只要搜索 API 的名称，它会以图表的形式展示该 API 在不同浏览器的不同版本之间的支持情况，支持 HTML 标签、 CSS 属性、 JavaScript API 等内容的查询。

可以看到在 Chrome 浏览器需要在 49 版本开始才被完全支持，而 IE 浏览器则全面不支持，如果不做特殊处理（例如引入 Polyfill 方案），那么就需要考虑在编程过程中，是否需要可以直接使用 `class` 来实现功能，还是寻找其他替代方案。

在工作中，工程师无需关注每一个 API 的具体支持范围，这些工作可以交给工具来处理，下面将介绍 Babel 的使用入门。

## Babel的使用

### 安装

```zsh
npm i -D @babel/core @babel/cli @babel/preset-env
```

```json
{
  "devDependencies": {
    "@babel/cli": "^7.19.3",
    "@babel/core": "^7.19.3",
    "@babel/preset-env": "^7.19.3"
  }
}
```

### 添加 Babel 配置

接下来在 hello-node 的根目录下创建一个名为 babel.config.json 的文件，这是 Babel 的配置文件，写入以下内容：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "41"
        },
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

这份配置将以 Chrome 浏览器作为目标浏览器，编译结果将保留 ES Module 规范，可以在 [配置文件文档](https://babel.dev/docs/en/config-files) 查看更多配置选项。

这里的 `targets.chrome` 字段代表编译后要支持的目标浏览器版本号，在 caniuse 查询可知 [ES6 的 class 语法](https://caniuse.com/es6-class) 在 Chrome 49 版本之后才被完全支持，而 Chrome 41 或更低的版本是完全不支持该语法，因此先将其目标版本号设置为 41 ，下一步将开始测试 Babel 的编译结果。

```js
// src/babel/index.js
export class Hello {
  constructor(name) {
    this.name = name
  }

  say() {
    return `Hello ${this.name}`
  }
}
```

```bash
npx babel src/babel --out-dir compiled
```

```js
// compiled/index.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  Object.defineProperty(Constructor, 'prototype', { writable: false })
  return Constructor
}

export var Hello = /*#__PURE__*/ (function () {
  function Hello(name) {
    _classCallCheck(this, Hello)

    this.name = name
  }

  _createClass(Hello, [
    {
      key: 'say',
      value: function say() {
        return `Hello ${this.name}`
      },
    },
  ])

  return Hello
})()
```

由于 Chrome 41 版本不支持 `class` 语法，因此 Babel 做了大量的工作对其进行转换兼容。

再次打开 babel.config.json ，将 `targets.chrome` 的版本号调整为支持 `class` 语法的 Chrome 49 版本：

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
-          "chrome": "41"
+          "chrome": "49"
        },
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

再次编译：

```js
// compiled/index.js
export class Hello {
  constructor(name) {
    this.name = name
  }

  say() {
    return `Hello ${this.name}`
  }
}
```

因为此时配置文件指定的目标浏览器版本已支持该语法，无需转换。

Babel 的使用其实非常简单，了解了这部分知识点之后，如果某一天需要自己控制代码的兼容性，只需要配合官方文档调整 Babel 的配置，处理起来就得心应手了！





