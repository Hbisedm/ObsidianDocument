## KMP的由来
KMP  三个人的名字

## 解决什么问题
字符串匹配问题，文本串中找出模式串。

> 文本串 aabaabaaf
> 模式串 aabaaf

### 暴力方法

两层for循环，`O(n*m)`
#### KMP
找到之前的已经匹配过的记录，并从那个记录再开始进行匹配。
那么如何找到记录，以及如何跳到已经匹配的内容的后面继续匹配呢。

##### 前缀表
> aabaaf

前面的`aa`为前缀，后面的`aa`为后缀。当发现不匹配的时候跳到前缀的后面，继续重新匹配。所以使用KMP的第一步是找到模式串的**最长相等前后缀**

##### 前缀与后缀
> 模式串：aabaaf

前缀：  模式串里不包含尾部的字符串的其他字符集合
- a
- aa
- aab
- aaba
- aabaa	
后缀：模式串里不包含头部的字符串的其他字符集合
- f
- af
- aaf
- baaf
- abaaf

##### 最长相等前后缀
> 最长相等的前缀和后缀的长度

| 前后缀 | num |
| ------ | --- |
| a      | 0   |
| aa     | 1   |
| aab    | 0   |
| aaba   | 1   |
| aabaa  | 2   |
| aabaaf | 0   |

a因为是头部也是尾部所以他的最长相等前后缀的长度就是0
aab 找不到相等的前缀所以是0

上面的表，就是模式串`aabaaf`的前缀表。

| a   | a   | b   | a   | a   | f   |
| --- | --- | --- | --- | --- | --- |
| 0   | 1   | 0   | 1   | 2   | 0   |

#### 使用前缀表匹配的过程

在匹配过程中，若发现不匹配时，就开始使用前缀表，找出最长相等前后缀。
```js
aabaabaaf
aabaaf
```
不匹配时，跳到最长相等前后缀的前缀的下一个。这个index索引正好是最长相等前后缀的长度。

##### next数组
冲突时，回退到哪里。

> aabaaf

三种不同的实现

- `0, 1, 0, 1, 2, 0` 
- `-1, 0, 1, 0, 1, 2` 右移一位
- `-1, 0, -1, 0, 1, -1` 统一减一

目的都是一样，回退到哪个位置。
第一个：遇到冲突，看next数组内，上一个索引的值，作为退回的位置索引
第二个：遇到冲突，看自身的值，作为回退位置
第三个：遇到冲突，上一个的索引的值，+1作为回退位置


##### 伪代码

- 初始化
- 前后缀不相同
- 前后缀相同
- next


```java
// 方法一:前缀表使用减1实现
class Solution {  
    public void getNext(int[] next, String s){  
        int j = -1;  
        next[0] = j;  
        for (int i = 1; i<s.length(); i++){  
            while(j>=0 && s.charAt(i) != s.charAt(j+1)){  
                j=next[j];  
            }  
  
            if(s.charAt(i)==s.charAt(j+1)){  
                j++;  
            }  
            next[i] = j;  
        }  
    }  
    public int strStr(String haystack, String needle) {  
        if(needle.length()==0){  
            return 0;  
        }  
  
        int[] next = new int[needle.length()];  
        getNext(next, needle);  
        int j = -1;  
        for(int i = 0; i<haystack.length();i++){  
            while(j>=0 && haystack.charAt(i) != needle.charAt(j+1)){  
                j = next[j];  
            }  
            if(haystack.charAt(i)==needle.charAt(j+1)){  
                j++;  
            }  
            if(j==needle.length()-1){  
                return (i-needle.length()+1);  
            }  
        }  
  
        return -1;  
    }  
}
```








