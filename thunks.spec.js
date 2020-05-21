/*
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

test('add', function () {
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

var thunk = function (cb) {
	addAsync(10, 15, cb);
};

thunk(function (sum) {
	console.log(sum);
});
