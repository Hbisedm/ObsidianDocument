---
title: v-model的使用
date: 2022-05-26 12:42:26
tags: ["Vue"]
excerpt: v-model
---


## 概念
> v-model是语法糖，v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件

- text 和 textarea 元素使用 value 属性和 input 事件
- checkbox 和 radio 使用 checked 属性和 change 事件
- select 字段将 value 作为 prop 并将 change 作为事件


## vue3  v-model 的使用

vue3中DIY我们自定义组件的v-model
- 可以有多个`v-model`（vue2只能有一个）
- v-model 默认传递给子组件的prop值为modelValue
- v-model默认的修饰符prop值为modelModifiers
- v-model 自定义prop且有修饰符：
>  对于带参数的 `v-model` 绑定，生成的 prop 名称将为 `arg + "Modifiers"`：

父组件：
` v-model:description.capitalize="xxx"`

子组件：
```js
	props: ['description', 'descriptionModifiers'],
  	emits: ['update:description'],
```

### 具体例子：
> Father.vue
```vue
<template>
	<son-vue v-model.mix="title" v-model:msg.mm="msg"></son-vue>
</template>
<script>
import SonVue from './Son.vue'
    export default {
        components: {
            SonVue
        },
        data() {
            return {
                title: 'hello Sam',
                msg: 'hello msg'
            }
        }
}
</script>
```

> Son.vue
```vue
<template>
    <div>
    <p v-pre> 使用:value和@input</p>
    <input :value="modelValue" @input="inputEvent" />
    <p v-pre>使用commputed属性</p>
    <input v-model="computedValue" />
    <p v-pre> v-model:msg</p>
    <input v-model='computedMsg'/>
    </div>
</template>

<script>
    export default {
        props: {
            modelValue: {
                type: String,
                default: '',
                required: true
            },
            msg: {
                type: String,
                default: '',
                required: true
            },
            modelModifiers: {
                default: () => ({})
            },
            msgModifiers: {
                default: () => ({})
            }
        },
        emits:['update:modelValue', 'update:msg'],
        methods: {
            inputEvent: function(event) {
                console.log(event.target.value); //原生操作
                this.$emit('update:modelValue', event.target.value);
            }
        },
        computed: {
            computedValue: {
                get: function() {
                    return this.modelValue;
                },
                set(val) {
					console.log(this.modelModifiers); // {mix: true}
                    this.$emit('update:modelValue', val);
                }
            },
            computedMsg: {
                get: function() {
                    return this.msg;
                },
                set(val) {
					console.log(this.msgModifiers); // {mm: true}
                    this.$emit('update:msg', val);
                }
            }
        }
}
</script>
```

## 参考链接
[vue2 Vue3 v-model 原理](https://juejin.cn/post/7031839103914246181#heading-0)
