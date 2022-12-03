---
title: README的笔记
tags: ["README"]
创建时间: 星期六, 十二月 3日 2022, 3:27:27 下午
修改时间: 星期六, 十二月 3日 2022, 9:44:19 晚上
---
#README

# README的笔记

## 命名规范

在 npm 上通常是以 `vue-xxx` 这样带有 vue 关键字的格式命名（比如 [vue-baidu-analytics](https://github.com/chengpeiquan/vue-baidu-analytics)）。

## Vue插件类型

插件通常分为 **全局插件** 和 **单组件插件**

区别在于，全局版本是在 `main.ts` 引入后 `use`，而单组件版本则通常是作为一个组件在 `.vue` 文件里引入使用。

### 全局插件的使用

- 在 Vue 2 ，全局插件是通过 `Vue.use(xxx)` 来启动
- 而现在，则需要通过 `createApp` 的 `use`，既可以单独一行一个 use ，也可以直接链式 use 下去。

#### use参数

| plugin          | opotions   |
| --------------- | ---------- |
| object/function | object     |
| 插件            | 插件的参数 |

#### 写法

```js
// main.ts
import plugin1 from 'plugin1'
import plugin2 from 'plugin2'
import plugin3 from 'plugin3'
import plugin4 from 'plugin4'

createApp(App)
  .use(plugin1)
  .use(plugin2)
  .use(plugin3, {
    // plugin3's options
  })
  .use(plugin4)
  .mount('#app')
```

大部分插件到这里就可以直接启动了，个别插件可能需要通过插件 API 去手动触发，在 npm 包的详情页或者 GitHub 仓库文档上，作者一般会告知使用方法，按照说明书操作即可。

### 单组件插件对使用

单组件的插件，通常自己本身也是一个 Vue 组件（大部分情况下都会打包为 JS 文件，但本质上是一个 Vue 的 Component ）。

#### 写法

和引入组件的方式一样，没有太多的心智负担

```js
<template>
  <!-- 放置组件的渲染标签，用于显示组件 -->
  <ComponentExample />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import logo from '@/assets/logo.png'

// 引入单组件插件
import ComponentExample from 'a-component-example'

export default defineComponent({
  // 挂载组件模板
  components: {
    ComponentExample,
  },
})
</script>
```

## 通用 js/ts 插件

也叫普通插件，这个 “普通” 不是指功能平平无奇，而是指它们无需任何框架依赖，可以应用在任意项目中，属于独立的 Library ，比如 [axios](https://github.com/axios/axios) 、 [qrcode](https://github.com/soldair/node-qrcode) 、[md5](https://github.com/pvorb/node-md5) 等等，在任何技术栈都可以单独引入使用，非 Vue 专属。

通用插件的使用非常灵活，既可以全局挂载，也可以在需要用到的组件里单独引入。

单独引入的方式：

```js
import { defineComponent } from 'vue'
import md5 from '@withtypes/md5'

export default defineComponent({
  setup() {
    const md5Msg = md5('message')
  },
})
```

## 本地插件

插件也不全是来自于网上，有时候针对自己的业务，涉及到一些经常用到的功能模块，也可以抽离出来封装成项目专用的插件

### 封装的目的

举个例子，比如在做一个具备用户系统的网站时，会涉及到手机短信验证码模块，在开始写代码之前，需要先要考虑到这些问题

1. 很多操作都涉及到下发验证码的请求，比如 “登录” 、 “注册” 、 “修改手机绑定” 、 “支付验证” 等等，代码雷同，只是接口 URL 或者参数不太一样

2. 都是需要对手机号是否有传入、手机号的格式正确性验证等一些判断

3. 需要对接口请求成功和失败的情况做一些不同的数据返回，但要处理的数据很相似，都是用于告知调用方当前是什么情况

4. 返回一些 Toast 告知用户当前的交互结果

### 封装方式

- 通用js/ts插件
- vue插件

#### 设计规范与开发案例

`src`创建`libs`文件夹专门放置插件，日常使用时 以`@/libs/foo.ts`这种方式引入，遵循esm规则

#### 例子

开发个正则小工具

```ts
// src/libs/regexp.ts

/**
 * 手机号校验
 * @param phoneNumber - 手机号
 * @returns true=是手机号，false=不是手机号
 */
export function isMob(phoneNumber: number | string): boolean {
  return /^1[3456789]\d{9}$/.test(String(phoneNumber))
}

/**
 * 邮箱校验
 * @param email - 邮箱地址
 * @returns true=是邮箱地址，false=不是邮箱地址
 */
export function isEmail(email: string): boolean {
  return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
    email
  )
}
```

在vue组件中使用

```vue
<script lang="ts">
import { defineComponent } from 'vue'
// 需要用花括号 {} 来按照命名导出时的名称导入
import { isMob, isEmail } from '@libs/regexp'

export default defineComponent({
  setup() {
    // 判断是否是手机号
    console.log(isMob('13800138000')) // true
    console.log(isMob('123456')) // false

    // 判断是否是邮箱地址
    console.log(isEmail('example@example.com')) // true
    console.log(isEmail('example')) // false
  },
})
</script>
```

这样子 未来若加需要or改正则，只需要改一份文件即可。

#### 包含工具及辅助函数

如果主要提供一个独立功能，但还需要提供一些额外的变量或者辅助函数用于特殊的业务场景，那么可以用 `export default` 导出主功能，用 `export` 导出其他变量或者辅助函数。

## 开发vue专属插件

### 文件规范

通常会把这一类文件都归类在 `src` 目录下的 `plugins` 文件夹里，代表存放的是 Plugin 文件（ JS 项目以 `.js` 文件存放， TS 项目以 `.ts` 文件存放）。

调用时使用`@/plugins/foo.ts`

组件开发遵循[vue官方教程](https://cn.vuejs.org/guide/reusability/plugins.html)

### 例子

全局插件开发并启用后，只需要在 `main.ts` 里导入并 `use` 一次，即可在所有的组件内使用插件的功能。

插件支持导出两种格式：函数 和 对象

#### 函数

```js
export default function (app, options) {
  // 逻辑代码...
}
```

#### 对象

```js
export default {
  install: (app, options) => {
    // 逻辑代码...
  },
}
```

不论哪种方式，入口函数都会接受两个入参：

| 参数    | 作用                | 类型                    |
| ------- | ------------------- | ----------------------- |
| app     | createApp生成的实例 | App                     |
| options | 插件初始化的选项    | undefined 或者 一个对象 |

如果需要**在插件初始化时**，传入必要的选项，可以定一个对象作为options传入

```js
// src/main.ts
createApp(App)
  // 注意这里的第二个参数就是插件选项
  .use(customPlugin, {
    foo: 1,
    bar: 2,
  })
  .mount('#app')
```

### 编写插件

#### 定义插件

写个自定义指令

```ts
// src/plugins/directive.ts
import type { App } from 'vue'

// 插件选项的类型
interface Options {
  // 文本高亮选项
  highlight?: {
    // 默认背景色
    backgroundColor: string
  }
}

/**
 * 自定义指令
 * @description 保证插件单一职责，当前插件只用于添加自定义指令
 */
export default {
  install: (app: App, options?: Options) => {
    /**
     * 权限控制
     * @description 用于在功能按钮上绑定权限，没权限时会销毁或隐藏对应 DOM 节点
     * @tips 指令传入的值是管理员的组别 id
     * @example <div v-permission="1" />
     */
    app.directive('permission', (el, binding) => {
      // 假设 1 是管理员组别的 id ，则无需处理
      if (binding.value === 1) return

      // 其他情况认为没有权限，需要隐藏掉界面上的 DOM 元素
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      } else {
        el.style.display = 'none'
      }
    })

    /**
     * 文本高亮
     * @description 用于给指定的 DOM 节点添加背景色，搭配文本内容形成高亮效果
     * @tips 指令传入的值需要是合法的 CSS 颜色名称或者 Hex 值
     * @example <div v-highlight="`cyan`" />
     */
    app.directive('highlight', (el, binding) => {
      // 获取默认颜色
      let defaultColor = 'unset'
      if (
        Object.prototype.toString.call(options) === '[object Object]' &&
        options?.highlight?.backgroundColor
      ) {
        defaultColor = options.highlight.backgroundColor
      }

      // 设置背景色
      el.style.backgroundColor =
        typeof binding.value === 'string' ? binding.value : defaultColor
    })
  },
}
```

#### 使用插件

```ts
// src/main.ts
import { createApp } from 'vue'
import App from '@/App.vue'
import directive from '@/plugins/directive' // 导入插件

createApp(App)
   // 自定义插件
  .use(directive, {
    highlight: {
      backgroundColor: '#ddd',
    },
  })
  .mount('#app')

```

## 全局API挂载变量

对于一些使用频率比较高的插件方法，如果觉得在每个组件里单独导入再用很麻烦，也可以考虑将其挂载到 Vue 上，使其成为 Vue 的全局变量。

**注：接下来的全局变量，都是指 Vue 环境里的全局变量，非 Window 下的全局变量。**

### vue2

定义变量

```js
import Vue from 'vue'
import md5 from 'md5'

Vue.prototype.$md5 = md5
```

使用变量

```js
const md5Msg = this.$md5('message')
```

### vue3

在 Vue 3 ，已经不再支持 `prototype` 这样使用了，在 `main.ts` 里没有了 `Vue`，在组件的生命周期里也没有了 `this`。

如果依然想要挂载全局变量，需要通过全新的 [globalProperties](https://cn.vuejs.org/api/application.html#app-config-globalproperties) 来实现，在使用该方式之前，可以把 `createApp` 定义为一个变量再执行挂载。

定义变量

```ts
import md5 from 'md5'

// 创建 Vue 实例
const app = createApp(App)

// 把插件的 API 挂载全局变量到实例上
app.config.globalProperties.$md5 = md5

// 也可以自己写一些全局函数去挂载
app.config.globalProperties.$log = (text: string): void => {
  console.log(text)
}

app.mount('#app')
```

### 全局api的替代方案

在 Vue 3 实际上并不是特别推荐使用全局变量，Vue 3 比较推荐按需引入使用，这也是在构建过程中可以更好的做到代码优化。

特别是针对 TypeScript ， Vue 作者尤雨溪先生对于全局 API 的相关 PR 说明： [Global API updates](https://github.com/vuejs/rfcs/pull/117) ，也是不建议在 TS 里使用。

那么确实是需要用到一些全局 API 怎么办？

对于一般的数据和方法，建议采用 [Provide / Inject](https://vue3.chengpeiquan.com/communication.html#provide-inject) 方案，在根组件（通常是 **App.vue** ）把需要作为全局使用的数据或方法 Provide 下去，在需要用到的组件里通过 Inject 即可获取到，或者使用 [EventBus](https://vue3.chengpeiquan.com/communication.html#eventbus-new) / [Vuex](https://vue3.chengpeiquan.com/communication.html#vuex-new) / [Pinia](https://vue3.chengpeiquan.com/pinia.html) 等全局通信方案来处理。

> 所以Provide/Inject 一般使用在这种情况下， 这样对于vue3开发中，心智负担也不是很大，每次看inject的时候，可以到app.vue文件中找到对应provide














