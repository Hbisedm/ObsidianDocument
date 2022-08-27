---
title: TailwindCSS的笔记
tags: ["README"]
创建时间: 星期一, 八月 22日 2022, 3:34:12 下午
修改时间: 星期六, 八月 27日 2022, 9:32:16 晚上
---
#TailwindCSS

# TailwindCSS的笔记

## 安装

跟着[官网](https://tailwindcss.com/)安装

## 原生HTML使用

JIT —— just in time 只使用用到的class

` postcss 源文件.css -o 生产文件.css`

[生产优化](https://tailwindcss.com/docs/optimizing-for-production)


## 使用

[安装教程](https://tailwindcss.com/docs/installation)

选择使用postCss安装方式

```shell
npx tailwindcss init -p
```

生成`tailwindcss.conifg.js` `postcss.config.js`

`tailwindcss.config.js` 配置参考官网

需要声明个css文件

```css
/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 修改默认样式 */
@layer base {
}

/* 用于添加组件样式 */
@layer components {
}

/* 用于自定义样式 */
@layer utilities {
  .custom-h1 {
    @apply text-lg text-red-300;
  }
}
```

然后全局引用这个文件后就可以使用tailwindcss了

### Vue

vue组件中

可以在组件中自定义`组件样式`, 也可以定义在全局中, 也就是上面的css文件的`@layer components {...}` 中

```vue

<template>
	<div>
		<h1 class="test">text ..</h1>
	</div>
</template>

<style scoped>
.test{
	@apply px-3 bg-green-300 等等tailwindcss的类名
}
</style>

```

