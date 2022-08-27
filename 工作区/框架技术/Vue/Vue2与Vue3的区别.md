---
title: Vue2与Vue3的区别的笔记
tags: ["Vue2与Vue3的区别"]
创建时间: 星期四, 八月 25日 2022, 9:17:33 上午
修改时间: 星期六, 八月 27日 2022, 2:13:04 下午
---
#Vue #区别

# Vue2与Vue3的区别的笔记


1. keep-alive
2. 事件


## Keep-alive

### 不同点
vue2
```html
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
```

vue3
```html
    <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
```

### 相同点
- 动态组件 写法一样



## 事件

[emit在vue3移除](https://icode.best/i/03320045873563)


## 响应式