setTimeout(() => {
    console.log("t1");
}, 0);

process.nextTick(() => {
    console.log("nt1");
});

setImmediate(() => {
    console.log("im1");
    process.nextTick(() => {
        console.log("nt3");
        setImmediate(() => {
            console.log("im2");
        });
    });
});

new Promise(resolve => {
    console.log("p1");
    resolve(2);
}).then(d => {
    console.log("d1: ", d);

    process.nextTick(() => {
        console.log("ntd1");
        new Promise(resolve => {
            console.log("d1p1");
            resolve(2);
        }).then(d2 => {
            console.log("d2: ", d2);
        });
    });

});

console.log("main");
