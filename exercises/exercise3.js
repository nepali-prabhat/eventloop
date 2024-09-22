import {console} from "../utils.js";

setImmediate(() => {
    console.log("si1");
});
setTimeout(() => {
    console.log("si2");
    process.nextTick(() => {
        console.log("nt");
    });
    new Promise(res => {
        console.log("res");
        res();
    }).then(() => console.log("pr"));
    Promise.resolve().then(() => console.log("pr2"));
    setImmediate(() => {
        console.log("si4");
    });
    setTimeout(() => {
        console.log("st");
    }, 0);
}, 0);
setImmediate(() => {
    console.log("si3");
});
