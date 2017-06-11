// <co>
    // var co = getGenerator =>{
    //     var g = getGenerator();
    //     var obj = null;
    //     while((obj = g.next()) && !(obj.done));
    //     // return g;
    // };
    // co(function* mGenerator(){
    //     yield console.log("roke!!");
    //     yield Promise.resolve("good morning").then(v => console.log(v)).then(()=>console.log("finish!!!"));
    //     yield console.log(" I love you");
    // });
    // the right answer  
    // var co = (getGenerator) =>{
    //     var g = getGenerator();
    //     var item = g.next();
    //     item.value.then(function callback(v){
    //         item = g.next();
    //         if(item.done)
    //             return;
    //         item.value.then(callback);
    //     });
    // };
    // var mGenerator = function*(){
    //     yield Promise.resolve("hello,").then(v => console.log(v));
    //     yield Promise.resolve("roke").then(v => console.log(v));
    //     yield Promise.resolve("Can you fuck me ?").then(v => console.log(v));
    // };
    // co(mGenerator);
// </co>

// <async-await>
    // require('babel-core/register');
    var sleep = cd => {
        return new Promise((resolve,reject)=>{
            console.log("start sleep");
            setTimeout(resolve,cd);
            console.log("finish sleep");
        });
    };
    async function execute(){
        console.log("start");
        await sleep(3000);
        // await new function(){
        //     setTimeout(()=>console.log("sleep"),3000);
        // };
        console.log("end");
    };
    execute();
// </async-await>


