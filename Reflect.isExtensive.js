var empty = {};
Reflect.isExtensible(empty); // === true 

// ...but that can be changed. 
Reflect.preventExtensions(empty); 
Reflect.isExtensible(empty); // === false 
empty.a = 1;
console.log(empty.a);//undefined

// Sealed objects are by definition non-extensible. 
var sealed = Object.seal({}); 
Reflect.isExtensible(sealed); // === false 

// Frozen objects are also by definition non-extensible. 
var frozen = Object.freeze({}); 
Reflect.isExtensible(frozen); // === false
