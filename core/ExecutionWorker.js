const { workerData, parentPort } = require('worker_threads');

try {
	console.log(workerData);
	parentPort.postMessage('hiiii');
} catch (err) {}
