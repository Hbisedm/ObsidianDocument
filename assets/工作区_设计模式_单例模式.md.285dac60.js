import{_ as s,c as a,o as n,a as p}from"./app.d0c2f5ea.js";const A=JSON.parse('{"title":"单例模式","description":"","frontmatter":{"title":"单例模式","date":"2022-07-20T14:13:43.000Z","tags":["单例模式"]},"headers":[],"relativePath":"工作区/设计模式/单例模式.md"}'),l={name:"工作区/设计模式/单例模式.md"},o=p(`<p>#设计模式</p><h1 id="单例模式的笔记" tabindex="-1">单例模式的笔记 <a class="header-anchor" href="#单例模式的笔记" aria-hidden="true">#</a></h1><blockquote><p>定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。</p></blockquote><p>惰性单例 需要的时候才创建出来对象，且唯一一个。</p><p>创建单例和管理单例的职责分为两个不同的方法，当二者结合使用才具有单例模式的威力。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> getSingle </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">fn</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">result</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fn</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">arguments</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,6),e=[o];function t(c,r,y,F,D,i){return n(),a("div",null,e)}const C=s(l,[["render",t]]);export{A as __pageData,C as default};
