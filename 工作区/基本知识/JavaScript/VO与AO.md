---
title: VO与AO
date: 2022-07-18 16:53:47
tags: ["VO", "AO"]
---
#VO #AO 

# VO与AO的笔记

## 概念

VO 和 AO 是ES3规范中的概念，我们知道在创建过程的第二个阶段会创建变量对象，也就是VO，它是用来存放执行环境中可被访问但是不能被 delete 的函数标识符，形参，变量声明等，这个对象在js环境下是不可访问的。而AO 和VO之间区别就是AO 是一个激活的VO，仅此而已。

-   变量对象（Variable) object）是说JS的执行上下文中都有个对象用来存放执行上下文中可被访问但是不能被delete的函数标示符、形参、变量声明等。它们会被挂在这个对象上，对象的属性对应它们的名字对象属性的值对应它们的值但这个对象是规范上或者说是引擎实现上的不可在JS环境中访问到活动对象  
-   激活对象（Activation object）有了变量对象存每个上下文中的东西，但是它什么时候能被访问到呢？就是每进入一个执行上下文时，这个执行上下文儿中的变量对象就被激活，也就是该上下文中的函数标示符、形参、变量声明等就可以被访问到了

## 执行细节

如何创建VO对象可以大致分为：
- 创建arguments对象
- 扫描上下文的函数声明
	> 在变量对象上创建一个属性——确切的说是函数的名字——其有一个指向函数在内存中的引用。如果函数的名字已经存在，引用指针将被重写。
- 扫描上下文的变量声明
	> 为发现的每个变量声明，在变量对象上创建一个属性——就是变量的名字，并且将变量的值初始化为undefined。如果变量的名字已经在变量对象里存在，将不会进行任何操作并继续扫描。

> 注意： 整个过程可以大概描述成： 函数的形参=>函数声明=>变量声明， 其中在创建函数声明时，如果名字存在，则会被重写，在创建变量时，如果变量名存在，则忽略不会进行任何操作。


```js
function foo(i) {
    var a = 'hello';
    var b = function privateB() {

    };
    function c() {

    }
}

foo(22);
```

```js
// 创建阶段
fooExecutionContext = {
    scopeChain: { ... },
    variableObject: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c()
        a: undefined,
        b: undefined
    },
    this: { ... }
}
// 激活阶段
fooExecutionContext = {
    scopeChain: { ... },
    variableObject: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c()
        a: 'hello',
        b: pointer to function privateB()
    },
    this: { ... }
}
```