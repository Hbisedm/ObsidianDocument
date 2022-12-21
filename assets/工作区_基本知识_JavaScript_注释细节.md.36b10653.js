import{_ as s,c as n,o as a,a as p}from"./app.64cc5612.js";const A=JSON.parse('{"title":"注释细节的笔记","description":"","frontmatter":{"title":"注释细节的笔记","tags":["注释细节"],"创建时间":"星期五, 八月 5日 2022, 1:25:46 下午","修改时间":"星期五, 八月 5日 2022, 1:46:46 下午"},"headers":[],"relativePath":"工作区/基本知识/JavaScript/注释细节.md"}'),l={name:"工作区/基本知识/JavaScript/注释细节.md"},o=p(`<p>#JavaScript #注释</p><h1 id="注释细节的笔记" tabindex="-1">注释细节的笔记 <a class="header-anchor" href="#注释细节的笔记" aria-hidden="true">#</a></h1><blockquote><p>目的：让编辑器给出提示 直接整代码</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"></span>
<span class="line"><span style="color:#676E95;">/** </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">return</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">returnType</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// returnType().  注意这里的\`.\` 会出现string类型的方法</span></span>
<span class="line"><span style="color:#82AAFF;">returnType</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">/**</span></span>
<span class="line"><span style="color:#676E95;"> *</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">foo</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">bar</span></span>
<span class="line"><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">paramsFunc</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">foo</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">bar</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// Implement</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// foo. 出现string的方法，bar 只能是true or false</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">foo</span><span style="color:#89DDFF;">.</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">bar</span><span style="color:#F07178;"> </span></span>
<span class="line"><span style="color:#F07178;">  </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// 这里限制objType的类型，输入属性时，给出fooType的类型提示</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">/** </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">type</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">import(&#39;./fooType&#39;).fooType </span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> objType </span><span style="color:#89DDFF;">={</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">foo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">...</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">bar</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">123</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p><code>fooType.d.ts</code></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">fooType</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">foo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">bar</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Number</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,6),e=[o];function c(t,r,y,F,D,i){return a(),n("div",null,e)}const d=s(l,[["render",c]]);export{A as __pageData,d as default};
