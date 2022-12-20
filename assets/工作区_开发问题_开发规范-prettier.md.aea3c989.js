import{_ as e,c as t,o as a,a as s}from"./app.d0c2f5ea.js";const b=JSON.parse('{"title":"开发规范","description":"","frontmatter":{"title":"开发规范","date":"2022-06-03T11:30:09.000Z","tags":["开发规范"]},"headers":[{"level":2,"title":"prettier的使用","slug":"prettier的使用","link":"#prettier的使用","children":[]},{"level":2,"title":"Prettier 和各种 Linters 是什么关系？如何配合使用？","slug":"prettier-和各种-linters-是什么关系-如何配合使用","link":"#prettier-和各种-linters-是什么关系-如何配合使用","children":[]},{"level":2,"title":"参考链接","slug":"参考链接","link":"#参考链接","children":[]}],"relativePath":"工作区/开发问题/开发规范-prettier.md"}'),r={name:"工作区/开发问题/开发规范-prettier.md"},n=s(`<p>#规范</p><h1 id="开发规范的笔记" tabindex="-1">开发规范的笔记 <a class="header-anchor" href="#开发规范的笔记" aria-hidden="true">#</a></h1><blockquote><p>团队开发中，规范的重要性，不用多说。 由于每个开发者的IDE不同，即使IDE相同也会因为每个人的配置不一样导致格式化的结果不一样。如何确保团队内开发人员采用统一的格式化配置呢？ 使用<a href="https://prettier.io/" target="_blank" rel="noreferrer">prettier</a>，</p></blockquote><p>官方首先告诉你，Prettier 是一个 Opinionated 的代码格式化工具</p><blockquote><p>当前编写的代码 -&gt; AST -&gt; Prettier格式化后的代码</p></blockquote><h2 id="prettier的使用" tabindex="-1">prettier的使用 <a class="header-anchor" href="#prettier的使用" aria-hidden="true">#</a></h2><p>安装依赖</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">yarn add --dev --exact prettier</span></span>
<span class="line"></span></code></pre></div><p>使用命令对代码进行格式化</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">yarn prettier --write src/index.ts</span></span>
<span class="line"></span></code></pre></div><p>配置vscode对代码进行格式化 进入首选项 <img src="https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206031417402.png" alt=""></p><p>配置vscode设置保存时自动格式化代码 <img src="https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206031415004.png" alt=""></p><p><img src="https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206251341252.png" alt=""></p><p>Prettier 和已有的各种 Linters 是什么关系？以前一直用 JSLint 或 TSLint，甚至还会用到 StyleLint。现在 Prettier 支持 JS、TS、CSS，能够自动重新格式化这些代码，还有必要用各种 Linters 吗？如果 Prettier 和 ESLint/TSLint 一起用又会怎么样呢？</p><h2 id="prettier-和各种-linters-是什么关系-如何配合使用" tabindex="-1">Prettier 和各种 Linters 是什么关系？如何配合使用？ <a class="header-anchor" href="#prettier-和各种-linters-是什么关系-如何配合使用" aria-hidden="true">#</a></h2><p>各种 Linters 是按照规则(Rules)去检查代码的，遇到不符合规则的代码就会提示你，有的规则还能自动帮你解决冲突。</p><p>当 ESLint 遇到 incorrect code 的时候，会提示你违反规则，让你修改代码以符合规则。</p><p>而 Prettier 则不会这么麻烦，它根本不管你之前符不符合什么规则，都先把你的代码解析成 AST，然后按照它自己的风格给你重新输出代码。</p><p>换句话说，Prettier 对应的是各种 Linters 的 Formatting rules 这一类规则。而且你用了 Prettier 之后，就不会再违反这类规则了！不需要你自己手动修改代码。</p><p>Prettier 和 Linters 的整合需要做两件事：</p><ol><li>禁用 Linters 自己的 Formatting rules，让 Prettier 接管这些职责。这些配置有现成的 Config，Linters 的配置继承这个 Config 就可以了。</li><li>让 Linters 执行时首先能够调用 Prettier 格式化带啊，然后再检查 Code-quality 类规则。这是 由 Linters 的 Plugin 实现的。</li></ol><p>使用prettier-eslint</p><div class="language-powershell"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">//</span><span style="color:#A6ACCD;"> 创建工程初始化的时候用</span></span>
<span class="line"><span style="color:#A6ACCD;">npm init prettier</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">eslint</span></span>
<span class="line"><span style="color:#89DDFF;">//</span><span style="color:#A6ACCD;"> 或直接使用</span></span>
<span class="line"><span style="color:#A6ACCD;">npx create</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">prettier</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">eslint</span></span>
<span class="line"></span></code></pre></div><p><a href="https://vdn.vzuu.com/SD/v3_869e5642-d829-11e9-8f28-0a580a41862b.mp4?disable_local_cache=1&amp;bu=http-da4bec50&amp;c=avc.0.0&amp;f=mp4&amp;expiration=1654241303&amp;auth_key=1654241303-0-0-fa2c2831adfb9fe45ea2319667b4f58c&amp;v=ali&amp;pu=da4bec50" target="_blank" rel="noreferrer">使用视频</a></p><h2 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-hidden="true">#</a></h2><p><a href="https://zhuanlan.zhihu.com/p/81764012" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/81764012</a></p>`,26),p=[n];function i(l,o,c,d,h,u){return a(),t("div",null,p)}const _=e(r,[["render",i]]);export{b as __pageData,_ as default};
