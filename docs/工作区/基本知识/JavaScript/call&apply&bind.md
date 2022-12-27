---
title: call&apply&bind的笔记
tags: ["call&apply&bind"]
创建时间: 星期四, 十二月 22日 2022, 3:38:27 下午
修改时间: 星期四, 十二月 22日 2022, 3:47:51 下午
---

#JavaScript #call #bind #apply

# call&apply&bind的笔记

## 是什么

`call、apply` 和 `bind` 是挂在 `Function` 对象上的三个方法，调用这三个方法的必须是一个函数。

```js
func.call(thisArg, param1, param2, ...)
func.apply(thisArg, [param1,param2,...])
func.bind(thisArg, param1, param2, ...)
```

## 使用场景

- 判断数据类型
- 类数组借用方法

### 判断数据类型

用 `Object.prototype.toString` 来判断类型是最合适的，借用它我们几乎可以判断所有类型的数据

```js
function getType(obj){
  let type  = typeof obj;
  if (type !== "object") {
    return type;
  }
  return Object.prototype.toString.call(obj).replace(/^$/, '$1');
}
```

### 类数组借用方法

类数组因为不是真正的数组，所有没有数组类型上自带的种种方法，所以我们就可以利用一些方法去借用数组的方法，比如借用数组的 `push` 方法，看下面的一段代码。

```js
var arrayLike = { 
  0: 'java',
  1: 'script',
  length: 2
} 
Array.prototype.push.call(arrayLike, 'jack', 'lily'); 
console.log(typeof arrayLike); // 'object'
console.log(arrayLike);
// {0: "java", 1: "script", 2: "jack", 3: "lily", length: 4}
```

### 获取数组的最大、最小值

我们可以用 apply 来实现数组中判断最大 / 最小值，`apply` 直接传递数组作为调用方法的参数，也可以减少一步展开数组，可以直接使用 `Math.max、Math.min` 来获取数组的最大值 / 最小值，请看下面这段代码。

```js
let arr = [13, 6, 10, 11, 16];
const max = Math.max.apply(Math, arr); 
const min = Math.min.apply(Math, arr);
 
console.log(max);  // 16
console.log(min);  // 6 
```





