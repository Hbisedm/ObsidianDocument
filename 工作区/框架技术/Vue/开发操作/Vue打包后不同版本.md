---
title: Vue中runtime-compiler与runtimeonly的区别
date: 2022-06-07 16:03:31
tags: ["Vue"]
---
#tag

# Vue打包后不同版本的笔记

> Vue打包后不同版本解析

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206071611373.png)

> 运行时+编译时 VS 仅运行时

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206071616859.png)




## 疑惑
在使用Webpack打包vue时，默认使用`vue`引入
```js
import { createApp } from "vue";

console.log("123");
const app = createApp({
  template: `<h2>Vue render {{title}} </h2>`,
  data() {
    return {
      title: "hello webpack vue",
    };
  },
});

app.mount("#app");
```
> webpack打包后，是看不到vue渲染出来的东西的。

因为引入的`vue`版本是runtimeonly版本。需要改成runtime-compiler版本才可以渲染。
**修改：**
```js
import { createApp } from "vue/dist/vue.esm-bundler";
```
## runtime-compiler与runtimeonly的区别
- 如果在之后的开发中，你依然使用template，就需要选择runtimecompiler  
- 如果你之后的开发中，使用的是.vue文件开发，那么可以选择runtimeonly

### runtimecompiler
Vue中的模板如何最终渲染成真实DOM  
template -> ast -> render-> vdom -> UI

### runtimeonly
Vue中的模板如何最终渲染成真实DOM  
render -> vdom -> UI

性能更高  
代码量更少  
那么.vue文件中的template是由谁处理的  
是由vue-template-compiler


**runtime-only 更快的原因：**
runtime-only比runtime-compiler更快，因为它省略了vue内部过程中的第一个过程，如果是runtime-compiler那么main.js中就会出现template从而需要过程一导致增加了一个过程，同时增加了大小而 runtime-only 模式中不是没有写 template ，只是把 template 放在了.vue 的文件中了并有一个叫 vue-template-compiler的在开发依赖时将.vue文件中的 template 解析成 render 函数了因为是开发依赖，不在最后生产中，所以最后生产出来的运行的代码没有template。



下一步：不使用`<template>`这种方式，使用SFC的方式开发Vue
	
[[Webpack5配置Vue3-SFC]]


使用SFC的方式后就可以使用runtimeonly版本了!

	
```js
import { createApp } from "vue/dist/vue.esm-bundler";
	=>
import { createApp } from "vue";
```
	
	
## 参考链接
[区别](https://blog.csdn.net/a1345954104/article/details/104987494)


