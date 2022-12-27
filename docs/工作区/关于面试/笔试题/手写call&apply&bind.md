---
title: 手写call&apply&bind的笔记
tags: ["手写call&apply&bind"]
创建时间: 星期四, 十二月 22日 2022, 3:50:49 下午
修改时间: 星期四, 十二月 22日 2022, 5:16:45 下午
---

#手写 #call #bind  #apply  #笔试题 

# 手写call&apply&bind的笔记

## 定义

不太熟悉可以先看下[[call&apply&bind]]用法

### 思路

手写`call` `apply` 这2个的思路大致一样，区分下**数组处理**就可以

拿到第一个参数，`调用者`是谁
拿到参数列表
然后将`this`(当前函数)赋值到`调用者`的`Symbol`属性，保证唯一
然后执行函数
删除`Symbol`属性
`return` 函数返回值

`bind`的话
`bind`因为是返回个函数，所以需要用到个返回包裹着执行函数的代码
还要考虑返回的函数 是不是用于构造函数使用的


### Bind

```js
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
} 
```

### Call

```js
Function.prototype.myApply = function(context) {
	const currCtx = context || window
	const fn = Symbol('fn')
	currCtx[fn] = this // this 为当前的函数
	const args = [...arguments].splice(1)
	const result = currCtx[fn](...args)
	Reflect.deleteProperty(currCtx, fn)
	return result
}
```


### Apply

```js
Function.prototype.myApply = fucntion(context) {
    if(typeof this !== 'function') {
        throw new TypeError('not a function!')
    }
    context = context || window
    context.fn = this
    let result
    if(arguments[1]) {
        result = context.fn(...arguments[1])
    }else{
        result = context.fn()
    }
    delete context.fn
    return result
}
```
