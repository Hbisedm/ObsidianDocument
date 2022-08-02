---
title: template的使用的笔记
tags: ["template的使用"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 七月 28日 2022, 1:33:05 下午
---
#template #Vue

# template的使用的笔记
```html
<ul>
	<div v-for="(item, index) in list">
		<li>{{item}}</li>
	</div>
</ul>
```
这样会把`html`标签渲染出来，这不是想要的结果
使用`template`标签
```html
<ul>
	<template v-for="(item, index) in list">
		<li>{{item}}</li>
	</template>
</ul>
```
这样渲染出来的效果就是
```html
<ul>
	<li>
		content....
	</li>
	<li>
		content....
	</li>
	.......
</ul>
```
达到html标签层级少了一层`div`标签，这样也符合html的规范。