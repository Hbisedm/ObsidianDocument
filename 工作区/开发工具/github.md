## 创建github项目和关联本地
本地文件夹下运行`git init`初始化git一些信息
- `git add .`
- `git commit -m "init"`
- `git remote add origin git@github.com:xxxx/XXXXXX.git` 关联远程，这时候需要在github创建一样名字的仓库
- `git push -u origin main` 现在github默认是main分支

## PR(pull request)
[参考链接](https://www.zhihu.com/question/21682976)

我尝试用类比的方法来解释一下 pull reqeust。想想我们中学考试，老师改卷的场景吧。你做的试卷就像仓库，你的试卷肯定会有很多错误，就相当于程序里的 bug。老师把你的试卷拿过来，相当于先 fork。在你的卷子上做一些修改批注，相当于 git commit。最后把改好的试卷给你，相当于发 pull request，你拿到试卷重新改正错误，相当于 merge。

当你想更正别人仓库里的错误时，要走一个流程：

1.  先 fork 别人的仓库，相当于拷贝一份，相信我，不会有人直接让你改修原仓库的
2.  clone 到本地分支，做一些 bug fix
3.  发起 pull request 给原仓库，让他看到你修改的 bug
4.  原仓库 review 这个 bug，如果是正确的话，就会 merge 到他自己的项目中

至此，整个 pull request 的过程就结束了。

理解了 pull request 的含义和流程，具体操作也就简单了。

## 统计功能

[一个访客统计的徽章（ badge ）服务](https://visitor-badge.glitch.me/)

原理很简单，徽章是一个 svg，你只需要在你的 issues 或者 readme 中添加一个 markdown 的图片：

```markdown
![]( https://visitor-badge.glitch.me/badge?page_id=<your_page_id>)
```

当有人打开你的 issue 或者 github 仓库时，浏览器会加载这个图片，服务器就会发出一个请求。

之后根据请求里的 page_id 来计数，并将最新的数量生成到一个 svg 图片中，将这个 svg 返回，浏览器就可以显示出来了。

注意这里的参数：page_id, 需要自己手动给一个唯一的字符串，没有特定规则，只要能唯一标识当前页面即可。