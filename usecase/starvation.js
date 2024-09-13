async function main() {
    const dataLength = 10;
    let chunkSize = 2;

    const data = Array(dataLength)
        .fill(0)
        .map((_, i) => i);

    function rec() {
        // process the chunk
        if (data.length) {
                callExternalApi(data.splice(0, chunkSize));
        }
    }

    function callExternalApi(data) {
        console.log("calling: ", data);
        rec()
    }

    rec();

    let p = Array(10).fill(0).map((_, i) => {
        return new Promise(resolve => {
            resolve(i);
        }).then(console.log);
    });
    await Promise.all(p);

}

main();
