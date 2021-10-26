const { workerData, parentPort } = require('worker_threads');
const Logger = require('../lib/Logger');
const createTimer = require('../utils/createTimer');
const roundDecimals = require('../utils/roundDecimals');

// received data passed to worker thread..
const { modulePath, iterations, precision } = workerData;

// load the requests module..
import(modulePath).then((mod) => {
	const defaultExports = mod.default;
	
	// results[methodName]: avarage execution duration in ms
	const results = {};

	// argument(s) received from setup method's return value, if this value is not an
	// array of multiple values, it will be converted to an array to enable the use
	// of the spread operator later when each testing method get's called with all specified arguments.
	let arguments = defaultExports['setup'] ? defaultExports['setup'].call({}) : null;
	if (!(arguments instanceof Array)) arguments = [arguments];

	// store all logs from within each testing function
	const logger = new Logger();

	for (const method in defaultExports) {
		// check if current method is callable and exclude the previously executed setup method.
		if (typeof defaultExports[method] !== 'function' || method === 'setup') continue;

		const timer = createTimer();
		let durationSum = 0;

		logger._setActive(true);
		logger._setMethod(method);
		
		for (let i = 0; i < parseInt(iterations); i++) {
			timer.start();
			defaultExports[method].call(logger, ...arguments);
			durationSum += timer.stop();

			if (i === 0) logger._setActive(false);
		}

		// calculate avarage execution time with specified precision and store it within results..
		results[method] = roundDecimals(durationSum / iterations, parseInt(precision));
	}

	// send resulting data back to main thread
	parentPort.postMessage([results, logger._logs]);
});
