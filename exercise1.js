import {console} from "./utils/index.js";

setImmediate(()=>{
    console.log("immediate")
})

setTimeout(()=>{
    console.log("timeout")
}, 0)


process.nextTick(()=>{
    console.log("nt1")
})

new Promise((res)=>res(1)).then(() => {
  console.log('Microtasks: Promise');
});

console.log("main");
