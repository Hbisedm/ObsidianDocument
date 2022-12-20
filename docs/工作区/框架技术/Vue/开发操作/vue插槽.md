---
title: vue插槽
创建时间: 星期五, 十二月 2日 2022, 3:20:41 下午
修改时间: 星期五, 十二月 2日 2022, 3:25:14 下午
---
#slot #vue #插槽

# vue插槽

## 类型

- 默认插槽
- 具名插槽

```vue

// child
// 具名
<slot name='xxx'></slot>
// 默认
<slot></slot>

// father 
<template>
	<div>
		<template #xxx>
			// content  具名插槽
			<div></div>.....
		</template>
		<div>
			// content.... 默认插槽
		</div>
	</div>
</template>

```

## 有一条规则需要记住：

- 父组件里的所有内容都是在父级作用域中编译的
- 子组件里的所有内容都是在子作用域中编译的


