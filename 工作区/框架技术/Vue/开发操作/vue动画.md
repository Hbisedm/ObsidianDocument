---
title: vue动画
date: 2022-06-11 21:07:41
tags: ["Vue", "动画"]
---
#tag

# vue动画的笔记
Vue里面内置一个组件`transition`很好帮助开发者进行动画的操作
## 原理
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206121337916.png)

## 过渡class
在进入/离开的过渡中，会有 6 个 class 切换。

1.  `v-enter-from`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
    
2.  `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
    
3.  `v-enter-to`：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter-from` 被移除)，在过渡/动画完成之后移除。
    
4.  `v-leave-from`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
    
5.  `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
    
6.  `v-leave-to`：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave-from` 被移除)，在过渡/动画完成之后移除。

这里的每个 class 都将以过渡的名字添加前缀。如果你使用了一个没有名字的 `<transition>`，则 `v-` 是这些 class 名的默认前缀。举例来说，如果你使用了 `<transition name="my-transition">`，那么 `v-enter-from` 会替换为 `my-transition-enter-from`。

`v-enter-active` 和 `v-leave-active` 可以控制进入/离开过渡的不同的缓和曲线。

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206121343714.png)

## 动画class
从6个class变成只使用2个`xxx-enter-active`、`xxx-leave-active`

```css
.sam-enter-active {
    animation: samkeyframes 1s ease-in-out;
}
.sam-leave-active {
    animation: samkeyframes 1s ease-in-out reverse;
}

@keyframes samkeyframes {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.4);
    }
    100% {
        transform: scale(1);
    }
}
```

## 同时使用过渡与动画

Vue 为了知道过渡何时完成，必须设置相应的事件监听器。它可以是 `transitionend` 或 `animationend`，这取决于给元素应用的 CSS 规则。如果你只使用了其中一种，Vue 能自动识别其正确类型。

但是，在一些场景中，你需要给同一个元素同时设置两种过渡动效，比如有一个通过 Vue 触发的 CSS 动画，并且在悬停时结合一个 CSS 过渡。在这种情况中，你就需要使用 `type` attribute 并设置 `animation` 或 `transition` 来显式声明你需要 Vue 监听的类型。
```html
<transition name="xxx" type="animation or transition"></transition>
```
## 显性的过渡持续时间

在大多数情况下，Vue 可以自动得出过渡效果的完成时机。默认情况下，Vue 会等待其在过渡效果的根元素的第一个 `transitionend` 或 `animationend` 事件。然而，有时候这也许不是预期的行为——比如，我们也许拥有一个精心编排的一系列过渡效果，其中一些嵌套的内部元素相比于过渡效果的根元素具有延迟的或更长的过渡效果。

在这种情况下你可以用 `<transition>` 组件上的 `duration` prop 显式指定过渡持续时间 (以毫秒计)：
```
<transition :duration="1000">...</transition>
```
你也可以分别指定进入和离开的持续时间：
```
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

## 过渡模式
当`transition`组件内有2个组件需要进行切换时，这个2个的显隐是同时进行的，会显的很丑，那么我们想要第一个元素/组件隐藏后，再显示第二个元素/组件的话。
可以使用`transition`组件的attr：**mode**
mode有2个值，分别是：
-   `in-out`: 新元素先进行进入过渡，完成之后当前元素过渡离开。
-   `out-in`: 当前元素先进行离开过渡，完成之后新元素过渡进入。

> TIP
> 你很快就会发现 `out-in` 是你大多数时候想要的状态 😃


## appear
当我们页面加载的第一次是没有动画效果的，但大部分情况我们想要它有渲染到页面这么个动画效果的话。
设置`transition`attr：appear
默认是`false`
```html
<transition appear="true"></transition>
```



## 结合Animate.css使用
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206121428616.png)
 终端安装animate依赖
 ```bash
npm install animate.css
```
main.js
```js
import { createApp } from "vue";
import App from "./App.vue";
import "animate.css"; //全局引入

createApp(App).mount("#app");
```
在[animate](https://animate.style/)官方上面找自己想要的效果

### 用法1
```css

.sam-leave-active {
    animation: backOutLeft 1s ease;
}
.sam-enter-active {
    animation: rubberBand 1s ease;
}

```

```html
<transition name="sam"></transition>
```

### 用法2
使用`transition`的自定义过渡class类名

我们可以通过以下 attribute 来自定义过渡类名：
-   `enter-from-class`
-   `enter-active-class`
-   `enter-to-class`
-   `leave-from-class`
-   `leave-active-class`
-   `leave-to-class`

```html
<transition
	enter-active-class="animate__animated animate__backInLeft"
	leave-active-class="animate__animated animate__backOutLeft">
	<!-- 元素/组件 -->
</transition>
```

## 动画生命周期
```html
  <transition 
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
    >
     <h2 class="title" v-if="show">hello Sam</h2>
    </transition>
```
```js
		methods: {
            beforeEnter(el) {
                console.log('beforeEnter');
            },
            enter(el, done) {
                console.log('enter');
				done()
            },
            afterEnter(el) {
                console.log('afterEnter');
            },
            beforeLeave(el) {
                console.log('beforeLeave');
            },
            leave(el, done) {
                console.log('leave');
            	done()
			},
            afterLeave(el) {
                console.log('afterLeave');
            }
        }
```
点击显示/隐藏会触发这些钩子函数
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206121519835.png)

这些钩子函数可以结合 CSS transitions/animations 使用，也可以单独使用。

当只用 JavaScript 过渡的时候，在 **`enter` 和 `leave` 钩子中必须使用 `done` 进行回调**。否则，它们将被同步调用，过渡会立即完成。**添加 `:css="false"` 也会让 Vue 会跳过 CSS 的检测，除了性能略高之外，这也可以避免过渡过程中受到 CSS 规则的意外影响。**

## gsap
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206121511575.png)
[gsap官网](https://greensock.com/gsap/)
### 安装
```bash
npm install gsap
```
### 使用
> Vue data状态过渡
```
<input type="number" v-model="count" step="100" />
<p>{{ newNum.toFixed(0) }}</p>

import gsap from 'gsap'
		data() {
            return {
                show: true,
                count: 0,
                newNum: 0
            }
        },
        watch: {
            count(val) {
                gsap.to(this, {
                    duration: 1,
                    newNum: val,
                    duration: 1
                })
            }
        },
```
[参考官网](https://v3.cn.vuejs.org/guide/transitions-state.html#%E7%8A%B6%E6%80%81%E5%8A%A8%E7%94%BB%E4%B8%8E%E4%BE%A6%E5%90%AC%E5%99%A8)
## 列表的过渡
 transition-group的应用
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206121549249.png)
实现数字的增加与删除的动画
```vue
<template>
    <div>
        <p>随机添加/删除数字</p>
        <button @click="addNum">添加数字</button>
        <button @click="removeNum">删除数组</button>
        <transition-group tag="p" name="sam">
            <span class="title" v-for="item of numbers" :key="item">
                {{ item }}
            </span>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name: 'home-a',
        data() {
            return {
                show: true,
                numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        methods: {
            addNum() {
                let length = this.numbers.length;
                this.numbers.splice(this.randomIndex(), 0, length + 1);
            },
            removeNum() {
                this.numbers.splice(this.randomIndex(), 1);
            },
            randomIndex() {
                return Math.floor(Math.random() * this.numbers.length);
        }
    }
}
    
</script>

<style scoped>

.title {
    margin-right: 10px;
    display: inline-block;
}

.sam-enter-active, .sam-leave-active {
    transition: all 1s ease-in-out;
}
/* 数字删除时动画，若不设置，被删除的数字会占用那个位置。 */
.sam-leave-active {
    position: absolute;
}
.sam-enter-from, .sam-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
/* 数字左右移动的动画 */
.sam-move { 
    transition: transform 1s ease-in-out;
}
</style>
```
[参考官网](https://v3.cn.vuejs.org/guide/transitions-list.html#%E5%88%97%E8%A1%A8%E7%9A%84%E8%BF%9B%E5%85%A5-%E7%A6%BB%E5%BC%80%E8%BF%87%E6%B8%A1)

需要注意的是使用 FLIP 过渡的元素不能设置为 `display: inline`。作为替代方案，可以设置为 `display: inline-block` 或者将元素放置于 flex 布局中。

### 交错的过渡
交错也就是一个个元素慢慢的离开or进入页面。不是一个个元素同时离开or进入页面。
```vue
<template>
    <div>
    <div>
        <input v-model="keyword" />
    </div>
    <!-- <transition name="sam"> -->
    <transition-group name="sam" tag="ul" :css="false"
                        @enter="enter"
                        @leave="leave"
                        @before-enter="beforeEnter">
            <li v-for="(item, index) of filterName" :key="item" :data-index="index">
                {{item}}
            </li>
    </transition-group>
    </div>
</template>

<script>
import gsap from 'gsap'
import gsapCore from 'gsap/gsap-core';
    export default {
        name: 'home-a',
        data() {
            return {
                keyword: '',
                names: ['abc', 'def', 'ghi', 'sfa', 'ild', 'bsw', 'fhks'],
            }
        },
        computed: {
            filterName() {
                return this.names.filter(item => item.includes(this.keyword))
            }
        },
        methods: {
            beforeEnter(el) {
                el.style.opacity = 0;
                el.style.height = 0;
            },
            enter(el, done) {
                gsap.to(el, {
                    duration: 1,
                    height: '1.5em',
                    opacity: 1,
                    delay: el.dataset.index * 0.1,
                    onComplete: done
                })
            },
            leave(el, done) {
                gsap.to(el, {
                    duration: 1,
                    height: 0,
                    opacity: 0,
                    delay: el.dataset.index * 0.1,
                    onComplete: done
                })
            },
        }
    }
</script>

<style scoped>

/* .sam-enter-from, .sam-leave-to {
    opacity: 0;
}
.sam-enter-active, .sam-leave-active {
    transition: opacity 1s ease;
} */
</style>
```
使用css没办法做到交错过渡，只能使用js的方式去操作，使用**gsap库**结合**data attr**达到效果。
el.dataset的使用与gsap的delay属性。
[官网文档](https://v3.cn.vuejs.org/guide/transitions-list.html#%E5%88%97%E8%A1%A8%E7%9A%84%E4%BA%A4%E9%94%99%E8%BF%87%E6%B8%A1)