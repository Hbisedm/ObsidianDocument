import{_ as s,c as a,o as e,a as n}from"./app.d0c2f5ea.js";const u=JSON.parse('{"title":"动态组件、异步组件的笔记","description":"","frontmatter":{"title":"动态组件、异步组件的笔记","tags":["Vue","动态组件","异步组件"],"创建时间":"星期三, 七月 27日 2022, 8:58:57 晚上","修改时间":"星期四, 七月 28日 2022, 1:20:11 下午"},"headers":[{"level":2,"title":"动态组件","slug":"动态组件","link":"#动态组件","children":[{"level":3,"title":"动态显示不同的组件","slug":"动态显示不同的组件","link":"#动态显示不同的组件","children":[]},{"level":3,"title":"Prop","slug":"prop","link":"#prop","children":[]}]},{"level":2,"title":"异步组件","slug":"异步组件","link":"#异步组件","children":[{"level":3,"title":"webpack的分包","slug":"webpack的分包","link":"#webpack的分包","children":[]},{"level":3,"title":"vuecli中的异步组件","slug":"vuecli中的异步组件","link":"#vuecli中的异步组件","children":[]}]}],"relativePath":"工作区/框架技术/Vue/开发操作/动态组件与异步组件.md"}'),l={name:"工作区/框架技术/Vue/开发操作/动态组件与异步组件.md"},p=n(`<p>#组件 #Vue</p><h1 id="动态组件、异步组件的笔记" tabindex="-1">动态组件、异步组件的笔记 <a class="header-anchor" href="#动态组件、异步组件的笔记" aria-hidden="true">#</a></h1><h2 id="动态组件" tabindex="-1">动态组件 <a class="header-anchor" href="#动态组件" aria-hidden="true">#</a></h2><h3 id="动态显示不同的组件" tabindex="-1">动态显示不同的组件 <a class="header-anchor" href="#动态显示不同的组件" aria-hidden="true">#</a></h3><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;component is=&quot;xxx&quot;&gt;&lt;/component&gt;</span></span>
<span class="line"></span></code></pre></div><p><code>xxx</code>为组件名，组件名来自</p><ul><li>全局注册组件的 如：<code>vue.component(&#39;xxx&#39;, {....})</code></li><li>局部注册的 如： components: [&#39;xxx&#39;]</li></ul><h3 id="prop" tabindex="-1">Prop <a class="header-anchor" href="#prop" aria-hidden="true">#</a></h3><p>有些组件带有prop的也是可以通过<code>&lt;component is=&#39;xxx&#39; attr=&#39;&#39; /&gt;</code>这样子传递过去</p><p><a href="https://v3.cn.vuejs.org/guide/component-dynamic-async.html#%E5%9C%A8%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-keep-alive" target="_blank" rel="noreferrer">动态组件</a></p><h2 id="异步组件" tabindex="-1">异步组件 <a class="header-anchor" href="#异步组件" aria-hidden="true">#</a></h2><p>异步组件，就是需要它的时候，再去加载它。 先介绍下webpack的分包，再引入到vuecli中去使用。</p><h3 id="webpack的分包" tabindex="-1">webpack的分包 <a class="header-anchor" href="#webpack的分包" aria-hidden="true">#</a></h3><p>main.js</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> xxxmodule </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./xxxmodule</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><p>这样使用build打包命令后，会将这个模块也打到app.js中，若我们的模块有很多的话，会导致这个js的文件大小特别的大，特别是CSR模式的程序，会导致第一次的首屏加载时间超级长。那这时候就需要将这个模块打包后生成另外的js抽离出去。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./xxxmodule</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">	</span><span style="color:#676E95;">// res是promise实例</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>这样打包后就抽离出chuck.js，减少app.js的体积</p><h3 id="vuecli中的异步组件" tabindex="-1">vuecli中的异步组件 <a class="header-anchor" href="#vuecli中的异步组件" aria-hidden="true">#</a></h3><p>因为vuecli默认是webpack这个打包器，所以使用的也是上面这种方式去抽离<code>.vue</code>sfc文件</p><h4 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-hidden="true">#</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">defineAsyncComponent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">defineAsyncCommponent</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./xxx.vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">	</span><span style="color:#676E95;">//do something</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>这个函数可以传递接受一个返回 <code>Promise</code> 的工厂函数，也可以接受一个对象 <a href="https://v3.cn.vuejs.org/api/global-api.html#defineasynccomponent" target="_blank" rel="noreferrer">官方api文档</a></p>`,23),o=[p];function c(t,r,i,d,D,h){return e(),a("div",null,o)}const F=s(l,[["render",c]]);export{u as __pageData,F as default};
