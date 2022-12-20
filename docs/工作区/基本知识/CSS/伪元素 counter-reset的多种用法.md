---
title: 伪元素counter-reset的多种用法的笔记
tags: ["伪元素", "CSS"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 七月 28日 2022, 1:14:23 下午
---
#css

# 伪元素counter-reset的多种用法的笔记
> CSS content属性中有一个counter属性（计数器），而使用counter的过程中我们要使用到counter-reset来创建计数器或者重置计数器。

## 介绍
counter-reset属性用于**创建或重置一个或多个计数器**，counter-reset属性通常是和counter-increment属性，content属性一起使用。

counter-reset的属性值：

| 值        | 说明                                                                        |
| --------- | --------------------------------------------------------------------------- |
| none      | 默认。不能对选择器的计数器进行重置                                          |
| id number | id定义充值起的选择器、id或class。number可以设置此选择器出现次数的计数器的值 |
| ingerit   | 规定应该从父元素继承counter-reset属性的值                                                                            |


## 使用
计数器是通过`counter-reset`和`counter-increment`操作，然后通过`counter()`或`counters()`函数来显示在页面上。

- 在使用`counter-reset`前，必须要通过`counter-reset`重置一个初始值，它默认是0，你也可以指定初始值。
```css
counter-reset: record; /* 重置计数器为 0 */
counter-reset: record 2; /* 重置计数器为 2 */
```

- 它的值还可以是多个。
```html
<body>
	<h2>Sam</h2>
	<h2>Hbisedm</h2>
	<h2>no Zoe</h2>
</body>
```
```css
body{
 	counter-reset: first 2 second 4;
}
h3:before {
  	content: counter(first) "." counter(secound) ": ";
}
h3 {
  	counter-increment: first second;
}
```
效果图：
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061042569.png)

- 还可以通过其它的css代码来修改计数器的样式：
```css
h2:before {
	content: counter(first) "." counter(secound) ": ";
	color: red;
	font-size: 46px;
}
```
效果图：
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061045231.png)
