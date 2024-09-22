import {console} from "../utils.js";

setImmediate(()=>{
    console.log("immediate")
})

setTimeout(()=>{
    console.log("timeout")
}, 0)


process.nextTick(()=>{
    console.log("nt1")
})

console.log("main");
