var Vector = function(x,y){
    this.x = x;
    this.y = y;
};
Vector.prototype.plus = function(x,y){
    if(arguments.length === 2)
        return new Vector(this.x + x,this.y + y);
    if(arguments.length === 1)
        return new Vector(this.x + x.x,this.y + x.y);
};
Vector.prototype.toString = function(){
    return "Vector["+this.x+","+this.y+"]";
}
var directions = {
    n   :   new Vector(0,-1),
    s   :   new Vector(0,1),
    w   :   new Vector(-1,0),
    e   :   new Vector(1,0),
    nw  :   new Vector(-1,-1),
    ne  :   new Vector(1,-1),
    sw  :   new Vector(-1,1),
    se  :   new Vector(1,1)
};
var directionsMap = ["n","ne","e","se","s","sw","w","nw"];
//生物
var Critter = function(position){
    if(position)
        this.position = this.position
    else
        this.position = randomBirthInSpace();
    // this.actions = {
    //     "move":function(){

    //     }
    // };
};
Critter.prototype.getAction = function(action){
    return this.actions[action];
};
Critter.prototype.actions = {
    "move":function(){

    }
};
Critter.randomBirthInSpace = function(){

};
//食草动物
var Herbivore = function(){

};
Herbivore.prototype = new Critter();
Herbivore.prototype.actions = {
    "eat":function(){

    },
    
};
//食肉动物
var Predator = function(){
    
}
Predator.prototype = new Critter();
Predator.prototype.actions = {
    "eat" : function(){
        
    },
};
//狮子
var Lion = function(){

};
Lion.prototype = new Predator();
Lion.prototype.actions = {
    "eat" : function(){

    }
};
//非生物
var UnCritter = function(type,actions){
    this.type = type;
    this.actions = actions;
};


Wall.prototype = new UnCritter();

var raceMap = {
    "h" :  Herbivore,//herbivore食草动物
    "H" :  Herbivore,
    "l" :  Lion,
    "L" :  Lion, 
};
var World = function(map){

    this.grid = null;
};
