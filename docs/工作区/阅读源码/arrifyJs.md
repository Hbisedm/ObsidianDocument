---
title: arrifyJs的笔记
tags: ["arrifyJs"]
创建时间: 星期四, 八月 11日 2022, 8:57:29 晚上
修改时间: 星期四, 八月 11日 2022, 9:30:25 晚上
---
#arrifyJs #源码

# arrifyJs的笔记

> 作用将一些数据类型转为数组

source

```js

export default function arrify(value) {
	if (value === null || value === undefined) {
		return [];
	}

	if (Array.isArray(value)) {
		return value;
	}

	if (typeof value === 'string') {
		return [value];
	}

	if (typeof value[Symbol.iterator] === 'function') {
		return [...value];
	}

	return [value];
}

```

1. 判断null与undefined
2. 判断是不是数组
3. 判断是不是string
4. 判断有没有迭代器属性
5. 以上都不是的话，那么使用数组包裹这个参数


`package.json`

```json

{
	"name": "arrify",
	"version": "3.0.0",
	"description": "Convert a value to an array", // 描述 这个工具库作用
	"license": "MIT",
	"repository": "sindresorhus/arrify",
	"funding": "https://github.com/sponsors/sindresorhus",
	"author": {
		"name": "Sindre Sorhus",
		"email": "sindresorhus@gmail.com",
		"url": "https://sindresorhus.com"
	},
	"type": "module", // ejs
	"exports": "./index.js", 
	"engines": {
		"node": ">=12"
	},
	"scripts": {
		"test": "xo && ava && tsd"
	},
	"files": [
		"index.js",
		"index.d.ts"
	],
	"keywords": [
		"array",
		"arrify",
		"arrayify",
		"convert",
		"value",
		"ensure"
	],
	"devDependencies": {
		"ava": "^3.15.0",
		"tsd": "^0.14.0",
		"xo": "^0.39.1"
	} // 开发依赖
}
```

开发依赖
- ava 测试工具
- xo 规范工具
- tsd js提示工具