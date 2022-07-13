---

title: Vue的监听与观察

date: 2022-05-26 12:42:26

tags: ["Vue"]

excerpt: Vue的watch与computed

---



computed:

- computed是计算属性,也就是计算值,它更多用于计算值的场景
- computed具有缓存性,computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时才会重新调用对应的getter来计算 computed适用于计算比较消耗性能的计算场景

watch:

- 更多的是「观察」的作用,类似于某些数据的监听回调,用于观察props $emit或者本组件的值,当数据变化时来执行回调进行后续操作
- 无缓存性，页面重新渲染时值不变化也会执行

小结:

- 当我们要进行数值计算,而且依赖于其他数据，那么把这个数据设计为computed
- 如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化