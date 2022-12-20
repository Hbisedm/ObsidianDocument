---
title: 项目搭建
tags: ["项目搭建"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 七月 28日 2022, 1:38:48 下午
---
#Vue #项目搭建

# 项目搭建

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206251022208.png)

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206251028560.png)


## 代码规范
### 1. 集成editorconfig配置
> 配置IDE的工具
```
# http://editorconfig.org
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为utf-8
indent_style = space # 缩进风格(tab | space)
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的人一空白字符
insert_final_newline = true #始终在文件末尾插入一个新行

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

VScode中需要安装插件 **EditorConfig for VS Code**，WebStorm不需要。

### 2. prettier配置
> 代码格式化工具
1. 安装prettier
```bash
npm install prettier -D
```
2. 配置.prettierrc文件
- useTabs: 使用tab缩进还是空格缩进，选择false；
- tabWidth:tab是空格的情况下，是几个空格，选择2个；
- printWidth:当行字符的长度，推荐80，也有人喜欢100或者120；
- singleQuote:使用单引号还是双引号，选择true，使用单引号；
- trailingComma:在多行输入的尾逗号是否添加，设置为 none
- semi:语句末尾是否要加分号，默认值true，选择false表示不加；

```
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

3. 配置.prettierignore忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

4. VScode插件

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206251352093.png)

5. package.json编写script

```

  "scripts": {
   	"prettier": "prettier --write ."
   }
```

### 3. Eslint
> 代码规范工具
1. 当与prettier发生冲突时，安装2个开发依赖
```bash
npm install eslint-plugin-prettier eslint-config-prettier -D
```
2. 修改.eslintrc.js
```js
 extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended' //加入这个规范，会覆盖上面的
  ],
```
3. 重启vscode

### 4. Husky
> git钩子拦截工具

虽然我们已经要求项目使用eslint，但是不能保证组员提交代码之前都将eslint中的问题解决掉了：
- 也就是我们希望保证代码仓库中的代码都是符合eslint规范的
- 那么我们需要在组员执行 git commit 命令的时候对其进行校验，如果不符合eslint规范，那么自动通过规范进行修复；
- husky是一个git hook工具，可以帮助我们触发git提交的各个阶段：pre-commit、commit-msg、 pre-push

这里我们可以使用自动配置命令：
```shell
npx husky-init && npm install
```
这里帮助我们完成三件事
1. 安装husky的相关依赖
2. 在项目根目录下创建.husky文件夹
3. 在package.json添加一个脚本
4. 修改pre-commit脚本
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206251437802.png)
5. 测试有错误规范代码的提交，
运行`git commit -m 'xxx'`时候发现自动运行了`vue-cli-service lint`，而`vue-cli-service lint`里面有`--fix`参数，自动帮我们做了修正。
所以提交后的代码，会符合我们eslint的规范。

#### 提交信息的规范-commitizen
- Commitizen是一个帮助我们编写规范 commit message 的工具
1. 安装commitizen
```shell
npm install commitizen -D
```
2. 安装cz-conventional-changelog， 并初始化cz-conventional-changelog
```shell
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```
这个命令回帮助我们安装cz-conventional-changelog
并且在package.json中进行配置
⚠️upload failed, check dev console

这个时候我们提交代码需要npx cz
- 第一步是选择type，本次更新的类型
| Type     | 作用                                          |
| -------- | --------------------------------------------- |
| feat     | 新增特性                                      |
| fix      | 修复Bug                                       |
| docs     | 修改文档                                      |
| style    | 代码格式修改                                  |
| refactor | 代码重构                                      |
| perf     | 改善性能                                      |
| test     | 测试                                          |
| build    | 变更项目                                      |
| ci       | 更高持续集成软件的配置和package中的scrpit命令 |
| chore    | 变更构建流程或辅助工具（比如更改测试环境）    |
| revert   | 代码回退                                      |

- 第二步 选择本次修改的范围（作用域）
- 第三步 精短的描述
- 第四步 长描述
- 第五步 是否是一次大更新
- 第六步 是否有影响或者开启了一个issue

#### 提交信息的验证-commitlint
如果我们按照cz来规范了提交风格，但是依然有同事通过 git commit 按照不规范的格式提交应该怎么办呢？
- 我们可以通过commitlint来限制提交；
1. 安装@commitlint/config-conventional和@commitlint/cli
```shell
npm i @commitlint/config-conventional @commitlint/cli -D
```
2. 在**根目录**创建commit.config.js文件，配置commitlint
```JS
module.exports = {
	extends:['@commitlint/config-conventional']
}
```
3. 使用husky生成commit-msg文件，验证提交信息：
```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```
##### 测试
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206251553993.png)



最后我们可以在package.json中添加个新脚本，每次提交代码就可以使用`npm run commit`
```json
"script": {
	"commit": "cz"
}
```