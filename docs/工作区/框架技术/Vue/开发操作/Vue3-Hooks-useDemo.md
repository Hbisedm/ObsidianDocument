---
title: Vue3-Hooks-useDemo的笔记
tags: ["Vue3", "Hooks"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 七月 28日 2022, 1:35:41 下午
---
#Vue #Hooks #Use

# Vue3-Hooks-useDemo的笔记
> 一些useXXX的案例

## useCounter
```js
import { ref, computed } from "vue";
export default function () {
  const counter = ref(0);

  const doubleCounter = computed(() => counter.value * 2);

  const increment = () => {
    counter.value++;
  };
  const decrement = () => {
    counter.value--;
  };

  return {
    counter,
    doubleCounter,
    increment,
    decrement,
  };
}

```
## useTitle
```js
import { ref, watch } from "vue";
export default function (title = "title") {
  const titleRef = ref(title);
  document.title = titleRef.value;
  watch(
    titleRef,
    (newTitle) => {
      document.title = newTitle;
    },
    {
      immediate: true,
    }
  );
  return titleRef;
}

```
## useScrollPosition
```js
import { ref } from "vue";
export default function () {
  const scrollX = ref(0);
  const scrollY = ref(0);
  document.addEventListener("scroll", () => {
    scrollX.value = window.scrollX;
    scrollY.value = window.scrollY;
  });
  return {
    scrollX,
    scrollY,
  };
}
```
## useMousePosition
```js
import { ref } from "vue";
export default function (el = window) {
  const mouseX = ref(0);
  const mouseY = ref(0);

  document.addEventListener("mousemove", (e) => {
    if (el.value) {
      el.value.addEventListener("mousemove", (e) => {
        mouseX.value = e.pageX;
        mouseY.value = e.pageY;
      });
    } else {
      mouseX.value = e.pageX;
      mouseY.value = e.pageY;
    }
  });

  return {
    mouseX,
    mouseY,
  };
}
```
## useLocalStorage
```js
// 1个参数 取值
// useLocalStorage(key)
// 2个参数 存值
// useLocalStorage(key, value)
import { ref, watch } from "vue";
export default function (key, value) {
  const data = ref(value);
  if (value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    data.value = JSON.parse(window.localStorage.getItem(key));
  }
  watch(data, (newVal) => {
    window.localStorage.setItem(key, JSON.stringify(newVal));
	// 这个setItme(key，xxx)的key为什么可以拿到function(key,value)的key呢？
	// 闭包、作用域链的概念
  });

  return {
    data,
  };
}
```

## index.js
```js
import useCounter from "./useCounter";
import useTitle from "./useTitle";
import useScrollPosition from "./useScrollPosition";
import useMousePosition from "./useMousePosition";
import useLocalStorage from "./useLocalStorage";

export {
  useCounter,
  useTitle,
  useScrollPosition,
  useMousePosition,
  useLocalStorage,
};
```
将所有hooks放到一个文件内，对外抛出，需要拿哪个，就按需加载哪个。