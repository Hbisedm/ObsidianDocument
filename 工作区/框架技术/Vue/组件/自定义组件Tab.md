---

title: 自定义组件Tab

date: 2022-05-26 12:42:26

tags: ["Vue"]

excerpt: 开发一个自定义组件

---



#自定义组件

# 效果图
![](https://raw.githubusercontent.com/Hbisedm/my-blob-picGo/main/img/202205200957303.png)

# 思路

<aside> 
	💡 使用van-sticky达到吸顶效果
</aside>

# 代码

### Html
```html
	<van-sticky>
      <div class="switchBar">
        <div class="checked">
          <div
            class="checkedLi"
            v-for="(item, index) in helpIndex"
            :key="index"
            :class="{ active: index == isActive }"
            @click="changeHelpIndex(index)">
            {{ item.typeName }}
          </div>
        </div>
      </div>
   </van-sticky>
```

### JavaScript
```js
data() {
	return {
		helpIndex: [{
		        typeName: '特惠区',
		        type: 0,
		      }, {
		        typeName: '体验区',
		        type: 1,
		      }],
		isActive: 0,
	}
}

```


### Css

```css
.switchBar {
  width: 100%;
  overflow-x: scroll;
  background: #f5f5f5;

  .checked {
    margin: 30px 30px 10px;
    display: flex;
    justify-content: flex-start;


    .checkedLi {
      position: relative;
      white-space: nowrap;
      width: 142px;
      height: 44px;
      text-align: center;

      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      line-height: 40px;
    }

    .active {

      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #000000;
      line-height: 40px;

      position: relative;
      //width: 100px;
      height: 56px;
      text-align: center;
      //border-bottom:2px solid #5A8BFF; //第一层下划线
      //margin:63px auto 40px;
      &::after {
        content: "";
        display: block;
        position: absolute;
        left: calc(50% - 23px);
        bottom: 0;
        margin-top: 20px;
        width: 46px;
        height: 10px;
        border-radius: 5px;
        background: linear-gradient(90deg, #FF7335, #FE3030);
        box-shadow: 0px 2px 9px 0px rgba(254, 50, 48, 0.42);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
    }
  }
}
```


https://codepen.io/hbisedm/pen/yLvXNaz