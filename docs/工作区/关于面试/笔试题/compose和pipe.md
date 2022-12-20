---
title: compose和pipe的笔记
tags: ["compose和pipe"]
创建时间: 星期一, 十二月 12日 2022, 5:27:46 下午
修改时间: 星期二, 十二月 13日 2022, 11:35:04 中午
---
#compose #pipe

# compose和pipe的笔记

- compose 组合
- pipe 管道

## Compose

> 从右向左执行

```ts

const add = x => x + 1
const mul = x => x * 2
// 组合计算的话(先相加后相乘)
mul(add(1)) // 4
// 那么如果要做修改操作步骤，又得改里面的步骤
// 这种情况使用compoose
compose(mul, add)(1) // 4 

```

### 如何实现compose

1. 递归
2. 迭代
3. reduce

```ts
function add(x) {
  return x + 2;
}

function mul(x) {
  return x * 20;
}

function sub(x) {
  return x - 10;
}

console.log("普通调用");
const common = mul(add(sub(1)));
console.log(common);

function composeRecursive(...funcs) {
  let count = funcs.length - 1;
  let result = undefined;
  return function fn(x) {
    if (count < 0) {
      return result;
    }
    result = funcs[count--](x);
    return fn(result);
  };
}

const recursive = composeRecursive(mul, add, sub);
console.log("递归");
console.log(recursive(1));

function composeIteration(...funcs) {
  const callback = function (func1, func2) {
    return function (x) {
      return func1(func2(x));
    };
  };

  let func = funcs[0];

  for (let i = 1; i < funcs.length; i++) {
    func = callback(func, funcs[i]);
  }

  return func;
}

console.log("迭代");
const iterVersion = composeIteration(mul, add, sub);
console.log(iterVersion(1));

function composeReduce(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => {
    return (x) => {
      return a(b(x));
    };
  });
// return funcs.reduce((a, b) => (x) => a(b(x)))
}

console.log("reduce");
const reduceVersion = composeReduce(mul, add, sub);
console.log(reduceVersion(1));

```

## Pipe

> 与compose不同的是, 它是从左往右执行

```ts
function pipe(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reverse().reduce((a, b) => (x) => a(b(x)));
}

console.log("pipe");
const pipeVersion = pipe(sub, add, mul);
console.log(pipeVersion(1));

```


