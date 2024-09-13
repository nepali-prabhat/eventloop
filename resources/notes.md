## Phases of event loop
NOTE: simplified. Refer to this for detailed explanation https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
The event loop in LIBUV operates in four major phases:

## Timers Phase: 
In this phase, all callbacks that were set using *setTimeout*
or *setInterval* are executed. These timers are checked, and
if their time has expired, their corresponding callbacks are
added to the callback queue for execution.

## Pending callbacks
For some system operations such as types of TCP errors.


## Poll Phase
After timers, the event loop enters the Poll phase, where
it handles *I/O callbacks*. For instance, when
you perform a file read operation using fs.readFile , the callback
associated with this I/O operation will be executed in this phase.
The Poll phase is responsible for handling all I/O-related tasks,
making it one of the most important phases in the event loop.

## Check Phase
Next is the Check phase, where callbacks scheduled by the
*setImmediate* function are executed. This utility API allows
you to execute callbacks immediately after the Poll phase,
giving you more control over the order of operations.

## Close Callbacks Phase
Finally, in the Close Callbacks phase, any callbacks associated
with closing operations, such as socket closures, are handled.
This phase is typically used for cleanup tasks, ensuring that resources
are properly released.
