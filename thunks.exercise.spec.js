/*
	Promises are not replacements for thunks. When writing our libs we can use it to avoid depending on libraries.
	This is a lightweight solution for asynchronous sequencing tasks.
*/

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

/*
	Kyles Simpson freaking son of a gun solution
	this is an active thunk. The pattern can be implemented with those ifs in 63 and 71 inverted. Either we save response or we
	save the callback; once both are there we are able to call callback fun. Hats off :D
*/
function getFileKylesVer(file) {
	var text, fn;
	fakeAjax(file, function (response) {
		if (fn) {
			fn(response);
		} else {
			text = response;
		}
	});

	return function (cb) {
		if (text) {
			cb(text);
		} else {
			fn = cb;
		}
	};
}

jest.useFakeTimers();

test('should do the right', () => {
	var t1 = makeThunk('file1');
	var t2 = makeThunk('file2');
	var t3 = makeThunk('file3');

	chainThunks(t1, t2, t3);

	jest.runAllTimers();
});

test('Kyles solution', () => {
	var th1 = getFileKylesVer('file1');
	var th2 = getFileKylesVer('file2');
	var th3 = getFileKylesVer('file3');

	th1(function (text1) {
		output(text1);
		th2(function (text2) {
			output(text2);
			th3(function (text3) {
				output(text3);
				output('Complete!');
			});
		});
	});
});
