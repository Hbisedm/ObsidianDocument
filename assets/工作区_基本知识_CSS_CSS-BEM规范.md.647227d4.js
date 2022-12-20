import{_ as s,c as a,o as n,a as l}from"./app.d0c2f5ea.js";const d=JSON.parse('{"title":"CSS-BEM规范的笔记","description":"","frontmatter":{"title":"CSS-BEM规范的笔记","tags":["CSS-BEM规范"],"创建时间":"星期日, 十月 9日 2022, 10:24:16 上午","修改时间":"星期二, 十一月 22日 2022, 11:56:52 中午"},"headers":[{"level":2,"title":"定义","slug":"定义","link":"#定义","children":[]},{"level":2,"title":"约定","slug":"约定","link":"#约定","children":[]},{"level":2,"title":"Play","slug":"play","link":"#play","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"relativePath":"工作区/基本知识/CSS/CSS-BEM规范.md"}'),p={name:"工作区/基本知识/CSS/CSS-BEM规范.md"},o=l(`<p>#CSS #BEM #规范</p><h1 id="css-bem规范的笔记" tabindex="-1">CSS-BEM规范的笔记 <a class="header-anchor" href="#css-bem规范的笔记" aria-hidden="true">#</a></h1><p><a href="https://juejin.cn/post/6844903672162304013" target="_blank" rel="noreferrer">https://juejin.cn/post/6844903672162304013</a></p><h2 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-hidden="true">#</a></h2><p>BEM 的意思就是块（block）、元素（element）、修饰符（modifier），是由 Yandex 团队提出的一种前端命名方法论。这种巧妙的命名方法让你的 CSS 类对其他开发者来说<strong>更加透明而且更有意义</strong>。BEM 命名约定更加严格，而且包含更多的信息，它们用于一个团队开发一个耗时的大项目。</p><h2 id="约定" tabindex="-1">约定 <a class="header-anchor" href="#约定" aria-hidden="true">#</a></h2><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">block</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">block__element</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">block--modifier</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span></code></pre></div><p>之所以使用两个连字符和下划线而不是一个，是为了让 block 可以用单个连字符来界定，如：</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">site-search</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">/* 块 */</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">site-search__field</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">/* 元素 */</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">site-search--full</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">/* 修饰符 */</span></span>
<span class="line"></span></code></pre></div><h2 id="play" tabindex="-1">Play <a class="header-anchor" href="#play" aria-hidden="true">#</a></h2><ul><li>block__element：块里的元素，如：nav（block）里的 a 标签（ element ）；</li><li>block__element--modifier：块里的元素的状态、属性或修饰，如：nav 里的 a 标签，有 active、hover、normal 3 种状态（modifier）。</li></ul><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">nav</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">nav</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">nav__item nav__item--active</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">当前状态</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">nav__item nav__item--hover</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">鼠标移上时的状态</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">nav__item nav__item--normal</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">正常状态</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">nav</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">nav</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &amp;__item {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &amp;--active {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    &amp;--hover </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    &amp;--normal </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-hidden="true">#</a></h2><ul><li>B（block）：某一块展示/功能区域，比如：.nav。</li><li>E（element）：这块展示/功能区域里的某个元素，比如: .nav__item。</li><li>M（modifier）：某个元素或者某个块的状态，比如：.nav--hide, .nav__item--active 等。</li></ul>`,15),e=[o];function t(c,r,D,F,y,i){return n(),a("div",null,e)}const A=s(p,[["render",t]]);export{d as __pageData,A as default};
