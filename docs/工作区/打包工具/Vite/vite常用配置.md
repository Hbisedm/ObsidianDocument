---
title: vite的使用

date: 2022-05-26 12:42:26

tags: ["打包工具", "vite"]

excerpt: vite的配置详解
---



#vite #打包器

# vite.config.js
```javascript

import { defineConfig } from 'vite' // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
import { viteMockServe } from "vite-plugin-mock"

const localEnabled = process.env.USE_MOCK || false;
const prodEnabled = process.env.USE_CHUNK_MOCK || false;

// https://vitejs.dev/config/
export default () => defineConfig({
 plugins: [ //配置需要使用的插件列表
  vue(),
  viteMockServe({
   mockPath: "./src/server/mock",
   localEnabled: localEnabled, // 开发打包开关 true时打开mock  false关闭mock
   prodEnabled: prodEnabled,//prodEnabled, // 生产打包开关
   // 这样可以控制关闭mock的时候不让mock打包到最终代码内
   injectCode: `
    import { setupProdMockServer } from './mockProdServer';
    setupProdMockServer();
   `,
   logger: false, //是否在控制台显示请求日志
   supportTs:false //打开后，可以读取 ts 文件模块 打开后将无法监视 .js 文件
  })
 ],
 // 强制预构建插件包
 optimizeDeps: {
  //检测需要预构建的依赖项
  entries: [],
  //默认情况下，不在 node_modules 中的，链接的包不会预构建
  include: ['axios'],
  exclude:['your-package-name'] //排除在优化之外
 },
 //静态资源服务的文件夹
 publicDir: "public",
 base: './',
 //静态资源处理
 assetsInclude: "",
 //控制台输出的级别 info 、warn、error、silent
 logLevel: "info",
 // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
 clearScreen:true,
 resolve: {
  alias: [//配置别名
   { find: '@', replacement: resolve(__dirname, 'src') }
  ],
  // 情景导出 package.json 配置中的exports字段
  conditions: [],
  // 导入时想要省略的扩展名列表
  // 不建议使用 .vue 影响IDE和类型支持
  extensions:['.mjs','.js','.ts','.jsx','.tsx','.json']  
 },
 // css
 css: {
  // 配置 css modules 的行为
  modules: {  },
  // postCss 配置
  postcss: {
  },
  //指定传递给 css 预处理器的选项
  preprocessorOptions:{
   scss: {
    additionalData:`$injectedColor:orange;`
   }
  }
 },
 json: {
  //是否支持从 .json 文件中进行按名导入
  namedExports: true,
  //若设置为 true 导入的json会被转为 export default JSON.parse("..") 会比转译成对象字面量性能更好
  stringify:false
 },
 //继承自 esbuild 转换选项，最常见的用例是自定义 JSX
 esbuild: {
  jsxFactory: "h",
  jsxFragment: "Fragment",
  jsxInject:`import Vue from 'vue'`
 },
 //本地运行配置，以及反向代理配置
 server: {
  host: "localhost",
  https: false,//是否启用 http 2
  cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
  open: true,//服务启动时自动在浏览器中打开应用
  port: "9000",
  strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
  force: true,//是否强制依赖预构建
  hmr: false,//禁用或配置 HMR 连接
  // 传递给 chockidar 的文件系统监视器选项
  watch: {
   ignored:["!**/node_modules/your-package-name/**"]
  },
  // 反向代理配置
  proxy: { 
   '/api': {
    target: "https://xxxx.com/",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^/api/, '')
   }
  }
 },
 //打包配置
 build: {
  //浏览器兼容性  "esnext"|"modules"
  target: "modules",
  //指定输出路径
  outDir: "dist",
  //生成静态资源的存放路径
  assetsDir: "assets",
  //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
  assetsInlineLimit: 4096,
  //启用/禁用 CSS 代码拆分
  cssCodeSplit: true,
  //构建后是否生成 source map 文件
  sourcemap: false,
  //自定义底层的 Rollup 打包配置
  rollupOptions: {
  },
  //@rollup/plugin-commonjs 插件的选项
  commonjsOptions: {
  },
  //构建的库
  lib: {
  },
  //当设置为 true，构建后将会生成 manifest.json 文件
  manifest: false,
  // 设置为 false 可以禁用最小化混淆，
  // 或是用来指定使用哪种混淆器
  // boolean | 'terser' | 'esbuild'
  minify: "terser", //terser 构建后文件体积更小
  //传递给 Terser 的更多 minify 选项。
  terserOptions: {
  },
  //设置为 false 来禁用将构建后的文件写入磁盘
  write: true,
  //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
  emptyOutDir: true,
  //启用/禁用 brotli 压缩大小报告
  brotliSize: true,
  //chunk 大小警告的限制
  chunkSizeWarningLimit: 500
 },
 ssr: {
  // 列出的是要为 SSR 强制外部化的依赖
  external: [],
  //列出的是防止被 SSR 外部化依赖项
  noExternal: [
  ]
 }
})

```




#### 参考链接
[](https://juejin.cn/post/7039879176534360077)[https://juejin.cn/post/7039879176534360077](https://juejin.cn/post/7039879176534360077)