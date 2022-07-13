---
title: CSS 动态控制颜色
date: 2022-06-06 11:01:09
tags: ["CSS"]
---
#css

# CSS 动态控制颜色的笔记

## clamp
css的区间选择函数
三个参数：[ Min, Val, Max ]，前后分别是最小、最大值，中间是动态值。
```css
--x: clamp(10,(var(--y) - 99) * 99,20)
```
- 当--y小于100时，计算后结果小于等于0，取出10
- 当--y大于等于100时，计算后结果大于等于99，取出20

为什么这里需要乘以 99 呢？其实是一个**放大插值**的操作，严格来讲，这个例子中只要大于 20 就够了，当乘以 20 以后，范围就变成了 `...、-20、0、 20、40、...`，也是包含 [10, 20] 这个区间的。
这个就是CSS 中 if 判断的基本原理了。

## 通过饱和度变化
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061142271.png)
```css
num{
  --s: clamp(0%,(var(--num) - 99) * 99%,85%);/* >100 */
  color: hsl(27 var(--s) 36%);
}
num::before {
  counter-reset: num var(--num);
  content: counter(num);
}
num::after {
  content: '阅读';
}
```
```html
<num style="--num:1"></num>
<num style="--num:99"></num>
<num style="--num:102"></num>
```

由于饱和度有阈值，当饱和度低于0%时，仍然按照0%来渲染，所以上面的css代码中num标签可以改为：
```css
num{
  --s: min((var(--num) - 99) * 99% ,85%);
  color: hsl(27 var(--s) 36%);
}
```
同样达到目的。
### 效果图
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061146576.png)

## 完全控制颜色
虽然饱和度变化控制比较容易，只需要控制一个参数就行了，但是有局限性。
> 首先，这个灰色可能并不是设计师想要的灰色（实际可能会偏淡一点），再者，颜色变化不够自由，比如，默认是一个蓝色，超出一定数量后变成红色，这种就无法控制了。

于是，我们需要用完全解析的方式来实现，原理其实就对颜色的 3 个参数进行控制，`rgb` 或者 `hsl` 都可以，假设两个颜色分别是`rgb(29 125 250)`和`rgb(244 67 54)`，如下
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061148968.png)
这里不仅有**递增**的变化，也有**递减**的变化（比如，125 => 67、250 => 54），所以在 calc 计算的时候需要取反，具体实现如下
```css
num{
    --r: clamp(29, (var(--num) - 99) * 999 + 29 , 250);/*29, 250*/
    --g: clamp(67, (var(--num) - 100) * -999 + 67 , 125);/*128, 67*/
    --b: clamp(54, (var(--num) - 100) * -999 + 54 , 250);/*250, 54*/
    color: rgb(var(--r) var(--g) var(--b));
}
```

注意点：
1.  系数需要足够大，这里是 999，比如第一条，当 --num 为 100 时，如果系数是 99，那么计算的结果是 99 + 29，没有达到最大值 250，所以需要改大一点，比如 999
2.  clamp 支持的参数必须是 `[min, val, max]`，`min` 和 `max` 不能对调，所以以上代码再实现时做了交换

### 效果图
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061154745.png)
## 自动背景颜色变化
> 虽然颜色可以通过上述方式进行自动变化，但是还是有些不足的。
> 1.  代码量比较多，有些繁琐，容易混淆，特别是前后数字的顺序
> 2.  只适用于两个颜色的变化，比如多种分段的颜色可能就无法实现了

背景相比于单纯的颜色来说，**有一个非常大的优势在于多层叠加**，如果控制每个背景的大小，不就可以控制最终展示的颜色了吗？

还是上面这个例子，我们先通过渐变绘制两层背景，上面是红色`rgb(244 67 54)`，下面是蓝色
`rgb(29 125 250)`，然后通过

`background-size`来控制每一层的大小，原理是这样的

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061318470.png)

```css
num{
  background: linear-gradient(rgb(244 67 54),rgb(244 67 54)), 
    linear-gradient(rgb(29 125 250), rgb(29 125 250));
  color: #fff;
  background-size: calc( (var(--num) - 99) * 100% ), 100%;
}
```
### 效果图
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061320654.png)

其实这个计算根据简单，解释一下：
1.  当 `--num` 大于等于 100 时，计算结果肯定是大于 100% 的，所以上面的红色背景是可见的，整体表现为红色
2.  当 `--num` 小于 100 时，计算结果肯定是小于等于 0% 的，即使是负数，background-size 也解析为 0%，所以上面的红色背景是不可见的，整体表现为下面的蓝色

如果希望实现文字颜色的变化，可以利用到 `background-clip`
```css
num{
  background: linear-gradient(rgb(244 67 54),rgb(244 67 54)), 
    linear-gradient(rgb(29 125 250), rgb(29 125 250));
  color: transparent;
  background-size: calc( (var(--num) - 99) * 100% ), 100%;
  -webkit-background-clip: text;
}
```
### 效果图
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061320693.png)

## 自动变色的进度条
背景还可以适配多种颜色。实现这样一个可以自动变色的进度条，有这样几条规则：

1.  当进度小于 30% 时，背景呈红色
2.  当进度大于 30% 并且 小于 60% 时，背景呈橙色
3.  当进度大于 60% 并且 小于 90% 时，背景呈蓝色
4.  当进度大于 90% 时，背景呈绿色

示意如下
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061322823.png)

```html
<div class="bar" style="--percent: 50;"></div>
```
可以通过 CSS 伪类和计数器将 CSS 变量显示在页面，有兴趣的可以看看张鑫旭老师的这篇文章：[小tips: 如何借助content属性显示CSS var变量值](https://www.zhangxinxu.com/wordpress/2019/05/content-css-var/)（这个案例也是在这个基础上修改的），简单修饰一下
```css
.bar {
  display: flex;
  height: 20px;
  background-color: #f5f5f5;
}
.bar::before {
  counter-reset: progress var(--percent);
  content: counter(progress) '%\2002';
  display: flex;
  justify-content: end;
  width: calc(var(--percent) * 1%);
  font-size: 12px;
  color: #fff;
  background: #2486ff;
  white-space: nowrap;
}
```

**那么该如何根据进度自动变色呢？**

原理还是类似的！首先，还是将几个颜色通过渐变绘制出来，最后的颜色放在最前面，然后根据 CSS 变量控制背景尺寸就行了，原理示意如下

![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061423450.png)

由于`background-size`本身有边界限制，当小于 0% 时，仍然按 0% 来渲染，所以这里可以不必用 `clamp`来加以限制，减少代码量，具体代码实现是这样的‘
```css
.bar::before {
        counter-reset: progress var(--percent);
        content: counter(progress) '%\2002';
        display: flex;
        justify-content: end;
        width: calc(var(--percent) * 1%);
        font-size: 12px;
        color: #fff;
        white-space: nowrap;
        background-image: linear-gradient(green, green),
            linear-gradient(#2486ff, #2486ff),
            linear-gradient(orange, orange),
            linear-gradient(red, red);
        background-size: calc((var(--percent) - 90) * 100%) 100%,
            calc((var(--percent) - 60) * 100%) 100%,
            calc((var(--percent) - 30) * 100%) 100%,
            100% 100%;
    }
```

简单看一下里面的逻辑：

1.  当 `--percent` 大于 90 时，所有背景的尺寸都是 100%，自然显示**最上层的绿色**
2.  当 `--percent` 大于 60 ，小于等于 90 时，只有最上层的绿色尺寸是 0，其他背景尺寸都是 100%，所以显示**第二层的蓝色**
3.  当 `--percent` 大于 30 ，小于等于 60 时，上面两层背景尺寸都是 0，下面两层背景尺寸都是 100%，所以显示**第三层的橙色**
4.  当 `--percent` 小于 30 时，只有最底层的尺寸是 100%，其他都是 0，所以显示**最底层的红色**

背景自动变色已经实现了，不过数字还有一点小问题，**当进度条比较小时，百分比数字明显放不下了**，如下
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061428574.png)
所以，在这种情况下**应该把百分比数字移到外面来，并且变成红色**。

移到外面，可以通过`text-indent`属性来实现，文字颜色从白色变成红色（`hsl(0,100%,50%)`），可以通过亮度来实现，**当亮度为 100% 时，任何颜色都会变成白色**，由于亮度本身有限制，当超过 100% 时，仍然按照 100% 来渲染，这一点可以利用起来，具体实现如下
```css
.bar::before {
        counter-reset: progress var(--percent);
        content: counter(progress) '%\2002';
        display: flex;
        justify-content: end;
        width: calc(var(--percent) * 1%);
        font-size: 12px;
        color: #fff;
        white-space: nowrap;
        background-image: linear-gradient(green, green),
            linear-gradient(#2486ff, #2486ff),
            linear-gradient(orange, orange),
            linear-gradient(red, red);
        background-size: calc((var(--percent) - 90) * 100%) 100%,
            calc((var(--percent) - 60) * 100%) 100%,
            calc((var(--percent) - 30) * 100%) 100%,
            100% 100%;
        --l: max(50%, (var(--percent) - 9) * 100%);
        color: hsl(0, 100%, var(--l));
        --offset: clamp(0%, (var(--percent) - 10) * -120%, 120%);
        text-indent: var(--offset);
    }
```
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202206061435150.png)

注意点：
1. 有2个`color`属性，后面的会覆盖上面的，hsl(0, 100%, 亮度变量) 0是色相，红色的色相为0， 第二个是饱和度，为100时，颜色最鲜艳，第三个是亮度，当亮度为100%时，任何颜色都会变成白色展示给用户。
2. `text-indent`：一个文本缩进属性。
3. `max`：一个取出最大值的css函数，上面代码，当小于10时，`--l`取50%，否则为100%

## 总结
[所有代码在codepen](https://codepen.io/hbisedm/pen/wvyxxmj) 
以上就是关于 CSS 自动变色技术的全部内容了，核心其实就是边界值的灵活计算，是不是非常强大呢？这里总结一下实现要点：

1.  实现原理是 CSS 变量 和 calc 计算
2.  clamp 可以限制表达式的区间范围
3.  通用核心代码 --x: clamp(10,(var(--y) - 99) * 99,20)
4.  饱和度可以控制颜色的鲜艳程度，当饱和度为0，就变成灰色了
5.  完全控制颜色变化，可以用 rgb 或者 hsl 完全表示出来，分别进行计算
6.  以上方案仅适用于两个颜色的切换
7.  多层背景叠加可以实现多种颜色切换
8.  多层背景切换的核心在于背景尺寸的控制
9.  亮度为 100% 时，颜色就变成了白色
10.  部分属性本身有“阈值”，充分利用这种特性可以减少区域判断

当然，这种技术不仅仅适用于颜色的变化，只要是数值的变化都可以，比如文章中`text-indent`的切换，充分利用这些小技巧可以让我们的页面更加灵活，更加精致。


## 参考链接
[css auto color](https://segmentfault.com/a/1190000041914954)