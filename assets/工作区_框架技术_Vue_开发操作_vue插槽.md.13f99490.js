import{_ as s,c as n,o as a,d as l}from"./app.0b246d93.js";const C=JSON.parse('{"title":"vue插槽","description":"","frontmatter":{"title":"vue插槽","创建时间":"星期五, 十二月 2日 2022, 3:20:41 下午","修改时间":"星期五, 十二月 2日 2022, 3:25:14 下午"},"headers":[{"level":2,"title":"类型","slug":"类型","link":"#类型","children":[]},{"level":2,"title":"有一条规则需要记住：","slug":"有一条规则需要记住","link":"#有一条规则需要记住","children":[]}],"relativePath":"工作区/框架技术/Vue/开发操作/vue插槽.md"}'),t={name:"工作区/框架技术/Vue/开发操作/vue插槽.md"},p=l(`<p>#slot #vue #插槽</p><h1 id="vue插槽" tabindex="-1">vue插槽 <a class="header-anchor" href="#vue插槽" aria-hidden="true">#</a></h1><h2 id="类型" tabindex="-1">类型 <a class="header-anchor" href="#类型" aria-hidden="true">#</a></h2><ul><li>默认插槽</li><li>具名插槽</li></ul><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki"><code><span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">// child</span></span>
<span class="line"><span style="color:#A6ACCD;">// 具名</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;slot name=&#39;xxx&#39;&gt;&lt;/slot&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">// 默认</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;slot&gt;&lt;/slot&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">// father </span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;"> #</span><span style="color:#C792EA;">xxx</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">			// content  具名插槽</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">.....</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">			// content.... 默认插槽</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="有一条规则需要记住" tabindex="-1">有一条规则需要记住： <a class="header-anchor" href="#有一条规则需要记住" aria-hidden="true">#</a></h2><ul><li>父组件里的所有内容都是在父级作用域中编译的</li><li>子组件里的所有内容都是在子作用域中编译的</li></ul>`,7),e=[p];function o(c,r,i,D,F,y){return a(),n("div",null,e)}const A=s(t,[["render",o]]);export{C as __pageData,A as default};
