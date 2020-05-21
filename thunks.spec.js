/*
    THIS DOES NOT SOLVE CALLBACKS PROBLEMS, PROMISE WILL DO IT

    Thunk - a function that has already that it needs to do to pass it a value back.
    Usually a closure to remember the values.
*/

function add(x, y) {
	return x + y;
}
// synchronous thunk
var thunk = function () {
	return add(10, 15);
};

test('add', () => {
	var x = thunk();

	expect(x).toEqual(25);
});

/*
    If called over and over, the thunk is going to return exactly the same values.
    It is a container that wraps a state. 
    We can pass it around and when we need we just execute the thunk.
    That is the conceptual underpinning for what the promise is.
*/

// Asynchronous thunk is a function that accepts a callback only to get the value out

function addAsync(x, y, cb) {
	setTimeout(function () {
		cb(x + y);
	}, 1000);
}

var thunkAsync = function (cb) {
	addAsync(10, 15, cb);
};

jest.useFakeTimers();
test('thunk async', function () {
	var res = 0;
	thunkAsync(function (sum) {
		res = sum;
	});

	jest.runAllTimers();

	expect(res).toEqual(25);
});

/*
    By wrapping a state inside, we normalized time out of the equation. We take time out of equation.

    TIME IS THE MOST COMPLEX FACTOR OF STATE in your programme.

    LAZY thunk, does not do the work until we call it
    ACTIVE thunk, does the job on the creation
*/
