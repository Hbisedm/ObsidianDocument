JavaScript：

## 二分查找法
使用左闭右闭区间

```javascript
var search = function (nums, target) {
    let left = 0, right = nums.length - 1;
    // 使用左闭右闭区间
    while (left <= right) {
        let mid = left + Math.floor((right - left)/2);
        if (nums[mid] > target) {
            right = mid - 1;  // 去左面闭区间寻找
        } else if (nums[mid] < target) {
            left = mid + 1;   // 去右面闭区间寻找
        } else {
            return mid;
        }
    }
    return -1;
};
```


使用左闭右开区间

```js
var search = function (nums, target) {
    let left = 0, right = nums.length;
    // 使用左闭右开区间 [left, right)
    while (left < right) {
        let mid = left + Math.floor((right - left)/2);
        if (nums[mid] > target) {
            right = mid;  // 去左面闭区间寻找
        } else if (nums[mid] < target) {
            left = mid + 1;   // 去右面闭区间寻找
        } else {
            return mid;
        }
    }
    return -1;
};
```


## KMP

```js
var kmp = function (next, s) {
    next[0] = -1;
    let j = -1;
    for(let i = 1; i < s.length; i++){
        while (j >= 0 && s[i] !== s[j + 1]) {
            j = next[j];
        }
        if (s[i] === s[j + 1]) {
            j++;
        }
        next[i] = j;
    }
}
```


## 二叉树

### 深度优先遍历（递归）

二叉树节点定义：

```js
function TreeNode (val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}
```

前序遍历（中左右）：

```js
var preorder = function (root, list) {
    if (root === null) return;
    list.push(root.val);        // 中
    preorder(root.left, list);  // 左
    preorder(root.right, list); // 右
}
```


中序遍历（左中右）：

```js
var inorder = function (root, list) {
    if (root === null) return;
    inorder(root.left, list);  // 左
    list.push(root.val);        // 中
    inorder(root.right, list); // 右
}
```

后序遍历（左右中）：

```js
var postorder = function (root, list) {
    if (root === null) return;
    postorder(root.left, list);  // 左
    postorder(root.right, list); // 右
    list.push(root.val);        // 中
}
```

### 深度优先遍历（迭代）

前序遍历（中左右）：

```js
var preorderTraversal = function (root) {
    let res = [];
    if (root === null) return res;
    let stack = [root],
        cur = null;
    while (stack.length) {
        cur = stack.pop();
        res.push(cur.val);
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
    }
    return res;
};
```

中序遍历（左中右）：

```js
var inorderTraversal = function (root) {
    let res = [];
    if (root === null) return res;
    let stack = [];
    let cur = root;
    while (stack.length ！== 0 || cur !== null) {
        if (cur !== null) {
            stack.push(cur);
            cur = cur.left;
        } else {
            cur = stack.pop();
            res.push(cur.val);
            cur = cur.right;
        }
    }
    return res;
};
```


后序遍历（左右中）：

```js
var postorderTraversal = function (root) {
    let res = [];
    if (root === null) return res;
    let stack = [root];
    let cur = null;
    while (stack.length) {
        cur = stack.pop();
        res.push(cur.val);
        cur.left && stack.push(cur.left);
        cur.right && stack.push(cur.right);
    }
    return res.reverse()
};
```

### 广度优先遍历（队列）

```js
var levelOrder = function (root) {
    let res = [];
    if (root === null) return res;
    let queue = [root];
    while (queue.length) {
        let n = queue.length;
        let temp = [];
        for (let i = 0; i < n; i++) {
            let node = queue.shift();
            temp.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        res.push(temp);
    }
    return res;
};
```


### 二叉树深度
```js
var getDepth = function (node) {
    if (node === null) return 0;
    return 1 + Math.max(getDepth(node.left), getDepth(node.right));
}
```


### 二叉树节点数量

```js
var countNodes = function (root) {
    if (root === null) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}
```


## 回溯算法

```js
function backtracking(参数) {
    if (终止条件) {
        存放结果;
        return;
    }

    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}

```


## 并查集

```js
    let n = 1005; // 根据题意而定 
    let father = new Array(n).fill(0);

    // 并查集初始化
    function init () {
        for (int i = 0; i < n; ++i) {
            father[i] = i;
        }
    }
    // 并查集里寻根的过程
    function find (u) {
        return u === father[u] ? u : father[u] = find(father[u]);
    }
    // 将v->u 这条边加入并查集
    function join(u, v) {
        u = find(u);
        v = find(v);
        if (u === v) return ;
        father[v] = u;
    }
    // 判断 u 和 v是否找到同一个根
    function same(u, v) {
        u = find(u);
        v = find(v);
        return u === v;
    }
```

