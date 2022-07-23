---
title: npm发布
date: 2022-07-22 17:26:14
tags: ["npm发布"]
---
#npm

# npm发布的笔记

## 常规发布

### 初始化项目
```shell
npm init
```

填写对应信息后，目录下生成`package.json`
```json
{

  "main": "index.js"
}
```

这个main的指向很重要。

### 登录

在控制台执行 npm login，username 使用刚刚创建的账号码，email 使用注册使用的 email。 OTP 验证码会通过该邮箱发送，最后填写验证码即完成 npm 登陆。
```shell
npm login
Username: xxxx
Password: xxxx
Email: (this IS public) 
npm notice Please check your email for a one-time password (OTP)
Enter one-time password from your authenticator app: 
```
### 用户信息

```shell
npm profile get
```

### 发布
```shell
npm publish
```

## 创建域隔离包（scope package）

> @xxx/xxx，型如 @babel/preset-env

这样的包类似于用命名空间区分同名类，在 npm 中称为 scope。这样的包可以帮助我们创建一个语义化的报名但不用担心因为重名无法发布。

npm官网登录账号后，账号头像点击，选择`add organization`添加组织

### 初始化项目

大部分操作和上面一样，只是初始化时加入参数`--scope=@xxxxxx`

```shell
npm init --scope=@hbisedm
```

创建的`package.json`

```json
{ 
	"name": "@hbisedm/utils"
 }
```

前面多了个刚才指定的组织名

### 发布

与常规发布不同，这里我们发布需要注意，由于我们使用的是免费的组织管理，所以只能发公共包。即我们运行 npm publish 时要加上 --access public（scoped package 默认为私有发布）。 否则会提示付费。

```shell
npm publish --access public
```

## 搭建npm服务

实际开发中，我们需要一些内部共享的 npm 包，所以在企业内部搭建一个私有 npm 源也很重要。

1.  npm 支持安装 git 仓库，可以直接使用私有 git 仓库支持 npm 包.如

```shell
npm install git+<https://xxx.xx/mypkg.git>
```

2.  使用 jfrog artifactory 作为 npm registry
3.  verdaccio （**开源的轻量的私有的npm proxy registry**）、
4.  cnpm + cnpmjs.org (**基于 KOA 的私有 npm 源方案**)

  

参考
[npm发布博客](https://juejin.cn/post/7062968467351142413 ) 






