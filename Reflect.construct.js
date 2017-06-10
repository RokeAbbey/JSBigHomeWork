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

