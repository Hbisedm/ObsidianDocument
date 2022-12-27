---

title: 手写new
tags: ["面试", "笔试题"]
excerpt: 手写new
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 十二月 22日 2022, 3:51:39 下午
---
# 手写new

#笔试题 #new #手写

## ES6面向对象中的new关键字


- 创建类实例 - 对象
- 创建实例的时候执行构造函数

```js
class Person {
    constructor(name) {
        console.log('constructor')
        this.name = name
    }
​
    say() {
        console.log('My name is ',this.name)
    }
}
const sam = new Person("sam");
```


### 手写
分为四步：
① JS内部首先会先生成一个对象；
② 再把该对象的隐式原型指向构造函数的原型对象；
③ 然后执行构造函数中的语句；
④ 最终正确返回该对象实例。

```js
function myNew(fn, ...args) {
  // 创建一个空对象
  const obj = {};
  // 将该对象的 __proto__ 属性链接到构造函数原型对象
  obj.__proto__ = fn.prototype;
  // 将该对象作为 this 上下文调用构造函数并接收返回值
  const res = fn.apply(obj, args);
  // 如果返回值存在并且是引用数据类型，返回构造函数返回值，否则返回创建的对象
  return typeof res === "object" ? res : obj;
}
```


使用`Object.create()`优化上面的两段代码① ②

```js
function createObj(func, ...args) {
	let obj = Object.create(func.prototype)
	let res = fn.apply(obj, args)
	return res instanceof Object ? res: obj
}
```

