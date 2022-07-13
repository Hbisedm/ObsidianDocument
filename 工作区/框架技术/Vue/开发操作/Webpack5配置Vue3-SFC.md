---
title: Webpack5配置Vue3-SFC
date: 2022-06-07 16:37:20
tags: ["vue"]
---
#tag

# Webpack5配置Vue3-SFC的笔记


## 配置
webpack需要解析`.vue`这种SFC文件，需要一些配置才可以做到。
当前使用的是Vue3，所以需要安装`vue-loader@next`
```bash
npm i vue-loader@next -D
```
```js
//配置webpack的module.rules
module: {
	rules: [
		{
			test: /\.vue$/,
			use: "vue-loader",
		},
	],
}
```
使用webpack打包，出现错误
安装`@vue/compiler-sfc`
```bash
npm install @vue/compiler-sfc
```
再次打包，再次出现错误
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206071642716.png)
修改webpack配置
```js
const { VueLoaderPlugin } = require("vue-loader");

plugins:[
	new VueLoaderPlugin()
]
```

## 总结：
webpack中配置vue的sfc需要3个步骤。
- 使用vue-loader
- vue-loader依赖于@vue/compiler-sfc， 所以需要安装`@vue/compiler-sfc`
- 使用`VueLoaderPlugin`插件



