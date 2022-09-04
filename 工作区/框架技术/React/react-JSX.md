---
title: react-JSX的笔记
tags: ["react-JSX"]
创建时间: 星期六, 九月 3日 2022, 5:53:22 下午
修改时间: 星期日, 九月 4日 2022, 3:47:58 下午
---
#jsx #react

# react-JSX的笔记

> jsx语法 (javaScript XML)(javaScript拓展语法)
> 它不同于vue，不用专门学习模版语法的指令(v-bind 、v-for ....)

> 为啥需要这种语法?
>
> react将虚拟dom转成真实dom需要个render函数，而开发者使用render函数进行开发代码，太不友好了。使用jsx的语法，让babel帮我们转render函数。开发者的视野只关注jsx如何的写，灵活地编写JavaScript代码进行开发网页。
> React认为渲染逻辑本质上与其他UI逻辑存在内在耦合
> 如: UI需要绑定事件，UI展示数据状态
> 他们之间密不可分，所以React没有将标记分离到不同的文件中。而是将他们组合到一起，这个地方就是组件

## 匹配

`<` 开头识别为`tag` or `component`
`{` 开头识别为JavaScript代码


## 规范

1. jsx顶层只能有一个根元素，很多时候用div 当然也可以使用Fragment
2. 为了方便阅读，通常jsx外层包裹一个小括号`()`，这样jsx可以进行换行书写。
3. jsx中的标签可以使用单标签，也可以是双标签。


## 注释

注释语法
```jsx
	{/* 单行注释 */}
	
	{/* 
		多行注释 
	*/}
```



### 嵌入数据

使用`{}`显示state的数据

`null` `undefined` `true` 不能显示的数据 主要用于逻辑判断的处理如三目运算符，`if/else` ....

如果需要显示这些的话
- 使用`xxx.toString()` `null`和`undefined` 没有这个方法
- `String(xxx)`
- `xxx + ''`


不能将对象作为有效的值，这一点和Vue有区别
所以不能在视图看到对象的json的结构

### 表达式

```jsx
	<h1>表达式</h1>
	{/* 运算符表达式 */}
	<h3>{name + ' ' + age}</h3>
	<h3>{2 * 10}</h3>
	{/* 三目运算符 */}
	<h3>{this.state.unDisplay3 ? '1' : '0'}</h3>
	{/* 函数表达式 */}
	<h3>{this.getInfo()}</h3>
```

### 绑定属性

通用属性

```jsx
    <h3 title={this.state.title}> title</h3>
    <img src={this.state.img} alt="react" width="100px" height="50px" />
```
#### Class

jsx中需要将clss属性写作className, class在javaScript中是关键字。
其他类似的情况还有很多
class => className
for => htmlFor


动态添加class
前两种写法 渲染后是一样的
```jsx 
<div className="abc"></div>
<div className={"abc"}></div> 
<div className={"abc" + (active ? 'active' : '')}></div>
```
#### Style

绑定style属性

写对象的格式，css的key写成驼峰格式

```jsx
	<div style={{ color: 'red', backgroundColor: 'green' }}>test </div>
```


### 事件绑定

```jsx
        btnClick() {
            console.log(this)
        }
```

### 显示绑定
```jsx
            const eventDemo = (
                <button onClick={this.btnClick.bind(this)}>click</button>
            )
```

显示绑定太麻烦，希望写法为下面这种
```jsx
            const eventDemo = (
                <button onClick={this.btnClick}>click</button>
            )
```


#### 箭头函数 (**class fields**)
```jsx
	const btnClick = () => {
		console.log(this)
	}
```
需要换成箭头函数的写法，这跟ES6的语法有关。[[Function]]

#### class组件的construct中
```jsx
constructor() {
	super()
	this.btnClick = this.btnClick.bind(this)
}
```

#### 推荐写法
也可以下面这种写法
直接传入一个箭头函数，箭头函数中调用需要执行的函数
传递参数也方便
```jsx
return (
	<button onClick={() => this.onClick()}>
		click
	</button>
)
```




如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在**构造器中绑定**或使用 **class fields** 语法来避免这类性能问题。

#### 传递参数

```jsx
 <button onClick={(e) => this.btnParamClick('1', 'Sam', e)}>参数调用</button>
 <button onClick={this.btnParamClick1.bind(this, '1', 'Sam')}>参数调用</button>
```
上述两种方式是等价的

在这两种情况下，React 的事件对象 `e` 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 `bind` 的方式，事件对象以及更多的参数将会被隐式的进行传递。


## 条件渲染

1. 三目运算符

```jsx
    class App extends React.Component {

        constructor() {
            super()
            this.state = {
                real: false
            }
        }

        switchHandle = () => {
            this.setState({
                real: !this.state.real
            })
        }

        render() {
            return (
                <div>
                    {
                        this.state.real ?
                            <ComponentB></ComponentB> : <ComponentA></ComponentA>
                    }
                    <button onClick={this.switchHandle}>切换</button>
                </div >
            )
        }
    }

```

2. 函数式组件进行切换, 主要用到**if**

```jsx

    function Greeting(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
            return <UserGreeting />;
        }
        return <GuestGreeting />;
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    // Try changing to isLoggedIn={true}:
    root.render(<Greeting isLoggedIn={false} />);

```

 3. 运算符 &&

在 JavaScript 中，`true && expression` 总是会返回 `expression`, 而 `false && expression` 总是会返回 `false`。

```jsx
render() {
	return <div>{msg && Message: {msg}}</div>
}
```

### 阻止渲染

在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 `render` 方法直接返回 `null`，而不进行任何渲染。








## 本质

jsx -> createElement(函数) -> ReactElement(对象) -> ReactDOM.render -> 真实DOM

为什么需要虚拟DOM (性能)

- 很难跟踪状态发生的改变
	- 传统开发 使用console.log() / debugger
	- vue or react 可以使用浏览器对应的devtool插件
- 操作真实DOM性能较低
	- 传统开发频繁操作DOM，性能低
	- DOM操作引起浏览器的回流和重绘
- 命令式编程 => 生命式编程
- 虚拟DOM的编程理念
	- UI以一种理想化或虚拟化的方式存在内存中。
	- 通过ReactDOM.render 将虚拟DOM和真实DOM同步起来，这个过程叫做协调(Reconciliation)
-  




