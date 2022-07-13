---
title: Reactive与Ref响应式数据的学习
date: 2022-06-13 22:27:12
tags: ["Vue3", "Reactive", "Ref"]
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

## Ref api

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

