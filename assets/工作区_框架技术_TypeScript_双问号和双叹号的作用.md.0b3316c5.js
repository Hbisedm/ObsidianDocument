import{_ as e,c as a,o as t,d}from"./app.0b246d93.js";const g=JSON.parse('{"title":"双问号和双叹号的作用","description":"","frontmatter":{"title":"双问号和双叹号的作用","tags":["TypeScript"],"创建时间":"星期三, 七月 27日 2022, 8:58:57 晚上","修改时间":"星期四, 七月 28日 2022, 1:17:00 下午"},"headers":[{"level":2,"title":"!!","slug":"","link":"#","children":[]},{"level":2,"title":"??","slug":"-1","link":"#-1","children":[{"level":3,"title":"与 || 的区别","slug":"与-的区别","link":"#与-的区别","children":[]},{"level":3,"title":"与三目运算符类似","slug":"与三目运算符类似","link":"#与三目运算符类似","children":[]}]}],"relativePath":"工作区/框架技术/TypeScript/双问号和双叹号的作用.md"}'),r={name:"工作区/框架技术/TypeScript/双问号和双叹号的作用.md"},n=d('<p>#TypeScript</p><h1 id="双问号和双叹号的作用" tabindex="-1">双问号和双叹号的作用 <a class="header-anchor" href="#双问号和双叹号的作用" aria-hidden="true">#</a></h1><h2 id="" tabindex="-1">!! <a class="header-anchor" href="#" aria-hidden="true">#</a></h2><p>将一个类型转为 boolean，类似 Boolean()的方式</p><h2 id="-1" tabindex="-1">?? <a class="header-anchor" href="#-1" aria-hidden="true">#</a></h2><p>它是 ES11 增加的新特性，叫做<code>空值合并操作符</code>，是一个逻辑操作符 当操作符的左侧是<code>null</code>或者<code>undefined</code>，返回其右侧操作数，否则返回左侧操作数。</p><h3 id="与-的区别" tabindex="-1">与 || 的区别 <a class="header-anchor" href="#与-的区别" aria-hidden="true">#</a></h3><p>使用  <code>||</code>  时，<strong>值 1</strong>会转换为布尔值判断，为<code>true</code>返回<strong>值 1</strong>，<code>false</code>  返回<strong>值 2</strong> 使用  <code>??</code>  时，只有当<strong>值 1</strong>为<code>null</code>或<code>undefined</code>时才返回<strong>值 2</strong>；</p><h3 id="与三目运算符类似" tabindex="-1">与三目运算符类似 <a class="header-anchor" href="#与三目运算符类似" aria-hidden="true">#</a></h3><p>a ? a : b a ?? b</p>',10),o=[n];function c(i,s,l,h,_,p){return t(),a("div",null,o)}const f=e(r,[["render",c]]);export{g as __pageData,f as default};
