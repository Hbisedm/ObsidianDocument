import{_ as s,c as n,o as a,d as l}from"./app.0b246d93.js";const g=JSON.parse('{"title":"git的理解使用","description":"","frontmatter":{"title":"git的理解使用","tags":["git"],"创建时间":"星期三, 七月 27日 2022, 8:58:57 晚上","修改时间":"星期六, 十一月 26日 2022, 3:16:02 下午"},"headers":[{"level":2,"title":"本地创建远程分支","slug":"本地创建远程分支","link":"#本地创建远程分支","children":[]},{"level":2,"title":"Git 撤回操作","slug":"git-撤回操作","link":"#git-撤回操作","children":[{"level":3,"title":"Git Reset 撤回","slug":"git-reset-撤回","link":"#git-reset-撤回","children":[]},{"level":3,"title":"还原 Revert","slug":"还原-revert","link":"#还原-revert","children":[]},{"level":3,"title":"正常提交的commit","slug":"正常提交的commit","link":"#正常提交的commit","children":[]},{"level":3,"title":"merge合并而成的commit","slug":"merge合并而成的commit","link":"#merge合并而成的commit","children":[]}]},{"level":2,"title":"挑拣 Cherry-pick","slug":"挑拣-cherry-pick","link":"#挑拣-cherry-pick","children":[]},{"level":2,"title":"Git Message 提交规范","slug":"git-message-提交规范","link":"#git-message-提交规范","children":[{"level":3,"title":"添加远程仓库","slug":"添加远程仓库","link":"#添加远程仓库","children":[]},{"level":3,"title":"查看当前的远程仓库","slug":"查看当前的远程仓库","link":"#查看当前的远程仓库","children":[]},{"level":3,"title":"远程仓库中抓取与拉取","slug":"远程仓库中抓取与拉取","link":"#远程仓库中抓取与拉取","children":[]},{"level":3,"title":"本地关联远程","slug":"本地关联远程","link":"#本地关联远程","children":[]}]},{"level":2,"title":"分离HEAD","slug":"分离head","link":"#分离head","children":[]},{"level":2,"title":"相对引用","slug":"相对引用","link":"#相对引用","children":[{"level":3,"title":"^","slug":"","link":"#","children":[]},{"level":3,"title":"~","slug":"-1","link":"#-1","children":[]},{"level":3,"title":"强制修改分支位置","slug":"强制修改分支位置","link":"#强制修改分支位置","children":[]}]},{"level":2,"title":"撤销变更","slug":"撤销变更","link":"#撤销变更","children":[{"level":3,"title":"本地","slug":"本地","link":"#本地","children":[]},{"level":3,"title":"远程","slug":"远程","link":"#远程","children":[]}]},{"level":2,"title":"变基 Rebase","slug":"变基-rebase","link":"#变基-rebase","children":[{"level":3,"title":"将多次commit合成一个","slug":"将多次commit合成一个","link":"#将多次commit合成一个","children":[]},{"level":3,"title":"实战操作","slug":"实战操作","link":"#实战操作","children":[]}]},{"level":2,"title":"开发可能遇到的case","slug":"开发可能遇到的case","link":"#开发可能遇到的case","children":[{"level":3,"title":"切换分支保留修改","slug":"切换分支保留修改","link":"#切换分支保留修改","children":[]},{"level":3,"title":"切换分支转移修改","slug":"切换分支转移修改","link":"#切换分支转移修改","children":[]},{"level":3,"title":"Revert 之后重新上线 diff丢失","slug":"revert-之后重新上线-diff丢失","link":"#revert-之后重新上线-diff丢失","children":[]},{"level":3,"title":"合并冲突不想合并了","slug":"合并冲突不想合并了","link":"#合并冲突不想合并了","children":[]},{"level":3,"title":"解决冲突","slug":"解决冲突","link":"#解决冲突","children":[]}]},{"level":2,"title":"PR","slug":"pr","link":"#pr","children":[]},{"level":2,"title":"整理提交记录","slug":"整理提交记录","link":"#整理提交记录","children":[{"level":3,"title":"一些常用的 Git 命令","slug":"一些常用的-git-命令","link":"#一些常用的-git-命令","children":[]}]}],"relativePath":"工作区/开发工具/git.md"}'),p={name:"工作区/开发工具/git.md"},e=l(`<p>#git</p><h1 id="git的理解使用" tabindex="-1">git的理解使用 <a class="header-anchor" href="#git的理解使用" aria-hidden="true">#</a></h1><h2 id="本地创建远程分支" tabindex="-1">本地创建远程分支 <a class="header-anchor" href="#本地创建远程分支" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git push origin feature-xxx:feature-xxx</span></span>
<span class="line"></span></code></pre></div><h2 id="git-撤回操作" tabindex="-1">Git 撤回操作 <a class="header-anchor" href="#git-撤回操作" aria-hidden="true">#</a></h2><p><a href="https://blog.csdn.net/xs20691718/article/details/51901161" target="_blank" rel="noreferrer">远程提交后 突然要撤回</a></p><blockquote><p><a href="https://ohshitgit.com/zh" target="_blank" rel="noreferrer">look this</a></p></blockquote><h3 id="git-reset-撤回" tabindex="-1">Git Reset 撤回 <a class="header-anchor" href="#git-reset-撤回" aria-hidden="true">#</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"># 简单操作（暴力撤回到指定）</span></span>
<span class="line"><span style="color:#F78C6C;">1.</span><span style="color:#A6ACCD;"> git reflog 找出目标HEAD</span></span>
<span class="line"><span style="color:#F78C6C;">2.</span><span style="color:#A6ACCD;"> git reset </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">hard </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">目标HEAD</span><span style="color:#89DDFF;">\`</span><span style="color:#A6ACCD;"> 如 </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">git reset --hard HEAD@{23}</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"></span></code></pre></div><p><code>git reset</code> 通常用来把代码重置到过去的某个版本，有五种模式（<code>--mixed</code>、<code>--soft</code>、<code>--hard</code>、<code>--merge</code>）</p><p>另外 <code>git reset</code> 比较暴力，要慎用，比如现在提交五次了，然后使用这个命令重置到第一次，那么第二三四五次提交记录会全部没了的，找不回来的，这种情况记得新建个分支来执行这种操作就没事了，或者使用 <code>git revert</code></p><ul><li>mixed (默认模式) 重置并撤销 git commit 以及 git add，<strong>保留</strong>编辑器中所有修改</li><li>soft  重置并撤销 git commit，但不撤销 git add，<strong>保留</strong>编辑器中所有修改</li><li>hard 重置并撤销 git commit 以及 git add，并且<strong>删除</strong>编辑器中所有修改</li><li>merge 取消某次合并</li><li>keep 取消某次合并</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 后面一长串就是我复制的 commitID 或者说是 hash，长得就是这样子的  </span></span>
<span class="line"><span style="color:#676E95;"># 等同于 git reset commitID，因为 --mixed 是默认模式，所以可以不写  </span></span>
<span class="line"><span style="color:#676E95;"># 重置并撤销 git commit 以及 git add，保留编辑器中所有修改  </span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --mixed afcfbcb940164de24cc4f8c866e1da3a18382e10  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#676E95;"># 重置并撤销 git commit，但不撤销 git add，保留编辑器中所有修改  </span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --soft commitID  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#676E95;"># 重置并撤销 git commit 以及 git add，并且删除编辑器中所有修改  </span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --hard commitID  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#676E95;"># 取消某次合并  </span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --merge commitID  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --keep commitID  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#676E95;"># 把暂存区所有文件退回到工作区，相当于撤销 git add .  </span></span>
<span class="line"><span style="color:#A6ACCD;">git reset HEAD  </span></span>
<span class="line"><span style="color:#676E95;"># 把暂存区的 test.js 重新放回工作区，和 git restore --staged test.js 作用一样  </span></span>
<span class="line"><span style="color:#A6ACCD;">git reset HEAD test.js  </span></span>
<span class="line"><span style="color:#676E95;"># 重置到上一个版本  </span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --hard HEAD^  </span></span>
<span class="line"><span style="color:#676E95;"># 重置到上上一个版本，以此类推  </span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --hard HEAD^^  </span></span>
<span class="line"><span style="color:#676E95;"># 重置到指定版本  </span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --hard commitID</span></span>
<span class="line"></span></code></pre></div><p>另外关于叫法本地仓库一般说重置、还原、撤销都行，远程仓库一般叫回滚</p><h3 id="还原-revert" tabindex="-1">还原 Revert <a class="header-anchor" href="#还原-revert" aria-hidden="true">#</a></h3><p><code>git revert</code> 和 <code>git reset</code> 有点类似，只是比 <code>reset</code> 稍微温柔一点，没那么暴力。</p><p>revert分两种情况</p><ul><li>正常提交</li><li>merge合并的提交</li></ul><h3 id="正常提交的commit" tabindex="-1">正常提交的commit <a class="header-anchor" href="#正常提交的commit" aria-hidden="true">#</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 撤销正常提交的 commit</span></span>
<span class="line"><span style="color:#A6ACCD;">git revert commitID</span></span>
<span class="line"></span></code></pre></div><h3 id="merge合并而成的commit" tabindex="-1">merge合并而成的commit <a class="header-anchor" href="#merge合并而成的commit" aria-hidden="true">#</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git show 当前的commitID</span></span>
<span class="line"><span style="color:#A6ACCD;">commit d4d61e51ea89ce36b01ea14047948630be46d93a </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">HEAD -</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> feat-a</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;"># 这里会多一行Merge 后面的两个commit指的是从哪两个合并过来的</span></span>
<span class="line"><span style="color:#A6ACCD;">Merge: e0774ae 7ecfb20</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 这种case下 使用revert</span></span>
<span class="line"><span style="color:#676E95;"># 撤销 merge 的 commit 提交需要加参数来区分撤销哪一个分支上的内容  </span></span>
<span class="line"><span style="color:#676E95;"># 也就是指定上面 Merge: e0774ae 7ecfb20，这两个 id 中的哪一个  </span></span>
<span class="line"><span style="color:#676E95;"># -m 接收一个参数是数字，取值 1 或 2，表示 Merge 的第一个还是第二个 id</span></span>
<span class="line"><span style="color:#A6ACCD;">git revert -m 2 </span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="挑拣-cherry-pick" tabindex="-1">挑拣 Cherry-pick <a class="header-anchor" href="#挑拣-cherry-pick" aria-hidden="true">#</a></h2><blockquote><p>简单说：调一个提交记录到当前分支</p></blockquote><p>和 merge 不同的是：<code>cherry-pick</code> 合并的是某一次 <code>commit</code> 提交的文件，<code>merge</code> 合并的是整个分支。且 <code>merge</code> 会额外多一条 <code>merge commit</code> 的记录，而 <code>cherry-pick</code> 不会。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 这样就把其他分支的一个 commit 合入当前分支了  </span></span>
<span class="line"><span style="color:#A6ACCD;">git cherry-pick commitID  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#676E95;"># 如果需要把多个 commit 合过来如下，这多个 commitID 可以是来自不同分支的  </span></span>
<span class="line"><span style="color:#A6ACCD;">git cherry-pick commitID1 commitID2 commitID3</span></span>
<span class="line"></span></code></pre></div><h2 id="git-message-提交规范" tabindex="-1">Git Message 提交规范 <a class="header-anchor" href="#git-message-提交规范" aria-hidden="true">#</a></h2><p>feat: 新功能、新特性 fix: 修改 bug perf: 更改代码，以提高性能 refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改） docs: 文档修改 style: 代码格式修改, 注意不是 css 修改（例如分号修改） test: 测试用例新增、修改 build: 影响项目构建或依赖项修改 revert: 恢复上一次提交 ci: 持续集成相关文件修改 chore: 其他修改（不在上述类型中的修改） release: 发布新版本 workflow: 工作流相关文件修改</p><h3 id="添加远程仓库" tabindex="-1">添加远程仓库 <a class="header-anchor" href="#添加远程仓库" aria-hidden="true">#</a></h3><p>运行 <code>git remote add &lt;shortname&gt; &lt;url&gt;</code> 添加一个新的远程 Git 仓库，同时指定一个方便使用的简写.</p><blockquote><p>一般shortname为<strong>origin</strong></p></blockquote><h3 id="查看当前的远程仓库" tabindex="-1">查看当前的远程仓库 <a class="header-anchor" href="#查看当前的远程仓库" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git remote -l</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="远程仓库中抓取与拉取" tabindex="-1">远程仓库中抓取与拉取 <a class="header-anchor" href="#远程仓库中抓取与拉取" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ git fetch &lt;remote&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="本地关联远程" tabindex="-1">本地关联远程 <a class="header-anchor" href="#本地关联远程" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git branch --set-upstream-to=&lt;shortname&gt;/main main</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><blockquote><p>拒绝合并无关的历史</p></blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git merge blog/main --allow-unrelated-histories</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="分离head" tabindex="-1">分离HEAD <a class="header-anchor" href="#分离head" aria-hidden="true">#</a></h2><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git checkout hash值</span></span>
<span class="line"></span></code></pre></div><h2 id="相对引用" tabindex="-1">相对引用 <a class="header-anchor" href="#相对引用" aria-hidden="true">#</a></h2><h3 id="" tabindex="-1"><code>^</code> <a class="header-anchor" href="#" aria-hidden="true">#</a></h3><p>使用 <code>^</code> 向上移动 1 个提交记录 所以 <code>main^</code> 相当于“<code>main</code> 的父节点”。 <code>main^^</code> 是 <code>main</code> 的第二个父节点</p><h3 id="-1" tabindex="-1"><code>~</code> <a class="header-anchor" href="#-1" aria-hidden="true">#</a></h3><p>使用 <code>~&lt;num&gt;</code> 向上移动多个提交记录，如 <code>~3</code></p><h3 id="强制修改分支位置" tabindex="-1">强制修改分支位置 <a class="header-anchor" href="#强制修改分支位置" aria-hidden="true">#</a></h3><p>可以直接使用 <code>-f</code> 选项让分支指向另一个提交。例如:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git branch -f main HEAD~3</span></span>
<span class="line"></span></code></pre></div><p>上面的命令会将 main 分支强制指向 HEAD 的第 3 级父提交。</p><blockquote><p>这里的HEAD是当前HEAD所在的分支，不是强制移动分支那个HEAD</p></blockquote><h2 id="撤销变更" tabindex="-1">撤销变更 <a class="header-anchor" href="#撤销变更" aria-hidden="true">#</a></h2><h3 id="本地" tabindex="-1">本地 <a class="header-anchor" href="#本地" aria-hidden="true">#</a></h3><p><code>git reset</code> 通过把分支记录回退几个提交记录来实现撤销改动。你可以将这想象成“改写历史”。<code>git reset</code> 向上移动分支，原来指向的提交记录就跟从来没有提交过一样。</p><h3 id="远程" tabindex="-1">远程 <a class="header-anchor" href="#远程" aria-hidden="true">#</a></h3><p>虽然在你的本地分支中使用 <code>git reset</code> 很方便，但是这种“改写历史”的方法对大家一起使用的远程分支是无效的哦！ 为了撤销更改并<strong>分享</strong>给别人，我们需要使用 <code>git revert</code>。来看演示：<code>git revert HEAD</code></p><h2 id="变基-rebase" tabindex="-1">变基 Rebase <a class="header-anchor" href="#变基-rebase" aria-hidden="true">#</a></h2><blockquote><p><a href="https://www.jianshu.com/p/4a8f4af4e803" target="_blank" rel="noreferrer">rebase 用法小结</a></p></blockquote><h3 id="将多次commit合成一个" tabindex="-1">将多次commit合成一个 <a class="header-anchor" href="#将多次commit合成一个" aria-hidden="true">#</a></h3><p>git merge 和 git rebase 都是可以合并分支，合并用法也是一样，不同的一个是在 commit 记录的处理上</p><ul><li><p><code>git merge</code> 会新建一条新的 commit ，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会保留之前每个分支的 commit 历史。</p></li><li><p><code>git rebase</code>会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，放到目标分的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记录了。</p></li></ul><blockquote><p>merge 多个提交记录分叉 rebase 一个提交记录</p></blockquote><h3 id="实战操作" tabindex="-1">实战操作 <a class="header-anchor" href="#实战操作" aria-hidden="true">#</a></h3><ul><li>合并一些指定提交记录范围</li><li>将某一段 commit范围 粘贴到另一个分支上</li></ul><h4 id="合并一些指定提交记录范围" tabindex="-1">合并一些指定提交记录范围 <a class="header-anchor" href="#合并一些指定提交记录范围" aria-hidden="true">#</a></h4><h5 id="rebase" tabindex="-1">Rebase <a class="header-anchor" href="#rebase" aria-hidden="true">#</a></h5><p><img src="https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202211202108440.png" alt=""></p><blockquote><p>在当前的分支进行操作</p></blockquote><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git rebase -i </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">提交记录开始</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">提交记录结束</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>如果没有指定结束，默认就当做HEAD</p><h5 id="reset" tabindex="-1">Reset <a class="header-anchor" href="#reset" aria-hidden="true">#</a></h5><p>这个case 也可以使用<code>reset</code>实现</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git reset --soft commitId </span></span>
<span class="line"><span style="color:#A6ACCD;">git commit -m </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xxx</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><ul><li>恢复到指定的记录(soft 只恢复到指定记录的暂存区(在此之后的记录清理掉)，不清理原来工作区的代码)</li><li>再重新提交</li></ul><p>这样的话 <code>git log</code> 也是看不到中间的提交记录列表</p><h4 id="将某一段-commit-粘贴到另一个分支上" tabindex="-1">将某一段 Commit 粘贴到另一个分支上 <a class="header-anchor" href="#将某一段-commit-粘贴到另一个分支上" aria-hidden="true">#</a></h4><p>如果是一两个， 可以使用<code>cherry-pick</code> 方便一下</p><p><img src="https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202211202108163.png" alt=""></p><blockquote><p><strong>在develop分支下执行</strong></p></blockquote><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git rebase -i </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">startpoint</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">endpoint</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> --onto master</span></span>
<span class="line"></span></code></pre></div><p>其中，<code>[startpoint]</code> <code>[endpoint]</code>仍然和上一个命令一样指定了一个编辑区间(前开后闭)，<code>--onto</code>的意思是要将该指定的提交复制到哪个分支上。</p><p>因为<code>[startpoint]</code> <code>[endpoint]</code>指定的是一个前开后闭的区间，为了让这个区间包含C提交，我们将区间起始点向后退了一步</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">▶ $ git rebase -i 0402c50f21c0ae926dd869a4061c5b63b2c54ca1^ 3ce90b1f863874ffa92107e208dba295fcaf9ad0 --onto newBranch</span></span>
<span class="line"><span style="color:#A6ACCD;">成功变基并更新 detached HEAD。</span></span>
<span class="line"><span style="color:#A6ACCD;">▶ $ git status</span></span>
<span class="line"><span style="color:#A6ACCD;">头指针分离自 refs/heads/feat-a</span></span>
<span class="line"><span style="color:#A6ACCD;">无文件要提交，干净的工作区</span></span>
<span class="line"></span></code></pre></div><p><img src="https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202211202139539.png" alt=""></p><p>现在它是个游离的头部HEAD</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 回到目标分支</span></span>
<span class="line"><span style="color:#A6ACCD;">git checkout newBranch</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 重置到指定的游离hash</span></span>
<span class="line"><span style="color:#A6ACCD;">git reset --hard  commentId</span></span>
<span class="line"></span></code></pre></div><p><img src="https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202211202142529.png" alt=""></p><p><img src="https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202211202143734.png" alt=""></p><h2 id="开发可能遇到的case" tabindex="-1">开发可能遇到的case <a class="header-anchor" href="#开发可能遇到的case" aria-hidden="true">#</a></h2><h3 id="切换分支保留修改" tabindex="-1">切换分支保留修改 <a class="header-anchor" href="#切换分支保留修改" aria-hidden="true">#</a></h3><blockquote><p>在<code>feat-xxx</code>分支上正在开发，由于某原因不得不去<code>main</code> 分支修改东西，现在开发进行一半，不想提交，又想保留当前的代码</p></blockquote><p>使用 <code>git stash</code> 储存起来</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git stash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">git checkout main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 修改完</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">git checkout feat-xxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 拿出来</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash pop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 删除所有的储存</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash clear </span></span>
<span class="line"></span></code></pre></div><h3 id="切换分支转移修改" tabindex="-1">切换分支转移修改 <a class="header-anchor" href="#切换分支转移修改" aria-hidden="true">#</a></h3><blockquote><p>打开到一半，突然发现当前在<code>main</code>分支， 实际要在<code>feat-xxx</code>分支上开发， 想要当前编辑的内容，丢到 <code>feat-xxx</code>分支上 ，然后切到<code>feat-xxx</code>上去开发</p></blockquote><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git stash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">git checkout feat-xxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">git stash pop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 或者 查看储存列表</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash list</span></span>
<span class="line"><span style="color:#676E95;"># 取出储存中指定的部分修改</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash apply stash@{0}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">git stash clear</span></span>
<span class="line"></span></code></pre></div><p>合并时发生冲突用 <code>git merge abort</code> 或 <code>git reset --merge</code> 都可以取消合并</p><h3 id="revert-之后重新上线-diff丢失" tabindex="-1">Revert 之后重新上线 diff丢失 <a class="header-anchor" href="#revert-之后重新上线-diff丢失" aria-hidden="true">#</a></h3><h3 id="合并冲突不想合并了" tabindex="-1">合并冲突不想合并了 <a class="header-anchor" href="#合并冲突不想合并了" aria-hidden="true">#</a></h3><p>合并时、或者拉取时等，发现有冲突，可能是其他同事提交的，自己不知道怎么冲突怎么选择，或者其他原因，总之不想合并了，都可以用 <code>--abort</code> 取消，比如合并的时候发现有冲突不想合并了</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git merge --abort</span></span>
<span class="line"></span></code></pre></div><h3 id="解决冲突" tabindex="-1">解决冲突 <a class="header-anchor" href="#解决冲突" aria-hidden="true">#</a></h3><p>一般在ide里面都有很好的可视化界面提供选择哪段代码</p><h2 id="pr" tabindex="-1">PR <a class="header-anchor" href="#pr" aria-hidden="true">#</a></h2><p><a href="https://www.freecodecamp.org/chinese/news/how-to-make-your-first-pull-request-on-github/" target="_blank" rel="noreferrer">如何提交PR</a></p><h2 id="整理提交记录" tabindex="-1">整理提交记录 <a class="header-anchor" href="#整理提交记录" aria-hidden="true">#</a></h2><h3 id="一些常用的-git-命令" tabindex="-1">一些常用的 Git 命令 <a class="header-anchor" href="#一些常用的-git-命令" aria-hidden="true">#</a></h3><blockquote><p><a href="https://mp.weixin.qq.com/s/1NolHgaQ_b4T69wJiy8BkA" target="_blank" rel="noreferrer">学习git</a></p></blockquote><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki has-diff"><code><span class="line"></span>
<span class="line"><span style="color:#676E95;">## 配置用户名与邮箱</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git --version   </span><span style="color:#676E95;"># 查看git的版本信息</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git config --global user.name   </span><span style="color:#676E95;"># 获取当前登录的用户</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git config --global user.email  </span><span style="color:#676E95;"># 获取当前登录用户的邮箱</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## 登录git</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 如果刚没有获取到用户配置，则只能拉取代码，不能修改  要是使用git，你要告诉git是谁在使用</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git config --global user.name </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">userName</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">    </span><span style="color:#676E95;"># 设置git账户，userName为你的git账号，</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git config --global user.email </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">email</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#676E95;"># 获取Git配置信息，执行以下命令：</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git config –list</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## 配置https和ssh推送时保存用户名和密码</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># https提交保存用户名和密码</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git config --global credential.helper store</span></span>
<span class="line"><span style="color:#676E95;"># 生成公钥私钥，将公钥配置到GitHub，ssh提交就可以免输入用户名密码</span></span>
<span class="line"><span style="color:#676E95;"># 三次回车即可生成 ssh key</span></span>
<span class="line"><span style="color:#A6ACCD;">$ ssh-keygen -t rsa</span></span>
<span class="line"><span style="color:#676E95;"># 查看已生成的公钥</span></span>
<span class="line"><span style="color:#A6ACCD;">$ cat </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.ssh/id_rsa.pub</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## 推送到远程仓库正确流程</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">1. git init </span><span style="color:#676E95;"># 初始化仓库</span></span>
<span class="line"><span style="color:#A6ACCD;">2. git add .</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">文件name</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># 添加文件到本地仓库</span></span>
<span class="line"><span style="color:#A6ACCD;">3. git commit -m </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">first commit</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># 添加文件描述信息</span></span>
<span class="line"><span style="color:#A6ACCD;">4. git remote add origin 远程仓库地址 </span><span style="color:#676E95;"># 链接远程仓库，创建主分支</span></span>
<span class="line"><span style="color:#A6ACCD;">5. git pull origin master --allow-unrelated-histories </span><span style="color:#676E95;"># 把本地仓库的变化连接到远程仓库主分支</span></span>
<span class="line"><span style="color:#A6ACCD;">6. git push -u origin master </span><span style="color:#676E95;"># 把本地仓库的文件推送到远程仓库</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## 新建本地仓库</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 在当前目录新建一个Git代码库</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git init</span></span>
<span class="line"><span style="color:#676E95;"># 新建一个目录，将其初始化为Git代码库</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git init </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">project-name</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 下载一个项目和它的整个代码历史</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git clone </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">url</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## 配置(全局和项目)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Git的设置文件为.gitconfig，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。</span></span>
<span class="line"><span style="color:#676E95;"># 显示当前的Git配置</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git config --list</span></span>
<span class="line"><span style="color:#676E95;"># 编辑Git配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git config -e </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">--global</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 设置提交代码时的用户信息</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git config </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">--global</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> user.name </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[name]</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git config </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">--global</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> user.email </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[email address]</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## 增加删除文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 添加指定文件到暂存区</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git add </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file1</span><span style="color:#89DDFF;">][</span><span style="color:#A6ACCD;">file2</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> ...</span></span>
<span class="line"><span style="color:#676E95;"># 添加指定目录到暂存区，包括子目录</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git add </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">dir</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 添加当前目录的所有文件到暂存区</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git add </span><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#676E95;"># 添加每个变化前，都会要求确认</span></span>
<span class="line"><span style="color:#676E95;"># 对于同一个文件的多处变化，可以实现分次提交</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git add -p</span></span>
<span class="line"><span style="color:#676E95;"># 删除工作区文件，并且将这次删除放入暂存区</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git rm </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file1</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file2</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> ...</span></span>
<span class="line"><span style="color:#676E95;"># 停止追踪指定文件，但该文件会保留在工作区</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git rm --cached </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 改名文件，并且将这个改名放入暂存区</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git mv </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file-original</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file-renamed</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## 代码提交</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 提交暂存区到仓库区</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git commit -m </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">message</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 提交暂存区的指定文件到仓库区</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git commit </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file1</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file2</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> ... -m </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">message</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 提交工作区自上次commit之后的变化，直接到仓库区</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git commit -a</span></span>
<span class="line"><span style="color:#676E95;"># 提交时显示所有diff信息</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git commit -v</span></span>
<span class="line"><span style="color:#676E95;"># 使用一次新的commit，替代上一次提交</span></span>
<span class="line"><span style="color:#676E95;"># 如果代码没有任何新变化，则用来改写上一次commit的提交信息</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git commit --amend -m </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">message</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 重做上一次commit，并包括指定文件的新变化</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git commit --amend </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file1</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file2</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> ...</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## 分支</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 列出所有本地分支</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git branch</span></span>
<span class="line"><span style="color:#676E95;"># 列出所有远程分支</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git branch -r</span></span>
<span class="line"><span style="color:#676E95;"># 列出所有本地分支和远程分支</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git branch -a</span></span>
<span class="line"><span style="color:#676E95;"># 新建一个分支，但依然停留在当前分支</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git branch </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">branch-name</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 新建一个分支，并切换到该分支</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git checkout -b </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">branch</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 新建一个分支，指向指定commit</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git branch </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">branch</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">commit</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 新建一个分支，与指定的远程分支建立追踪关系</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git branch --track </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">branch</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote-branch</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 切换到指定分支，并更新工作区</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git checkout </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">branch-name</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 切换到上一个分支</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git checkout -</span></span>
<span class="line"><span style="color:#676E95;"># 建立追踪关系，在现有分支与指定的远程分支之间</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git branch --set-upstream </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">branch</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote-branch</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 合并指定分支到当前分支</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git merge </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">branch</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 选择一个commit，合并进当前分支</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git cherry-pick </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">commit</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 删除分支</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git branch -d </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">branch-name</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 删除远程分支</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git push origin --delete </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">branch-name</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git branch -dr </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote/branch</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## 标签</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 列出所有tag</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git tag</span></span>
<span class="line"><span style="color:#676E95;"># 新建一个tag在当前commit</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git tag </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">tag</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 新建一个tag在指定commit</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git tag </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">tag</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">commit</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 删除本地tag</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git tag -d </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">tag</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 删除远程tag</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git push origin :refs/tags/</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">tagName</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 查看tag信息</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git show </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">tag</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 提交指定tag</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git push </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">tag</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 提交所有tag</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git push </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> --tags</span></span>
<span class="line"><span style="color:#676E95;"># 新建一个分支，指向某个tag</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git checkout -b </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">branch</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">tag</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## 查看信息</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 查看目录</span></span>
<span class="line"><span style="color:#A6ACCD;">$ ls -al	或者$ ll</span></span>
<span class="line"><span style="color:#676E95;"># 查看仓库状态，显示有变更的文件</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git status</span></span>
<span class="line"><span style="color:#676E95;"># 显示当前分支的版本历史</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git log</span></span>
<span class="line"><span style="color:#676E95;"># 显示commit历史，以及每次commit发生变更的文件</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git log --stat</span></span>
<span class="line"><span style="color:#676E95;"># 搜索提交历史，根据关键词</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git log -S </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">keyword</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 显示某个commit之后的所有变动，每个commit占据一行</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git log </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">tag</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> HEAD --pretty=format:%s</span></span>
<span class="line"><span style="color:#676E95;"># 显示某个commit之后的所有变动，其&quot;提交说明&quot;必须符合搜索条件</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git log </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">tag</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> HEAD --grep feature</span></span>
<span class="line"><span style="color:#676E95;"># 显示某个文件的版本历史，包括文件改名</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git log --follow </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git whatchanged </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 显示指定文件相关的每一次diff</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git log -p </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 显示过去5次提交</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git log -5 --pretty --oneline</span></span>
<span class="line"><span style="color:#676E95;"># 显示所有提交过的用户，按提交次数排序</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git shortlog -sn</span></span>
<span class="line"><span style="color:#676E95;"># 显示指定文件是什么人在什么时间修改过</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git blame </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 显示暂存区和工作区的差异</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git diff</span></span>
<span class="line"><span style="color:#676E95;"># 显示暂存区和上一个commit的差异</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git diff --cached </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 显示工作区与当前分支最新commit之间的差异</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git diff HEAD</span></span>
<span class="line"><span style="color:#676E95;"># 显示两次提交之间的差异</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git diff </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">first-branch</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">second-branch</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 显示今天你写了多少行代码</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git diff --shortstat </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@{0 day ago}</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#676E95;"># 显示某次提交的元数据和内容变化</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git show </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">commit</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 显示某次提交发生变化的文件</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git show --name-only </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">commit</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 显示某次提交时，某个文件的内容</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git show </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">commit</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">:</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">filename</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 显示当前分支的最近几次提交</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git reflog</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## 远程同步</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 下载远程仓库的所有变动</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git fetch </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 显示所有远程仓库</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git remote -v</span></span>
<span class="line"><span style="color:#676E95;"># 显示某个远程仓库的信息</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git remote show </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 增加一个新的远程仓库，并命名</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git remote add </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">shortname</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">url</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 取回远程仓库的变化，并与本地分支合并</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git pull </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">branch</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 上传本地指定分支到远程仓库</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git push </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">branch</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 强行推送当前分支到远程仓库，即使有冲突</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git push </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> --force</span></span>
<span class="line"><span style="color:#676E95;"># 推送所有分支到远程仓库</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git push </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">remote</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> --all</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## 撤销</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 恢复暂存区的指定文件到工作区</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git checkout </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 恢复某个commit的指定文件到暂存区和工作区</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git checkout </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">commit</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 恢复暂存区的所有文件到工作区</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git checkout </span><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#676E95;"># 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git reset </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">file</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 重置暂存区与工作区，与上一次commit保持一致</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git reset --hard</span></span>
<span class="line"><span style="color:#676E95;"># 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git reset </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">commit</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git reset --hard </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">commit</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 重置当前HEAD为指定commit，但保持暂存区和工作区不变</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git reset --keep </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">commit</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 新建一个commit，用来撤销指定commit</span></span>
<span class="line"><span style="color:#676E95;"># 后者的所有变化都将被前者抵消，并且应用到当前分支</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git revert </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">commit</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;"># 暂时将未提交的变化移除，稍后再移入</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git stash</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git stash pop</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 从当前目录的所有文件中查找文本内容：</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git grep </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#676E95;"># 在某一版本中搜索文本：</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git grep </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> v2.5</span></span>
<span class="line"><span style="color:#676E95;"># 生成一个可供发布的压缩包</span></span>
<span class="line"><span style="color:#A6ACCD;">$ git archive</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">## on my zsh 简化git命令</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">g - git</span></span>
<span class="line"><span style="color:#A6ACCD;">gst - git status</span></span>
<span class="line"><span style="color:#A6ACCD;">gl - git pull</span></span>
<span class="line"><span style="color:#A6ACCD;">gup - git pull --rebase</span></span>
<span class="line"><span style="color:#A6ACCD;">gp - git push</span></span>
<span class="line"><span style="color:#A6ACCD;">gd - git diff</span></span>
<span class="line"><span style="color:#A6ACCD;">gdc - git diff --cached</span></span>
<span class="line"><span style="color:#A6ACCD;">gdv - git diff -w </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">@</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> view</span></span>
<span class="line"><span style="color:#A6ACCD;">gc - git commit -v</span></span>
<span class="line"><span style="color:#A6ACCD;">gc</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;"> - git commit -v --amend</span></span>
<span class="line"><span style="color:#A6ACCD;">gca - git commit -v -a</span></span>
<span class="line"><span style="color:#A6ACCD;">gca</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;"> - git commit -v -a --amend</span></span>
<span class="line"><span style="color:#A6ACCD;">gcmsg - git commit -m</span></span>
<span class="line"><span style="color:#A6ACCD;">gco - git checkout</span></span>
<span class="line"><span style="color:#A6ACCD;">gcm - git checkout master</span></span>
<span class="line"><span style="color:#A6ACCD;">gr - git remote</span></span>
<span class="line"><span style="color:#A6ACCD;">grv - git remote -v</span></span>
<span class="line"><span style="color:#A6ACCD;">grmv - git remote rename</span></span>
<span class="line"><span style="color:#A6ACCD;">grrm - git remote remove</span></span>
<span class="line"><span style="color:#A6ACCD;">gsetr - git remote set-url</span></span>
<span class="line"><span style="color:#A6ACCD;">grup - git remote update</span></span>
<span class="line"><span style="color:#A6ACCD;">grbi - git rebase -i</span></span>
<span class="line"><span style="color:#A6ACCD;">grbc - git rebase --continue</span></span>
<span class="line"><span style="color:#A6ACCD;">grba - git rebase --abort</span></span>
<span class="line"><span style="color:#A6ACCD;">gb - git branch</span></span>
<span class="line"><span style="color:#A6ACCD;">gba - git branch -a</span></span>
<span class="line"><span style="color:#A6ACCD;">gcount - git shortlog -sn</span></span>
<span class="line"><span style="color:#A6ACCD;">gcl - git config --list</span></span>
<span class="line"><span style="color:#A6ACCD;">gcp - git cherry-pick</span></span>
<span class="line"><span style="color:#A6ACCD;">glg - git log --stat --max-count=10</span></span>
<span class="line"><span style="color:#A6ACCD;">glgg - git log --graph --max-count=10</span></span>
<span class="line"><span style="color:#A6ACCD;">glgga - git log --graph --decorate --all</span></span>
<span class="line"><span style="color:#A6ACCD;">glo - git log --oneline --decorate --color</span></span>
<span class="line"><span style="color:#A6ACCD;">glog - git log --oneline --decorate --color --graph</span></span>
<span class="line"><span style="color:#A6ACCD;">gss - git status -s</span></span>
<span class="line"><span style="color:#A6ACCD;">ga - git add</span></span>
<span class="line"><span style="color:#A6ACCD;">gm - git merge</span></span>
<span class="line"><span style="color:#A6ACCD;">grh - git reset HEAD</span></span>
<span class="line"><span style="color:#A6ACCD;">grhh - git reset HEAD --hard</span></span>
<span class="line"><span style="color:#A6ACCD;">gclean - git reset --hard </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> git clean -dfx</span></span>
<span class="line"><span style="color:#A6ACCD;">gwc - git whatchanged -p --abbrev-commit --pretty=medium</span></span>
<span class="line"><span style="color:#A6ACCD;">gsts - git stash show --text</span></span>
<span class="line"><span style="color:#A6ACCD;">gsta - git stash</span></span>
<span class="line"><span style="color:#A6ACCD;">gstp - git stash pop</span></span>
<span class="line"><span style="color:#A6ACCD;">gstd - git stash drop</span></span>
<span class="line"><span style="color:#A6ACCD;">ggpull - git pull origin </span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">current_branch</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">ggpur - git pull --rebase origin </span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">current_branch</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">ggpush - git push origin </span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">current_branch</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">ggpnp - git pull origin </span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">current_branch</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> git push origin </span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">current_branch</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">glp - _git_log_prettily</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,109),o=[e];function c(t,r,i,D,y,C){return a(),n("div",null,o)}const d=s(p,[["render",c]]);export{g as __pageData,d as default};
