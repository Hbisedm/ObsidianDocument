---
title: vue3中使用computed与watch的笔记
tags: ["Vue3", "computed", "watch"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 七月 28日 2022, 1:36:05 下午
---
#Vue #computed #watch

# vue3中使用computed与watch的笔记
## Computed

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206132235734.png)

> 注意点：返回的是一个ref对象
> - 函数的话，返回是一个readOnly的ref对象
> - 对象的话，需要设置set方法

```vue
<template>
    <div>
        <h1>ComputedAndWatch Study Vue3</h1>
        <p>{{ computedInfo }}</p>
        <button @click="changeComputedInfo">change computed info</button>
    </div>
</template>

<script>
    import { reactive, computed } from 'vue'
    export default {
        setup() {
            const info = reactive({
                name: 'Hbisedm',
                age: 23,
            })
            // const computedInfo = computed(() => {
            //     return `${info.name}-${info.age}`
            // })
            const computedInfo = computed({
                get() {
                    return `${info.name}-${info.age}`
                },
                set(newVal) {
                    const arr = newVal.split('-')
                    info.name = arr[0]
                    info.age = arr[1]
                }
            })
            const changeComputedInfo = () => {
                computedInfo.value = 'CoderSam-24'
            }
            return {
                computedInfo,
                changeComputedInfo
            }
        }
    }
</script>
```

## Watch
### watchEffect
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206141411940.png)


![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206141410792.png)

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206141444319.png)


![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206141444368.png)


### Watch

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206141448114.png)

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206141609552.png)

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206141613267.png)

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206141613720.png)

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206141616491.png)
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206141618996.png)
