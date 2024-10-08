# Event loop

![alt text](https://github.com/nepali-prabhat/eventloop/blob/main/resources/banner.png?raw=true)

## How to run

-   exercises folder contains code you want to evaluate nodejs event loop for.
-   Running exercises create `data.json` and log files in the outputs folder
    -   It also prints stuff on the console
-   `npm run start` runs a simple http server that reads data.json and shows a graph visualization
    -   You can run this server in the background. But, when data.json file is updated, you need to reload website.

NOTE: the async types in `utils/discardedTypes.js` array is ignored.
`FSREQCALLBACK` is put there by default because `utils/console.js` uses fs module and
pollutes the generated graph. While testing fs module, remove that value from the discardedTypes array and see the behavior.

## Screenshots

![alt text](https://github.com/nepali-prabhat/eventloop/blob/main/resources/graph.png?raw=true)
![alt text](https://github.com/nepali-prabhat/eventloop/blob/main/resources/code_preview.png?raw=true)
![alt text](https://github.com/nepali-prabhat/eventloop/blob/main/resources/terminal_output.png?raw=true)
