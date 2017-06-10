var Person = function(){
};
var P = new Proxy(Person,{
    construct : function(target,args,newTarget){
        target["name"] = args[0];
        target["age"] = args[1];
        target["sex"] = args[2]?args[2]:"male";
        return target;
    }
});
var p = new Proxy(new P("roke",18),{
    get : function(target,name,newTarget){
        return target[name]+"  getMethod";
    },
    set : function(target,name,newTarget){
        
        return target[name];
    },
    deleteProperty : function(target,field){
        console.log("target."+field+" = "+target[field]);
        delete target[field];
        return true;
    }
});
console.log(delete p.age);
console.log(p.age);
// console.log(p.age);