---

title: 手写new
tags: ["面试", "笔试题"]
excerpt: 手写new
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期日, 八月 7日 2022, 2:26:13 下午
---
# 手写new

#笔试题


分为四步：
① JS内部首先会先生成一个对象；
② 再把函数中的this指向该对象；
③ 然后执行构造函数中的语句；
④ 最终返回该对象实例。

```js
function createObj(func, ...args) {
let obj = Object.create(func.prototype)
let res = fn.apply(obj, args)
return res instanceof Object ? res: obj
}
```