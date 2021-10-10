const { workerData, parentPort } = require('worker_threads');

// utility functions
const createTimer = require('../utils/createTimer');
const roundDecimals = require('../utils/roundDecimals');

// receive data passed to worker thread..
const { modulePath, iterations, precision } = workerData;

import(modulePath)
	.then((mod) => {
		const defaultExports = mod.default;
		const results = {};

		for (const method in defaultExports) {
			if (typeof defaultExports[method] !== 'function') continue;

			let durationSum = 0;

			for (let i = 0; i < parseInt(iterations); i++) {
				const timer = createTimer();

				timer.start();
				defaultExports[method].call({});
				durationSum += timer.stop();
			}

			// calculate avarage execution time with specified precision and store it within results..
			results[method] = roundDecimals(
				durationSum / iterations,
				parseInt(precision)
			);
		}

		parentPort.postMessage(results);
	})
	.catch(() => {
		throw new Error(`Cannot find module ${modulePath}`);
	});
