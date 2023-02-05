---
title: TypeScript
tags: 八股文
创建时间: 星期六, 一月 7日 2023, 12:37:39 下午
修改时间: 星期日, 一月 8日 2023, 2:59:48 下午
---
#TypeScript #八股文

# TypeScript

## 类型

除了JavaScript的类型之外，新加了 `enum`、`void`、 `any`、 `tuple`、`unknown`、`never`

也就是

boolean，number，string，array，tuple，enum，any，unknown，void，undefined，null，never，object

## 枚举类型的理解

有3种表现形式

- 数字枚举
- 字符串枚举
- 异构枚举(数字和字符串枚举混合体)

```typescript
enum Xxx {
	Up,
	Down
}

// 默认从1开始，如果设置值的话，就从那个值开始累加

// Xxx.Up === 1  
// Xxx.Down === 2
```

编译成Js代码就是 一对自身相互牵引的key-value

```typescript

enum Direction {
    Up,
    Down,
    Left,
    Right
}

// 编译JS后

var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));

Direction["Up"] === 0
Direction[0] === "Up"
```

## 接口的理解

**接口**是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的**类**去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法





