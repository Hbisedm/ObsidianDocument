---

title: Vue.extend与Vue.component

date: 2022-05-26 12:42:26

tags: ["Vue"]

excerpt: Vue的高级操作

---





# Vue.extend() 传入选项对象 返回构造函数

```js
// Vue.extend() 传入选项对象 返回构造函数
        let myExtend = Vue.extend({
            data(){
                return{
                    name:'jessica'
                } 
            },
            created(){
                this.say()
            },
            methods: {
                say(){
                    console.log('hello guys. say by'+this.name)
                }
            }
        })
  let myComp = new myExtend()
```

# Vue.component('component-name',{options}) 全局注册子组件


```js

// Vue.component('component-name',{options}) 全局注册子组件
        Vue.component('my-component',{
            data(){
                 return {
                     name:'zeng'
                 }
             },
             template:`<span> to {{name}} </span>`,
         }) // option对象
        let vm = new Vue({
            el:'#vm'
        })
```

```js
/ Vue.component('component-name',{options}) 全局注册子组件
//将Vue.component()的第二个参数修改成一个构造器
        let myExennd = Vue.extend({
            data(){
                 return {
                     name:'zeng'
                 }
             },
             template:`<span> to {{name}} </span>`,
         })
        Vue.component('my-component',myExennd) //构造器
        let vm = new Vue({
            el:'#vm'
        })
```

# 结论
Vue.component()接收第二参数的时候，**会判断是构造器还是{options}选项**，如果是后者，**就会隐式调用Vue.extend()返回构造器** 