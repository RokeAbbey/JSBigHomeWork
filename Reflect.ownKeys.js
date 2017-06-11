var sym1 = Symbol.for("hello");
var sym2 = Symbol.for("idiot");
console.log(Reflect.ownKeys({'abc':1,'0':1,'9':1,'6':1,'10':1,'qqq':1,'bcd':1,[sym1]:1,[sym2]:1}));

