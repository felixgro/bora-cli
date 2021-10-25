#!/usr/bin/env node
const pkg = require('./package.json');
const Program = require('./lib/Program');
const ModuleExecutor = require('./core/ModuleExecutor');
const getAbsolutePath = require('./utils/getAbsolutePath');
const createMissingModule = require('./utils/createMissingModule');

// initialize cli program using name and version as defined in package.json
const program = new Program(Object.keys(pkg.bin)[0], pkg.version).argument(
	'module',
	'module file name for execution duration meassuring. if no file found, bora will create a template file with the provided name'
);

program.options({
	iterations: {
		type: 'number',
		description: 'amount of iterations for avarage execution time calculations',
		default: 1,
	},
	precision: {
		type: 'number',
		description: 'amount of decimal places for resulting milliseconds',
		default: 0,
	},
});

program.execute(async (relModulePath, opts) => {
	// path is relative to pwd of user, this method converts it to an absolute path
	// as well as assigns the .js file extension if not provided.
	const modulePath = getAbsolutePath(relModulePath, '.js');

	// checks if given module and directories exist on the system. If so, this evaluates
	// to false and the execution function continues. If the directory and/or file does not exists,
	// it creates the necessary directory structor along with the testing file and terminates the process.
	if (await createMissingModule(modulePath)) return;

	// executes the specified module by spawing a worker thread and prints
	// the resulting data afterwards.
	const executor = new ModuleExecutor(modulePath);
	executor.run(opts.iterations, opts.precision);
});
