import { URL } from "node:url";
import { readFile } from "fs";
const cache = {};

//Reads file either from file system or cache
function zalgoRead(fileName, cb) {
    const file = cache[fileName];
    if (file) {
        console.log("reading from cache");
        cb(null, file);
    } else {
        readFile(fileName, (err, data) => {
            if (err) {
                return cb(err);
            }
            cache[fileName] = data;
            cb(err, data);
        });
    }
}

//reads files, data can be retrieved by adding listeners to returned object, eg. reader('test.txt').addListener(listenerFunc)
function reader(filename) {
    const listeners = [];

    zalgoRead(filename, (err, data) => {
        console.log("data came to callback. Num of listeners:", listeners.length);
        listeners.forEach(listener => listener(err, data));
    });

    const addListener = listener => {
        console.log("adding listener. Current listener count: ", listeners.length);
        listeners.push(listener);
    };

    return {
        addListener,
    };
}

const dataFile = new URL("./data.txt", import.meta.url);
const readerHandler = reader(dataFile);
readerHandler.addListener((err, data) => {
    console.log(`First read: ${data}`);
});

