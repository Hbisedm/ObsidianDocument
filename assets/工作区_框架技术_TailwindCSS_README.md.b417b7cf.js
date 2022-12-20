import{_ as s,c as a,o as n,d as l}from"./app.0b246d93.js";const h=JSON.parse('{"title":"TailwindCSS的笔记","description":"","frontmatter":{"title":"TailwindCSS的笔记","tags":["README"],"创建时间":"星期一, 八月 22日 2022, 3:34:12 下午","修改时间":"星期六, 八月 27日 2022, 9:32:16 晚上"},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"原生HTML使用","slug":"原生html使用","link":"#原生html使用","children":[]},{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[{"level":3,"title":"Vue","slug":"vue","link":"#vue","children":[]}]}],"relativePath":"工作区/框架技术/TailwindCSS/README.md"}'),p={name:"工作区/框架技术/TailwindCSS/README.md"},e=l(`<p>#TailwindCSS</p><h1 id="tailwindcss的笔记" tabindex="-1">TailwindCSS的笔记 <a class="header-anchor" href="#tailwindcss的笔记" aria-hidden="true">#</a></h1><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-hidden="true">#</a></h2><p>跟着<a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">官网</a>安装</p><h2 id="原生html使用" tabindex="-1">原生HTML使用 <a class="header-anchor" href="#原生html使用" aria-hidden="true">#</a></h2><p>JIT —— just in time 只使用用到的class</p><p><code> postcss 源文件.css -o 生产文件.css</code></p><p><a href="https://tailwindcss.com/docs/optimizing-for-production" target="_blank" rel="noreferrer">生产优化</a></p><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-hidden="true">#</a></h2><p><a href="https://tailwindcss.com/docs/installation" target="_blank" rel="noreferrer">安装教程</a></p><p>选择使用postCss安装方式</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">npx tailwindcss init -p</span></span>
<span class="line"></span></code></pre></div><p>生成<code>tailwindcss.conifg.js</code> <code>postcss.config.js</code></p><p><code>tailwindcss.config.js</code> 配置参考官网</p><p>需要声明个css文件</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">/* ./src/index.css */</span></span>
<span class="line"><span style="color:#89DDFF;">@tailwind</span><span style="color:#A6ACCD;"> base</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">@tailwind</span><span style="color:#A6ACCD;"> components</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">@tailwind</span><span style="color:#A6ACCD;"> utilities</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">/* 修改默认样式 */</span></span>
<span class="line"><span style="color:#89DDFF;">@layer</span><span style="color:#A6ACCD;"> base </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">/* 用于添加组件样式 */</span></span>
<span class="line"><span style="color:#89DDFF;">@layer</span><span style="color:#A6ACCD;"> components </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">/* 用于自定义样式 */</span></span>
<span class="line"><span style="color:#89DDFF;">@layer</span><span style="color:#A6ACCD;"> utilities </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">custom-h1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    @apply text-lg text-red-300</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>然后全局引用这个文件后就可以使用tailwindcss了</p><h3 id="vue" tabindex="-1">Vue <a class="header-anchor" href="#vue" aria-hidden="true">#</a></h3><p>vue组件中</p><p>可以在组件中自定义<code>组件样式</code>, 也可以定义在全局中, 也就是上面的css文件的<code>@layer components {...}</code> 中</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki"><code><span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">text ..</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">scoped</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">test</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	@apply px-3 bg-green-300 等等tailwindcss的类名</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,21),o=[e];function t(c,r,i,D,d,F){return n(),a("div",null,o)}const C=s(p,[["render",t]]);export{h as __pageData,C as default};
