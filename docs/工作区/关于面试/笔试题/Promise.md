---
title: Promise的笔记
tags: ["Promise"]
创建时间: 星期日, 九月 18日 2022, 7:59:11 晚上
修改时间: 星期日, 九月 18日 2022, 11:44:27 晚上
---
#promise #异步

# Promise的笔记


> **Promise为我们解决了什么问题？** 在传统的异步编程中，如果异步之间存在依赖关系，就需要通过层层嵌套回调的方式满足这种依赖，如果嵌套层数过多，可读性和可以维护性都会变得很差，产生所谓的“回调地狱”，而 Promise 将嵌套调用改为链式调用，增加了可阅读性和可维护性。也就是说，Promise 解决的是异步编码风格的问题。 **那 Promise 的业界实现都有哪些呢？** 业界比较著名的实现 Promise 的类库有 bluebird、Q、ES6-Promise。


## Promise的使用

```js
new Promise((resolve, reject) => {
	const result = doSomething()
	resolve(result)
}).then((data) => {
	// success
}, (error) => {
	// error 
})
```


## 简单Promise的实现

```js

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(executor) {
    this.status = PENDING;
    // 存放成功的值
    this.value = undefined;
    // 存放失败的值
    this.reason = undefined;

    this.onResolvedCallbacks = [];

    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.value);
    }
    if (this.status === PENDING) {
      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.value);
      });
    }
  }
}

// 同步
const promise1 = new Promise((resolve, reject) => {
  resolve("success");
}).then(
  (data) => {
    console.log("success", data);
  },
  (err) => {
    console.log("fail", err);
  }
);

// 异步
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
}).then(
  (data) => {
    console.log("success", data);
  },
  (err) => {
    console.log("fail", err);
  }
);

```

以上实现了一个基本的Promise

## then的链式调用 与 值穿透

思考一下，如果每次调用 then 的时候，我们都重新创建一个 promise 对象，并把上一个 then 的返回结果传给这个新的 promise 的 then 方法，不就可以一直 then 下去了么？那我们来试着实现一下。这也是手写 Promise 源码的重中之重。


- then 的参数 `onFulfilled` 和 `onRejected` 可以缺省，如果 `onFulfilled` 或者 `onRejected`不是函数，将其忽略，且依旧可以在下面的 then 中获取到之前返回的值；「规范 Promise/A+ 2.2.1、2.2.1.1、2.2.1.2」
- promise 可以 then 多次，每次执行完 promise.then 方法后返回的都是一个“新的promise"；「规范 Promise/A+ 2.2.7」
- 如果 then 的返回值 x 是一个普通值，那么就会把这个结果作为参数，传递给下一个 then 的成功的回调中；
- 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.2.7.2」
- 如果 then 的返回值 x 是一个 promise，那么会等这个 promise 执行完，promise 如果成功，就走下一个 then 的成功；如果失败，就走下一个 then 的失败；如果抛出异常，就走下一个 then 的失败；「规范 Promise/A+ 2.2.7.3、2.2.7.4」
- 如果 then 的返回值 x 和 promise 是同一个引用对象，造成循环引用，则抛出异常，把异常传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.3.1」
- 如果 then 的返回值 x 是一个 promise，且 x 同时调用 resolve 函数和 reject 函数，则第一次调用优先，其他所有调用被忽略；「规范 Promise/A+ 2.3.3.3.3」


> then执行时，需要创建一个新的Promise对象
> 每次then的结果是一个新的Promise对象
> 防止造成循环引用（当前promise和then的返回promise是同一个对象）
>
>





## 参考链接

[面试官：“你能手写一个 Promise 吗”](https://juejin.cn/post/6850037281206566919#heading-1)
[ V8 Promise源码全面解读](https://juejin.cn/post/7055202073511460895#heading-1)
[Promise A+](https://promisesaplus.com/)