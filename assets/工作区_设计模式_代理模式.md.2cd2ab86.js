import{_ as e,c as l,o as a,a as i}from"./app.d0c2f5ea.js";const g=JSON.parse('{"title":"代理模式的笔记","description":"","frontmatter":{"title":"代理模式的笔记","tags":["代理模式","设计模式"],"创建时间":"星期日, 七月 31日 2022, 8:44:23 晚上","修改时间":"星期二, 八月 2日 2022, 11:58:35 晚上"},"headers":[{"level":2,"title":"保护代理和虚拟代理","slug":"保护代理和虚拟代理","link":"#保护代理和虚拟代理","children":[{"level":3,"title":"保护代理","slug":"保护代理","link":"#保护代理","children":[]},{"level":3,"title":"虚拟代理","slug":"虚拟代理","link":"#虚拟代理","children":[]},{"level":3,"title":"代理和本体接口的一致性","slug":"代理和本体接口的一致性","link":"#代理和本体接口的一致性","children":[]}]},{"level":2,"title":"其他代理","slug":"其他代理","link":"#其他代理","children":[]}],"relativePath":"工作区/设计模式/代理模式.md"}'),t={name:"工作区/设计模式/代理模式.md"},r=i('<p>#设计模式 #代理模式</p><h1 id="代理模式的笔记" tabindex="-1">代理模式的笔记 <a class="header-anchor" href="#代理模式的笔记" aria-hidden="true">#</a></h1><blockquote><p>代理模式就是为一个对象提供一个代用品或占位符，以便控制对它的访问。</p></blockquote><p>user -&gt; target user -&gt; proxy -&gt; target</p><h2 id="保护代理和虚拟代理" tabindex="-1">保护代理和虚拟代理 <a class="header-anchor" href="#保护代理和虚拟代理" aria-hidden="true">#</a></h2><h3 id="保护代理" tabindex="-1">保护代理 <a class="header-anchor" href="#保护代理" aria-hidden="true">#</a></h3><p>代理判断条件，不满足的请求直接拒绝掉。 用于控制不同权限的对象对目标对象的访问，但在JavaScript并不容易实现保护代理，因为我们无法判断谁访问了某个对象。 JavaScript是动态语言，动态语言只关注对象行为，不关注对象本身（鸭子类型）。</p><h3 id="虚拟代理" tabindex="-1">虚拟代理 <a class="header-anchor" href="#虚拟代理" aria-hidden="true">#</a></h3><p>把一些开销很大的对象，延迟到正在需要它的时候才去创建。</p><blockquote><p>使用虚拟代理实现图片预加载。</p></blockquote><p>web开发中，某个img标签节点设置src属性，由于图片过大or网络不佳，图片的位置往往会有段时间为空白。 常见的做法是用一张loading图片占位，然后使用异步的方式加载图片，等图片加载好了再把他填充到img节点。这个场景就适合虚拟代理。</p><ul><li>真实的Image对象 <ul><li>负责渲染图片</li><li>提供setSrc方法用于设置图片的路径</li></ul></li><li>代理的Image对象 <ul><li>负责加载过大图片</li><li>负责设置loading动态图片</li></ul></li></ul><p><strong>代理的意义</strong></p><p>若没有使用代理的话，唯一一个真实的Image对象也可以实现上述功能。</p><blockquote><p>那为何引入？</p></blockquote><p>单一职责[[单一职责原则]] 若一个对象承担多项职责，意味这个对象将变得巨大，引起它变化的原因可能会有很多。</p><p>上述说的一个真实的Image对象也可以达到(不借助代理)，那么若未来的网速上来了，图片不需要设置loading图片了。则这时候我们需要修改原来的代码。这破坏了开放封闭原则[[开放封闭原则]]。</p><p>若使用虚拟代理的话，只需要将代理负责预加载图片的操作设置图片的请求转给真实Image本体对象。</p><p>纵观整个程序，没有改变或增加本体Image对象的接口。但通过代理对象却可以增加新的行为。这符合开闭封闭原则。给img节点设置src和图片预加载的两个功能。被隔壁在2个对象里。它们的各自变化不影响对方。</p><h3 id="代理和本体接口的一致性" tabindex="-1">代理和本体接口的一致性 <a class="header-anchor" href="#代理和本体接口的一致性" aria-hidden="true">#</a></h3><ul><li>对于用户来说，使用代理和使用本体，他只关心想要的结果</li><li>任何使用本体的地方都可以替换成使用代理</li></ul><h2 id="其他代理" tabindex="-1">其他代理 <a class="header-anchor" href="#其他代理" aria-hidden="true">#</a></h2><ul><li>防火墙代理：控制网络资源的访问，保护主体不让“坏人”接近。</li><li>远程代理：为一个对象在不同的地址空间提供局部代表，在Java中，远程代理可以是另一个虚拟机中的对象。</li><li>保护代理：用于对象应该有不同的访问权限的情况。</li><li>智能引用代理：取代了简单的指针，它在访问对象时执行一些附加操作，比如计算一个对象被引用的次数。</li><li>写时复制代理：通常用于复制一个庞大对象的情况。写时复制代理延迟了复制的过程，当对象背真正修改时，才对它进行复制操作。写时复制代理是虚拟代理的一种变体。DLL（操作系统中的动态链接库）是其典型运用场景。</li></ul>',23),n=[r];function d(c,o,h,s,p,u){return a(),l("div",null,n)}const m=e(t,[["render",d]]);export{g as __pageData,m as default};
