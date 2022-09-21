---
title: JavaScript字符与ASCII码互转的笔记
tags: ["JavaScript字符与ASCII码互转"]
创建时间: 星期三, 九月 21日 2022, 11:09:08 晚上
修改时间: 星期三, 九月 21日 2022, 11:10:39 晚上
---
#字符与ASCII转换

# JavaScript字符与ASCII码互转的笔记

```js
// char 2 ASCII
var str = "A";
str.charCodeAt();  // 65

var str1 = 'a';
str1.charCodeAt();  // 97

// ASCII 2 char
var num = 97;
String.fromCharCode(num);  // 'a'

var num1 = 100;
String.fromCharCode(num1);  // 'd'
```
