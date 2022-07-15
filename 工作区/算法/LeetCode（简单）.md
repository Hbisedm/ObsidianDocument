---
title: LeetCode（简单）
date: 2022-06-23 20:11:52
tags: ["LeetCode", "简单", "算法"]
---
#刷题

# LeetCode（简单）的笔记

## [两数之和](https://leetcode.cn/problems/two-sum/)
### 我的题解：
1. 首先判断临界可能，若原数组的长度小于2，则返回空数组即可。
2. 创建2个前后指针，第一个index指针遍历length-1次，第二个指针由第一个指针的位置+ 1到整个数组长度的遍历
3. 当判断出两个指针的和等于target时，返回对应index即可。
```ts
function twoSum(nums: number[], target: number): number[] {
    if(nums.length < 2) {
        return []
    }
    let result: number[] = []
    let numsLength = nums.length;
    for(let i = 0; i < numsLength - 1; i++) {
        for(let j = i + 1; j < numsLength; j++ ) {
            if(nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
    return result
};
```

### 别人的题解：
新建一个map(key为数值的值，value为数组下标），map里面放的是之前已经比较过的数字，nums[i]是当前的值，target-nums[i]得到的值，如果在之前的数字有出现，则说明能够查找到。注意map里面放的是下标比i小的值，所以map[target-nums[i]]是返回数组的第一项。
```ts
function twoSum(nums: number[], target: number): number[] {
    let map = {}
    for(let i = 0; i < nums.length; ++i) {
        const rest = target - nums[i];
        if(map[rest] !== undefined) {
            // 注意这里map里面的是下标比较小的值。
            return [map[rest], i]
        }  
        map[nums[i]] = i   
    }
    return []
};
```



## [回文数](https://leetcode.cn/problems/palindrome-number/)
### 我的题解：
1. 先将number类型转为string类型，方便操作下标
2. 回文数的临界值时length/2，所以我们遍历到length/2即可
3. 每次遍历将前后index对应的值做比较即可

```ts
function isPalindrome(x: number): boolean {
    let str = x + ''
    let strLength = str.length
    
    for(let i = 0; i < strLength / 2; i++) {
       if(str[strLength - i - 1] !== str[i]){
           return false
       }
    }
    return true
}
```

### 别人的题解：
这应该是最经典的双指针题目之一了吧，思路还是很明显的。先转换成字符串，然后从两端向中间靠近，遇到不同的就返回false，全部相同则返回true。
可能有几个需要注意的点：

负数一定不是回文。因为负号永远不会出现在数字的最后，不会存在-121-这种数字。
只需要判断到b < e时即可。如果是奇数，最中间的字符不会影响回文结果。

```ts
function isPalindrome(x: number): boolean {
  if (x < 0) return false;
  const s = x.toString();
  let b = 0, e = s.length - 1;
  while (b < e) {
    if (s[b] !== s[e]) return false;
    ++b, --e;
  }
  return true;
}
```

- 标签：数学
- 如果是负数则一定不是回文数，直接返回 false
- 如果是正数，则将其倒序数值计算出来，然后比较和原数值是否相等
- 如果是回文数则相等返回 true，如果不是则不相等 false
- 比如 123 的倒序 321，不相等；121 的倒序 121，相等

```java
class Solution {
    public boolean isPalindrome(int x) {
        if(x < 0)
            return false;
        int cur = 0;
        int num = x;
        while(num != 0) {
            cur = cur * 10 + num % 10;
            num /= 10;
        }
        return cur == x;
    }
}
```

## [剑指 Offer 32 - II. 从上到下打印二叉树 II](https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/)

### 别人的题解：
思路就是，每一层都有一个容器，并且每一个节点要知道自己在那一层，将自己的元素放到对应的容器中  然后继续遍历，遍历简单 DFS

```java
class Solution {
    
    private List<List<Integer>> res = new ArrayList<>();
    
    // 方案二：递归层序打印
    public List<List<Integer>> levelOrder(TreeNode root) {
        dfs(root, 1); 
        return res;
    }

    private void dfs(TreeNode root, int depth) {
        // 递归截至条件
        if (root == null){
            return;
        }
        // 如果该深度，在res中没有容器存放，res就添加一个容器
        if (res.size() < depth){
            res.add(new ArrayList<>());
        }
        // 添加该节点，到对应的深度容器中
        res.get(depth - 1).add(root.val);
        // 继续遍历 左子节点 和 右子节点
        dfs(root.left, depth + 1);
        dfs(root.right, depth + 1);
    }
}
```

```ts
const res = []

function levelOrder(root: TreeNode | null): number[][] {
    res.length = 0
    dfs(root, 1)
    return res
};

function dfs(root: TreeNode, deep: number): void{
    if(root === null || root?.val === null) {
        return 
    }
    if(res.length < deep) {
        res.push([])
    }
    res[deep-1].push(root?.val)
    dfs(root?.left, deep + 1)
    dfs(root?.right, deep + 1)
}
```

### 官方题解

1. 特例处理： 当根节点为空，则返回空列表 [] ；
2. 初始化： 打印结果列表 res = [] ，包含根节点的队列 queue = [root] ；
3. BFS 循环： 当队列 queue 为空时跳出；
	1. 新建一个临时列表 tmp ，用于存储当前层打印结果；
	2. 当前层打印循环： 循环次数为当前层节点数（即队列 queue 长度）；
		1. 出队： 队首元素出队，记为 node；
		2. 打印： 将 node.val 添加至 tmp 尾部；
		3. 添加子节点： 若 node 的左（右）子节点不为空，则将左（右）子节点加入队列 queue ；
	3. 将当前层结果 tmp 添加入 res 。
4. 返回值： 返回打印结果列表 res 即可。


```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        List<List<Integer>> res = new ArrayList<>();
        if(root != null) queue.add(root);
        while(!queue.isEmpty()) {
            List<Integer> tmp = new ArrayList<>();
            for(int i = queue.size(); i > 0; i--) {
                TreeNode node = queue.poll();
                tmp.add(node.val);
                if(node.left != null) queue.add(node.left);
                if(node.right != null) queue.add(node.right);
            }
            res.add(tmp);
        }
        return res;
    }
}
```


## [剑指 Offer 28. 对称的二叉树](https://leetcode.cn/problems/dui-cheng-de-er-cha-shu-lcof/)


### 别人的题解：
- 检查根节点，没毛病就依次进行2个字节点的比较
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return check(root.left, root.right); // 检查root的左右子树
    }

    private boolean check(TreeNode a, TreeNode b) { 
        if (a == null && b == null) return true; // 都为空, 对称
        if (a != null && b == null) return false;
        if (a == null && b != null) return false; // 只有一边为空, 不对称
        if (a.val != b.val) return false; // 都不为空, 但值不相等

        boolean outside = check(a.left, b.right); // 比较a, b两棵树的外侧
        boolean inside = check(a.right, b.left); // 比较a, b两颗树的内测
        return outside && inside; // a, b内外侧都相等才对称
    }
}
```

## [面试题40. 最小的k个数](https://leetcode.cn/problems/zui-xiao-de-kge-shu-lcof/)
### 我的题解：
正排序后，取出前k个数
```js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    arr.sort((a,b)=>a-b)
    return arr.splice(0, k)
};
```

## [125. 验证回文串](https://leetcode.cn/problems/valid-palindrome/)
### 题解：
- 先使用正则过滤出数字和字母
- 然后使用首位指针进行匹配

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    const newStr = s.replace(/([^a-zA-Z0-9])/g, '').toLocaleLowerCase();
    for(let i = 0; i < newStr.length / 2; i++ ){
        if(newStr[i] !== newStr[newStr.length - i - 1]) {
            return false
        }
    }
    return true;
};
```

## [53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)
### 题解：
动态规划法解决，维护个一元数组。
使用一个数组存储每次遍历后的最大值
每次遍历时，判断上一个结果是否小于0，小于0则取0，然后加上当前索引的值。
```js
var maxSubArray = function(nums) {
    const len = nums.length
    let swapArr = [] //存储数组
    swapArr[0] = nums[0] // 初始化
    let max = swapArr[0] // 初始化
    for(let i = 1; i < len; i++) {
        swapArr[i] = Math.max(swapArr[i-1], 0) + nums[i]
        max = Math.max(max, swapArr[i]) //与当前的最大值做比较，若小于则取原来的max值，否则覆盖原来的max值。
    } 
    return max
};
```
## [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)
### 题解：
使用栈作为辅助空间，匹配为左符号时，入栈。每次匹配右符号时，看看当前辅助空间内最后一个是不是对应的左符号。
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const len = s.length
    const swapArr = []
    for(let i = 0; i < len; i++) {
        if(swapArr.length === 0) {
            swapArr.push(s[i])
            continue
        }
        switch(s[i]) {
            case '}': {
                if(swapArr[swapArr.length - 1] === '{') {
                     swapArr.pop()
                }else {
                    swapArr.push(s[i])
                }
                break;
            }
            case ']': {
                if(swapArr[swapArr.length - 1] === '[') {
                    swapArr.pop()
                }else {
                    swapArr.push(s[i])
                }
                break;
            }
            case ')': {
                if(swapArr[swapArr.length - 1] === '(') {
                    swapArr.pop()
                }else {
                    swapArr.push(s[i])
                }
                break;
            }
            default: {
                swapArr.push(s[i])
            }
        }
    }
    return swapArr.length === 0    
};
```
优化点 可以使用个对象
```js
const enumE = {
	'}': '{',
	']': '[',
	')': '('
}
```
代替`swich`那段代码


## [26. 删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)
### 题解：
使用一个临时指针进行暂存
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let swapIndex = 1
    for(let i = 1; i < nums.length; i++) {
        if(nums[i-1] < nums[i] ) {
            nums[swapIndex] = nums[i]
            swapIndex++
        }
    }
    return swapIndex
};
```


## [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)
### 题解：
采用深度优先遍历，判断当前node是否有值为临界，遍历左子树后，遍历右子树，然后取出最大值
```js

var maxDepth = function(root) {
    let dfs = function(root, currDept) {
        if(!root?.right && !root?.left) {
            return currDept
        }
        if(root) {
           currDept++
        }
        let [left, right] = [0,0]
        if(root?.left) {
           left = dfs(root.left, currDept)
        }
        if(root?.right) {
           right = dfs(root.right, currDept)
        }
        return Math.max(left, right)
    }
    
   if(!root) {return 0}
return dfs(root,0) + 1
    
};
```

### 别人的题解
BFS广度优先
层序遍历二叉树，每层结束的时候depth加1
```js

const maxDepth = (root) => {
    if (root == null) return 0;
    const queue = [root];
    let depth = 1;
    while (queue.length) {
        // 当前层的节点个数
        const levelSize = queue.length;          
        // 逐个让当前层的节点出列
        for (let i = 0; i < levelSize; i++) {    
            // 当前出列的节点
            const cur = queue.shift();            
            // 左右子节点入列
            if (cur.left) queue.push(cur.left);
            if (cur.right) queue.push(cur.right); 
        }
        // 当前层所有节点已经出列，如果队列不为空，说明有下一层节点，depth+1
        if (queue.length) depth++;
    }
    return depth;
};
```



## [66. 加一](https://leetcode.cn/problems/plus-one/)
### 题解
分析题目后，需要考虑三个情况
- 正常＋1
	> 123 -> 124 
- ＋1进位
	> 129 -> 130
- 末位＋1进位
	> 99 -> 100

分析完毕后，遍历个位、十位、百位的方式，依次＋1 若进位，则进入下一个位数进行＋1。若整个循环走完了，还没有return，说明是上面分析的第三种情况。
这时候需要将整个数组替换，开辟另外的内存空间去new个新数组，长度为上一个数组长度＋1，索引0为1即可
```javascript
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let len = digits.length
    let curr = 1
    let result = 0
    for(let i = len -1; i >= 0; i--) {
       digits[i]++ 
        digits[i] %= 10
        if(digits[i] !== 0){
            return digits
        }
    }
    digits = Array.from(Array(len+1)).map(_=>0)
    digits[0] = 1
    return digits
};
```



## [58. 最后一个单词的长度](https://leetcode.cn/problems/length-of-last-word/)
### 题解：
从后往前遍历整个文本，先判断当前字符是不是**空格**且判断当前移动的索引是不是为0，
- 若为0，说明最后的字符空格，需要跳过
- 不为0，开始记录单词长度

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
	let len = 0
	for(let i = s.length - 1; i>=0; i--) {
		if(s[i] === ' ') {
			if(len !== 0) {
				return len    
			}
		}else {
			len++    
		}
	}
    return len
};
```

## [88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/)
注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
### 题解：最终要nums1返回，所以目的是对nums1修改。每次将nums1的当前索引跟nums2的第0个位置的数字作比较。若大于，则nums2.shift()到nums1当前索引的位置。结束遍历num1后判断nums2，是否有值，若还有则依次push到nums1中
```js
```/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    nums1.length = m
    nums2.length = n
    if(n === 0) {
        return nums1
    }
    if(m===0){
        return nums1.push(...nums2)
    }
    for(let i = 0; i < nums1.length; i++) {
        if(nums1[i] > nums2[0]) {
            nums1.splice(i, 0, nums2.shift())
        }
    }
    if(nums2.length > 0) {
        nums1.push(...nums2)
    }
    
};
```

#### [217. 存在重复元素](https://leetcode.cn/problems/contains-duplicate/)

### 题解：
使用个辅助空间，遍历整个数组，每次判断对应的key在不在空间里面，不在的话，赋值进去；在的话说明存在重复了。
```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let map = {}
    for(let i = 0; i < nums.length; i++) {
        if(!map[nums[i]]) {
            map[nums[i]] = 1
        } else {
            return true
        }
    }
    return false
};
```


## [219. 存在重复元素 II](https://leetcode.cn/problems/contains-duplicate-ii/)

### 题解：
和上一题差不多，注意点2个
- 存储的是当前的索引
- 当前索引判断map里面有值，但是不满足条件的话，替换里面存储的值，继续循环，满足条件的话，直接return true即可。

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
let map = new Map()
for(let i = 0; i < nums.length; i++) {
    if(map.has(nums[i])){
      if(i - map.get(nums[i]) <= k){
          return true
      } else {
          map.set(nums[i], i) //替换当前值
      }
    } else {
        map.set(nums[i], i)
    }
}
    return false
};
```

## [136. 只出现一次的数字](https://leetcode.cn/problems/single-number/)
### 题解：
- 自己的想法是搞个map或者set处理下，或者排序后直接判断前后2个数是否相等
- 使用异或运算，超级符合这道题目
	- 相同为0，不同为1。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    nums = nums.sort()
    for(let i = 0; i < nums.length; i = i+2) {
        if(nums[i] !== nums[i+1]) {
            return nums[i]
        }
    }
};
```

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let result = nums[0]
    for(let i = 1; i < nums.length; i++) {
       result ^= nums[i]
    }
    return result
};
```

##  [290. 单词规律](https://leetcode.cn/problems/word-pattern/)
### 题解：
一个map创建2个key进行正反映射起来。
- 当判断第一个key有的话，则判断里面的值是否正确
- 正确的话，再判断另一个对应的key有没有值，若有值说明之前当前这个值，已经有映射关系了
- 否则新增map
```js
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    let map = new Map()
    let sArr = s.split(' ')
    if(pattern.length !== sArr.length) {
        return false
    }
    for(let i = 0; i < pattern.length; i++) {
        if(map.has(pattern[i])) 
        {
            if(map.get(pattern[i]) !== sArr[i]) {
                return false    
            }
        } 
        else if(map.get(`_${sArr[i]}`))
        {
            return false
        }
        else 
        {
            map.set(pattern[i], sArr[i])
            map.set(`_${sArr[i]}`, pattern[i])
        }
    }
    return true
};
```

## [191. 位1的个数](https://leetcode.cn/problems/number-of-1-bits/)
### 题解：
将当前的num与`1`做逻辑与运算，若为1则说明当前的num最后位数是1。使用个临时变量自增1即可。
```javascript
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let result = 0
    for(let i = 0; i < 32; i++) {
        if(n & 1 === 1) {
            result++
        }
        n = n >>> 1
    }
    return result
};
```

## [121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)
### 题解：
正向遍历数组，当第一个索引的value为最小值，若有比这个更小的，则将它当做最小值。
每次遍历判断当前值是不是最小值，如果不是的话，就将当前值与最小值做减法，得到的结果与当前的暂存的最大值取max

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    const len = prices.length
    let low = prices[0]
    let max = 0
    for(let i = 1 ; i < len; i++) {
        if(low > prices[i]) {
            low = prices[i]
            continue
        }
        const curr = prices[i] - low
        max = Math.max(max, curr)
    }
    return max
};
```

## [344. 反转字符串](https://leetcode.cn/problems/reverse-string/)
### 题解：
使用双指针的方式，简单解决。
```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let len = s.length
    for(let i = 0; i < len/2; i++) {
        let swap = s[i]
        s[i] = s[len-i-1]
        s[len-i-1] = swap
    }
};
```

```js
var reverseString = function(s) {
    const n = s.length;
    for (let left = 0, right = n - 1; left < right; ++left, --right) {
        [s[left], s[right]] = [s[right], s[left]];
    }
};
```

## [860. 柠檬水找零](https://leetcode.cn/problems/lemonade-change/)
题解：
初始时候身上没有零钱，所以索引为0肯定为5，使用2个变量，记录当前拥有5美金和10美金的个数，然后从1开始遍历整个数组。
- 若为5，则5的个数加1
- 若不为5
	- 10的话，10的个数加1
	- 20的话，先减掉5，然后看看5的个数有没有
		- 没有，return false
		- 有， 5的个数自减1，然后我们接下来就算10的倍数，也就是把这个数在减5，执行到这里，这个数是10的倍数了。
			- 判断有没有10的个数，有的话，优先减去
			- 判断当前10的个数与这个数求余后的值做比较，不足的10的个数拿5的个数乘2去补齐。
			- 若10的个数和5的个数都不足，return false
	- 不能15、25 because没必要找零。都有5块了。

```js
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
    let currFiveNum = 1
    let currTenNum = 0
    let len = bills.length
    if(bills[0] !== 5) {
        return false
    }
    for(let i = 1; i < len; i++){
        if(bills[i] === 5) {
            currFiveNum++
            bills[i] = bills[i-1] + 5
        }else {
            if(bills[i] === 10) {
                currTenNum++
            }
            if(bills[i] > 5) {
                let cur = bills[i] - 5
                if(cur % 10 === 5 && currFiveNum > 0) {
                    currFiveNum--
                    cur -=5
                    bills[i-1] -= 5
                } else {
                    return false
                }
                if(cur > bills[i-1]+5){
                   return false 
                } else {
                    let a = cur / 10
                    if(a > currTenNum && a > ~~currFiveNum/2) {
                        return false
                    }else {
                        if(a - currTenNum > 0){
                            currTenNum = 0
                            currFiveNum -= (a-currTenNum) * 2
                        }else {
                            currTenNum -=a
                        }
                        
                        bills[i] = bills[i-1] + bills[i] - a * 10
                    }
                }
            }
        }
    }
    return true 
};

```

## [1290. 二进制链表转整数](https://leetcode.cn/problems/convert-binary-number-in-a-linked-list-to-integer/)
### 题解：
遍历链表，得到str值，调用parseInt(str, 2)将二进制转十进制
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function(head) {
    let swapStr = ""
    while(head){
        swapStr += head.val
        
        head = head.next
    }
    return parseInt(swapStr, 2)

};
```

## [872. 叶子相似的树](https://leetcode.cn/problems/leaf-similar-trees/)
### 题解：
使用递归的方式，递归跳出判断条件为当前节点的左右节点是否空，为叶子节点

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {
    let arr1 = []
    let arr2 = []
    
    let getChildren = function(root, arr) {
        if(!root.left && !root.right) {
            return [root.val]
        }
        let currResult = []
        let left = []
        let right = []
        if(root.left) {
            left = getChildren(root.left, [])
        }
        if(root.right) {
            right = getChildren(root.right, [])
        }
        currResult.push(...left)   
        currResult.push(...right)
        return currResult
    }
    arr1 = getChildren(root1, arr1)
    arr2 = getChildren(root2, arr2)
    return arr1.toString() === arr2.toString()
};
```

## [1360. 日期之间隔几天](https://leetcode.cn/problems/number-of-days-between-two-dates/)
### 题解：
使用`Date()`这个构造器传入str会返回距离`1971-01-01`的毫秒，将2个值的差值取绝对值。然后除以一天的毫秒数
```javascript
/**
 * @param {string} date1
 * @param {string} date2
 * @return {number}
 */
var daysBetweenDates = function(date1, date2) {
    return Math.abs((+new Date(date1)) - (+new Date(date2))) / (1000 * 24 * 60 * 60) 
};
```

## [1013. 将数组分成和相等的三个部分](https://leetcode.cn/problems/partition-array-into-three-parts-with-equal-sum/)
### 题解：
由题目可以知道，当前这个数组肯定可以被三求余为0，然后使用count记录遍历arr累加的值是否等于平均值，若是则count++，最后判断count是否大于等于3。
> 不一定等于3，例如[1,-1,1,-1,1,-1,1,-1]

```javascript
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canThreePartsEqualSum = function(arr) {
    let sum = arr.reduce((prev, curr) => prev + curr)
    if(sum % 3 !== 0) {
        return false
    }
    let avg = sum / 3
    let swap = 0
    let count = 0
    for(let i = 0; i < arr.length; i++) {
        swap +=arr[i]
        if(swap === avg) {
            swap = 0
            count++
        }
    }
    return count >= 3
};
```
### 别人的题解：
使用双指针的写法，先判断是否可以分为三等份，然后遍历一次数组，将数组left + 1 < right作为循环跳出条件。判断`当前左边的求和 是否 等于平均值` 逻辑与`当前右边的求和 是否 等于平均值` 若相等则就是三份了。为什么呢。因为一开始就判断了能不能分为三份，所以中间那份不用算。 

```java
class Solution {
    public boolean canThreePartsEqualSum(int[] A) {
        int sum = 0;
        for(int i : A){
            sum += i;
        }
        if(sum%3 != 0){
            // 总和不是3的倍数，直接返回false
            return false;
        }

        // 使用双指针,从数组两头开始一起找，节约时间
        int left = 0;
        int leftSum = A[left];
        int right = A.length - 1;
        int rightSum = A[right];

        // 使用left + 1 < right 的原因，防止只能将数组分成两个部分
        // 例如：[1,-1,1,-1]，使用left < right作为判断条件就会出错
        while(left + 1 < right){
            if(leftSum == sum/3 && rightSum == sum/3){
                // 左右两边都等于 sum/3 ，中间也一定等于
                return true;
            }
            if(leftSum != sum/3){
                // left = 0赋予了初值，应该先left++，在leftSum += A[left];
                leftSum += A[++left];
            }
            if(rightSum != sum/3){
                // right = A.length - 1 赋予了初值，应该先right--，在rightSum += A[right];
                rightSum += A[--right];
            }
        }
        return false;  
    }
}

```




## [1331. 数组序号转换](https://leetcode.cn/problems/rank-transform-of-an-array/)
### 题解：
- 使用Set去重后，正序排序
- 使用Map集合记录每个元素的index
- 使用for遍历传入的实参，与map集合做对比，相等就push索引到result数组

```javascript
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function(arr) {
    let swap = [...new Set(arr)].sort((a,b)=>a-b)
    const map = new Map()
    const result = []
    for(let i = 0; i < swap.length; i++) {
        if(!map.has(swap[i])) {
            map.set(swap[i], i + 1)    
        }
    }
    for(let i = 0; i < arr.length; i++) {
        result.push(map.get(arr[i]))
    }
    return result
};
```

## todo
