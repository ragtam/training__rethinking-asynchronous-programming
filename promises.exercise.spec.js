function fakeAjax(url, cb) {
	var fake_responses = {
		file1: 'the first text',
		file2: 'the middle text',
		file3: 'the last text',
	};
	var randomDelay = Math.round(Math.random() * 1e4) % 8000;

	setTimeout(function () {
		cb(fake_responses[url]);
	}, randomDelay);
}

function output(text) {
	console.log(text);
}

// LIFTING: adapting utility to a promise. Promise aware utility on top of fakeAjax function
function getFile(file) {
	return new Promise(function (resolve) {
		fakeAjax(file, resolve);
	});
}

jest.useFakeTimers();

test('should call in paralell but return in order of call', () => {
	var promise1 = getFile('file1');
	var promise2 = getFile('file2');
	var promise3 = getFile('file3');

	/*
    Kyles REMARKS:
    below is a valid solution but not promise chain oriented.
    Output and the chaining should be included as separate steps.
    Function should be as single responsible as possible. Those two tasks ( output and returning a promise )
    should be kept apart;
    */
	promise1
		.then(function (res) {
			output(res);
			return promise2;
		})
		.then(function (res) {
			output(res);
			return promise3;
		})
		.then(function () {
			output(res);
			console.log('Complete');
		});

	jest.runAllTimers();
});

// Kyles Solution
// arrow functions introduce noise in promise chaining. Its better to declare a function and then just use it in the chain.
test('Kyles version', () => {
	// so would have sth like this
	var p1 = getFile('file1');
	var p2 = getFile('file2');
	var p3 = getFile('file3');

	/*
        Everytime the then method is called, it returns its own promise if a callback function does not return a promise.
        If it returns, it overrides promise returned by default
    */
	p1.then(output)
		.then(function () {
			return p2;
		})
		.then(output)
		.then(function () {
			return p3;
		})
		.then(output)
		.then(function () {
			output('Complete!');
		});

	// vertically arranged. We can trust that no matter what it does and how much time it does the thing (fakeAjax),
	// we will be notified only once.
});

test('text', () => {
	var p1 = getFile('file1');
	var foo = function (param) {
		console.log('Hello from foo', param);
	};
	var bar = function (param) {
		return param;
	};

	p1.then(bar)
		.then(foo)
		.then(bar)
		.then(function (res) {
			console.log('Final then', res);
		});

	jest.runAllTimers();
});

test('error handling', () => {
	var p1 = getFile('file1');

	p1.then(function () {
		throw 'some unexpected error';
	})
		.then(function () {
			console.log('This text won`t be written to console due to error thrown above');
		})
		.catch(function (error) {
			console.log('Error was automatically changed into promise rejection');
		});

	jest.runAllTimers();
});

/*
	.catch in a promise is equivalend to .then(null, function(err) { })
*/
