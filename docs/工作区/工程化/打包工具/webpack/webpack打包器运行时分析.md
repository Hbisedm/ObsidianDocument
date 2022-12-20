---

title: webpack打包器运行时分析

date: 2022-05-26 12:42:26

tags: ["工程化", "webpack"]
excerpt: 打包分析过程.
---



#工程化

# 打包器运行时分析



## webpack

目录：

![image-20220529222235641](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205292222678.png)

```js
// src/sum.js
module.exports =   sum = (x, y) => x + y

// src/index.js 
const sum = require('./sum')
console.log(sum(1, 2));

// webpack.config.js
module.exports = {
    entry: './src/index.js',
    mode: 'none',
    output: {
        iife: false,
        pathinfo: 'verbose'
    }
}
```

打包后的`main.js`

```js
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/*!********************!*\
  !*** ./src/sum.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module) => {

module.exports =   sum = (x, y) => x + y

/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
const sum = __webpack_require__(/*! ./sum */ 1)

console.log(sum(1, 2));
})();
```

`webpack` 的 runtime，也就是 webpack 最后生成的代码，做了以下三件事:

1. `__webpack_modules__`: **维护一个所有模块的数组**。将入口模块解析为 AST，根据 AST 深度优先搜索所有的模块，并构建出这个模块数组。每个模块都由一个包裹函数 `(module, module.exports, __webpack_require__)` 对模块进行包裹构成。
2. `__webpack_require__(moduleId)`: **手动实现加载一个模块**。对已加载过的模块进行缓存，对未加载过的模块，执行 id 定位到 `__webpack_modules__` 中的包裹函数，执行并返回 `module.exports`，并**缓存**
3. `__webpack_require__(0)`: 运行第一个模块，即运行入口模块

另外，当涉及到多个 chunk 的打包方式中，比如 `code spliting`，webpack 中会有 `jsonp` 加载 chunk 的运行时代码。

对 `webpack runtime` 做进一步的精简，代码如下

```js
const __webpack_modules__ = [() => {}];
const __webpack_require__ = (id) => {
  const module = { exports: {} };
  const m = __webpack_modules__[id](module, __webpack_require__);
  return module.exports;
};

__webpack_require__(0);
```



### 代码调试

![image-20220529222701377](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205292227418.png)

打个断点，运行`node main.js` 进行代码调试更加好分析代码。

![image-20220529222739052](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205292227086.png)