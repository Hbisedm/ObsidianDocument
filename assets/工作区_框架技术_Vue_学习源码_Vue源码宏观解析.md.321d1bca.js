import{_ as e,c as l,o as i,a as r}from"./app.d0c2f5ea.js";const _=JSON.parse('{"title":"宏观看源码","description":"","frontmatter":{"title":"宏观看源码","date":"2022-06-03T15:42:26.000Z","tags":["Vue","源码"]},"headers":[{"level":2,"title":"reactivity Module 响应式模块","slug":"reactivity-module-响应式模块","link":"#reactivity-module-响应式模块","children":[]},{"level":2,"title":"Complier Module 编译模块","slug":"complier-module-编译模块","link":"#complier-module-编译模块","children":[]},{"level":2,"title":"Renderer Module 渲染模块","slug":"renderer-module-渲染模块","link":"#renderer-module-渲染模块","children":[]},{"level":2,"title":"响应式原理","slug":"响应式原理","link":"#响应式原理","children":[]}],"relativePath":"工作区/框架技术/Vue/学习源码/Vue源码宏观解析.md"}'),a={name:"工作区/框架技术/Vue/学习源码/Vue源码宏观解析.md"},t=r('<h1 id="三个核心模块" tabindex="-1">三个核心模块 <a class="header-anchor" href="#三个核心模块" aria-hidden="true">#</a></h1><ul><li>reactivity Module 响应式模块</li><li>Complier Module 编译模块</li><li>Complier Module 编译模块</li></ul><h2 id="reactivity-module-响应式模块" tabindex="-1">reactivity Module 响应式模块 <a class="header-anchor" href="#reactivity-module-响应式模块" aria-hidden="true">#</a></h2><p>允许我们创建JavaScript响应式对象，并可以观察其变化。当使用这些对象的代码运行时，它们会被跟踪。因此，如果响应式对象发生变化，它们可以在以后运行。</p><h2 id="complier-module-编译模块" tabindex="-1">Complier Module 编译模块 <a class="header-anchor" href="#complier-module-编译模块" aria-hidden="true">#</a></h2><p>它知道如何获取HTML模版，并将它们编译成渲染函数。这可能在运行时在浏览器中发生，但在构建Vue项目更常见。这样浏览器就可以只接收渲染函数。</p><h2 id="renderer-module-渲染模块" tabindex="-1">Renderer Module 渲染模块 <a class="header-anchor" href="#renderer-module-渲染模块" aria-hidden="true">#</a></h2><p>渲染模块的代码包含在网页上渲染组件的三个不同阶段。</p><ul><li>渲染阶段：调用render函数，返回一个虚拟DOM节点。</li><li>挂载阶段：使用虚拟DOM节点并调用DOM API来创建网页。</li><li>补丁阶段：渲染器将旧的虚拟节点和新的虚拟节点进行比较并只更新网页变化的部分</li></ul><p><img src="https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206030916410.png" alt=""></p><h2 id="响应式原理" tabindex="-1">响应式原理 <a class="header-anchor" href="#响应式原理" aria-hidden="true">#</a></h2><p>使用一个简单组件，里面有个模版(template)文件和模版内部使用响应式对象，</p><ol><li>首先，模块编译器将HTML转成render函数</li><li>然后初始化响应式对象，使用响应式模块</li><li>接下来，在渲染模块中，我们进入了渲染阶段。这将调用render函数，它还引用了响应式对象。</li><li>我们现在观察这个响应式对象的变化，然后render函数返回一个虚拟DOM节点。</li><li>接下来，在挂载阶段，调用mount函数，使用虚拟DOM节点创建Web页面。</li><li>最后，如果我们的响应式对象发生任何变化，渲染器再次调用render函数，生成新的虚拟节点，跟旧的虚拟节点发送到patch函数进行比较后更新网页。</li></ol>',13),d=[t];function o(n,c,u,h,s,m){return i(),l("div",null,d)}const M=e(a,[["render",o]]);export{_ as __pageData,M as default};
