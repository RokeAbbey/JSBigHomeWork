var obj = {};
Reflect.defineProperty(obj,"name",{value:"roke",configurable : false});
console.log(obj.name);
console.log(Reflect.deleteProperty(obj,"name"));
console.log(obj.name);