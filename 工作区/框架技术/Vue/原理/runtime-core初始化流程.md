---
title: runtime-core初始化流程的笔记
tags: ["runtime初始化流程"]
创建时间: 星期四, 八月 25日 2022, 10:34:15 晚上
修改时间: 星期四, 八月 25日 2022, 11:49:56 晚上
---
#Vue #初始化

# runtime-core初始化流程的笔记

> 解析Vue如何把一个JavaScript对象变成一个真实Dom的初始化过程

## 简单理解

```js
createApp(App).mount(rootContainer)
```

createApp创建一个对象, 这个对象是最开始的入口, 其作用是:

- 创建APP的虚拟节点
- mount方法用于挂载到指定的容器(使用render进行挂载)

遍历虚拟节点的children是采用深度优先遍历的原则

## 创建虚拟节点

一个虚拟节点包含这些属性 (最核心的属性)
```ts
const vnode = {
    type, //类型
    props, // props
    key: props && props.key, // key
    children, // 子节点
    component: null, //若是组件的话, 有这个属性
    el: null, // 对应真实DOM
    shapeFlag: getShapeFlag(type), // 虚拟节点类型
}
```

### vnode.type
如果是对象 => 组件类型 `{name: 'App' ...}`
如果是字符串 => Element类型 `"<div>"`

### vnode.shapeFlag
定义这个属性是为了后续处理VNode好判断并进行相对的逻辑处理
```ts
export const enum ShapeFlags {
  ELEMENT = 1, //元素
  STATEFUL_COMPONENT = 1 << 1, // 组件
  TEXT_CHILDREN = 1 << 2, // 文本
  ARRAY_CHILDREN = 1 << 3, // 包含多个子节点的组件或元素
  SLOT_CHILDREN = 1 << 4, // slot
}
```

## Render

render是最开始入口, 里面最核心的方法是`patch` 它是处理所有VNode的统一入口。

### 简单描述patch
```ts
  function patch(n1, n2: any, container: any, parentComponent, anchor) {
	  //...
  }
```

- n1: 老节点
- n2: 新节点
- container: 容器
- parentComponent: 当前patch时父组件实例
- anchor: vnode挂载到真实DOM的锚点


第一次进入patch
- n1肯定为null
- n2为当前的App VNode
- container为挂载到rootContainer
- parentComponent和anchor也肯定为null


判断是组件还是元素
App肯定是组件嘛
进入组件的逻辑
判断是挂载还是更新
第一次进来肯定是挂载嘛, 进入挂载逻辑

开始处理挂载

1. 创建组件实例对象`createComponentInstance` 拿到`componentInstance`
2. `setupComponent(instance)` 安装组件实例, 这里主要处理:

	- `initProps`
	- `initSlots`
	- `setupStatefulComponent` **执行了setup, 并将返回值转成个代理对象**丢到`instance.setupState`
	- `finishComponentSetup` **确认下render函数** 为接下来的`setupRenderEffect`做准备
	处理完毕后

3. `setupRenderEffect` 组件渲染副作用函数, 这里使用响应式系统的`effect` 将渲染的逻辑丢到里面 做依赖收集与触发:


	- 拿组件实例的`proxy`作为调用`render`的this
	- `render`的返回结果是个 子虚拟节点
	- 接下来开始进行对子虚拟节点进行`patch`
	- patch后就拿到`$el`
	- 并将当前组件的`mounted`设置`true`