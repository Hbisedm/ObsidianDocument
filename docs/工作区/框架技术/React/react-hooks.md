---
title: React-hooks的笔记
tags: ["react-hooks"]
创建时间: 星期六, 二月 11日 2023, 10:02:34 晚上
修改时间: 星期六, 二月 11日 2023, 10:22:10 晚上
---

#React #Hooks 

# React-hooks的笔记

> 记录一些常用的官网hook的使用

## useState

定义一个值(可以是引用也可以是基本数据类型)，交给React去管理它的数据变化

使用

```ts
import {useState} from 'React'

function App() {
	const [count, setCount] = useState(0)
}
```

返回值： 一个数组包含一个状态数据， 和一个更新状态的函数

有2种写法

```ts
setCount(count + 1)
setCount(prev => prev +1)
```

一般写第二种，因为react的状态数据更新是异步的，如果写第一种写法，无法很好更新到我们想要的效果，比如：

```ts
// 触发这个函数后还是只自增1
const handleUpdateCount = () => {
	setCount(count + 1)
	setCount(count + 1)
}

// 触发这个函数后还是只自增2
const handleUpdateCount = () => {
	setCount(prev => prev + 1)
	setCount(prev => prev + 1)
}
```

因为React中的数据都是不可变的, 还有个时间切片的概念, 所以第一种写法中的count都是上一次的值，也就是0, 而写成函数的形式的话，prev是React传递上一次的值给我们定义的函数体里面，所以prev永远是最新的上一个值。


## useEffect

```ts
import { useEffect } from 'React'

function App() {
	useEffect(() => {
	// 页面挂载触发
    const keyHandler = (event: KeyboardEvent) => {
      console.log(event.code);
    };

    document.addEventListener("keydown", keyHandler);
    return () => {
      // 页面卸载触发
      document.removeEventListener("keydown", keyHandler);
    };

	}, [])
}
```

useEffect 可以模拟出Vue中的 onMounted, watch, onDestory

重点说下他的依赖项， 如果不给依赖项的话，那么React当做这个副作用是页面重新渲染就触发的。

## useCallback

useCallback其实就是一个useMemo的封装

在function中写的函数, 每次如果不使用useCallback包裹的话, 那么都会重新执行定义, 造成没必要的创建。

useCallback可以为我们第一次创建的函数引用进行缓存，当依赖项发生后，对函数引用再次更新。也就是拿到了最新的值状态更新引用。


## useMemo

简单理解就是Vue的计算属性， 看下下面段代码， 就可以大概认知useMemo的作用了。

```ts
  const [stuList, setStuList] = useState<IStu[]>([]);

  useEffect(() => {
    async function fetch() {
      const list = (await fetchStuList(3000)) as IStu[];
      setStuList(list);
    }
    fetch();
  }, []);

  // 这样写 很麻烦
  const [stuNameList, setStuNameList] = useState<string[]>([]);
  useEffect(() => {
    const stuNames = stuList.map((item) => item.name);
    setStuNameList(stuNames);
  }, [stuList]);

  // 使用useMemo
  const stuNameLists = useMemo(() => {
    return stuList.map((item) => item.name);
  }, [stuList]);
```

如果不写useMemo, 虽然用useEffect和useState配合起来也可以达到效果, 但是呢，写法麻烦，而且没有useMemo来的清晰。


