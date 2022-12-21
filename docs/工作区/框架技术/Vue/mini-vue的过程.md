---
title: Mini-vue的搭建过程
tags: mini-vue
创建时间: 星期日, 七月 10日 2022, 2:15:00 下午
修改时间: 星期三, 十二月 21日 2022, 3:03:08 下午
---
#知识输出 #vue3

# Mini-vue的搭建过程

> 整个 mini-vue3渐进式搭建的过程描述

## 搭建环境

- jest
- typescript
- babel

```shell
yarn add typescript --dev

yarn add jest --dev
yarn add --dev @types/jest

yarn add --dev babel-jest @babel/core @babel/preset-env
yarn add --dev @babel/preset-typescript
```

## Esm

在当前工程内使用 esm 模块化，因为当前工程是 node 环境下，可以使用`babel`通过配置 Babel 使其能够兼容当前的 Node 版本。

```js
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
```

使 babel 支持 typescript
将 `@babel/preset-typescript` 添加到 babel.config.js 中的 presets 列表中。

- [jest 配置 babel](https://www.jestjs.cn/docs/getting-started#%E4%BD%BF%E7%94%A8-babel)
- [jest 配置 typescript](https://www.jestjs.cn/docs/getting-started#%E4%BD%BF%E7%94%A8-typescript)

## 实现 Reactive 与 Effect

<span id="effectTest">编写测试用例`effect.spec.ts`</span>

```typescript
describe("effect", () => {
  it("happy", () => {
    const user = reactive({
      age: 10,
    });
    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });
    expect(nextAge).toBe(11);

    user.age++;
    expect(nextAge).toBe(12);
  });
});
```

- 需要拿到响应式对象，然后每次响应式对象的属性发生变化时，对应的副作用函数 effect 也要发生执行。
- 那么先编写响应式对象的测试用例

```typescript
describe("reactive", () => {
  it("happy path", () => {
    const originUser = {
      age: 19,
    };
    const user = reactive(originUser);
    expect(user).not.toBe(originUser);
    expect(user.age).toBe(19);
  });
});
```

可以发现原来的对象和 reactive 函数处理过的 Proxy 对象是 2 个不同的对象

> vue3 采用这种 Proxy 对象处理原始对象变成响应式对象

> 那么创建`reactive.ts`，使用 ES6 的 Proxy 对象 进行处理，`tsconfig.json`>`lib`配置 typescript 编译期才可以识别 ES6 的类型
>

```json
"lib": [
     "DOM",
     "ES6" 
   ]
```

### 响应式对象处理-Reactive

> 想想响应式是为了什么？
> 数据驱动视图，下面的例子的假设视图上的某个元素的值

```typescript
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const res = Reflect.get(target, key);
      // TODO 收集依赖
      return res;
    },
    set(target, key, val) {
      const res = Reflect.set(target, key, val);
      // TODO 触发依赖
      return res;
    },
  });
}
```

这时候我们的`reactive.spec.ts`是可以跑通了，回到一开始的[`effect.spec.ts`](#effectTest),现在需要去实现 effect 函数到达每次响应式对象属性改变，劫持对应的依赖去执行。

```typescript
export function effect(fn) {
  const reactiveEffect = new ReactiveEffect(fn);
  // effect在初始化时会第一次执行一次
  reactiveEffect.run();
}
let activityEffect;
class ReactiveEffect {
  private _fn: any;
  constructor(fn) {
    this._fn = fn;
  }
  run() {
    activityEffect = this;
    this._fn();
  }
}
```

### 依赖收集

- 现在可以测试通过`expect(nextAge).toBe(11);`
- 目前还缺对 对象进行**依赖收集与劫持**
- 抛出疑问：如何进行依赖收集呢？
- 我们刚才对当前对象进行了 `Proxy` 处理，那么我们可以在 `get` 方法内进行依赖收集。
- 在`effect.ts`编写依赖收集的方法 `effect#track`
- 依赖收集就是将当前对象的属性的副作用函数 effect 进行收集，那么每个副作用函数都是没必要重复的，需要使用个 Set 集合进行收集

```typescript
export function track(target, key) {
  // target -> key -> dep
  let depsMap = targetsMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  dep.add(activityEffect);
}
```

依赖收集后，意味着每个对象的属性对应的副作用函数都在对应 set 集合里面了。
未来如果对这个属性**修改**的话，对应的 `Proxy#set` 就可以进行劫持，执行对应的副作用函数。

### 劫持依赖

```typescript
export function trigger(target, key) {
  const depsMap = targetsMap.get(target);
  const dep = depsMap.get(key);
  for (let item of dep) {
    item.run();
  }
}
```

到此[`effect.spec.ts`](#effectTest)可以跑通了。目前的 effect.ts

```typescript
class ReactiveEffect {
  // 这个ReactiveEffect Class目的是抽离出fn的执行
  private _fn: any;
  constructor(fn) {
    this._fn = fn;
  }
  run() {
    activityEffect = this; // 现在的副作用函数
    this._fn();
  }
}

// 临时变量 目的是为了存储当前的effect
let activityEffect;
const targetsMap = new Map();
export function effect(fn) {
  // 触发effect创建一个对象 -> 里面有响应式对象的get会触发track函数（使用个activityEffect变量进行暂存当前这个effect）
  const reactiveEffect = new ReactiveEffect(fn);
  // effect在初始化时会第一次执行一次
  reactiveEffect.run();
}
// 收集依赖
export function track(target, key) {
  // target -> key -> dep
  let depsMap = targetsMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  // 对当前这个effect进行存入set容器，未来的set操作就会去查看当前容器是否有这个属性的依赖，若有则执行与它相关
  dep.add(activityEffect);

  // new Dep()
}
// 触发依赖
export function trigger(target, key) {
  const depsMap = targetsMap.get(target);
  const dep = depsMap.get(key);
  for (let item of dep) {
    item.run();
  }
}
```

## 实现 Effect 返回 Runner

> effect 的返回值 是一个函数，通过运行这个函数，可以再次执行这个 effect 里面的逻辑代码
> 首先编写 effect 返回值的测试用例

```typescript
it("should return runner", () => {
  let testNum = 11;
  const runner = effect(() => {
    testNum++;
    return "foo";
  });
  expect(testNum).toBe(12);
  const foo = runner();
  expect(testNum).toBe(13);
  expect(foo).toBe("foo");
});
```

- 分析：这个 effect 的 fn 函数有个返回值'foo'，当再次运行这个 runner 函数可以拿到这个返回值；并且运行这里的代码，`foo++`
  在 effect.ts 编写对应代码

```typescript
export function effect(fn) {
  // 触发effect创建一个对象 -> 里面有响应式对象的get会触发track函数（使用个activityEffect变量进行暂存当前这个effect）
  const reactiveEffect = new ReactiveEffect(fn);
  // effect在初始化时会第一次执行一次
  reactiveEffect.run();
  // 将当前的Effect对象的run返回出去
  return reactiveEffect.run.bind(reactiveEffect);
}
class ReactiveEffect {
  // 这个ReactiveEffect Class目的是抽离出fn的执行,方便未来依赖收集的操作
  private _fn: any;
  constructor(fn) {
    this._fn = fn;
  }
  run() {
    activityEffect = this;
    // 返回这个用户的fn代码
    return this._fn();
  }
}
```

## 实现 Effect 的 Scheduler

copy vue3 github 的 [scheduler 测试用例](https://github.com/vuejs/core/blob/main/packages/reactivity/__tests__/effect.spec.ts#L680)

```typescript
it("scheduler", () => {
  let dummy;
  let run: any;
  const scheduler = jest.fn(() => {
    run = runner;
  });
  const obj = reactive({ foo: 1 });
  const runner = effect(
    () => {
      dummy = obj.foo;
    },
    { scheduler }
  );
  expect(scheduler).not.toHaveBeenCalled();
  expect(dummy).toBe(1);
  // should be called on first trigger
  obj.foo++;
  expect(scheduler).toHaveBeenCalledTimes(1);
  // should not run yet
  expect(dummy).toBe(1);
  // manually run
  run();
  // should have run
  expect(dummy).toBe(2);
});
```

可以发现 我们原来的 effect 加入个对象，而这个对象里面有 scheduler 属性

- 第一次使用 effect 时，里面的 runner 被执行一次，但是 scheduler 没有被调用
- 但对响应式对象进行 set 操作 update 时，scheduler 被执行一次，而 runner 里面的值没被赋值
- 但执行 run 后里面的值才被执行

那么我们先改写 effect 的构造函数

- 接受一个 options 对象，且里面有个 scheduler 方法

```typescript
export function effect(fn, options: any = {}) {
  // 触发effect创建一个对象 -> 里面有响应式对象的get会触发track函数（使用个activityEffect变量进行暂存当前这个effect）
  const reactiveEffect = new ReactiveEffect(fn, options.scheduler);
  // effect在初始化时会第一次执行一次
  reactiveEffect.run();

  return reactiveEffect.run.bind(reactiveEffect);
}
```

那么改写 ReactiveEffect 的构造函数，public 让它变为公有属性 ？表示它是个可传参数

```typescript
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }

```

接着改变些劫持依赖的代码，也就是 proxy#Set

```typescript
export function trigger(target, key) {
  const depsMap = targetsMap.get(target);
  const dep = depsMap.get(key);
  for (let item of dep) {
    if (item.scheduler) {
      // 当前的effect依赖实例如果有scheduler属性的话，说明effect的构造有传递第二个参数
      item.scheduler();
    } else {
      // 否则执行原来的逻辑
      item.run();
    }
  }
}
```

## Effect 实现 Stop 功能

copy 官方的 测试用例[<https://github.com/vuejs/core/blob/769e5555f9d9004ce541613341652db859881570/packages/reactivity/>**tests**/effect.spec.ts#L783]

```typescript
it("stop", () => {
  let dummy;
  const obj = reactive({ prop: 1 });
  const runner = effect(() => {
    dummy = obj.prop;
  });
  obj.prop = 2;
  expect(dummy).toBe(2);
  stop(runner);
  obj.prop = 3;
  expect(dummy).toBe(2);

  // stopped effect should still be manually callable
  runner();
  expect(dummy).toBe(3);
});
```

> 可以发现我们的 effect 返回值 runner，传入到一个 stop 函数后，这个 runner 里面的代码逻辑就不再自动执行了，会被清空掉，也就是后面的依赖劫持后，会运行 dep 里面的每个 runner，但是这时候的 runner 已经清空了。不再自动帮我们运行这个 runner 了。除非手动运行。

那么如何实现上述功能呢

- 先在 effect 里面创建个 stop 函数，且接受一个 runner 参数
- stop 肯定在 ReactiveEffect 里面去将对应 dep 容器清空对应的 effect
- 那么这个 runner 参数需要有个 ReactiveEffect 的实例对象，**如何拿到这个对象呢**
- 我们可以在 effect()函数的函数体里面实现将当前的这个 runner 携带当前的 ReactiveEffect 实例对象。
- 这样 stop 函数就可以拿到这个 ReactiveEffect 实例对象了，接着调用 ReactiveEffect 的新方法 stop
- stop 里面需要拿到当前的 effect 对应的 dep 容器，**如何拿到这个容器呢**
- 在我们的依赖收集的时候，需要将 effect 传入 dep 容器中
- 这里我们要有个概念，effect 和容器是多对多关系，一个 effect 可以对应多个容器，一个容器也可以对应多个 effect
- 那么在 ReactiveEffect 中新增个数组属性：deps
- 每次依赖收集时 effect 传入 dep 容器后，再将这个 dep 容器 push 到当前 effect 的 deps 数组里面。
- 那么 ReactiveEffect#stop 就可以通过`this.deps`拿到对应的 dep 列表，将每个 dep 里面对应的当前 effect 实例删除掉就行了。
- 这样就测试通过上面的用例。

```typescript
export function effect(fn, options: any = {}) {
  const reactiveEffect = new ReactiveEffect(fn, options.scheduler);
  // effect在初始化时会第一次执行一次
  reactiveEffect.run();
  const runner: any = reactiveEffect.run.bind(reactiveEffect);
  runner._effect = reactiveEffect; // 将当前effect实例对象挂载到runner方法上，下面代码才可以使用
  return runner;
}
```

```typescript
export function stop(runner: any) {
  runner._effect.stop();
}
```

```typescript
// 收集依赖
export function track(target, key) {
  // target -> key -> dep
  let depsMap = targetsMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  dep.add(activityEffect);
  activityEffect.deps.push(dep); // 将当前的dep容器传入到实例的deps数组里面
}
```

```typescript
class ReactiveEffect {
  // 这个ReactiveEffect Class目的是抽离出fn的执行,方便未来依赖收集的操作
  private _fn: any;
  deps = [];
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }
  run() {
    activityEffect = this;
    return this._fn();
  }
  stop() {
    this.deps.forEach((dep: any) => {
      dep.delete(this);
    });
  }
}
```

### 优化代码

ReactiveEffect#stop 里面的 forEach 可以抽离出去

```typescript
// 抽离出 dep容器清空effect的函数
function cleanEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
}
```

```typescript
stop() {
    cleanEffect(this)
  }
```

> 每次代码运行一次 stop 其实后面都不需要再次调用了。那么这个可以给个状态值表示当前调用过了。

```typescript
class ReactiveEffect {
  private clearActivity = true;
  stop() {
    if (this.clearActivity) {
      cleanEffect(this);
      this.clearActivity = false;
    }
  }
}
```

### Stop 的参数

copy 官方的 onStop 测试用例[<https://github.com/vuejs/core/blob/769e5555f9d9004ce541613341652db859881570/packages/reactivity/>**tests**/effect.spec.ts#L820]

```typescript
it("events: onStop", () => {
  const onStop = jest.fn();
  const runner = effect(() => {}, {
    onStop,
  });

  stop(runner);
  expect(onStop).toHaveBeenCalled();
});
```

- 传入一个对象，这个对象里面有个 onStop 函数，当使用 stop 方法时，这个 onStop 也被调用。
- 先在 effect 方法里面将这个 onStop 方法传入到 effect 实例里面
- 接着调用 stop 的时候，调用这个 onStop 就可以实现

```typescript
export function effect(fn, options: any = {}) {
  // 触发effect创建一个对象 -> 里面有响应式对象的get会触发track函数（使用个activityEffect变量进行暂存当前这个effect）
  const reactiveEffect = new ReactiveEffect(fn, options.scheduler);
  extend(reactiveEffect, options);
  //   Object.assign(reactiveEffect, options);
  //   reactiveEffect.onStop = options.onStop;
  // effect在初始化时会第一次执行一次
  reactiveEffect.run();
  const runner: any = reactiveEffect.run.bind(reactiveEffect);
  runner._effect = reactiveEffect;
  return runner;
}
```

> 这里将这个方法使用`Object.assign`赋值给了 effect 的方法，但这样可读性、语义化有点差，将这个 API 方法封装起来，在 src/shared/index.ts

```typescript
export const extend = Object.assign;
```

- 拓展 ReactiveEffect 类，加入 onStop 属性
- 在 stop 方法调用后调用下 onStop 方法

```typescript
class ReactiveEffect {
  // 这个ReactiveEffect Class目的是抽离出fn的执行,方便未来依赖收集的操作
  private _fn: any;
  deps = [];
  onStop?: any;
  private clearActivity = true;
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }
  run() {
    activityEffect = this;
    return this._fn();
  }
  stop() {
    if (this.clearActivity) {
      cleanEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.clearActivity = false;
    }
  }
}
```

## reactive#readonly 的实现

编写 readonly 测试用例

```typescript
describe("readonly", () => {
  it("happy path", () => {
    const original = {
      foo: 1,
    };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).toBe(1);
  });
  it("readonly cannot set", () => {
    const user = {
      age: 23,
    };
    console.warn = jest.fn();
    const readonlyUser = readonly(user);
    readonlyUser.age++; // 触发set
    expect(console.warn).toBeCalled();
  });
});
```

- 当使用 readonly 包裹后的对象，它是个只能读取，不能修改的
- 思路：将 Proxy#set 内的实现去掉，直接返回 true 即可

```typescript
export function readonly(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const res = Reflect.get(target, key);
      track(target, key);
      return res;
    },
    set(target, key, val) {
      return true;
    },
  });
}
```

- 可以发现 readonly 与 reactive 里面的代码逻辑是相同的。
- 可以抽离出 get 方法，且抽出 readonly 的状态，
  - 当为 reactive 时，使用 track 方法
  - readonly 时，不需要使用 track 方法

```typescript
const createGetter = function (isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key);
    // 收集依赖
    if (!isReadonly) {
      track(target, key);
    }
    return res;
  };
};
```

> 因为 get 使用了个 createGetter 方法，为了保持代码可读性，set 也可以使用 createSetter 方法，保持一致

```typescript
const createSetter = function () {
  return function set(target, key, val) {
    const res = Reflect.set(target, key, val);
    // 触发依赖
    trigger(target, key);
    return res;
  };
};
```

```typescript
export function reactive(raw) {
  return new Proxy(raw, {
    get: creategetter(),
    set: createsetter(),
  });
}
export function readonly(raw) {
  return new Proxy(raw, {
    get: createGetter(true),
    set(target, key, val) {
      return true;
    },
  });
}
```

- 每次使用 new Proxy(raw, handeler)里面都是个处理器对象，这个对象也是可以抽离出去
- 创建个`baseHandlers.ts`将这些内容都抽离出来
  - createGetter
  - createSetter
  - handeler

```typescript
const createGetter = function (isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key);
    // 收集依赖
    if (!isReadonly) {
      track(target, key);
    }
    return res;
  };
};
const createSetter = function () {
  return function set(target, key, val) {
    const res = Reflect.set(target, key, val);
    // 触发依赖
    trigger(target, key);
    return res;
  };
};
export const mutableHandlers = {
  get: creategetter(),
  set: createsetter(),
};
export const readonlyHandlers = {
  get: creategetter(),
  set: function (target, key, val) {
    return true;
  },
};
```

```typescript
import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

export function reactive(raw) {
  return new Proxy(raw, mutableHandlers);
}
export function readonly(raw) {
  return new Proxy(raw, readonlyHandlers);
}
```

- 再抽离这个 new Proxy 方法

```typescript
import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

export function reactive(raw) {
  return createActivityObj(raw, mutableHandlers);
}
export function readonly(raw) {
  return createActivityObj(raw, readonlyHandlers);
}
function createActivityObj(raw: any, baseHandlers: any) {
  return new Proxy(raw, baseHandlers);
}
```

- 这样抽离，看起来就很干净

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202207062219745.png)
这里可以抽出去，每次都调用很耗性能

```typescript
const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

export const mutableHandlers = {
  get,
  set,
};
export const readonlyHandlers = {
  get: readonlyGet,
  set: function (target, key, val) {
    return true;
  },
};
```

### 实现 Readonly 对象 Set 时候报警告

这个在 set 的时候，抛出 warn 就可以达到目的，修改 readonlyHandlers 即可

```typescript
export const readonlyHandlers = {
  get: readonlyGet,
  set: function (target, key, val) {
    console.warn(
      `${key}cannot set, beacause current Object is readlony`,
      target
    );
    return true;
  },
};
```

## isReactive 与 isReadonly

判断当前这个对象是不是经过 reactive、readonly 函数封装过的

- 那经过前面的学习，可以知道经过它们包裹的对象，实际上是个 Proxy 对象
- 那么可以使用 Proxy#get 进行判断，使用一个没有存在的 key 值，进行 get 拦截判断即可
- 采用枚举的方式，使得代码的可读性高

`reactive.ts`定义 isReactive、isReadonly 方法

```typescript
export const enum ReactiveFlags {
  IS_REACTIVE = "__v_is_reactive",
  IS_READONLY = "__v_is_readonly",
}
export function isReactive(raw) {
  return !!raw[ReactiveFlags.IS_REACTIVE];
}
export function isReadonly(raw) {
  return !!raw[ReactiveFlags.IS_READONLY];
}
```

`baseHandlers.ts` get()

```typescript
import { ReactiveFlags } from "./reactive";

const createGetter = function (isReadonly = false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    }
    if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    }
    const res = Reflect.get(target, key);
    // 收集依赖
    if (!isReadonly) {
      track(target, key);
    }
    return res;
  };
};
```

## 优化 Stop

```typescript
it("stop", () => {
  let dummy;
  const obj = reactive({ prop: 1 });
  const runner = effect(() => {
    dummy = obj.prop;
  });
  obj.prop = 2;
  expect(dummy).toBe(2);
  stop(runner);
  // obj.prop = 3;
  // get set
  //  obj.prop = obj.prop + 1
  obj.prop++;
  expect(dummy).toBe(2);

  // stopped effect should still be manually callable
  runner();
  expect(dummy).toBe(3);
});
```

将`obj.prop = 3` => `obj.prop++` 发现 jest 通不过。

> 原因是： `obj.prop++` => `obj.prop = obj.prop + 1`
> 这里会 get 后 set 的，那么之前的 get 操作会收集依赖导致 stop 函数运行删除 dep 里面的依赖白删除了。
> 那么就需要在这个 get(track)里面的做手脚。
> 加入个全局变量`shouldTrack`进行判断处理

```typescript
export function track(target, key) {
  // target -> key -> dep
  let depsMap = targetsMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  // 对当前这个effect进行存入set容器，未来的set操作就会去查看当前容器是否有这个属性的依赖，若有则执行与它相关
  if (!activityEffect) return;
  if (!shouldTrack) return; // false do next line
  dep.add(activityEffect);
  activityEffect.deps.push(dep);
}
```

- ReactivityEffect#run 方法内处理下即可

```typescript
 run() {
    activityEffect = this;
    if(!this.clearActivity) {// 若clearActivity为false => 触发get#track => 当前的shouldTrack为false => 不会触发收集依赖
      return this._fn()
    }
    shouldTrack = true
    const result = this._fn() // 执行时，触发里面的响应式对象track方法
    shouldTrack = false
    return result
  }
```

测试通过了，接着就是优化下代码。
发现 track 函数里面这 2 个代码可以放到最前面

```typescript
if (!activityEffect) return;
if (!shouldTrack) return;
```

使用个函数包装起来

```typescript
function isTracking() {
  return shouldTrack && activityEffect !== undefined;
}
```

若 dep 里面包含了 activityEffect 的话，就没有必要继续收集了

```typescript
if (dep.has(activityEffect)) return;
dep.add(activityEffect);
```

目前优化后的代码

```typescript
// 收集依赖
export function track(target, key) {
  if (!isTracking()) return;
  // target -> key -> dep
  let depsMap = targetsMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  if (dep.has(activityEffect)) return;
  // 对当前这个effect进行存入set容器，未来的set操作就会去查看当前容器是否有这个属性的依赖，若有则执行与它相关
  dep.add(activityEffect);
  activityEffect.deps.push(dep);
}
function isTracking() {
  return shouldTrack && activityEffect !== undefined;
}
```

注意点：
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202207082339755.png)

## reactive、readonly 嵌套对象转换功能

编写测试用例

```typescript
it("happy path", () => {
  const original = {
    foo: 1,
    bar: {
      foo: "test",
    },
  };
  const wrapped = readonly(original);
  expect(wrapped).not.toBe(original);
  expect(wrapped.foo).toBe(1);
  expect(isReadonly(wrapped)).toBe(true);
  expect(isReadonly(original)).toBe(false);

  expect(isReadonly(wrapped.bar)).toBe(true); // 对嵌套对象进行判断
  expect(isReadonly(original.bar)).toBe(false);
});
it("happy path", () => {
  const originUser = {
    name: "Hbisedm",
    age: 19,
    friend: {
      name: "Sam",
    },
  };
  const user = reactive(originUser);
  expect(user).not.toBe(originUser);
  expect(user.age).toBe(19);
  expect(isReactive(user)).toBe(true);
  expect(isReactive(originUser)).toBe(false);
  expect(isReactive(user.friend)).toBe(true); // 对嵌套对象进行判断
  expect(isReactive(originUser.friend)).toBe(false);
});
```

- 每次对响应式对象进行取值操作都会触发 get，所以在 get 的逻辑代码里面进行处理即可。
- `baseHandlers.ts#createGetter`判断当前 return 的值是不是对象，若是，则加入 readonly、reactive 操作

```typescript
const res = Reflect.get(target, key);
if (isObject(res)) {
  return isReadonly ? readonly(res) : reactive(res);
}
```

## shallowReadonly 的实现

shallow -> 浅的意思 -> 第一层有 readonly 的特性，里面的对象没有这个特性

```typescript
describe("shallowReadonly", () => {
  test("should not make non-reactive propertiese reactive", () => {
    const props = shallowReadonly({
      n: {
        foo: 1,
      },
    });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.n)).toBe(false);
  });
});
```

> 实现过程： 先在`reactive.ts`内实现`shallowReadonly`方法,在 baseHandlers#createGetter 内加多个参数表示是否为 shallow 状态，若为 shallow 状态则将这个 key 对应的 val 抛出去也不用依赖收集的操作了。

```typescript
export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
  get: shallowReadonlyGet,
});
```

```typescript
function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    }
    if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    }
    const res = Reflect.get(target, key);

    if (shallow) {
      //直接抛出去
      return res;
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }

    // 收集依赖
    if (!isReadonly) {
      track(target, key);
    }
    return res;
  };
}
```

```typescript
export function shallowReadonly(raw) {
  return createActivityObj(raw, shallowReadonlyHandlers);
}
```

## 实现 isProxy

在`reactive.ts`内实现 isProxy 方法，判断是否为`isReadonly`、`isReactive`其中一个

```typescript
export function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
```

## 实现 Ref

copy 官方的测试用例

```typescript
describe("reactivity/ref", () => {
  it("should hold a value", () => {
    const a = ref(1);
    expect(a.value).toBe(1);
    a.value = 2;
    expect(a.value).toBe(2);
  });

  it("should be reactive", () => {
    const a = ref(1);
    let dummy;
    let calls = 0;
    effect(() => {
      calls++;
      dummy = a.value;
    });
    expect(calls).toBe(1);
    expect(dummy).toBe(1);
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
    // same value should not trigger
    a.value = 2;
    expect(calls).toBe(2);
  });

  it("should make nested properties reactive", () => {
    const a = ref({
      count: 1,
    });
    let dummy;
    effect(() => {
      dummy = a.value.count;
    });
    expect(dummy).toBe(1);
    a.value.count = 2;
    expect(dummy).toBe(2);
  });
});
```

- ref 是一个含有 value 的对象
- 当有 effect 的执行时，ref 的 value 也需要被依赖收集起来。修改时，当发现和原来的对象/值一样的话。不触发依赖。
- ref 可以包裹个 obj，将 value 指向个 reactive(obj)即可。

抽离 effect 的 track 与 trigger

```typescript
// 收集依赖
export function track(target, key) {
  if (!isTracking()) return;
  // target -> key -> dep
  let depsMap = targetsMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  trackEffects(dep);
}

export function trackEffects(dep) {
  if (dep.has(activityEffect)) return;
  // 对当前这个effect进行存入set容器，未来的set操作就会去查看当前容器是否有这个属性的依赖，若有则执行与它相关
  dep.add(activityEffect);
  activityEffect.deps.push(dep);
}

// 触发依赖
export function trigger(target, key) {
  const depsMap = targetsMap.get(target);
  const dep = depsMap.get(key);
  triggerEffects(dep);
}
export function triggerEffects(dep) {
  for (let item of dep) {
    if (item.scheduler) {
      // 当前的effect依赖实例如果有scheduler属性的话，说明effect的构造有传递第二个参数
      item.scheduler();
    } else {
      // 否则执行原来的逻辑
      item.run();
    }
  }
}
```

创建 Ref 的类，里面有个`_value`表示当前的 value

```typescript
class RefImpl {
  private _value: any;
  private dep: any = new Set();
  private _rawValue: any;
  constructor(val) {
    this._rawValue = val;
    this._value = isObject(val) ? reactive(val) : val;
  }
  get value() {
    //当使用后没有effect执行。
    if (isTracking()) {
      trackEffects(this.dep);
    }
    return this._value;
  }
  set value(newVal) {
    if (newVal === this._rawValue) return;
    this._rawValue = newVal;
    this._value = isObject(newVal) ? reactive(newVal) : newVal;
    triggerEffects(this.dep);
  }
}
export function ref(value) {
  return new RefImpl(value);
}
```

### 优化代码

- 抽离出 Object.is 到工具包里`shared/index.ts`

```typescript
export const hasChange = Object.is;
```

```typescript
this._value = isObject(newVal) ? reactive(newVal) : newVal;
// 抽离出来
function convert(value) {
  return isObject(value) ? reactive(value) : value;
}
```

## 实现 isRef 与 unRef

测试用例：

```typescript
it("isRef", () => {
  const a = ref(1);
  const b = 1;
  const c = reactive({
    num: 1,
  });
  expect(isRef(a)).toBe(true);
  expect(isRef(b)).toBe(false);
  expect(isRef(c.num)).toBe(false);
});
it("unRef", () => {
  const a = ref(1);
  const b = 1;
  expect(unRef(a)).toBe(1);
  expect(unRef(b)).toBe(1);
});
```

> 分析一下：
>
> - `isRef`是判断当前的值是不是被 ref 函数执行过，那么我们可以使用个`__v_isRef`属性去做判断即可
> - `unRef`是将 ref 函数执行过的值，还原成原来的样子

```typescript
class RefImpl {
  public __v_isRef = true
  ...
}
export function isRef(value) {
  return !!value.__v_isRef;
}
export function unRef(val) {
  return isRef(val) ? val.value : val;
}
```

## 实现 proxyRefs

> 使用 ref 的对象，在 vue3 的 template 里面我们都不用使用 value 去拿值
> 如：const age = ref(23) -> {{age}}

编写测试用例

```typescript
it("proxyRefs", () => {
  const user = {
    age: ref(10),
    name: "Sam",
  };
  const proxyUser = proxyRefs(user);
  expect(user.age.value).toBe(10);
  expect(proxyUser.age).toBe(10);
  expect(proxyUser.name).toBe("Sam");

  proxyUser.age = 20;
  expect(user.age.value).toBe(20);
  expect(proxyUser.age).toBe(20);

  proxyUser.age = ref(10);
  expect(user.age.value).toBe(10);
  expect(proxyUser.age).toBe(10);
});
```

在`ref.ts`中实现`proxyRefs`

```typescript
export function proxyRefs(objectWithRef) {
  return new Proxy(objectWithRef, {
    // key->value ref?ref.value:value
    get(target, key) {
      return unRef(target[key]);
    },
    // set 上一个值是ref，新值不是ref,需要特殊处理
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value);
      } else {
        return Reflect.set(target, key, value);
      }
    },
  });
}
```

## 实现 Computed

computed 函数运行后的值，也 ref 类似，也是需要通过`.value`进行取值。
编写测试用例 happy path

```typescript
it("happy path", () => {
  const user = reactive({
    age: 1,
  });

  const age = computed(() => {
    return user.age;
  });
  expect(age.value).toBe(1);
});
```

- 创建`computed.ts`
- computed 函数接受个 getter 函数，然后创建个 ComputedRefImpl 对象

```typescript
class ComputedRefImpl {
  private _getter: any;
  private _drity: boolean = true;
  constructor(getter) {
    this._getter = getter;
  }
  get value() {
    return this.this._getter();
  }
}
export function computed(getter) {
  return new ComputedRefImpl(getter);
}
```

测试通过，接着开始实现 computed 的一些特性。

- 默认不允许 getter，这点与 effect 不一样
- 缓存性
- 调用引入的响应式对象变量，computed 的 getter 不运行

copy 官方的测试

```typescript
describe("computed", () => {
  it("happy path", () => {
    const user = reactive({
      age: 1,
    });

    const age = computed(() => {
      return user.age;
    });
    expect(age.value).toBe(1);
  });

  it("should compute lazily", () => {
    const value = reactive({
      foo: 1,
    });
    const getter = jest.fn(() => value.foo);
    const cValue = computed(getter);

    // lazy
    expect(getter).not.toHaveBeenCalled();

    expect(cValue.value).toBe(1);
    expect(getter).toHaveBeenCalledTimes(1);

    //   // should not compute again
    cValue.value;
    expect(getter).toHaveBeenCalledTimes(1);

    //   // should not compute until needed
    value.foo = 1;
    expect(getter).toHaveBeenCalledTimes(1);

    //   // now it should compute
    expect(cValue.value).toBe(1);
    expect(getter).toHaveBeenCalledTimes(2);

    // should not compute again
    cValue.value;
    expect(getter).toHaveBeenCalledTimes(2);
  });
});
```

- 使用 ReactiveEffect 对象传入 getter 和 scheduler
- 当触发响应式对象的 trigger 时，有 scheduler 的话就不允许 run
- 防止自动运行 run()，也就是达到，缓存性，没有调用 computedRefImpl#get 的时候不会拿新的值
- 若不使用 ReactiveEffect 去传入 getter 的话，getter 里面的响应式对象若 set 的话，会导致对应 depsMap 找不到对应的依赖从而报错。

```typescript
class ComputedRefImpl {
  private _getter: any;
  private _drity: boolean = true;
  private _value: any;
  private _effect: ReactiveEffect;
  constructor(getter) {
    // 使用ReactiveEffect对象传入getter和scheduler
    // 当触发响应式对象的trigger时，有scheduler的话就不允许run
    // 防止自动运行run()，也就是达到，缓存性，没有调用computedRefImpl#get的时候不会拿新的值
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._drity) {
        this._drity = true;
      }
    });
    this._getter = this._effect;
  }
  get value() {
    if (this._drity) {
      this._drity = false;
      this._value = this._getter.run();
      return this._value;
    }
    return this._value;
  }
}
export function computed(getter) {
  return new ComputedRefImpl(getter);
}
```

## 实现初始化 Component 和 Element 主流程

首先创建个 createApp 函数，返回值是一个对象且这个对象有 mount 方法进行挂载节点。

```typescript
// 传入APP组件
export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 先转为VNode
      // component -> vNode
      // 未来的所有逻辑操作，都基于这个VNode

      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    },
  };
}
```

创建个`vnode.ts` 新建`createVNode`函数来创建虚拟节点。

```typescript
export function createVNode(type, props?, children?) {
  return {
    type,
    props,
    children,
  };
}
```

创建个`h.ts` 新建`h`函数

```typescript
export function h(type, props?, children?) {
  return createVNode(type, props, children);
}
```

h 函数是帮助创建虚拟节点的。

创建`component.ts`构建组件的行为

```typescript
/* 创建组件实例 */
export function createComponentInstance(vnode: any) {
  const component = {
    vnode,
    type: vnode.type,
  };
  return component;
}

export function setupComponent(instance) {
  // TODO
  // initProps
  // initSlots
  setupStatefulComponent(instance);
}
function setupStatefulComponent(instance: any) {
  const Component = instance.type;

  const { setup } = Component;

  // 有可能用户没有写setup
  if (setup) {
    // function -> render
    // Object  -> 注入到当前组件的上下文中
    const setupResult = setup();

    handleSetupResult(instance, setupResult);
  }
}
function handleSetupResult(instance, setupResult: any) {
  // function Object
  // TODO function

  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  const Component = instance.type;
  /*   最后将组件的render方法挂在组件实例身上 */
  if (Component.render) {
    instance.render = Component.render;
  }
}
```

创建`renderer.ts`渲染器函数,vnode 渲染到真实 dom 需要这个函数

```typescript
import { isObject } from "./../shared/index";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  // patch
  patch(vnode, container);
}
function patch(vnode: any, container: any) {
  //去处理组件
  console.log("vnode : ");
  console.log(vnode);

  // 判断是不是element
  if (typeof vnode.type === "string") {
    processElement(vnode, container);
  } else if (typeof vnode.type === "object") {
    processComponent(vnode, container);
  }
}
function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}
function mountElement(vnode: any, container: any) {
  const el = document.createElement(vnode.type);

  const { children, props } = vnode;
  if (typeof children === "string") {
    el.textContent = children;
  } else {
    children.forEach((item) => {
      if (isObject(item)) {
        patch(item, el);
      }
    });
  }

  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }
  container.append(el);
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);
  setupRenderEffect(instance, container);
}
function setupRenderEffect(instance: any, container) {
  const subTree = instance.render();
  console.log("instance");
  console.log(instance);
  patch(subTree, container);
}
```

## 使用 Rollup

构建 ts 项目，生成 esm.js

安装

```shell
yarn add rollup --dev
yarn add tslib --dev
yarn add @rollup/plugin-typescrip --dev
```

创建`rollup.config.js`

```js
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
export default {
  input: "./src/index.ts",
  output: [
    {
      format: "cjs",
      file: pkg.main,
    },
    {
      format: "es",
      file: pkg.module,
    },
  ],
  plugins: [typescript()],
};
```

修改`package.json`

```json
  "main": "lib/mini-vue.cjs.js",
  "module": "lib/mini-vue.esm.js",
  "scripts": {
    "test": "jest",
    "build": "rollup -c rollup.config.js"
  },
```

运行`yarn build --watch`实时构建

最后将生成的`esm.js`导入到`index.html`，里面有个`main.js`和`App.js`

```js
import { h } from "../../lib/mini-vue.esm.js";
export const App = {
  render() {
    return h(
      "div",
      {
        id: "one",
      },
      [
        h(
          "div",
          {
            class: "red",
          },
          "p1"
        ),
        h(
          "div",
          {
            class: "blue",
          },
          "p2"
        ),
      ]
    );
  },

  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
```

```js
import { createApp } from "../../lib/mini-vue.esm.js";
import { App } from "./App.js";
const app = document.querySelector("#app");
createApp(App).mount(app);
```

初步完成运行时环境

## 实现组件代理对象

vue3 中的 render()会碰到`this.$el`或者`this.xxx`setup 函数返回的值

```typescript
function setupStatefulComponent(instance: any) {
  const Component = instance.type;
  /* 实现个代理对象 */
  instance.proxy = new Proxy({ _: instance }, PublicInstanceHandles);
  const { setup } = Component;
  // 有可能用户没有写setup
  if (setup) {
    // function -> render
    // Object  -> 注入到当前组件的上下文中
    const setupResult = setup();
    handleSetupResult(instance, setupResult);
  }
}
```

创建个`componentPublicInstance`具体实现 Proxy 的 get handler

```ts
const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
};
export const PublicInstanceHandles = {
  get({ _: instance }, key) {
    /* setupState */
    const { setupState } = instance;
    if (key in setupState) {
      return setupState[key];
    }
    /* this.$el ... */
    /*     if (key === "$el") {
      return instance.el;
    } */
    /*     if (key in publicPropertiesMap) {
      return publicPropertiesMap[key](instance);
    } */
    const publicGetter = publicPropertiesMap[key];
    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};
```

```ts
function mountElement(vnode: any, container: any) {
  /* 将当前元素的真实el挂载到vnode的el属性 */
  const el = (vnode.el = document.createElement(vnode.type));

  const { children, props } = vnode;
  if (typeof children === "string") {
    el.textContent = children;
  } else {
    children.forEach((item) => {
      if (isObject(item)) {
        patch(item, el);
      }
    });
  }

  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }
  container.append(el);
}
function setupRenderEffect(instance: any, initialVNode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);
  patch(subTree, container);
  /* 组件对应的根element元素遍历后赋予组件实例对象的vnode属性的el属性 */
  initialVNode.el = subTree.el;
}
```

```ts
/* 这里拿到真实dom */
const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
};
```

> 这里的解构赋值 转化有点理解不太来
> 这样的写法，代码可读性高了许多

```ts
instance.proxy = new Proxy({ _: instance }, PublicInstanceHandles);

export const PublicInstanceHandles = {
  get({ _: instance }, key) {
    // 代码块里面拿到instance，就是组件实例对象。
  },
};
```

## 加入 shapeFlag

每次判断当前 vnode 是组件还是元素，这步判断抽离成 flag 对象，为了提高性能，可以通过位运算来判断。
新建`ShapeFlags.ts`来抽离当前 vnode 的类型和它的 children 的

```ts
/*
ShapeFlags = {
  element: true or false,
  stateful: true or false,
  ...
}
*/
export const enum ShapeFlags {
  ELEMENT = 1,
  STATEFUL_COMPONENT = 1 << 1,
  TEXT_CHILDREN = 1 << 2,
  ARRAY_CHILDREN = 1 << 3,
}
```

`vnode.ts`

```ts
import { ShapeFlags } from "./ShapeFlags";

export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    el: null,
    shapeFlag: getShapeFlag(type),
  };

  if (typeof children === "string") {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  } else if (typeof Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  }

  return vnode;
}

function getShapeFlag(type) {
  if (typeof type === "string") {
    return ShapeFlags.ELEMENT;
  } else {
    return ShapeFlags.STATEFUL_COMPONENT;
  }
}
```

这样就将 vnode 和 children 的类型都可以清楚知道了。在需要判断的时候，使用逻辑与运算即可。
如渲染器的 patch 方法

```ts
function patch(vnode: any, container: any) {
  // 判断是不是element
  if (vnode.shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container);
  } else if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container);
  }
}
```

## 实现事件绑定

在 vnode 的 props 传入事件函数，如何把回调绑定到真实节点呢

```js
      {
        id: "one",
        onClick: () => console.log("click"),
      }
```

在渲染器的 mountElement 函数中判断当前的 props 的 key, 使用正则表达式判断是不是事件的 key

```ts
function mountElement(vnode: any, container: any) {
  const el = (vnode.el = document.createElement(vnode.type));

  const { children, props, shapeFlag } = vnode;
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    children.forEach((item) => {
      if (isObject(item)) {
        patch(item, el);
      }
    });
  }

  const isOn = (eventName) => /^on[A-Z]/.test(eventName);

  for (const key in props) {
    const val = props[key];
    if (isOn(key)) {
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, val);
    } else {
      el.setAttribute(key, val);
    }
  }
  container.append(el);
}
```

## 实现组件 Props 的功能

- `setup`接受一个 props 参数
- `render`函数 this.xxx 可以拿到 props 的 key
- props 是 readonly

写个新组件`foo`

```js
import { h } from "../../lib/mini-vue.esm.js";

export const Foo = {
  setup(props) {
    // props.count
    console.log(props);
    // readonly
    props.count++;
    console.log(props);
  },
  render() {
    return h("div", {}, "foo:" + this.count);
  },
};
```

App.js

```js
render() {
  return h('div', {}, [
    h(Foo, {count:1})
  ])
}
```

这里传入一个 props 对象 `{count: 1}`

```ts
export function setupComponent(instance) {
  // 初始化props
  initProps(instance, instance.vnode.props);
  setupStatefulComponent(instance);
}
function setupStatefulComponent(instance: any) {
  const Component = instance.type;

  instance.proxy = new Proxy({ _: instance }, PublicInstanceHandles);

  const { setup } = Component;

  // 有可能用户没有写setup
  if (setup) {
    // function -> render
    // Object  -> 注入到当前组件的上下文中
    const setupResult = setup(instance.props);

    handleSetupResult(instance, setupResult);
  }
}
```

`componentProps.ts`

```ts
export function initProps(componentInstance, rawProps) {
  componentInstance.props = rawProps || {};
}
```

在`component.ts`中先初始化个 props，接着 setup 函数传入 props
这里实现了第一个功能点： setup 传入参数

在 renderer 渲染器中,setupRenderEffect 函数组件实例 render 函数是被组件实例的 proxy call
所以在 proxy 的 get 方法中找 key 是否有在 props 中即可

```ts
function setupRenderEffect(instance: any, initialVNode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);
  console.log("instance");
  console.log(instance);
  patch(subTree, container);
  /* 组件对应的根element元素遍历后赋予真实$el */
  initialVNode.el = subTree.el;
}
```

组件实例代理的 get 逻辑代码

```ts
if (hasOwn(setupState, key)) {
  return setupState[key];
} else if (hasOwn(props, key)) {
  return props[key];
}
```

其中 hasOwn 是来自 shared/index.ts

```ts
export const hasOwn = (thisObj, key) =>
  Object.prototype.hasOwnProperty.call(thisObj, key);
```

完成第二个功能点。

vue3 中 props 是不可写的，这里可以借助响应式对象的 shallowReadonly 函数，将 setup 函数调用时的 props 参数进行包裹一层

```ts
if (setup) {
  // function -> render
  // Object  -> 注入到当前组件的上下文中
  const setupResult = setup(shallowReadonly(instance.props));

  handleSetupResult(instance, setupResult);
}
```

完成第三个功能点

## 实现组件 Emit 功能

子组件 emit 发送事件给父组件`on + eventName`

```ts
  setup(props, { emit }) {
    // props.count
    console.log(props);
    // readonly
    props.count++;
    console.log(props);
    const emitAdd = () => {
      console.log("emitAdd handler");
      emit("add", 1, 2);
      emit("add-foo", 3);
    };
    return {
      emitAdd,
    };
  },
```

setup 传入第二个参数，参数是个对象类型，里面含有 emit

```ts
        h(Foo, {
          count: 1,
          onAdd: (a, b) => {
            console.log("on Add");
            console.log("args", a, b);
          },
          onAddFoo: (a) => {
            console.log("onAddFoo");
            console.log(a);
          },
        }),
```

父组件 props 属性加入 onAdd、onAddFoo 方法

需要做的是将子组件的传入的事件名、参数 传入到父组件 props 的事件属性和参数

先在 component#setupStatefulComponent 的 setup 函数调用传入 emit

```ts
function setupStatefulComponent(instance: any) {
  const Component = instance.type;

  instance.proxy = new Proxy({ _: instance }, PublicInstanceHandles);

  const { setup } = Component;

  // 有可能用户没有写setup
  if (setup) {
    // function -> render
    // Object  -> 注入到当前组件的上下文中
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });

    handleSetupResult(instance, setupResult);
  }
}
```

这个 emit 在组件实例对象定义，里面的 emit 函数抽到`componentEmit.ts`内

```ts
export function createComponentInstance(vnode: any) {
  const component = {
    vnode, // 组件实例的虚拟节点
    type: vnode.type, // 组件实例的name, 因为这个type就是组件
    setupState: {},
    props: {},
    emit: () => {},
  };
  // thisArg是null或undefined，执行作用域的 this 将被视为新函数的 thisArg。
  // component是component#emit的第一个参数
  component.emit = emit.bind(null, component) as () => void;
  return component;
}
```

`componentEmit.ts`

```ts
export function emit(instance, event, ...args) {
  console.table("instance", instance);
  console.log("emit", event);
  const { props } = instance;
  //TPP
  const handler = props[toHandlerKey(camelize(event))];
  handler && handler(...args);
}
```

这里抽离出 转为事件 key-toHandlerKey 转为驼峰-camelize 事件 key 第一个字符转大写-capitalize

```ts
export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, a: string) => {
    return a ? a.toUpperCase() : "";
  });
};
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const toHandlerKey = (str: string) => {
  return "on" + capitalize(str);
};
```

## 组件的 Slots

- 具名插槽
- 作用域插槽

App.js

```js
const fooSlotObj = h(
  Foo,
  {
    count: 1,
  },
  h("p", {}, "Obj Slots 插槽")
);
```

Foo.js

```js
render() {

   return h("div", {}, [
      renderSlots(this.$slots),
    ]);
}

```

- 需要可以拿到 this.$slots
- renderSlots 的实现抽出来，也就是创建虚拟节点

```js
/* PublicInstanceHandles中增加代理`$slots`、组件实例对象增加`slots`属性
组件实例对象的`slots`属性的定义 initSlots 创建个`componentSlots.ts`进行实现， 保证单一原则 */

export function initSlots(instance, children) {
  instance.slots = children;
}
```

可以实现当 slot 为一个值的时候
但如果是个数组，上面的方法就需求改进了

```js
const fooSlotArr = h(
  Foo,
  {
    count: 1,
  },
  [h("p", {}, " Slot Array 1"), h("p", {}, "Slot Array 2")]
);
```

```js
export function initSlots(instance, children) {
  instance.slots = Array.isArray(children) ? children : [children];
}
export function renderSlots(slots: Object) {
  return createVNode("div", {}, slots);
}
```

具名插槽的实现

1. 具体指定位置
2. 具体内容

定义的时候，传入参数 name 指定位置(子组件)

使用的时候，传入参数，指定内容(父组件)

作用域插槽的实现(子组件传递给父组件值)
写成函数的形式，调用时传入值。

App.js

```js
const fooSlotHasName = h(
  Foo,
  {
    count: 1,
  },
  {
    header: ({ age }) => {
      return h("p", {}, " Slot Array 1 get slot age: " + age);
    },
    footer: () => h("p", {}, "Slot Array 2"),
  }
);
```

Foo.js

```js
return h("div", {}, [
  renderSlots(this.$slots, "header", { age }),
  foo,
  renderSlots(this.$slots, "footer"),
]);
```

修改`renderSlots`
这里拿到函数，才可以将子组件的值传过去给父组件

```ts
export function renderSlots(slots: Object, name: string, props) {
  let slot = slots[name];
  if (slot) {
    if (typeof slot === "function") {
      const vnode = createVNode("div", {}, slot(props));
      return vnode;
    }
  }
}
```

`initProps`修改为函数运行的方式，使得 renderSlot 拿到的是函数的形式

```ts
function normalizeObjectSlots(children: any, slots: any) {
  // let slots = {};
  if (children)
    for (let key in children) {
      // footer: () => h("p", {}, "Slot Array 2"),
      const value = children[key]; //这里value是父组件定义的 () => h() 箭头函数
      slots[key] = (props) => normalizeSlotValue(value(props));
    }
  // instance.slots = slots;
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value : [value];
}

export function initSlots(instance, children) {
  //   instance.slots = Array.isArray(children) ? children : [children];
  // 判断当前组件是不是含有slot
  const { vnode } = instance;
  if (vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
    normalizeObjectSlots(children, instance.slots);
  }
}
```

https://vue-next-template-explorer.netlify.app/
这个网址查看 template 转换后的 h 函数
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202207262256920.png)

## 实现 Fragment 和 Text 类型节点

> 上一个小节实现的 slots 生成后的真实节点，有个问题，会多个 div 标签一层。

原来的渲染，是通过创建个 div 的虚拟节点，那么使用个 Fragment 中间变量，接着在 patch 方法里面做判断

`vnode.ts`

```ts
export const Fragment = Symbol("Fragment");
```

`renderSlots.ts`

```ts
const vnode = createVNode(Fragment, {}, slot(props));
```

`renderer.ts`渲染器函数内添加`processFragment`函数，目的是直接渲染 vnode 的 children

```ts
function patch(vnode: any, container: any) {
  //去处理
  console.log("vnode : ");
  console.log(vnode);
  const { type, shapeFlag } = vnode;
  switch (type) {
    case Fragment:
      processFragment(vnode, container);
      break;

    case Text:
      processText(vnode, container);
      break;
    default:
      // 判断是不是element
      // if (typeof vnode.type === "string") {
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container);
        // } else if (typeof vnode.type === "object") {
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container);
      }
      break;
  }
}
// 渲染节点直接
function processFragment(vnode: any, container: any) {
  mountChildren(vnode, container);
}
```

`App.js`内使用 text 节点等于下面这样写法

```html
<component>你好啊</component>
```

```ts
{
        header: ({ age }) => {
          return h("p", {}, " Slot Array 1 get slot age: " + age);
        },
        footer: () => [
          h("p", {}, "Slot Array 2"),
          h("div", {}, "div..."),
          createTextVNode("hello text node..."),
        ],
   }
```

那么这样直接文本的节点如何处理呢

`vnode.ts` 定义个 createTextVnode 方法里面将文本传入个 vnode 就行，一样调用创建虚拟节点的方法

```ts
export const Text = Symbol("Text");
export function createTextVNode(text: string) {
  return createVNode(Text, {}, text);
}
```

`renderer.ts`渲染器内对 Text 的类型进行处理

```ts
function processText(vnode: any, container: any) {
  const { children } = vnode;
  const textNode = (vnode.el = document.createTextNode(children));
  container.append(textNode);
}
```

使用原生的 api 创建文本节点 接着挂载到指定的容器内即可

## 实现 getCurrentInstance

可以在组件实例的 setup 方法内拿到当前组件的实例

`App.js`

```js
  setup() {
    console.log("%c this is App setup ->", "color:red;font-size: 20px");
    console.log(getCurrentInstance());
    console.log("%c <- this is App setup", "color:red;font-size: 20px");
    return {
      msg: "mini-vue",
    };
  },

```

在`component.ts`声明个`getCurrentInstance`和当前模块的全局变量`currentInstance`

```ts
let currentInstance = null;
export function getCurrentInstance() {
  return currentInstance;
}
```

当调用的 setup 方法时，先给`currentInstance`赋值，调用完毕后，再赋予`null`

```ts
可以使用个函数抽离出这个赋值过程;

function setCurrentInstance(instance) {
  currentInstance = instance;
}

function setupStatefulComponent(instance: any) {
  //...
  setCurrentInstance(instance);
  const setupResult = setup(shallowReadonly(props), {
    emit,
  });
  setCurrentInstance(null);
  //...
}
```

这样做的好处：可以方便后期调试错

## 实现 Provide Inject

```ts
import { getCurrentInstance } from "./component";

export function provide(key, value) {
  const currentInstance: any = getCurrentInstance();
  if (currentInstance) {
    let { provides } = currentInstance;
    /**
     * 这里的初始化需要处理
     * 第一次的时候，当前组件拿到是父级组件的provides
     * 未来在调用时，就直接覆盖父级的
     * 借用原型链的思想
     */
    const parentProvides = currentInstance.parent.provides;
    if (provides === parentProvides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}

export function inject(key, defaultValue) {
  const currentInstance: any = getCurrentInstance();
  const { provides } = currentInstance.parent;
  if (key in provides) {
    return provides[key];
  } else if (defaultValue !== "") {
    if (typeof defaultValue === "function") {
      return defaultValue();
    }
    return defaultValue;
  }
}
```

创建组件实例的时候，拿到当前组件的父级组件的 provide
第一次组件实例化的时候，他的 parent 是 undefined 的，因为第一次进来的时候是根组件

```ts
export function createComponentInstance(vnode: any, parent) {
  console.log("parent ->", parent);
  const component = {
    vnode, // 组件实例的虚拟节点
    type: vnode.type, // 组件实例的name, 因为这个type就是组件
    setupState: {},
    props: {},
    slots: {},
    provides: parent ? parent.provides : {},
    parent,
    emit: () => {},
  };
  // thisArg是null或undefined，执行作用域的 this 将被视为新函数的 thisArg。
  // component是component#emit的第一个参数
  component.emit = emit.bind(null, component) as () => void;
  return component;
}
```

父级组件的来源

```ts
function setupRenderEffect(instance: any, initialVNode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);
  console.log("instance");
  console.log(instance);
  patch(subTree, container, instance); // ++这里的instance传入，**也就是当前patch时的父组件实例**
  /** 组件对应的根element元素遍历后赋予真实$el */
  initialVNode.el = subTree.el;
}
```

## Custom Renderer

将之前写的渲染器抽离出来抽象接口，然后创建`runtime-dom/index.ts` 表示默认使用 dom 的渲染函数去渲染虚拟 dom。
将`runtime-core/renderer.ts`抽离`createRenderer`成闭包的形式

- createElement
- patchProp
- insert

主要渲染的三个接口

这样做的好处：renderer 不需要关系具体实现，只需要调用传入的抽象接口即可了

## 更新 Element 的 Prop

在 processElement 函数中判断是否为更新，根据 oldNode 判断，因为初始化的时候 oldNode 肯定是没有的。
初始化走 挂载方法
更新走 更新方法

进入更新方法后，判断 oldNode 和 newNode prop 属性的情况

> 注意点：第一次初始化 vnode 是有 el，但是以后是没有 el 的，所以需要再这里更新的时候将 el 赋值过去

然后执行`patchProps`，这里列举了 3 种情况

1. prop 修改
2. prop 删除 (value 为 undefined、null)
3. prop 删除 (key 都没有)

```js
const onChangeProps1 = () => {
  props.value.foo = "new-foo";
};
const onChangeProps2 = () => {
  props.value.foo = undefined;
};
const onChangeProps3 = () => {
  props.value = {
    foo: "foo",
  };
};
```

需要对`runtime-dom`的渲染接口`patchProp`的具体进行修改,以为只考虑增加，没有考虑删除的情况。
修改后为：

```ts
function patchProp(el, key, oldVal, nextVal) {
  const isOn = (eventName) => /^on[A-Z]/.test(eventName);
  if (isOn(key)) {
    const eventName = key.slice(2).toLowerCase();
    el.addEventListener(eventName, nextVal);
  } else {
    if (nextVal === undefined || nextVal === null) {
      el.removeAttribute(key); //删除的情况
    } else {
      el.setAttribute(key, nextVal);
    }
  }
}
```

```ts
function processElement(n1, n2: any, container: any, parentComponent) {
  if (!n1) {
    mountElement(n2, container, parentComponent);
  } else {
    patchElement(n1, n2, container);
  }
}
function patchElement(n1, n2, container) {
  const oldProps = n1.props || EMPTY_OBJ;
  const newProps = n2.props || EMPTY_OBJ;
  const el = (n2.el = n1.el);
  patchProps(el, oldProps, newProps);
}
function patchProps(el, oldProps, newProps) {
  if (oldProps !== newProps) {
    for (const key in newProps) {
      const prevProp = oldProps[key];
      const nextProp = newProps[key];
      hostPatchProp(el, key, prevProp, nextProp);
    }
    // 第一次初始化的时候，不需要对比老节点
    if (oldProps !== EMPTY_OBJ) {
      for (const key in oldProps) {
        if (!(key in newProps)) {
          hostPatchProp(el, key, oldProps[key], null);
        }
      }
    }
  }
}
```

## 更新 Element 的 Children

### 四种情况

- Array 2 Text
  清空老的数组 加入新的文本节点
- Text 2 Text
  删除老的文本内容改为新的
- Text 2 Array
  删除老的文本内容 添加新的数组节点
- Array 2 Array
  - 双端对比算法

### 双端对比算法

老的节点 与 新的节点

- 老节点右侧少与新节点 (ab) | (ab)c
- 老节点左侧少与新节点 (ab) | c(ab)
- 老节点右侧多与新节点 (ab)c | (ab)
- 老节点左侧多与新节点 c(ab) | (ab)
- 乱序

老节点数组少于新节点数组 => diff 后 新增节点

老节点数组多于新节点数组 => diff 后 删除节点

这里需要定义几个变量

- n1: 当前的老节点
- n2: 当前的新节点
- e1: 老节点的当前遍历的尾部指针
- e2: 新节点的当前遍历的尾部指针
- l1：老节点的长度
- l2：新节点的长度

```ts
function patchKeyedChildren(c1, c2, container, parentComponent, parentAnchor) {
  const l1 = c1.length;
  const l2 = c2.length;
  let e1 = l1 - 1;
  let e2 = l2 - 1;
  let i = 0;

  let isSameVNodeType = (n1, n2) => {
    return n1.type === n2.type && n1.key === n2.key;
  };

  while (i <= e1 && i <= e2) {
    const n1 = c1[i];
    const n2 = c2[i];
    if (isSameVNodeType(n1, n2)) {
      patch(n1, n2, container, parentComponent, parentAnchor);
    } else {
      break;
    }
    i++;
  }
  console.log(i);
  while (i <= e1 && i <= e2) {
    const n1 = c1[e1];
    const n2 = c2[e2];
    if (isSameVNodeType(n1, n2)) {
      patch(n1, n2, container, parentComponent, parentAnchor);
    } else {
      break;
    }
    e1--;
    e2--;
  }
  console.log(e1);
  console.log(e2);
  /**
   * 左侧or右侧添加
   * 新的比老的多
   * 无论是左侧还是右侧添加，双端检测后 i > e1
   */
  if (i > e1) {
    /** 判断i是否小于新的最后指针 */
    if (i <= e2) {
      const nextPos = e2 + 1;
      /**
       * 判断要前插还是后插
       * 通过找到锚点判断往前插入节点
       * */
      const anchor = nextPos < l2 ? c2[nextPos].el : null;
      while (i <= e2) {
        const n2 = c2[i];
        patch(null, n2, container, parentComponent, anchor);
        i++;
      }
    }
  } else if (i > e2) {
    /** 老的比新的多，删除 */
    while (i <= e1) {
      const n1 = c1[i].el;
      hostRemove(n1);
      i++;
    }
  }
}
```

i 大于 e1 说明 老的比新的多
需要判断往前添加还是往后添加
这里需要改下`runtime dom` 里面 insert 方法

```ts
function insert(el, parent, anchor) {
  // 加入锚点 目的是 往前面加入的时候，可以找个参考点，向它前面加入
  parent.insertBefore(el, anchor || null);
}
```

i 大于 e2 说明 新的比老的多
删除对应节点即可

#### 处理新老 Children 中间的节点

> 上面的处理只是处理了左右
> 此时的 i、e1、e2 都是有用的 确定了中间要处理的范围。

![image-20220809211518317](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202208092115378.png)

##### 处理中间的新节点的属性以及删除老节点

> patch 方法可以重新计算相同节点的新属性
>
> 若 新节点没有的老节点就应该删除掉

需要个变量`keyToNewIndexMap`拿到当前新数组中间里面的映射表

```ts
/** 得到新节点的map映射 */
for (let i = s2; i <= e2; i++) {
  const nextChild = c2[i];
  keyToNewIndexMap.set(nextChild.key, i);
}
```

作用: 判断老数组中是否有一样的 key，如果有说明新数组中的这个 vnode 是来自老数组中的。不需要创建，只需要 patch 即可。

需要个变量`newIndex`表示当前遍历中，正常操作的下新数组的 vnode 索引下标

```ts
/** 新节点的下标 */
let newIndex;
/** 老节点的props有key的情况 */
if (prevChild.key !== null) {
  newIndex = keyToNewIndexMap.get(prevChild.key);
} else {
  // 遍历所有整个新数组，使用`isSameVNodeType`进行判断是不是同一个节点
}
```

这里拿到 newIndex,然后对这个变量做判断

```ts
/**
 * 若newIndex 为 undefined 说明 在新数组的keyToNewIndexMap中没有找到对应的索引
 */
if (newIndex === undefined) {
  hostRemove(prevChild.el);
} else {
  /**
   * 新旧节点进行patch,这里这是patch下，不会更换他的位置,patch只是改属性
   */
  patch(prevChild, c2[newIndex], container, parentComponent, null);
  patched++;
}
```

目前完成进度：

- 做完这一步说明我们可以删除老数组中存在的，而新数组中没有的节点，以及 patch 下新老中都共同拥有的节点的新属性 or 新内容。
- 还差新增新数组中的新节点，正确**移动**节点在新数组中的位置。

##### 移动 与 新增

需要个变量`toBePatched`去记录新数组中 中间还没处理的节点个数
需要个映射表`newIndexToOldIndexMap`，代表新数组中间节点中，每个位置(从零开始)的节点是否来自旧数组

- value 若不是 0，表示来自旧节点中的哪个索引
- 0 表示新创建的的逻辑意义

```ts
/**
 * 初始化都是0,0是有逻辑意义的,代表着这个新节点在老节点中是没有的意义
 */
for (let i = 0; i < toBePatched; i++) {
  newIndexToOldIndexMap[i] = 0;
}
```

> [a, b, (c, d, e), f, g] 旧数组
> 0, 1, (2, 3, 4), 5, 6 索引
> [a, b, (e, c, d), f, g] 新数组
> -------[0, 1, 2]---------- 从 0 开始
> 生成的映射表`newIndexToOldIndexMap`就是
> { 0: 4+1, 1: 2+1, 2: 3+1 }
>
> > 为何加 1 呢?
> >
> > 因为 0 可以代表这个新数组中某个节点在老数组中找不到，说明为 0 的情况就得生成出来，而不是移动节点

```ts
/**
 * 若newIndex 为 undefined 说明 在新数组的keyToNewIndexMap中没有找到对应的索引
 */
if (newIndex === undefined) {
  hostRemove(prevChild.el);
} else {
  /**
   * 若一直是递增的话，就是 1, 2, 3
   * 若里面改变了 就是 3, 1, 2 等同于 `newIndex < maxNewIndexSoFar` => 需要移动
   */
  if (newIndex >= maxNewIndexSoFar) {
    maxNewIndexSoFar = newIndex;
  } else {
    moved = true;
  }
  /**
   * 给newIndexToOldIndexMap填充值，
   * 这里的＋1是为了防止i为0的情况，以为i为0的逻辑意义上面已经定死了。
   */
  newIndexToOldIndexMap[newIndex - s2] = i + 1;
  /**
   * 新旧节点进行patch,这里这是patch下，不会更换他的位置
   */
  patch(prevChild, c2[newIndex], container, parentComponent, null);
  patched++;
}
```

通过拿到生成的`newIndexToOldIndexMap`映射表，拿到他的最长递增子序列

```ts
/**
 * 生成 最长递增子序列
 * 这个newIndexToOldIndexMap映射表很重要
 * 返回value为递增的索引数组
 * getSequence([0: 5, 1: 3, 2: 4])
 * 返回就是[1, 2]
 * 判断需不需要moved，需要才是调用getSequence
 */
const increasingNewIndexSequence = moved
  ? getSequence(newIndexToOldIndexMap)
  : [];
/** 最长递增子序列的结束索引 因为是索引索引要减一嘛 */
let j = increasingNewIndexSequence.length - 1;
for (let i = toBePatched - 1; i >= 0; i--) {
  /** 找锚点，
   * 如果是正序遍历的话，会造成锚点可能是个不确定的元素，
   * 倒序就不会出现这个情况
   */
  const nextIndex = i + s2;
  const nextChild = c2[nextIndex];
  const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : null;

  /**
   * 创建节点
   */
  if (newIndexToOldIndexMap[i] === 0) {
    patch(null, nextChild, container, parentComponent, anchor);
  }

  /** 判断需要更换位置的情况下，才进行移动 */
  if (moved) {
    /** j < 0 说明 稳定的序列已经遍历完毕了，剩下的都是不稳定的序列 */
    if (j < 0 || i !== increasingNewIndexSequence[j]) {
      console.log("移动位置");
      hostInsert(nextChild.el, container, anchor);
    } else {
      j--;
    }
  }
}

/**
 * 生成最长递增子序列
 */
function getSequence(arr: number[]): number[] {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = (u + v) >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
```

## Fix patchKeyedChildren

> 下面这段逻辑，是判断当前新节点是否在老节点数组中存在
> 若存在，拿老节点数组中的索引

```ts
/** 新节点的下标 */
let newIndex;
/** 老节点的props有key的情况 */
if (prevChild.key != null) {
  newIndex = keyToNewIndexMap.get(prevChild.key);
} else {
  /**
   * 没有key的话，就遍历整个新的数组中间部分， 这也是key的重要作用，这样遍历就消耗更多性能了。
   */
  for (let j = s2; j < e2; j++) {
    if (isSameVNodeType(prevChild, c2[j])) {
      newIndex = j;
      break;
    }
  }
}
```

> for (let j = s2; j < e2; j++) {} 若 j< e2 则会将最后一个节点给排除掉

编写测试用例

```js
const prevChildren = [
  h("div", { key: "A" }, "A"),
  h("div", {}, "B"),
  h("div", { key: "C" }, "C"),
  h("div", { key: "D" }, "D"),
];
const nextChildren = [
  h("div", { key: "A" }, "A"),
  h("div", { key: "C" }, "C"),
  h("div", {}, "B"),
  h("div", { key: "D" }, "D"),
];
```

上面的例子，执行完后还是会正确的展示成对应的样子，为什么？

因为在下面这段代码中，会再次遍历新数组中的节点，将老数组中不存在的节点进行创建

```ts
/**
 * 创建节点 newIndexToOldIndexMap中为0的表示是创建的节点
 */
if (newIndexToOldIndexMap[i] === 0) {
  patch(null, nextChild, container, parentComponent, anchor);
}
```

导致展示正确的结果,但是内部行为不一样。

> for (let j = s2; j < e2; j++) {...}

- 改为 j< e2
  这样删除后新增
- 改为 j <= e2
  这样是移动节点

## 组件更新

> 更新逻辑

- 更新组件的数据 props 这个点触发 effect 的副作用函数 render
- 执行组件的 render 函数，使用 effect 返回的 runner 函数，保存到组件实例的 update 属性，然后再更新的时候执行 render。
- 判断组件到底需不需要更新。

```ts
function setupRenderEffect(instance: any, initialVNode, container, anchor) {
  /**
   * 使用effect监控里面的响应式对象
   * effect的返回值，再次调用，可以执行里面的回调函数
   */
  instance.update = effect(() => {
    // 第一次进来时(init)，这个isMounted为false
    if (!instance.isMounted) {
      const { proxy } = instance;
      /** 让instance的代理去执行组件的定义的render函数 返回的是一个subTree虚拟节点 */
      const subTree = (instance.subTree = instance.render.call(proxy));
      /** 调用patch方法挂载这个虚拟节点树 */
      patch(null, subTree, container, instance, anchor);
      /** 挂载后 subTree树会带有个el真实节点的属性 */
      /** 组件对应的根element元素遍历后赋予真实$el */
      initialVNode.el = subTree.el;
      instance.isMounted = true;
    } else {
      console.log("update");
      /** update component VNode */
      const { next, vnode } = instance;
      /** next不为空 说明可以更新组件 */
      /*************************** 重点是这个 **************************/
      if (next) {
        next.el = vnode.el;
        updateComponentPreRender(instance, next);
      }
      const { proxy } = instance;
      const subTree = instance.render.call(proxy);
      const prevSubTree = instance.subTree;
      instance.subTree = subTree;
      console.log("curr", subTree);
      console.log("prev", prevSubTree);
      patch(prevSubTree, subTree, container, instance, anchor);
      /** 组件对应的根element元素遍历后赋予真实$el */
    }
  });
}
```

更新 props，会自动触发上面的方法，接着呢，因为是更新啊，所以走 else 的逻辑 进入 patch ，然后走 processComponent

```ts
function processComponent(
  n1,
  n2: any,
  container: any,
  parentComponent,
  anchor
) {
  if (!n1) {
    /** init */
    mountComponent(n2, container, parentComponent, anchor);
  } else {
    /** update */
    updateComponent(n1, n2);
  }
}
```

执行 updateComponent

```ts
function updateComponent(n1, n2) {
  /** 拿到老节点的组件实例 */
  const instance = (n2.component = n1.component);
  /**
   * 判断需不需要更新
   */
  if (shouldUpdateComponent(n1, n2)) {
    /** 将组件实例的next赋值为新的vnode */
    /*************************** 重点是这个 **************************/
    instance.next = n2;
    /** update为effect包裹的副作用函数 */
    /*************************** 重点是这个 **************************/
    instance.update();
  } else {
    /** 不需要更新的处理逻辑 */
    n2.el = n1.el;
    instance.vnode = n2;
  }
}
```

上面的 update 方法又会再次出发 patch 方法

```ts
console.log("update");
/** update component VNode */
const { next, vnode } = instance;
/** next不为空 说明可以更新组件 */
/*************************** 重点是这个 **************************/
/** 这个时候可以拿到值了 */
if (next) {
  next.el = vnode.el;
  updateComponentPreRender(instance, next);
}
const { proxy } = instance;
const subTree = instance.render.call(proxy);
const prevSubTree = instance.subTree;
instance.subTree = subTree;
patch(prevSubTree, subTree, container, instance, anchor);
/** 组件对应的根element元素遍历后赋予真实$el */
```

- 将原来的 el 真实节点数据赋值给 nextVNode
- 将 nextVNode 的最新 vnode 赋值给 组件实例的 vnode

目的是让组件实例的属性保持最新状态, 后面调用 patch 更新

```ts
function updateComponentPreRender(instance, nextVNode) {
  /** 更新组件的虚拟节点 */
  instance.vnode = nextVNode;
  /** 将更新的虚拟节点置为空 */
  instance.next = null;
  /** 更新组件的props */
  instance.props = nextVNode.props;
}
```

更新的这代码

```ts
const { proxy } = instance;
const subTree = instance.render.call(proxy);
const prevSubTree = instance.subTree;
instance.subTree = subTree;
```

这个代理对象拿到，调用 render 函数。 render 函数中的`this.$props.msg`是拿到最新的值
为什么是最新的
以为 instance 的 VNode 是最新的
拿$props.msg 等同于 拿 component 实例的代理对象的 props 也等同于拿 VNode 的 props

## nextTicker 与 异步更新

> Vue3 的视图更新是异步的

目前只实现了同步，通过下面的 demo 可以看出

```js
  setup() {
    const count = ref(1);
    function onClick() {
      for (let i = 0; i < 100; i++) {
        console.log("update");
        count.value = i;
      }
    }
  }
```

当触发 onClick 事件时，视图同步更新了 100 次

> 视图更新一次，数据更新 100 次

因为视图更新是使用 effect 包裹起来的，可以使用提供的第二个对象参数属性 scheduler，
将视图更新的逻辑放到这个去操作，是用`instance.update`暂存这个更新逻辑方法

```ts
{
  scheduler() {
    console.log("update - scheduler");
    queueJobs(instance.update);
  },
}
```

采用微任务的形式，将视图更新丢到任务队列里面。

创建`scheduler.ts`，将异步操作的抽离出来

```ts
/** 队列 */
const queue: any[] = [];

/** 防止Promise频繁创建 */
let isFlushPending = false;

/** 提供给用户 可以拿到视图异步更新后的数据, */
export function nextTick(fn) {
  return fn ? Promise.resolve().then(fn) : Promise.resolve();
}

export function queueJobs(job) {
  if (!queue.includes(job)) {
    queue.push(job);
  }
  /** 执行加入异步队列 */
  queueFlush();
}

export function queueFlush() {
  if (isFlushPending) return;
  isFlushPending = true;
  /**
   * 每次进来都会创建个Promise
   * 使用个变量去控制Promise的创建
   */
  nextTick(flushJobs);
}
function flushJobs() {
  isFlushPending = false;
  let job;
  while ((job = queue.shift())) {
    job && job();
  }
}
```

1. 用户点击按钮，触发更新逻辑
2. 更新逻辑丢到异步队列里面，然后等待执行这个微任务
3. 用户调用 nextTick()方法，再次往微任务队列里面丢微任务。
4. 等到数据更新完毕，也就是同步任务没了，
5. 会往微任务队列里面看有没有任务呢， 事件循环机制
6. 因为都是 Promise.then 的类型，所以谁先加入谁先执行，也就是啊异步更新视图的逻辑先于用户的 nextTick

## 编译模块

template --parse--> ast --transform--> ast --code generate--> render 函数

## 解析插值功能

> 插值功能：{{message}}

先写个`happy path`测试用例

```ts
describe("parse", () => {
  describe("interpolation", () => {
    test("simple interpolation", () => {
      const ast = baseParse("{{message}}");

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.INTERPOLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSION,
          content: "message",
        },
      });
    });
  });
});
```

```ts
export function baseParse(content: string): any {
  return {
    children: [
      {
        type: NodeTypes.INTERPOLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSION,
          content: "message",
        },
      },
    ],
  };
}
```

先伪完成这个用例，然后开始抽离代码

1. 先讲包含 children 属性的这个对象抽离出来

```ts
function createRoot(children) {
  return {
    children,
  };
}
```

2. 将传递过来的模版字符串放到一个中间对象里面

```ts
function createParseContext(content: string): any {
  return {
    source: content,
  };
}
```

3. 解析这个对象

首先明确返回的 ast 对象是有多个节点的
所以是有个数组的
将解析的`{{xxx}}`转成一个节点对象

```ts
function parseChildren(context) {
  const nodes: any = [];

  /**
   * {{}}
   */
  let node;
  if (context.source.startsWith("{{")) {
    node = parseInterpolation(context);
  }

  nodes.push(node);

  return nodes;
}
```

4. 解析模版字符串

```ts
function parseInterpolation(context) {
  // {{message}}
  const openDelimiter = "{{";
  const closeDelimiter = "}}";
  /**
   * 拿到字符尾部索引
   */
  const closeIndex = context.source.indexOf(
    closeDelimiter,
    openDelimiter.length
  );
  /**
   *  推进
   *  {{msg}}{{name}} => msg}}{{name}}
   */
  advanceBy(context, openDelimiter.length);

  /**
   * 计算出插值模版里面字符的长度
   */
  const rawContentLength = closeIndex - openDelimiter.length;

  const rawContent = context.source.slice(0, rawContentLength);
  const content = rawContent.trim();
  /**
   * 继续推进 相当于当前{{}}这里的东西已经解析完毕了
   * msg}}{{name}} => {{name}}
   */
  advanceBy(context, rawContentLength + closeDelimiter.length);

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content,
    },
  };
}
```

将一些常量抽离出来

```ts
export const enum NodeTypes {
  INTERPOLATION,
  SIMPLE_EXPRESSION,
}
```

## 解析 Element

先写个测试用例

```ts
describe("element", () => {
  test("simple element div", () => {
    const ast = baseParse("<div></div>");
    expect(ast.children[0]).toStrictEqual({
      type: NodeTypes.ELEMENT,
      tag: "div",
    });
  });
});
```

处理逻辑

1. 判断是不是 element
2. 取出 tag
3. 将处理后的代码推进

```ts
   else if (s[0] === "<") {
    /**
     * 处理Element
     * 使用正则匹配 `<`开头 `[a-z]*`
     */
    if (/[a-z]/.test(s[1])) {
      node = parseElement(context);
    }
  }
```

处理 2 次 前标签 和后标签 给个 TagType 表示是开始还是结束

```ts
function parseElement(context) {
  const element = parseTag(context, TagType.START);
  parseTag(context, TagType.END);
  return element;
}
```

```ts
function parseTag(context: any, tagType: TagType) {
  /**
   * 1. 解析tag
   */
  const match: any = /^<\/?([a-z]*)/i.exec(context.source);
  const tag = match[1];

  /**
   * 2. 删除已处理完成的代码
   */
  advanceBy(context, match[0].length);
  advanceBy(context, 1);

  /** 结束标签无需返回 */
  if (tagType === TagType.END) return;
  return {
    type: NodeTypes.ELEMENT,
    tag,
  };
}
```

## 解析 Text

```ts
describe("text", () => {
  test("simple text parse", () => {
    const ast = baseParse("some text");
    expect(ast.children[0]).toStrictEqual({
      type: NodeTypes.TEXT,
      content: "some text",
    });
  });
});
```

1. 提取 text
2. 推进

```ts
function parseText(context) {
  const length = context.source.length;
  /** 1. 获取值 */
  let content = context.source.slice(0, length);
  /** 2. 推进 */
  advanceBy(context, length);
  return {
    type: NodeTypes.TEXT,
    content,
  };
}
```

抽离下和插值一样处理逻辑: 提取值

```ts
function parseTextData(context: any, length) {
  /** 1. 获取值 */
  let content = context.source.slice(0, length);
  /** 2. 推进 */
  advanceBy(context, length);
  return content;
}
```

这个需要传入个参数是因为插值`xxx}}` 后面的`}}`不是需要的内容，给个长度让 parseTextData 函数好处理

## 联合三种类型

> 解析`<p>hi,{{message}}</p>`

```ts
test("happy path", () => {
  const ast = baseParse("<p>hi,{{message}}</p>");
  expect(ast.children[0]).toStrictEqual({
    type: NodeTypes.ELEMENT,
    tag: "p",
    children: [
      {
        type: NodeTypes.TEXT,
        content: "hi,",
      },
      {
        type: NodeTypes.INTERPOLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSION,
          content: "message",
        },
      },
    ],
  });
});
```

- 首先解析`<p>`
- 解析完毕解析里面的内容 -> children
- 解析到`hi,` 加入判断逻辑，遇到`{{` or `<` 就表示 text 节点解析完毕
- 解析`{{}}`插值，
- 最后解析到`</p>` 结束

1. parseChildren
2. parseElement
3. parseChildren
4. parseText
5. parseInterpolation

在 parseChildren 中加入 while，循环解析当前的子节点

```ts
function isEnd(context, ancestors) {
  const s = context.source;
  // 跳出条件
  // 1. context.source 空
  // 2. tag
  if (s.startsWith("</")) {
    /** 优化倒序，提高遍历性能 */
    for (let i = ancestors.length; i >= 0; i--) {
      const tag = ancestors[i].tag;
      if (startsWithEndTagOpen(s, tag)) {
        // if (s.slice(2, 2 + tag.length) === tag) {
        return true;
      }
    }
  }
  return !s;
}
```

```ts
test.only(" should throw error ", () => {
  // baseParse("<div><span></div>");
  expect(() => {
    baseParse("<div><span></div>");
  }).toThrow();
});
```

对于这种没有关闭标签的，应该给个`Error`提示

那么需要思考如何判断，他是单标签没有闭合。

使用一个栈空间结构存下当前的 tag -> `ancestors: []`

在解析 element 前存标签，解析完 tag 的内容后踢出栈

```ts
function parseElement(context, ancestors) {
  const element: any = parseTag(context, TagType.START);
  // 加入栈
  ancestors.push(element);
  element.children = parseChildren(context, ancestors);
  // 解析完毕 出栈
  ancestors.pop();
  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.END);
  } else {
    throw new Error(`应该来个${element.tag}结尾`);
  }
  return element;
}
```

若没有与之匹配的 tag 则抛出异常

```ts
function startsWithEndTagOpen(source, tag) {
  return (
    source.startsWith("</") &&
    source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase()
  );
}
```

拿到当前进入 parseElement 的 element 的 tag 与 当前推进后的文本进行匹配

## 有限状态机

> 等于正则表达式

用编码的形式的正则
画个图 举个例子

读取输入，根据输入的内容进行不同状态的执行操作。
举个例子

```js
// console.log(/abc/.test("abcs"));

function fooA(char) {
  if (char === "a") {
    return fooB;
  }
  return fooA;
}
function fooB(char) {
  if (char === "b") {
    return fooC;
  }
  return fooA;
}
function fooC(char) {
  if (char === "c") {
    return end;
  }
  return fooA;
}
function end() {
  return end;
}

function main(swap) {
  let currStatus = fooA;
  for (let i = 0; i < swap.length; i++) {
    let nextStatus = currStatus(swap[i]);
    currStatus = nextStatus;
    if (nextStatus === end) {
      console.log(true);
      currStatus = fooA;
    }
  }
}

const res = main("abcddabddabc");

console.log(res);
```

## 实现 Transform

来个单测

```ts
describe("transform", () => {
  it("happy path", () => {
    const ast = baseParse("<div>hi,{{message}}</div>");
    transform(ast);
    const nodeText = ast.children[0].children[0];
    expect(nodeText.content).toBe("hi,mini-vue");
  });
});
```

实现步骤

1. 遍历树节点
2. Text 类型的 content 加入`mini-vue`

```ts
import { NodeTypes } from "./ast";
export function transform(root) {
  // 深度遍历
  traverseNodes(root);
}

function traverseNodes(root: any) {
  // Implement
  if (root.type === NodeTypes.TEXT) {
    root.content = root.content + "mini-vue";
  }
  const children = root.children;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNodes(node);
    }
  }
}
```

实现了，但是我们想要它具有灵活性，从程序设计的角度看，当前这么写，很死板。 可以看出当前代码一些动态状态和稳定状态
动态状态

```ts
if (root.type === NodeTypes.TEXT) {
  root.content = root.content + "mini-vue";
}
```

稳定状态

```ts
const children = root.children;
if (children) {
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    traverseNodes(node);
  }
}
```

设计代码时，需要抽离动态与稳定状态 ==> 低耦合

这个动态状态其实可以抽出来，当做用户传递进来

重构后， transform 的代码都是稳定的执行流程

```ts
export function transform(root, options) {
  const context = createContext(root, options);
  // 深度遍历
  traverseNodes(root, context);
}

function traverseNodes(root: any, context) {
  // Implement
  const { nodeTransforms } = context;
  nodeTransforms.forEach((transform) => {
    transform(root);
  });
  const children = root.children;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNodes(node, context);
    }
  }
}
function createContext(root: any, options: any) {
  const context = {
    root,
    nodeTransforms: options.nodesTransforms || [],
  };
  return context;
}
```

这里是动态的流程

```ts
describe("transform", () => {
  it("happy path", () => {
    const ast = baseParse("<div>hi,{{message}}</div>");

    // 想要处理的时候再添加到transform中
    const plugin = (node) => {
      if (node.type === NodeTypes.TEXT) {
        node.content = node.content + "mini-vue";
      }
    };

    transform(ast, {
      nodesTransforms: [plugin],
    });

    const nodeText = ast.children[0].children[0];

    expect(nodeText.content).toBe("hi,mini-vue");
  });
});
```

这里我们只对 Text 类型进行处理，后期若要对插值 orElement 类型的话 就可以直接写 plugin 即可

## 实现代码的生成 String 类型

> 前面实现了将 template 转 ast ast 通过 transform 转另一种 ast 最后就到了转成对应的 render 函数了

```ts
describe("codegen", () => {
  it("string", () => {
    const ast = baseParse("hi");
    const { code } = generate(ast);
    expect(code).toMatchSnapshot();
  });
});
```

`toMatchSnapshot` 这个是快照测试，先编写个我们需要的快照,方便未来的测试。

这是我们想要的结果

```ts
hi;

// ==>

exports[
  `codegen string 1`
] = `"return function render(_ctx,_cache){return 'hi'}"`;
```

[转换 render 函数的工具函数](https://vue-next-template-explorer.netlify.app/#eyJzcmMiOiJoaSIsInNzciI6ZmFsc2UsIm9wdGlvbnMiOnsibW9kZSI6ImZ1bmN0aW9uIiwicHJlZml4SWRlbnRpZmllcnMiOnRydWUsImhvaXN0U3RhdGljIjp0cnVlLCJjYWNoZUhhbmRsZXJzIjp0cnVlfX0=)

生成一个 render 函数的主要逻辑：

- 对生成结果划分为 return、function、render、codeGen
- 基于结果去开发

```ts
export function generate(ast) {
  const context = createCodegenContent();
  context.push("return ");
  const functionName = "render";
  const args = ["_ctx", "_cache"];
  const signature = args.join(",");

  context.push(`function ${functionName}(${signature}){`);
  genNode(ast.codegenNode, context);
  context.push("}");

  return {
    code: context.code,
  };
}

function createCodegenContent() {
  const context = {
    code: "",
    push(source) {
      context.code += source;
    },
  };
  return context;
}

function genNode(codegenNode: any, context) {
  const { push } = context;
  const node = codegenNode;
  push(`return '${node.content}'`);
}
```

`ast.codegenNode`这个属性是在`transform`内处理的

```ts
function genCode(root) {
  root.codegenNode = root.children[0];
}
```

当然处理 string 类型挺简单的

## 实现插值的 Render 函数代码生成

```ts
exports[`codegen interpolation 1`] = `
"const { toDisplayString: _toDisplayString } from Vue
return function render(_ctx,_cache){return _toDisplayString(_ctx.message)}"
`;
```

```ts
it("interpolation", () => {
  const ast = baseParse("{{message}}");
  transform(ast);
  const { code } = generate(ast);
  expect(code).toMatchSnapshot();
});
it("interpolation", () => {
  const ast = baseParse("{{message}}");
  transform(ast, {
    nodeTransforms: [transformExpression],
  });
  const { code } = generate(ast);

  expect(code).toMatchSnapshot();
});
```

目标代码是
一个导入语句 `"const { toDisplayString: _toDisplayString } from Vue`
和一个 return render 函数 `return function render(_ctx,_cache){return _toDisplayString(_ctx.message)}"`

先实现第一个逻辑

```ts
function getFunctionPreamble(ast: any, context: any) {
  const { push } = context;
  const VueBinding = "Vue";
  // const helpers = ["toDisplayString"];
  const aliasHelper = (s) => `${s}: _${s}`;
  const helpers = ["toDisplayString"];
  if (helpers.length > 0) {
    push(`const { ${helpers.map(aliasHelper).join(", ")} } from ${VueBinding}`);
  }
  push("\n");
  push("return ");
}
```

但是 codegen 的职责是生成 render 函数,所以 `const helpers = ["toDisplayString"];` 这种代码不适合写在这里
将它抽离到`transform` 比较合适
在`transform` 处理最后 , 为当前节点加入`helpers`属性
`root.helpers = [...context.helpers.keys()];`
在`traverseNodes` 中 处理插值类型，但是未来可以也会处理其他类型的 所以 写成 switch 去处理

```ts
switch (node.type) {
  case NodeTypes.INTERPOLATION:
    context.helper("toDisplayString");
    break;
  case NodeTypes.ROOT:
    traverseChildren(node, context);
    break;
  case NodeTypes.ELEMENT:
    traverseChildren(node, context);
    break;
  default:
    break;
}
```

这里处理`toDisplayString`, 为 transform 阶段时的上下文加入 helpers 做缓存, 和 helper 函数

```ts
function createContext(root: any, options: any) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
    helpers: new Map(),
    helper(key) {
      context.helpers.set(key, 1);
    },
  };
  return context;
}
```

helpers 缓存可以写对象也可以写 map 等等，反正都是做缓存用，目的是给 codegen 阶段的 ast 对象上 helpers 属性，属性执行我们 helper 函数的 param , 也就是这里的`toDisplayString`

> 因为这里只是照着一个插值经过 vue 官方的 ast 转换后的结果进行处理，未来肯定有很多从 vue 模块导出来的属性 or 方法的

这里就处理好了 第一个逻辑点

那么第二个逻辑点

render 函数 `return function render(_ctx,_cache){return _toDisplayString(_ctx.message)}"`

分析一下 里面有 `_toDisplayString` `_ctx.message`

之前处理的 text 代码如下

```ts
function getText(node, context: any) {
  const { push } = context;
  push(`'${node.content}'`);
}
```

在处理插值类型时，插值里面的类型前面又定为表达式类型，所以这里处理 2 个类型，然后走同一个入口进来

```ts
function genNode(node: any, context) {
  switch (node.type) {
    case NodeTypes.TEXT:
      getText(node, context);
      break;
    case NodeTypes.INTERPOLATION:
      gedInterpolation(node, context);
      break;
    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context);
      break;
    default:
      break;
  }
}
```

插值处理

```ts
function gedInterpolation(node, context: any) {
  /**
   * 插值 {{ 表达式类型的content }}
   */
  const { push, helper } = context;
  push(`_toDisplayString(`);
  // 处理表达式类型 ,使用统一的入口
  genNode(node.content, context);
  push(")");
}
```

处理表达式

```ts
function genExpression(node, context) {
  const { push } = context;
  push(`_ctx.${node.content}`);
}
```

这里就解决完毕了
接下来重构下代码

将处理的差值的 render 函数内容抽离出来

```ts
import { NodeTypes } from "../ast";

/**
 * 专用处理插值的插件
 * @param node
 */
export function transformExpression(node) {
  if (node.type === NodeTypes.INTERPOLATION) {
    processExpression(node.content);
  }
}

function processExpression(node) {
  node.content = `_ctx.${node.content}`;
  return node;
}
```

然后在转换代码阶段传入第二个参数 option 的属性 nodeTransforms

```ts
it("interpolation", () => {
  const ast = baseParse("{{message}}");
  transform(ast, {
    nodeTransforms: [transformExpression],
  });
  const { code } = generate(ast);

  expect(code).toMatchSnapshot();
});
```

这样 transform 阶段就会处理插值类型的节点

还有一个重构点呢是这个`toDisplayString`

```ts
export const TO_DISPLAY_STRING = Symbol("toDisplayString");
export const helperMapName = {
  [TO_DISPLAY_STRING]: "toDisplayString",
};
```

抽离出来, 未来如果更多的方法都写在这里

然后将`codegen` 和 `transform` 里面的`toDisplayString`改下即可

抽离后, 保证每个 ts 的职责都是处理当前的任务

- parse 解析生成 ast
- transform 转换生成 ast 并带一些属性辅助 codegen
- codegen 生成 render 函数

## 处理 Element 类型生成 Render 函数

```ts
exports[`codegen element 1`] = `
"const { createElementVNode: _createElementVNode } from Vue
return function render(_ctx,_cache){return _createElementVNode('div')}"
`;
```

```ts
it("element", () => {
  const ast = baseParse("<div></div>");
  transform(ast, {
    nodeTransforms: [transformElement],
  });
  const { code } = generate(ast);
  expect(code).toMatchSnapshot();
});
```

和插值一样

- 处理导入语句
- 处理`_createElementVNode` 函数

transformElement 中处理导入语句

```ts
import { CREATE_ELEMENT_VNODE } from "./../runtimeHelpers";
import { NodeTypes } from "../ast";

export function transformElement(node, context) {
  if (node.type === NodeTypes.ELEMENT) {
    context.helper(CREATE_ELEMENT_VNODE);
  }
}
```

`genNode` 加入 Element 类型的处理

```ts
function genElement(node: any, context: any) {
  const { push, helper } = context;
  const { tag } = node;
  push(`${helper(CREATE_ELEMENT_VNODE)}('${tag}')`);
}
```

生成`helper`函数 执行生成 `_createElementVNode`

## 生成联合三种类型的 Render 函数

目标生成这个

```ts
"const { createElementVNode: _createElementVNode, toDisplayString: _toDisplayString } from Vue
return function render(_ctx,_cache){return _createElementVNode('div'), null, \\"hi, \\" + _toDisplayString(_ctx.message)}"
`;
```

前面已经分开实现了三种, 那么联合在一起的话，又回遇到哪些问题呢

```ts
it("union 3 type", () => {
  const ast = baseParse("<div>hi,{{message}}</div>");
  transform(ast, {
    nodeTransforms: [transformElement],
  });
  const { code } = generate(ast);
  expect(code).toMatchSnapshot();
});
```

1. 修改`codegen`处理 Element 类型的逻辑, 因为生成的函数东西都是来自 Element 类型的 children 的节点(暂时 prop 先不做处理)

```ts
function genElement(node: any, context: any) {
  const { push, helper } = context;
  const { tag, children } = node;
  push(`${helper(CREATE_ELEMENT_VNODE)}('${tag}'), null`);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    genNode(child, context);
  }
}
```

```ts
- return function render(_ctx,_cache){return _createElementVNode('div'), null, "hi, " + _toDisplayString(_ctx.message)}
+ return function render(_ctx,_cache){return _createElementVNode('div'), null'hi,'_toDisplayString(message)}

```

- message 前面少了`_ctx`
- text 类型和插值类型直接多了个`+`

这个`+`符号如何得到呢
设计一个新的节点类型(复合类型) => 里面包含 Text 和插值 这 2 个类型

新建一个`transformText` 目的是为了将当前遍历的节点为 Element 节点，去处理它的子节点转成复合类型的节点

```ts
import { NodeTypes } from "../ast";

export function transformText(node) {
  /**
   * 判断当前节点是不是Text类型or插值类型
   * @param node
   * @returns
   */
  function isText(node) {
    return (
      node.type === NodeTypes.TEXT || node.type === NodeTypes.INTERPOLATION
    );
  }

  if (node.type === NodeTypes.ELEMENT) {
    let currentContainer;
    const { children } = node;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      // 如果是的话， 进行 `+`的操作
      if (isText(child)) {
        for (let j = i + 1; j < children.length; j++) {
          const next = children[j];
          if (isText(next)) {
            // init
            if (!currentContainer) {
              // 更新 Text or插值为复合类型
              currentContainer = children[i] = {
                type: NodeTypes.COMPOUND_EXPRESSION,
                children: [child],
              };
            }
            currentContainer.children.push(" + ");
            currentContainer.children.push(next);
            children.splice(j, 1);
            j--;
          } else {
            currentContainer = undefined;
            break;
          }
        }
      }
    }
  }
}
```

经过 transform 后 到了 codegen 阶段 就可以判断 node.type 是不是复合类型

因为复合类型的 children 长这样 `[Node, ' + ', Node]` Node 可能是 text 或者 插值
所以对 string`+`进行 push 处理，其他的还是走统一入口`gencode()`

```ts
function genCompoundExpression(node, context) {
  const { push } = context;
  const { children } = node;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isString(child)) {
      push(child);
    } else {
      genNode(child, context);
    }
  }
}
```

而处理复合类型 其实就是处理 Element 的 children[0]这个 node

```ts
function genElement(node: any, context: any) {
  const { push, helper } = context;
  const { tag, children } = node;
  push(`${helper(CREATE_ELEMENT_VNODE)}('${tag}', null, `);
  // for (let i = 0; i < children.length; i++) {
  //   const child = children[i];
  //   genNode(child, context);
  // }
  // =>
  const child = children[0];
  genNode(child, context);
  push(")");
}
```

但是呢， 这里的 children[0]不应该出现在`codegen.ts`里面(职责划分)

将这个逻辑 抽离到`transformElement`

```ts
export function transformElement(node, context) {
  if (node.type === NodeTypes.ELEMENT) {
    context.helper(CREATE_ELEMENT_VNODE);
    //中间处理层

    // tag
    const vnodeTag = node.tag;

    // props
    let vnodeProps;

    const { children } = node;
    const vnodeChildren = children[0];

    const vnodeElement = {
      type: NodeTypes.ELEMENT,
      tag: vnodeTag,
      props: vnodeProps,
      children: vnodeChildren,
    };

    node.codegenNode = vnodeElement;
  }
}
```

通过 node.codegenNode 传递处理好了的 Element

然后再`transform.ts#genCode`中 处理这个 node

```ts
function genCode(root) {
  const child = root.children[0];
  if (child.type === NodeTypes.ELEMENT) {
    root.codegenNode = child.codegenNode;
  } else {
    root.codegenNode = root.children[0];
  }
}
```

然后加入这个插件

```ts
transform(ast, {
  nodeTransforms: [transformText, transformElement],
});
```

需要换下位置, 因为 transfromText 先对 Element 的 children 处理后，在处理 Element 类型的 codegenNode

```ts
const vnodeChildren = children[0];
const vnodeElement = {
  type: NodeTypes.ELEMENT,
  tag: vnodeTag,
  props: vnodeProps,
  children: vnodeChildren,
};
```

这样的话 `codeGen#genElement` 过程中

就不需要使用`const child = children[0];`

```ts
function genElement(node: any, context: any) {
  const { push, helper } = context;
  const { tag, children } = node;
  push(`${helper(CREATE_ELEMENT_VNODE)}('${tag}', null, `);
  // for (let i = 0; i < children.length; i++) {
  //   const child = children[i];
  //   genNode(child, context);
  // }
  // =>
  // const child = children[0];
  genNode(children, context);
  push(")");
}
```

```ts

    - return function render(_ctx,_cache){return _createElementVNode('div', null, "hi, " + _toDisplayString(_ctx.message))}
    + return function render(_ctx,_cache){return _createElementVNode('div', null, 'hi,' + _toDisplayString(message))}
```

现在生成的代码中，还没有`_ctx.`
可以加入之前写的插件`transformExpression`即可

```ts
transform(ast, {
  nodeTransforms: [transformExpression, transformText, transformElement],
});
```

但是呢, 单侧执行后, 还是和之前一样, 说明这个插件没有使用到，分析一下

transform 遍历 plugin 过程中, 它的结构在`transformText`的时候发生的改变

所以需要将里面的插件的执行顺序进行干预处理

将`transformElement` 和 `transformText`使用闭包的封装起来, 然后修改`transform#traverseNodes`这个逻辑

```ts
function traverseNodes(node: any, context) {
  const { nodeTransforms } = context;
  // 对节点进行用户自义定插件处理
  const exitFns: any = [];
  nodeTransforms.forEach((transform) => {
    const onExit = transform(node, context);
    if (onExit) exitFns.push(onExit);
  });

  // 处理不同类型
  switch (node.type) {
    case NodeTypes.INTERPOLATION:
      context.helper(TO_DISPLAY_STRING);
      break;
    case NodeTypes.ROOT:
    case NodeTypes.ELEMENT:
      traverseChildren(node, context);
      break;
    default:
      break;
  }
  let i = exitFns.length;
  //倒序执行
  while (i--) {
    exitFns[i]();
  }
}
```

最后的倒序执行比较有意思,`i--` 先判断后计算 所以可以倒序执行, 要是换成`--i`就少执行里面的第 0 个了

由于倒序,

```ts
transform(ast, {
  nodeTransforms: [transformExpression, transformElement, transformText],
});
```

`transformElement, transformText` 换成这样的顺序才会正确处理里面的节点类型

其他的就是一些简单的重构了

对于 Element 类型的处理, 它有`tag` `props` `children`
将这些抽到一个统一处理判空

然后丢到一个统一入口处理`genNodeList`这些属性

```ts
function genNullable(args: any) {
  // Implement
  return args.map((arg) => arg || "null");
}
function genNodeList(nodes, context) {
  // Implement
  const { push } = context;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (isString(node)) {
      push(node);
    } else {
      genNode(node, context);
    }
    if (i < nodes.length - 1) {
      push(", ");
    }
  }
}
```

## Last Task: 实现编译 Template 成 Render 函数

App.ts

```ts
import { ref } from "../../lib/mini-vue.esm.js";
export const App = {
  name: "App",
  template: "<div>hi,{{count}}{{message}}</div>",
  setup() {
    const count = (window.count = ref(1));
    return {
      message: "hello-mini",
      count,
    };
  },
};
```

这里不传递 render，直接处理 template

```ini

                                    +---------------------+
                                    |                     |
                                    |  @vue/compiler-sfc  |
                                    |                     |
                                    +-----+--------+------+
                                          |        |
                                          v        v
                      +---------------------+    +----------------------+
                      |                     |    |                      |
        +------------>|  @vue/compiler-dom  +--->|  @vue/compiler-core  |
        |             |                     |    |                      |
   +----+----+        +---------------------+    +----------------------+
   |         |
   |   vue   |
   |         |
   +----+----+        +---------------------+    +----------------------+    +-------------------+
        |             |                     |    |                      |    |                   |
        +------------>|  @vue/runtime-dom   +--->|  @vue/runtime-core   +--->|  @vue/reactivity  |
                      |                     |    |                      |    |                   |
                      +---------------------+    +----------------------+    +-------------------+


```

官方告诉我们
编译器包不应从运行库导入项，反之亦然。如果需要在编译器端和运行时端之间共享某些内容，则应该将其提取到@vue/Shared 中。

那实现的 mini-vue 也跟着他说的做

在`src/index.ts`统一出口这里做传递 compile 函数的逻辑处理

```ts
// 入口
export * from "./runtime-dom";
export * from "./reactivity";

import { registerRuntimeCompiler } from "./runtime-dom";
import { baseCompile } from "./compiler-core/src";
import * as runtimeDom from "./runtime-dom";

function compileToFunction(template) {
  // code => function 代码的字符串
  const { code } = baseCompile(template);
  // function代码字符串 => function
  const render = new Function("Vue", code)(runtimeDom);
  // 返回render函数
  return render;
}

// 使用闭包的形式传递到runtime-dom里面
registerRuntimeCompiler(compileToFunction);
```

runtime-core 的`component.ts`中之前处理的 render 逻辑在`finishComponentSetup`里面
将传递过来的 `compileToFunction`缓存到`compiler`

```ts
let compiler;

export function registerRuntimeCompiler(_compiler) {
  compiler = _compiler;
}
function finishComponentSetup(instance: any) {
  const Component = instance.type;
  // template ==> render函数
  if (compiler && !Component.render) {
    if (Component.template) {
      // 这里就使用编译模块了
      Component.render = compiler(Component.template);
    }
  }
  /** 将组件的render函数 赋值给 组件实例 */
  instance.render = Component.render;
}
```

这是生成后的代码

```js
const {
  toDisplayString: _toDisplayString,
  createElementVNode: _createElementVNode,
} = Vue;
return function render(_ctx, _cache) {
  return _createElementVNode(
    "div",
    null,
    "hi," + _toDisplayString(_ctx.message)
  );
};
```

- `toDisplayString` 和 `createElementVNode` 是什么玩意
- 可以看到,我们没有`_ctx`对象, 前面实现的时候都是用`this`去处理的

toDisplayString: 用于处理插值类型的 使用 String 处理即可

```ts
export function toDisplayString(value) {
  return String(value);
}
```

`createElementVNode`: 处理 Element 类型, 就是生成虚拟 Node, 将`runtime-core/vnode.ts#createVNode` 换个名称导出来即可

```ts
export { createVNode as createElementVNode };
```

`_ctx`: 前面使用 this,那将处理的 render 函数的第一个参数也就是`_ctx`传入`proxy`即可

```ts
instance.update = effect(
  () => {
    // 第一次进来时(init)，这个isMounted为false
    if (!instance.isMounted) {
      const { proxy } = instance;
      /** 让instance的代理去执行组件的定义的render函数 返回的是一个subTree虚拟节点 */
      const subTree = (instance.subTree = instance.render.call(proxy, proxy));
      /** 调用patch方法挂载这个虚拟节点树 */
      patch(null, subTree, container, instance, anchor);
      /** 挂载后 subTree树会带有个el真实节点的属性 */
      /** 组件对应的根element元素遍历后赋予真实$el */
      initialVNode.el = subTree.el;
      instance.isMounted = true;
    } else {
      console.log("update");
      /** update component VNode */
      const { next, vnode } = instance;
      /** next不为空 说明可以更新组件 */
      if (next) {
        next.el = vnode.el;
        updateComponentPreRender(instance, next);
      }

      const { proxy } = instance;
      const subTree = instance.render.call(proxy, proxy);
      const prevSubTree = instance.subTree;
      instance.subTree = subTree;
      console.log("curr", subTree);
      console.log("prev", prevSubTree);
      patch(prevSubTree, subTree, container, instance, anchor);
      /** 组件对应的根element元素遍历后赋予真实$el */
    }
  },
  {
    scheduler() {
      console.log("update - scheduler");
      queueJobs(instance.update);
    },
  }
);
```

实现完毕 mini-vue

后续整理输出文档
