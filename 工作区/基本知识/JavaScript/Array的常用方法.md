---
title: JavaScript的Array的常用方法
date: 2022-05-26 12:42:26
tags: ["JavaScript", 数组]
excerpt: Array的常用方法列表
---

#JavaScript #数组方法 #常用

# 构造函数or普通函数的使用
```js
Array() //[]
Array(3)// [空属性 × 3]
Array(1,2,3) // [1, 2, 3]
Array(1,2)// [1, 2]
Array(1) // [空白]
new Array() // []
new Array(3)// [空属性 × 3]
new Array(1, 2, 3)// [1, 2, 3]
```
- 没有参数：空数组
- 一个参数：
	- x为number：x个undefined的数组，长度为x
	- x不为number：那么生成个长度为1，第0个索引的值为x
- 多个参数：每个参数都为数组的值


# 常用方法

数组操作首先要注意且牢记`splice、sort、reverse`这3个常用方法是对数组自身的操作，会改变数组自身。其他会改变自身的方法是增删`push/pop/unshift/shift`、填充`fill`和复制填充`copyWithin`

先献上数组方法懒人图一 （除了`Array.keys()/Array.values()/Array.entries()`基本都有）

![常用方法](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205191738856.png)

### 生成类似[1-100]这样的的数组：

测试大量数据的数组时可以这样生成：

```jsx
// fill
const arr = new Array(100).fill(0).map((item, index) => index + 1)

// Array.from() 评论区大佬指出
const arr = Array.from(Array(100), (v, k) => k + 1)

// ... + array.keys() 评论区大佬指出 生成的是0-99的数组
const ary = [...Array(100).keys()] 

```

`new Array(100)` 会生成一个有100空位的数组，这个数组是不能被`map()，forEach(), filter(), reduce(), every() ，some()`遍历的，因为空位会被跳过（`for of`不会跳过空位，可以遍历）。 `[...new Array(4)]` 可以给空位设置默认值`undefined`，从而使数组可以被以上方法遍历。

## 数组解构赋值应用

```jsx
// 交换变量
[a, b] = [b, a]
[o.a, o.b] = [o.b, o.a]
// 生成剩余数组
const [a, ...rest] = [...'asdf'] // a：'a'，rest: ["s", "d", "f"]
```

## 数组浅拷贝

```jsx
const arr = [1, 2, 3]
const arrClone = [...arr]
// 对象也可以这样浅拷贝
const obj = { a: 1 }
const objClone = { ...obj }
```

浅拷贝方法有很多如`arr.slice(0, arr.length)/Arror.from(arr)`等，但是用了`...`操作符之后就不会再想用其他的了~

## 数组合并

```jsx
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 = [7, 8, 9]
const arr = [...arr1, ...arr2, ...arr3]
```

`arr1.concat(arr2, arr3)`同样可以实现合并，但是用了`...`操作符之后就不会再想用其他的了~

## 数组去重

```jsx
const arr = [1, 1, 2, 2, 3, 4, 5, 5]
const newArr = [...new Set(arr)]
```

`new Set(arr)`接受一个数组参数并生成一个set结构的数据类型。set数据类型的元素不会重复且是`Array Iterator`，所以可以利用这个特性来去重。

## 数组取交集

```jsx
const a = [0, 1, 2, 3, 4, 5]
const b = [3, 4, 5, 6, 7, 8]
const duplicatedValues = [...new Set(a)].filter(item => b.includes(item))
duplicatedValues // [3, 4, 5]
```

## 数据取差集

```jsx
const a = [0, 1, 2, 3, 4, 5]
const b = [3, 4, 5, 6, 7, 8]
const diffValues = [...new Set([...a, ...b])].filter(item => !b.includes(item) || !a.includes(item)) // [0, 1, 2, 6, 7, 8]
```

## 数组转对象

```jsx
const arr = [1, 2, 3, 4]
const newObj = {...arr} // {0: 1, 1: 2, 2: 3, 3: 4}
const obj = {0: 0, 1: 1, 2: 2, length: 3}
// 对象转数组不能用展开操作符，因为展开操作符必须用在可迭代对象上
let newArr = [...obj] // Uncaught TypeError: object is not iterable...
// 可以使用Array.form()将类数组对象转为数组
let newArr = Array.from(obj) // [0, 1, 2]
```

## 数组摊平

```jsx
const obj = {a: '群主', b: '男群友', c: '女裙友', d: '未知性别'}
const getName = function (item) { return item.includes('群')}
// 方法1
const flatArr = Object.values(obj).flat().filter(item => getName(item))
// 经大佬指点，更加简化（发现自己的抽象能力真的差~）
const flatArr = Object.values(obj).flat().filter(getName)
```

二维数组用`array.flat()`，三维及以上用`array.flatMap()`。`array.flat(2)`可以传参数字如 2，表示要摊平的层数。

# 数组常用遍历

数组常用遍历有 `forEach、every、some、filter、map、reduce、reduceRight、find、findIndex`等方法，很多方法都可以达到同样的效果。数组方法不仅要会用，而且要用好。要用好就要知道什么时候用什么方法。

## 遍历的混合使用

`filter`、`map`方法返回值仍旧是一个数组，所以可以搭配其他数组遍历方法混合使用。注意遍历越多效率越低~

```jsx
const arr = [1, 2, 3, 4, 5]
const value = arr
    .map(item => item * 3)
    .filter(item => item % 2 === 0)
    .map(item => item + 1)
    .reduce((prev, curr) => prev + curr, 0)
```

## 检测数组所有元素是否都符合判断条件

```jsx
const arr = [1, 2, 3, 4, 5]
const isAllNum = arr.every(item => typeof item === 'number')
```

## 检测数组是否有元素符合判断条件

```jsx
const arr = [1, 2, 3, 4, 5]
const hasNum = arr.some(item => typeof item === 'number')
```

## 找到第一个符合条件的元素/下标

```jsx
const arr = [1, 2, 3, 4, 5]
const findItem = arr.find(item => item === 3) // 返回子项
const findIndex = arr.findIndex(item => item === 3) // 返回子项的下标

// 我以后再也不想看见下面这样的代码了😂
let findIndex
arr.find((item, index) => {
    if (item === 3) {
        findIndex = index
    }
})
```

## 数组使用误区

数组的方法很多，很多方法都可以达到同样的效果，所以在使用时要根据需求使用合适的方法。

垃圾代码产生的很大原因就是数组常用方法使用不当，这里有以下需要注意的点

## array.includes() 和 array.indexOf()

`array.includes()` 返回布尔值，`array.indexOf()` 返回数组子项的索引。`indexOf` 一定要在需要索引值的情况下使用。

```jsx
const arr = [1, 2, 3, 4, 5]

// 使用indexOf，需要用到索引值
const index = arr.indexOf(1) // 0
if (~index) { // 若index === -1，~index得到0，判断不成立；若index不为-1，则~index得到非0，判断成立。
    arr.spilce(index, 1)
}

// 使用includes，不需要用到索引值
// 此时若用indexOf会造成上下文上的阅读负担：到底其他地方有没有用到这个index?
const isExist = arr.includes(6) // true
if (!isExist) {
    arr.push(6)
}
```

另外评论区大佬指出，`array.indexOf()`找 `NaN` 会找不到，返回`-1`，`array.includes()`能找到，返回`true`~

```jsx
[NaN].includes(NaN) // true
[NaN].indexOf(NaN) // -1
```

**array.find() 、 array.findIndex() 和 array.some()**

`array.find()`返回值是第一个符合条件的数组子项，`array.findIndex()` 返回第一个符合条件的数组子项的下标，`array.some()` 返回有无复合条件的子项，如有返回`true`，若无返回`false`。注意这三个都是短路操作，即找到符合条件的之后就不在继续遍历。

在需要数组的子项的时候使用`array.find()`；需要子项的索引值的时候使用 `array.findIndex()`；而若只需要知道有无符合条件的子项，则用 `array.some()`。

```jsx
const arr = [{label: '男', value: 0}, {label: '女', value: 1}, {label: '不男不女', value: 2}]

// 使用some
const isExist = arr.some(item => item.value === 2)
if (isExist) {
    console.log('哈哈哈找到了')
}

// 使用find
const item = arr.find(item => item.value === 2)
if (item) {
    console.log(item.label)
}

// 使用findIndex
const index = arr.findIndex(item => item.value === 2)
if (~index) {
    const delItem = arr[index]
    arr.splice(index, 1)
    console.log(`你删除了${delItem.label}`)
}
```

建议在只需要布尔值的时候和数组子项是字符串或数字的时候使用 `array.some():`

```jsx
// 当子包含数字0的时候可能出错
const arr = [0, 1, 2, 3, 4]

// 正确
const isExist = arr.some(item => item === 0)
if (isExist) {
    console.log('存在要找的子项，很舒服~')
}

// 错误
const isExist = arr.find(item => item === 0)
if (isExist) { // isExist此时是0，隐式转换为布尔值后是false
    console.log('执行不到这里~')
}

// 当子项包含空字符串的时候也可能出错
const arr = ['', 'asdf', 'qwer', '...']

// 正确
const isExist = arr.some(item => item === '')
if (isExist) {
    console.log('存在要找的子项，很舒服~')
}

// 错误
const isExist = arr.find(item => item === '')
if (isExist) { // isExist此时是''，隐式转换为布尔值后是false
    console.log('执行不到这里~')
}
```

## array.find() 和 array.filter()

只需要知道 `array.filter()` 返回的是所有符合条件的子项组成的数组，会遍历所有数组；而 `array.find()` 只返回第一个符合条件的子项，是短路操作。不再举例~

## 合理使用 Set 数据结构

由于 es6 原生提供了 `Set` 数据结构，而 `Set` 可以保证子项不重复，且和数组转换十分方便，所以在一些可能会涉及重复添加的场景下可以直接使用 `Set`代替 `Array`，避免了多个地方重复判断是否已经存在该子项。

```jsx
const set = new Set()
set.add(1)
set.add(1)
set.add(1)
set.size // 1
const arr = [...set] // arr: [1]
```


[[Array的Reduce#应用]]