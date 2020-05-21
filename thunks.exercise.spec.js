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

function getFile(file) {
	fakeAjax(url, cb);
}

function makeThunk(file) {
	return function (cb) {
		fakeAjax(file, cb);
	};
}

// my solution

function chainThunks(...thunks) {
	var arrayOfCallbacks = thunks.map(() => false);

	thunks.forEach((thunkFn, index) => {
		thunkFn(function (res) {
			arrayOfCallbacks[index] = res;

			for (var i = 0; i < arrayOfCallbacks.length; i++) {
				if (arrayOfCallbacks[0] !== false && arrayOfCallbacks[i] !== false) {
					output(arrayOfCallbacks[i]);
				}

				if (arrayOfCallbacks.filter((res) => res === false).length == 0) {
					output('Completed!');
				}
			}
		});
	});
}

jest.useFakeTimers();

test('should do the right', () => {
	var t1 = makeThunk('file1');
	var t2 = makeThunk('file2');
	var t3 = makeThunk('file3');

	chainThunks(t1, t2, t3);

	jest.runAllTimers();
});
