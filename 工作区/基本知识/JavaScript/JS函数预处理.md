---
title: JavaScirpt的预处理
date: 2022-05-26 12:42:26
tags: ["JavaScript"]
excerpt: 预处理
---





#JavaScript  #面试题 

函数的预处理和全局的预处理大致一致，区别在于函数有参数。（变量提升）

```js
function test(a,b){
   console.log(a);//4
   console.log(b);//函数的引用
   console.log(c);//报错
   console.log(d);//undefined
   var a = 1;
   function b(){
     //......
   }
   c = 2;
   var d = 3;
   console.log(a);//1
   console.log(b);//函数的引用
   console.log(c);//2
   console.log(d);//3
}
test(4,5);
```

当函数运行到“test(4,5)”时进入到test函数，此时创建再增加一个新的执行环境，进行预处理得到LE：

```js
LE{
  a:4,
  b:函数的引用,
  d:undefined,
  /*arguments表示参数的长度*/
  arguments:2
 }
```

> 总结：

当函数内定义的值==var a==和函数的参数列表中==a==有同名的话，变量提升(函数预处理)后，会将参数的实参赋值到==形参a==中，若与非匿名自执行函数同名，==var a==会覆盖，但是==a==不能覆盖，且不能修改，因为这个变量是只读的状态。