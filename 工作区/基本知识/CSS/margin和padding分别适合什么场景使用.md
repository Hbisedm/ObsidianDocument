---

title: margin与padding的使用

date: 2022-05-26 12:42:26

tags: ["CSS"]

excerpt: margin与padding分别适合使用的场景

---





#css  #面试题  #重点

何时使用margin：

1.  需要在border外侧添加空白
    
2.  空白处不需要背景色
    
3.  上下相连的两个盒子之间的空白，需要相互抵消时。
    

何时使用padding：

1.  需要在border内侧添加空白
    
2.  空白处需要背景颜色
    
3.  上下相连的两个盒子的空白，希望为两者之和。
    

兼容性的问题：在IE5 IE6中，为float的盒子指定margin时，左侧的margin可能会变成两倍的宽度。通过改变padding或者指定盒子的display：inline解决。