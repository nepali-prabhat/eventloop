import chalk from "chalk";
import "./hook.js";

function log(args) {
    console.log(chalk.green(args));
}

log("start");

setImmediate(() => {
    log("LOG: Immediate");
});

setTimeout(() => {
    log("LOG: setTimeout");
}, 0);

process.nextTick(() => {
    log("LOG: next tick");
});

process.nextTick(() => {
    log("LOG: next tick 2");
});

log("end");
