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
