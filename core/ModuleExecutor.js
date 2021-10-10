const { Worker } = require('worker_threads');
const Spinner = require('../lib/Spinner');
const path = require('path');

// utility functions
const createTimer = require('../utils/createTimer');
const roundDecimals = require('../utils/roundDecimals');

class ModuleExecutor {
	constructor(methods) {
		this.methods = methods;
	}

	run(iterations, precision) {
		const spinner = new Spinner('Executing Methods..').start();
		this.results = {};

		// const worker = new Worker(
		// 	path.join(__dirname, './ExecutionWorker.js'),
		// 	{
		// 		workerData: {
		// 			hello: () => 'world',
		// 		},
		// 	}
		// );

		// worker.addListener('message', (d) => {
		// 	console.log('gotit!');
		// });

		for (const method in this.methods) {
			if (typeof this.methods[method] !== 'function') continue;

			let durationSum = 0;

			for (let i = 0; i < parseInt(iterations); i++) {
				const timer = createTimer();

				timer.start();
				this.methods[method].call({});
				durationSum += timer.stop();
			}

			// calculate avarage execution time with specified precision and store it within results..
			const aet = roundDecimals(
				durationSum / iterations,
				parseInt(precision)
			);

			this.results[method] = aet;
		}

		spinner.stop();

		// check if at least one method exists in module exports..
		if (Object.keys(this.results).length === 0) {
			throw new Error(
				'Provide at least one exported method in specified module'
			);
		}

		return this;
	}

	showResults() {
		console.log(this.results);
	}
}

module.exports = ModuleExecutor;
