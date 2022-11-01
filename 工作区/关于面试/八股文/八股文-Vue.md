---
title: Vue八股文
创建时间: 星期二, 十一月 1日 2022, 5:13:10 下午
修改时间: 星期二, 十一月 1日 2022, 11:11:58 晚上
---

#vue #八股文

# Vue八股文

## 为什么 Vue 3 要舍弃 `Object.defineProperty` ，换成 `Proxy` 呢？

主要原因在于 `Object.defineProperty` 有以下的不足：

1. 无法监听数组下标的变化，通过 `arr[i] = newValue` 这样的操作无法实时响应
2. 无法监听数组长度的变化，例如通过 `arr.length = 10` 去修改数组长度，无法响应
3. 只能监听对象的属性，对于整个对象需要遍历，特别是多级对象更是要通过嵌套来深度监听
4. 使用 `Object.assign()` 等方法给对象添加新属性时，也不会触发更新
5. 更多细节上的问题 …


## 01-Vue组件之间通信方式有哪些

> vue是组件化开发框架，所以对于vue应用来说组件间的数据通信非常重要。 此题主要考查大家vue基本功，**对于vue基础api运用熟练度**。 另外一些边界知识如provide/inject/$attrs则体现了面试者的知识广度。

![通信](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf775050e1f948bfa52f3c79b3a3e538~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)


### 思路分析：

1. 总述知道的所有方式
2. 按组件关系阐述使用场景

### 回答范例：

1. 组件通信常用方式有以下8种：

- props
- `$emit/~~$on~~`
- `~~$children~~/$parent`
- `$attrs/~~$listeners~~`
- ref
- $root
- eventbus
- vuex

2. 根据组件之间关系讨论组件通信最为清晰有效

- 父子组件

    - `props`/`$emit`/`$parent`/`ref`/`$attrs`

- 兄弟组件

    - `$parent`/`$root`/`eventbus`/`vuex`

- 跨层级关系

    - `eventbus`/`vuex`/`provide`+`inject`


### $attrs

一般`$attrs`使用v-bind 传递给孙组件 [[基本知识#V-bind]]

#### 在vue3中的$attrs的变化

```js
$listeners已被删除合并到$attrs中。
$attrs现在包括class和style属性。

也就是说在vue3中$listeners不存在了。vue2中$listeners是单独存在的。
在vue3 $attrs包括class和style属性, vue2中 $attrs 不包含class和style属性。
```

#### 在vue2中的$attrs

```js
在Vue 2中，attrs里面包含着上层组件传递的所有数据(除style和class)
当一个组件声明了prop时候，attrs里面包含除去prop里面的数据剩下的数据。
结合inheritAttrs:false，可以将传递下来的数据应用于其他元素，而不是根元素：
```

#### 调用父组件的方法

1. emit
2. provide/inject [看这个操作](https://juejin.cn/post/6885219313901371399)


## 02-v-if和v-for哪个优先级更高？

### 分析：

此题考查常识，文档中曾有详细说明[v2](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fstyle-guide%2F%23%25E9%2581%25BF%25E5%2585%258D-v-if-%25E5%2592%258C-v-for-%25E7%2594%25A8%25E5%259C%25A8%25E4%25B8%2580%25E8%25B5%25B7%25E5%25BF%2585%25E8%25A6%2581 "https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%BF%85%E8%A6%81")|[v3](https://link.juejin.cn/?target=https%3A%2F%2Fstaging.vuejs.org%2Fstyle-guide%2Frules-essential.html%23avoid-v-if-with-v-for "https://staging.vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for")；也是一个很好的实践题目，项目中经常会遇到，能够看出面试者api熟悉程度和应用能力。

### 思路分析：

1. 先给出结论
2. 为什么是这样的，说出细节
3. 哪些场景可能导致我们这样做，该怎么处理
4. 总结，拔高

### 回答范例：

1. 实践中**不应该把v-for和v-if放一起**

2. 在**vue2中**，**v-for的优先级是高于v-if**，把它们放在一起，输出的渲染函数中可以看出会**先执行循环再判断条件**，哪怕我们只渲染列表中一小部分元素，**也得在每次重渲染的时候遍历整个列表，这会比较浪费**；另外需要注意的是在**vue3中则完全相反，v-if的优先级高于v-for**，所以v-if执行时，它调用的变量还不存在，就会导致异常

3. 通常有两种情况下导致我们这样做：

    - 为了**过滤列表中的项目** (比如 `v-for="user in users" v-if="user.isActive"`)。此时定义一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表即可（比如`users.filter(u=>u.isActive)`）。

    - 为了**避免渲染本应该被隐藏的列表** (比如 `v-for="user in users" v-if="shouldShowUsers"`)。此时把 `v-if` 移动至容器元素上 (比如 `ul`、`ol`)或者外面包一层`template`即可。

4. 文档中明确指出**永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上**，显然这是一个重要的注意事项。

5. 源码里面关于代码生成的部分，能够清晰的看到是先处理v-if还是v-for，顺序上vue2和vue3正好相反，因此产生了一些症状的不同，**但是不管怎样都是不能把它们写在一起的**。


