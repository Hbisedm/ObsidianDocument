import{_ as s,c as n,o as a,a as l}from"./app.741d02cd.js";const A=JSON.parse('{"title":"虚拟列表的笔记","description":"","frontmatter":{"title":"虚拟列表的笔记","tags":["虚拟列表"],"创建时间":"星期日, 十一月 27日 2022, 3:21:40 下午","修改时间":"星期日, 十一月 27日 2022, 11:28:03 晚上"},"headers":[{"level":2,"title":"为什么需要虚拟列表","slug":"为什么需要虚拟列表","link":"#为什么需要虚拟列表","children":[]},{"level":2,"title":"使用虚拟列表","slug":"使用虚拟列表","link":"#使用虚拟列表","children":[]},{"level":2,"title":"原理","slug":"原理","link":"#原理","children":[{"level":3,"title":"代码","slug":"代码","link":"#代码","children":[]}]}],"relativePath":"工作区/基本知识/HTML/虚拟列表.md"}'),p={name:"工作区/基本知识/HTML/虚拟列表.md"},o=l(`<p>#虚拟列表</p><h1 id="虚拟列表的笔记" tabindex="-1">虚拟列表的笔记 <a class="header-anchor" href="#虚拟列表的笔记" aria-hidden="true">#</a></h1><blockquote><p>虚拟列表是指对列表的 <code>可视区域</code> 进行渲染，对 <code>非可见区域</code> 不渲染或部分渲染，从而极大提高渲染性能的一种技术。</p></blockquote><h2 id="为什么需要虚拟列表" tabindex="-1">为什么需要虚拟列表 <a class="header-anchor" href="#为什么需要虚拟列表" aria-hidden="true">#</a></h2><blockquote><p>有时我们会遇到一些业务场景，要展示的列表很长，且不能使用分页的方式，如果一次性把数据全部渲染到页面，浏览器将变得非常卡顿，因为渲染 <code>dom</code> 需要耗费大量时间。<code>虚拟列表</code> 就是对长列表的一种优化方式，通过只渲染可视区域数据，大大提高渲染性能。</p></blockquote><h2 id="使用虚拟列表" tabindex="-1">使用虚拟列表 <a class="header-anchor" href="#使用虚拟列表" aria-hidden="true">#</a></h2><blockquote><p>目前虚拟列表已经有很多知名的库，如 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FAkryum%2Fvue-virtual-scroller" title="https://github.com/Akryum/vue-virtual-scroller" target="_blank" rel="noreferrer"><em>vue</em>-<em>virtual</em>-scroller</a>、<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftangbc%2Fvue-virtual-scroll-list" title="https://github.com/tangbc/vue-virtual-scroll-list" target="_blank" rel="noreferrer"><em>vue</em>-<em>virtual</em>-scroll-list</a>、<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbvaughn%2Freact-virtualized" title="https://github.com/bvaughn/react-virtualized" target="_blank" rel="noreferrer"><em>react-virtualized</em></a> 等， 下面就给大家介绍一下 <code>vue-virtual-scroller</code> 这个优秀库的使用方法，然后再带大家实现一个简版的虚拟列表。准备好了吗，开干！</p></blockquote><h2 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-hidden="true">#</a></h2><blockquote><p>3个概念</p></blockquote><ul><li>可视区容器：可以看作是在最底层，容纳所有元素的一个盒子。</li><li>可滚动区域：可以看作是中间层，假设有 10000 条数据，每个列表项的高度是 50，那么可滚动的区域的高度就是 10000 * 50。这一层的元素是不可见的，目的是产生和真实列表一模一样的滚动条。</li><li>可视区列表：可以看作是在最上层，展示当前处理后的数据，高度和可视区容器相同。可视区列表的位置是动态变化的，为了使其始终出现在可视区域。</li></ul><blockquote><p>实现思路</p></blockquote><ul><li>根据滚动距离和 <code>item</code> 高度，计算出当前需要展示的列表的 <code>startIndex</code></li><li>根据 <code>startIndex</code> 和 可视区高度，计算出当前需要展示的列表的 <code>endIndex</code></li><li>根据 <code>startIndex</code> 和 <code>endIndex</code> 截取相应的列表数据，赋值给可视区列表，并渲染在页面上</li><li>根据滚动距离和 <code>item</code> 高度，计算出可视区列表的偏移距离 <code>startOffset</code>，并设置在列表上</li></ul><blockquote><p>总结</p></blockquote><p>需要知道一个<strong>scrollTop</strong> 才可以计算出当前滑动后 需要正确的展示第一个item 最后一个item 以及动态修改translate3d(0,\${startOffset.value}px,0)</p><h3 id="代码" tabindex="-1">代码 <a class="header-anchor" href="#代码" aria-hidden="true">#</a></h3><h4 id="封装虚拟列表组件" tabindex="-1">封装虚拟列表组件 <a class="header-anchor" href="#封装虚拟列表组件" aria-hidden="true">#</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">ref</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">virtualListContainer</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">infinite-list-container</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    @scroll=&quot;scrollEvent&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!-- 中间的可滚动区域，z-index=-1，高度和真实列表相同，目的是出现相同的滚动条 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">infinite-list-phantom</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">      :style=&quot;{ height: </span><span style="color:#C792EA;">listHeight</span><span style="color:#89DDFF;"> + </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">px</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;"> }&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    &gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;!-- 最上层的可视区列表，数据和偏移距离随着滚动距离的变化而变化 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">infinite-list</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> :style=&quot;{ transform: </span><span style="color:#C792EA;">getTransform</span><span style="color:#89DDFF;"> }&quot;&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">      &lt;div</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">infinite-list-item</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">v-for</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item in visibleData</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        :key=&quot;item.id&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        :style=&quot;{ height: </span><span style="color:#C792EA;">itemSize</span><span style="color:#89DDFF;"> + </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">px</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;"> }&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">      &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> item.label </span><span style="color:#89DDFF;">}}</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#A6ACCD;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> computed</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> onMounted</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> ref </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> from &quot;vue&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">interface Props </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  list: </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> number; label: any </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">[];</span></span>
<span class="line"><span style="color:#A6ACCD;">  itemSize: number;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">const props = withDefaults(defineProps</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Props</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">(), </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  itemSize: </span><span style="color:#F78C6C;">50</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">const screenHeight = ref(0);</span></span>
<span class="line"><span style="color:#A6ACCD;">const startOffset = ref(0);</span></span>
<span class="line"><span style="color:#A6ACCD;">const startIndex = ref(0);</span></span>
<span class="line"><span style="color:#A6ACCD;">const endIndex = ref(0);</span></span>
<span class="line"><span style="color:#A6ACCD;">const virtualListContainer = ref</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HTMLElement</span><span style="color:#89DDFF;"> | </span><span style="color:#C792EA;">null</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">(null);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">onMounted(() =&gt; </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  screenHeight</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> virtualListContainer</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">!.</span><span style="color:#A6ACCD;">clientHeight;</span></span>
<span class="line"><span style="color:#A6ACCD;">  startIndex</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  endIndex</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> startIndex</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> visibleCount</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * 总高度</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">const listHeight = computed(() =&gt; </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  return props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">itemSize </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">list</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">const visibleData = computed(() =&gt; </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">start =&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> startIndex</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value);</span></span>
<span class="line"><span style="color:#A6ACCD;">  console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">end =&gt; </span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> endIndex</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value);</span></span>
<span class="line"><span style="color:#A6ACCD;">  const res </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">list</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    startIndex</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    Math</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">min</span><span style="color:#A6ACCD;">(endIndex</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">list</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length)</span></span>
<span class="line"><span style="color:#A6ACCD;">  );</span></span>
<span class="line"><span style="color:#A6ACCD;">  return res;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">const visibleCount = computed(() =&gt; </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  return Math</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ceil</span><span style="color:#A6ACCD;">(screenHeight</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">itemSize);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">//可视区列表偏移距离对应的样式</span></span>
<span class="line"><span style="color:#A6ACCD;">const getTransform = computed(() =&gt; </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  return </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">translate3d(0,</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">startOffset</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">px,0)</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">const scrollEvent = () =&gt; </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 当前的滚动高度</span></span>
<span class="line"><span style="color:#A6ACCD;">  const currScrollTop </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> virtualListContainer</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">!.</span><span style="color:#A6ACCD;">scrollTop;</span></span>
<span class="line"><span style="color:#A6ACCD;">  console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(currScrollTop);</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 当前应该出现的开始索引</span></span>
<span class="line"><span style="color:#A6ACCD;">  startIndex</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Math</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">floor</span><span style="color:#A6ACCD;">(currScrollTop </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">itemSize);</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 当前应该出现的结束索引</span></span>
<span class="line"><span style="color:#A6ACCD;">  endIndex</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> startIndex</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> visibleCount</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 此时的偏移距离</span></span>
<span class="line"><span style="color:#A6ACCD;">  startOffset</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> currScrollTop </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> (currScrollTop </span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;"> props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">itemSize);</span></span>
<span class="line"><span style="color:#A6ACCD;">  console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(screenTop);</span></span>
<span class="line"><span style="color:#A6ACCD;">  console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(startOffset</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">scoped</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">.infinite-list-container </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  height: </span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  overflow: auto;</span></span>
<span class="line"><span style="color:#A6ACCD;">  position: relative;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">.infinite-list-phantom </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  position: absolute;</span></span>
<span class="line"><span style="color:#A6ACCD;">  left: </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  top: </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  right: </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  z</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">index: </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">.infinite-list </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  left: </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  right: </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  top: </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  position: absolute;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">.infinite-list-item </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  line</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">height: 50px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  text</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">align: center;</span></span>
<span class="line"><span style="color:#A6ACCD;">  color: #</span><span style="color:#F78C6C;">555</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  border: 1px solid #ccc;</span></span>
<span class="line"><span style="color:#A6ACCD;">  box</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">sizing: border</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">box;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h4 id="使用组件" tabindex="-1">使用组件 <a class="header-anchor" href="#使用组件" aria-hidden="true">#</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">container</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">virtual-scroller</span><span style="color:#89DDFF;"> :item-size=&quot;50&quot; :list=&quot;virtualData&quot;&gt;&lt;/virtual-scroller&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;script </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import VirtualScroller from &quot;./myVirtualScroller.vue&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = [];</span></span>
<span class="line"><span style="color:#A6ACCD;">for (let i = 0; i &lt; 10000; i++) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  list</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> i</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">virtual-list </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">const virtualData = ref(list);</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">scope</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">.container </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  height: 300px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  border: 1px solid #</span><span style="color:#F78C6C;">333</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,19),e=[o];function t(c,r,D,F,y,C){return a(),n("div",null,e)}const u=s(p,[["render",t]]);export{A as __pageData,u as default};
