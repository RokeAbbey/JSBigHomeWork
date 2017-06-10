var a = {};
var p = new Proxy(a,{
    get :function get(target,name){
        return name in target ?target[name]:"you are idiot";
    },
    set :function set(target,name,value){
        // target[name] = value;
        a[name] = value+" can I f you?";
    }
});
p.a = 1;
p.b = undefined;
console.log("p.a = "+p.a+",p.b = "+p.b+" ,a.a = "+a.a+" ,a.b = "+a.b);
console.log("p.c = "+p.c+", a.c = "+a.c);
p.c = 3;
console.log("p.c = "+p.c+", a.c = "+a.c);