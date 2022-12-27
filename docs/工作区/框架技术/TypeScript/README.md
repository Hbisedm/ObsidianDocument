---
title: README
date: "2022-06-01 12:42:26"
tags: ["TypeScript"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期二, 十二月 27日 2022, 4:45:13 下午
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
type DeepPromiseResult = DeepPromiseValueType<>
```








