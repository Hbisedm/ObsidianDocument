---
title: JavaScript对象遍历的笔记
tags: ["JavaScript对象遍历"]
创建时间: 星期三, 十月 5日 2022, 11:43:36 中午
修改时间: 星期三, 十月 5日 2022, 11:50:11 中午
---
#遍历 #JavaScript

# JavaScript对象遍历的笔记

## key遍历

### For-in

```js
for(const key in obj) {
  //...
}
```


### Object.keys()

```js
Object.keys(obj)
```

### Object.getOwnPropertyNames()

Object.getOwnPropertyNames(obj),返回一个数组,
**包含对象自身的所有属性(不含Symbol属性,但是包括不可枚举属性).**

```js
Object.getOwnPropertyNames(obj)

```

> vue中的响应式对象 携带的`_ob` 也会遍历出来

### Reflect.ownKeys()

返回一个数组,包含对象自身的所有属性,
**不管属性名是Symbol或字符串,也不管是否可枚举.**
```js

Reflect.ownKeys(obj)

```

## 值遍历


### For-of

```js
for(const value of obj) {
	//...
}
```

