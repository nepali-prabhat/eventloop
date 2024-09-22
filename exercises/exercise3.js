import { console } from "../utils.js";

setImmediate(() => {
    console.log("si1");
});

setTimeout(() => {
    console.log("st0");

    setTimeout(() => {
        console.log("st1");
    }, 0);


    // process.nextTick(()=>{console.log("pnt")})
    // new Promise(res=>res()).then(()=>console.log("promise"))
    setImmediate(()=>{
        console.log("immediateeeeee")
    })

}, 0);

setImmediate(() => {
    console.log("si3");
});
