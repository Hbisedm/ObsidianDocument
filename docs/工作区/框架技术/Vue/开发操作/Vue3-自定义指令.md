---
title: Vue3-自定义指令的笔记
tags: ["Vue3", "指令"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 七月 28日 2022, 1:38:14 下午
---
#Vue #指令

# Vue3-自定义指令的笔记

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206151450583.png)

## 基本使用
### 局部
```js
	export default {
		directives: {
            focus: {
                mounted(el) {
                    el.focus()
                }
            }
        },
	}
```
### 全局
```js
const app = createApp(App);

app.directives('focus', {
		mounted(el) {
        	el.focus()
        }
})

```

### 生命周期
> 一个指令的定义对象可以提供几种钩子函数 (都是可选的)：
```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount() {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted() {},
  // 绑定元素的父组件更新前调用
  beforeUpdate() {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated() {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount() {},
  // 绑定元素的父组件卸载后调用
  unmounted() {}
}
```
每个钩子的参数
指令的钩子会传递以下几种参数：

- `el`：指令绑定到的元素。这可以用于直接操作 DOM。

- `binding`：一个对象，包含以下 property。

    - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
    - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
    - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
    - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
    - `instance`：使用该指令的组件实例。
    - `dir`：指令的定义对象。
- `vnode`：代表绑定元素的底层 VNode。

- `prevNode`：之前的渲染中代表指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。


[官网文档](https://staging-cn.vuejs.org/guide/reusability/custom-directives.html#directive-hooks)