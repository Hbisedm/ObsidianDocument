import{_ as s,c as n,o as a,d as p}from"./app.0b246d93.js";const D=JSON.parse('{"title":"JavaScript的继承","description":"","frontmatter":{"title":"JavaScript的继承","date":"2022-07-01T17:08:18.000Z","tags":["JavaScript的继承"]},"headers":[],"relativePath":"工作区/基本知识/JavaScript/JavaScript的继承.md"}'),e={name:"工作区/基本知识/JavaScript/JavaScript的继承.md"},l=p(`<p>#继承 #JavaScript</p><h1 id="javascript的继承的笔记" tabindex="-1">JavaScript的继承的笔记 <a class="header-anchor" href="#javascript的继承的笔记" aria-hidden="true">#</a></h1><p>更新：谢谢大家的支持，最近折腾了一个博客官网出来，方便大家系统阅读，后续会有更多内容和更多优化，<a href="https://link.juejin.cn/?target=https%3A%2F%2Fmuyiy.vip" title="https://muyiy.vip" target="_blank" rel="noreferrer">猛戳这里查看</a></p><p>更新：在常用七种继承方案的基础之上增加了ES6的类继承，所以现在变成八种啦。</p><p>------ 以下是正文 ------</p><h4 id="_1、原型链继承" tabindex="-1">1、原型链继承 <a class="header-anchor" href="#_1、原型链继承" aria-hidden="true">#</a></h4><p>构造函数、原型和实例之间的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个原型对象的指针。</p><p>继承的本质就是<strong>复制，即重写原型对象，代之以一个新类型的实例</strong>。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">function SuperType() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.property = true;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">SuperType.prototype.getSuperValue = function() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return this.property;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function SubType() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.subproperty = false;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 这里是关键，创建SuperType的实例，并将该实例赋值给SubType.prototype</span></span>
<span class="line"><span style="color:#A6ACCD;">SubType.prototype = new SuperType(); </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">SubType.prototype.getSubValue = function() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return this.subproperty;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">var instance = new SubType();</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(instance.getSuperValue()); // true</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/10/30/166c2c0107fd80c7~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt=""></p><p>原型链方案存在的缺点：多个实例对引用类型的操作会被篡改。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">function SuperType(){</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">function SubType(){}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">SubType.prototype = new SuperType();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">var instance1 = new SubType();</span></span>
<span class="line"><span style="color:#A6ACCD;">instance1.colors.push(&quot;black&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">alert(instance1.colors); //&quot;red,blue,green,black&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">var instance2 = new SubType(); </span></span>
<span class="line"><span style="color:#A6ACCD;">alert(instance2.colors); //&quot;red,blue,green,black&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="_2、借用构造函数继承" tabindex="-1">2、借用构造函数继承 <a class="header-anchor" href="#_2、借用构造函数继承" aria-hidden="true">#</a></h4><p>使用父类的构造函数来增强子类<strong>实例</strong>，等同于复制父类的实例给子类（不使用原型）</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">function SuperType(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.color=[&quot;red&quot;,&quot;green&quot;,&quot;blue&quot;];</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">function SubType(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    //继承自SuperType</span></span>
<span class="line"><span style="color:#A6ACCD;">    SuperType.call(this);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">var instance1 = new SubType();</span></span>
<span class="line"><span style="color:#A6ACCD;">instance1.color.push(&quot;black&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">alert(instance1.color);//&quot;red,green,blue,black&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">var instance2 = new SubType();</span></span>
<span class="line"><span style="color:#A6ACCD;">alert(instance2.color);//&quot;red,green,blue&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>核心代码是<code>SuperType.call(this)</code>，创建子类实例时调用<code>SuperType</code>构造函数，于是<code>SubType</code>的每个实例都会将SuperType中的属性复制一份。</p><p>缺点：</p><ul><li>只能继承父类的<strong>实例</strong>属性和方法，不能继承原型属性/方法</li><li>无法实现复用，每个子类都有父类实例函数的副本，影响性能</li></ul><h4 id="_3、组合继承" tabindex="-1">3、组合继承 <a class="header-anchor" href="#_3、组合继承" aria-hidden="true">#</a></h4><p>组合上述两种方法就是组合继承。用原型链实现对<strong>原型</strong>属性和方法的继承，用借用构造函数技术来实现<strong>实例</strong>属性的继承。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">function SuperType(name){</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.name = name;</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">SuperType.prototype.sayName = function(){</span></span>
<span class="line"><span style="color:#A6ACCD;">  alert(this.name);</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function SubType(name, age){</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 继承属性</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 第二次调用SuperType()</span></span>
<span class="line"><span style="color:#A6ACCD;">  SuperType.call(this, name);</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.age = age;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 继承方法</span></span>
<span class="line"><span style="color:#A6ACCD;">// 构建原型链</span></span>
<span class="line"><span style="color:#A6ACCD;">// 第一次调用SuperType()</span></span>
<span class="line"><span style="color:#A6ACCD;">SubType.prototype = new SuperType(); </span></span>
<span class="line"><span style="color:#A6ACCD;">// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType</span></span>
<span class="line"><span style="color:#A6ACCD;">SubType.prototype.constructor = SubType; </span></span>
<span class="line"><span style="color:#A6ACCD;">SubType.prototype.sayAge = function(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    alert(this.age);</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">var instance1 = new SubType(&quot;Nicholas&quot;, 29);</span></span>
<span class="line"><span style="color:#A6ACCD;">instance1.colors.push(&quot;black&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">alert(instance1.colors); //&quot;red,blue,green,black&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">instance1.sayName(); //&quot;Nicholas&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">instance1.sayAge(); //29</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">var instance2 = new SubType(&quot;Greg&quot;, 27);</span></span>
<span class="line"><span style="color:#A6ACCD;">alert(instance2.colors); //&quot;red,blue,green&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">instance2.sayName(); //&quot;Greg&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">instance2.sayAge(); //27</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/10/30/166c2c010c537ff8~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt=""></p><p>缺点：</p><ul><li>第一次调用<code>SuperType()</code>：给<code>SubType.prototype</code>写入两个属性name，color。</li><li>第二次调用<code>SuperType()</code>：给<code>instance1</code>写入两个属性name，color。</li></ul><p>实例对象<code>instance1</code>上的两个属性就屏蔽了其原型对象SubType.prototype的两个同名属性。所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。</p><h4 id="_4、原型式继承" tabindex="-1">4、原型式继承 <a class="header-anchor" href="#_4、原型式继承" aria-hidden="true">#</a></h4><p>利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">function object(obj){</span></span>
<span class="line"><span style="color:#A6ACCD;">  function F(){}</span></span>
<span class="line"><span style="color:#A6ACCD;">  F.prototype = obj;</span></span>
<span class="line"><span style="color:#A6ACCD;">  return new F();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>object()对传入其中的对象执行了一次<code>浅复制</code>，将构造函数F的原型直接指向传入的对象。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">var person = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: &quot;Nicholas&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  friends: [&quot;Shelby&quot;, &quot;Court&quot;, &quot;Van&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">var anotherPerson = object(person);</span></span>
<span class="line"><span style="color:#A6ACCD;">anotherPerson.name = &quot;Greg&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">anotherPerson.friends.push(&quot;Rob&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">var yetAnotherPerson = object(person);</span></span>
<span class="line"><span style="color:#A6ACCD;">yetAnotherPerson.name = &quot;Linda&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">yetAnotherPerson.friends.push(&quot;Barbie&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">alert(person.friends);   //&quot;Shelby,Court,Van,Rob,Barbie&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>缺点：</p><ul><li>原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。</li><li>无法传递参数</li></ul><p>另外，ES5中存在<code>Object.create()</code>的方法，能够代替上面的object方法。</p><h4 id="_5、寄生式继承" tabindex="-1">5、寄生式继承 <a class="header-anchor" href="#_5、寄生式继承" aria-hidden="true">#</a></h4><p>核心：在原型式继承的基础上，增强对象，返回构造函数</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">function createAnother(original){</span></span>
<span class="line"><span style="color:#A6ACCD;">  var clone = object(original); // 通过调用 object() 函数创建一个新对象</span></span>
<span class="line"><span style="color:#A6ACCD;">  clone.sayHi = function(){  // 以某种方式来增强对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    alert(&quot;hi&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  };</span></span>
<span class="line"><span style="color:#A6ACCD;">  return clone; // 返回这个对象</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>函数的主要作用是为构造函数新增属性和方法，以<strong>增强函数</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">var person = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: &quot;Nicholas&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  friends: [&quot;Shelby&quot;, &quot;Court&quot;, &quot;Van&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">var anotherPerson = createAnother(person);</span></span>
<span class="line"><span style="color:#A6ACCD;">anotherPerson.sayHi(); //&quot;hi&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>缺点（同原型式继承）：</p><ul><li>原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。</li><li>无法传递参数</li></ul><h4 id="_6、寄生组合式继承" tabindex="-1">6、寄生组合式继承 <a class="header-anchor" href="#_6、寄生组合式继承" aria-hidden="true">#</a></h4><p>结合借用构造函数传递参数和寄生模式实现继承</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">function inheritPrototype(subType, superType){</span></span>
<span class="line"><span style="color:#A6ACCD;">  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本</span></span>
<span class="line"><span style="color:#A6ACCD;">  prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性</span></span>
<span class="line"><span style="color:#A6ACCD;">  subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 父类初始化实例属性和原型属性</span></span>
<span class="line"><span style="color:#A6ACCD;">function SuperType(name){</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.name = name;</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.colors = [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;];</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">SuperType.prototype.sayName = function(){</span></span>
<span class="line"><span style="color:#A6ACCD;">  alert(this.name);</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）</span></span>
<span class="line"><span style="color:#A6ACCD;">function SubType(name, age){</span></span>
<span class="line"><span style="color:#A6ACCD;">  SuperType.call(this, name);</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.age = age;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 将父类原型指向子类</span></span>
<span class="line"><span style="color:#A6ACCD;">inheritPrototype(SubType, SuperType);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 新增子类原型属性</span></span>
<span class="line"><span style="color:#A6ACCD;">SubType.prototype.sayAge = function(){</span></span>
<span class="line"><span style="color:#A6ACCD;">  alert(this.age);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">var instance1 = new SubType(&quot;xyc&quot;, 23);</span></span>
<span class="line"><span style="color:#A6ACCD;">var instance2 = new SubType(&quot;lxy&quot;, 23);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">instance1.colors.push(&quot;2&quot;); // [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;, &quot;2&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">instance1.colors.push(&quot;3&quot;); // [&quot;red&quot;, &quot;blue&quot;, &quot;green&quot;, &quot;3&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/10/30/166c2c0109df5438~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt=""></p><p>这个例子的高效率体现在它只调用了一次<code>SuperType</code> 构造函数，并且因此避免了在<code>SubType.prototype</code> 上创建不必要的、多余的属性。于此同时，原型链还能保持不变；因此，还能够正常使用<code>instanceof</code> 和<code>isPrototypeOf()</code></p><p><strong>这是最成熟的方法，也是现在库实现的方法</strong></p><h4 id="_7、混入方式继承多个对象" tabindex="-1">7、混入方式继承多个对象 <a class="header-anchor" href="#_7、混入方式继承多个对象" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">function MyClass() {</span></span>
<span class="line"><span style="color:#A6ACCD;">     SuperClass.call(this);</span></span>
<span class="line"><span style="color:#A6ACCD;">     OtherSuperClass.call(this);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 继承一个类</span></span>
<span class="line"><span style="color:#A6ACCD;">MyClass.prototype = Object.create(SuperClass.prototype);</span></span>
<span class="line"><span style="color:#A6ACCD;">// 混合其它</span></span>
<span class="line"><span style="color:#A6ACCD;">Object.assign(MyClass.prototype, OtherSuperClass.prototype);</span></span>
<span class="line"><span style="color:#A6ACCD;">// 重新指定constructor</span></span>
<span class="line"><span style="color:#A6ACCD;">MyClass.prototype.constructor = MyClass;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">MyClass.prototype.myMethod = function() {</span></span>
<span class="line"><span style="color:#A6ACCD;">     // do something</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><code>Object.assign</code>会把 <code>OtherSuperClass</code>原型上的函数拷贝到 <code>MyClass</code>原型上，使 MyClass 的所有实例都可用 OtherSuperClass 的方法。</p><h4 id="_8、es6类继承extends" tabindex="-1">8、ES6类继承extends <a class="header-anchor" href="#_8、es6类继承extends" aria-hidden="true">#</a></h4><p><code>extends</code>关键字主要用于类声明或者类表达式中，以创建一个类，该类是另一个类的子类。其中<code>constructor</code>表示构造函数，一个类中只能有一个构造函数，有多个会报出<code>SyntaxError</code>错误,如果没有显式指定构造方法，则会添加默认的 <code>constructor</code>方法，使用例子如下。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">class Rectangle {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // constructor</span></span>
<span class="line"><span style="color:#A6ACCD;">    constructor(height, width) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.height = height;</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.width = width;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    // Getter</span></span>
<span class="line"><span style="color:#A6ACCD;">    get area() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return this.calcArea()</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    // Method</span></span>
<span class="line"><span style="color:#A6ACCD;">    calcArea() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return this.height * this.width;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const rectangle = new Rectangle(10, 20);</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(rectangle.area);</span></span>
<span class="line"><span style="color:#A6ACCD;">// 输出 200</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">-----------------------------------------------------------------</span></span>
<span class="line"><span style="color:#A6ACCD;">// 继承</span></span>
<span class="line"><span style="color:#A6ACCD;">class Square extends Rectangle {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  constructor(length) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    super(length, length);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.name = &#39;Square&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  get area() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return this.height * this.width;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const square = new Square(10);</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(square.area);</span></span>
<span class="line"><span style="color:#A6ACCD;">// 输出 100</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><code>extends</code>继承的核心代码如下，其实现和上述的寄生组合式继承方式一样</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">function _inherits(subType, superType) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    // 创建对象，创建父类原型的一个副本</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 增强对象，弥补因重写原型而失去的默认的constructor 属性</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 指定对象，将新创建的对象赋值给子类的原型</span></span>
<span class="line"><span style="color:#A6ACCD;">    subType.prototype = Object.create(superType &amp;&amp; superType.prototype, {</span></span>
<span class="line"><span style="color:#A6ACCD;">        constructor: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            value: subType,</span></span>
<span class="line"><span style="color:#A6ACCD;">            enumerable: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">            writable: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">            configurable: true</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    });</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    if (superType) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        Object.setPrototypeOf </span></span>
<span class="line"><span style="color:#A6ACCD;">            ? Object.setPrototypeOf(subType, superType) </span></span>
<span class="line"><span style="color:#A6ACCD;">            : subType.__proto__ = superType;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-hidden="true">#</a></h4><p>1、函数声明和类声明的区别</p><p>函数声明会提升，类声明不会。首先需要声明你的类，然后访问它，否则像下面的代码会抛出一个ReferenceError。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">let p = new Rectangle(); </span></span>
<span class="line"><span style="color:#A6ACCD;">// ReferenceError</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Rectangle {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>2、ES5继承和ES6继承的区别</p><ul><li><p>ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.call(this)）.</p></li><li><p>ES6的继承有所不同，实质上是先创建父类的实例对象this，然后再用子类的构造函数修改this。因为子类没有自己的this对象，所以必须先调用父类的super()方法，否则新建实例报错。</p></li></ul><blockquote><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000011917606" title="https://segmentfault.com/a/1190000011917606" target="_blank" rel="noreferrer">《javascript高级程序设计》笔记：继承</a><br><a href="https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2Fcreate" title="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create" target="_blank" rel="noreferrer">MDN之Object.create()</a><br><a href="https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FClasses" title="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes" target="_blank" rel="noreferrer">MDN之Class</a></p></blockquote><h4 id="交流" tabindex="-1">交流 <a class="header-anchor" href="#交流" aria-hidden="true">#</a></h4><p>本人Github链接如下，欢迎各位Star</p><p><a href="https://link.juejin.cn/?target=http%3A%2F%2Fgithub.com%2Fyygmind%2Fblog" title="http://github.com/yygmind/blog" target="_blank" rel="noreferrer">github.com/yygmind/blo…</a></p><p>我是木易杨，网易高级前端工程师，跟着我每周重点攻克一个前端面试重难点。接下来让我带你走进高级前端的世界，在进阶的路上，共勉！</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/17/167212b58a521ead~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp" alt=""></p><h1 id="总结-寄生组合" tabindex="-1">总结 寄生组合 <a class="header-anchor" href="#总结-寄生组合" aria-hidden="true">#</a></h1><p>寄生组合（有点难理解）</p><p>使用<code>Object.create</code>创建父类原型对应的实例A<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create" target="_blank" rel="noreferrer">object.create</a>创建的目的是，让父类的实例属性不会过多的创建，浪费空间。 父类的实例成员使用call进行复制实例属性到子类中 然后修改子类原型的construct的指向子类，也就是上面的实例A。目的是让它走正常的对象原型链的走向。 然后修改子类的原型的指向，目的是继承。 然后写父类原型的函数 最后new 子类就可以了</p>`,69),o=[l];function t(c,r,i,C,A,y){return a(),n("div",null,o)}const d=s(e,[["render",t]]);export{D as __pageData,d as default};
