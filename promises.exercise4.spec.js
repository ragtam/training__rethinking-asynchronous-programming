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
	return new Promise(function (resolve) {
		fakeAjax(file, resolve);
	});
}

// my solution
function chainUrls(...urls) {
	const promises = urls.map(getFile);

	const [firstPromise, ...restOfPromises] = promises;

	restOfPromises
		.slice(1)
		.reduce(function (previousValue, currentValue) {
			return previousValue.then(output).then(function () {
				return currentValue;
			});
		}, firstPromise)
		.then(output)
		.then(function () {
			output('Complete');
		});
}

jest.useFakeTimers();

xtest('text', () => {
	chainUrls('file1', 'file2', 'file3');
	jest.runAllTimers();
});

// Kyle`s solution

test('Kyles solution', () => {
	['file1', 'file2', 'file3'].map(getFile).reduce(function combine(chain, promise) {
		return chain
			.then(function () {
				return promise;
			})
			.then(output);
	}, Promise.resolve());

	jest.runAllTimers();
});
