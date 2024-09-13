## Phases of event loop
https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick

Callbacks deferred with process.nextTick() run before any other I/O event is fired
    - with setImmediate(), the execution is queued behind any I/O event that is already in the queue


Since process.nextTick() runs before any already scheduled I/O, it might cause I/O starvation under certain circumstances (for example: a recursive invocation)
    - this can never happen with setImmediate()
