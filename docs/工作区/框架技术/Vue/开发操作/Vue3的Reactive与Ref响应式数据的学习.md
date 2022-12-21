---
title: Reactive与Ref响应式数据的学习的笔记
tags: ["Vue3", "Reactive", "Ref"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期三, 十二月 21日 2022, 1:26:25 下午
---
#reactive #ref

# Reactive与Ref响应式数据的学习的笔记


## Reactive

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206131724030.png)

## Ref

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206131751640.png)

## Ref自动解包
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206131752774.png)



## readOnly


![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206131748017.png)

## 判断Reactive Api
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206132103436.png)

## Ref Api

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206132114738.png)


```vue
<template>
    <div>
        <h1>toRefs api 的使用</h1>
        <div>{{ name }}-{{ age }}</div>
        <div>{{ name1 }}</div>
        <button @click="changeInfo">修改信息</button>
    </div>
</template>

<script>
import { reactive, toRefs, toRef } from 'vue'

    export default {
        setup() {
            const info = reactive({
                name: 'Hbisedm',
                age: 23,
            })
            // 1. toRefs() 将对象的所有属性转换为 ref 对象
            const { name, age } = toRefs(info)

            const name1 = toRef(info, 'name')
            const changeInfo = () => {
                name.value = 'CoderSam'
                age.value = 24
            }

            return {
                name,
                name1,
                age,
                changeInfo
            }
        }
    }
</script>
```

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206132124990.png)

## customRef

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206132218797.png)

> 自定义ref

- track 用于收集依赖
- trigger 用于触发更新

```js
import { customRef } from "vue";

export default function (value, delay = 200) {
  let timeout = null;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}
```

```vue
<template>
    <div>
        <h1>custom-ref-vue-study</h1>
        <input v-model="debounceRef" />
        <p>{{ debounceRef }}</p>
    </div>
</template>

<script>
    import useDebounceRef from '../../hook/useDebounceRef'
    export default {
        setup() {
            const debounceRef = useDebounceRef('123')
            return {
                debounceRef
            }
        }
    }
</script>
```

## 使用层面

`ref` API 虽然在 `<template />` 里使用起来方便，但是在 `<script />` 里进行读取 / 赋值的时候，要一直记得加上 `.value` ，否则 BUG 就来了

`reactive` API 虽然在使用的时候，因为知道它本身是一个对象，所以不会忘记通过 `foo.bar` 这样的格式去操作，但是在 `<template />` 渲染的时候，又因此不得不每次都使用 `foo.bar` 的格式去渲染

那么有没有办法，既可以在编写 `<script />` 的时候不容易出错，在写 `<template />` 的时候又比较简单呢？

于是， `toRef` 和 `toRefs` 因此诞生。

### 什么场景下比较适合使用它们

从便利性和可维护性来说，最好只在功能单一、代码量少的组件里使用，比如一个表单组件，通常表单的数据都放在一个对象里。

当然也可以把所有的数据都定义到一个 `data` 里，再去 `data` 里面取值，但是没有必要为了转换而转换，否则不如使用 Options API 风格。