import{_ as s,c as a,o as e,a as l}from"./app.d0c2f5ea.js";const d=JSON.parse('{"title":"Vue2与Vue3的区别的笔记","description":"","frontmatter":{"title":"Vue2与Vue3的区别的笔记","tags":["Vue2与Vue3的区别"],"创建时间":"星期四, 八月 25日 2022, 9:17:33 上午","修改时间":"星期六, 八月 27日 2022, 2:13:04 下午"},"headers":[{"level":2,"title":"Keep-alive","slug":"keep-alive","link":"#keep-alive","children":[{"level":3,"title":"不同点","slug":"不同点","link":"#不同点","children":[]},{"level":3,"title":"相同点","slug":"相同点","link":"#相同点","children":[]}]},{"level":2,"title":"事件","slug":"事件","link":"#事件","children":[]},{"level":2,"title":"响应式","slug":"响应式","link":"#响应式","children":[]}],"relativePath":"工作区/框架技术/Vue/Vue2与Vue3的区别.md"}'),n={name:"工作区/框架技术/Vue/Vue2与Vue3的区别.md"},o=l(`<p>#Vue #区别</p><h1 id="vue2与vue3的区别的笔记" tabindex="-1">Vue2与Vue3的区别的笔记 <a class="header-anchor" href="#vue2与vue3的区别的笔记" aria-hidden="true">#</a></h1><ol><li>keep-alive</li><li>事件</li></ol><h2 id="keep-alive" tabindex="-1">Keep-alive <a class="header-anchor" href="#keep-alive" aria-hidden="true">#</a></h2><h3 id="不同点" tabindex="-1">不同点 <a class="header-anchor" href="#不同点" aria-hidden="true">#</a></h3><p>vue2</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">keep-alive</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">router-view</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$route.meta.keepAlive</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">router-view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">keep-alive</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">router-view</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">!$route.meta.keepAlive</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">router-view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>vue3</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">router-view</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$route.meta.keepAlive</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-slot</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{ Component }</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">keep-alive</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">component</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:is</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Component</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">keep-alive</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">router-view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">router-view</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">!$route.meta.keepAlive</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">router-view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="相同点" tabindex="-1">相同点 <a class="header-anchor" href="#相同点" aria-hidden="true">#</a></h3><ul><li>动态组件 写法一样</li></ul><h2 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-hidden="true">#</a></h2><p><a href="https://icode.best/i/03320045873563" target="_blank" rel="noreferrer">emit在vue3移除</a></p><h2 id="响应式" tabindex="-1">响应式 <a class="header-anchor" href="#响应式" aria-hidden="true">#</a></h2>`,14),p=[o];function t(r,c,D,i,F,y){return e(),a("div",null,p)}const h=s(n,[["render",t]]);export{d as __pageData,h as default};
