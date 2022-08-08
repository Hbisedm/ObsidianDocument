---
title: JavaScript题目的笔记
tags: ["JavaScript题目"]
创建时间: 星期三, 八月 3日 2022, 11:23:24 晚上
修改时间: 星期日, 八月 7日 2022, 8:35:08 晚上
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

当碰到await时，
- `await 后面的代码` => `new Promise((resolve, reject)=> {后面的代码})`
- `await 下面的代码` => `Promise(...).then(下面的代码)`

宏任务执行前，先执行微任务 => 每次异步任务的事件循环，微任务先执行

await fn()
fn()
async fn(){...}

await fn() 会等待后面的fn() 就算里面有异步任务，可以理解成**同步**
fn() 里面有碰到异步任务的话，就会执行下行代码



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

```js
function Person() {}
var p = new Person()

console.log(Person())
console.log(Person instanceof Object)
console.log(Object instanceof Function)
console.log(p instanceof Object)
console.log(Person.prototype instanceof Function)
console.log(p.__proto__ === Person.__proto__)
```

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202208070021926.png)

- **对象源于函数**
- **对象原型**的隐式原型为null
- 对象**实例**的隐式原型为构建函数原型 (构建函数原型 不等同 函数原型 不一样的概念)
- 原型也是个对象，所以原型的隐式原型就是对象原型
- 写函数可以写函数对象的形式，new Function(//函数实现.....)

```js

function A() {}
A.prototype.n=1
var b=new A()
A.prototype={
    n:2,
    m:3,
}
var c=new A()
console.log(b.n,b.m)
console.log(c.n,c.m)

```

对象new出来后，修改原型对象的内存地址，不会对之前new对象有影响，之前的对象还是引用着之前的原型对象

## This

> this是个好玩的东西

```js

function User(name, age) {
    this.name = name
    this.age = age
    this.intro = function() {
        console.log(this.name)
    }
    this.howOld = () => {
        console.log(this.age)
    }
}
var name = '蜘蛛侦探', age = 18
var zc = new User('鲨鱼辣椒', 24)
zc.intro()
zc.howOld()

```

箭头函数的this指向**定义**它的上一级的作用域

```js
var obj = {
    name: "蟑螂恶霸",
    inner: {
        name: "蝎子莱莱",
        p: function (name) {
            console.log(this.name)
        }
    }
}
window.name = "鲨鱼辣椒"
var f1 = (function () {
    var that = this
    obj.inner.p.call(that)
})()
var f2 = new obj.inner.p()
;(obj.inner.p)()
;(obj.inner.p = obj.inner.p)()
```

TODO 最后一个想不出解释。。。。

## 隐式转换

```js

var obj = {a: 1, b: 2}
var a = {a: 3}
var b = {b: 4}
obj[a] = 5
obj[b] = 6
console.log(obj.a)
console.log(obj[a])

```

隐式转换 调用他的toString方法
`obj[a]` `obj[b]` =隐式转换=> `obj[Object Object]`
所以obj最后为 `{a: 1, b: 2, [object Object]: 6}`

## 闭包

```js
function funA() {
    var a = 10
    return function() {
        console.log(a++)
    }
}
var b = funA()
b()
funA()()
```

产生了2个闭包

```js
function f1() {
    var n = 999
    inc = function(){ n+=1 }
    function f2() { console.log(n) }
    return f2
}
var result1 = f1()
var result2 = f1()
result1()
inc()
result1()
result2()
```

产生2个闭包，这个题贱在inc被替换了，导致result1执行结果都是999