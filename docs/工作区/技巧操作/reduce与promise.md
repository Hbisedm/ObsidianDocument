---

title: reduce、promise配合使用

date: 2022-05-26 12:42:26

tags: ["常用开发技巧"]

excerpt: 串行处理promise实例

---



# reduce与promise的配合使用

利用 reduce 实现 Promise 串行执行

```js
// array是个Promise数组
function foo(array) {
  array.reduce((prev, next) => {
    prev.then(()=> {
      next()
    })
  }, Promise.resolve())
}
```

#### 注意点

- Array.prototype.reduce是个同步方法（在一个事件循环就会完成）
- 但这仅仅是在内存快速构造了 Promise 执行队列
- `Reduce` 的作用就是在内存中生成这个队列，而不需要把这个冗余的队列写在代码里！







### 更简单的方法

使用async/await

```js
async function runPromiseByQueue(myPromises) {
  for (let value of myPromises) {
    await value();
  }
}
```

>  不过要注意，这个思路与 `reduce` 思路不同之处在于，利用 `reduce` 的函数整体是个同步函数，自己先执行完毕构造 Promise 队列，然后在内存异步执行；而利用 async/await 的函数是利用将自己改造为一个异步函数，等待每一个 Promise 执行完毕。



















### 参考链接

- [用Reduce实现Promise串行](https://segmentfault.com/a/1190000016832285)
- [使用Array.reduce创建Promise回调链](https://juejin.cn/post/6844903582450319373)
- [什么是好的面试题](https://juejin.cn/post/7091486488201805861#heading-0)