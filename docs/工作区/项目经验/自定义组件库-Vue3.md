---
title: 自定义组件库的笔记
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期日, 十二月 4日 2022, 8:41:27 晚上
---

#自定义组件 #vue

# 自定义组件库的笔记

## Monorepo

> 在一个大的项目仓库中，管理多个模块/包（package），这种类型的项目大都在项目根目录下有一个 packages 文件夹，分多个项目管理。
> 简单来说：**单仓库 多项目**
> 目前很多我们熟知的项目都是采用这种模式，如 Vant，ElementUI，Vue3 等

## Pnpm

> 打造一个 menorepo 环境的工具有很多，如：lerna、pnpm、yarn 等，这里我们将使用 pnpm 来开发我们的 UI 组件库。
> 因为它简单高效，它没有太多杂乱的配置

### 安装、初始化

```shell
nvm use 16.14.0 //版本16
npm install pnpm -g
pnpm init
```

### npmrc 文件

**根**目录创建`.npmrc`文件
输入配置

```ini
shamefully-hoist = true
```

如果某些工具仅在**根**目录的**node_modules**时才有效，可以将其设置为 true 来提升那些不在根目录的**node_modules**，就是将你安装的依赖包的依赖包的依赖包的...都放到同一级别（扁平化）。说白了就是不设置为 true 有些包就有可能会出问题。

## monorepo 的实现

新建配置文件`pnpm-workspace.yaml`
目的是 为了各个项目直接能够相互引用

```yaml
packages:
  - "packages/**"
  - "examples"
```

这样设置后，根目录下的`pageckage`目录与`example`目录就会关联起来。当然未来若需要关联更多目录的话，往这里添加即可。

- packages：存放开发的包
- examples：调试开发好的组件

examples 文件夹使用 vite 搭建一个基于 vue3 脚手架项目

## 安装相应依赖

开发环境中的依赖一般全部安装在整个项目根目录下，方便未来每个包都可以引用到。所以安装的时候需要加个参数`-w`

```shell
pnpm i vue@next typescript less -D -w
```

- vue@next：因为开发 vue3 组件，所以需要个 vue3
- typescript：加些类型限制，ts 是现在主流的开发方式
- less：写样式方便，使用它的命名空间

## 配置 tsconifg.js

初始化

```shell
npx tsc --init
```

tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "jsx": "preserve",
    "strict": true,
    "target": "ES2015",
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "moduleResolution": "Node",
    "lib": ["esnext", "dom"]
  }
}
```

## 搭建 vite-vue3 项目(examples)

> 其实搭建一个 vite+vue3 项目是非常容易的，因为 vite 已经帮我们做了大部分事情

安装

```shell
cd examples
pnpm init
pnpm install vite @vitejs/plugin-vue -D -w
```

@vitejs/plugin-vue 用来支持.vue 文件的转译
这里安装的依赖也是在根目录中

### 配置 vite.config.ts

跟着官方配置即可

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```

### 新建 html 文件

@vitejs/plugin-vue 会默认加载 examples 下的 index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="main.ts" type="module"></script>
  </body>
</html>
```

> vite 基于 esm，所以 script 标签需要设置`type="module"`

### app.vue

```xml
<template>
    <div>
        启动测试
    </div>
</template>
```

### main.ts

```ts
import { createApp } from "vue";
import App from "./app.vue";

const app = createApp(App);

app.mount("#app");
```

此时会发现编译器报 找不到`./app.vue`

因为直接引入.vue 文件 TS 会找不到对应的类型声明；所以需要新建 typings（命名没有明确规定，TS 会自动寻找.d.ts 文件）文件夹来专门放这些声明文件。

#### typings/vue-shim.d.ts

TypeScriptTS 默认只认 ES 模块。如果你要导入.vue 文件就要 declare module 把他们声明出来。

```ts
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
}
```

### 脚本启动

配置 package.json

```json
scripts: {
	"dev": "vite"
}
```

`pnpm run dev`

这里页面渲染出启动测试，说明测试环境已经搭建完成了。
下面搭建组件开发需要的环境。

## 本地调试

### 新建包文件

> 本节可能和目前组件的开发关联不大，但是未来组件需要引入一些工具方法的时候会用到
> 接下来就是要往我们的 packages 文件夹冲填充内容了。

utils 包

一般 packages 要有公共方法，工具函数等等

既然它是个包，那么终端创建 utils、并进去初始化

```shell
cd packages
mkdir utils
cd utils
pnpm init
```

修改`package.json`的 name 属性为`"name": "@hbisedm-ui/utils"`
表示这个 utils 包是属于 hbisedm-ui 组织下的。所以记住发布之前要登录 npm 新建一个组织`hbisedm-ui`

```json
{
  "name": "@hbisedm-ui/utils",
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

因为我们使用 ts 写的，所以需要将入口文件 index.js 改为 index.ts，并新建 index.ts 文件:(先导出一个简单的加法函数)

```typescript
export const sum = (a: number, b: number): number => {
  return a + b;
};
```

#### 组件库包

> 命名为`hbisedm-ui`

```shell
cd ..
mkdir components
cd components
pnpm init
```

```json
{
  "name": "hbisedm-ui",
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

新建 index.ts 入口文件并引入 utils 包

```typescript
import { sum } from "@kitty-ui/utils";

const result = sum(1, 1);

console.log(result);
```

#### Esno

> esno 用来执行 ts 文件

```shell
npm i -g esno //全局安装
esno index.ts
```

### 包之间的本地调试

回到`component`文件夹，在此文件夹下，执行

```shell
pnpm install @hbisedm-ui/utils
```

建立联系，pnpm 创建软连接指向 utils 包，此时的`package.json`的结构

```json
{
  "name": "hbisedm-ui",
  "version": "1.0.1",
  "main": "index.ts",
  "scripts": {
    "build": "vite build"
  },
  "keywords": ["hbisedm-ui", "vue3组件库"],
  "author": "hbisedm",
  "license": "MIT",
  "typings": "lib/index.d.ts",
  "dependencies": {
    "@hbisedm-ui/utils": "workspace:^1.0.0"
  }
}
```

可以看到`@hbisedm-ui/utils` 的版本号是`workspace:^1.0.0`，因为 pnpm 是由 workspace 管理的，所以有一个前缀 workspace 可以指向 utils 下的工作空间从而方便本地调试各个包之间的关联引用。

## 开发 Button 组件

`components`文件夹下创建`src`，进入`src`文件夹创建`button`组件文件夹此时 components 目录为

```lua
-- components
  -- src
    -- button
    -- index.ts
-- package.json
```

> 先测试 button 组件是否在 examples 的 vue3 项目引用

进入`components/src/button`创建`button.vue`

```xml
<template>
    <button>测试按钮</button>
</template>
```

创建`components/src/button/index.ts`

```ts
import Button from "./button.vue";

export default Button;
```

创建`components/index.ts`

```ts
import Button from "./src/button";
export { Button };
```

好了，接下来去 examples 目录测试这个简单的 button 组件

## vue3 项目引入 button

> 前面说过在 workspace 执行`pnpm i xxx`时，pnpm 会自动创建软链接指向 workspace 内的 xxx 包

进入`examples` 执行

```shell
pnpm i hbisedm-ui
```

此时`examples/package.json`多了个

```json
"dependencies": {
    "hbisedm-ui": "workspace:^1.0.1"
}
```

进入`examples/app.vue`引入 button 组件

```xml
<template>
  <Button></Button>
</template>
<script setup lang="ts">
import { Button } from "hbisedm-ui";
</script>
```

执行

```shell
pnpm run dev
```

渲染出 自定义组件 button

初步工作完成。接下来规范下这个 button 组件

回到`components/src/button`创建`types.ts`

```ts
import { ExtractPropTypes } from 'vue'

export const ButtonType = ['default', 'primary', 'success', 'warning', 'danger']

export const ButtonSize = ['large', 'normal', 'small', 'mini'];


export const buttonProps = {
  type: {
    type: String,
    values: ButtonType
  },
  size: {
    type: String,
    values: ButtonSize
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

```

> import type 表示只导入类型；ExtractPropTypes 是 vue3 中内置的类型声明,它的作用是接收一个类型，然后把对应的 vue3 所接收的 props 类型提供出来，后面有需要可以直接使用

> 很多时候我们在 vue 中使用一个组件会用的 app.use 将组件挂载到全局。要使用 app.use 函数的话我们需要让我们的每个组件都提供一个 install 方法，app.use()的时候就会调用这个方法;

调整下`button/index.ts`

```ts
import button from "./button.vue";
import type { App, Plugin } from "vue";
type SFCWithInstall<T> = T & Plugin;
const withInstall = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    //注册组件
    app.component((comp as any).name, comp);
  };
  return comp as SFCWithInstall<T>;
};
const Button = withInstall(button);
export default Button;
```

此时我们就可以使用 app.use 来挂载我们的组件啦

其实 withInstall 方法可以做个公共方法放到工具库里，因为后续每个组件都会用到，这里等后面开发组件的时候再调整

到这里组件开发的基本配置已经完成，最后我们对我们的组件库以及工具库进行打包，打包之前如果要发公共包的话记得将我们的各个包的协议改为 MIT 开源协议

## Vite 打包

打包们这里选择 vite，它有一个库模式专门为我们来打包这种库组件的。

前面已经安装过 vite 了，所以这里直接在 components 下直接新建 vite.config.ts(配置参数文件中已经注释):

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  build: {
    target: "modules",
    //打包文件目录
    outDir: "es",
    //压缩
    minify: false,
    //css分离
    //cssCodeSplit: true,
    rollupOptions: {
      //忽略打包vue文件
      external: ["vue"],
      input: ["src/index.ts"],
      output: [
        {
          format: "es",
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: "es",
          preserveModulesRoot: "src",
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: "lib",
          preserveModulesRoot: "src",
        },
      ],
    },
    lib: {
      entry: "./index.ts",
      formats: ["es", "cjs"],
    },
  },
  plugins: [vue()],
});
```

这里我们选择打包 cjs(CommonJS)和 esm(ESModule)两种形式,cjs 模式主要用于服务端引用(ssr),而 esm 就是我们现在经常使用的方式，它本身自带 treeShaking 而不需要额外配置按需引入(前提是你将模块分别导出)，非常好用~

其实到这里就已经可以直接打包了；components 下执行： pnpm run build 你就会发现打包了 es 和 lib 两个目录

到这里其实打包的组件库只能给 js 项目使用,在 ts 项目下运行会出现一些错误，而且使用的时候还会失去代码提示功能，这样的话我们就失去了用 ts 开发组件库的意义了。所以我们需要在打包的库里加入声明文件(.d.ts)。

那么如何向打包后的库里加入声明文件呢？ 其实很简单，只需要引入**vite-plugin-dts**

```shell
pnpm i vite-plugin-dts -D -w
```

修改下`vite.config.ts`

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue"
import dts from 'vite-plugin-dts'

export default defineConfig(
    {
        build: {...},
        plugins: [
            vue(),
            dts({
                //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
                tsConfigFilePath: '../../tsconfig.json'
            }),
            //因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
            dts({
                outputDir:'lib',
                tsConfigFilePath: '../../tsconfig.json'
            })

        ]
    }
)
```

因为这个插件默认打包到 es 下，我们想让 lib 目录下也生成声明文件需要再配置一个 dts 插件，暂时没有想到其它更好的处理方法~

然后执行打包命令你就会发现你的 es 和 lib 下就有了声明文件

其实后面就可以进行发布了，发布之前更改一下我们 components 下的 package.json 如下：

```json
{
  "name": "hbisedm-ui",
  "version": "1.0.1",
  "main": "lib/index.js",
  "module": "lib/index.js",
  "scripts": {
    "build": "vite build"
  },
  "files": ["es", "lib"],
  "keywords": ["hbisedm-ui", "vue3组件库"],
  "author": "hbisedm",
  "license": "MIT",
  "description": "",
  "typings": "lib/index.d.ts"
}
```

> **pkg.module**
>
> 我们组件库默认入口文件是传统的 CommonJS 模块，但是如果你的环境支持 ESModule 的话，构建工具会优先使用我们的 module 入口
>
> **pkg.files**
>
> files 是指我们需要发布到 npm 上的目录，因为不可能 components 下的所有目录都被发布上去

## 开始发布

> 做了那么多终于到发布的阶段了；其实 npm 发包是很容易的

[[npm发布]]

npm 创建自己的组织`hbisedm-ui` ， `components`目录下`package.json` 修改 `name`

```json
{
  "name": "@hbisedm-ui/components"
}
```

发布操作

```shell
pnpm publish --access public
```

> 记得切换官方源

## 样式问题

> 接下来美化下组件库

创建`style.less` 并在`/main.ts`引入

```js
import "hbisedm-ui/es/style.css";
```
