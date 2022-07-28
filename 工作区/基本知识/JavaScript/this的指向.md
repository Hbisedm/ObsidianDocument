---
title: this的指向的笔记
tags: ["this", "javaScript"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 七月 28日 2022, 1:23:47 下午
---
#JavaScript #this

# this的指向的笔记

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

// => 

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

// =>

let o1 = new Object()
o1.age = 32
o1.o2 = new Object()
o1.o2.name = 'Sam'
o1.o2.age = 23
o1.o2.testt = this.age //所以这个this 不就是window or global
return o1.o2

```

> 上面的返回的obj为啥testt是32？

因为第一行代码的age没有给`var`, `let`, `const`这些修饰符
所以如果我们没有开启严格模式的话`'use strict'`
那么`age = 32` => `window.age = 32`
正常执行这个test()时，当前的this指向window。

如果使用new test()的话，当前函数就变成了构造函数了，所以this就是当前创建出来的实例对象了。