---
title: omitJs的笔记
tags: ["omitJs"]
创建时间: 星期三, 八月 10日 2022, 2:08:42 下午
修改时间: 星期三, 八月 10日 2022, 2:34:40 下午
---
#阅读源码

# omitJs的笔记

> 一个用于删除对象中指定属性后返回需要的对象

## 源码
源码就一小段js代码

```js

function omit(obj, fields) {
  // eslint-disable-next-line prefer-object-spread
  const shallowCopy = Object.assign({}, obj);
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}

export default omit;

```


## 测试
测试用例

```js

import assert from "assert";
import omit from "../src";

describe("omit", () => {
  it("should create a shallow copy", () => {
    const benjy = { name: "Benjy" };
    const copy = omit(benjy, []);
    assert.deepEqual(copy, benjy);
    assert.notEqual(copy, benjy);
  });

  it("should drop fields which are passed in", () => {
    const benjy = { name: "Benjy", age: 18 };
    assert.deepEqual(omit(benjy, ["age"]), { name: "Benjy" });
    assert.deepEqual(omit(benjy, ["name", "age"]), {});
  });
  
  it("happy path", () => {
    const hbisedm = { name: "hbisedm", age: 23 };
    assert.equal(hbisedm, hbisedm);
    const hbisedm2 = Object.assign({}, hbisedm, { sex: "male" });
    const hbisedm3 = omit(hbisedm2, ["sex"]);
    assert.deepEqual(hbisedm, hbisedm3);
    assert.notEqual(hbisedm, hbisedm3);
  });
});


```


## 学废了
简单的测试用例

- describe
- it
- assert
