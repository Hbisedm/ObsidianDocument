---
title: TypeScript内一些好用的类型的笔记
tags: ["TypeScript内一些好用的类型"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 七月 28日 2022, 1:33:49 下午
---
#TypeScript #类型

# TypeScript内一些好用的类型的笔记

## Partial
> lib.es5.d.ts文件的

Partial<T> 可以快速把某个接口类型中定义的属性变成可选的(Optional)
```typescript
interface People {
  age: number;
  name: string;
}
const p1: Person = {
	age: 23,
	name: 'Sam'
}
type AnonymousPeople = Partial<People>;
const p2: AnonymousPeople = {
	age: 24
}
```

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206192002513.png)

