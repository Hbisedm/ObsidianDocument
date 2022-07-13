---

title: 手写new

date: 2022-05-26 12:42:26

tags: ["面试", "笔试题"]

excerpt: 手写new

---




#笔试题

```js
function createObj(func, ...args) {
let obj = Object.create(func.prototype)
let res = fn.apply(obj, args)
return res instanceof Object ? res: obj
}
```