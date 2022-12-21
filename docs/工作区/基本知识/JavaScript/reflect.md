---
title: Reflect的笔记
tags: ["reflect"]
创建时间: 星期三, 十二月 21日 2022, 3:39:32 下午
修改时间: 星期三, 十二月 21日 2022, 4:33:27 下午
---

#JavaScript  #es6 #reflect 

# Reflect的笔记

## 基本知识

 `Reflect`又叫反射，设计的目的主要有以下几个：

- 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object` 和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。
- 修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)` 在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。
- 让`Object`操作都变成`函数行为`。某些`Object`操作是`命令式`，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)` 和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。
- `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect` 对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。`Proxy` 可以捕获13种不同的基本操作，这些操作有各自不同的`Reflect API`方法。

```js
const bar = {
  name: "Sam",
  age: 19,
};

console.log(bar);

// delete bar.name
Reflect.deleteProperty(bar, "name"); // 使用reflect

console.log(bar);
```

## 13种方法

-   `Reflect.get()` → 读取属性
-   `Reflect.set()` → 设置属性
-   `Reflect.has()` → 属性是否存在，等同于in
-   `Reflect.defineProperty()` → 定义属性
-   `Reflect.getOwnPropertyDescriptor()` → 获取指定属性的描述对象
-   `Reflect.deleteProperty()` → 删除属性，等同于delete
-   `Reflect.ownKeys()()` → 返回自身属性的枚举
-   `Reflect.getPrototypeOf()` → 用于读取对象的__proto__属性
-   `Reflect.setPrototypeOf()` → 设置目标对象的原型（prototype）
-   `Reflect.isExtensible()` → 表示当前对象是否可扩展
-   `Reflect.preventExtensions()` → 将一个对象变为不可扩展
-   `Reflect.apply()` → 调用函数，等同于等同于 Function.prototype.apply.call()，但借用原型方法可读性太差
-   `Reflect.construct()` → 等同于new

## vue3为何使用reflect

跟reflect的第三个参数`receiver` 有关系

```js
const foo = {
	name: 'Sam',
	get bar() {
		return this.name
	}
}

const proxy = new Proxy(foo, {
	get(target, key) {
		tarck(target, key)
		return target[key]
	}
})

effect(() => {
	proxy.bar
})
```

这里`get`拦截函数中，通过`target[key]`的方式返回
其他target是原始值`foo`，而`key` 是 `bar` 所以返回的是 `getter函数bar` =>`this.name`=>`foo.name`
很显然这里不是响应式对象`proxy`，所以不会有依赖收集

```js
effect(() => {
	obj.bar //原始对象 不是响应式对象 不会触发依赖收集
})
```

```js
const proxy = new Proxy(foo, {
	get(target, key, receiver) {
		tarck(target, key)
		return Reflect.get(target, key, receiver)
	}
})
```

当我们使用代理对象`proxy`访问`bar`属性时，那么`receiver`就是`proxy`，你可以把它简单地理解为函数调用中的`this`。 那么此时，访问器属性`bar`的`getter`函数内的`this`的指向就是代理对象`proxy`


