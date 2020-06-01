/*
    Generators
    Normal functions have RUN TO COMPLETION semancic.
    Once it started running, it will till the end. Only one active function is executed at a time.

    Generators do not run into completion. It is a syntactic sugar to state machine.
    Yield - pauses in mid frame. And later we come back and starts off from the point was paused.
    Its stopped indefinitely, as long as someone comes and resumes. Its local block.
*/

function* gen() {
	console.log('Hello');
	yield;
	console.log('World');
}

test('Yield keyword', () => {
	var it = gen(); // none of the generator runs. No code runs here. It produces an iterator
	it.next();
	it.next();
});

// yield with a value
function* main() {
	yield 1;
	yield 2;
	yield 3;
	return 4; // return completes the generator
}

test('yield with a value', () => {
	var it = main();

	var a = it.next();
	var b = it.next();
	var c = it.next();

	var d = it.next();

	console.log(a, b, c, d);
});

// ES6 added FOR OF loop. It was designed for iterators

// when we call next method, we can pass some value it

// a helper
function coroutine(g) {
	var it = g();
	return function () {
		return it.next.apply(it, arguments);
	};
}

var run = coroutine(function* () {
	var x = 1 + (yield);
	var y = 1 + (yield);
	yield x + y;
});

test('passing a value in', () => {
	run();
	run(10);
	console.log('Meaning of life' + run(30).value);
});

/*
    In generators WHILE TRUE is perfectly valid solution
*/

// with AJAX call

function getData(d) {
	setTimeout(function () {
		run2(d);
	});
}

var run2 = coroutine(function* () {
	var x = 1 + (yield getData(10));
	var y = 1 + (yield getData(30));
	var answer = yield getData('Meaning of life: ' + (x + y));
	console.log(answer);
});

jest.useFakeTimers();

test('With async call', () => {
	run2();
	jest.runAllTimers();
});

/*
    above we have synchronously looking asynchronous code
*/
