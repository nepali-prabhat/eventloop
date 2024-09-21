# Event loop
under progress...

## How to run
- exercise1.js , exercise2.js, etc files contain code you want
to evaluate nodejs event loop for.
- Run `node exercise1.js` file. It creates `data.json` file.
    - It also prints stuff on the console
- `npm run dev` runs a simple http server that reads data.json and shows a graph visualization
    - You can run this server in the background. But, when data.json file is updated, you need to reload website.

## Plan of attack
Structure:
1. read theory (x)
2. practise coding examples (x)
3. go through real world usecase


concurrency
- multi threaded (green threads)
  - worker threads -> cpu intensive tasks
- asynchronrous -> single threaded
  - I/O bound 
  - less cpu intensive

parallelism
- used when we have to cpu intensive tasks
synchronous


a program is running on a single thread 
that program is managing the context switching between tasks
(under the hood, the signle threaded program could make new threads)

context switching handle -> event loop. 
