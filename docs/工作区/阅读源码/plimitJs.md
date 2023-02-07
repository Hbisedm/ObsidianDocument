---
title: plimitJs的笔记
tags: ["plimitJs"]
创建时间: 星期二, 二月 7日 2023, 11:24:32 晚上
修改时间: 星期三, 二月 8日 2023, 12:23:25 凌晨
---

#plimitJs #源码

# plimitJs的笔记

## Why

`Primise.all()` 进行并发异步任务

但是有些情况下，需要限制每次并发的个数。分片上传的场景

> 也不是说除了请求才是异步，前端也可以做一些计算型的异步任务。

这种情况下，需要可以使用`p-limit.js`

```js
import pLimit from 'p-limit';  
  
const limit = pLimit(2);  
  
const input = [  
    limit(() => fetchSomething('foo')),  
    limit(() => fetchSomething('bar')),  
    limit(() => doSomething())  
];  
  
const result = await Promise.all(input);  
console.log(result);
```

比如上面这段逻辑，就是几个异步逻辑并行执行，并且最大并发是 2。

那如何实现这样的并发控制呢？

## 源码解析

```js
// 引入一个队列脚本库 
// 也可以用Array 和其对应shift和push进行模拟
import Queue from "yocto-queue";

export default function pLimit(concurrency) {
  if (
    !(
      (Number.isInteger(concurrency) ||
        concurrency === Number.POSITIVE_INFINITY) &&
      concurrency > 0
    )
  ) {
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  }

  // 创建队列
  const queue = new Queue();
  // 当前运行的线程数
  let activeCount = 0;

  // 有空闲空间时进行下一个异步任务
  const next = () => {
    activeCount--;

    if (queue.size > 0) {
      // 出队
      queue.dequeue()();
    }
  };

  // run一个异步函数
  const run = async (fn, resolve, args) => {
  // 加入一个任务数
    activeCount++;

    const result = (async () => fn(...args))();

    resolve(result);

    try {
      await result;
    } catch {}

    next();
  };

  // 封装的入队列函数， 判断 线程活跃数 是否达到阈值 concurrency
  const enqueue = (fn, resolve, args) => {
    queue.enqueue(run.bind(undefined, fn, resolve, args));

    (async () => {
      // 锁 concurrency 是异步才更新的值， 所以也需要异步任务后才能拿到最新值
      // This function needs to wait until the next microtask before comparing
      // `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
      // when the run function is dequeued and called. The comparison in the if-statement
      // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
      await Promise.resolve();

      if (activeCount < concurrency && queue.size > 0) {
        queue.dequeue()();
      }
    })();
  };

  const generator = (fn, ...args) =>
    new Promise((resolve) => {
      enqueue(fn, resolve, args);
    });

  // 提供外部api，可以查看当前队列空间的情况
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount,
    },
    pendingCount: {
      get: () => queue.size,
    },
    clearQueue: {
      value: () => {
        queue.clear();
      },
    },
  });

  return generator;
}

```


![plimit.drawio.png](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202302080023495.png)
