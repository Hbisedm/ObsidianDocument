---
title: NPM与PNPM的笔记
tags: ["NPM与PNPM"]
创建时间: 星期六, 八月 13日 2022, 9:18:29 晚上
修改时间: 星期六, 八月 13日 2022, 11:45:38 晚上
---
#pnpm #npm #工程化

# NPM与PNPM的笔记



## package.json

```json

{
  "private": true,// 是否私有
  "name": "my_package",// 包名/项目名
  "bin": {
    "react-cli": "./bin/index.js"
  },
  "description": "this is test project",// 描述
  "version": "1.0.0",// 版本
  "scripts": {// 脚本
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {// 仓库地址
    "type": "git",
    "url": "https://github.com/monatheoctocat/my_package.git"
  },
  "keywords": ["test", "project", "didi"],// 搜索关键字
  "author": "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)",// 作者npm用户
  "license": "ISC",// 开源协议
  "bugs": {// 项目问题跟踪器的 url 和/或应报告问题的电子邮件地址
    "url": "https://github.com/owner/project/issues" ,  
    "email":"project@hostname.com"
  },
  "homepage": "https://github.com/monatheoctocat/my_package",// 主页
  "dependencies": {// 生产依赖
    "my_dep": "^1.0.0",
    "another_dep": "~2.2.0"
  },
  "devDependencies": {// 开发依赖
    "my_test_framework": "^3.1.0",
    "another_dev_dep": "1.0.0 - 1.2.0"
  }
}

```


上面的这些内容只是 package.json 的凤毛麟角，例如还有还有 engines(该package运行对node\npm的版本要求)、os（该package运行对操作系统的要求）、cpu（处理器要求）...

详见：[docs.npmjs.com/](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.npmjs.com%2Fcli%2Fv8%2Fconfiguring-npm%2Fpackage-json "https://docs.npmjs.com/cli/v8/configuring-npm/package-json")


### 语义化版本

说到 package.json 就不得不说到他的 语义化版本 管理。npm 对版本的描述可以是一个指定的版本（例如1.1.0），也可以是一个范围（例如>1.1.0）。


| **语义化版本表示方式** | **语义** |
| --- | --- |
| ^1.2.3 | 1.x.x(第一位非0数字后取最新子版本) |
| ~1.2.3 | 1.2.x |
| 1.2.3 | 1.2.3 |
| 1.x.x | 1.x.x |
| \>1.0.0，>=1.0.0，<2.0.0，<=2.0.0,>= 3.0.0 | <2.0.0 |  |
| \* | x.x.x |
| … |  |

> 值得一提的是，^a.b.c 并不是指大版本 a 固定，其他子版本取最新的意思，而是指第一位非0数字右边的版本取最新的意思，也就是说，^0.1.1 其实是指 0.1.x（>= 0.1.1 && < 0.1.2） 而不是 0.x.x。


## 开发到发布

[[npm发布]]

1. 首先需要到 [npm 官网](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fsignup "https://www.npmjs.com/signup") 注册一个 npm 账号
2. 在本地通过运行 `npm login` 登陆你的 npm 账号
3. 初始化你的项目
- `npm init -y` 可以在当前目录下快速初始化一个 package.json 文件
- 初始化一个 README.md 文件
4. 编写代码/修改代码
5. 使用 `npm publish` 发布当前包到 npm 仓库

**发布属于某个scope或者组织下的包需要满足的条件：**
1. 需要 name 用 **@组织名** 开头，例如 @vue/cli
2. 你的 npm 账户需要属于这个组织或者命名空间
3. 如果发布的包属于某一个 scope 或者组织，如果是非 npm 官方镜像（一般就是指私有 npm 仓库），那么你还需要配置 `publishConfig.registry` 来指定镜像地址。
```json
   // package.json
 {
   // ...
   "publishConfig": {
     "registry": "私有镜像地址"
   }
   // ...
 }

```
4. 运行 `npm publish --access public` 发布 npm 包


### 调试/修改包

A 为提供包的项目， B为引用包的项目
1. A中 `npm link`
2. B 中 `npm link 包名`
这样A中项目修改会实时给到B

### 安装本地的包

上面说到 npm link 可以创建链接直接链接到本地对应包的代码目录，但是当我们运行 npm i 或者 node_modules 丢失之类的情况时，再次安装就会出现去 npm 官网下载包代码而不是创建链接，原因是 npm link 并不会在 package.json 存在记录。但是有的时候我们想开发一个私有包，不想发布到 npm 上，又要运行 npm install 能正常安装这个包，那么我们可以用下面这种方式

 ` npm install 待安装包的相对路径`

A的`package.json`
```json
{
  "name": "demo-a",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "hello": "index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
`index.js`
```js
#!/usr/bin/env node
console.log('Hello NPM from demo-a')
```

B的`package.json`
```json

{
  "name": "demo-b",
  "version": "1.0.0",
  "description": "> 引用包",
  "main": "index.js",
  "scripts": {
    "hello": "hello"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "demo-a": "file:../demo-a"
  }
}


```

## npm常用的命令如何工作的


### Npm Run

当我们运行 `npm run hello` 会查找 package.json 中 scripts 中 key 为 serve 对应的值来当作命令执行，也就是相当于执行了 `hello`

当运行 `npm run hello` 时其实就相当于运行了 `hello`

那为什么我们要执行 `npm run hello` 而不直接执行 `hello` 呢？

> hello
>
> zsh: command not found: hello

为什么我们直接执行 `hello` 找不到命令，使用 npm run 来执行却可以？原因是 npm run 执行脚本时会先去 `node_modules/.bin` 中查找是否存在要运行的命令，**如果不存在则查找 `../node_modules/.bin`，如果全都找不到才会去按系统的环境变量查找。**

好在现在 node 给我们提供了 npx 命令来解决这个问题。运行 `npx hello` 即可运行 hello 命令。当然你也可以直接运行 `node_modules/.bin/hello`

> npx 可以让命令的查找路径与 npm run 一致

那么 node_modules/.bin 中的文件从哪来的呢？

`npm i ` 时会将 `demo-a` 中的 package.json 中的 bin 指定的命令和文件链接到 `node_modules/.bin`，也就是说 `node_modules/.bin/hello` 其实是 `node_modules/demo-a/bin/index.js` 的快捷方式

  当运行 `npx hello` 时自然就相当于运行了 `demo-a/bin/index.js`

#### 小结
- 当我们使用 npm install 安装包时，会将这个包中 package.json 中 bin 中指定的脚本软链接到项目的 node_modules/.bin 下，key 作为链接名字（也就是命令），value 作为命令运行时执行的文件
- 当我们通过npm run xxx 运行某个脚本时，会执行 package.json 中 scripts 中指定的脚步后的命令，会先去 node_modules/.bin 中查找这些命令，然后去 ../node_modules/.bin,...全都找不到才会去环境变量中查找。


### Npm Install

#### **执行工程自身 Preinstall 钩子**

npm 跟 git 一样都有完善的钩子机制散布在 npm 运行的各个阶段，当前 npm 工程如果定义了 preinstall 钩子此时会在执行 npm install 命令之前被执行

```json

"scripts": {
    "preinstall": "echo \"preinstall....\"",
    "postinstall": "echo \"postinstall ..\"",
    "hello": "hello"
  }
```

#### **获取 package.json 中依赖数据构建依赖树**

首先需要做的是确定工程中的首层依赖，也就是 dependencies 和 devDependencies 属性中直接指定的模块（假设此时没有添加 npm install的其他参数）。

> 工程本身是整棵依赖树的根节点，每个首层依赖模块都是根节点下面的一棵子树，npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。

确定完首层依赖后，就开始获取各个依赖的模块信息，获取模块信息是一个递归的过程，分为以下几步：
1. 获取**模块信息**。在下载一个模块之前，首先要确定其版本，这是因为 package.json 中往往是 semantic version（semver，语义化版本）。此时如果版本描述文件（npm-shrinkwrap.json 或 package-lock.json）中有该模块信息直接拿即可，如果没有则从仓库获取。如 packaeg.json 中某个包的版本是 ^1.1.0，npm 就会去仓库中获取符合 1.x.x 形式的最新版本。
2. 获取**模块实体**。上一步会获取到模块的压缩包地址（resolved 字段），npm 会用此地址检查本地缓存，缓存中有就直接拿，如果没有则从仓库下载。
3. 查找该模块依赖，如果有依赖则回到第1步，如果没有则停止。

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202208132321363.png)


> 如果项目中存在 npm 的 lock 文件（例如package-lock.json），则不会从头开始构建依赖树，而是对 lock 中依赖树中存储冲突的依赖进行调整即可


#### **依赖树扁平化（dedupe）**

上一步获取到的是一棵完整的依赖树，其中可能包含大量重复模块。比如 foo 模块依赖于 loadsh，bar 模块同样依赖于 lodash。在 npm3 以前会严格按照依赖树的结构进行安装，也就是方便在 foo 和 bar 的 node_modules 中各安装一份，因此会造成模块冗余。

从 npm3 开始默认加入了一个 dedupe 的过程。它会遍历所有节点，逐个将模块放在根节点下面，也就是 node_modules 的第一层。当发现有**重复模块**时，则将其丢弃。

经过优化后的依赖树就是变成了下面这样

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202208132325238.png)

> 而 lock 文件中存储的正是这颗被优化后的依赖树。

这里需要对**重复模块**进行一个定义，它指的是**模块名相同**且 **semver(语义化版本) 兼容。每个 semver 都对应一段版本允许范围，如果两个模块的版本允许范围存在交集，那么就可以得到一个**兼容版本，而不必版本号完全一致，这可以使更多冗余模块在 dedupe 过程中被去掉。

比如 node_modules 下 foo 模块依赖 lodash@^1.0.0，bar 模块依赖 lodash@^1.1.0，则 **>=1.1.0** 的版本都为兼容版本。

而当 foo 依赖 lodash@^2.0.0，bar 依赖 lodash@^1.1.0，则依据 semver 的规则，二者不存在兼容版本。会将一个版本放在首层依赖中，另一个仍保留在其父项（foo或者bar）的依赖树里。

举个栗子🌰，假设一个依赖树原本是这样：

```lua
node_modules
|--foo
   |-- lodash@version1
|--bar
   |-- lodash@version2
```

假设 version1 和 version2 是兼容版本，则经过 dedupe 会成为下面的形式：

```css
node_modules
|--foo
|--bar
|--lodash（保留的版本为兼容版本）
```

假设 version1 和 version2 为非兼容版本，则后面的版本保留在依赖树中：

```lua
node_modules
|--foo
|--lodash@version1
|--bar
   |-- lodash@version2
```


#### 安装模块

这一步将会按照依赖树下载/解压包，并更新工程中的 node_modules

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202208132327917.png)

### **npm ci**

npm ci 命令可以完全安装 lock 文件描述的依赖树来安装依赖，可以用它来避免扁平化造成的 node_modules 结构不确定的问题。

`npm ci` 和 `npm i` 不仅仅是是否使用 package-lock.json 的区别，`npm ci` 会删除 node_modules 中所有的内容并且毫无二心的按照package-lock.json 的结构来安装和保存包，他的目的是为了保证任何情况下产生的node_modules结构都一致的。而 `npm i` 不会删除 node_modules（如果node_modules已经存在某个包就不会重新下载了）、并且安装过程中可能还会调整并修改 package-lock.json 的内容

> 实际项目中建议将 lock 也添加到 git 中，尽量使用 `npm ci` 来安装依赖，如果有依赖需要修改的，可以通过 `npm install xxx@xxx` 来安装指定依赖的指定版本，这样只会调整 lock 文件中指定依赖的依赖树，不会修改其他依赖的依赖树。

## npm有哪些问题


### 依赖结构不确定

假如项目依赖两个包 foo 和 bar，这两个包的依赖又是这样的:

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202208132330522.png)
运行`npm install`是这样

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202208132331223.png)
还是这样呢
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202208132331889.png)

答案是: 都有可能。取决于 foo 和 bar 在 `package.json`中的位置，如果 foo 声明在前面，那么就是前面的结构，否则是后面的结构。

这就是为什么会产生依赖结构的`不确定`问题，也是 `lock 文件`诞生的原因之一，无论是`package-lock.json`(npm 5.x 才出现)还是`yarn.lock`，都是为了保证 install 之后都产生确定的 `node_modules` 结构。

####
扁平化导致可以非法访问没有声明过依赖的包（幽灵依赖）

“幽灵依赖” 指的是项目代码中使用了一些没有被定义在其 **package.json** 文件中的包。

参考下面的例子

```json

// package.json
{
  "name": "demo4",
  "main": "index.js",
  "dependencies": {
    "minimatch": "^3.0.4"
  },
  "devDependencies": {
    "rimraf": "^2.6.2"
  }
}

```

代码中

```js

// index.js
var minimatch = require("minimatch")
var expand = require("brace-expansion");  // ???
var glob = require("glob")  // ???

// （更多使用那些库的代码)
```

稍等一下下… 有两个库根本没有被作为依赖定义在 package.json 文件中。那这到底是怎么跑起来的呢？

原来 brace-expansion 是 minimatch 的依赖，而 glob 是 rimraf 的依赖。在安装的时候，NPM 会打平他们的文件夹到 node_modules 。NodeJS 的 `require()` 函数能够在依赖目录找到它们，因为 `require()` 在查找文件夹时 根本不会受 package.json 文件 影响。

这是很不安全的，当未来 minimatch 中不再依赖 brace-expansion 时将会导致项目报错，因为那时整个项目可能没有如何包依赖了 brace-expansion，也就不会在顶层依赖树中有 brace-expansion，所以项目一定会因为找不到 brace-expansion 这个包而报错。


#### 分析依赖树

npm 在分析依赖树的时候会先并行发出项目顶级的依赖解析请求，当某一个请求回来时，在去请求起所有的子依赖，直到不存在依赖为止，**由于每一个树都需要根节点的依赖解析请求后才能开始解析其子树**，如果依赖树深度比较深就会导致等待时间过长

递归的分析依赖树需要非常大量的http请求，这也会导致依赖树构建时间过长

- 这里推荐一个分析依赖树的工具 **npm-remote-ls**

- 可视化依赖关系：[npm.anvaka.com/](https://npm.anvaka.com/) 下图是 webpack 的依赖树分析结果


![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202208132345823.png)


##### 大量文件下载/解压

因为 npm 下载的内容是一个个压缩包，解压后文件数量多，需要大量的IO操作（创建文件夹、创建文件、写入文件...），这也是导致 npm 慢的主要原因


##### 依然可能存在大量重复包

扁平化只能会在首次遇到一个包时才会将其提升到顶部，如果项目中有A、B、C三个包分别依赖了[D@1.0.0](https://link.juejin.cn?target=mailto%3AD%401.0.0 "mailto:D@1.0.0")、[D@2.0.0](https://link.juejin.cn?target=mailto%3AD%402.0.0 "mailto:D@2.0.0")、[D@2.0.0](https://link.juejin.cn?target=mailto%3AD%402.0.0 "mailto:D@2.0.0")，那么可能会产生[D@1.0.0](https://link.juejin.cn?target=mailto%3AD%401.0.0 "mailto:D@1.0.0")被提升，[D@2.0.0](https://link.juejin.cn?target=mailto%3AD%402.0.0 "mailto:D@2.0.0")出现在B、C的node_modelus的情况。




## Pnpm



pnpm 的作者`Zoltan Kochan`发现 npm/yarn 并没有打算去解决上述的这些问题，于是另起炉灶，写了全新的包管理器，开创了一套新的依赖管理机制，现在就让我们去一探究竟。

以安装 `express` 为例，我们新建一个目录，执行:

```shell
pnpm init -y
```

然后执行:

```shell
pnpm install express
```

  看看node_modules
```ini
.pnpm
express
.modules.yaml
```

我们直接就看到了`express`，但值得注意的是，这里仅仅只是一个`软链接`，里面并没有 node_modules 目录，如果是真正的文件位置，那么根据 node 的包加载机制，它是找不到依赖的。那么它真正的位置在哪呢？


继续在 .pnpm 当中寻找:

```sql
▾ node_modules
  ▾ .pnpm
    ▸ accepts@1.3.8
    ▸ array-flatten@1.1.1
    ...
    ▾ express@4.17.1
      ▾ node_modules
        ▸ accepts
        ▸ array-flatten
        ▸ body-parser
        ▸ content-disposition
        ...
        ▸ etag
        ▾ express
          ▸ lib
            History.md
            index.js
            LICENSE
            package.json
            Readme.md
```

.pnpm/express@4.17.1/node_modules/express

随便打开一个别的包:

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202208132341770.png)


也都是一样的规律，都是`<package-name>@version/node_modules/<package-name>`这种目录结构。并且 express 的依赖都在`.pnpm/express@4.17.1/node_modules`下面，这些依赖也全都是**软链接**。

将 `包本身` 和 `依赖` 放在同一个`node_module`下面，与原生 Node 完全兼容，又能将 package 与相关的依赖很好地组织到一起，设计十分精妙。

再看看`.pnpm`，`.pnpm`目录下虽然呈现的是扁平的目录结构，但仔细想想，顺着`软链接`慢慢展开，其实就是嵌套的结构！


![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202208132342952.png)


现在我们回过头来看，根目录下的 node_modules 下面不再是眼花缭乱的依赖，而是跟 package.json 声明的依赖基本保持一致。即使 pnpm 内部会有一些包会设置依赖提升，会被提升到根目录 node_modules 当中，但整体上，根目录的`node_modules`比以前还是清晰和规范了许多。

pnpm 使用类似 maven 一样将所有的包都存放在一个 .pnpm 缓存目录中，然后在 node_modules 中创建一个软链接链接到缓存目录中对应的包上，解决了重复依赖的问题。而 .pnpm 中的文件又是通过硬链接来链接到一个全局的包存放地址中，也就是说同一个包的某个版本在你的电脑上只会出现一份代码，无论你有多少个项目使用了多少次这个包。因为每一个项目中的 .pnpm 中都只是通过一个硬链接指向同一份代码。

### 如何做到项目隔离？

因为 .pnpm 中都是通过硬链接来链接到同一份源码文件，当我们在某个项目中修改了这个包的文件时，所有项目中这个包都会被修改，这导致无法做到修改的项目隔离。

好在我们有 webstorm ，webstorm 以及对此作了优化，当你在修改其 node_modules 中的内容时，不会直接修改到这个硬链接到目标文件，而是将目标文件 copy 一份到当前项目下，然后对其进行修改，这样就不会影响到其他项目。

很遗憾 vscode 目前好像没有这功能。

 pnpm 跟 webstorm 跟配哟～


## 参考链接

[npm与pnpm](https://juejin.cn/post/7100640780301107231)
[pnpm解决了什么](https://juejin.cn/post/7036319707590295565)