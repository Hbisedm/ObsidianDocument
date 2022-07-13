---

title: ESM与CJS

date: 2022-05-25 18:16:56

tags: ["工程化"]

excerpt: 模块化规范.

---



#工程化

# commonJS

node的规范

## exports导出

**强调：exports是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出**
bar.js

```
exports.name = name;
exports.age = age;
exports.sayHello = sayHello;
```

main.js

```
const bar = require('./bar');
```

上面这行代码意味着main中的bar变量等于exports对象；

```
main中的bar = bar中的exports
```

所以，我们可以使用使用bar这个对象

```
const bar = require('./bar');

const name = bar.name;
const age = bar.age;
const sayHello = bar.sayHello;

console.log(name);
console.log(age);

sayHello('kobe');
```

为了进一步论证，bar和exports是同一个对象：

- 所以，bar对象是exports对象的**浅拷贝**；
- 浅拷贝的本质就是一种引用的赋值而已；

## module.exports

我们追根溯源，通过维基百科中对CommonJS规范的解析：

- CommonJS中是没有module.exports的概念的；
- 但是为了实现模块的导出，Node中使用的是Module的类，每一个模块都是Module的一个实例，也就是module；
- 所以在Node中真正用于导出的其实根本不是exports，而是module.exports；
- 因为module才是导出的真正实现者；

但是，为什么exports也可以导出呢？

- 这是因为module对象的exports属性是exports对象的一个引用；
- 也就是说 module.exports = exports = main中的bar；

**注意：真正导出的模块内容的核心其实是module.exports，只是为了实现CommonJS的规范，刚好module.exports对exports对象有一个引用而已；**

![img](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205292127882.png)

- 结论：和exports对象没有任何关系了，exports你随便玩自己的吧；
- module.exports我现在导出一个自己的对象，不带着你玩了；
- 新的对象取代了exports对象的导出，那么就意味着require导入的对象是新的对象； 



![img](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205292128757.png)

## require细节

我们现在已经知道，require是一个函数，可以帮助我们引入一个文件（模块）中导入的对象。

那么，require的查找规则是怎么样的呢？ [node官方文档require](https://nodejs.org/dist/latest-v14.x/docs/api/modules.html#modules_all_together)

## 模块加载顺序

这里我们研究一下模块的加载顺序问题。

- 结论一：模块在被第一次引入时，模块中的js代码会被运行一次
- 结论二：模块被多次引入时，会缓存，最终只加载（运行）一次

> 为什么只会加载运行一次呢？
>
> - 这是因为每个模块对象module都有一个属性：loaded。
> - 为false表示还没有加载，为true表示已经加载；

- 结论三：如果有循环引入，那么加载顺序是什么？

> 如果出现下面模块的引用关系，那么加载顺序是什么呢？
>
> - 这个其实是一种数据结构：图结构；
> - 图结构在遍历的过程中，有深度优先搜索（DFS, depth first search）和广度优先搜索（BFS, breadth first search）；
> - Node采用的是深度优先算法：main -> aaa -> ccc -> ddd -> eee ->bbb

![55f36dbec645630eb35a864be36c0ff6.png](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205291346848.png)

# ES Module

语言的规范

## export有三种方式

1. 定义变量时，抛出

```
export const name = 'Sam' 
```

1. 使用{ }抛出定义的变量、函数

- 注意：这里的 {}里面不是ES6的对象字面量的增强写法，{}也不是表示一个对象的；
- 所以： export {name: name}，是错误的写法；

```
const name = 'Sam' 
export {
    name
}
```

1. 抛出时，可以给个别名

```
const name = 'Sam' 
export {
    name as AModuleName
}
```

## import的三种方式

1. import { 标识符列表 } from ‘module’

- 注意：这里的{}也不是一个对象，里面只是存放导入的标识符列表内容；

```
import {name} from './user_module.js'
```

1. 导入时可以给别名

```
import {name as username} from './user_module.js'
```

1. 将标识符里面所有的功能放到一个模块功能对象内

```
import * as foo from './user_module.js'
console.log(foo.name)
```

## export与import结合

如果从一个模块中导入的内容，我们希望再直接导出出去，这个时候可以直接使用export来导出。

#### bar.js 抛出一个函数

```
export const func = function(a, b) {
    return a + b
}
```

#### foo.js导入bar.js 并抛出去 做了个中转

```
export {func} from './bar.js'
```

#### main.js直接从foo中导入：

```
import {func} from './module/foo.js'
func(1, 2)
```

### 甚至在foo.js中导出时，我们可以变化它的名字

```
export {func as fooFunc} from './bar.js'
```

- 为什么要这样做呢？
  - 在开发和封装一个功能库时，通常我们希望将暴露的所有接口放到一个文件中；
  - 这样方便指定统一的接口规范，也方便阅读；
  - 这个时候，我们就可以使用export和import结合使用 ；

## default(重要‼️)

前面我们学习的导出功能都是有名字的导出（named exports）：

- 在导出export时指定了名字；
- 在导入import时需要知道具体的名字； 还有一种导出叫做默认导出（default export）
- 默认导出export时可以不需要指定名字；
- 在导入时不需要使用 {}，并且可以自己来指定名字；
- 它也方便我们和现有的CommonJS等规范相互操作；

#### 导出：

```
export default function sub(num1, num2) {
  return num1 - num2;
}
```

#### 导入

```
import a from './module/foo.js'
a(1, 2)
```

**注意：在一个模块中，只能有一个默认导出（default export）；**

### import()方法的使用

对于动态加载模块的情况下

> 错误使用 ![e7567502036105c87d19f0590ceb7cdc.png](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205291346856.png)

> 正确使用

aaa.js

```
export function aaa() {
  console.log("aaa被打印");
}
```

bbb.js

```
export function bbb() {
  console.log("bbb被执行");
}
```

main.js

```
let flag = true;
if (flag) {
  import('./modules/aaa.js').then(aaa => {
    aaa.aaa();
  })
} else {
  import('./modules/bbb.js').then(bbb => {
    bbb.bbb();
  })
}
```

## 区别

1. CJS加载文件的过程是在运行时加载的，并且是同步的。
2. ESM加载文件的过程是编译（解析）时加载的，是异步的。
3. CJS 中exports和module.exports同时使用，只会拿module.exports的东西，而ESM的export和export default同时使用都可以拿到
4. CJS是node的规范；ESM是语言层面的规范
5. ESM可在编译期进行Tree Shaking，减少js体积。
6. cjs 模块输出的是一个值的拷贝，esm 输出的是值的引用
7. cjs 模块是运行时加载，esm 是编译时加载