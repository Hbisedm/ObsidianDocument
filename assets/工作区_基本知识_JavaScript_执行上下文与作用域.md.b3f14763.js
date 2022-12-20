import{_ as s,c as n,o as a,d as l}from"./app.0b246d93.js";const D=JSON.parse('{"title":"执行上下文与作用域的理解","description":"","frontmatter":{"title":"执行上下文与作用域的理解","tags":["执行上下文","作用域"],"创建时间":"星期三, 七月 27日 2022, 8:58:57 晚上","修改时间":"星期一, 十二月 5日 2022, 4:10:07 下午"},"headers":[{"level":2,"title":"作用域","slug":"作用域","link":"#作用域","children":[]},{"level":2,"title":"执行上下文","slug":"执行上下文","link":"#执行上下文","children":[]},{"level":2,"title":"作用域链","slug":"作用域链","link":"#作用域链","children":[]}],"relativePath":"工作区/基本知识/JavaScript/执行上下文与作用域.md"}'),p={name:"工作区/基本知识/JavaScript/执行上下文与作用域.md"},o=l(`<p>#JavaScript #执行上下文 #作用域</p><h1 id="执行上下文与作用域的理解" tabindex="-1">执行上下文与作用域的理解 <a class="header-anchor" href="#执行上下文与作用域的理解" aria-hidden="true">#</a></h1><h2 id="作用域" tabindex="-1">作用域 <a class="header-anchor" href="#作用域" aria-hidden="true">#</a></h2><blockquote><p>作用域是一个静态的概念，函数定义时就确定了作用域</p></blockquote><p>概念：作用域是定义变量的区域，它有一套访问变量的规则，这套规则来管理浏览器引擎如何在当前作用域以及嵌套的作用域中根据变量（标识符）进行变量查找</p><p>理解：当函数内使用变量时，会去当前的作用域和它的作用域链找，直到最外层的作用域（script）。</p><p>三个类型：</p><ul><li>全局作用域</li><li>函数作用域</li><li>块级作用域，ES6 中的 let、const 就可以产生该作用域</li></ul><h2 id="执行上下文" tabindex="-1">执行上下文 <a class="header-anchor" href="#执行上下文" aria-hidden="true">#</a></h2><blockquote><p>执行上下文是一个动态的概念，函数调用时才确定上下文。</p></blockquote><ul><li>全局执行上下文</li><li>函数执行上下文</li><li>eval执行上下文</li></ul><p>执行上下文有三个属性</p><ul><li>变量对象（VO）[[VO与AO]] <ul><li>变量</li><li>函数声明</li><li>函数形参</li></ul></li><li>作用域链</li><li>this</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">foo</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">b</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">20</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#82AAFF;">foo</span><span style="color:#A6ACCD;">() </span></span>
<span class="line"></span></code></pre></div><p>对于上述代码，执行栈(执行上下文栈)中有两个上下文：全局上下文和函数 foo 上下文。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">stack = [</span></span>
<span class="line"><span style="color:#A6ACCD;">    globalContext,</span></span>
<span class="line"><span style="color:#A6ACCD;">    fooContext</span></span>
<span class="line"><span style="color:#A6ACCD;">] </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>全局上下文的变量对象叫做VO</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">globalContext.VO = {</span></span>
<span class="line"><span style="color:#A6ACCD;">    a: undefined,</span></span>
<span class="line"><span style="color:#A6ACCD;">    foo: &lt;Function&gt;,</span></span>
<span class="line"><span style="color:#A6ACCD;">} </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>函数上下文的变量对象叫做AO</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">fooContext.AO {</span></span>
<span class="line"><span style="color:#A6ACCD;">    i: undefined,</span></span>
<span class="line"><span style="color:#A6ACCD;">    b: undefined,</span></span>
<span class="line"><span style="color:#A6ACCD;">    arguments: &lt;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="作用域链" tabindex="-1">作用域链 <a class="header-anchor" href="#作用域链" aria-hidden="true">#</a></h2><blockquote><p>包含<strong>自身变量对象</strong>和<strong>上级变量对象</strong>的列表，通过 [[Scope]]属性查找上级变量</p></blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 作用域链</span></span>
<span class="line"><span style="color:#A6ACCD;">fooContext.[[Scope]] = [</span></span>
<span class="line"><span style="color:#A6ACCD;">    globalContext.VO</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 作用域</span></span>
<span class="line"><span style="color:#A6ACCD;">fooContext.Scope = fooContext.[[Scope]] + fooContext.VO</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// foo能访问的范围：</span></span>
<span class="line"><span style="color:#A6ACCD;">fooContext.Scope = [</span></span>
<span class="line"><span style="color:#A6ACCD;">    fooContext.VO,</span></span>
<span class="line"><span style="color:#A6ACCD;">    globalContext.VO</span></span>
<span class="line"><span style="color:#A6ACCD;">] </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,23),e=[o];function t(c,i,r,C,A,d){return a(),n("div",null,e)}const u=s(p,[["render",t]]);export{D as __pageData,u as default};
