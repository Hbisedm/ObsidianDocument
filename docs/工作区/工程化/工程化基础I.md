---
title: 工程化基础I的笔记
tags: ["工程化基础"]
创建时间: 星期六, 十月 29日 2022, 12:56:18 下午
修改时间: 星期六, 十月 29日 2022, 4:24:13 下午
---
#工程化 #了解

# 工程化基础I的笔记

## 传统开发的弊端

开始没有工程化的时候，会编写`html`文档 `js`文件放在`html`的底部。

`lib-1.js`

```js
var foo = 1
```


`lib-2.js`

```js
var foo = 2
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <!-- 引入 JS 文件 -->
  <script src="./js/lib-1.js"></script>
  <script src="./js/lib-2.js"></script>
  <!-- 引入 JS 文件 -->

  <!-- 假设这里是实际的业务代码 -->
  <script>
    console.log(foo)
  </script>
  <!-- 假设这里是实际的业务代码 -->

</body>
</html>
```

这里输出2

> 如果在开发的过程中，不知道在 `lib-2.js` 文件里也声明了一个 `foo` 变量，一旦在后面的代码里预期了 `foo + 2 === 3` ，那么这样就得不到想要的结果（因为 `lib-1.js` 里的 `foo` 是 `1` ， `1 + 2` 等于 `3` ）

这样导致维护性极差，找关键代码效率极低。

原因是 JavaScript 的加载顺序是从上到下，当使用 `var` 声明变量时，如果命名有重复，那么后加载的变量会覆盖掉先加载的变量。

这是使用 `var` 声明的情况，它允许使用相同的名称来重复声明，那么换成 `let` 或者 `const` 呢？

虽然不会出现重复声明的情况，但同样会收到一段报错：

```js
Uncaught SyntaxError: Identifier 'foo' has already been declared (at lib-2.js:1:1)
```

这次程序直接崩溃了，因为 `let` 和 `const` 无法重复声明，从而抛出这个错误，程序依然无法正确运行。

### 其他问题 ⭐️

以上只是一个最简单的案例，就暴露出了传统开发很大的弊端，然而并不止于此，实际上，存在了诸如以下这些的问题：

1. 如本案例，可能存在同名的变量声明，引起变量冲突
2. 引入多个资源文件时，比如有多个 JS 文件，在其中一个 JS 文件里面使用了在别处声明的变量，无法快速找到是在哪里声明的，大型项目难以维护
3. 类似第 1 、 2 点提到的问题无法轻松预先感知，很依赖开发人员人工定位原因
4. 大部分代码缺乏分割，比如一个工具函数库，很多时候需要整包引入到 HTML 里，文件很大，然而实际上只需要用到其中一两个方法
5. 由第 4 点大文件延伸出的问题， `script` 的加载从上到下，容易阻塞页面渲染
6. 不同页面的资源引用都需要手动管理，容易造成依赖混乱，难以维护
7. 如果要压缩 CSS 、混淆 JS 代码，也是要人力操作使用工具去一个个处理后替换，容易出错

## 工程化带来的优势

### 开发层面的优势 ⭐️

在 传统开发的弊端里，主要列举的是开发层面的问题，工程化首要解决的当然也是在开发层面遇到的问题。

在开发层面，前端工程化有以下这些好处：

1. 引入了模块化和包的概念，作用域隔离，解决了代码冲突的问题
2. 按需导出和导入机制，让编码过程更容易定位问题
3. 自动化的代码检测流程，有问题的代码在开发过程中就可以被发现
4. 编译打包机制可以让使用开发效率更高的编码方式，比如 Vue 组件、 CSS 的各种预处理器
5. 引入了代码兼容处理的方案（ e.g. Babel ），可以让自由使用更先进的 JavaScript 语句，而无需顾忌浏览器兼容性，因为最终会帮转换为浏览器兼容的实现版本
6. 引入了 Tree Shaking 机制，清理没有用到的代码，减少项目构建后的体积

还有非常多的体验提升，列举不完。而对应的工具，根据用途也会有非常多的选择，在后面的学习过程中，会一步一步体验到工程化带来的好处。


### 团队协作的优势

#### 统一的目录结构
#### 统一的代码风格
#### 可复用的模块和组件
#### 代码健壮性有保障
#### 团队开发效率高

在前后端合作环节，可以提前 Mock 接口与后端工程师同步开发，如果遇到跨域等安全限制，也可以进行本地代理，不受跨域困扰。

前端工程在开发过程中，还有很多可以交给程序处理的环节，像前面提到的代码格式化、代码检查，还有在部署上线的时候也可以配合 CI/CD 完成自动化流水线，不像以前改个字都要找服务端工程师去更新，可以把非常多的人力操作剥离出来交给程序。

### 求职竞争上的优势

组件化开发、模块化开发、 Webpack / Vite 构建工具、 Node.js 开发… 这些技能都属于前端工程化开发的知识范畴，不仅在面试的时候会提问，入职后新人接触的项目通常也是直接指派前端工程化项目，如果能够提前掌握相关的知识点，对求职也是非常有帮助的！

### Vue与工程化

框架能够充分的利用前端工程化相关的领先技术，不仅在开发层面降低开发者的上手难度、提升项目开发效率，在构建出来的项目成果上也有着远比传统开发更优秀的用户体验。

“既然 Vue 的使用方式也非常简单，可以 jQuery 这些经典类库一样在 HTML 引入使用，那么 Vue 和工程化有什么关联呢？”

Vue.js 是一个框架，框架除了简化编码过程中的复杂度之外，面对不同的业务需求还提供了通用的解决方案，而这些解决方案，通常是将前端工程化里的很多种技术栈组合起来串成一条条技术链，一环扣一环，串起来就是一个完整的工程化项目。

> a标签的跳转 和 vue-Router的跳转的不同

## 现代化的开发概念

> 在本章最开始的时候提到了 SPA / SSR / SSG 等词汇，这些词汇是一些现代前端工程化开发的概念名词缩写，代表着不同的开发模式和用户体验。

### MPA 与 SPA

首先来看 MPA 与 SPA ，这代表着两个完全相反的开发模式和用户体验，它们的全称和中文含义如下：

| 名词 | 全称                    | 中文       |
| ---- | ----------------------- | ---------- |
| MPA  | Multi-Page Application  | 多页面应用 |
| SPA  | Single-Page Application | 单页面应用           |

#### 多页面应用 ⭐️

MPA 多页面应用是最传统的网站体验，当一个网站有多个页面时，会对应有多个实际存在的 HTML 文件，访问每一个页面都需要经历一次完整的页面请求过程：

从用户点击跳转开始：

- 浏览器打开新的页面
- 请求【所有】资源
- 加载 HTML 、CSS 、 JS 、 图片等资源
- 完成新页面的渲染

##### 优点

作为最传统也是最被广泛运用的模式，自然有它的优势存在：

- 首屏加载速度快

因为 MPA 的页面源码都是实实在在的写在 HTML 文件里，所以当 HTML 文件被访问成功，内容也就随即呈现（在不考虑额外的 CSS 、 图片加载速度的情况下，这种模式的内容呈现速度是最快的）。

- SEO 友好，容易被搜索引擎收录

如果读者有稍微了解过一些 SEO 知识，会知道除了网页的 **TKD** 三要素之外，网页的内容也影响收录的关键因素，传统的多页面应用，网页的内容都是直接位于 HTML 文件内，例如下面这个有很多内容的网页：

> 网页的 TKD 三要素是指一个网页的三个关键信息，含义如下：
>
> T ，指 Title ，网站的标题，即网页的 `<title>网站的标题</title>` 标签。
>
> K ，指 Keywords ，网站的关键词，即网页的 `<meta name="Keywords" content="关键词1,关键词2,关键词3" />` 标签。
>
> D ，指 Description ，网站的描述，即网页的 `<meta name="description" content="网站的描述" />` 标签。
>
> 这三个要素标签都位于 HTML 文件的 `<head />` 标签内。

- 容易与服务端语言结合

由于传统的页面都是由服务端直出，所以可以使用 PHP 、 JSP 、 ASP 、 Python 等非前端语言或技术栈来编写页面模板，最终输出 HTML 页面到浏览器访问。

##### 缺点

说完 MPA 的优点，再来看看它的缺点，正因为有这些缺点的存在，才会催生出其他更优秀的开发模式出现。

- 页面之间的跳转访问速度慢

正如它的访问流程，每一次页面访问都需要完整的经历一次渲染过程，哪怕从详情页 A 的 “相关阅读” 跳转到详情页 B ，这种网页结构一样，只有内容不同的两个页面，也需要经历这样的过程。

- 用户体验不够友好

如果网页上的资源较多或者网速不好，这个过程就会有明显的卡顿或者布局错乱，影响用户体验。

- 开发成本高

传统的多页面模式缺少前端工程化的很多优秀技术栈支持，前端开发者在刀耕火种的开发过程中效率低下。如果是基于 PHP 等非前端语言开发，工作量通常更是压在一名开发者身上，无法做到前后端分离来利用好跨岗位协作。


#### 单页面应用 ⭐️

正因为传统的多页面应用存在了很多无法解决的开发问题和用户体验问题，催生了现代化的 SPA 单页面应用技术的诞生。

SPA 单页面应用是现代化的网站体验，与 MPA 相反，不论站点内有多少个页面，在 SPA 项目实际上只有一个 HTML 文件，也就是 `index.html` 首页文件。

它只有第一次访问的时候才需要经历一次完整的页面请求过程，之后的每个内部跳转或者数据更新操作，都是通过 AJAX 技术来获取需要呈现的内容并只更新指定的网页位置。

> AJAX 技术（ Asynchronous JavaScript and XML ）是指在不离开页面的情况下，通过 JavaScript 发出 HTTP 请求，让网页通过增量更新的方式呈现给用户界面，而不需要刷新整个页面来重新加载，是一种 “无刷体验” 。

SPA 在页面跳转的时候，地址栏也会发生变化，主要有以下两种方式：

1. 通过修改 [Location:hash](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/hash) 修改 URL 的 Hash 值（也就是 `#` 号后面部分），例如从 `https://example.com/#/foo` 变成 `https://example.com/#/bar`
2. 通过 History API 的 [pushState](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState) 方法更新 URL ，例如从 `https://example.com/foo` 变成 `https://example.com/bar`

**这两个方式的共同特点是更新地址栏 URL 的时候，均不会刷新页面，只是单纯的变更地址栏的访问地址，而网页的内容则通过 AJAX 更新，配合起来就形成了一种网页的 “前进 / 后退” 等行为效果。**

```js
# SPA 页面跳转过程

从用户点击跳转开始：
---> 浏览器通过 `pushState` 等方法更新 URL
---> 请求接口数据（如果有涉及到前后端交互）
---> 通过 JavaScript 处理数据，拼接 HTML 片段
---> 把 HTML 片段渲染到指定位置，完成页面的 “刷新”
```

##### 优点

从上面的实现原理已经能总结出它的优势了：

- 只有一次完全请求的等待时间（首屏加载）
- 用户体验好，内部跳转的时候可以实现 “无刷切换”⭐
- 因为不需要重新请求整个页面，所以切换页面的时候速度更快
- 因为没有脱离当前页面，所以 “页” 与 “页” 之间在切换过程中支持动画效果 ⭐️
- 脱离了页面跳页面的框架，让整个网站形成一个 Web App ，更接近原生 App 的访问体验
- 开发效率高，前后端分离，后端负责 API 接口，前端负责界面和联调，同步进行缩短工期⭐

这也是为什么短短几年时间， SPA 的体验模式成为前端领域的主流。

##### 缺点

> 虽然 SPA 应用在使用过程中的用户体验非常好，但也有自身的缺点存在：

- 首屏加载相对较慢

由于 SPA 应用的路由是由前端控制， SPA 在打开首页后，还要根据当前的路由再执行一次内容渲染，相对于 MPA 应用从服务端直出 HTML ，首屏渲染所花费的时间会更长。

- 不利于 SEO 优化

由于 SPA 应用全程是由 JavaScript 控制内容的渲染，因此唯一的一个 HTML 页面 `index.html` 通常是一个空的页面，只有最基础的 HTML 结构，不仅无法设置每个路由页面的 TDK ，页面内容也无法呈现在 HTML 代码里，因此对搜索引擎来说，网站的内容再丰富，依然只是一个 “空壳” ，无法让搜索引擎进行内容爬取。

为了减少用户等待过程中的焦虑感，可以通过增加 Loading 过程，或者 Skeleton 骨架屏等优化方案，但其实也是治标不治本，因此为了结合 SPA 和 MPA 的优点，又进一步催生出了更多实用的技术方案以适配更多的业务场景，在后面的小节将逐一介绍。

### CSR 与 SSR

在了解了 MPA 与 SPA 之后，先了解另外两个有相关联的名词： CSR 与 SSR ，同样的，这一对也是代表着相反的开发模式和用户体验，它们的全称和中文含义如下

| 名词 | 全称                  | 中文       |
| ---- | --------------------- | ---------- |
| CSR  | Client-Side Rendering | 客户端渲染 |
| SSR  | Server-Side Rendering | 服务端渲染  |

正如它们的名称，这两者代表的是渲染网页过程中使用到的技术栈。

#### 客户端渲染

在 [MPA 多页面应用与 SPA 单页面应用](https://vue3.chengpeiquan.com/engineering.html#mpa-%E4%B8%8E-spa) 部分的介绍过的 SPA 单页面应用，正是基于 CSR 客户端渲染实现的（因此大部分情况下， CSR 等同于 SPA ，包括实现原理和优势），这是一种利用 AJAX 技术，把渲染工作从服务端转移到客户端完成，不仅客户端的用户体验更好，前后端分离的开发模式更加高效。

但随之而来的首屏加载较慢、不利于 SEO 优化等缺点，而 SPA 的这几个缺点，却是传统 MPA 多页面应用所具备的优势，但同样的， MPA 也有着自己开发成本高、用户体验差等问题。

既然原来的技术方案无法完美满足项目需求，因此在结合 MPA 的优点和 SPA 的优点之后，一种新的技术随之诞生，这就是 SSR 服务端渲染。

#### 服务端渲染⭐

和传统的 MPA 使用 PHP / JSP 等技术栈做服务端渲染不同，现代前端工程化里的 SSR 通常是指使用 Node.js 作为服务端技术栈。

传统的服务端渲染通常由后端开发者一起维护前后端代码，需要写后端语言支持的模板、 JavaScript 代码维护成本也比较高；而 SSR 服务端渲染则是交给前端开发者来维护，利用 Node 提供的能力进行同构渲染，由于本身前后端都使用 JavaScript 编写，维护成本也大大的降低。

SSR 技术利用的同构渲染方案（ Isomorphic Rendering ），指的是一套代码不仅可以在客户端运行，也可以在服务端运行，在一些合适的时机先由服务端完成渲染（ Server-Side Rendering ）再直出给客户端激活（ Client-Side Hydration ），这种开发模式带来了：

- 更好的 SEO 支持，解决了 SPA 单页面应用的痛点⭐
- 更快的首屏加载速度，保持了 MPA 多页面应用的优点
- 和 SPA 一样支持前后端分离，开发效率依然很高⭐
- 有更好的客户端体验，当用户完全打开页面后，本地访问过程中也可以保持 SPA 单页面应用的体验⭐
- 统一的心智模型，由于支持同构，因此没有额外的心智负担⭐️

Vue的服务端渲染

Vue 的 SSR 支持非常好， Vue 官方不仅提供了一个 [Vue.js 服务器端渲染指南](https://cn.vuejs.org/guide/scaling-up/ssr.html) 介绍了基于 Vue 的 SSR 入门实践，还有基于 Vue 的 [Nuxt.js](https://github.com/nuxt/framework) 、 [Quasar](https://github.com/quasarframework/quasar) 框架帮助开发者更简单的落地 SSR 开发，构建工具 Vite 也有内置的 [Vue SSR](https://cn.vitejs.dev/guide/ssr.html) 支持。

### Pre-Rendering 与 SSG

在介绍了 SSR 服务端渲染技术后，读者可能会想到一个问题，就是 SSR 的开发成本总归比较高，如果本身项目比较简单，例如一个静态博客，或者静态官网、落地页等内容不多，仅需要简单的 SEO 支持的项目需求，是否有更简便的方案呢？

以下两种方案正是用于满足这类需求的技术：

| 名词          | 全称                   | 中文   |
| ------------- | ---------------------- | ------ |
| Pre-Rendering | Pre-Rendering          | 预渲染 |
| SSG           | Static-Site Generation | 静态站点生成       |

#### 预渲染

预渲染也是一种可以让 SPA 单页面应用 **解决 SEO 问题的技术手段**。



#### 静态站点生成

SSG 静态站点生成是基于预渲染技术，通过开放简单的 API 和配置文件，就让开发者可以实现一个预渲染静态站点的技术方案。

它可以让开发者定制站点的个性化渲染方案，但更多情况下，通常是作为一些开箱即用的技术产品来简化开发过程中的繁琐步骤，这一类技术产品通常称之为静态站点生成器（ Static-Site Generator ，也是简称 SSG ）。

常见的 SSG 静态站点生成器有：基于 Vue 技术的 [VuePress](https://github.com/vuejs/vuepress) 和 [VitePress](https://github.com/vuejs/vitepress) ，自带了 Vue 组件的支持，还有基于 React 的 [Docusaurus](https://github.com/facebook/docusaurus) ，以及很多各有特色的生成器，例如 [Jekyll](https://github.com/jekyll/jekyll) 、 [Hugo](https://github.com/gohugoio/hugo) 等等。

如果有写技术文档或者博客等内容创作需求，使用静态站点生成器是一个非常方便的选择，通常这一类产品还有非常多的个性化主题可以使用。

### ISR 与 DPR

在现代化的开发概念这一节，从 [MPA 多页面应用到 SPA 单页面应用](https://vue3.chengpeiquan.com/engineering.html#mpa-%E4%B8%8E-spa) ，再到 [CSR 客户端渲染和 SSR 服务端渲染](https://vue3.chengpeiquan.com/engineering.html#csr-%E4%B8%8E-ssr) ，以及 [Pre-Rendering 预渲染与 SSG 静态站点生成](https://vue3.chengpeiquan.com/engineering.html#pre-rendering-%E4%B8%8E-ssg) ，似乎已经把所有常见的开发场景覆盖完了。

那接下来要讲的 ISR 和 DPR 又是什么用途的技术方案呢？先看看它们的全称和中文含义：

| 名词 | 全称                             | 中文             |
| ---- | -------------------------------- | ---------------- |
| ISR  | Incremental Site Rendering       | 增量式的网站渲染 |
| DPR  | Distributed Persistent Rendering | 分布式的持续渲染   |

当网站的内容体量达到一定程度的时候，从头开始构建进行预渲染所花费的时间会非常久，而实际上并不是所有页面的内容都需要更新，这两项技术的推出是为了提升大型项目的渲染效率。

ISR 增量式的网站渲染，通过区分 “关键页面” 和 “非关键页面” 进行构建，优先预渲染 “关键页面” 以保证内容的最新和正确，同时缓存到 CDN ，而 “非关键页面” 则交给用户访问的时候再执行 CSR 客户端渲染，并触发异步的预渲染缓存到 CDN 。

这样做的好处是，大幅度的提升了每次构建的时间，但由于只保证部分 “关键页面” 的构建和内容正确，所以访问 “非关键页面” 的时候，有可能先看到旧的内容，再由 CSR 刷新为新的内容，会丢失一部分用户体验。

更多 ISR 技术细节可以阅读 Netlify 的开发者体验总监 Cassidy Williams 的一篇文章： [Incremental Static Regeneration: Its Benefits and Its Flaws](https://www.netlify.com/blog/2021/03/08/incremental-static-regeneration-its-benefits-and-its-flaws/) 。

DPR 分布式的持续渲染则是为了解决 ISR 方案下可能访问到旧内容的问题，这也是由 Cassidy Williams 发起的一个提案，详情可在 GitHub 查看：[Distributed Persistent Rendering (DPR)](https://github.com/jamstack/jamstack.org/discussions/549) 。

由于目前这两项技术还在发展初期，能够支持的框架和服务还比较少，在这里建议作为一种技术知识储备提前了解，在未来的某一天有业务需要的时候，也可以知道有这样的方案可以解决问题。

### 工程化不止于前端

在 [现代化的开发概念](https://vue3.chengpeiquan.com/engineering.html#%E7%8E%B0%E4%BB%A3%E5%8C%96%E7%9A%84%E5%BC%80%E5%8F%91%E6%A6%82%E5%BF%B5) 部分所讲述的都是关于网页开发的变化，当然，前端这个岗位本身就是从页面开发发展起来的，自然还是离不开网页这个老本行。

但随着前端工程化的发展，前端越来越不止于写前端，已经有很多前端工程师利用前端工程化带来的优势，不仅仅只是做一个 Web 前端，开始逐步发展为一个全栈工程师，在企业内部承担起了更多的岗位职责，包括作者笔者也是。

之所以能做这么多事情，得益于 Node.js 在前端开发带来的翻天覆地的变化，可以在保持原有的 JavaScript 和 TypeScript 基础上，几乎没有过多的学习成本就可以过度到其他端的开发。

在了解 Node.js 之前，先来看看现在的前端开发工程师除了写 Web 前端，还可以做到哪些岗位的工作。

#### 服务端开发
#### APP开发
#### 桌面程序开发
#### 脚本开发

### 实践工程化的流程

### 什么是 Runtime

Runtime ，可以叫它 “运行时” 或者 “运行时环境” ，这个概念是指，的代码在哪里运行，哪里就是运行时。 ENV

传统的 JavaScript 只能跑在浏览器上，每个浏览器都为 JS 提供了一个运行时环境，可以简单的把浏览器当成一个 Runtime ，明白了这一点，相信就能明白什么是 Node 。

Node 就是一个让 JS 可以脱离浏览器运行的环境，当然，这里并不是说 Node 就是浏览器。

### Node 和浏览器的区别

虽然 Node 也是基于 Chrome V8 引擎构建，但它并不是一个浏览器，它提供了一个完全不一样的运行时环境，没有 Window 、没有 Document 、没有 DOM 、没有 Web API ，没有 UI 界面…

但它提供了很多浏览器做不到的能力，比如和操作系统的交互，例如 “文件读写” 这样的操作在浏览器有诸多的限制，而在 Node 则轻轻松松。

对于前端开发者来说， Node 的巨大优势在于，使用一种语言就可以编写所有东西（前端和后端），不再花费很多精力去学习各种各样的开发语言。

哪怕仅仅只做 Web 开发，也不再需要顾虑新的语言特性在浏览器上的兼容性（ e.g. ES6 、 ES7 、 ES8 、 ES9 …）， Node 配合构建工具，以及诸如 Babel 这样的代码编译器，可以帮转换为浏览器兼容性最高的 ES5 。

当然还有很多工程化方面的好处，总之一句话，使用 Node ，的开发体验会非常好。

在 [工程化的入门准备](https://vue3.chengpeiquan.com/guide.html) 一章中，会对 Node 开发做进一步的讲解，下面先继续顺着 Node 的工具链，了解与日常开发息息相关的前端构建工具。


### 工程化的构建工具

在前端开发领域，构建工具已经成为现在必不可少的开发工具了，很多刚接触前端工程化的开发者可能会有疑惑，为什么以前的前端页面直接编写代码就可以在浏览器访问，现在却还要进行构建编译，是否 “多此一举” ？

要消除这些困惑，就需要了解一下为什么要使用构建工具，知道构建工具在开发上能够给带来什么好处。

#### 为什么需要构建工具

> 目前已经有很多流行的构建工具，例如： [Grunt](https://github.com/gruntjs/grunt) 、 [Gulp](https://github.com/gulpjs/gulp) 、 [Webpack](https://github.com/webpack/webpack) 、 [Snowpack](https://github.com/FredKSchott/snowpack) 、 [Parcel](https://github.com/parcel-bundler/parcel) 、 [Rollup](https://github.com/rollup/rollup) 、 [Vite](https://github.com/vitejs/vite) … 每一个工具都有自己的特色。

如上面列举的构建工具，虽然具体到某一个工具的时候，是 “一个” 工具，但实际上可以理解为是 “一套” 工具链、工具集，构建工具通常集 “语言转换 / 编译” 、 “资源解析” 、 “代码分析” 、 “错误检查” 、 “任务队列” 等非常多的功能于一身。

构建工具可以帮解决很多问题，先看看最基础的一个功能支持： “语言转换 / 编译” 。

且不说构建工具让可以自由自在的在项目里使用 TypeScript 这些新兴的语言，单纯看历史悠久的 JavaScript ，从 2015 年开始，每年也都会有新的版本发布（例如 ES6 对应 ES2015 、 ES7 对应 ES2016 、 ES8 对应 ES2017 等等）。

虽然新版本的 JS API 更便捷更好用，但浏览器可能还没有完全支持，这种情况下可以通过构建工具去转换成兼容度更高的低版本 JS 代码。

通过 `Array.prototype.includes()` 这个实例方法返回的布尔值，判断数组是否包含目标值，而这个方法是从 ES6 开始支持的，对于不支持 ES6 的古董浏览器，只能使用其他更早期的方法代替（ e.g. `indexOf` ），或者手动引入它的 Polyfill 来保证这个方法可用。

> `Polyfill` 是在浏览器不支持的情况下实现某个功能的代码，可以在概念发明者 Remy Sharp 的博文里了解到它的由来，是一个挺有意思的命名。
> [What is a Polyfill?](https://remysharp.com/2010/10/08/what-is-a-polyfill)

以下是摘选自 MDN 网站上关于 [Array.prototype.includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#polyfill) 的 Polyfill 实现：

```js
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function (valueToFind, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined')
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this)

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0

      // 3. If len is 0, return false.
      if (len === 0) {
        return false
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

      function sameValueZero(x, y) {
        return (
          x === y ||
          (typeof x === 'number' &&
            typeof y === 'number' &&
            isNaN(x) &&
            isNaN(y))
        )
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(valueToFind, elementK) is true, return true.
        if (sameValueZero(o[k], valueToFind)) {
          return true
        }
        // c. Increase k by 1.
        k++
      }

      // 8. Return false
      return false
    },
  })
}

```

由于 JavaScript 允许更改 prototype ，所以 Polyfill 的原理就是先检查浏览器是否支持某个方法，当浏览器不支持的时候，会借助已经被广泛支持的方法来实现相同的功能，达到在旧浏览器上也可以使用新方法的目的。

下面是一个简单的 `includes` 方法实现，也借用浏览器支持的 `indexOf` 方法，让不支持 `includes` 的浏览器也可以使用 `includes` ：

```js
// 借助 indexOf 来实现一个简单的 includes
if (!Array.prototype.includes) {
  Array.prototype.includes = function (v) {
    return this.indexOf(v) > -1
  }
}
```

> 请注意，上面这个实现方案很粗糙，没有 Polyfill 的方案考虑的足够周到，只是在这里做一个简单的实现演示。

`Polyfill`会考虑到多种异常情况，最大幅度保证浏览器的兼容支持，当然一些复杂的方法实现起来会比较臃肿，全靠人工维护 Polyfill 很不现实。

而且实际的项目里，要用到的 JavaScript 原生方法非常多，不可能手动去维护每一个方法的兼容性，所以这部分工作，通常会让构建工具来自动化完成，常见的方案就有 [Babel](https://github.com/babel/babel) 。

除了 “语言转换 / 编译” 这个好处之外，在实际的开发中，构建工具可以更好的提高开发效率、自动化的代码检查、规避上线后的生产风险，例如：

- 项目好多代码可以复用，可以直接抽离成 [模块](https://vue3.chengpeiquan.com/engineering.html#%E5%AD%A6%E4%B9%A0%E6%A8%A1%E5%9D%97%E5%8C%96%E8%AE%BE%E8%AE%A1) 、 [组件](https://vue3.chengpeiquan.com/engineering.html#%E8%AE%A4%E8%AF%86%E7%BB%84%E4%BB%B6%E5%8C%96%E8%AE%BE%E8%AE%A1) ，交给构建工具去合并打包
- [TypeScript](https://vue3.chengpeiquan.com/typescript.html) 的类型系统和代码检查真好用，也可以放心写，交给构建工具去编译
- CSS 写起来很慢，可以使用 Sass 、 Less 等 [CSS 预处理器](https://vue3.chengpeiquan.com/component.html#%E4%BD%BF%E7%94%A8-css-%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8) ，利用它们的变量支持、混合继承等功能提高开发效率，最终交给构建工具去编译回 CSS 代码
- 海量的 [npm 包](https://vue3.chengpeiquan.com/engineering.html#%E4%BE%9D%E8%B5%96%E5%8C%85%E5%92%8C%E6%8F%92%E4%BB%B6) 开箱即用，剩下的工作交给构建工具去按需抽离与合并
- 项目上线前代码要混淆，人工处理太费劲，交给构建工具自动化处理
- 还有很多列举不完的其他场景…

下面基于接下来要学习的 Vue3 技术栈，介绍两个流行且强相关的构建工具： [Webpack](https://vue3.chengpeiquan.com/engineering.html#webpack) 和 [Vite](https://vue3.chengpeiquan.com/engineering.html#vite) 。

#### Webpack

Webpack 是一个老牌的构建工具，前些年可以说几乎所有的项目都是基于 Webpack 构建的，生态最庞大，各种各样的插件最全面，对旧版本的浏览器支持程度也最全面。

点击访问：[Webpack 官网](https://webpack.js.org/)

在升级与配置一章里的 [使用 @vue/cli 创建项目](https://vue3.chengpeiquan.com/upgrade.html#%E4%BD%BF%E7%94%A8-vue-cli-%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE) 会指导如何使用 Vue CLI 创建一个基于 Webpack 的 Vue 项目。

#### Vite

Vite 的作者也是熟悉的 Vue 作者尤雨溪，它是一个基于 ESM 实现的构建工具，主打更轻、更快的开发体验，主要面向现代浏览器，于 2021 年推出 2.x 版本之后，进入了一个飞速发展的时代，目前市场上的 npm 包基本都对 Vite 做了支持，用来做业务已经没有问题了。

毫秒级的开发服务启动和热重载，对 TypeScript 、 CSS 预处理器等常用开发工具都提供了开箱即用的支持，也兼容海量的 npm 包，如果是先用 Webpack 再用的 Vite ，会很快就喜欢上它！

点击访问：[Vite 官网](https://cn.vitejs.dev/)

在升级与配置一章里的 [使用 Vite 创建项目](https://vue3.chengpeiquan.com/upgrade.html#%E4%BD%BF%E7%94%A8-vite-%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE-new) 会指导如何使用流行脚手架创建一个基于 Vite 的 Vue 项目。







