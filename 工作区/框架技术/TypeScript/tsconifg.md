---
title: tsconifg配置文件
date: 2022-07-17 21:50:28
tags: ["tsconifg"]
---
#tag

# tsconifg的笔记

### files 
> 字段用于指明需要 tsc 编译的一个或多个 ts 文件
```json
{ 
  "files": ["index.ts", "global.d.ts"], 
} 
```
当指定的文件或文件夹不存在时，会提示 ❌ 错误


### include
> include 字段用于指明需要被 tsc 编译的文件或文件夹列表
```json
{ 
  "include": [ 
    "src", 
    "global.d.ts" 
  ], 
} 
```

### exclude
> exclude 字段用于排除不需要 tsc 编译的文件或文件夹列表

```json
{ 
  "exclude": ["test.ts", "src/test.ts"], 
}
```
注意： exclude 字段中的声明只对 include 字段有排除效果，对 files 字段无影响，即与 include 字段中的值互斥。

### extends

字段用于指明继承已有的 tsconfig 配置规则文件。

该字段可以说是非常有用了，因为我们的 tsconfig 配置其实各个项目之间大同小异，因此完全可以结合自己团队的情况，抽离一个基础且公共的 tsconfig 配置，并将其发包，然后作为 extends 字段的值来继承配置。

tsconfig 推荐默认配置可以参考官方的包：@tsconfig/recommended

```json
{ 
  "compilerOptions": { 
    "target": "ES2015", 
    "module": "commonjs", 
    "strict": true, 
    "esModuleInterop": true, 
    "skipLibCheck": true, 
    "forceConsistentCasingInFileNames": true 
  }, 
  "$schema": "https://json.schemastore.org/tsconfig", 
  "display": "Recommended" 
} 
```

例如继承一个发包后的 tsconfig 基础配置，并通过显示声明编译的目标代码版本为 ES2016 来覆盖覆盖 @tsconfig/recommended 中对应配置项。

```json
{ 
  "extends": "@tsconfig/recommended/tsconfig.json", 
  "compilerOptions": {  //覆盖效果
    "target": "ES2016" 
  } 
} 
```


### compilerOptions
> 编译选项

### target
target 字段指明经过 TSC 编译后的 ECMAScript 代码语法版本，根据 ECMAScript 语法标准，默认值为 ES3。


### lib

lib 字段是用于为了在我们的代码中显示的指明需要支持的 ECMAScript 语法或环境对应的类型声明文件。
例如我们的代码会使用到浏览器中的一些对象 window、document，这些全局对象 API 对于 TypeScript Complier 来说是不能识别的：

```
{ 
  "compilerOptions": { 
    "target": "ES5", 
    "lib": ["ES5", "ES6", "DOM"], 
  } 
} 
```

来显式引入在 DOM 即浏览器环境下的一些默认类型定义，即可在代码中使用，window、document 等浏览器环境中的对象，TS 在运行时以及编译时就不会报类型错误。


### module
module 字段指明 tsc 编译后的代码应该符合何种“模块化方案”，可以指定的枚举值有：none, commonjs, amd, system, umd, es2015, es2020, 或 ESNext，默认值为 none。






## 配置解释列表


```json
{ 
  "compilerOptions": { 
    /* 基本选项 */ 
    "target": "es6", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT' 
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015' 
    "lib": [], // 指定要包含在编译中的库文件 
    "allowJs": true, // 允许编译 javascript 文件 
    "checkJs": true, // 报告 javascript 文件中的错误 
    "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react' 
    "declaration": true, // 生成相应的 '.d.ts' 文件 
    "declarationDir": "./dist/types", // 生成的 '.d.ts' 文件保存文件夹 
    "sourceMap": true, // 生成相应的 '.map' 文件 
    "outFile": "./", // 将输出文件合并为一个文件 
    "outDir": "./dist", // 指定输出目录 
    "rootDir": "./", // 用来控制输出目录结构 --outDir. 
    "removeComments": true, // 删除编译后的所有的注释 
    "noEmit": true, // 不生成输出文件 
    "importHelpers": true, // 从 tslib 导入辅助工具函数 
    "isolatedModules": true, // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）. 
 
    /* 严格的类型检查选项 */ 
    "strict": true, // 启用所有严格类型检查选项 
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错 
    "strictNullChecks": true, // 启用严格的 null 检查 
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误 
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict' 
 
    /* 额外的检查 */ 
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误 
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误 
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误 
    "noFallthroughCasesInSwitch": true, // 报告switch语句的fallthrough错误。（即，不允许switch的case语句贯穿） 
 
    /* 模块解析选项 */ 
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6) 
    "baseUrl": "./", // 用于解析非相对模块名称的基础目录 
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表 
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容 
    "typeRoots": [], // 包含类型声明的文件列表 
    "types": [], // 需要包含的类型声明文件名列表 
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。 
    "esModuleInterop": true, // 支持合成模块的默认导入 
   
    /* Source Map Options */ 
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置 
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置 
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件 
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性 
 
    /* 其他选项 */ 
    "experimentalDecorators": true, // 启用装饰器 
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持 
  }, 
  /* 指定编译文件或排除指定编译文件 */ 
  "include": ["src/**/*"], 
  "exclude": ["node_modules", "**/*.spec.ts"], 
  "files": ["index.ts", "test.ts"], 
  // 从另一个配置文件里继承配置 
  "extends": "@tsconfig/recommended", 
  // 让 IDE 在保存文件的时候根据 tsconfig.json 重新生成文件 
  "compileOnSave": true // 支持这个特性需要Visual Studio 2015， TypeScript 1.8.4 以上并且安装 atom-typescript 插件 
} 
```













[参考](https://developer.51cto.com/article/694463.html)