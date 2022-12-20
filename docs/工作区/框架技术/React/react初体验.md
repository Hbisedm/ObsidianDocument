---
title: react初体验的笔记
tags: ["react原生开发"]
创建时间: 星期六, 九月 3日 2022, 2:51:24 下午
修改时间: 星期六, 九月 3日 2022, 4:35:48 下午
---
#React

# react初体验的笔记

>  入门教程(cdn方式)


## 引用

需要依赖三个库
- react (react核心代码)
- react-dom (dom渲染器)
- babel (转换器、低版本支持语法)


### 引入方式

- cdn
- 下载源js文件，本地引入
- npm脚手架


### 简单例子

```js

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>

<body>
    <div id="app"></div>
</body>

<script type="text/babel">
    const container = document.querySelector('#app')

    // 组件化
    class App extends React.Component {
        constructor() {
            super()
            this.message = 'start' 
            // state的方式
            this.state = {
                message: 'hello, react'
            }
        }
        changeWord() {
            console.log(this)
            this.setState({
                message: 'word changed'
            })
            this.message = 'end'
            this.forceUpdate()
        }
        render() {
            return (<div>
                <h2>{this.message}</h2>
                <h3> {this.state.message} </h3>
                <button onClick={this.changeWord.bind(this)}>change</button>
            </div>)
        }
    }

    // before
    // ReactDOM.render(rootRenderContent, container)
    
    // 18 version new grammar
    const root = ReactDOM.createRoot(container)
    function render() {
        root.render(<App />)
    }
    render()
</script>
</html>

```

- 一个通过组件实例的属性 (使用这方式需要手动调用刷新 `forceUpdate`)
- 一个通过组件的state进行
- 正常开发都是将这些具有状态意义的数据放到state里面交给react它帮我们进行管理数据。(react组织代码的方式)



简单入门完毕