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

var requestArray = [];

function getFile(file) {
	requestArray.push({ file: file, fun: null });

	fakeAjax(file, function (text) {
		var index = requestArray.findIndex((ra) => ra.file === file);
		requestArray[index] = {
			...requestArray[index],
			fun: function () {
				output(text);
			},
		};

		if (requestArray[0].fun !== null) {
			var firstEl = requestArray.shift();
			firstEl.fun();

			if (requestArray[0].fun !== null) {
				var firstEl = requestArray.shift();
				firstEl.fun();

				if (requestArray[0].fun !== null) {
					var firstEl = requestArray.shift();
					firstEl.fun();
				}
			}
		}
	});
}

// getFile('file1');
// getFile('file2');
// getFile('file3');

jest.useFakeTimers();

test('test', () => {
	getFile('file1');
	getFile('file2');
	getFile('file3');

	jest.runAllTimers();
});
