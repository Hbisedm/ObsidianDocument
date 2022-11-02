---
title: Vue八股文
创建时间: 星期二, 十一月 1日 2022, 5:13:10 下午
修改时间: 星期三, 十一月 2日 2022, 9:59:45 晚上
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

## 03-简述 Vue 的生命周期以及每个阶段做的事

必问题目，考查vue基础知识。

### 思路

1. 给出概念
2. 列举生命周期各阶段
3. 阐述整体流程
4. 结合实践
5. 扩展：vue3变化

### 回答范例

1. 每个Vue组件实例被创建后都会经过一系列初始化步骤，比如，它需要数据观测，模板编译，挂载实例到dom上，以及数据变化时更新dom。这个过程中会运行叫做生命周期钩子的函数，以便用户在特定阶段有机会添加他们自己的代码。

2. Vue生命周期总共可以分为8个阶段：**创建前后, 载入前后, 更新前后, 销毁前后**，以及一些特殊场景的生命周期。vue3中新增了三个用于调试和服务端渲染场景。

3. Vue 生命周期流程图

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/779f7121823d4118a5b6ad2aa4007c28~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

4. 结合实践

**beforeCreate**：通常用于插件开发中执行一些初始化任务

**created**：组件初始化完毕，可以访问各种数据，获取接口数据等

**mounted**：dom已创建，可用于获取访问数据和dom元素；访问子组件等。

**beforeUpdate**：此时`view`层还未更新，可用于获取更新前各种状态

**updated**：完成`view`层的更新，更新后，所有状态已是最新

**beforeunmount**：实例被销毁前调用，可用于一些定时器或订阅的取消

**unmounted**：销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器

### 可能的追问

1. setup和created谁先执行？
2. setup中为什么没有beforeCreate和created？

## 04-能说一说双向绑定使用和原理吗

### 题目分析：

双向绑定是`vue`的特色之一，开发中必然会用到的知识点，然而此题还问了实现原理，升级为深度考查。

---

### 思路分析：

1. 给出双绑定义
2. 双绑带来的好处
3. 在哪使用双绑
4. 使用方式、使用细节、vue3变化
5. 原理实现描述

---

### 回答范例：

1. vue中双向绑定是一个指令`v-model`，可以绑定一个响应式数据到视图，同时视图中变化能改变该值。
2. `v-model`是语法糖，默认情况下相当于`:value`和`@input`。使用`v-model`可以减少大量繁琐的事件处理代码，提高开发效率。
3. 通常在表单项上使用`v-model`，还可以在自定义组件上使用，表示某个值的输入和输出控制。
4. 通过`<input v-model="xxx">`的方式将xxx的值绑定到表单元素value上；对于checkbox，可以使用`true-value`和false-value指定特殊的值，对于radio可以使用value指定特殊的值；对于select可以通过options元素的value设置特殊的值；还可以结合.lazy,.number,.trim对v-mode的行为做进一步限定；`v-model`用在自定义组件上时又会有很大不同，vue3中它类似于`sync`修饰符，最终展开的结果是modelValue属性和update:modelValue事件；vue3中我们甚至可以用参数形式指定多个不同的绑定，例如v-model:foo和v-model:bar，非常强大！
5. `v-model`是一个指令，它的神奇魔法实际上是vue的编译器完成的。我做过测试，包含`v-model`的模板，转换为渲染函数之后，实际上还是是value属性的绑定以及input事件监听，事件回调函数中会做相应变量更新操作。编译器根据表单元素的不同会展开不同的DOM属性和事件对，比如text类型的input和textarea会展开为value和input事件；checkbox和radio类型的input会展开为checked和change事件；select用value作为属性，用change作为事件。

---

### 可能的追问：

1. `v-model`和`sync`修饰符有什么区别 [参考](https://juejin.cn/post/7106466969847201799) [参考2](https://juejin.cn/post/7031839103914246181#heading-0) [[v-model]]

	`.sync` 在vue3中是去掉的，它在vue2中表现的功能，可以在`vue3`的`v-model`实现
	`v-model` 在vue2只能一个， 而vue3可以多个

2. 自定义组件使用`v-model`如果想要改变事件名或者属性名应该怎么做


## 05-Vue中如何扩展一个组件

此题属于实践题，考察大家对vue常用api使用熟练度，答题时不仅要列出这些解决方案，同时最好说出他们异同。

### 答题思路：

1. 按照逻辑扩展和内容扩展来列举，

    - 逻辑扩展有：mixins、extends、composition api；

    - 内容扩展有slots；

2. 分别说出他们使用方法、场景差异和问题。

3. 作为扩展，还可以说说vue3中新引入的composition api带来的变化

### 回答范例：

1. 常见的组件扩展方法有：mixins，slots，extends等

2. 混入mixins是分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

3. 插槽主要用于vue组件中的内容分发，也可以用于组件扩展。 如果要精确分发到不同位置可以使用具名插槽，如果要使用子组件中的数据可以使用作用域插槽。

4. 组件选项中还有一个不太常用的选项extends，也可以起到扩展组件的目的

5. 混入的数据和方法**不能明确判断来源**且可能和当前组件内变量**产生命名冲突**，vue3中引入的composition api，可以很好解决这些问题，利用独立出来的响应式模块可以很方便的编写独立逻辑并提供响应式的数据，然后在setup选项中组合使用，增强代码的可读性和维护性。例如：

```js
// 复用逻辑1
function useXX() {}
// 复用逻辑2
function useYY() {}
// 逻辑组合
const Comp = {
   setup() {
      const {xx} = useXX()
      const {yy} = useYY()
      return {xx, yy}
   }
}
```

## 06-子组件可以直接改变父组件的数据么，说明原因

### 分析

这是一个实践知识点，组件化开发过程中有个**单项数据流原则**，不在子组件中修改父组件是个常识问题。

参考文档：[staging.vuejs.org/guide/compo…](https://link.juejin.cn/?target=https%3A%2F%2Fstaging.vuejs.org%2Fguide%2Fcomponents%2Fprops.html%23one-way-data-flow "https://staging.vuejs.org/guide/components/props.html#one-way-data-flow")

### 思路

1. 讲讲单项数据流原则，表明为何不能这么做
2. 举几个常见场景的例子说说解决方案
3. 结合实践讲讲如果需要修改父组件状态应该如何做

### 回答范例

1. 所有的 prop 都使得其父子之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。另外，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你**不**应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器控制台中发出警告。

```js
const props = defineProps(['foo'])
// ❌ 下面行为会被警告, props是只读的!
props.foo = 'bar'
```

2. 实际开发过程中有两个场景会想要修改一个属性：

- **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用**。在这种情况下，最好定义一个本地的 data，并将这个 prop 用作其初始值：

```js
        const props = defineProps(['initialCounter'])
        const counter = ref(props.initialCounter)
```

- **这个 prop 以一种原始的值传入且需要进行转换**。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

```js
        const props = defineProps(['size'])
        // prop变化，计算属性自动更新
        const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

3. 实践中如果确实想要改变父组件属性应该emit一个事件让父组件去做这个变更。注意虽然我们不能直接修改一个传入的对象或者数组类型的prop，但是我们还是能够直接改内嵌的对象或属性。

## 07-Vue要做权限管理该怎么做？控制到按钮级别的权限怎么做？

### 分析

综合实践题目，实际开发中经常需要面临权限管理的需求，考查实际应用能力。

权限管理一般需求是两个：页面权限和按钮权限，从这两个方面论述即可。

![权限](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/631e5a9510f349e488227498ec6212e9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

### 思路

1. 权限管理需求分析：页面和按钮权限
2. 权限管理的实现方案：分后端方案和前端方案阐述
3. 说说各自的优缺点

### 回答范例

1. 权限管理一般需求是**页面权限**和**按钮权限**的管理

2. 具体实现的时候分后端和前端两种方案：

    前端方案会**把所有路由信息在前端配置**，通过路由守卫要求用户登录，用户**登录后根据角色过滤出路由表**。比如我会配置一个`asyncRoutes`数组，需要认证的页面在其路由的`meta`中添加一个`roles`字段，等获取用户角色之后取两者的交集，若结果不为空则说明可以访问。此过滤过程结束，剩下的路由就是该用户能访问的页面，**最后通过`router.addRoutes(accessRoutes)`方式动态添加路由**即可。

    后端方案会**把所有页面路由信息存在数据库**中，用户登录的时候根据其角色**查询得到其能访问的所有页面路由信息**返回给前端，前端**再通过`addRoutes`动态添加路由**信息

    按钮权限的控制通常会**实现一个指令**，例如`v-permission`，**将按钮要求角色通过值传给v-permission指令**，在指令的`moutned`钩子中可以**判断当前用户角色和按钮是否存在交集**，有则保留按钮，无则移除按钮。

3. 纯前端方案的优点是实现简单，不需要额外权限管理页面，但是维护起来问题比较大，有新的页面和角色需求就要修改前端代码重新打包部署；服务端方案就不存在这个问题，通过专门的角色和权限管理页面，配置页面和按钮权限信息到数据库，应用每次登陆时获取的都是最新的路由信息，可谓一劳永逸！




















