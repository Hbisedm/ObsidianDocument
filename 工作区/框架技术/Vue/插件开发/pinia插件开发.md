---
title: pinia插件开发的笔记
tags: ["pinia插件开发"]
创建时间: 星期日, 十二月 4日 2022, 10:23:52 晚上
修改时间: 星期日, 十二月 4日 2022, 10:39:55 晚上
---
#pinia #插件

# pinia插件开发的笔记

> 不用有太大心智负担， 安装和vue插件的安装一样的步骤
> 编写插件参考官网即可 主要是拓展每个store的功能

## 主要功能

- 公共属性
- 公共方法
- 限制仓库使用
- 持久化仓库数据

更多功能[参考官网](https://pinia.vuejs.org/core-concepts/plugins.html)

- Add new properties to stores
- Add new options when defining stores
- Add new methods to stores
- Wrap existing methods
- Change or even cancel actions
- Implement side effects like [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- Apply **only** to specific stores


## 参数

主要围绕context, 它有四个参数

  - app vue实例
  - options options参数
  - pinia pinia实例
  - store (常用这个) 当前的store实例

开发一个pinia插件

创建 `@/stores/plugins.ts` 编写插件的主要逻辑

```ts
import { PiniaPluginContext } from "pinia";

export function testPlugins({
  app,
  options,
  pinia,
  store,
}: PiniaPluginContext) {
  // 限制仓库 为 cart 仓库
  if (store.$id === "cart") {
    // console.log("pinia plugins");
    // console.log(options);
    // console.log(JSON.stringify(store));

    // 加入公共方法(其实我觉得没有必要加大开发时的心智负担)
    const initialState = JSON.parse(JSON.stringify(store.$state));
    store.$reset = () => {
      console.log("通过公共方法调用");
      store.$state = JSON.parse(JSON.stringify(initialState));
    };

    // 当然也可以加入公共state
    store.author = "Sam";

    // 变化时，触发
    store.$subscribe((mutation) => {
      // react to store changes
      console.log(mutation);
      console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`);
    });
  }
}
```

## 加入Ts

添加ts类型，开发时体验提示

创建`pinia-plugin.d.ts`

```ts
import "pinia";

declare module "pinia" {
  export interface PiniaCustomProperties<Id, S, G, A> {
    author: string;
  }
}
```

## 安装插件

在 `main.ts` 中添加

```ts
import { createPinia } from "pinia";
import { testPlugins } from "@/stores/plugins.ts";

const pinia = createPinia();
pinia.use(testPlugins); // 和安装vue插件一样的
createApp(app).use(pinia).mount("#app")
```

## 使用

使用某个store时，使用为它拓展的插件功能

```ts
import { useCartStores } from "../stores";

// 使用公共属性 由于加了ts类型 所以开发时，不会有红线
console.log("author: " + stores.author);

// 使用插件的定制公共方法
const handleResetCart = () => {
  stores.$reset();
}
```
