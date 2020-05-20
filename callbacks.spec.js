/*
	1. make requests in paralell
	2. render them asap
	3. render in proper order: file1, file2, file3
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

var requestArray = [];

// My solution

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

		var length = requestArray.length;
		for (var i = 0; i < length; i++) {
			if (typeof requestArray[0].fun == 'function') {
				var firstEl = requestArray.shift();
				firstEl.fun();
			}
		}
	});
}

// Kyles solution

function getFileKyles(file) {
	fakeAjax(file, function (text) {
		handleResponse(file, text);
	});
}

function handleResponse(filename, contents) {
	if (!(filename in responses)) {
		responses[filename] = contents;
	}
	var filenames = ['file1', 'file2', 'file3'];
	for (var i = 0; i < filenames.length; i++) {
		if (filenames[i] in responses) {
			if (typeof responses[filenames[i]] == 'string') {
				output(responses[filenames[i]]);
				responses[filenames[i]] = false;
			}
		} else {
			return;
		}
	}
}

var responses = {};

jest.useFakeTimers();

test('my solution', () => {
	getFile('file1');
	getFile('file2');
	getFile('file3');

	jest.runAllTimers();
});

test('Kyles solution', () => {
	getFileKyles('file1');
	getFileKyles('file2');
	getFileKyles('file3');

	jest.runAllTimers();
});
