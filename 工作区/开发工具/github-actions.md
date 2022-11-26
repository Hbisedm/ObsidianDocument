---
title: github-actions的笔记
tags: ["github-actions"]
创建时间: 星期二, 十月 18日 2022, 4:35:07 下午
修改时间: 星期二, 十月 18日 2022, 4:57:40 下午
---
#github #action

# github-actions的笔记

## 是什么

大家知道，持续集成由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。GitHub 把这些操作就称为 actions。

## 基本概念

（1）**workflow** （工作流程）：持续集成一次运行的过程，就是一个 workflow。

（2）**job** （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。

（3）**step**（步骤）：每个 job 由多个 step 构成，一步步完成。

（4）**action** （动作）：每个 step 可以依次执行一个或多个命令（action）。

## workflow文件

### Name

workflow的名称。

### On

触发指定workflow的条件

```yml
on: push
```

push事件会触发workflow

on字段可以是事件数组

```
on: [push, pull_request]
```

push事件和pull_request事件都可以触发workflow

`on<push><tags|branches>`

可以先定分支或标签

```yam
on: 
  push: 
    branches: 
	  - master
```

上面限定master分支发生push事件时，触发workflow。

### Jobs

> workflow文件的主体是jobs字段，表示要执行的一项或多项任务。

jobs字段里面，需要知道job_id，具体名称自定义。job_id的name字段是任务的说明。

```yaml
jobs: 
  my_first_job: 
    name: My first Job
  my_second_job: 
    name: My second Job
```

上面代码的jobs字段包含两项任务。`job_id`分别是`my_first_job`和`my_second_job`

### `jobs.<job_id>.needs`

> needs字段指定当前任务的依赖关系，也就是执行顺序

```yaml
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1, job2]
```

- `job1`必须先于`job2`完成
- `job3`等待`job1`和`job2`的完成才能运行。

### `jobs.<job_id>.runs-on`

`runs-on`字段指定运行所需要的虚拟机环境。它是**必填字段**。目前可用的虚拟机如下。

- `ubuntu-latest`，`ubuntu-18.04`或`ubuntu-16.04`
- `windows-latest`，`windows-2019`或`windows-2016`
- `macOS-latest`或`macOS-10.14`

### `jobs.<job_id>.steps`

> `steps`字段指定每个 Job 的运行步骤，可以包含一个或多个步骤。每个步骤都可以指定以下三个字段。

- `jobs.<job_id>.steps.name`：步骤名称。
- `jobs.<job_id>.steps.run`：该步骤运行的命令或者 action。
- `jobs.<job_id>.steps.env`：该步骤所需的环境变量。

**下面是一个完整的 workflow 文件的范例。**

```yaml
name: Greeting from Mona
on: push

jobs:
  my-job:
    name: My Job
    runs-on: ubuntu-latest
    steps:
    - name: Print a greeting
      env:
        MY_VAR: Hi there! My name is
        FIRST_NAME: Mona
        MIDDLE_NAME: The
        LAST_NAME: Octocat
      run: |
        echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
```












## 参考链接
[阮一峰老师](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)