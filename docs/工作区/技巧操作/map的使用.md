---

title: map的使用

date: 2022-05-26 12:42:26

tags: ["常用开发技巧"]

excerpt: map的使用

---





# map的使用

原文地址：[http://www.cnblogs.com/lengyuehuahun/p/5642807.html](http://www.cnblogs.com/lengyuehuahun/p/5642807.html)

今天在地铁上看到这样一个小例子：

```js
["1","2","3"].map(parseInt);
```

　　相信很多人和我一样，觉得输出的结果是\[1,2,3\]。no!no!!no!!!正确的答案是\[1,NaN,NaN\]。当时我百思不得其解，于是到了公司之后就开始查阅资料，终于弄明白了。

　　我们先来介绍一下map()方法：

　　概述：

　　map()方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组，它不会改变原来的数组。

　　语法：

　　array.map(callback\[, thisArg\])

　　参数：

　　callback

　　　　原数组中的元素调用该方法后返回一个新数组。它接收三个参数，分别为 currentValue、index、array。

　　　　currentValue

　　　　　　callback的第一个参数，数组中当前被传递的元素。

　　　　index

　　　　　　callback的第二个参数，数组中当前被传递的元素的索引。

　　　　array

　　　　　　callback的第三个参数，调用map()方法的数组，即原数组。

　　thisArg

　　　　执行callback函数时this指向的对象。

　　描述

　　　　map()方法会给原数组中的每个元素都按顺序调用一次callback函数。callback每次执行后的返回值组合起来形成一个新的数组。callback函数只会在有值的索引上被调用，那些从来没被赋过值或者使用delete删除的索引则不会被调用。

　　　　callback函数会被自动传入三个参数：数组元素、数组元素索引、原数组本身。

　　　　如果thisArg参数有值，则每次调用callback函数时，this都会指向thisArg参数上的这个对象。如果省略了thisArg参数，或者赋值为null或undefined，则this指向全局对象。

　　　　使用map()方法处理数组时，数组元素的范围是在callback函数第一次被调用之前就确定了。在map()方法执行的过程中：原数组中新增加的元素将不会被callback访问到；若已经存在的元素被改变或删除了，则它们传递到callback的值是map()方法遍历到它们那一时刻的值；而被删除的元素将不会被访问到。

　　总结

　　　　通常情况下，map()方法中的callback函数只接受一个参数，就是正在被遍历的数组元素本身。但这并不意味着map只给callback传了一个参数。这个思维惯性可能会让我们犯一个很容易犯的错误。

　　兼容旧环境

　　　　map()方法是在最近的 ECMA-262 标准中新添加的方法；所以一些旧版本的浏览器可能没有实现该方法。在那些没有原生支持 map() 方法的浏览器中，你可以使用下面的 Javascript 代码来`实现它。`所使用的算法正是 ECMA-262，第 5 版规定的。假定Object、TypeError和 Array 有他们的原始值。而且callback.call的原始值也是 `[Function.prototype.call](https://developer.mozilla.org/zh-cn/JavaScript/Reference/Global_Objects/Function/call)

```js
// 实现 ECMA-262, Edition 5, 15.4.4.19
// 参考: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    // 1. 将O赋值为调用map方法的数组.
    var O = Object(this);

    // 2.将len赋值为数组O的长度.
    var len = O.length >>> 0;

    // 3.如果callback不是函数,则抛出TypeError异常.
    if (Object.prototype.toString.call(callback) != "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }

    // 4. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
    if (thisArg) {
      T = thisArg;
    }

    // 5. 创建新数组A,长度为原数组O长度len
    A = new Array(len);

    // 6. 将k赋值为0
    k = 0;

    // 7. 当 k < len 时,执行循环.
    while(k < len) {

      var kValue, mappedValue;

      //遍历O,k为原数组索引
      if (k in O) {

        //kValue为索引k对应的值.
        kValue = O[ k ];

        // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
        mappedValue = callback.call(T, kValue, k, O);

        // 返回值添加到新数组A中.
        A[ k ] = mappedValue;
      }
      // k自增1
      k++;
    }

    // 8. 返回新数组A
    return A;
  };      
}
```

　　了解了map()方法，现在我们回过头来看看文章开头提到的那个小例子。

　　通常使用parseInt时，只需要传递一个参数。但实际上，parseInt可以有两个参数，第二个参数是进制数，可以通过语句“alert(parseInt.length) === 2”来验证。

　　map()方法在调用callback函数时，会给它传递三个参数：当前正在遍历的元素、元素索引、原数组本身。第三个参数parseInt会忽视，但第二个参数不会，也就是说，parseInt把传过来的索引值当成进制数来使用，而parseInt的第二个参数的范围为2~36（不包含2但包含36），如果省略该参数或者其值为0，则数字将以10为基数来解析；如果小于2或者大于36，parseInt()将返回NaN，所以最终返回了\[1,NaN,NaN\]。

　　实际上，这个小例子可以分解成这样理解：

```js
parseInt("1",0);　　//基数为0，以十进制来解析，返回1
parseInt("2",1)　　//基数为1，小于2，返回NaN
parseInt("3",2)　　//基数为2，小于2，返回NaN
```

　　注意：在测试parseInt()方法第二个参数范围的过程中发现，当传入的值为1，基数为2时，也会返回1，这点需要注意一下。

　　我们再来看一下其他小例子：

　　1、将数组中的单词转换成复数形式。

```js
function fuzzyPlural(single){
  var result = single.replace(/o/g,"e");
  if(single === "kangaroo"){
        result += "se";
    }  
  return result;    
}

var words = ["foot","goose","moose","kangaroo"];
console.log(words.map(fuzzyPlural));

//返回["feet","geese","meese","kangareese"];
```

　　2、求数组中每个元素的平方根。

```js
var numbers = [1, 4, 9];
var roots = number.map(Math.sqrt); 
//返回[1, 2, 3]
```

　　3、在字符串上使用map方法，实现如何在一个String上使用map方法获取字符串中每个字符所对应的ASCII码组成的数组：

```js
var map = Array.prototype.map; 
var a = map.call("hello world",function(x){ return x.charCodeAt(0);}) 
//a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
```







[Array.prototype.map()详解](https://blog.csdn.net/victoryzn/article/details/77225946)