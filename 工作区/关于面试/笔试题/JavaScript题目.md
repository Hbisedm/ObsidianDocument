---
title: JavaScript题目的笔记
tags: ["JavaScript题目"]
创建时间: 星期三, 八月 3日 2022, 11:23:24 晚上
修改时间: 星期三, 八月 3日 2022, 11:39:14 晚上
---
#笔记题

# JavaScript题目的笔记

## Async Await

```js
async function fn1() {
    await console.log(1)
    console.log(2)
    await fn2()
    console.log(3)
}
async function fn2() {
    await console.log(4)
    console.log(5)
    await console.log(6)
}
const result = fn1()
console.log(7)
```



```js
async function foo() {
    console.log(2);
    console.log(await Promise.resolve(8));
    console.log(9);
}

async function bar() {
    console.log(4);
    console.log(await 6);
    console.log(7);
}

console.log(1);
foo();
console.log(3);
bar();
console.log(5);
```

解析：
- async当做大同步
- await当做小异步
- `console.log()`是同步操作
- await是异步，异步的操作等下一个时间循环的时候才执行。


## 变量提升与原型

```js
function fn() {
    console.log(p)
    p = {name: '蜘蛛侦探'}
    console.log(window.p.name)
    console.log(p.name)
    var p = {name: '蝎子莱莱'}
    console.log(p.name)
}
function Person() {}
var p = new Person()
fn()
Person.prototype = {name: '鲨鱼辣椒'}
fn()
```

解析：
- new出来的对象后，prototype改变后，原来的对象的原型引用不受影响。

