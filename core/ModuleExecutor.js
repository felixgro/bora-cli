const Spinner = require('../lib/Spinner');
const Print = require('../lib/Print');
const { Worker } = require('worker_threads');
const path = require('path');

class ModuleExecutor {
	constructor(mod) {
		this.module = mod;
		this.workerPath = path.join(__dirname, './ExecutionWorker.js');
		this.spinner = new Spinner('Executing Methods');
	}

	run(iterations, precision) {
		this.spinner.start();

		// TODO: worker thread error handling
		// spawns worker thread for method executions and execution time calculations..
		const worker = new Worker(this.workerPath, {
			workerData: {
				modulePath: this.module,
				iterations,
				precision,
			},
		});

		// worker done!
		worker.addListener('message', (res) => {
			this.spinner.stop(true);
			Print.resultingData(res);
		});
	}
}

module.exports = ModuleExecutor;
