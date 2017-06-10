function* generate(){
    // console.log("line 2");
    for(var i = 0;i <= 3;i++)
        try{
            var a = 0;
            console.log("i = "+i+",line 5");
            a = yield i;
            console.log("a = "+a);
        }catch(e){
            console.log("catch : a = "+a);
            console.log("error occur!!!");
            console.log("message : "+e.message);
        }
}
var a = generate();
var obj = null;
// while((obj = a.next()) && !(obj.done)){
//     console.log(obj+" "+obj.value);
// }
obj = a.next();
console.log(obj.value);
var r = a.throw(new Error("aaa"));
console.log("r.value = "+r.value+",r.done = "+r.done);
a.next();