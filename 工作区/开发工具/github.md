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
