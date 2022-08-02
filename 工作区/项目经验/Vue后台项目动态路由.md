---
title: Vue后台项目动态路由的笔记
tags: ["Vue", "动态路由", "后端"]
创建时间: 星期三, 七月 27日 2022, 8:58:57 晚上
修改时间: 星期四, 七月 28日 2022, 1:37:05 下午
---
#Vue #后端 #动态路由

# Vue后台项目动态路由的笔记
## 动态路由的理解
一般做后台项目时，我们需要将每个登录用户对应的权限菜单展示给对应用户。
### 后端的权限控制
每个用户的权限列表以json的格式传递给前端，如
```json
[
	{
	"id": 1,
	"pid": 0,
	"path": "room_manager",
	"link": "/roomManager",
	"title": "房间管理",
	"icon": "xxxx.png"
	},
	{
	"id": 2,
	"pid": 1,
	"path": "add",
	"link": "/roomManager/add",
	"title": "添加房间",
	"icon": "xxxx.png"
	},
	{
	"id": 3,
	"pid": 1,
	"path": "edit",
	"link": "/roomManager/edit",
	"title": "编辑房间",
	"icon": "xxxx.png"
	},

]
```

### 前端处理
> 后端只需要给前端json，不用帮忙转children的结构的，这按理来说是前端的活。

- 通过网络请求(http)拿到对应的json后
- 转成对应的树形结构
- 树形结构转成vue-router的配置结构
- 渲染到页面