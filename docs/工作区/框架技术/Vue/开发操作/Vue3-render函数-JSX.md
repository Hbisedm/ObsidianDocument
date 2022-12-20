---
title: Vue3-render函数的笔记
tags: ["Vue3"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 七月 28日 2022, 1:34:36 下午
---
#Vue #render #Jsx

# Vue3-render函数的笔记


![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206142213052.png)

## render的基本使用
```js

<script>
import { h } from 'vue'
    export default {
        render() {
            return h('h2', {class: 'title'} ,'hello render')
        }
        
    }
</script>
```

```js
<script>
    import { h } from 'vue'
    export default {
        data() {
            return {
                counter: 0
            }
        },
        render() {
            return h('div', {class: 'title'}, [
                h('h2', null, this.counter),
                h('button', { onClick: () => this.counter++ }, '+'),
                h('button', { onClick: () => this.counter-- }, '-')
            ])
        }
    }
</script>
```

```js
    import { ref, h } from 'vue'
 	export default {
        setup() {
            const counter = ref(0)
            return {
                counter
            }
        },
        render() {
            return h('div', {class: 'title'}, [
                h('h2', null, this.counter),
                h('button', { onClick: () => this.counter++ }, '+'),
                h('button', { onClick: () => this.counter-- }, '-')
            ])
        }
    }
```

```js
import { ref, h } from 'vue'
    export default {
        setup() {
            const counter = ref(0)
            return () => {
                return h('div', {class: 'title'}, [
                h('h2', null, counter.value),
                h('button', { onClick: () => counter.value++ }, '+'),
                h('button', { onClick: () => counter.value-- }, '-')
            ])
            }
        },
    }
```

props与slot
```js
<script>
import { h, ref } from 'vue'
import Son  from './04renderSlotS'
    export default {
        setup() {
            const count = ref('by Father')
            return () => {
                return h(Son, { msg: count }, {
                    default: (props) => `default slot, get val: ${props}`,
                })
            }
        }
    }
</script>
```
```js
<script>
    import { h} from 'vue'
    
    export default {
        props: {
            msg: {
                type: String,
                default: 'hello'
            }
        },

        setup(props, {slots}) {
            console.log(props);
            return () => {
                return h('div', null, [
                    h('h2', null, `play render solt, get msg: ${props.msg.value}`),
                    slots.default ? slots.default('from son') : '没有插槽'
                ])
            }
        }
    }
</script>
```


## JSX

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206151135814.png)

原理：jsx->babel->h()
因为h()的可读性太差了。
```js
<script>
    import JsxSon from './05jsxSon.vue'
    import { ref } from 'vue'
    export default {
        setup() {
            const className = 'title'
            const counter = ref(0)
            return {
                className,
                counter,
            }
        },
        render() {
            // 发现setup内return的ref值是自动解包好了的，不需要.value
            const increment = () => {
                this.counter++
            }
            const decrement = () => {
                this.counter--
            }
            return (
                <div>
                    <h2 class={this.className}>hello jsx</h2>
                    <p>counter: {this.counter}</p>
                    <button onClick={increment}>+1</button>
                    <button onClick={decrement}>-1</button>
                    <JsxSon>
                        {
                            {
                                default: props => {
                                    return <div>from jsx father</div>
                                }
                            }
                        }
                    </JsxSon>
                </div>
            )
        }
    }
</script>

<style scoped>
.title {
    color: red;
}
</style>
```

```js
<script>
    export default {
        render() {
            return (
                <div class="son-area">
                    <p>jsx - son</p>
                    <div>{this.$slots.default ? this.$slots.default() : '默认值...'}</div>
                </div>
            )
        }        
    }
</script>

<style scoped>
.son-area {
    background-color: slateblue;
    color: #fff;
    padding: 10px 0;
    margin: 10px 0;
}

</style>
```

jsx优势：任意使用JavaScript代码、对比template灵活性更高、一般封装组件库才用。