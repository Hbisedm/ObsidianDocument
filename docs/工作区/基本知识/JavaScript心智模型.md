---
title: JavaScript心智模型
tags: ["Js心智模型"]
创建时间: 星期三, 十月 26日 2022, 3:30:00 下午
修改时间: 星期五, 十月 28日 2022, 10:34:06 晚上
---
#心智模型 #JavaScript

# JavaScript心智模型

## 什么是心智模型

> 这些关于某些事物如何在您的脑海中**运作**的近似值被称为“心智模型”。

当我们使用“快速”系统时，我们会根据代码的整体结构、命名约定和注释来猜测代码的作用。使用“慢”系统，我们逐步追溯代码所做的事情——一个累人且耗时的过程。

## JavaSricpt宇宙

value 与 code

- 虽然编写的code和value是交互的
- value 是 运行在机器上，存在于完全独立的空间
- 代码不包括值，编写的代码知识一堆指令，有if、else、变量声明、逗号等等

可以想象一下我们是一个小人站在地球上，手里拿着要执行的code，上面有一条条指令，值存在于离我们比较远的星球上`boolean`、`number`、`string`、`symbol`、`null`、`undifined`、`object`、`function`

![](https://tva1.sinaimg.cn/large/e6c9d24egy1gzj28oyn9pj20uu0u0gnw.jpg)

### Values

- 原始类型

	- 原始数据类型的价值观就像小星星，但当我需要它们时，它们总是在那里。
	- 即使在我这颗小行星的表面，我也能找到它们，并指出它们。
	- 它们可以是数字和字符串等。所有原始值都有一个共同点:它们是JavaScript世界的永久组成部分。我可以指出它们，但我不能创造、破坏或改变它们

- 对象与函数

	- 对象和函数也是值，但与原始值不同的是，我可以在代码中操作它们。
	- 如果原始值就像遥远的恒星，那么对象和函数就更像漂浮在我的行星周围的小行星。它们不是我代码的一部分，但它们离我很近，可以操纵


### 值类型(9种)

- primitive values (原始值)

	- Undefined
	- Null
	- Booleans
	- Numbers
	- BigInts
	- String
	- Symbols

- object and functions

	- Object
	- Functions

- No Other Types(没有其他类型)

在JavaScript中，除了我们刚刚列举的那些之外，没有其他的基本值类型。

```js
console.log(typeof([])); // "object"
console.log(typeof(new Date())); // "object"
console.log(typeof(/(hello|goodbye)/)); // "object"
```

> 你可能听说过everything 都是对象。这是一个流行的都市传说，但它不是真的。

虽然像 `"hi".toUpperCase()` 这样的代码使“hi”看起来像一个对象，但这只是一种错觉。当您这样做时，JavaScript会创建一个临时对象，然后立即丢弃它。如果这个机制还不适合你，那也没关系。这确实相当令人困惑! 现在，您只需要记住原始值(如数字和字符串)不是对象。

### Expressions(表达式)

> 有很多问题JavaScript无法回答。但是JavaScript很乐意回答一些问题。这些问题有一个特殊的名称，它们被称为表达式。

表达式是JavaScript可以回答的问题。JavaScript用它知道的唯一方式来回答表达式——用值。

总之记住一句话：**Expressions always result in a single value.**


### 总结

1. js世界中有值也有code，可以认为不同的value悬挂在js这个宇宙中，它们不存在于我们编写的代码中，但是我们可以通过代码来引用它们。
2. 值有2个类型，原始类型的值 与 对象和方法的值， 总共有9种不同的类型。每种类型都有特定的用途，但有些很少使用。
3. 可以向js宇宙徐闻表达式，表达式总是表示一个值。
4. 有些值是孤独的（孤独的星星），`Null` `Undefined`

## 值与变量

> 原始值不可以改变

### Primitive Values Are Immutable（原始值是不可变的）

```
let reaction = 'hbisedm';
reaction[0] = 'l';
console.log(reaction); // hbisedm
```

字符串 和 数组 在表面上的相似之处：

- 数组是项目序列
- 字符串是字符序列

```js
let arr = [1, 6, 3]
let str = 'Sam'
console.log(arr[0], str[0]) // 1 S
```

 都可以类似地访问数组的第一项和字符串的第一项。**这个几乎会让人觉得字符串就是数组(曾经我就是这样认为的- -)**

但字符串不是数组!!! 可以更改数组的任意项, 字符串却不能改变。

```js
arr[0] = 2
conosole.log(arr) // [2, 6, 3]
```

这是我们需要添加到我们的**心智模型**的一个重要细节。

**字符串是原始值，所有的原始值都是不可变的。** 不可变一种花哨的拉丁语方式来表达“不变”。只读。

JavaScript 不允许我们在任何原始值上设置属性。它是否会默默地拒绝我们的请求或抛出错误取决于我们的代码处于[哪种模式(是否严格模式 )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)。 但请放心，这永远不会起作用

> 记住，在我们的JavaScript世界中，所有的原始值都是遥远的星星，离我们的代码最远。我们可以指出它们，但它们将永远停留在原地，不变。 奇怪的是，我觉得这很安慰~


![变量与值](https://tva1.sinaimg.cn/large/e6c9d24egy1h0g3jlk8a0j20zw0lkgmz.jpg)

### Variables and Values—A Contradiction?（变量和值 矛盾么）

```js
let pet = 'Narwhal';
pet = 'The Kraken';
console.log(pet); // ?
```

> 如果你认为我想弄乱你的脑袋，那你是对的！答案是`"The Kraken"`。不变性在这里不起作用。
>
> 如果你弄错了，不要绝望！这个例子似乎与字符串不变性相矛盾，**但事实并非如此。**
>
> 当你刚接触一门语言时，有时有必要抛开矛盾，这样你就可以避免兔子洞并继续学习。但既然你致力于建立一个心智模型，你就需要质疑矛盾。
>
> _矛盾揭示了心智模型的差距。_

### Variables Are Wires(变量是连线)

解释代码

```js
let pet = 'Narwhal';
pet = 'The Kraken';
console.log(pet); // ?
```

我们知道字符串值不能改变，因为它们是原始的。但宠物变量确实变成了“海怪”。这是怎么回事? 这似乎是一个矛盾，但它不是。

我们说过原始值不能改变，但是我们没有说**任何关于变量的东西**!随着我们不断完善我们的思维模式.

我们需要理清几个相关的概念:

- 变量不是值
- 变量指向值

### Assigning a Value to a Variable (给变量赋值)

> 在javaScript的世界中，变量是指向指的连线。

赋值操作

![赋值操作](https://tva1.sinaimg.cn/large/e6c9d24egy1h0g4ftjg3wg20zy0dykjn.gif)

更改赋值指向

![更改赋值指向](https://tva1.sinaimg.cn/large/e6c9d24egy1h0g4iaarg3g20zy0ki1l2.gif)

- 我在这里所做的一切只是指示JavaScript将左侧(宠物)的变量或“连线”指向右侧(‘the Kraken’)的值。
- 它会一直指向那个值，除非我以后再重新赋值。

### Rules of Assignment (赋值规则)

- 赋值的左侧必须是“连线”——例如foo变量。
- 赋值的右边必须是一个表达式，所以它总是会产生一个值。我们的表达可以很简单，比如1或者“Sam”。它也可以是一个更复杂的表达式——例如 foo = firstName +'Sam'

这里的 `firstName + 'Sam'` 为表达式

> FAQ
> 如果右边必须是表达式，那么意味着简单的原始数据如`2`、`'Sam'` 写的代码也是表达式？
> 是的!这样的表达式被称为字面量——因为我们字面地写下它们产生的值。


### Reading a Value of a Variable(从变量读出值)

```js
console.log(foo)
```

但是请注意，它不是我们传递给console.log的foo变量。

我们可以口头上这么说，但是我们不能把变量传递给函数。**传递foo变量的当前值。**

**所以同一个表达式可以在不同的时间给我们不同的值！**

#### Nitpicking

> JS中只有值传递！！！JS中只有值传递！！！JS中只有值传递！！！

谁在乎你说的是“传递一个变量”还是“传递一个值”?这两者之间的区别是不是太迂腐了?

在大脑确定一件事，**JavaScript不能传递变量！**

### 小结

- **原始值是不可变的**它们是我们 JavaScript 世界的永久组成部分——我们无法创建、销毁或更改它们。例如，我们不能在字符串值上设置属性，因为它是原始值。数组**不是**原始的，所以我们**可以**设置它们的属性。
- **变量不是值**，每个变量都指向一个特定的值。我们可以使用赋值运算符`=`来更改**它**指向的值。
- **变量就像电线**，"线"不是 JavaScript 的概念——但它可以帮助我们想象变量如何指向值。当我们进行赋值时，左边总是有一个连线，右边是一个表达式（产生一个值）。
- **语言很重要**我们正在建立一个心智模型，以便我们对宇宙中可能发生或不可能发生的事情充满信心，我们可能会以随意的方式谈论这些想法（吹毛求疵通常会适得其反），但我们对术语背后含义的理解需要**准确**。

## Studying From the Inside(从内部学习)

### 从外部学习

研究我们的 JavaScript 世界的一种方法是从外部研究它。

我们可能会专注于模拟我们的世界——**一个 JavaScript 引擎**——是如何“真正”工作的。

例如，我们可能会了解到这个文本字符串——**我们世界中的一个值**——是存储在硅芯片中的字节序列。

### 从内部学习

我们将从**内部**研究我们的世界。将自己的精神转移到 JavaScript 世界中，并站在我旁边。我们将观察我们的宇宙法则，并像物理宇宙中的物理学家一样进行实验。

**我们将了解我们的 JavaScript 世界，而无需考虑它是如何实现的。这类似于物理学家讨论恒星的属性而不质疑*物理*世界是否真实。没关系！无论我们是在研究物理世界还是 JavaScript 世界，我们都可以用它们自己的术语来描述它们。**

我们的心智模型不会试图解释一个值是如何在计算机的内存中表示的。答案一直在变化！[当您的程序运行时](https://v8.dev/blog/react-cliff)，答案甚至会发生变化。

对我们来说，每个字符串都是一个值——不是“指针”或“内存地址”——一个_值_。**在我们的宇宙中，一个值就足够了。** 不要让“记忆细胞”和其他低级隐喻分散您构建 JavaScript 的准确高级心智模型的注意力。反正都是乌龟！

如果您来自较低级别的语言，请抛开您对“通过引用传递”、“在堆栈上分配”、“在写入时复制”等的直觉。这些关于计算机如何工作的模型通常使人们更难以对 JavaScript 中可以发生或不能发生的事情充满信心。我们将查看一些较低级别的细节，但只关注[真正重要的地方](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/)。**它们可以作为我们心智模型的补充，而不是它的基础。**

**我们心智模型的基础是价值观。** 每个值都属于一个类型。原始值是不可变的。我们可以使用我们称之为变量的“连线”来指向值。这个基础——对价值观的理解——将帮助我们继续建立我们的心智模型。

至于这些奇异的景象，我不再多想了。我有电线要指出，有问题要问。我最好得到它！

当我看着星星时，它们是明亮的。

我眨眼时它们还在吗？

我耸了耸肩。

“实施细节。”


## Meeting the Primitive Values(会见原始值)

到目前为止，我们一直在从地球表面观察我们的 JavaScript 宇宙。

我们的宇宙飞船将引导我们穿越 JavaScript 的“天体”来满足不同的价值观。我们将首先遇到原始值：布尔值、数字、字符串等。稍后，我们将遇到对象和函数。将其视为观光旅游。

![原始值](https://tva1.sinaimg.cn/large/e6c9d24egy1h0g70071isj20js0o43zx.jpg)

### Undefined

我们将从未定义类型开始。这是一个非常简单的起点，因为这个类型只有一个值——undefined。

它被称为未定义，因此您可能会认为它不存在——但它_是_一个值，并且是一个非常真实的值！像黑洞一样，`undefined`脾气暴躁，经常会带来麻烦。例如，从中读取一个属性会破坏你的程序：

哦,好吧。幸运的是，在整个JavaScript世界中只有一个undefined。你可能会想:它到底为什么会存在?在JavaScript中，它表示无意中丢失的值的概念。 你可以在你自己的代码中使用它，比如写undefined 2或“hello”。然而，undefined也通常“自然发生”。它会在JavaScript不知道你想要的值的情况下出现。例如，如果你忘记给一个变量赋值，它将指向undefined:

然后你可以将它指向另一个值，或者如果你想的话，再次指向undefined。 别太在意它的名字。**人们很容易把undefined看作是某种变量状态，例如“这个变量还没有定义”。但这完全是一种误导**!
实际上，如果读取的变量实际上没有定义(或在let声明之前)，则会得到一个错误

**实际上，undefined是一个常规的原始值，就像2或"hello"。**

### Null

我们的下一站是`null`。你可以把null看作undefined的姐妹值;这种类型只有一个值 - null。它的行为与undefined很相似。例如，当您试图访问它的属性时，它也会引起混乱。

null是它自己的类型的唯一值。然而，null也是一个骗子。由于JavaScript中的一个bug，它假装是一个对象:

```js
console.log(typeof(null)); // "object" (a lie!)
```

您可能认为这意味着null是一个对象。不要落入这个陷阱!它是一个原始值，它的行为方式与对象完全不同。 不幸的是，typeof(null)是一个**历史上的意外**，我们将不得不永远忍受它。

在实践中，null用于故意丢失值。为什么null和undefined都有?这可以帮助您区分编码错误(可能导致未定义)和有效的缺失数据(可能表示为null)。然而，这只是一种约定，JavaScript并没有强制这种用法。有些人会尽量避免这两种情况!

### Booleans

接下来，我们将学习布尔值!像白天和黑夜或开和关一样，只有两个布尔值:true和false。

可以用它们进行逻辑运算

```js
let isSad = true;
let isHappy = !isSad; // The opposite
let isFeeling = isSad || isHappy; // Is at least one of them true?
let isConfusing = isSad && isHappy; // Are both true?
```

![布尔值](https://tva1.sinaimg.cn/large/e6c9d24egy1h0gdwasxrgj20ni0jot9m.jpg)

### Numbers

> 到目前为止，我们已经介绍了四个值:null、undefined、true和false。 坚持住，当我们在我们的心智模型中增加18,000,000,437,000,000,736,874亿，4544,812,624个值的时候!

JavaScript数字与普通数学数字的行为方式不完全相同。

```js
console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2 === 0.30000000000000004); // true
```

> https://0.30000000000000004.com/

1. 这可能看起来非常令人惊讶!与普遍的看法相反，这并不意味着JavaScript的数据被打破了。
2. 这种行为在不同的编程语言中很常见。它甚至还有个名字:浮点数学。
3. 你看，JavaScript并没有实现我们在现实生活中使用的那种数学。浮点数学是“计算机的数学”。
4. 不要太担心这个名字，也不要担心它到底是怎么工作的。很少有人知道它所有的微妙之处，这就是问题的关键!
5. 它在实践中运行得足够好，以至于大多数时候你都不会去想它。尽管如此，让我们快速地看看是什么使它变得不同的

精度有限

JS宇宙中保存不了那么多的number类型的值，因为内存有限

由于计算机内存有限，无论使用[二进制分数](https://floating-point-gui.de/formats/binary/)还是十进制分数，您都无法以无限精度存储数字：在某些时候您必须切断。但是需要多少准确度？它在哪里需要？有多少个整数位和多少个小数位？

为了满足工程师和芯片设计者的要求，数字格式必须为不同数量级的数字提供准确性。但是，只需要_相对_精度。为了让物理学家满意，必须能够进行涉及不同数量级的数字的计算。

基本上，具有固定数量的整数和小数位数是没有用的 - 解决方案是使用_浮点_格式。

#### Special Numbers

值得注意的是，浮点数学包括一些特殊的数字。你可能会遇到NaN，∞，-∞和-0。

```js
let scale = 0;
let a = 1 / scale; // Infinity 无穷大
let b = 0 / scale; // NaN
let c = -a; // -Infinity
let d = 1 / c; // -0
```

您可能会困惑为什么它声称是一个数字

```js
console.log(typeof(NaN)); // "number"
```

然而，这里没有诀窍。从JavaScript的角度来看，**NaN是一个数值**。它不是null, undefined，字符串或其他类型。

但在浮点数学中，这个术语的名称是“非数字”。所以它是一个数值。它碰巧被称为“非数字”，因为它表示一个无效的结果。

使用这些特殊的数字编写代码并不常见。然而，它们可能由于编码错误而出现。所以很高兴知道它们的存在。

### BigInts

普通数字不能精确地表示大整数，因此BigInts填补了这一空白(字面上)。在我们的宇宙中有多少个BigInts ?说明书上说它们有任意的精度。这意味着在我们的JavaScript世界中，有无数个bigint—数学中每个整数对应一个bigint。

BigInts 是最近才添加到 JavaScript 中的，因此您不会看到它们被广泛使用，如果您使用旧版浏览器，它们将无法工作。

```js
let alot = 9007199254740991n; // n at the end makes it a BigInt!
console.log(alot + 1n); // 9007199254740992n
console.log(alot + 2n); // 9007199254740993n
console.log(alot + 3n); // 9007199254740994n
console.log(alot + 4n); // 9007199254740995n
console.log(alot + 5n); // 9007199254740996n
```

### Strings

我们的下一站是字符串，它表示 JavaScript 中的文本。字符串有三种写法（单引号、双引号和反引号），但它们指的是同一个概念。这三个字符串文字产生相同的字符串值

字符串不是对象

每个字符串都有一些内置属性

```js
let cat = 'Cheshire';
console.log(cat.length); // 8
console.log(cat[0]); // "C"
console.log(cat[1]); // "h"
```

这并不意味着字符串就是对象!字符串属性是特殊的，它的行为方式与对象属性不同。例如，您不能将任何内容分配给cat[0]。字符串是基本类型，所有基本类型都是不可变的。

> 在我们的宇宙中，每一个可能的字符串都有一个不同的值。

字符串是否已经“存在”或“创建”的问题不是我们可以从代码中测试的。在我们的心智模型中，这个问题没有任何意义。我们无法建立一个实验来判断字符串在我们的 JavaScript 世界中是“被创建”还是“被召唤”。

为了使我们的心智模型简单，我们将说**所有可能的字符串值从一开始就已经存在——每个不同的字符串都有一个值。**

### Symbol(符号)

知道符号的存在很重要，但如果不深入研究对象和属性，就很难解释它们的作用和行为。符号的用途与门钥匙相似：它们让您隐藏对象内部的一些信息并控制代码的哪些部分可以访问它。它们也相对稀有，所以在这次宇宙之旅中，我们将跳过它们。对不起，符号！

### 小结

心智中了解了7种原始值类型

1. Undefined
2. Null
3. Boolean
4. Number
5. BigInt
6. String
7. Symbol

- 并非所有的数字都能在JavaScript中完美地表示出来。它们的小数部分在接近0时提供了更高的精度，而在远离0时提供了更低的精度。
- 来自无效数学运算的数字，如1 / 0或0 / 0是特殊的。NaN就是这样一个数字。它们可能是由于编码错误而出现的。
- typeof(NaN)是数字，因为NaN是数值。它被称为“非数字”，因为它代表了“无效”数字的概念。

## Meeting Objects and Functions(会见对象与函数)

> 现在我们将介绍非原始值—这些类型可以让我们创建自己的值。

### Objects

> 数组、正则等等非原始值都属于对象类型

```js
console.log(typeof({})); // "object"
console.log(typeof([])); // "object"
console.log(typeof(new Date())); // "object"
console.log(typeof(/\d+/)); // "object"
console.log(typeof(Math)); // "object"
```

与以前不同，对象不是原始值。这也意味着默认情况下，它们是可变的(我们可以更改它们)。我们可以用.或`[]`

创建我们自己的对象

在前面介绍的原始值，我们只能**召唤**它们，而不能自己创造它们，但是对象类型，是我们可以**创造**的

每次使用{}对象**字面量**时，都会创建一个全新的对象值

```js
let shrek = {};
let donkey = {};
```

![Objects](https://tva1.sinaimg.cn/large/e6c9d24egy1h0nh8dw33xj20sg0iat9s.jpg)

我们创造的对象会消失么？

会的，当我们将指向对象的变量（线）指向**null原始值**的时候，我们创造的对象就没有变量指向，JavaScript的垃圾回收机制就在不经意间去回收掉它♻️

### Functions

> 我们定义函数是为了以后可以调用它们并在其中运行代码。然而，要真正理解JavaScript中的函数，**我们需要暂时忘记它们为什么有用**。相反，我们将把函数看作另一种类型的值:数字、对象、函数。

让我们来看看下面的代码，用你现在的心智模型思考一下🤔，它们有什么区别么

```js
for (let i = 0; i < 7; i++) {
  console.log(2);
}
```

传递给log函数的永远只有一个value值就是2

```js
for (let i = 0; i < 7; i++) {
  console.log({});
}
```

这里会创建7个不同的对象类型的值

```js
for (let i = 0; i < 7; i++) {
  console.log(function() {});
}
```

这里同样也会创建7个不同对象类型的值，**因为函数也是对象**

从技术上讲，函数是JavaScript中的对象。**我们将继续将它们作为一个独立的基本类型**，因为与常规对象相比，**它们具有独特的功能**。但一般来说，如果你能对一个对象做些什么，你也能对一个函数做些什么。它们很特别

#### 函数调用

```js
let countDwarves = function() { return 7; };
let dwarves = countDwarves(); // () is a function call
console.log(dwarves);
```

添加`()`会改变代码的含义

- let dwarves = countDwarves表示“将dwarves指向countDwarves当前指向的值。”
- let dwarves = countDwarves()表示“将 dwarves指向countDwarves当前指向的函数返回的值。”

事实上，countDwarves()也是一个表达式。它被称为调用表达式。要“回答”一个调用表达式，JavaScript在函数内部运行代码，并将返回值作为结果交给我们(在本例中是7)。

### 小结

- Objects
- Functions
- 原始值(字符串、数字等等)一直存在于我们的宇宙中。例如，写2或“hello”总是“召唤”相同的数字或字符串值。
- 对象和函数的行为不同，并允许我们生成自己的值。编写{}或function(){}总是会创建一个全新的、不同的值。这个想法对于理解是至关重要的

## 平等的价值

如果您在JavaScript中没有一个明确的平等的心智模型，那么每天都像狂欢节一样——而且不是以一种好的方式。你无法确定你处理的是相同的值，还是两个不同的值。因此，您经常会犯错误——比如更改一个您不打算更改的值。 幸运的是，**我们已经完成了在JavaScript中建立平等概念的大部分工作**。它以一种非常自然的方式符合我们的心智模式。

### Kinds of Equality

在JavaScript中，有几种相等，如果你已经写过JS了，你应该对下面的几种相等不陌生

- **Strict Equality:** `a === b` (triple equals).
- **Loose Equality:** `a == b` (double equals).
- **Same Value Equality:** `Object.is(a, b)`.

#### Object.is(a, b)

在JavaScript中，Object.is(a,b)告诉我们a和b是否有相同的值

尽管方法名是Object.is并不特定于对象。它可以比较任意两个值，不管它们是否是对象!

```js
let dwarves = 7; 
let continents = '7'; 
let worldWonders = 3 + 4;
```

这段代码的心智模型

![心智模型](https://tva1.sinaimg.cn/large/e6c9d24egy1h0od7nvx2wj20vq0g6gmw.jpg)

```js
console.log(Object.is(dwarves, continents)); // ?
console.log(Object.is(continents, worldWonders)); // ?
console.log(Object.is(worldWonders, dwarves)); // ?
```

- false
- false
- true

 - Object.is(dwarves, continents) 是 false 因为 dwarves 和 continents 指向不同的值.
 - Object.is(continents, worldWonders) 是 false 因为 continents 和 worldWonders 指向不同的值.
 - Object.is(worldWonders, dwarves) 是 true 因为 worldWonders 和 dwarves 指向相同的值.

但是对象呢? 到这里，您可能要担心对象了。**您可能听说过等式对对象无效，或者它比较“引用”。如果你有这样的直觉**，那就暂时把它们放在一边。 相反，请看下面的代码片段

```js
let banana = {};
let cherry = banana;
let chocolate = cherry;
cherry = {};
```

> 记住，{}总是表示“创建一个新的对象值”。另外，请记住=的意思是“将左侧的导线指向右侧的值”。

![Objects](https://tva1.sinaimg.cn/large/e6c9d24egy1h0odf6jywcj20qs0gwjs9.jpg)

```js
console.log(Object.is(banana, cherry)); // ?
console.log(Object.is(cherry, chocolate)); // ?
console.log(Object.is(chocolate, banana)); // ?
```

- false
- false
- true

- Object.is(banana, cherry) 是 false 因为 banana 和 cherry 指向不同的值.
- Object.is(cherry, chocolate) 是 false 因为 cherry 和 chocolate 指向不同的值.
- bject.is(chocolate, banana) 是 true 因为 chocolate 和 banana 指向相同的值.

### 严格相等

同值平等与严格平等

Object.is和==有什么区别呢==？

1. Object.is和我们心智模型中的值相等保持一致
2. 严格相同绝大部门情况下也和心智模型一致，但是也有一些特殊情况

这两种不寻常的情况都涉及我们过去讨论过的“特殊数字”：

- NaN === NaN是false，尽管它们的值相同。
- `-0 === 0`并且`0 === -0`是true，尽管它们是不同的值。

#### NaN

```js
let foo = 0 / 0 // NaN
let bar = foo * 2 // NaN
console.log(foo === bar) // false
console.log(Object.is(foo, bar) // true
```

记住 `NaN === NaN` 永远等于false

然而NaN和NaN是同一个值

`Object.is(foo, bar); // true`

判断NaN

- **`Number.isNaN(size)`**
- `Object.is(size, NaN)`

一个简单的历史: [stackoverflow](https://stackoverflow.com/questions/1565164/what-is-the-rationale-for-all-comparisons-returning-false-for-ieee754-nan-values/1573715#1573715) 。确保开发人员能够以这种方式检测 NaN 是使 NaN === NaN 返回 false 的最初原因之一!这是在JavaScript出现之前就决定的

#### -0

> 在普通数学中，没有“负0”这样的概念，但在浮点数学中却存在[实际原因](https://softwareengineering.stackexchange.com/a/280708)。这里有一个有趣的事实。

**Both `0 === -0` and `-0 === 0` are always `true`:**

```js
let width = 0; // 0
let height = -width; // -0
console.log(width === height); // true
```

然而, `0` 和 `-0`不是同一个值:

```js
console.log(Object.is(width, height)); // false
```

![不是同一个值](https://tva1.sinaimg.cn/large/e6c9d24egy1h0ody80zf1j20sc0n6ab7.jpg)

写一个函数strictEquals(a, b)，返回与a === b相同的值。你的实现不能使用或!操作符。

```js
function strictEquals(a, b) {
    if (Object.is(a, b)) {
        if (Object.is(a, NaN) || Object.is(b, NaN)) {
            return false
        } else {
            return true
        }
    } else {
        if ((Object.is(a, -0) && Object.is(b, 0)) ||
            Object.is(b, -0) && Object.is(a, 0)) {
            return true
        } else {
            return false
        }
    }

}  
```

听到这些特殊的数字和他们的行为可能会让人不知所措。不要过分强调这些特殊情况! 它们并不常见。既然你知道它们的存在，你就会在实践中认识到它们。在大多数情况下，我们可以相信Object.is (a, b) 和 a === b。

### 宽松的平等

> 松散等号(双等号)是JavaScript的梦魇。下面是几个让你起鸡皮疙瘩的例子:

```js
console.log([[]] == ''); // true
console.log(true == [1]); // true
console.log(false == [0]); // true
```

松散相等(也称为“抽象相等”)的规则是晦涩难懂的。许多编码标准完全禁止在代码中使用`==`和`!=`。 尽管Just JavaScript对应该或不应该使用哪些特性没有强烈的意见，但我们不会详细讨论松散相等性。它在现代代码库中并不常见，它的规则在语言或我们的思维模式中也没有发挥更大的作用

松散相等规则被广泛认为是JavaScript早期的一个糟糕设计决策，但如果您仍然好奇，可以在这里查看它是如何工作的。不要觉得有压力要记住它——你需要记住其他话题!

然而，即使是==的使用也可能在一些团队中引起争议。在使用==之前，最好讨论一下在团队代码库中可以容忍多少==。

### 小结

> JavaScript有几种等号。它们包括相同价值平等、严格平等和松散平等。

理解这种平等有助于防止错误!
你经常需要知道什么时候你在处理相同的值，什么时候你在处理两个不同的值。
当我们画一个值和变量的图时，相同的值不能出现两次。Object.is(a,b)当变量a和b指向图上相同的值时(a, b)为真。
相同的值，编写起来有点麻烦，但它也是最容易解释的，这就是我们开始使用它的原因
在实践中，您将使用严格相等，或a === b，最常见的。除了两种罕见的特殊情况外，它等价于相同的值相等:

NaN === NaN 是 false, 即使它们是相同的值.

0 === -0 和 -0 === 0 是 true, 但它们是不同的值.

你可以查看 x 是 NaN 通过 Number.isNaN(x).

Loose equality (`==`) 使用一组神秘的规则，通常会被避免.

## Properties(属性)

> 我们之前讨论过Object，例如，这里有一个指向对象值的sherlock变量。我们通过写入{}来创建一个新的对象值

```js
let sherlock = {}
```

然而，对象主要用于将相关数据分组在一起。例如，我们可能想把关于sherlock的不同事实归类，要记住对象**只是将数据封装分组**，**数据并不是属于对象**

```js
let sherlock = {
  surname: 'Holmes',
  age: 64,
};
```

在我们的JavaScript世界中，变量和属性的行为都类似于“连接”。但是，属性的连接是从对象开始的，而不是从代码开始的

![properties](https://tva1.sinaimg.cn/large/e6c9d24egy1h14umnddcvj21120d8mxy.jpg)

在这里，我们可以看到sherlock变量指向我们创建的一个对象。该对象有两个属性。它的surname属性指向“Holmes”字符串值，它的age属性指向64个数字值。

重要的是，属性不包含值——它们指向值! 记住，**我们的宇宙充满了电线**。其中一些从代码(变量)开始，另一些从对象(属性)开始。**所有导线总是指向值**。

### Property Names

在命名属性时要记住的一件重要事情是，**一个对象不能有两个具有相同名称的属性**。例如，我们的对象不能有两个名为age的属性。

**属性名也总是区分大小写**!例如，age和Age从JavaScript的角度来看是两个完全不同的属性。

如果我们事先不知道属性名，但我们在代码中把它作为字符串值，**我们可以使用`[]`“括号表示法”从对象中读取它**

### Assigning to a Property

当我们给属性赋值时会发生什么?

```js
sherlock.age = 65;
```

让我们把这段代码分成左右两部分，用=分隔。

首先，我们找出左边哪根线是sherlock.age

我们跟着sherlock的线，然后选age属性的线

![assignning](https://tva1.sinaimg.cn/large/e6c9d24ely1h15w9wwshyj21060kqwfu.jpg)

注意，我们没有按照age线写上64岁。

我们不关心它的当前值是多少。

在分配语句的左边，我们要找导线本身。 还记得我们选了哪根线吗?让我们继续

接下来，我们找出右边的值:65。

![assigning](https://tva1.sinaimg.cn/large/e6c9d24egy1h14vkqmznij20zs0jwta0.jpg)

现在我们准备好执行任务了。

最后，我们将左侧的导线指向右侧的值

![assign](https://tva1.sinaimg.cn/large/e6c9d24egy1h14vlf7e9oj210o0komyj.jpg)

我们完成了!从现在开始，读sherlock.age是65岁。

### Missing Properties(缺失属性)

> 您可能想知道，如果读取一个不存在的属性会发生什么

```js
let sherlock = { surname: 'Holmes', age: 64 };
console.log(sherlock.boat); // ?
```

**JavaScript使用了一组类似于下面的规则:**

1. 算出点(' . ')前面的部分的值。

2. 如果该值为' null '或' undefined '，则立即抛出错误。

3. 检查对象中是否存在同名属性:

    a.如果**存在**，请使用此属性指向的值回答。

    b.如果**不存在**，则使用' undefined '值回答。

事实上

从根本上说，这是因为每个表达式都需要产生某个值，或者抛出一个错误。其他一些语言在访问不存在的属性时会抛出错误，但JavaScript不是其中之一!

### 小结

- 属性是线——有点像变量。它们都指向值。与变量不同，属性在我们的宇宙中是从`对象`开始的，变量是从`代码`开始的。
- 属性属于特定的对象。一个对象上不能有多个具有相同名称的属性。
- 一般来说，你可以用三个步骤来执行赋值:

1. 找出哪根线在左边
2. 找出右边的值
3. 把导线指向那个值

- 一个表达式

```js
obj.property
```

是分三步计算:

- 找出`.`左边的值
- 如果是 null或undefined，则抛出一个错误。
- 如果该属性存在，结果就是它所指向的值。如果该属性不存在，则结果为undefined 。

注意，这种属性的心理模型仍然有些简化。目前它已经足够好了，但随着您对JavaScript领域的了解越来越多，它还需要进一步扩展。

## Mutation

> 在上一讲属性的模块中，我们介绍了夏洛克·福尔摩斯搬到马里布的秘密，但我们还没有解释它。 这一次，我们将一步一步地浏览代码，并一起绘制图表，以便检查您的心智模型。

### Step 1:声明 Sherlock 变量

```js
let sherlock = {
  surname: 'Holmes',
  address: { city: 'London' }
};
```

#### 没有嵌套的对象

注意，我们这里不是一个，而是两个完全独立的对象。两对花括号表示两个对象。

### Step 2:描述 john变量

```js
let john = {
  surname: 'Watson',
  address: sherlock.address
};
```

#### 属性总是指向值

> 记住:属性总是指向一个值!它不能指向另一个属性或变量。通常，我们宇宙中的所有导线都指向值。

### Step 3:改变属性

```js
john.surname = 'Lennon';
john.address.city = 'Malibu';
```

### Mutation

> 突变是"改变"的一种奇特说法

例如，我们可以说我们`change`了一个对象的属性，或者我们可以说我们`mutated`了那个对象(及其属性)。这是一样的。

人们喜欢说“mutate”，因为这个词有一种不祥的意味。它提醒你要格外小心。这并不意味着突变是“坏的”——它只是编程!但你需要非常有意识的去做。

让我们回顾一下最初的任务。我们想给约翰换个姓，然后把他搬到马里布。现在让我们看看我们的两个`mutations`:

```js
// Step 3: Changing the Properties
john.surname = 'Lennon';
john.address.city = 'Malibu';
```

第一行修改了john所指向的对象。它的意思是:我们想要改变约翰的姓氏。该对象表示John的数据，因此我们改变了它的姓氏属性。

然而，第二行做了一些非常不同的事情。它不会改变john指向的对象。相反，它改变了一个完全不同的对象——我们可以通过john.address访问的对象。如果我们看一下上面我们画的图，我们知道我们将通过sherlock.address和john.address将指向相同的对象!

所以对象只是值的集合，并不是值存在于对象

#### 可能的解决方案:改变另一个对象

```js
// Replace Step 3 with this code:
john.surname = 'Lennon';
john.address = { city: 'Malibu' };
```

#### 替代解决方案:没有对象突变

```js
// Replace Step 3 with this code:
john = {
  surname: 'Lennon',
  address: { city: 'Malibu' }
};
```

### Mutation 是很坏的么

不要以为突变是 "坏事 "就走了。那是一种懒惰的过度简化，掩盖了真正的理解。如果数据随时间变化，某处就会发生变异。问题是，什么应该被突变，在哪里，以及什么时候？

当你突变一个对象时，变量和属性可能已经指向它了。你的突变会影响以后 "跟随 "这些线的任何代码。

这既是一种祝福也是一种诅咒。变异使改变一些数据变得很容易，并能立即在整个程序中 "看到 "这种变化。然而，无纪律的突变使我们更难预测程序会做什么。

有一个学派认为，突变最好被限制在你的应用程序的一个非常狭窄的层。根据这一理念，其好处是你的程序的行为更容易预测。缺点是你要写更多的代码来 "传递东西 "和避免变异。

值得注意的是，突变你刚刚创建的新对象总是可以的，因为现在还没有其他的线指向它们。在其他情况下，我建议你对你要突变的东西和时间要非常谨慎。你对变异的依赖程度取决于你的应用程序的架构。

### 小结

- 在我们的宇宙中，对象从来都是 **不是"嵌套 "的**
- 改变一个对象的属性也被称为**突变**该对象。
- 如果你改变了一个对象，你的代码将通过任何指向该对象的线来 "看到 "这一变化。有时，这可能是你想要的。然而，突变意外的共享数据可能会导致bug。
- 你可以用const而不是let来声明一个变量。这允许你强制这个变量总是指向同一个值。但请记住，const并不能阻止对象的变异！你可以用const来声明一个变量，而不是用let。
- 在代码中突变你刚刚创建的对象是安全的。大体上，你会在多大程度上使用变异取决于你的应用程序的架构。

## prototypes(原型)

> 这里有一个小谜语来检验我们的心智模式

```js
let pizza = {};
console.log(pizza.taste); // "pineapple"
```

> 你觉得可能么？

我们只是用`{}`创建了一个空对象。在`log`之前，我们肯定没有给它设置任何属性，所以看起来pizza.taste不能指向 "pineapple"。我们会期望pizza.taste给我们的是`undefined`，而不是当一个属性不存在的时候，我们通常会得到undefined，对吗？

然而，pizza.taste有可能是 `pineapple`！这可能是一个伪造的例子。这可能是一个矫揉造作的例子，但它表明我们的**心理模型是不完整的**。

那个神秘的`__proto__`属性是什么?

它代表了JavaScript原型的概念。任何JavaScript对象都可以选择另一个对象作为原型。我们将讨论这在实践中意味着什么，但现在，让我们把它看作一个特殊的`__proto__`导线

![prototype](https://tva1.sinaimg.cn/large/e6c9d24egy1h1cvgaz35sj21240kcjsq.jpg)

花点时间来验证图表与代码是否匹配。我们画的和以前一样。唯一的新东西是神秘的`__proto__`电线。 通过指定`__proto__`(也被称为对象的原型)，我们指示JavaScript继续寻找该对象上缺失的属性。

### 原型在行动

我们去找`gwen.teeth`时，我们得到了`undefined`因为`teeth`属性在`Gwen`指向的对象上不存在。 但是由于`__proto__: human`

```js
let human = {
  teeth: 32
};


let gwen = {
  // "Look for other properties here"
  __proto__: human,
  age: 19
};

console.log(gwen.teeth); // 32
```

- S宇宙会去查找`gwen`导线找到指向的对象
- 然后询问对象上是否有`teeth`属性
    - 得到没有的答案
    - 但是有一个原型属性，你可以去找找看
- 于是就继续去原型属性指向的对象查找`teeth`属性
    - 是的，找到了teeth属性指向32
    - 所以 `gwen.teeth`的结果是32

这类似于说，“我不知道，但`XXX`可能知道。使用`__proto__`，你指示JavaScript询问另一个对象

一个对我们JavaScript世界的问题——JavaScript将遵循一系列步骤来回答它。现在我们知道这些步骤包括查看原型。

### Prototype Chain(原型链)

> 原型在JavaScript中并不是一个特殊的“东西”。原型更像是一种关系。一个对象可以指向另一个对象作为它的原型。 这自然会引出一个问题:但是如果我的对象的原型有它自己的原型呢?那个原型有自己的原型吗?会工作吗? 答案是肯定的——这就是它的工作原理!

我们可以看到JavaScript将在对象上搜索属性，然后在对象的原型上搜索属性，然后在对象的原型上搜索属性，以此类推。如果我们没有原型，也没有找到我们的属性，我们就得到`undefined`。

### Shadowing 遮蔽

> 一旦找到我们的属性，我们就停止搜索。

如果你想要检查一个对象是否有它自己的属性线与特定的名称，你可以调用一个内置的函数`hasOwnProperty`。对于“own”属性，它返回true，而不查看原型。

### Assignment

当我们读取对象上不存在的属性时，我们将继续在原型链上查找它。如果我们没有找到它，我们会得到`undefined`.

但是当我们编写一个在我们的对象上不存在的属性时(set)，**它会在我们的对象上创建该属性**。一般来说，**原型不会发挥作用**。

### Object原型

```js
const obj = {}
obj.__proto__ 
```

这是个特殊对象 `Object Prototype`

一直以来，我们都认为{}创建了一个空对象，但它毕竟不是那么空!它有一个隐藏的__proto__线，默认情况下指向对象原型。 这就解释了为什么JavaScript对象似乎有“内置”属性

这些`内置`属性只不过是`对象原型`上的普通属性。因为我们的对象原型是object prototype，所以我们可以访问它们。

```js
const obj = {
	name: 'Sam'
}
obj.hasOwnProperty('name')
obj.toString()
```

### 没有原型的对象

我们刚刚了解到，所有使用`{}`语法创建的对象都有特殊的`__proto__`导线指向一个默认的`对象原型`。但是我们也知道我们可以自定义`__proto__`你可能会想:我们能把它设为`null`吗?

```js
let obj = {
  __proto__: null
};
```

当然可以

```js
console.log(obj.hasOwnProperty); // undefined
console.log(obj.toString); // undefined
```

你可能不想创建这样的对象，但是对象原型正是这样的——一个没有原型的对象。

### 原型污染

现在我们知道，所有JavaScript对象默认情况下都有相同的原型。让我们简要地回顾一下关于突变模块的例子:

```js
let obj = {}; 
obj.__proto__.smell = 'banana';
```

- 像我们刚才做的那样，改变一个共享的原型叫做原型污染。
- 在过去，原型污染是自定义特性扩展JavaScript的一种流行方式。
- 然而，多年来，网络社区意识到它是脆弱的，很难添加新的语言特性，所以我们宁愿避免它

在JavaScript添加类之前，通常是将它们编写为生成对象的函数

```js
function Donut() {
  return { shape: 'round' };
}


let donutProto = {
  eat() {
    console.log('Nom nom nom');
  }
};


let donut1 = Donut();
donut1.__proto__ = donutProto;
let donut2 = Donut();
donut2.__proto__ = donutProto;

donut1.eat();
donut2.eat();
```

这就是为什么JavaScript有一个`new`的关键字。当您将`new`关键字放在Donut()函数调用之前时，会发生两件事

- 该对象是自动创建的，所以您不需要从Donut返回它。(可以这样使用。)
- 该对象的`__proto__`将被设置为你放入函数的prototype属性中的任何值。

```js
function Donut() {
  this.shape = 'round';
}
Donut.prototype = {
  eat() {
    console.log('Nom nom nom');
  }
};


let donut1 = new Donut(); // __proto__: Donut.prototype
let donut2 = new Donut(); // __proto__: Donut.prototype


donut1.eat();
donut2.eat();
```

ES6 Class

```js
class Spiderman {
  lookOut() {
    alert('My Spider-Sense is tingling.');
  }
}

let miles = new Spiderman();
miles.lookOut();
```

Prototype

```js
let SpidermanPrototype = {
  lookOut() {
    alert('My Spider-Sense is tingling.');
  }
};

let miles = { __proto__: SpidermanPrototype };
miles.lookOut();
```

### 小结

- 读取时`obj.something`，如果`obj`没有`something`属性，JavaScript 会查找`obj.__proto__.something`. 然后它会寻找`obj.__proto__.__proto__.something`，依此类推，直到找到我们的属性或到达原型链的末端。
- 写入时`obj.something`，JavaScript 通常会直接写入对象，而不是遍历原型链。
- 我们可以使用它`obj.hasOwnProperty('something')`来确定我们的对象是否有*自己*的属性，称为`something`.
- 我们可以通过变异来“污染”许多对象共享的原型。我们甚至可以对对象原型（对象的默认原型）执行此操作`{}`！（但我们不应该这样做，除非我们在恶作剧我们的同事。）
- 在实践中，您可能不会直接使用原型。但是，它们是 JavaScript 对象的基础，因此理解它们的底层机制很方便。一些高级的 JavaScript 特性，包括类，可以用原型来表达。


## 总结

- 建立一个正确的心智模型，面对一些业务开发问题，游刃有余地解决。
- 面对源码阅读，更好的判断。
- 对于面试，正确的基础才有底气。

## 参考链接

[心智模型](https://sudongyuer.github.io/javascript-mental-models/)

