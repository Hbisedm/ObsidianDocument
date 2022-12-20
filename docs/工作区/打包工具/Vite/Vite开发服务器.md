---
title: Vite开发服务器的笔记
tags: ["Vite开发服务器"]
创建时间: 星期五, 十月 7日 2022, 8:39:53 晚上
修改时间: 星期日, 十月 9日 2022, 12:15:30 凌晨
---
#vite #dev服务器

# Vite开发服务器的笔记

## 读取文件的原理

在使用vite 开发服务器 的时候，会发现可以使用后缀为`js` `vue` 等的文件

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202210072048232.png)

这是因为vite开发服务器帮我们做了转换。

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202210072050659.png)

我们写的sfc文件 经过 vite的转换， （sfc -> ast树 -> render -> js ）

得到js代码，这样浏览器才可以识别并使用。

> 因为在浏览器和服务器的眼里，你的资源文件都是字符串

只需要将响应头`Content-Type`设置为`text/javascript` 管你什么后缀，通通当做js去解析。

## 读取Css的处理

1. vite在读取main.js中引用了css的文件
2. 使用fs模块去读取css文件
3. 创建style标签，将css文件内容copy进入style标签
4. 将这个style标签插入到html的head中
5. 将css文件的内容替换为js脚本，（方便热更新和css模块化） Content-Type 设置为js


### CSS模块化

#### 为什么需要CSS模块化

协同开发过程中，使用同一个class类名，A的开发的`footer` 与 B开发的`footer` 同名，导致后面引入的css会覆盖之前的。 出现样式丢失。

```js
import 'xxxA.css'
import 'xxxB.css'

divA.className = 'footer'
divB.className = 'footer'
```

为了解决上述问题

将A开发的css 改为 `xxxA.module.css`
将B开发的css 改为 `xxxB.module.css`

引入时

```js
import componentACss from 'xxxA.module.css'
import componentBCss from 'xxxB.module.css'

divA.className = componentACss.footer
divB.className = componentBCss.footer
```

#### 原理

> 基于Node

1. `module.css` (module是一种约定，表示需要开启模块化)
2. 它会将`module.css`的内容进行一定规则的替换(将`footer`替换成`_footer_1gh66_1`)
3. 同时创建一个映射对象 `{footer: '_footer_1gh66_1'}`
4. 将替换过后的内容塞进style标签里，然后放入head标签
5. 将`xxx.module.css`全部抹除，替换成js脚本语言
6. 将创建的映射对象默认导出

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202210072135493.png)

`vite.config.js`修改css模块化的行为

[css-modules](https://cn.vitejs.dev/config/shared-options.html#css-modules)**配置 CSS modules 的行为**。选项将被传递给 [postcss-modules](https://github.com/css-modules/postcss-modules)。

- localsConvention 修改类名的展示形式(驼峰还是中划线)
- generateScopedName 修改生成类名的规则 （postcss module 规则）(因为这里的css最后都会走[postcss-modules 生成规则](https://github.com/webpack/loader-utils#interpolatename))
- scopeBehaviour 全局(global)还是模块化(local) 默认是模块化

```js
 css: {
    modules: {
      localsConvention: "camelCaseOnly", //将xxx-yyy 修改为 xxxYyy
      generateScopedName: "[name]_[local]_[hash:5]",
      scopeBehaviour: "local",
    },
  },
```

操作：

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202210072146949.png)

```js
import lessTest from "./test.module.less";
console.log(lessTest);
```

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202210072145072.png)


### 预处理器

> less sass ...

编译 预处理css语言

例如
```bash
npm i less // 安装后项目中就有lessc编译器

npx lessc --m="always" ./src/test.module.less
```

```less
.content {
  .main {
    .main-info {
      font-size: 22px;
      margin: (10px * 2);
      padding: 10px * 2;
    }
  }
}
```

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202210072225886.png)


上面是介绍lessc的编译器的使用，sass scss等等也有对应的编译选项(看对应的官方文档)

变量
```less
@defaultColor: red
html {
	background: @defaultColor;
}
```

可以抽离去网页的主题色

那么可以使用一个全局文件来放置这些全局样式

创建一个`variables.less` 里面放置全局样式

在需要使用的less文件引入`@import url("./variables.less");`

但其实可以有lessc的编译选项中配置全局变量，这样节省写这些引入语句

#### Vite中使用预处理器配置选项

而在vite webpack中 可以通过配置来引入

```js

css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName: "[name]_[local]_[hash:5]",
      scopeBehaviour: "local",
      hashPrefix: "hbisedm",
    },
    preprocessorOptions: { // 对预处理器进行配置
      less: { //配置lessc的配置选项
        
      },
      sass: { // 对应的引入哪有预处理器，就配置哪个
      }
    }
  },
```

例如

定义全局变量文件 `variables.less`
```less
@defaultColor: red;
```

vite使用预处理器选项配置全局变量 `vite.config.js`

```js
css: {
	preprocessorOptions: {
	      less: { //配置lessc的配置选项
	      mainColor: 'green'        
	      },
	}
}
```

目标less文件中使用
```less
@import url("./variables.less");
.content {
  .main {
    .main-info {
      font-size: 22px;
      margin: (10px * 2);
      padding: 10px * 2;
      background: @defaultColor; // 来自引入的文件
      color: @mainColor; // 来自配置选项的配置
    }
  }
}
```

生成结果

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202210072236187.png)

##### 小结
正常用[全局配置的写法](https://lesscss.org/usage/#less-options-global-variables)即可， 那种使用`@import`频繁的导入没啥必要

### sourceMap

> 帮助开发过程中出现错误代码，快读找到出错位置

```js
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName: "[name]_[local]_[hash:5]",
      scopeBehaviour: "local",
      hashPrefix: "hbisedm",
    },
    preprocessorOptions: {
      less: {
        math: "always",
        globalVars: {
          mainColor: "green",
        },
      },
    },
    devSourcemap: true
  },
```


## PostCss

> vite天生对postcss有良好支持， 先了解PostCss

联想babel，做兼容处理

1. 对css的新提案做兼容
2. 浏览器前缀补全
3.
