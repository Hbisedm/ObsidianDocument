---
title: This的指向的笔记
tags: ["This", "javaScript"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期日, 八月 7日 2022, 2:29:26 下午
---
#JavaScript #This

# This的指向的笔记

>这篇[箭头函数](https://juejin.cn/post/6844903805960585224)写得挺好的

- 在浏览器里，在全局范围内this 指向window对象；
- 在函数中，this永远指向最后调用他的那个对象；
- 构造函数中，this指向new出来的那个新的对象；
- `call、apply、bind`中的this被强绑定在指定的那个对象上；
- **箭头函数中this比较特殊,箭头函数this为父作用域的this，不是调用时的this.要知道前四种方式,都是调用时确定,也就是动态的,而箭头函数的this指向是静态的,声明的时候就确定了下来；指向定义时的父级作用域。**
- `apply、call、bind`都是js给函数内置的一些API，调用他们可以为函数指定this的执行,同时也可以传参。


> 箭头函数的指向⭐️⭐️⭐️⭐️⭐️：
> - [[作用域]]指的是函数内部
> - 对象字面量 定义时不具有作用域

⭐️⭐️⭐️⭐️⭐️
```js
const obj = {
	// 这个{}包裹的东西不算作用域哦
}
```

```js
function foo() {
    this.age = 1
    this.obj = {
        haha:() => {
            console.log(this.age)
        }
    }
    return this.obj.haha
}
let bar = {
    age: 2,
    func: at
}
foo()() // 1
bar.func()() //1
```

- 箭头函数的this不会改变！


一些容易误解的例子

```js

// 函数内的使用this
function test() {
    age = 32
    let obj = {
        name: 'Sam',
        age: 23,
        testt: this.age
    }
    return obj
}

// 等同下面=> 

function test1() {
    age = 32
    let obj = new Object()
    obj.name = 'Sam'
    obj.age = 23
    obj.testt = this.age
    return obj
}


// 对象内的value使用this

let o1 = {
    x: 1,
    o2: {
        name: 'sam',
        age: this.x // 理解当作普通函数执行的this，也就是window or global
    }
}

// 等同下面=>

let o1 = new Object()
o1.age = 32
o1.o2 = new Object()
o1.o2.name = 'Sam'
o1.o2.age = 23
o1.o2.testt = this.age //所以这个this 不就是window or global
return o1.o2

```

> 上面的第一个返回的obj为啥testt是32？

- 请先注意这个是函数不是对象
- 要好好理解对象字面量 {} 中括号这个包裹内容的this

- 因为第一行代码的age没有给`var`, `let`, `const`这些修饰符
- 所以如果我们没有开启严格模式的话`'use strict'`
那么`age = 32` => `window.age = 32`
正常执行这个test()时，当前的this指向window。

如果使用new test()的话，当前函数就变成了构造函数了，所以this就是当前创建出来的实例对象了。