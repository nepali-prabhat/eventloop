// user has uploaded csv in our file field
// the csv is stored in s3 bucket
//
//
// When user presses a button in out UI.
// we want to download the csv file in our api-server
// we want to calculate the value of total_budget from  the csv file
// and store it in another field /give api response
// 




(req, res, next)=>{
    // download file 
    const fileData = fs.readFile("./data.csv"); // 10,000

    let total_budget = 0;
    function rec(){
        if (fileData.length) {
            setImmediate(()=>{
                total_budget += calcuate_total_budget(fileData.splice(1000)); // compute heavy
                rec();
            })
        }
    }
    rec();
    // const total_budget = calcuate_total_budget(fileData); // compute heavy
    // we don't want to starve other resources

    res.send(total_budget);
}



chunks = 1000
current_chunk_index = 1 // 1000 -> 2000
new Promise((res)=>fs.readFile("./data.csv")).then(() => {
  console.log('Microtasks: Promise');
    // 10,000
    setImmediate(()=>{
        // call the expensive compute function
        // to process the current chunk
    });
});











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
