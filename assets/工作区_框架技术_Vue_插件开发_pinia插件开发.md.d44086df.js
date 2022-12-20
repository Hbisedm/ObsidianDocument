import{_ as s,c as n,o as a,a as l}from"./app.d0c2f5ea.js";const C=JSON.parse('{"title":"pinia插件开发的笔记","description":"","frontmatter":{"title":"pinia插件开发的笔记","tags":["pinia插件开发"],"创建时间":"星期日, 十二月 4日 2022, 10:23:52 晚上","修改时间":"星期日, 十二月 4日 2022, 11:37:59 晚上"},"headers":[{"level":2,"title":"主要功能","slug":"主要功能","link":"#主要功能","children":[]},{"level":2,"title":"参数","slug":"参数","link":"#参数","children":[]},{"level":2,"title":"加入Ts","slug":"加入ts","link":"#加入ts","children":[]},{"level":2,"title":"安装插件","slug":"安装插件","link":"#安装插件","children":[]},{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[]}],"relativePath":"工作区/框架技术/Vue/插件开发/pinia插件开发.md"}'),p={name:"工作区/框架技术/Vue/插件开发/pinia插件开发.md"},o=l(`<p>#pinia #插件</p><h1 id="pinia插件开发的笔记" tabindex="-1">pinia插件开发的笔记 <a class="header-anchor" href="#pinia插件开发的笔记" aria-hidden="true">#</a></h1><blockquote><p>不用有太大心智负担， 安装和vue插件的安装一样的步骤 编写插件参考官网即可 <strong>主要是拓展每个store的功能</strong></p></blockquote><h2 id="主要功能" tabindex="-1">主要功能 <a class="header-anchor" href="#主要功能" aria-hidden="true">#</a></h2><ul><li>公共属性</li><li>公共方法</li><li>限制仓库使用</li><li>持久化仓库数据</li></ul><p>更多功能<a href="https://pinia.vuejs.org/core-concepts/plugins.html" target="_blank" rel="noreferrer">参考官网</a></p><ul><li>Add new properties to stores</li><li>Add new options when defining stores</li><li>Add new methods to stores</li><li>Wrap existing methods</li><li>Change or even cancel actions</li><li>Implement side effects like <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank" rel="noreferrer">Local Storage</a></li><li>Apply <strong>only</strong> to specific stores</li></ul><h2 id="参数" tabindex="-1">参数 <a class="header-anchor" href="#参数" aria-hidden="true">#</a></h2><p>主要围绕context, 它有四个参数</p><ul><li>app vue实例</li><li>options options参数</li><li>pinia pinia实例</li><li>store (常用这个) 当前的store实例</li></ul><p>开发一个pinia插件</p><p>创建 <code>@/stores/plugins.ts</code> 编写插件的主要逻辑</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PiniaPluginContext</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pinia</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">testPlugins</span><span style="color:#89DDFF;">({</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">pinia</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PiniaPluginContext</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 限制仓库 为 cart 仓库</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">$id</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cart</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// console.log(&quot;pinia plugins&quot;);</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// console.log(options);</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// console.log(JSON.stringify(store));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// 加入公共方法(其实我觉得没有必要加大开发时的心智负担)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">initialState</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">$state</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">$reset</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">通过公共方法调用</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">$state</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">initialState</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// 当然也可以加入公共state</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">author</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Sam</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// 变化时，触发</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">$subscribe</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">mutation</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// react to store changes</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">mutation</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">[🍍 </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">mutation</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">storeId</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">]: </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">mutation</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">.</span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="加入ts" tabindex="-1">加入Ts <a class="header-anchor" href="#加入ts" aria-hidden="true">#</a></h2><p>添加ts类型，开发时体验提示</p><p>创建<code>pinia-plugin.d.ts</code></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pinia</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">module</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pinia</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">export</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">interface</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">PiniaCustomProperties</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Id</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">S</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">G</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">A</span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    author</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="安装插件" tabindex="-1">安装插件 <a class="header-anchor" href="#安装插件" aria-hidden="true">#</a></h2><p>在 <code>main.ts</code> 中添加</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createPinia</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pinia</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">testPlugins</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@/stores/plugins.ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> pinia </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createPinia</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">pinia</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(testPlugins)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// 和安装vue插件一样的</span></span>
<span class="line"><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(app)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(pinia)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-hidden="true">#</a></h2><p>使用某个store时，使用为它拓展的插件功能</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useCartStores</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../stores</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// 使用公共属性 由于加了ts类型 所以开发时，不会有红线</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">author: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> stores</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">author)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// 使用插件的定制公共方法</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> handleResetCart </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">stores</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">$reset</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,23),e=[o];function t(c,r,F,D,y,i){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{C as __pageData,d as default};
