---
title: Webpack的DevServe、VueCLI、Vite的笔记
tags: ["Vue", "dev"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 七月 28日 2022, 1:37:28 下午
---
#Vue #dev #VueCli #Vite

# Webpack的DevServe、VueCLI、Vite的笔记

```js
//webpack.config.js中配置
devServe: {
	contentBase: path.resolve(__dirname, 'public')
	hot: true
}

```
## 开启HMR
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206072106293.png)

## VueCli
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206072124427.png)

### 安装与使用
```bash
// 安装
npm install @vue/cli -g
// 更新
npm update @vue/cli -g
// 使用
vue create `项目名称`
```
进入CLI命令行界面后，选择相关配置后自动创建个Vue项目给我们
```bash
vue ui
```
也可以使用这个可视化WEB界面进行配置。
### Vue CLI 原理
```json
"scripts": {
	"serve": "vue-cli-service serve",
	"build": "vue-cli-service build"
},
```
发现以前用`webpack`命令变了，变成了`vue-cli-service`。
运行`npm run serve`其实回去`node_modules/bin`找对应的命令名。
不过里面的命令名只是个短链接，真正的链接在`@vue/cli-service/bin/vue-cli-service.js`
#### Service
里面代码短短几十行
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206081430510.png)
使用了一个Service的构造函数，构造出一个实例并使用它的run方法
接下来，看看`../lib/Service`
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206081433238.png)
这个`name`是我们运行时的一个参数，比如`vue-cli-service serve` name就为serve
这个`this.commands`对象在`../lib/Service`中没有赋值，那么它在哪里赋值的呢？？
#### PluginAPI
`this.commands`是在`../lib/PluginAPI.js`中实现赋值
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206081442540.png)
而Service的构造函数中有个`this.resolvePlugins(plugins, useBuiltIn)`方法
#### resolvePlugins：
```js
resolvePlugins (inlinePlugins, useBuiltIn) {
    const idToPlugin = id => ({
      id: id.replace(/^.\//, 'built-in:'),
      apply: require(id)
    })

    let plugins

    const builtInPlugins = [
      './commands/serve',
      './commands/build',
      './commands/inspect',
      './commands/help',
      // config plugins are order sensitive
      './config/base',
      './config/css',
      './config/prod',
      './config/app'
    ].map(idToPlugin)

    if (inlinePlugins) {
      plugins = useBuiltIn !== false
        ? builtInPlugins.concat(inlinePlugins)
        : inlinePlugins
    } else {
      const projectPlugins = Object.keys(this.pkg.devDependencies || {})
        .concat(Object.keys(this.pkg.dependencies || {}))
        .filter(isPlugin)
        .map(id => {
          if (
            this.pkg.optionalDependencies &&
            id in this.pkg.optionalDependencies
          ) {
            let apply = () => {}
            try {
              apply = require(id)
            } catch (e) {
              warn(`Optional dependency ${id} is not installed.`)
            }

            return { id, apply }
          } else {
            return idToPlugin(id)
          }
        })
      plugins = builtInPlugins.concat(projectPlugins)
    }

    // Local plugins
    if (this.pkg.vuePlugins && this.pkg.vuePlugins.service) {
      const files = this.pkg.vuePlugins.service
      if (!Array.isArray(files)) {
        throw new Error(`Invalid type for option 'vuePlugins.service', expected 'array' but got ${typeof files}.`)
      }
      plugins = plugins.concat(files.map(file => ({
        id: `local:${file}`,
        apply: loadModule(`./${file}`, this.pkgContext)
      })))
    }

    return plugins
  }
```
- 上面代码中，定义了一个`idToPlugin`箭头函数，实现的效果就是遍历一个数组中的路径字符串，然后生成一个个含有`{id: xxx, apply: require(id) }`的对象
- 其中apply对应的是路径里面的module.exports的代码
- 后面又加载了一些其他的插件
- 最后返回这个plugins数组，里面包含了builtInPlugins数组中的`插件对象`和另一些插件

现在我们知道了这些插件对象在哪里生成的了，但在哪里引入的呢？ init

#### Init
Service.run方法中有个初始化init方法，这个方法中主要做了四件事：加载环境变量、加载用户配置、应用插件以及应用 `webpack` 配置。
```js
init (mode = process.env.VUE_CLI_MODE) {
    if (this.initialized) {
      return
    }
    this.initialized = true
    this.mode = mode

    // load mode .env
    if (mode) {
      this.loadEnv(mode)
    }
    // load base .env
    this.loadEnv()

    // load user config
    const userOptions = this.loadUserOptions()
    this.projectOptions = defaultsDeep(userOptions, defaults())

    debug('vue:project-config')(this.projectOptions)

    // apply plugins.
    this.plugins.forEach(({ id, apply }) => {
      if (this.pluginsToSkip.has(id)) return
      apply(new PluginAPI(id, this), this.projectOptions)
    })

    // apply webpack configs from project config file
    if (this.projectOptions.chainWebpack) {
      this.webpackChainFns.push(this.projectOptions.chainWebpack)
    }
    if (this.projectOptions.configureWebpack) {
      this.webpackRawConfigFns.push(this.projectOptions.configureWebpack)
    }
  }
```
看到对plugins进行了遍历，我们可以将 `this.plugins` 的值理解成 `resolvePlugins()` 方法中 `builtInPlugins` 数组映射之后的数组（该数组中的每个元素都是一个对象，对象中有 `id` 和 `apply` 两个属性），所以这里在遍历时解构出了 `id` 和 `apply`，之后调用了 `apply()` 方法，而根据前面的分析，这个 `apply()` 方法其实是 `resolvePlugins()` 方法中箭头函数 `idToPlugin` 返回的**对象中的 `apply` 属性对应的 `require(id)` 的结果。而 `require(id)` 中的 `id` 其实就是 `'./commands/serve'` 或者 `'./commands/build'` 等**

假如这里的 `id` 是 `'./commands/serve'`，那么 `require(id)` 就是 `require('./commands/serve')`，即 `./commands/serve` 文件中导出的内容，即 `id` 是 `'./commands/serve'` 时 `apply()` 方法就是 `./commands/serve` 文件导出的内容。

#### commands/serve.js
导出一个箭头函数，有2个参数，
传入的第一个参数是 `new PluginAPI(id, this)`[[#PluginAPI]]，这里的 `this` 是当前的 `service` 对象。也就是说 `./commands/serve` 中导出的箭头函数的第一个参数拿到的是一个 `PluginAPI` 类的实例对象，之后调用了这个实例对象的 `registerCommand()` 方法。
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206081520532.png)

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206081442540.png)
可以看到PluginAPI中的registerCommand方法第三个参数就是commands/serve.js中到出去的异步函数`serve`

`this.service.commands` 对象（即 `Service.js` 中 `run()` 方法中的 `this.commands` 对象）进行了赋值，赋值内容中就有将 `fn` 函数赋值进去。因此，之后在 `Service.js` 中 `run()` 方法中才能从 `command` 对象中解构出 `fn` 函数。

所以，当我们执行 `npm run serve` 命令时，传入的 `command` 的值就是 `serve`，后续执行的 `run()` 方法的最后执行的 `fn()` 方法其实就是 `lib/commands/serve.js` 文件中导出的箭头函数中调用 `api.registerCommand()` 方法时传入的第三个参数即 `serve()` 函数了。

#### 总结
使用`vue-service-cli xxxx` 命令执行时，会去执行`@vue/cli-service/bin/vue-cli-service.js`的service实例的`run`方法。而这个实例对应的Service类中有很多方法，主要看run方法。**里面有个init方法，先初始化整个环境**。在执行对应`command.fn方法`

#### 参考链接
[Vue CLI 之 cli-service 源码解析（1）](https://juejin.cn/post/7058460792059854856)
[Vue CLI 之 cli-service 源码解析（2）](https://juejin.cn/post/7059019444546175006)
[Vue CLI 之 cli-service 源码解析（3）](https://juejin.cn/post/7059384798459985928)



## Vite
下一代构建工具

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206081701766.png)
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206081702800.png)

### 实操
从零开始学，vite官网的教程使用的脚手架，不太好入学。
```bash
npm install vite -g 全局安装

npm install vite -D 本地安装
```
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206081724884.png)
math.js
```js
export const sum = (a, b) => a + b;
```
main.js
```js
import { sum } from "./math.js";
console.log("hello world");
console.log(sum(20, 30));
```
index.html
```html
<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<script src="./src/main.js" type="module"></script>
	<body></body>
</html>
```

写些简单的js，并使用ESM模块化去导入使用。
```bash
npx vite
```
运行vite，发现启动了3000服务
> **注意点：**
> 使用vite后，import导入模块时，不需要用`.js`后缀了，直接可以使用文件名，因为vite帮我们做了处理，导入第三方后，如lodash库，若没有使用构建工具去处理的话，我们可能需要导入lodash里面好多依赖的方法，但使用了vite后，只需要导入正在使用的js文件即可。
#### css支持
vite不像webpack，引入css需要配置`css-loader`, `style-loader`直接使用即可。
#### Less
编写less文件
```less
@fontSize: 18px;
@fontColor: red;
.title {
	font-size: @fontSize;
	color: @fontColor
}
```
安装less依赖
```bash
npm install less -D
```
使用js插入一些dom元素
```js
import "./less-style.less";
const p = document.createElement("p");
p.className = "title";
p.innerText = "pppp";
document.body.appendChild(p);
```
#### 配置poStcss
对浏览器的某些CSS属性做浏览器设配
安装依赖
```bash
npm i postcss -D
```
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206082201008.png)
发现没有适配，原因是我们还没对postcss做配置
```bash
npm i postcss-preset-env
```
创建postcss.config.js
```bash
module.exports = {
	plugins: [require("postcss-preset-env")],
};
```
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206082215784.png)
#### Ts
创建个ts
```ts
export default function (num1: number, num2: number): number {
	return num1 + num2;
}
```
```js
import xxx from './ts/demo.ts'

xxx(1, 2)
```
发现vite默认就支持ts

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206091059703.png)
#### connect服务器
查看浏览器的network发现，加载了ts与less的静态资源。嗯？浏览器是不会解析这种文件，点击ts、less查看文件，发现是esm的js代码。为啥呢？
> 原来是vite的本地服务器connect帮我们做了转换，我们的静态资源到浏览器的时候，vite的connect服务器帮这些浏览器不识别的后缀文件做了esmodule的js的转换（浏览器可以加载这种js文件）。 所以浏览器加载后，可以使用这些js代码，并执行执行。
#### Vue
看看vite对vue的支持
> 首先安装vue3的依赖
```bash
npm install vue@next -D
```
创建个`.vue`单文件 ./src/vue/App.vue
```vue
<template>
    <div>
        <h2>{{msg}}</h2>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msg: 'hello Hbisedm'
        }
    }
}
</script>
<style scoped>
h2 {
    color: red;
}
</style>
```
main.js内使用vue的createApp并挂载到index.html内
```js
import { createApp } from "vue";
import App from "./vue/App.vue";
  
createApp(App).mount("#app");
```
在index.html新增个`id为app的div标签`
```html
<body>
	<div id="app"></div>
</body>
```

运行vite
发现报错了。
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206091131239.png)
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206091131468.png)
我们需要配置vite对vue的支持。
```bash
npm i @vitejs/plugin-vue -D
```
安装的这个依赖是vite的插件，那么就需要我们进行配置了。
创建根目录下`vite.config.js`
运行vite
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206091137069.png)
因为我们的vite是全局的，不是本地的
本地安装个vite
```bash
npm i vite -D
```
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206091339982.png)
```js
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [vue()]
}
```
因为当前我的`@vitejs/plugin-vue`和`vue`版本都挺高的，所以不用装`@vue/compiler-sfc`
运行`npx vite`就可以看到渲染出来了。
##### 全局自定义元素
TestCE.vue
```vue
<template>
	<div>
		<p>123</p>
	</div>
</template>
<script>
export default {}
</script>
<style>
p {font-size: 22px;}
</style>
```
在main.js中定义全局自定义元素
```js
import { defineCustomElement } from "vue";
import TestCEVue from "./vue/TestCE.vue";
const testVue = defineCustomElement(TestCEVue);
const styles = ["p {font-size: 32px; color: red;}"];
const testStyleVue = defineCustomElement({ ...TestCEVue, styles });\
  
customElements.define("test-vue", testVue);
customElements.define("test-style-vue", testStyleVue);
```
不用写import语句引入组件，直接使用就行。
```vue
<template>
	<div>
		<h2>{{msg}}</h2>
		<test-vue></test-vue>
		<test-style-vue></test-style-vue>
		<p>123</p>
	</div>
</template>
```
上面的`./vue/TestCE.vue`的style不需要写scope。这个style不会污染全局的style。
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206091339780.png)

#### 预打包
vite预打包后的结果
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206091432515.png)
将他删除后，重新运行vite，会重新再生成一个，类似缓存的意思。如果有的话，运行vite会更快点。


