var Person = new Proxy(function(name,age,sex){
        this.name = name;
        this.age = age;
        this.sex = sex;
    },
    {
    construct : function(target,args,newTarget){
        console.log(target);
        var obj = Object.create(target.prototype);
        // target.apply(obj,args);
        Reflect.apply(target,obj,args);
        // console.log("finish construct : "+target);
        return obj;
    }
});
var person = new Proxy(new Person("roke",18,"male"),{
    get : function(target,index){
        return target[index];//+" : get from Proxy";
    },
    set : function(target,index,value){
        if(index === "age")
            console.log("sorry, the age field is immutable!"); 
        else
            target[index] = value;
    }
});
console.log("man infomation : "+Reflect.get(person,"name")
                +" "+Reflect.get(person,"age")
                +" "+Reflect.get(person,"sex"));
Reflect.set(person,"age",15);
console.log("age = "+Reflect.get(person,"age"));

Reflect.defineProperty(person,"stature",{
        value:"180cm",
        writable : false,
        enumerable : false
    });
console.log(Reflect.get(person,"stature"));//180cm
console.log(Reflect.set(person,"stature","190cm"));//false
console.log(Reflect.get(person,"stature"));//180cm
console.log("*********************");
for(var field in person)
    console.log(person[field]);//roke
                                // 18
                                // male  note : 180cm(stature is gone due to the 'false' 'emummerable' )


