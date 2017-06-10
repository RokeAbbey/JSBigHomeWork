# Reflect
    reflect 是一个提供各种方法对javascript的各项操作进行拦截的內建对象。其提供的方法与proxy.handler中提供的方法类似。
    然而与proxy不同的是，reflect并不是一个函数对象
##  描述
    与众多的全局对象不同，Reflect并不是一个构造函数。因此你不可以使用new操作来创建一个对象或者通过Reflect的对象来使用Reflect.在Reflect中，所有的方法以及操作都是静态的（类似与Math）
##  方法
    Reflect提供了一系列的静态方法，这些方法与proxy的handler中涉及的方法相当的类似。有些方法与Object中提供的方法是一致的。
### Reflect.apply(target,thisArgument,argumentsList)
#### 参数列表：
**target**

    目标函数对象
**thisArgument**

    this指针,用于替换target函数中的this
**argumentsList**

    此参数是一个由target各个参数组成的数组

#### 返回值
    返回target函数执行的结果，其中target函数在执行时所有的参数参考argumentsList,并且函数中的this指针被替换为thisArgument
#### Exception
    如果target不是callable的（也就是不能被apply 以及 call的），那么就会抛出异常
#### 例子
``` javascript
    Reflect.apply(Math.floor,undefine,[1.75]) ;
    // 1
    Reflect.apply(String.fromCharCode,undefine,[104,101,108,108,111]);
    // hello
    Reflect.apply(RegExp.prototype.exec,/abc/,"hello abc").index;
    //6
```
### Reflect.construct
    Reflect.construct所做的工作与new操作类似
#### 参数表
**target** 
    
    将要调用的目标函数，一般是一个构造函数

**argumentsList**
    
    是一个类数组的对象，包含的是target函数的参数表
**newTarget**
    与new.target类似，new.target是这个对象的类
#### 返回值
    返回一个由target构造的对象。
#### Exception
    当target或者newTarget不是构造函数的时候

#### 例子
#####  eg1:
``` javascript
    var d = Reflect.construct(Date，[1776, 6, 4]);
    d instanceof Date; // true
    d.getFullYear(); // 1776
```
##### eg2:
``` javascript
var Person = new Proxy(function(name,age){
        this.name = name;
        this.age = age;
    },
    {
        construct : function(target,args,newTarget){
            var obj = {};
            newTarget.apply(obj,args);/****1*****/
            return obj;
        }
    }
);
var Student = function (name,age,studentID){
    this.name = name;
    this.age = age;
    this.studentID = studentID;
};
var p = Reflect.construct(Person,["roke",18,"3140xxxx"],Student);
console.log(p.studentID);// log 3140xxxx
                        // you would get 'undifine' with 'target.apply(.....)' in comments 1
```

### Reflect.defineProperty
    此方法与Object.defineProperty 相当类似，除了他的返回值是Boolean之外（Object.defineProperty返回obj）
#### 参数表
**target**
    
    被定义属性的目标对象
**propertyKey**

    属性名

**attributes**

    属性值（是一个descriptor）

#### 返回值
    返回一个boolean值，true表示定义属性成功，反之为false.
#### Exception
    当target不是一个对象的时候抛出TypeError异常
#### 描述
    Reflect.defineProperty方法允许精确添加一个可修改与否的属性到一个对象上（target），他的使用可以参考Object.defineProperty(两者极其类似)
#### 例子
``` javascript
    var obj = {};
    Reflect.defineProperty(obj, 'x', {value: 7}); // true
    obj.x; // 7
```
### Reflect.deleteProperty
#### 方法签名
    Reflect.deleteProperty(target, propertyKey)
#### 参数表
**target**

    需要删除属性的目标对象
**propertyKey**

    目的属性的属性名称
#### 返回值
    返回Boolean值，如果为true则属性成功删除，反之删除失败。
#### 例子
##### eg1:
``` javascript
    var obj = { x: 1, y: 2 };
Reflect.deleteProperty(obj, 'x'); // true
obj; // { y: 2 }

var arr = [1, 2, 3, 4, 5];
Reflect.deleteProperty(arr, '3'); // true
arr; // [1, 2, 3, , 5]

// Returns true if no such property exists
Reflect.deleteProperty({}, 'foo'); // true

// Returns false if a property is unconfigurable
Reflect.deleteProperty(Object.freeze({foo: 1}), 'foo'); // false 注意 Object.freeze 将传入的对象冻结，返回冻结后的对象。冻结后的对象无法修改（删除）属性

```
##### eg2:
``` javascript
    var obj = {};
    Reflect.defineProperty(obj,"name",{value:"roke",configurable : false});
    console.log(obj.name);//roke
    console.log(Reflect.deleteProperty(obj,"name"));//false
    console.log(obj.name);//roke
```

### Reflect.get
#### 方法签名
    Reflect.get(target, propertyKey[, receiver])
#### 参数表
**target**
    目标对象
**propertyKey**
    对象的属性名
**receiver**
    第三个参数会替换掉get中的this指针
#### 返回值
    返回target中属性为foo的值（如果被proxy拦截的话以拦截后返回的值为准）
#### 例子
##### eg1:
``` javascript
    var Reflect = require('harmony-reflect');
    var obj = {
        "foo" : 1,
        get bar() {
            return this.foo;
        }
    };
    var foo = {};
    foo.foo = "heheda";
    console.log(Reflect.get(obj, "bar", foo));
```
##### eg2:
``` javascript
    // Object
    var obj = { x: 1, y: 2 };
    Reflect.get(obj, 'x'); // 1

    // Array
    Reflect.get(['zero', 'one'], 1); // "one"

    // Proxy with a get handler
    var x = {p: 1};
    var obj = new Proxy(x, {
    get(t, k, r) { return k + 'bar'; }
    });
    Reflect.get(obj, 'foo'); // "foobar"
```
