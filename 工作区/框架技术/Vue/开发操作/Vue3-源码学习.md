---
title: Vue3-源码学习的笔记
tags: ["Vue3", "源码"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 七月 28日 2022, 1:37:43 下午
---
#Vue #源码

# Vue3-源码学习的笔记

## 真实DOM的渲染

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206151721326.png)

## 虚拟节点的优势
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206152054195.png)

## 虚拟DOM的渲染过程
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206152057425.png)

## 三大核心

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206152211830.png)

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206152214226.png)

## 三大系统协同工作

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206152217460.png)

## Mini-Vue
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206160939412.png)

### 渲染系统实现
- h函数，用于返回一个VNode对象
- mount函数，用于将VNode挂载到DOM上
- patch函数，用于对两个VNode进行对比，决定如何处理新的VNode


h函数
```js
const h = (tag, props, children) => {
  // vnode -> js对象 -> {tag, props, children}
  return {
    tag,
    props,
    children,
  };
};
```

mount函数
```js
const mount = (vnode, container) => {
  // vnode -> element
  // 1. 创建出真实的元素，并在vnode上保存它
  const el = (vnode.el = document.createElement(vnode.tag));
  // 2. 处理props
  if (vnode.props) {
    Object.keys(vnode.props).forEach((key) => {
      const value = vnode.props[key];
      if (key.startsWith("on")) {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        if (
          Object.prototype.toString.call(value) === "[object Object]" &&
          key === "style"
        ) {
          let styleWord = "";
          Object.keys(value).forEach((key) => {
            styleWord += key + ":" + value[key] + ";";
          });
          el.setAttribute(key, styleWord);
        } else {
          el.setAttribute(key, value);
        }
      }
    });
  }
  // 3. 处理children
  if (vnode.children) {
    if (typeof vnode.children === "string") {
      el.textContent = vnode.children;
    } else {
      vnode.children.forEach((child) => {
        mount(child, el);
      });
    }
  }
  // 4. 将el挂载到container中
  container.appendChild(el);
};
```
index.html
```html

<body>
    <div id="app"></div>
    <script src="./renderer.js"></script>
    <script>
        // 1.通过h函数来创建一个vnode
        const vnode = h('div', {
            class: 'box',
            style: {
                width: '100px',
                height: '100px',
                'background-color': 'red'
            }
        }, [
            h('span', {
                style: {
                    color: '#000'
                }
            }, 'hello world')
        ])
        console.log(vnode);

        // 2.通过mount函数 将vnode挂载到div#app上
        mount(vnode, document.querySelector('#app'))
    </script>
</body>
```



VNode => 一个JavaScript对象里面有很多属性，最核心就3个属性，分别是 tag、props、children

#### Patch
一个简单的patch函数
- 判断tag是否相同
- 判断props是否相同
- 判断children是否相同
```js
const patch = (n1, n2) => {
  if (n1.tag !== n2.tag) {
    const n1ElParent = n1.el.parentNode;
    n1ElParent.removeChild(n1.el);
    mount(n2, n1ElParent);
  } else {
    // 1. 取出旧节点的element，并保存到新虚拟节点的属性el上
    const el = (n2.el = n1.el);
    // 2. 处理props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    // 2.1 获取新节点上所有的props，并赋值到el上
    for (const key in newProps) {
      const newValue = newProps[key];
      const oldValue = oldProps[key];
      if (newValue !== oldValue) {
        if (key.startsWith("on")) {
          el.addEventListener(key.slice(2).toLowerCase(), newValue);
        } else {
          el.setAttribute(key, newValue);
        }
      }
    }
    // 2.2 获取旧节点上所有的props，并在el上做删除操作
    for (const key in oldProps) {
      const newValue = newProps[key];
      if (!newValue) {
        if (key.startsWith("on")) {
          el.removeEventListener(key.slice(2).toLowerCase(), oldValue);
        } else {
          el.removeAttribute(key);
        }
      }
    }
    // 3. 处理children
    const oldChildren = n1.children || [];
    const newChildren = n2.children || [];
    if (typeof newChildren === "string") {
      // 边界情况
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else {
        el.innerHTML = newChildren;
      }
    } else {
      // 情况二：newChildren是一个数组
      if (typeof oldChildren === "string") {
        el.innerHTML = "";
        newChildren.forEach((child) => {
          mount(child, el);
        });
      } else {
        // oldChildren: [v1, v2, v3]
        // newChildren: [v1, v5, v6, v8, v9]
        // 1. 前面有min个节点，做pathch操作
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }

        // 2. newChildren length > oldChildren length
        if (newChildren.length > oldChildren.length) {
          const newChildrenLength = newChildren.length;
          for (let i = commonLength; i < newChildrenLength; i++) {
            mount(newChildren[i], el);
          }
        }

        // 3. newChildren length < oldChildren length
        if (newChildren.length < oldChildren.length) {
          const oldChildrenLength = oldChildren.length;
          for (let i = commonLength; i < oldChildrenLength; i++) {
            el.removeChild(oldChildren[i].el);
          }
        }
      }
    }
  }
};
```

### 响应式思想
```js
const info = {counter: 100}
function doubleCounter() {
	console.log(info.counter * 2)
}
doubleCounter() // 200

info.counter++ 
doubleCounter() // 202
// 实现不手动执行doubleCounter函数，达到自动的变成202
```


小改进，加入dep一个收集依赖的类。

```js
class Dep {
  constructor() {
    this.subscribers = new Set(); //保证收集的依赖不重复
  }
  addEffect(effect) {
    this.subscribers.add(effect);
  }
  notify() {
    this.subscribers.forEach((effect) => effect());
  }
}

const info = { counter: 100 };
const dep = new Dep();
function doubleCounter() {
  console.log(info.counter * 2);
}
dep.addEffect(doubleCounter);
info.counter++;

dep.notify();
```

以上代码只有一个dep，那么不能控制多个对象和属性，如
```
const info = { name: 'Hbisedm', age: 19}
const div = { width: 100 }
```
若使用上面代码，改变一个对象内的属性，都会运行所有的effect副作用函数。

所以需要把对象以及属性都分别抽离出去。=> Map 这种数据结构适合我们的需求
```js
// Map: key 是字符串
// WeakMap: key 是对象， 弱引用
const targetMap = new WeakMap();


**
 * 每个对象的属性都有一个dep，用来收集依赖
 * @param {对象} target
 * @param {对象的属性} key
 * @returns 依赖收集的实例
 */
function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}
```

那这个getDep方法应该在创建响应式对象的时候就使用
```js

// vue2 Object.defineProperty
function reactive(raw) {
  Object.keys(raw).forEach((key) => {
    const dep = getDep(raw, key);
    
	let value = raw[key];

    Object.defineProperty(raw, key, {
      get() {
		// 收集依赖
        dep.depend();
        return value;
      },
      set(newValue) {
        value = newValue;
		// 调用相应的方法
        dep.notify();
      },
    });
  });
  return raw;
}

```
每次方法调用使用个函数包装下，实现响应式。
```js
let activeEffect = null;
function watchEffect(effect) {
  activeEffect = effect;
  //   dep.depend();
  effect(); // 第一次执行一次 -> 调用它的get -> dep.depend() 写到getter里面
  activeEffect = null;
}
```
#### Reactive
```js
class Dep {
  constructor() {
    this.subscribers = new Set(); //保证收集的依赖不重复
  }
  //   addEffect(effect) {
  //     this.subscribers.add(effect);
  //   }
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }
  notify() {
    this.subscribers.forEach((effect) => effect());
  }
}
let activeEffect = null;
function watchEffect(effect) {
  activeEffect = effect;
  //   dep.depend();
  effect(); // 第一次执行一次 -> 调用它的getter -> dep.depend() 写到getter里面
  activeEffect = null;
}

// Map: key 是字符串
// WeakMap: key 是对象， 弱引用
const targetMap = new WeakMap();

/**
 * 每个对象的属性都有一个dep，用来收集依赖
 * @param {对象} target
 * @param {对象的属性} key
 * @returns 依赖收集的实例
 */
function getDep(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}

// vue2
function reactive(raw) {
  Object.keys(raw).forEach((key) => {
    const dep = getDep(raw, key);
    let value = raw[key];

    Object.defineProperty(raw, key, {
      get() {
        dep.depend();
        return value;
      },
      set(newValue) {
        value = newValue;
        dep.notify();
      },
    });
  });
  return raw;
}

const info = reactive({ counter: 100, name: "张三" });
const div = reactive({ width: 122 });
// const dep = new Dep();
watchEffect(function () {
  console.log("info1:" + info.counter * 2);
});
watchEffect(function () {
  console.log("info2: " + info.name);
});
watchEffect(function () {
  console.log("div1: " + div.width);
});
// dep.addEffect(doubleCounter);

// info.counter++;

// dep.notify();

info.name = "李四";

div.width = 33;


```


reactive： 做数据劫持
getDep：根据对象和key拿到对应的dep实例


#### Reactive vue3
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206161549020.png)

```js

// vue3
function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key);
      dep.depend();
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const dep = getDep(target, key);
      const oldValue = target[key];
      if (oldValue !== value) {
        Reflect.set(target, key, value);
        dep.notify();
      }
      return true;
    },
  });
}
```


## createApp

```js
function createApp(rootComponent) {
  return {
    mount(selector) {
      const container = document.querySelector(selector);
      let isMounted = false;
      let oldVNode = null;

      watchEffect(function () {
        if (!isMounted) {
          oldVNode = rootComponent.render();
          mount(oldVNode, container);
          isMounted = true;
        } else {
          const newVNode = rootComponent.render();
          patch(oldVNode, newVNode);
          oldVNode = newVNode;
        }
      });
    },
  };
}
```

使用上面写的渲染`renderer.js`、响应式系统`reactive.js`、`createApp`

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>
		<div id="app"></div>
		
		<script src="../03响应式系统/reactive.js"></script>
		<script src="../02渲染器实现/renderer.js"></script>
		<script src="./index.js"></script>
		<script>
			const increment = function () {
 App.data.counter++
			}
			const App = {
				data: reactive({
					counter: 0
				}),
				render() {
					return h('div', null, [
						h('h2', null, `counter: ${this.data.counter}`),
						h('button', {
							onClick: increment
						}, '+1')
					])
				}
			}

			const app = createApp(App)
			app.mount('#app')
		</script>
	</body>
</html>
```

## 源码
前往[github vue3](https://github.com/vuejs/core)
执行
```bash
pnpm i
pnpm dev
```
可以发现打包文件在`packages/vue/dist/vue.global.js`
然后在`packages/vue/examples/`创建个demo.html，并引入刚才打包好的vue.global.js
编写html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <template id="sam">
        <div>
            {{msg}}
        </div>
    </template>
    <div id="app"></div>
    <script src="../../dist/vue.global.js"></script>
    <script>
        const App = {
            template: `#sam`,
            setup() {
                return {
                    msg: 'Hello Vue!'
                }
            }
        }
        const app = Vue.createApp(App);
        app.mount("#app");
    </script>
</body>
	
</html>
```
接下来研究下它的这个js文件如何执行的。
