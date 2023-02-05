---
title: TS面试题的笔记
tags: ["TS面试题"]
创建时间: 星期三, 一月 4日 2023, 5:10:44 下午
修改时间: 星期三, 一月 4日 2023, 10:30:21 晚上
---

#笔试题 #TypeScript 

# TS面试题的笔记


## 一道题目

这道题有 3 个层次，我们一层层来看。

### 第一层

第一层的要求是这样的：

实现一个 zip 函数，对两个数组的元素按顺序两两合并，比如输入 `[1,2,3], [4,5,6]` 时，返回 `[[1,4], [2,5],[3,6]]`


```typescript
function zip(target, soure) {
	if(!target.length || !source.length) return []
	
		const [one, ...rest1] = target
		const [other, ...rest2] = source
		
		return [[one,rest], ...zip(rest1, rest2)]
	}
}
```

### 第二层

第一层还是比较简单的，然后我们来看第二层要求：

**给这个 zip 函数定义 ts 类型（两种写法）**

定义函数类型有2种

```typescript

function func(){}

const func = () => {}

```

```typescript
function zip(target: unknown[], soure: unknown[]): unknown[] {
	if(!target.length || !source.length) return []
	
		const [one, ...rest1] = target
		const [other, ...rest2] = source
		
		return [[one,rest], ...zip(rest1, rest2)]
	}
}

interface Zip {
	(target: unknwon[], source: unknown[]): unknown[]
}

const zip: Zip =(target: unknown[], soure: unknown[]) => {
	if(!target.length || !source.length) return []
	
		const [one, ...rest1] = target
		const [other, ...rest2] = source
		
		return [[one,rest], ...zip(rest1, rest2)]
	}
}
```

这里可能问 `any`与 `unknown` 区别

2个都可以接受任何类型

但是any也可以赋值给任何类型，而unknown不行

所以一般用unknwon来做接收不确定类型参数的用处

### 第三层

用类型编程实现精确的类型提示，比如参数传入 `[1,2,3], [4,5,6]`，那返回值的类型要提示出 `[[1,4], [2,5],[3,6]]`

这里要求返回值类型也是精确的，

```typescript
function zip<Target extends unknown[], Source extends unknown[]>(
	target: Target[],
	source: Source[]
): Zip<Target, Source> {
	if(!target.length || !source.length) return [] // 爆红
		const [one, ...rest1] = target
		const [other, ...rest2] = source
		return [[one, other], ...zip(rest1, rest2)] // 爆红
	}
}
```

这里返回值类型需要通过`Zip`类型计算

就需要实现`Zip`这个高级类型

```typescript
type Zip<Target extends unknown[], Source extends unknown[]> = 
	Target extends [infer TargetFirst, ...infer TargetRest]
		? Source extends [infer SourceFirst, ...infer SourceRest]
			? [[TargetFirst, SourceFirst],  ...Zip<TargetRest, SourceRest>]
			: []
		:[]
```

现在这个高级类型可以达到想要的效果

但是呢，如何运用起来

答案是 函数重载

```typescript
type Zip<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer Rest1
]
  ? Other extends [infer OtherFirst, ...infer Rest2]
    ? [[OneFirst, OtherFirst], ...Zip<Rest1, Rest2>]
    : []
  : [];

type Mutable<Obj> = {
  -readonly [Key in keyof Obj]: Obj[Key];
};

function zip(target: unknown[], source: unknown[]): unknown[];

function zip<
  Target extends readonly unknown[],
  Source extends readonly unknown[]
>(target: Target, source: Source): Zip<Mutable<Target>, Mutable<Source>>;

function zip(target: unknown[], source: unknown[]) {
  if (!target.length || !source.length) return [];

  const [one, ...rest1] = target;
  const [other, ...rest2] = source;

  return [[one, other], ...zip(rest1, rest2)];
}

// as const 能够让字面量推导出字面量类型，但会带有 readonly 修饰，可以自己写映射类型来去掉这个修饰。

const result = zip([1, 2, 3] as const, [4, 5, 6] as const);

const arr1 = [1, 2, 3];
const arr2 = [4, "5", 6];

const result2 = zip(arr1, arr2);
```

`[1,2,3]` 将他转成字面量 需要用到`as const`

带上`as const` 后 就是 readonly 了

需要去掉readonly 实现一个高级类型 Multable

## TS 3种类型来源

-   lib： 内置的类型声明，包含 dom 和 es 的，因为这俩都是有标准的。
-   @types/xx： 其他环境的 api 类型声明，比如 node，还有 npm 包的类型声明
-   开发者写的代码：通过 include + exclude 还有 files 指定

## TS 3种模块化手段

-   namespace：最早的实现模块的方式，编译为声明对象和设置对象的属性的 JS 代码，很容易理解
-   module：和 namespace 的 AST 没有任何区别，只不过一般用来声明 CommonJS 的模块，在 @types/node 下有很多
-   es module：es 标准的模块语法，ts 额外扩展了 import type









