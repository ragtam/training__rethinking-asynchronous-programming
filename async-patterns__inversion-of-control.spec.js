// line 1
setTimeout(function () {
	// line 3
	// line 4
}, 1000);
// line 2

/*
    First half: line 1 and 2 we are in control. Second part executes in callback,
    its gives setTimeout (when and if) full control over callback function.

    When we pass in a function as a callback, we need to trust that the callback will be executed
    and that it will be executed only once. Like in setTimeout. 
    But what if it does not? 
    For instance, 
    there is some function traceCheckout, that accepts callback to make a purchase and charge credit card
    What if it charges card several times? We have no control over that.

    With callback we need to trust that callback will be executed:
    - not too early, not too late
    - not too many times, not too few times
    - not to lose context
    - not to swallow errors

    How to secure ourselves from trust issues? 
    Callback has no solution for that
*/
