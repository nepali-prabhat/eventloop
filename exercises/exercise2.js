import {console} from "../utils.js";

setTimeout(() => {
    console.log("t1");
}, 0);

setImmediate(() => {
    console.log("im1");
    setImmediate(() => {
        console.log("im2");
    });
});

console.log("main");
