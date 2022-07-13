---

title: JavaScript的reduce的使用

date: 2022-05-26 12:42:26

tags: ["JavaScript"]

excerpt: 分析reduce

---





#JavaScript #数组方法

# 概念

**reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值。**

reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。

语法：

```javascript
arr.reduce(callback,[initialValue])
```

-   callback （执行数组中每个值的函数，包含四个参数）
    -   previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
    -   currentValue （数组中当前被处理的元素）
    -   index （当前元素在数组中的索引）
    -   array （调用 reduce 的数组）
-   initialValue （作为第一次调用 callback 的第一个参数。）

# 重点

如果有初始值的话，回调函数就会从数组的第0项开始执行，也就是会执行`arr.length`次；

但是如果没有初始值的话，会默认取数组的第0项为初始值，回调函数会从数组的第1项开始执行，也就是会执行`arr.length - 1`次。

# 手写reduce
```js
Array.prototype.MyReduce = function (fn, initialValue) {
  var arr = Array.prototype.slice.call(this);
  var pre, startIndex;
  pre = initialValue ? initialValue : arr[0];
  startIndex = initialValue ? 0 : 1;
  for (var i = startIndex; i < arr.length; i++) {
    pre = fn.call(null, pre, arr[i], i, this)
  }
  return pre
}

```

过程分析：

-   首先，`map、reduce`这种方法都是数组原型对象上的方法，所以我将`MyReduce`定义在`Array.prototype` 上，这样你就可以直接使用`ary.MyReduce()`这样的方式调用它了(`ary是一个类似于这样的数组[1, 2, 3]`)。
-   对于参数，我们参考原生`reduce`，它接收的第一个参数是一个回调函数，第二个是初始值
-   而`var arr = ...`的作用是获取调用`MyReduce`函数的那个变量，也就是说`this`会指向那个变量，例如`ary.MyReduce()`，那么此时`this`就为`ary`。
-   至于为什么不使用`var arr = this;`的方式而是使用`Array.prototype.slice.call(this)`，算是实现一个浅拷贝吧，因为`reduce`是不会改变原数组的。
-   然后就是定义传入`reduce`中的回调函数的第一个参数`pre`，也就是上一次运行结果的返回值，可以看到这里就用到了初始值`initialValue`，如果存在初始值就取初始值，不存在则默认取数组第`0`项。(当然这里直接用`initialValue ?`来判断存不存在并不准确，因为我们知道`0`也会被判断为`false`)
-   接着是定义循环开始的下标`startIndex`，若是不存在初始值，则初始值是会取数组中的第`0`项的，相当于第`0`项并不需要运行，所以`startIndex`会是`1`，而如果有初始值的话则需要将数组的每一项都经过`fn`运行一下。
-   最后，`for`循环中使用`fn.call()`来调用`fn`函数，并且最后一个参数是要把原来的数组传递到回调函数中，也就是这里的`this`。

# 应用

`array.reduce` 遍历并将当前次回调函数的返回值作为下一次回调函数执行的第一个参数。

利用 `array.reduce` 替代一些需要多次遍历的场景，可以极大提高代码运行效率。

1.  利用`reduce` 输出一个数字/字符串

假如有如下每个元素都由字母's'加数字组成的数组`arr`，现在找出其中最大的数字：（`arr`不为空）

```jsx
const arr = ['s0', 's4', 's1', 's2', 's8', 's3']

// 方法1  进行了多次遍历，低效
const newArr = arr.map(item => item.substring(1)).map(item => Number(item))
const maxS = Math.max(...newArr)

// 方法2  一次遍历
const maxS = arr.reduce((prev, cur) => {
  const curIndex = Number(cur.replace('s', ''))
  return curIndex > prev ? curIndex : prev
}, 0)
```

2.  利用`reduce` 输出一个数组/对象

```jsx
const arr = [1, 2, 3, 4, 5]

 // 方法1  遍历了两次，效率低
const value = arr.filter(item => item % 2 === 0).map(item => ({ value: item }))

// 方法1  一次遍历，效率高
const value = arr.reduce((prev, curr) => {
    return curr % 2 === 0 ? [...prev, { value: curr }] : prev
}, [])
```

掌握了上面两种用法，结合实际需要，就可以用 `reduce/reduceRight` 实现各种奇巧淫技了。

实例：利用 `reduce` 做下面这样的处理来生成想要的 html 字符串：

```jsx
// 后端返回数据
const data = {
  'if _ then s9': [
    '作用属于各种,结构属于住宅,结构能承受作用,作用属于在正常建造和正常使用过程中可能发生',
    '作用属于各种,结构属于住宅,结构能承受作用,作用属于在正常建造和正常使用过程中可能发生',
    '作用属于各种,结构属于住宅,结构能承受作用,作用属于在正常建造和正常使用过程中可能发生'
    ],
  'if C then s4': [
    '当有条件时时,结构构件满足要求,要求属于安全性、适用性和耐久性',
    '当有条件时时,住宅结构满足要求,要求属于安全性、适用性和耐久性'
  ]
}

const ifthens = Object.entries(data).reduce((prev, cur) => {
  const values = cur[1].reduce((prev, cur) => `${prev}<p>${cur}</p>`, '')
  return `
    ${prev}
    <li>
      <p>${cur[0]}</p>
      ${values}
    </li>
  `
}, '')

const html = `
  <ul class="nlp-notify-body">
    ${ifthens}
  </ul>
`
```

生成到html结构如下

```html
<ul class="nlp-notify-body">            
  <li>
    <p>if _ then s9</p>
    <p>作用属于各种,结构属于住宅,结构能承受作用,作用属于在正常建造和正常使用过程中可能发生</p>
    <p>作用属于各种,结构属于住宅,结构能承受作用,作用属于在正常建造和正常使用过程中可能发生</p>
    <p>作用属于各种,结构属于住宅,结构能承受作用,作用属于在正常建造和正常使用过程中可能发生</p>
  </li>
  <li>
    <p>if C then s4</p>
    <p>当有条件时时,结构构件满足要求,要求属于安全性、适用性和耐久性</p>
    <p>当有条件时时,住宅结构满足要求,要求属于安全性、适用性和耐久性</p>
  </li>
</ul>
```

这里还有一个替代 `reverse` 函数的技巧

由于 `array.reverse()` 函数会改变原数组自身，这样就限制了一些使用场景。如果我想要一个不会改变数组自身的 `reverse` 函数呢？拿走！

```jsx
const myReverse = (arr = []) => {
    return  arr.reduceRight((prev, cur) => [...prev, cur], []) // 也可以返回逗号表达式 (prev.push(cur), prev)
}
```

`reduce` 太强大了，这里只能展示基本用法。到底有多强大推荐查看大佬这篇[《25个你不得不知道的数组reduce高级用法》](https://juejin.cn/post/6844904063729926152)