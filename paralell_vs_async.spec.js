/*
    Paralell vs Async

    Paralell is expressed through threads, queues of actions that can be executed at once

    Asynchronicity - programming on a single thread. At any given moment, 
    there is only one js line running. Web Workers are trying to change that, but this is not a JS
    thing, its Browsers thing. They communicate through asynchronous events. 
    Functionally its separate thread, but cannot communicate in a threaded fashion,
    need to communicate through event loop in a sync fashion.

    Concurrency - 
*/