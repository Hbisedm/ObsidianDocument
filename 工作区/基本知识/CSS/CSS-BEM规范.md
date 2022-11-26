---
title: CSS-BEM规范的笔记
tags: ["CSS-BEM规范"]
创建时间: 星期日, 十月 9日 2022, 10:24:16 上午
修改时间: 星期二, 十一月 22日 2022, 11:56:52 中午
---
#CSS #BEM #规范

# CSS-BEM规范的笔记

https://juejin.cn/post/6844903672162304013

## 定义

BEM 的意思就是块（block）、元素（element）、修饰符（modifier），是由 Yandex 团队提出的一种前端命名方法论。这种巧妙的命名方法让你的 CSS 类对其他开发者来说**更加透明而且更有意义**。BEM 命名约定更加严格，而且包含更多的信息，它们用于一个团队开发一个耗时的大项目。

## 约定

```css
.block {}
.block__element {}
.block--modifier {}
```

之所以使用两个连字符和下划线而不是一个，是为了让 block 可以用单个连字符来界定，如：

```css
.site-search {} /* 块 */
.site-search__field {} /* 元素 */
.site-search--full {} /* 修饰符 */
```

## Play

- block__element：块里的元素，如：nav（block）里的 a 标签（ element ）；
- block__element--modifier：块里的元素的状态、属性或修饰，如：nav 里的 a 标签，有 active、hover、normal 3 种状态（modifier）。

```html
<nav class="nav">
  <a href="#" class="nav__item nav__item--active">当前状态</a>
  <a href="#" class="nav__item nav__item--hover">鼠标移上时的状态</a>
  <a href="#" class="nav__item nav__item--normal">正常状态</a>
</nav>
```

```css
.nav {
  &__item {
    &--active {
    }
    &--hover {
    }
    &--normal {
    }
  }
}
```

## 总结

- B（block）：某一块展示/功能区域，比如：.nav。
- E（element）：这块展示/功能区域里的某个元素，比如: .nav__item。
- M（modifier）：某个元素或者某个块的状态，比如：.nav--hide, .nav__item--active 等。