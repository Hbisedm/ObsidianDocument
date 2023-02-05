---
title: README
date: "2022-06-01 12:42:26"
tags: ["TypeScript"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期三, 一月 4日 2023, 3:21:07 下午
---

# README

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206091031809.png)

### 类型体操

[来自光哥的类型体操通关秘籍](https://juejin.cn/book/7047524421182947366/section/7048282176701333508)

类型体操也就是类型编程，相对于传统的编程而言，编程类型是为了让编译器更有目的性的安全检查。

对类型参数的编程是 TypeScript 类型系统最强大的部分，可以实现各种复杂的类型计算逻辑，是它的优点。但同时也被认为是它的缺点，因为除了业务逻辑外还要写很多类型逻辑。

## TypeScript新增的类型

除了`JavaScript` 类型 : 

也就是 number、boolean、string、object、bigint、symbol、undefined、null 这些类型，还有就是它们的包装类型 Number、Boolean、String、Object、Symbol。

复合类型方面，JS 有 class、Array，这些 TypeScript 类型系统也都支持，但是又多加了三种类型：元组（Tuple）、接口（Interface）、枚举（Enum）。

### 元祖

元素个数和类型固定的数组类型

### 接口

`接口（Interface）`可以描述函数、对象、构造器的结构：

对象：

```typescript
interface IPerson {
    name: string;
    age: number;
}

class Person implements IPerson {
    name: string;
    age: number;
}

const obj: IPerson = {
    name: 'guang',
    age: 18
}

```

函数：

```typescript
interface SayHello {
    (name: string): string;
}

const func: SayHello = (name: string) => {
    return 'hello,' + name
}

```

构造器：

```typescript
interface PersonConstructor {
    new (name: string, age: number): IPerson;
}

function createPerson(ctor: PersonConstructor):IPerson {
    return new ctor('guang', 18);
}

```

### 枚举

`枚举（Enum）`是一系列值的复合


当然除了处理这三种之外，Typescript还支持`字面量类型` 

`{ a: 1, b: 2 }` `'111'` `123`

但是字符串字面量分2种，一种普通的和一种可以使用模板字符串的

```typescript
function func(str: `abc${string}`) {
	//do something
}
func("abc123") //必须abc前缀
```

还有四种特殊的类型：void、never、any、unknown：

-   **never** 代表不可达，比如函数抛异常的时候，返回值就是 never。
-   **void** 代表空，可以是 undefined 或 never。
-   **any** 是任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型（除了 never）。
-   **unknown** 是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型。

## 类型运算

### 条件: Extends ? :

条件判断 `extends ? :` 这也就是Typescript里面的`if else`

```typescript

type res = 1 extends 2 ? true : false
// 上面的代码没啥意义，静态的值都是可以自己的算了
type isTwo<T> = T extends 2 ? true : false
type res = isTwo<1> // type res = false
type res2 = isTwo<2> // type res = true
```

### 推导: Infer

如何提取类型的一部分？ `infer`

比如提取数组第一个元素

```typescript

type First<Tuple extends unknow[]> = Tuple extends [infer T, ...infer R] ? T : never

type res = First<[1, 2, 3]> // type res = 1

```

注意，**第一个 extends** 不是条件，条件类型是 `extends ? :`，这里的 extends 是约束的意思，也就是约束类型参数只能是数组类型。

### 联合: |

联合类型（Union）类似 js 里的或运算符 | ，但是作用于类型，代表类型可以是几个类型之一

```typescript
type Union = 1 | 2 | 3
```

### 交叉: &

交叉类型（Intersection）类似 js 中的与运算符 &，但是作用于类型，代表对类型做合并

```typescript
type ObjType = {a: number } & {c: boolean};
```

### 映射类型

**映射类型就相当于把一个集合映射到另一个集合，这是它名字的由来**。

```typescript
type MapType<T> = { [Key in keyof T]?: T[Key] }
```

`keyof T` 是查询索引类型中所有的索引，叫做`索引查询`
`T[key]`是取索引类型某个索引的值，叫做`索引访问`
`in`是用于遍历联合类型的运算符

比如我们把一个索引类型的值变成3个元素的数组

```typescript
type MapType<T> = {
	[Key in keyof T]: [T[Key], T[Key], T[Key] ]
}

type res = MapType<{a: 1, b: 2}> // type res = {a: [1, 1, 1], b: [2, 2, 2]}
```

除了值可以变化，索引也可以做变化，用 as 运算符，叫做`重映射`。

```typescript
type MapType<T> = {
  [ Key in keyof T 
	  as `${Key & string}${Key & string}${Key & string}` 
  ]: [T[Key], T[Key], T[Key]]
}

type res = MapType<{a: 1, b: 2}> // type res = {aaa: [1, 1, 1], bbb: [2, 2, 2]}
```

> 这里的 & string 可能大家会迷惑，解释一下：
> 
>因为索引类型（对象、class 等）可以用 string、number 和 symbol 作为 key，这里 keyof T 取出的索引就是 string | number | symbol 的联合类型，和 string 取交叉部分就只剩下 string 了。就像前面所说，交叉类型会把同一类型做合并，不同类型舍弃。

### 小结

TypeScript 支持对类型做运算，这是它的类型系统的强大之处，也是复杂之处。

TypeScript 支持条件、推导、联合、交叉等运算逻辑，还有对联合类型做映射。

这些逻辑是针对类型参数，也就是泛型（类型参数）来说的，**传入类型参数，经过一系列类型运算逻辑后，返回新的类型的类型就叫做高级类型**，如果是静态的值，直接算出结果即可，没必要写类型逻辑。

这些语法看起来没有多复杂，但是他们却可以实现很多复杂逻辑，就像 JS 的语法也不复杂，却可以实现很多复杂逻辑一样。

## 模式匹配做提取

```typescript
type p = Promise<'guang'>;
```

想提取value的类型

```typescript 
type GetValueType<P> = P extends Promise<infer Value> ? Value : never
```

通过 extends 对传入的类型参数 P 做模式匹配，其中值的类型是需要提取的，通过 infer 声明一个局部变量 Value 来保存，如果匹配，就返回匹配到的 Value，否则就返回 never 代表没匹配到。

这就是 Typescript 类型的模式匹配：

**Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，结果保存到通过 infer 声明的局部类型变量里，如果匹配就能从该局部变量里拿到提取出的类型。**

来看下在数组、字符串、函数、构造器等类型里的应用

### 数组类型应用

数组类型想要提取第一个元素作为类型

```typescript
type arr = [1, 2, 3]

type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never

type GetFirstResult = GetFirst<[1, 2, 3]> // type GetFirstResult = 1
```

类型`Arr` 使用extend约束为只能是数组类型，数组元素是`unknown` 表示任何值都可以

> **any 和 unknown 的区别**： any 和 unknown 都代表任意类型，但是 unknown 只能接收任意类型的值，而 any 除了可以接收任意类型的值，**也可以赋值给任意类型**（除了 never）。类型体操中经常用 unknown 接受和匹配任何类型，而很少把任何类型赋值给某个类型变量。

最后一个元素作为类型

```typescript
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never
```

上面取了首尾的元素作为类型，也可以使用剩余参数作为类型

```typescript
type PopArr<Arr extends unknown[]> = Arr extends [...infer Rest, unknown]? Rest: never

type PopResult = PopArr<[1,2,3]> // type PopResult = [1, 2]
type PopResult2 = PopArr<[]> // type PopResult2 = []
```

同样的可以得shiftArr

```typescript
type ShiftArr<Arr extends unknown[]> = Arr extends [unknown, ...infer Reset]? Rest: never

type ShiftResult = ShiftArr<[1,2,3]> // type ShiftResult = [2, 3]
```

### 字符串类型

字符串类型也同样可以做模式匹配，匹配一个模式字符串，把需要提取的部分放到 infer 声明的局部变量里。

StartsWith

判断字符串是否以某个前缀开头，也是通过模式匹配

```typescript
type StartsWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}`? true: false
```

需要声明字符串 Str、匹配的前缀 Prefix 两个类型参数，它们都是 string。

用 Str 去匹配一个模式类型，模式类型的前缀是 Prefix，后面是任意的 string，如果匹配返回 true，否则返回 false。

```typescript
type StartsWithResult = StartsWith<'Sam and Amy', 'Sam'> // true

type StartsWithResult = StartsWith<'Mike and Amy', 'Sam'> // false

```

Replace

字符串可以匹配一个模式类型，提取想要的部分，自然也可以用这些再构成一个新的类型。

```typescript
type ReplaceStr<
     Str extends string,
     From extends string,
     To extends string
> = Str extends `${infer S}${From}${infer E}`? 	`${infer S}${To}${infer E}` : Str
```

声明要替换的字符串 Str、待替换的字符串 From、替换成的字符串 3 个类型参数，通过 extends 约束为都是 string 类型。

用 Str 去匹配模式串，模式串由 From 和之前之后的字符串构成，把之前之后的字符串放到通过 infer 声明的局部变量 Prefix、Suffix 里。

用 Prefix、Suffix 加上替换到的字符串 To 构造成新的字符串类型返回。

Tirm

能够匹配和替换字符串，那也就能实现去掉空白字符的 Trim：

```typescript
type TrimStrRight<Str extends string> = 
	Str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimStrRight<Rest> : Str

type TrimRightResult = TrimStrRight<'Sam   '> // 'sam'
```

如果 Str 匹配字符串 + 空白字符 (空格、换行、制表符)，那就把字符串放到 infer 声明的局部变量 Rest 里。

把 Rest 作为类型参数**递归** TrimRight，直到不匹配，这时的类型参数 Str 就是处理结果。

同理可得 TirmLeft

```typescript
type TrimStrLeft<Str extends string> = 
	Str extends `${' ' | '\n' | '\t'}${infer Rest}` 
		? TrimStrLeft<Rest> : Str;
```

### 函数应用

函数同样也可以做类型匹配，比如提取参数、返回值的类型。

GetParameters

函数可以通过模式匹配来提取参数的类型

```typescript
	type GetParameter<Func extends Function> 
		Func extends (...args: infer Args) => unknown ? Args : never
```

使用`extends`限制`Func`为函数类型

Func 和模式类型做匹配，参数类型放到用 infer 声明的局部变量 Args 里，返回值可以是任何类型，用 unknown。

返回提取到的参数类型`Args`

```typescript
type ParametersResult = GetParameter<(name: string, age: number) => string>
// [name: string, age: number]
```

GetReturnType

能提取参数，同样也可以提取返回值类型

```typescript
type GetReturnType<Func extends Function> = 
	Func extends (...args: any[]) => infer ReturnType ? ReturnType: never;
```

Func 和模式类型做匹配，提取返回值到通过 infer 声明的局部变量 ReturnType 里返回。

参数类型可以是任意类型，也就是 `any[]`

GetThisParameterType

```typescript

class Sam {
	name: string
	constructor() {
		this.name = 'Sam'
	}
	hello(this: Sam) { // 这里指定了this 必须是Sam类型 
		return 'hello, I\'m ' + this.name
	}
}

type GetThisParameterType<T> = T extends (this: infer ThisType, ...args: any[]) => any ? ThisType: unknown

GetThisParameterType<typeof sam.hello> // Sam

```

类型参数 T 是待处理的类型。

用 T 匹配一个模式类型，提取 this 的类型到 infer 声明的局部变量 ThisType 中，其余的参数是任意类型，也就是 any，返回值也是任意类型。

返回提取到的 ThisType。

这样就能提取出 this 的类型

### 构造器

构造器和函数的区别是，构造器是用于创建对象的，所以可以被 new。

同样，我们也可以通过模式匹配提取构造器的参数和返回值的类型：

GetInstanceType

构造器类型可以使用`interface`声明

```typescript
interface Person {
	name: string
}

interface PersonConstructor {
	new(name: string): Person
}
```

这里的 PersonConstructor 返回的是 Person 类型的实例对象，这个也可以通过模式匹配取出来。

```typescript
type GetInstanceType<ConstructorType extends new (...args: any) => any> = 
	ConstructorType extends new(...args: any) => infer InstanceType
	? InstanceType
	: any
```

类型参数 ConstructorType 是待处理的类型，通过 extends 约束为构造器类型。

用 ConstructorType 匹配一个模式类型，提取返回的实例类型到 infer 声明的局部变量 InstanceType 里，返回 InstanceType。

```typescript
type GetInstanceTypeRes = GetInstanceType<PersonConstructor> // Person
```

GetConstructorParameters

同样的取出构造器参数类型

```typescript
type GetConstructorParameters<ConstructorType extends 
	new(...args: any[]) => any> = ConstructorType 
	extends new(...args: infer ParametersType) => any 
	? ParametersType
	: never
```

### 索引类型

索引类型也同样可以用模式匹配提取某个索引的值的类型

GetRefProps

```typescript
GetRefProps<Props> = 
	'ref' extends keyof Props
	    ? Props extends {ref?: Value | undefined}
	        ? Value
	        : never
	    : never;
```

### 小结

就像字符串可以匹配一个模式串提取子组一样，TypeScript 类型也可以匹配一个模式类型提取某个部分的类型。

**TypeScript 类型的模式匹配是通过类型 extends 一个模式类型，把需要提取的部分放到通过 infer 声明的局部变量里，后面可以从这个局部变量拿到类型做各种后续处理。**

模式匹配的套路在数组、字符串、函数、构造器、索引类型、Promise 等类型中都有大量的应用，掌握好这个套路能提升很大一截类型体操水平。

## 重新构造做变换

**类型编程主要的目的就是对类型做各种转换**，那么如何对类型做修改呢？

TypeScript 类型系统支持 3 种可以声明任意类型的变量： type、infer、类型参数。

type 叫做类型别名，其实就是声明一个变量存储某个类型：

```typescript
type tt = Promise<boolean>
```

infer 用于类型的提取，然后存到一个变量里，相当于局部变量：

```typescript
type GetValueType<P> = P  extends Promise<inter Value> ? Value : never
```

类型参数用于接受具体的类型，在类型运算中也相当于局部变量：

```typescript
type isTwo<T> = T extends 2? true : false
```

但是，严格来说这三种也都不叫变量，因为它们不能被重新赋值。

TypeScript 设计可以做类型编程的类型系统的目的就是为了产生各种复杂的类型，那不能修改怎么产生新类型呢？

答案是重新构造。

这就涉及到了第二个类型体操套路：重新构造做变换。


数组、字符串、函数等类型的重新构造比较简单。

索引类型，也就是多个元素的聚合类型的重新构造复杂一些，涉及到了映射类型的语法。

我们先从简单的开始：

### 数组类型的重新构造

Push

```typescript
type tuple = [1, 2, 3]
```

给这个元祖添加一些类型，如何处理

TypeScript类型变量不支持修改，可以构造一个新的元祖类型

```typescript
type Push<Arr extends unknown[], P> = [...Arr, P]
```

类型参数 Arr 是要修改的数组/元组类型，元素的类型任意，也就是 unknown。

类型参数 P 是添加的元素的类型。

返回的是用 Arr 已有的元素加上 P 构造的新的元组类型。

```typescript
type PushResult = type Push<[1,2,3], 4> // [1,2,3,4]
```

这就是数组/元组的重新构造。

Unshift

可以在后面加，当然也可以在前面

```typescript
type Unshift<Arr extends unknown[], P> = [p, ...Arr]
```

Zip

```typescript
type tuple1 = [1, 2]
type tuple2 = ['Sam', 'Amy']
```

将上面2个元祖想要合并转成

```typescript
type tuple = [[1, 'Sam'], [2, 'Amy']]
```

```typescript
type Zip<One extends [unknonw, unknonw], Other extends [unknown, unkonwn]> =
	One extends [infer OneFirst, inter OneSecond]
	? Other extends [infer OtherFirst, infer OtherSecond]
		? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]]: []
		: []
```

两个类型参数 One、Other 是两个元组，类型是 [unknown, unknown]，代表 2 个任意类型的元素构成的元组。

通过 infer 分别提取 One 和 Other 的元素到 infer 声明的局部变量 OneFirst、OneSecond、OtherFirst、OtherSecond 里。

但是这样只能合并两个元素的元组，如果是任意个呢？

那就得用递归了：

```typescript
type Zip<One extends unknonw[], Other extends unkonwn[]> =
	One extends [infer OneFirst, ...inter OneRest]
	? Other extends [infer OtherFirst, ...infer OtherRest]
		? [[OneFirst, OtherFirst], Zip<OneRest, OtherRest>]: []
		: []
```

类型参数 One、Other 声明为 unknown[]，也就是元素个数任意，类型任意的数组。

每次提取 One 和 Other 的第一个元素 OneFirst、OtherFirst，剩余的放到 OneRest、OtherRest 里。

用 OneFirst、OtherFirst 构造成新的元组的一个元素，剩余元素继续递归处理 OneRest、OtherRest。

### 字符串类型的重新构造

CapitalizeStr

想要一个字符串字面量的首字符转大写 `'sam'` => `'Sam'` 

```typescript
type CapitalizeStr<Str extends string> = 
	Str extends `${infer First}${Rest}` 
	? `${Uppercase<First>}${Rest}`: Str
```

我们声明了类型参数 Str 是要处理的字符串类型，通过 extends 约束为 string。

通过 infer 提取出首个字符到局部变量 First，提取后面的字符到局部变量 Rest。

然后使用 TypeScript 提供的内置高级类型 Uppercase 把首字母转为大写，加上 Rest，构造成新的字符串类型返回。

这就是字符串类型的重新构造：**从已有的字符串类型中提取出一些部分字符串，经过一系列变换，构造成新的字符串类型。**

CamelCase

实现这样的效果 `'sam_sam_sam'` => `'samSamSam'`

```typescript
type CamelCase<Str extends string> = 
	Str extends `${infer Left}_${infer Right}${Rest}` 
	? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
	: Str
```

类型参数 Str 是待处理的字符串类型，约束为 string。

提取 _ 之前和之后的两个字符到 infer 声明的局部变量 Left 和 Right，剩下的字符放到 Rest 里。

然后把右边的字符 Right 大写，和 Left 构造成新的字符串，剩余的字符 Rest 要继续递归的处理。


DropSubStr

可以修改自然也可以删除，删除字符串中某个子串

```typescript
type DropSubStr<Str extends string, SubStr extends string> = 
	Str extends `${infer Prefix}${Substr}${infer Suffix}`
	? DropSubStr<`${Perfix}${Suffix}`, SubStr> : Str
```

类型参数 Str 是待处理的字符串， SubStr 是要删除的字符串，都通过 extends 约束为 string 类型。

通过模式匹配提取 SubStr 之前和之后的字符串到 infer 声明的局部变量 Prefix、Suffix 中。

如果不匹配就直接返回 Str。

如果匹配，那就用 Prefix、Suffix 构造成新的字符串，然后继续递归删除 SubStr。直到不再匹配，也就是没有 SubStr 了。

### 函数类型的重新构造

AppendArgument

之前我们分别实现了参数和返回值的提取，那么重新构造就是用这些提取出的类型做下修改，构造一个新的类型即可。

比如在已有的函数类型上添加一个参数：

```typescript
type AppendArgument<Func extends Function, Arg> = 
	Func extends (...args: infer Args) => inter ReturnType
	? (...args: [...Args, Arg]) => ReturnType : never
```

类型参数 Func 是待处理的函数类型，通过 extends 约束为 Function，Arg 是要添加的参数类型。

通过模式匹配提取参数到 infer 声明的局部变量 Args 中，提取返回值到局部变量 ReturnType 中。

用 Args 数组添加 Arg 构造成新的参数类型，结合 ReturnType 构造成新的函数类型返回。

### 索引类型的重新构造

Mapping

```typescript
type Mapping<Obj extends object> = {
	[Key in keyof Obj]: [Obj[Key], Obj[key]]
}

type res = Mapping<{a: 1, b: 2}> // {a: [1, 1], b: [2, 2]}
```

UppercaseKey

除了可以对 Value 做修改，也可以对 Key 做修改，使用 as，这叫做`重映射`

```typescript
type UppercaseKey<Obj extends object> = {
	[Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}
```

类型参数 Obj 是待处理的索引类型，通过 extends 约束为 object。

新的索引类型的索引为 Obj 中的索引，也就是 Key in keyof Obj，但要做一些变换，也就是 as 之后的。

通过 Uppercase 把索引 Key 转为大写，因为索引可能为 string、number、symbol 类型，而这里只能接受 string 类型，所以要 & string，也就是取索引中 string 的部分。

value 保持不变，也就是之前的索引 Key 对应的值的类型 `Obj[Key]`。

这样构造出的新的索引类型，就把原来索引类型的索引转为了大写

Record

这是Typescript提供一个高级类型，用来创建索引类型

```typescript
type Record<K extends string | number | symbol, T> = { [P in K]: T; }
```

指定K和T就可以创建对应的索引类型

上面的UppercaseKey 更加语义化的定义 是 使用`Record`

```typescript
type UppercaseKey<Obj extends Record<string, any>> = {
	[Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}
```

ToReadonly

索引类型的索引可以添加 `readonly` 修饰符，代表只读

```typescript
type ToReadonly<T> = {
	readonly [Key in keyof T]: T[Key]
}
```

ToPartial

当然，也可以添加可选修饰符

```typescript
type ToPartial<T> = {
	[Key in keyof T]?: T[Key]
}
```

ToMutable

当然，可以去掉`readonly`

```typescript
type ToMutable<T> = {
	-readonly [Key in keyof T]: T[Key]
}
```

ToRequired

去掉可选修饰符

```typescript
type ToRequired<T> = {
	[Key in keyof T]-?: T[Key]
}
```

FilterByValueType

构造新的索引类型时，可根据值进行过滤

```typescript
type FilterByValueType = {
	Obj extends Record<string, any>,
	ValueType
} = {
	[Key in keyof Obj
		as Obj[Key] extends ValueType? Key: never]
		: Obj[Key]
}
```

类型参数 Obj 为要处理的索引类型，通过 extends 约束为索引为 string，值为任意类型的索引类型 Record<string, any>。

类型参数 ValueType 为要过滤出的值的类型。

构造新的索引类型，索引为 Obj 的索引，也就是 Key in keyof Obj，但要做一些变换，也就是 as 之后的部分。

如果原来索引的值 `Obj[Key]` 是 ValueType 类型，索引依然为之前的索引 Key，否则索引设置为 never，never 的索引会在生成新的索引类型时被去掉。

值保持不变，依然为原来索引的值，也就是 `Obj[Key]`。

```typescript
interface Person {
	name: string;
	age: number;
	friends: string[]
}
type FilterResult = type FilterByValueType<Person, string | number>
// {name: string, age: number}
```

### 小结

TypeScript 支持 type、infer、类型参数来保存任意类型，相当于变量的作用。

但其实也不能叫变量，因为它们是不可变的。**想要变化就需要重新构造新的类型，并且可以在构造新类型的过程中对原类型做一些过滤和变换。**

数组、字符串、函数、索引类型等都可以用这种方式对原类型做变换产生新的类型。其中索引类型有专门的语法叫做映射类型，对索引做修改的 as 叫做重映射。


## 递归复用做循环

会做类型的提取和构造之后，我们已经能写出很多类型编程逻辑了，但是有时候提取或构造的数组元素个数不确定、字符串长度不确定、对象层数不确定。这时候怎么办呢？

**其实前面的案例我们已经涉及到了一些，就是递归。**


### Promise 递归复用

DeepPromiseValueType

```typescript
type ttt = Promise<Promise<Promise<Record<string, any>>>>;
```

这里3层Promise，value类型是索引类型。

数量不确定，一涉及到这个就要想到使用递归来处理。每次只处理一层的提取，然后剩下的到下一个递归处理，直到递归终止。

```typescript
type DeepPromiseValueType<P extends Promise<unknown>> = {
	P extends Promise<inter ValueType>
		? ValueType extends Promise<unknown>
			? DeepPromiseValueType<ValueType>
			: ValueType
		: never
}
```

类型参数 P 是待处理的 Promise，通过 extends 约束为 Promise 类型，value 类型不确定，设为 unknown。

每次只处理一个类型的提取，也就是通过模式匹配提取出 value 的类型到 infer 声明的局部变量 ValueType 中。

然后判断如果 ValueType 依然是 Promise类型，就递归处理。

结束条件就是 ValueType 不为 Promise 类型，那就处理完了所有的层数，返回这时的 ValueType。

这样，我们就提取到了最里层的 Promise 的 value 类型，也就是索引类型

```typescript
type DeepPromiseResult = 
	DeepPromiseValueType<Promise<Promise<Promise<Record<string, any>>>>> 
// { [x: string]: any }
```

进一步简化，不约束类型参数必须是Promise，少一层判断

```typescript
type DeepPromiseValueType<T> = {
	T extends Promise<inter ValueType>
	? DeepPromiseValueType<ValueType>
	: T
}
```

### 数组类型的递归

ReverseArr

```typescript
	type arr = [1,2,3,4,5]

	type arr = [5,4,3,2,1]

	type ReverseArr<Arr extends unknown[]> = 
	Arr extends [infer One, infer Two, infer Three, infer Four, infer Five]
	 ? [Five, Four, Three, Two, One] : never;
```

学完前面很容易就写出这个，但是没有通用性，需要使用递归

```typescript
	type ReverseArr<Arr extends unknown[]> = 
		Arr extends [infer First, ...infer Rest]
		? [ReverseArr<Rest>, First]
		: Arr
```

类型参数 Arr 为待处理的数组类型，元素类型不确定，也就是 unknown。

每次只处理一个元素的提取，放到 infer 声明的局部变量 First 里，剩下的放到 Rest 里。

用 First 作为最后一个元素构造新数组，其余元素递归的取。

结束条件就是取完所有的元素，也就是不再满足模式匹配的条件，这时候就返回 Arr。

Include

比如查找` [1, 2, 3, 4, 5] `中是否存在 4，是就返回 true，否则返回 false。

从长度不固定的数组中查找某个元素，数量不确定，这时候就应该想到递归。

```typescript
	type Include<Arr extends unknown[], FindItem> =
	  Arr extends [infer First, ...infer Rest]
	    ? IsEqual<First, FindItem> extends true
		    ? true
		    : Include<Rest, FindItem>
		: false
	type IsEqual<A, B> = 
		(A extends B? true: false) & (B extends A? true: false)
```

RemoveItem

可以查找自然就可以删除，只需要改下返回结果，构造一个新的数组返回。

```typescript
	type RemoveItem<
		Arr extends unknown[],
		Item,
		Result extends unknown[] = []
	> = Arr extends [infer First, ...infer Rest]
	? IsEqual<First, Item> extends true
		? RemoveItem<Rest, Item, Result>
		: RemoveItem<Rest, Item, [...Result, First]>
	: Result

	type IsEqual<A, B> = 
		(A extends B? true: false) & (B extends A? true: false)

```

类型参数 Arr 是待处理的数组，元素类型任意，也就是 unknown[]。类型参数 Item 为待查找的元素类型。类型参数 Result 是构造出的新数组，默认值是 []。

通过模式匹配提取数组中的一个元素的类型，如果是 Item 类型的话就删除，也就是不放入构造的新数组，直接返回之前的 Result。

否则放入构造的新数组，也就是再构造一个新的数组 [...Result, First]。

直到模式匹配不再满足，也就是处理完了所有的元素，返回这时候的 Result。

这样我们就完成了不确定元素个数的数组的某个元素的删除：

```typescript
type RemoveItemResult = type RemoveItem<[1,2,2,3], 2> // [1, 3]
```

BuildArray

我们学过数组类型的构造，如果构造的数组类型元素个数不确定，也需要递归。

比如传入 5 和元素类型，构造一个长度为 5 的该元素类型构成的数组。

```typescript
	type BuildArray<
		Length extends number, 
		Ele = unknown, 
		Arr extends unknown[] = []
	> = Arr['length'] extends length?
	    Arr:
	    BuildArray<Length, Ele, [...Arr, Ele]>
	// arr['length'] === Length ? arr: 递归
```

类型参数 Length 为数组长度，约束为 number。类型参数 Ele 为元素类型，默认值为 unknown。类型参数 Arr 为构造出的数组，默认值是 []。

每次判断下 Arr 的长度是否到了 Length，是的话就返回 Arr，否则在 Arr 上加一个元素，然后递归构造。

### 字符串的递归

ReplaceAll

```typescript
	type ReplaceAll<
		Str extends string,
		Form extends string,
		To extends string
	> = Str extends `${infer Prefix}${infer Form}${infer Subffix}`
	? ReplaceAll<`${Prefix}${To}${Subffix}`, Form, To>
	: Str
```

类型参数 Str 是待处理的字符串类型，From 是待替换的字符，To 是替换到的字符。

通过模式匹配提取 From 左右的字符串到 infer 声明的局部变量 Left 和 Right 里。

用 Left 和 To 构造新的字符串，剩余的 Right 部分继续递归的替换。

结束条件是不再满足模式匹配，也就是没有要替换的元素，这时就直接返回字符串 Str。


StringToUnion

`'Sam'` => `'S' | 'a' | 'm'`

```typescript
	type StringToUnion<Str extends string>
	= Str extends <infer First, ...infer Rest>
	? First | StringToUnion<Rest>
	: never
```

类型参数 Str 为待处理的字符串类型，通过 extends 约束为 string。

通过模式匹配提取第一个字符到 infer 声明的局部变量 First，其余的字符放到局部变量 Rest。

用 First 构造联合类型，剩余的元素递归的取。

这样就完成了不确定长度的字符串的提取和联合类型的构造：

ReverseStr

```typescript
type ReverseStr<
	Str extends string,
	Result extents string = ''
	> = Str extends <infer First, ...infer Rest>
	? ReverseStr<Rest, `${First}${Result}`>
	: Result
```

类型参数 Str 为待处理的字符串。类型参数 Result 为构造出的字符，默认值是空串。

通过模式匹配提取第一个字符到 infer 声明的局部变量 First，其余字符放到 Rest。

用 First 和之前的 Result 构造成新的字符串，把 First 放到前面，因为递归是从左到右处理，那么不断往前插就是把右边的放到了左边，完成了反转的效果。

直到模式匹配不满足，就处理完了所有的字符。

### 对象类型的递归

DeepReadonly

对象类型的递归，也可以叫做索引类型的递归。

我们之前实现了索引类型的映射，给索引加上了 readonly 的修饰：

```typescript
type ToReadonly<T> = {
	readonly [Key in keyof T]: T[Key]
}
```

如果这个索引类型层数不确定呢？

比如这样：

```typescript
type obj = { a: { b: { c: { f: () => 'dong', d: { e: { guang: string } } } } } }
```

数量（层数）不确定，类型体操中应该自然的想到递归。

```typescript
type DeepReadonly<Obj extends Record<string, any>> = {
	readonly [Key in keyof Obj]: 
		Obj[Key] extends object //判断是不是Object
			? Obj[Key] extends Function // 判断是不是function
				? Obj[Key]
				: DeepReadonly<Obj[Key]>
			: Obj[Key]
}
```

类型参数 Obj 是待处理的索引类型，约束为 Record<string, any>，也就是索引为 string，值为任意类型的索引类型。

索引映射自之前的索引，也就是 Key in keyof Obj，只不过加上了 readonly 的修饰。

值要做下判断，如果是 object 类型并且还是 Function，那么就直接取之前的值`Obj[Key]`。

如果是 object 类型但不是 Function，那就是说也是一个索引类型，就递归处理 `DeepReadonly<Obj[Key]>`。

否则，值不是 object 就直接返回之前的值 `Obj[Key]`。

![image.png](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202212272219337.png)

为啥这里没有计算呀？

因为 ts 的类型只有被用到的时候才会做计算。

所以可以在前面加上一段 Obj extends never ? never 或者 Obj extends any 等，从而触发计算：

```typescript
type DeepReadonly<Obj extends Record<string, any>> =

	Obj extends any
	
		? {
		
		readonly [Key in keyof Obj]:
		
			Obj[Key] extends object
			
				? Obj[Key] extends Function
				
					? Obj[Key]
					
					: DeepReadonly<Obj[Key]>
				
				: Obj[Key]
		
		}
	
	: never;
```

## 数组长度做计数

TypeScript 类型系统没有加减乘除运算符，怎么做数值运算呢？

不知道大家有没有注意到数组类型取 length 就是数值。

```typescript
type num1 = [unknown]['length'] // 1
type num2 = [unknown, unknown]['length'] // 2
```

**TypeScript 类型系统中没有加减乘除运算符，但是可以通过构造不同的数组然后取 length 的方式来完成数值计算，把数值的加减乘除转化为对数组的提取和构造。**

(严格来说构造的是元组，大家知道数组和元组的区别就行)

这点可以说是类型体操中最麻烦的一个点，需要思维做一些转换，绕过这个弯来。

### Add

构造两个数组，然后合并成一个，取 length。

比如 3 + 2，就是构造一个长度为 3 的数组类型，再构造一个长度为 2 的数组类型，然后合并成一个数组，取 length。

构造多长的数组是不确定的。需要递归构造。

```typescript
	type BuildArray<
		Length extends number,
		Ele = unknown,
		Arr extends unknown[] = []
	> = Arr['length'] extends Length
	    ? Arr
	    : BuildArray<Length, Ele, [...Arr, Ele]>;

```

类型参数 Length 是要构造的数组的长度。类型参数 Ele 是数组元素，默认为 unknown。类型参数 Arr 为构造出的数组，默认是 `[]`。

如果 Arr 的长度到达了 Length，就返回构造出的 Arr，否则继续递归构造。

构造数组实现了，那么基于它就能实现加法：

```typescript
type Add<Num1 extends number, Num2 extends number>
	= [...BuildArray<Num1>, ...BuildArray<Num2>]['length']


// 测试

type AddResult = Add<22, 22> // 44
```

### Subtract

加法是构造数组，那减法怎么做呢？

减法是从数值中去掉一部分，很容易想到可以通过数组类型的提取来做。

比如 3 是 `[unknown, unknown, unknown]` 的数组类型，提取出 2 个元素之后，剩下的数组再取 length 就是 1。

```typescript
type Subtract<Num1 extends number, Num2 extends number>
	= BuildArray<Num1> extends 
	[...arr1: infer BuildArray<Num2>, ...arr2: infer Rest]
	? Rese['length']
	: never

type SubtractResult = Subtract<11, 2> // 9
```

### Mutiply

```typescript
type Mutiply<Num1 extends number,
			  Num2 extends number,
			  ResultArr extends unknown[] = []
			> = Num2 extends 0 ? ResultArr['length']
			: Mutiply<Num1, Subtract<Num2, 1>, [...ResultArr, ...BuildArray<Num1>]>
```

类型参数 Num1 和 Num2 分别是被加数和加数。

因为乘法是多个加法结果的累加，我们加了一个类型参数 ResultArr 来保存中间结果，默认值是 `[]`，相当于从 0 开始加。

每加一次就把 Num2 减一，直到 Num2 为 0，就代表加完了。

加的过程就是往 ResultArr 数组中放 Num1 个元素。

这样递归的进行累加，也就是递归的往 ResultArr 中放元素。

最后取 ResultArr 的 length 就是乘法的结果。

### Divide

乘法是递归的累加，那除法不就是递归的累减么？

```typescript
type Divide<Num1 extends number,
			Num2 extends number,
			CountArr extends unknown[] = []>
		= Num1 extends 0? CountArr['length']
		: Divide<Subtract<Num2, Num1>, Num2, [unknown, ...CountArr]>
		
```

类型参数 Num1 和 Num2 分别是被减数和减数。

类型参数 CountArr 是用来记录减了几次的累加数组。

如果 Num1 减到了 0 ，那么这时候减了几次就是除法结果，也就是 `CountArr['length']`。

否则继续递归的减，让 Num1 减去 Num2，并且 CountArr 多加一个元素代表又减了一次。

> 这个想法好厉害

就这样，我们通过递归的累减并记录减了几次实现了除法。


### StrLen

数组长度可以取 length 来得到，但是字符串类型不能取 length，所以我们来实现一个求字符串长度的高级类型。

字符串长度不确定，明显要用递归。每次取一个并计数，直到取完，就是字符串长度。

```typescript
type StrLen<Str extends string,
		   CountArr extends unknown[] = []>
		   = Str extends `${infer First}${infer Rest}`
		   ? StrLen<Rest, [unknown, ...CountArr]>
		   : CountArr['length']
```

类型参数 Str 是待处理的字符串。类型参数 CountArr 是做计数的数组，默认值 `[]` 代表从 0 开始。

每次通过模式匹配提取去掉一个字符之后的剩余字符串，并且往计数数组里多放入一个元素。递归进行取字符和计数。

如果模式匹配不满足，代表计数结束，返回计数数组的长度 CountArr`['length']`。

### GreaterThan

能够做计数了，那也就能做两个数值的比较。

我们往一个数组类型中不断放入元素取长度，如果先到了 A，那就是 B 大，否则是 A 大：

```typescript
type GreaterThan<
	Num1 extends number,
	Num2 extends number,
	CountArr extends unknown[] = []
> = Num1 extends Num2
  ? false
  : CountArr['length'] extends Num2
	  ? true
	  : CountArr['length'] extends Num1
		  ? false
		  : GreaterThan<Num1, Num2, [unknown, ...CountArr]>
```

类型参数 Num1 和 Num2 是待比较的两个数。

类型参数 CountArr 是计数用的，会不断累加，默认值是 [] 代表从 0 开始。

如果 Num1 extends Num2 成立，代表相等，直接返回 false。

否则判断计数数组的长度，如果先到了 Num2，那么就是 Num1 大，返回 true。

反之，如果先到了 Num1，那么就是 Num2 大，返回 false。

如果都没到就往计数数组 CountArr 中放入一个元素，继续递归。

这样就实现了数值比较。

### Fibonacci

谈到了数值运算，就不得不提起经典的 Fibonacci 数列的计算。

Fibonacci 数列是 1、1、2、3、5、8、13、21、34、…… 这样的数列，有当前的数是前两个数的和的规律。

`_F_(0) = 1，_F_(1) = 1, _F_(n) = _F_(n - 1) + _F_(n - 2)（_n_ ≥ 2，_n_ ∈ N*）`

也就是递归的加法，在 TypeScript 类型编程里用构造数组来实现这种加法：

```typescript
type FibonacciLoop<
	PrevArr extends unknown[],
	CurrentArr extends unknown[],
	IndexArr extends unknown[] = [],
	Num extends number = 1
> = IndexArr['length'] extends Num
	? CurrentArr['length']
	: FibonacciLoop<CurrentArr, [...prevArr, ...CurrentArr], [...IndexArr, unknown], Num>


type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>

```

类型参数 PrevArr 是代表之前的累加值的数组。类型参数 CurrentArr 是代表当前数值的数组。

类型参数 IndexArr 用于记录 index，每次递归加一，默认值是 `[]`，代表从 0 开始。

类型参数 Num 代表求数列的第几个数。

判断当前 index 也就是 IndexArr`['length']` 是否到了 Num，到了就返回当前的数值` CurrentArr['length']`。

否则求出当前 index 对应的数值，用之前的数加上当前的数 `[...PrevArr, ... CurrentArr]`。

然后继续递归，index + 1，也就是 `[...IndexArr, unknown]`。

这就是递归计算 Fibinacci 数列的数的过程。

### 小结

TypeScript 类型系统没有加减乘除运算符，所以我们通过数组类型的构造和提取，**然后取长度的方式来实现数值运算**。

**我们通过构造和提取数组类型实现了加减乘除**，也实现了各种计数逻辑。

用数组长度做计数这一点是 TypeScript 类型体操中最麻烦的一个点，也是最容易让新手困惑的一个点。

## 联合分散可简化

当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，`TypeScript`会把每一个元素单独传入来做类型运算，最后再合并成联合类型，这种语法叫做分布式条件类型。

比如

```typescript
type Union = 'a' | 'b' | 'c'
```

想要其中的`a`大写

```typescript
type UpperCaseA<Item extends string> = Item extends 'a'? Uppercase<Item>: Item

type result = UpperCaseA<Union> // 'b' | 'c'| 'A'
```

可以看到，我们类型参数 Item 约束为 string，条件类型的判断中也是判断是否是 a，但传入的是联合类型。

这就是 TypeScript 对联合类型在条件类型中使用时的特殊处理：会把联合类型的每一个元素单独传入做类型计算，最后合并。

这样确实是简化了类型编程逻辑的，不需要递归提取每个元素再处理。

TypeScript 之所以这样处理联合类型也很容易理解，因为联合类型的每个元素都是互不相关的，不像数组、索引、字符串那样元素之间是有关系的。所以设计成了每一个单独处理，最后合并。

### CamelcaseUnion

Camelcase 我们实现过，就是提取字符串中的字符，首字母大写以后重新构造一个新的。

```typescript
type Camelcase<Str extends string> = 
	Str extensd `${infer Left}_${infer Right}${infer Rest}`
	? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
	: Str
```

提取`_` 左右的字符，把右边字符大写之后构造成新的字符串，余下的字符串递归处理

如果是对字符串数组做CamelcaseArr, 那就要做递归

```typescript
type CamelcaseArr<
		Arr extends unknown[]
>= Arr extends [infer Item, ...infer RestArr]
	? [Camelcase<Item & string>, CamelcaseArr<RestArr>]
	: []
```

类型参数 Arr 为待处理数组。

递归提取每一个元素做 Camelcase，因为 Camelcase 要求传入 string，这里要` & string` 来变成 string 类型。

那如果是联合类型呢

联合类型不需要递归每个元素，Typescript内部会把每一个元素传入单独做计算。之后把每个元素的计算结果合并成联合类型。

```typescript
	type CamelcaseUnion<Item extends string> 
	= Item extends `${infer Left}_${infer Right}${infer Rest}`
		? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
		: Item
```

这不和单个字符串的处理没区别么？

没错，对联合类型的处理和对单个类型的处理没什么区别，TypeScript 会把每个单独的类型拆开传入。不需要像数组类型那样需要递归提取每个元素做处理。

确实简化了很多，好像都是优点？

也不全是，其实这样处理也增加了一些认知成本，不信我们再来看个例子：

### IsUnion

```typescript
type IsUnion<A, B = A> = 
	A extends A
	? [B] extends [A]
		? false
		: true
	: never

type IsUnionResult = IsUnion<'a'|'b'|'c'> // true
type IsUnionResult2 = IsUnion<['a','b','c']> // false

```

是不是在心里会问：什么鬼？这段逻辑是啥？

这就是分布式条件类型带来的认知成本。

```typescript
type TestUnion<A, B = A> = A extends A ? {a:A, b: B} : never;

type TestUnionResult = TestUnion<'a' | 'b' | 'c'> 

// { a:"a"; b: "a" | "b" | "c" } |
// { a:"b"; b: "a" | "b" | "c" } |
// { a:"c"; b: "a" | "b" | "c" } 
```

A 和 B 都是同一个联合类型，为啥值还不一样呢？

因为条件类型中如果左边的类型是联合类型，会把每个元素单独传入做计算，而右边不会。

所以 A 是 'a' 的时候，B 是 'a' | 'b' | 'c'， A 是 'b' 的时候，B 是 'a' | 'b' | 'c'。。。

那么利用这个特点就可以实现 Union 类型的判断 `IsUnion`

```typescript
type IsUnion<A, B = A> = 
	A extends A
	? [B] extends [A]
		? false
		: true
	: never
```

类型参数 A、B 是待判断的联合类型，B 默认值为 A，也就是同一个类型。

A extends A 这段看似没啥意义，主要是为了触发分布式条件类型，让 A 的每个类型单独传入。

`[B] extends [A]` 这样不直接写 B 就可以避免触发分布式条件类型，那么 B 就是整个联合类型。

B 是联合类型整体，而 A 是单个类型，自然不成立，而其它类型没有这种特殊处b，A 和 B 都是同一个，怎么判断都成立。

利用这个特点就可以判断出是否是联合类型。

其中有两个点比较困惑，我们重点记一下：

**当 A 是联合类型时：**

-   **A extends A 这种写法是为了触发分布式条件类型，让每个类型单独传入处理的，没别的意义。**
-   **A extends A 和 `[A] extends [A]`是不同的处理，前者是单个类型和整个类型做判断，后者两边都是整个联合类型，因为只有 extends 左边直接是类型参数才会触发分布式条件类型。**

理解了这两点，分布式条件类型就算掌握了。

### BEM

bem 是 css 命名规范，用 block__element--modifier 的形式来描述某个区块下面的某个元素的某个状态的样式。

那么我们可以写这样一个高级类型，传入 block、element、modifier，返回构造出的 class 名：

这样使用：

```typescript
type bemResult = BEM<'guang', ['aaa', 'bbb'], ['warning', 'success']>;
```

它的实现就是三部分的合并，但传入的是数组，要递归遍历取出每一个元素来和其他部分组合，这样太麻烦了。

而如果是联合类型就不用递归遍历了，因为联合类型遇到字符串也是会单独每个元素单独传入做处理。

数组转联合类型可以这样写：

```typescript
type union = ['a', 'b'][number] // 'a' | 'b'
```

那么BEM可以这么实现

```typescript
type BEM<Block extends string,
		Element extends string[],
		Modifiers extends string[]
		> = `${Block}__${Element[number]}--${Modifiers[number]}`
```

类型参数 Block、Element、Modifiers 分别是 bem 规范的三部分，其中 Element 和 Modifiers 都可能多个，约束为 string[]。

构造一个字符串类型，其中 Element 和 Modifiers 通过索引访问来变为联合类型。

字符串类型中遇到联合类型的时候，会每个元素单独传入计算，也就是这样的效果

### AllCombinations

实现一个全组合的高级类型

希望传入`'A'|'B'` 返回所有的组合 `'A'|'B'|'BA'|'AB'`

```typescript
type Combination<A extends string, B extends string> = 
	A | B | `${A}${B}` | `${B}|${A}`
```

全组合问题的实现思路就是两两组合，组合出的字符串再和其他字符串两两组和：

比如 'A' | 'B' | 'c'，就是 A 和 B、C 组合，B 和 A、C 组合，C 和 A、B 组合。然后组合出来的字符串再和其他字符串组合。

所以全组合的高级类型就是这样

```typescript
type AllCombinations<A extends string, B extends string = A> =
	A extends A 
	? Combination<A, AllCombinations<Exclude<B, A>>>
	: never;
```


### 小结

**联合类型中的每个类型都是相互独立的，TypeScript 对它做了特殊处理，也就是遇到字符串类型、条件类型的时候会把每个类型单独传入做计算，最后把每个类型的计算结果合并成联合类型。**

条件类型左边是联合类型的时候就会触法这种处理，叫做分布式条件类型。

有两点特别要注意：

-   A extends A 不是没意义，意义是取出联合类型中的单个类型放入 A
-   A extends A 才是分布式条件类型， `[A] extends [A]` 就不是了，只有左边是单独的类型参数才可以。




## 内置的高级类型

### Parameters

用于提取函数类型的参数类型, 源码：

```typescript
type Parameters<T extends (...args: any) => any>
	= T extends (...args: infer P) => any
		? P
		: never;
```

### ReturnType

用于提取函数类型的返回值类型, 源码:

```typescript
type ReturnType<T extends (...args: any) => any>
	= T extends (...args: any) => infer R
	? R
	: any
```

### ConstructorParameters

> 构造器类型和函数类型的区别就是可以被new

用于提取构造器类型的参数类型, 源码:

```typescript
type ConstructorParameters<T extends abstract new (...args:any) => any>
	= T extends abstract new (...args: infer P) => any
	? P
	: never
```

构造器参数的提取依然是模式匹配

### InstanceType

提取构造器返回值的类型, 源码: 

```typescript
type InstanceType<T extends abstract new (...args: any) => any>
	= T extends abstract new (...args: any) => infer R
	? R
	: any
```

和`ConstructorParameters`差不多，

### ThisParameterType

提取函数中`this`的类型

```typescript

function hello(this: Person) {
	console.log(this.name)
}

type ThisParameterType<T> = 
	T extends (this: infer U, ...args: any[]) => any
		? U
		: unknown

```

### OmitThisParameter

删除函数的`this`

```typescript
type OmitThisParameter<T> =
	unknown extends ThisParameterType<T>
	? T
	: T extends (...args: infer A) => infer R
		? (...args: A) => R
		: T
```

### Partial

索引类型可以通过映射类型的语法做修改，比如把索引变为可选。

```typescript
	type Partial<T> ={
		[P in keyof T]?: T[P]
	}
```

### Required

可以把索引变为可选，也同样可以去掉可选，也就是 Required 类型：

```typescript
	type Required<T> = {
		[P in keyof T]-?: T[P]
	}
```

### Readonly

同样的方式，也可以添加 readonly 的修饰：

```typescript
	type Readonly<T> = {
		readonly [P in keyof T]: T[P]
	}
```

### Pick

映射类型的语法用于构造新的索引类型，在构造的过程中可以对索引和值做一些修改和过滤。

```typescript
type Pick<T, K extends keyof T> = {
	[P in K]: T[P]
}
```

### Record

用于创建索引类型，传入key和值的类型

```typescript
type Record<K extends keyof any, T> = {
	[P in k]: T
}
```

它用映射类型的语法创建了新的索引类型，索引来自 K，也就是 `P in K`，值是传入的 T。

这样就用 K 和 T 构造出了对应的索引类型。

```typescript
type RecordRes = Record<'a'|'b', number>
// { a: number, b: number}
```

当传入K是`string | number | symbol` 那么创建的就是可索引签名的索引类型

```typescript
type RescordRes2 = Record<string, number>
// { [x: string]: number; }
```

### Exclude

当想从一个联合类型中去掉一部分类型。

```typescript
type Exclude<T, U> = T extends U? never: T;
```

联合类型当作为类型参数出现在条件类型左边时，会被分散成单个类型传入，这叫做分布式条件类型。

所以写法上可以简化， T extends U 就是对每个类型的判断。

### Extract

可以过滤掉，自然也可以保留，Exclude 反过来就是 Extract，也就是取交集：

```typescript
type Extract<T, U> = T extends U? T :never  
```

### Omit

Pick可以取出索引类型的一部分索引构造成新的索引类型，那么反过来就是去掉这部分索引构造成新的索引类型

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

类型参数 T 为待处理的类型，类型参数 K 为索引允许的类型（string | number | symbol 或者 string）。

通过 Pick 取出一部分索引构造成新的索引类型，这里用 Exclude 把 K 对应的索引去掉，把剩下的索引保留。

### Awaited

在递归那节我们写过取 Promise 的 ValuType 的高级类型，这个比较常用，ts 也给内置了，就是 Awaited。

```typescript
type Awaited<T> = 
	T extends null | undefined
	? T
	: T extends object & { then(onfulfilled: infer F): any }
		? F extends ((value: infer V, ...args: any) => any)
			? Awaited<V>
			: never
		: T;
```

类型参数 T 是待处理的类型。

如果 T 是 null 或者 undefined，就返回 T。

如果 T 是对象并且有 then 方法，那就提取 then 的参数，也就是 onfulfilled 函数的类型到 infer 声明的局部变量 F。

继续提取 onfullfilled 函数类型的第一个参数的类型，也就是 Promise 返回的值的类型到 infer 声明的局部变量 V。

递归的处理提取出来的 V，直到不再满足上面的条件。

这样就实现了取出嵌套 Promise 的值的类型的目的:

```typescript
type AwaitedRes = Awaited<Promise<Promise<Promise<string>>> // string
```

### NonNullable

NonNullable 就是用于判断是否为非空类型，也就是不是 null 或者 undefined 的类型的，实现比较简单：

```typescript
type NonNullable<T> = T extends null | undefined ? never: T;
```

### Uppercase、Lowercase、Capitalize、Uncapitalize

这四个类型是分别实现大写、小写、首字母大写、去掉首字母大写的。

```typescript
type Uppercase<S extends string> = intrinsic; 
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;
```

啥情况，intrinsic 是啥？

这个 intrinsic 是固有的意思，就像 js 里面的有的方法打印会显示` [native code]` 一样。这部分类型不是在 ts 里实现的，而是编译过程中由 js 实现的。

其实就是 ts 编译器处理到这几个类型时就直接用 js 给算出来了。

为啥要这样做呢？

因为快啊，解析类型是要处理 AST 的，性能比较差，用 js 直接给算出来那多快呀。

这几个类型的原理在原理篇也会带大家 debug 下源码。

### 小结

虽然我们学完 6 个套路，各种类型编程逻辑都能写了，但是常用的类型 TS 已经内置了。

这些内置的高级类型用我们学的套路很容易可以实现。

比如用模式匹配可以实现：Parameters、ReturnType、ConstructorParameters、InstanceType、ThisParameterType。

用模式匹配 + 重新构造可以实现：OmitThisParameter

用重新构造可以实现：Partial、Required、Readonly、Pick、Record

用模式匹配 + 递归可以实现： Awaited

用联合类型在分布式条件类型的特性可以实现： Exclude

此外还有 NonNullable 和四个编译器内部实现的类型：Uppercase、Lowercase、Capitalize、Uncapitalize。

这些类型也不咋需要记，就算忘记了自己也能很快的实现。重点还是放在 6 个类型编程的套路上。

## 类型体操的意义

ts 基础是学习怎么给 js 代码声明各种类型，比如索引类型、函数类型、数组类型等，但是如果需要动态生成一些类型，或者对类型做一些变化呢？

这就是类型编程做的事情了，类型编程可以动态生成类型，对已有类型做修改。

类型编程是对类型参数做一系列运算之后产生新的类型。需要动态生成类型的场景必然会用到类型编程，比如返回值的类型和参数的类型有一定的关系，需要经过计算才能得到。

有的情况下不用类型编程也行，比如返回值可以是一个字符串类型 string，但用了类型编程的话，可能能更精确的提示出是什么 string，也就是具体的字符串字面量类型，那类型提示的精准度自然就提高了一个级别，体验也会更好。

**这就是类型编程的意义：需要动态生成类型的场景，必然要用类型编程做一些运算。有的场景下可以不用类型编程，但是用了能够有更精准的类型提示和检查。**

### ParseQueryString

写个js函数

```typescript
function parseQuery(queryStr) {
	if(!queryStr || !queryStr.length) {
		return {}
	}
	const queryObj = {}
	const items = queryStr.split('&')
	items.forEach(item=> {
		const [key, value] = item.split('=')
		if(queryObj[key]) {
			if(Array.isArray(queryObj[Key])) {
				queryObj[key].push(value)
			}else {
				queryObj[key] = [queryObj[key], value]
			}
		}else {
			queryObj[key] = value
		}
	})
	return queryObj;
}
```

如何给这个函数加入TS类型提示

```typescript
function parseQuery(queryStr: string): object {
}
```

更加语义化点

```typescript
function parseQuery(queryStr: string): Record<string, obj> {
}
```

但是返回的对象不能提示处有哪些属性。

这个时候就需要类型编程了。

```typescript
function parseQuery<Str extends string>(queryStr: Str): ParseQueryString<Str> {
}
```

声明一个类型参数Str，约束为string类型,函数参数`queryStr`指定为这个`Str`， 返回值的类型通过对Str做类型运算得到, 也就是`ParseQueryString<Str>`

### Promise.all

```typescript
interface PromiseConstructor {
	all<T extends reeeadonly unknown[] | []>
		(values: T) : Promise<{
			-readonly [P in keyof T]: Awaited<T[P]>
		}>;
	
	rece<T extends readonly unknown[] | []>
		(values: T): Promise<Awaited<T[number]>>
}
```

```typescript
interface PromiseConstructor {
	all<T extends reeeadonly unknown[] | []>
		(values: T) : Promise<{
			-readonly [P in keyof T]: Awaited<T[P]>
		}>;
}
```

类型参数 T 是待处理的 Promise 数组，约束为 `unknown[] 或者空数组 []`。

这个类型参数 T 就是传入的函数参数的类型。

返回一个新的数组类型，也可以用映射类型的语法构造个新的索引类型（class、对象、数组等聚合多个元素的类型都是索引类型）。

新的索引类型的索引来自之前的数组 T，也就是 P in keyof T，值的类型是之前的值的类型，但要做下 Promise 的 value 类型提取，用内置的高级类型 Awaited，也就是 Awaited<T[P]>。

同时要把 readonly 的修饰去掉，也就是 -readonly。

这就是 Promise.all 的类型定义。因为返回值的类型和参数的类型是有关联的，所以必然会用到类型编程。

### Currying

currying: 传入一个函数，返回柯里化的函数

```typescript

// 传入
const func = (a: string, b: number, c: boolean) => {}

// 返回
(a: string) => (b: number) => (c:boolean) => void 

```

JS的实现不关注，主要关注currying函数的类型定义

```typescript
type CurriedFunc<Params, Return> = 
	Params extends [infer Arg, ...infer Rest]
		? (arg: Arg) => CurriedFunc<Rest, Return>
		: never;

declare function currying<Func>(fn: Func):
	Func extends (...args: infer Params) => infer Result?
	 CurriedFunc<Params, Result>: never
```

curring 函数有一个类型参数 Func，由函数参数的类型指定。

返回值的类型要对 Func 做一些类型运算，通过模式匹配提取参数和返回值的类型，传入 CurriedFunc 来构造新的函数类型。

构造的函数的层数不确定，所以要用递归，每次提取一个参数到 infer 声明的局部变量 Arg，其余参数到 infer 声明的局部变量 Rest。

用 Arg 作为构造的新的函数函数的参数，返回值的类型继续递归构造。

这样就递归提取出了 Params 中的所有的元素，递归构造出了柯里化后的函数类型。

这个柯里化的函数类型定义，因为返回值的类型和参数的类型是有关系的，所以离不开类型编程。

### 小结

类型编程是对类型参数做一系列类型运算，产生新的类型。**需要对已有类型做修改，需要动态生成类型的场景，必然会用到类型编程**，比如 Promise.all、Promise.race、柯里化等场景。

有的时候不用类型编程也行，但用了类型编程**能够实现更精准的类型提示和检查**，比如 parseQueryString 这个函数的返回值。

这就是类型编程或者说类型体操的意义。

### 体操实战

### KebabCaseToCamelCase

常用的变量命名规范有两种，一种是 KebabCase，也就是 aaa-bbb-ccc 这种中划线分割的风格，另一种是 CamelCase， 也就是 aaaBbbCcc 这种除第一个单词外首字母大写的风格。

如果想实现 KebabCase 到 CamelCase 的转换，该怎么做呢？

如 `sam-and-hbisedm` => `samAndHbisedm`

这种明显是要做字符串字面量类型的提取和构造，并且因为单词数量不确定，要递归地处理。

```typescript
type KebabCaseToCamelCase<Str extends string> =
	Str extends `${infer First}-${infer Rest}`
	? `${First}${KebabCaseToCamelCase<Capitalize<Rest>>}`
	: Str
```

类型参数 Str 是待处理的字符串类型，约束为 string。

通过模式匹配提取 Str 中 - 分隔的两部分，前面的部分放到 infer 声明的局部变量 Item 里，后面的放到 infer 声明的局部变量 Rest 里。

提取的第一个单词不大写，后面的字符串首字母大写，然后递归的这样处理，然后也就是 `${Item}${KebabCaseToCamelCase<Capitalize>`。

如果模式匹配不满足，就返回 Str。

### CamelCaseToKebabCase

同理，反过来，但是没有`-`进行分割，只能用大小写进行分割

```typescript
type CamelCaseToKebabCase<Str extends string> =
	Str extends `${infer First}${infer Rest}`
	? First extends Lowercase<First>
		?  `${First}${CamelCaseToKebabCase<Rest>}`
		: `-${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`
	: Str
```

类型参数 Str 为待处理的字符串类型。

通过模式匹配提取首个字符到 infer 声明的局部变量 First，剩下的放到 Rest。

判断下当前字符是否是小写，如果是的话就不需要转换，递归处理后续字符，也就是 `${First}${CamelCaseToKebabCase}`。

如果是大写，那就找到了要分割的地方，转为 - 分割的形式，然后把 First 小写，后面的字符串递归的处理，也就是 `-${Lowercase}${CamelCaseToKebabCase}`。

如果模式匹配不满足，就返回 Str。

这样就完成了 CamelCase 到 KebabCase 的转换

### Chunk

希望实现这样一个类型：

对数组做分组，比如 1、2、3、4、5 的数组，每两个为 1 组，那就可以分为 1、2 和 3、4 以及 5 这三个 Chunk。

这明显是对数组类型的提取和构造，元素数量不确定，需要递归的处理，并且还需要通过构造出的数组的 length 来作为 chunk 拆分的标志。

```typescript
type Chunk<
	Arr extends unknown[],
	ItemLen extends number,
	CurItem extends unknown[] = [],
	Res extends unknown[] = []	
> = Arr extends [infer First, ...infer Rest] ?
		  CurItem['length'] extends ItemLen ?
			  Chunk<Rest, ItemLen, [First], [...Res, CurItem]>
			  : Chunk<Rest, ItemLen, [...CurItem, First], Res>
		: [...Res, CurItem]
```

类型参数 Arr 为待处理的数组类型，约束为 unknown。类型参数 ItemLen 是每个分组的长度。

后两个类型参数是用于保存中间结果的：类型参数 CurItem 是当前的分组，默认值 `[]`，类型参数 Res 是结果数组，默认值`[]`。

通过模式匹配提取 Arr 中的首个元素到 infer 声明的局部变量 First 里，剩下的放到 Rest 里。

通过 CurItem 的 length 判断是否到了每个分组要求的长度 ItemLen：

如果到了，就把 CurItem 加到当前结果 Res 里，也就是` [...Res, CurItem] `，然后开启一个新分组，也就是 `[First]`。

如果没到，那就继续构造当前分组，也就是` [...CurItem, First]`，当前结果不变，也就是 Res。

这样递归的处理，直到不满足模式匹配，那就把当前 CurItem 也放到结果里返回，也就是` [...Res, CurItem]`。

这样就完成了根据长度对数组分组的功能

字符串类型、数组类型都做了一些练习，接下来再做个索引类型的

### TupleToNestedObject

根据数组类型，比如 `[‘a’, ‘b’, ‘c’]` 的元组类型，再加上值的类型 'xxx'，构造出这样的索引类型：

```javascript
{
	a: {
		b: {
			c: 'xxx'
		}
	}
}
```

这个依然是提取、构造、递归，只不过是对数组类型做提取，构造索引类型，然后递归的这样一层层处理。

```typescript
type TupleToNestedObject<Tuple extends unknown[], Value> = 
	Tuple extends [infer First, ...infer Rest]
	? {
		[Key in First as Key extends keyof any? Key: never]:
			Rest extends unknown[]
				? TopleToNestedObject<Rest, Value>
				: Value
	}
	: Value
```

类型参数 Tuple 为待处理的元组类型，元素类型任意，约束为 `unknown[]`。类型参数 Value 为值的类型。

通过模式匹配提取首个元素到 infer 声明的局部变量 First，剩下的放到 infer 声明的局部变量 Rest。

用提取出来的 First 作为 Key 构造新的索引类型，也就是 `Key in First`，值的类型为 `Value`，如果 Rest 还有元素的话就递归的构造下一层。

为什么后面还有个 `as Key extends keyof any ? Key : never` 的重映射呢？

因为比如 null、undefined 等类型是不能作为索引类型的 key 的，就需要做下过滤，如果是这些类型，就返回 never，否则返回当前 Key。

这里的 keyof any 在内置的高级类型那节也有讲到，就是取当前支持索引支持哪些类型的`string | number | symbol`

如果提取不出元素，那就构造结束了，返回 Value。

### PartialObjectPropByKeys

把一个索引类型的某些 Key 转为 可选的，其余的 Key 不变，

```typescript
interface Sam {
	name: string,
	age: number,
	address: string
}

// 把 name 和 age 变成可选

interface Sam2 {
	name?: string,
	age?: number,
	address: number,
}

```

这样的逻辑可以采用重新构造一个新的类型来实现

也可以采用高级类型来实现

```typescript  
type Copy<Obj extends Record<string, any>> = {
	[key in keyof Obj]: Obj[key]
}


type PartialObjectPropByKeys<
	Obj extends Record<string, any>,
	Key extends keyof any
> = 
 Copy<Partial<Pick<Obj,Extract<keyof Obj, Key>>> & Omit<Obj,Key>>;
```

使用Partial将类型变成可选
使用Pick选出要的key
使用Extract排除掉不需要的key
使用omit过滤key后得到索引类型

使用Copy的原因是 这里没计算出最终的类型

因为 ts 的类型只有在用到的的时候才会去计算，这里并不会去做计算。我们可以再做一层映射，当构造新的索引类型的时候，就会做计算了。


### 函数重载的三种写法

ts 支持函数重载，也就是同名的函数可以有多种类型定义。

重载的写法一共有三种

```typescript
declare function func(name: string): string;
declare function func(name: number): number;
```

这种大家比较常用，声明两个同名函数，就能达到重载的目的

当然，如果有函数的实现，那就不用带 declare 了

```typescript
function add(a: number, b: number): number; 
function add(a: string, b: string): string; 
function add(a: any, b: any) { 
	return a + b; 
}
```

函数可以用 interface 的方式声明，同样，也可以用 interface 的方式声明函数重载

```typescript
interface Func{
	(name: string): string;
	(name: number): number;
}
```

函数类型可以取交叉类型，也就是多种类型都可以，其实也是函数重载的意思

```typescript
type Func = ((name: string)=> string) & ((name: number) => number))
declare const func3: Func
```

声明多个同名函数类型、interface 声明多个函数签名、交叉类型，一共这三种函数重载的方式。

### UnionToTuple

`'a' | 'b' | 'c'` 转 `['a', 'b', 'c']`

先看下函数重载的特性，这个需要用到

```typescript
	declare function func(name: string): string
	declare function func(name: number): number

	type res = ReturnType<typeof func> // 返回最后一个定义函数的返回值number
```

**取重载函数的 ReturnType 返回的是最后一个重载的返回值类型。**

重载函数不是能通过函数交叉的方式写么，而我们又能实现联合转交叉。

所以就能拿到联合类型的最后一个类型

```typescript
type UnionToIntersection<U> = 
	(U extends U? (x: U) => unknown: never) extends (x infer R) => unknown
	? R
	: never

type UnionToFuncIntersection<T> = UnionToIntersection<T extends any ? () => T: never>
```

U extends U 是触发分布式条件类型，构造一个函数类型，通过模式匹配提取参数的类型，利用函数参数的逆变的性质，就能实现联合转交叉。

因为函数参数的类型要能接收多个类型，那肯定要定义成这些类型的交集，所以会发生逆变，**转成交叉类型**。

然后是 UnionToFuncIntersection 的类型：

我们对联合类型 T 做下处理，用 T extends any 触发分布式条件类型的特性，它会把联合类型的每个类型单独传入做计算，最后把计算结果合并成联合类型。把每个类型构造成一个函数类型传入。

然后再通过 ReturnType 取返回值的类型，就取到了联合类型的最后一个类型

```typescript
type UnionToTupe<T> =
	UntionToIntersection<T extends any? () => T: never> 
	extends () => infer ReturnType 
	? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
	: []
```


## Infer Extends 简化(新语法)

```typescript
type TestLast<Arr extends string[]> =
	Arr extends [...infer Rest, infer Last]
	? `最后一个${Last}`
	: never
```

这里从 string 数组中提取的元素，默认会推导为 unknown 类型，这就导致了不能直接把它当 string 用。

可以采用加一层判断string，或者取交叉类型

```typescript
type TestLast<Arr extends string[]> =
	Arr extends [...infer Rest, infer Last]
	? Last extends string
		? `最后一个${Last}`
		: never
	: never
```

```typescript
type TestLast<Arr extends string[]> =
	Arr extends [...infer Rest, infer Last]
	? `最后一个${Last & string}`
	: never
```

但是我们明明知道这里就是string，还需要这样做，太麻烦了。

TS 也知道有这个问题，所以在 4.7 就引入了新语法：infer extends。

```typescript
type TestLast<Arr extends string[]> =
	Arr extends [...infer Rest, infer Last extends string]
	? `最后一个${Last}`
	: never
```

**infer 的时候加上 extends 来约束推导的类型，这样推导出的就不再是 unknown 了，而是约束的类型。**

这个语法是 TS 4.7 引入的，在 4.8 又完善了一下。

```typescript
type NumInfer<Str> = 
	Str extends `${infer Num extends number}` 
		? Num 
		: never;

type res = NumInfer<'123'> // 4.7 number
type res = NumInfer<'123'> // 4.8 123
```

也就是说 4.7 的时候推导出的就是 extends 约束的类型，但是 4.8 的时候，如果是基础类型，会推导出字面量类型。

有了这个语法之后，除了能简化类型编程的逻辑之外，也能实现一些之前实现不了的功能：

提取枚举类型

```typescript
enum Code {
	a = 111,
	b = 222,
	c = 'abc'
}

type res = `${Code}` // '111' | '222' | 'abc'
// 明明有些是数字类型，这里却转成了字符串

type StrToNum<Str> = 
	Str extends `${infer Num extends number}`
	? Num
	: Str

type res1 = StrToNum<`${Code}`> // 111 | 222 | 'abc'

```

## 逆变、协变、双向协变、不变

深入学习 TypeScript 类型系统的话，逆变、协变、双向协变、不变是绕不过去的概念。

### 类型安全和型变

TypeScript 给 JavaScript 添加了一套静态类型系统，是为了保证类型安全的，也就是保证变量只能赋同类型的值，对象只能访问它有的属性、方法。

比如 number 类型的值不能赋值给 boolean 类型的变量，Date 类型的对象就不能调用 exec 方法。

这是类型检查做的事情，遇到类型安全问题会在编译时报错。

但是这种类型安全的限制也不能太死板，有的时候需要一些变通，比如子类型是可以赋值给父类型的变量的，可以完全当成父类型来使用，也就是“型变（variant）”（类型改变）。

**这种“型变”分为两种，一种是子类型可以赋值给父类型，叫做协变（covariant），一种是父类型可以赋值给子类型，叫做逆变（contravariant）。**

### 协变

```typescript
interface Person {
	name: string;
	age: number;
}

interface Sam {
	name: string;
	age: number;
	friends: string[]
}

let person: Person =  {
	name: '',
	age: 20
}

let sam: Sam = {
	name: 'sam',
	age: 20,
	friends: ['jony', 'amy']
}

person = sam // 不会报错
```

这并不会报错，虽然这俩类型不一样，但是依然是类型安全的。

这种子类型可以赋值给父类型的情况就叫做协变。

为什么要支持协变很容易理解：类型系统支持了父子类型，那如果子类型还不能赋值给父类型，还叫父子类型么？

所以型变是实现类型父子关系必须的，它在保证类型安全的基础上，增加了类型系统的灵活性。

### 逆变

这里定义两个函数

```typescript
let printHobbites: (sam: Sam) => void
printHobbites = (sam) => {
	console.log(sam.hobbies)
}

let printName: (person: Person) => void
printName = (person) => {
	console.log(person.name)
}

```

printHobbies 的参数 Guang 是 printName 参数 Person 的子类型。

那么问题来了，printName 能赋值给 printHobbies 么？printHobbies 能赋值给 printName 么？

测试一下发现是这样的：

```typescript
printHobbites = printName // 不报红
printName  = printHobbites //  报红
```

为什么呢？

printName 的参数 Person 不是 printHobbies 的参数 Guang 的父类型么，为啥能赋值给子类型？

因为这个函数调用的时候是按照 Guang 来约束的类型，但实际上函数只用到了父类型 Person 的属性和方法，当然不会有问题，依然是类型安全的。

**这就是逆变，函数的参数有逆变的性质**（而返回值是协变的，也就是子类型可以赋值给父类型）。

那反过来呢，如果 printHoobies 赋值给 printName 会发生什么？

因为函数声明的时候是按照 Person 来约束类型，但是调用的时候是按照 Guang 的类型来访问的属性和方法，那自然类型不安全了，所以就会报错。

但是ts2.x版本的时候这种赋值是可以的，所以后面ts版本多了一个编译选型 `strictFunctionTypes` 设置为 true 就只支持函数参数的逆变，设置为 false 则是双向协变。

这样就支持函数参数的**双向协变**，类型检查不会报错，但不能严格保证类型安全。

在试试个逆变的例子

```typescript
type Func = (a: string) => void 
const func: Func = (a: 'hello') => undefined
```

这里参数的位置会报错，但是返回值不会。

参数的位置是逆变  也就是被赋值的函数参数要是赋值的函数参数的子类型。 这里`string`不是`'hello'`的子类型

返回值的位置是协变 也就是赋值的函数的返回值要是被赋值的函数的返回值的子类型。 这里`undefined`是`void`的子类型

> 定义了函数后，函数参数只能是定义时参数的父类or本身，返回值只能是定义时返回值的子类or本身 


### 不变

非父子类型之间不会发生型变，只要类型不一样就会报错：

```typescript
interface Sam {
	name: string;
	age: number;
	friends: string[]
}

interface Hbisedm {
	name: string;
	sex: boolean
}
let hbisedm: Hbisedm = {
	name: 'hbisedm',
	sex: true
}

sam = hbisedm // 报错
```

那类型之间的父子关系如何判断呢，也没有看到`extends`的继承

### 类型父子关系的判断

像 java 里面的类型都是通过 extends 继承的，如果 A extends B，那 A 就是 B 的子类型。这种叫做**名义类型系统**（nominal type）。

而 ts 里不看这个，只要结构上是一致的，那么就可以确定父子关系，这种叫做**结构类型系统**（structual type）。

像上面的例子

```typescript
interface Person {
	name: string;
	age: number;
}

interface Sam {
	name: string;
	age: number;
	friends: string[]
}

let person: Person =  {
	name: '',
	age: 20
}

let sam: Sam = {
	name: 'sam',
	age: 20,
	friends: ['jony', 'amy']
}

person = sam // 不会报错
```

`sam`和`person`之间有extends关系么 

没有呀

那么怎么确定父子关系的呢

通过结构，更具体的那个是子类型。这里的`Sam`比`Person`多了一个属性，所以`Sam`是`Person`的子类型

这里说的是更具体，不是说更多。

对于联合类型的话，判断联合类型的父子关系

`'a' | 'b'` 和  `'a' | 'b' | 'c'` 那个更具体呢

`'a' | 'b'`更具体，所以它是子类型

> 这里定义类的时候的有点分歧，记一下就行了。

```typescript
type res = 'a' | 'b' extends 'a' | 'b' | 'c' ? true : false // true
```

### 小结

ts 通过给 js 添加了静态类型系统来保证了类型安全，大多数情况下不同类型之间是不能赋值的，但是为了增加类型系统灵活性，设计了父子类型的概念。父子类型之间自然应该能赋值，也就是**会发生型变（variant）**。

型变分为逆变（contravariant）和协变（covariant）。协变很容易理解，就是子类型赋值给父类型。逆变主要是函数赋值的时候函数参数的性质，参数的父类型可以赋值给子类型，这是因为按照子类型来声明的参数，访问父类型的属性和方法自然没问题，依然是类型安全的。但反过来就不一定了。

型变都是针对父子类型来说的，非父子类型自然就不会型变也就是不变（invariant）。

ts 中父子类型的判定是按照结构来看的，更具体的那个是子类型。

## 编译Ts用tsc还是babel

编译 TypeScript 代码用什么编译器？

那还用说，肯定是 ts 自带的 compiler 呀。

但其实 babel 也能编译 ts 代码，那用 babel 和 tsc 编译 ts 代码有什么区别呢？

babel 和 tsc 的编译流程大同小异，都有把源码转换成 AST 的 Parser，都会做语义分析（作用域分析）和 AST 的 transform，最后都会用 Generator（或者 Emitter）把 AST 打印成目标代码并生成 sourcemap。但是 babel 不做类型检查，也不会生成 d.ts 文件。

tsc 支持最新的 es 标准特性和部分草案的特性（比如 decorator），而 babel 通过 @babel/preset-env 支持所有标准特性，也可以通过 @babel/proposal-xx 来支持各种非标准特性，支持的语言特性上 babel 更强一些。

tsc 没有做 polyfill 的处理，需要全量引入 core-js，而 babel 的 @babel/preset-env 会根据 targets 的配置按需引入 core-js，引入方式受 useBuiltIns 影响 (entry 是在入口引入 targets 需要的，usage 是每个模块引入用到的)。

但是 babel 因为是每个文件单独编译的（tsc 是整个项目一起编译），而且也不解析类型，所以 const enum，namespace 合并，namespace 导出非 const 值并不支持。而且过时的 export = 的模块语法也不支持。

但这些影响不大，完全可以用 babel 编译 ts 代码来生成体积更小的代码，不做类型检查编译速度也更快。如果想做类型检查可以单独执行 tsc --noEmit。

当然，文中只是讨论了 tsc 和 babel 编译 ts 代码的区别，并没有说最好用什么，具体用什么编译 ts，大家可以根据场景自己选择。

## 实现Typescript的类型检查

基于babel来实现类型检查，也就是tsc的checker功能

实现简单类型的类型检查

赋值语句的检查

```typescript
let name: string
name = 123
```

首先使用babel将这段代码转AST

```typescript
const parse = require('@babel/parse')

const soureCode = `
let name: string
name = 123
`

const ast = parse.parse(sourceCode, {
	plugins: ['typescript']
})
```


	## 阅读Ts源码















