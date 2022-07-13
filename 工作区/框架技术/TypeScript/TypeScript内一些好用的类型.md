---
title: TypeScript内一些好用的类型
date: 2022-06-19 20:00:30
tags: ["TypeScript内一些好用的类型"]
---
#tag

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

	