const Spinner = require('../lib/Spinner');
const Print = require('../lib/Print');
const { Worker } = require('worker_threads');
const path = require('path');

class ModuleExecutor {
	constructor(mod) {
		this.modulePath = mod;
		this.workerPath = path.join(__dirname, './ExecutionWorker.js');
		this.spinner = new Spinner('Executing Methods');
	}

	run(iterations, precision) {
		this.spinner.start();

		// spawns worker thread for method executions and execution time calculations..
		const worker = new Worker(this.workerPath, {
			workerData: {
				modulePath: this.modulePath,
				iterations,
				precision,
			},
		});

		// worker done!
		worker.addListener('message', ([results, logs]) => {
			this.spinner.stop(true);
			Print.resultingData(results, logs);
		});

		// TODO: worker thread error handling
	}
}

module.exports = ModuleExecutor;
