---
title: for循环遍历的笔记
tags: ["for循环遍历"]
创建时间: 星期一, 八月 15日 2022, 10:56:06 晚上
修改时间: 星期一, 八月 15日 2022, 11:00:40 晚上
---
#for循环遍历 #数组循环

# for循环遍历的笔记

有6种循环方式
- for
- for-of
- forEach
- filter
- map
- for-in

性能对比
`for` > `for-of` > `forEach` > `filter` > `map` > `for-in`

这很明显处理大量循环数据的时候还是要使用古老`for`循环效率最好,但也不是不使用`for-in`,其实很多时候都要根据实际应该场景的,`for-in`更多使用在遍历对象属性上面,`for-in`在遍历的过程中还会遍历继承链,所以这就是它效率比较慢的原因,比如`map` 速率不高,不过处理在Es6实现数组功能上面非常好用方便,轻松影射创建新数组.或者例如使用[**Iterator**](https://link.juejin.cn?target=http%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Fiterator "http://es6.ruanyifeng.com/#docs/iterator")属性也是行的,所以每个循环都有合适使用的地方.


- some
- every

## `every` 和 `some` 不完全属于数组操作方法

`every` 和 `some` 都是判断条件直接返回整个数组Boolean类型的方法.`every`速度会比`some`快很多.


![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202208152259966.png)






## 参考链接
[JavaScript的循环对比](https://juejin.cn/post/6844903538175262734)