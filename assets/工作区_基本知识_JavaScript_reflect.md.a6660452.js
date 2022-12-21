import{_ as s,c as e,o as a,a as n}from"./app.64cc5612.js";const C=JSON.parse('{"title":"Reflect的笔记","description":"","frontmatter":{"title":"Reflect的笔记","tags":["reflect"],"创建时间":"星期三, 十二月 21日 2022, 3:39:32 下午","修改时间":"星期三, 十二月 21日 2022, 4:33:27 下午"},"headers":[{"level":2,"title":"基本知识","slug":"基本知识","link":"#基本知识","children":[]},{"level":2,"title":"13种方法","slug":"_13种方法","link":"#_13种方法","children":[]},{"level":2,"title":"vue3为何使用reflect","slug":"vue3为何使用reflect","link":"#vue3为何使用reflect","children":[]}],"relativePath":"工作区/基本知识/JavaScript/reflect.md"}'),o={name:"工作区/基本知识/JavaScript/reflect.md"},l=n(`<p>#JavaScript #es6 #reflect</p><h1 id="reflect的笔记" tabindex="-1">Reflect的笔记 <a class="header-anchor" href="#reflect的笔记" aria-hidden="true">#</a></h1><h2 id="基本知识" tabindex="-1">基本知识 <a class="header-anchor" href="#基本知识" aria-hidden="true">#</a></h2><p><code>Reflect</code>又叫反射，设计的目的主要有以下几个：</p><ul><li>将<code>Object</code>对象的一些明显属于语言内部的方法（比如<code>Object.defineProperty</code>），放到<code>Reflect</code>对象上。现阶段，某些方法同时在<code>Object</code> 和<code>Reflect</code>对象上部署，未来的新方法将只部署在<code>Reflect</code>对象上。也就是说，从<code>Reflect</code>对象上可以拿到语言内部的方法。</li><li>修改某些<code>Object</code>方法的返回结果，让其变得更合理。比如，<code>Object.defineProperty(obj, name, desc)</code> 在无法定义属性时，会抛出一个错误，而<code>Reflect.defineProperty(obj, name, desc)</code>则会返回<code>false</code>。</li><li>让<code>Object</code>操作都变成<code>函数行为</code>。某些<code>Object</code>操作是<code>命令式</code>，比如<code>name in obj</code>和<code>delete obj[name]</code>，而<code>Reflect.has(obj, name)</code> 和<code>Reflect.deleteProperty(obj, name)</code>让它们变成了函数行为。</li><li><code>Reflect</code>对象的方法与<code>Proxy</code>对象的方法一一对应，只要是<code>Proxy</code>对象的方法，就能在<code>Reflect</code> 对象上找到对应的方法。这就让<code>Proxy</code>对象可以方便地调用对应的<code>Reflect</code>方法，完成默认行为，作为修改行为的基础。<code>Proxy</code> 可以捕获13种不同的基本操作，这些操作有各自不同的<code>Reflect API</code>方法。</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> bar </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Sam</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">age</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">19</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(bar)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// delete bar.name</span></span>
<span class="line"><span style="color:#A6ACCD;">Reflect</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">deleteProperty</span><span style="color:#A6ACCD;">(bar</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// 使用reflect</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(bar)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="_13种方法" tabindex="-1">13种方法 <a class="header-anchor" href="#_13种方法" aria-hidden="true">#</a></h2><ul><li><code>Reflect.get()</code> → 读取属性</li><li><code>Reflect.set()</code> → 设置属性</li><li><code>Reflect.has()</code> → 属性是否存在，等同于in</li><li><code>Reflect.defineProperty()</code> → 定义属性</li><li><code>Reflect.getOwnPropertyDescriptor()</code> → 获取指定属性的描述对象</li><li><code>Reflect.deleteProperty()</code> → 删除属性，等同于delete</li><li><code>Reflect.ownKeys()()</code> → 返回自身属性的枚举</li><li><code>Reflect.getPrototypeOf()</code> → 用于读取对象的__proto__属性</li><li><code>Reflect.setPrototypeOf()</code> → 设置目标对象的原型（prototype）</li><li><code>Reflect.isExtensible()</code> → 表示当前对象是否可扩展</li><li><code>Reflect.preventExtensions()</code> → 将一个对象变为不可扩展</li><li><code>Reflect.apply()</code> → 调用函数，等同于等同于 Function.prototype.apply.call()，但借用原型方法可读性太差</li><li><code>Reflect.construct()</code> → 等同于new</li></ul><h2 id="vue3为何使用reflect" tabindex="-1">vue3为何使用reflect <a class="header-anchor" href="#vue3为何使用reflect" aria-hidden="true">#</a></h2><p>跟reflect的第三个参数<code>receiver</code> 有关系</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Sam</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">bar</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">name</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> proxy </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Proxy</span><span style="color:#A6ACCD;">(foo</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">get</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#82AAFF;">tarck</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">effect</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">proxy</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">bar</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>这里<code>get</code>拦截函数中，通过<code>target[key]</code>的方式返回 其他target是原始值<code>foo</code>，而<code>key</code> 是 <code>bar</code> 所以返回的是 <code>getter函数bar</code> =&gt;<code>this.name</code>=&gt;<code>foo.name</code> 很显然这里不是响应式对象<code>proxy</code>，所以不会有依赖收集</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#82AAFF;">effect</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">bar</span><span style="color:#F07178;"> </span><span style="color:#676E95;">//原始对象 不是响应式对象 不会触发依赖收集</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> proxy </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Proxy</span><span style="color:#A6ACCD;">(foo</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">get</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">receiver</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#82AAFF;">tarck</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Reflect</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">receiver</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>当我们使用代理对象<code>proxy</code>访问<code>bar</code>属性时，那么<code>receiver</code>就是<code>proxy</code>，你可以把它简单地理解为函数调用中的<code>this</code>。 那么此时，访问器属性<code>bar</code>的<code>getter</code>函数内的<code>this</code>的指向就是代理对象<code>proxy</code></p>`,15),p=[l];function c(t,r,y,D,d,F){return a(),e("div",null,p)}const i=s(o,[["render",c]]);export{C as __pageData,i as default};
