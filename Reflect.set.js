var person = new Proxy({
    name : "roke",
    age  : 18
},{
    set:function(target,field,value,receiver){
        if(receiver)
            receiver[field] = value;
        else
            target[field] = value;
    }
});
var p2 = {};
Reflect.set(person,"age",20,null);
console.log(person.age);
console.log(p2.age);

Reflect.set(person,"age",22,p2);
console.log(person.age);
console.log(p2.age);
