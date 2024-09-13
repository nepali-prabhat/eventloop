# Event loop
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
