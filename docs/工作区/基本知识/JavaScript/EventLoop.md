---
title: JavaScript的EventLoop
date: 2022-05-31 12:42:26
tags: ["JavaScript"]
excerpt: 事件循环
---

![2e887b16a7f5ff9c7a5c3a34b4d8f610.png](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205312217046.png)

- 默认代码从上到下执行，执行环境通过script来执行（宏任务）
- 在代码执行过程中，调用定时器 promise click事件…不会立即执行，需要等待当前代码全部执行完毕
- 给异步方法划分队列，分别存放到微任务（立即存放）和宏任务（时间到了或事情发生了才存放）到队列中
- script执行完毕后，会清空所有的微任务
- 微任务执行完毕后，会渲染页面（不是每次都调用）
- 再去宏任务队列中看有没有到达时间的，**拿出来其中一个执行**
- 执行完毕后，按照上述步骤不停的循环

> - **宏任务（macrotask）**：setTimeout、setInterval、IO事件、setImmediate、close事件；
> - **微任务（microtask）**：Promise的then回调、process.nextTick、queueMicrotask；

### 微任务队列：

- next tick queue：process.nextTick；
- other queue：Promise的then回调、queueMicrotask；

### 宏任务队列：

- timer queue：setTimeout、setInterval；
- poll queue：IO事件；
- check queue：setImmediate；
- close queue：close事件；

所以，在每一次事件循环的tick中，会按照如下顺序来执行代码：

- next tick microtask queue；
- other microtask queue；
- timer queue；
- poll queue；
- check queue；
- close queue；

# 总结

JS第一次运行的时候，会执行全部宏任务和微任务（微任务在宏任务后面执行），如果只执行微任务的话，对页面UI渲染会造成改变，宏任务则不会；接着JS这个蠢货就一直等待事件的发生，若有宏任务则每次只拿取一个，若里面有微任务的话，则等微任务执行完毕后宏任务也会跟着执行，然后清空所有异步任务。



## 例子

```js
console.log(1);
setTimeout(function () {
  console.log(2);
  process.nextTick(function () {
    console.log(3);
  });
  new Promise(function (resolve) {
    console.log(4);
    resolve();
  }).then(function () {
    console.log(5);
  });
});
process.nextTick(function () {
  console.log(6);
});
new Promise(function (resolve) {
  console.log(7);
  resolve();
}).then(function () {
  console.log(8);
});
setTimeout(function () {
  console.log(9);
  process.nextTick(function () {
    console.log(10);
  });
  new Promise(function (resolve) {
    console.log(11);
    resolve();
  }).then(function () {
    console.log(12);
  });
});
```

不同版本的node

![image-20220601085234622](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206010853403.png)



## 参考链接

[node版本不同=>EventLoop不同](https://juejin.cn/post/7102417462406168607)