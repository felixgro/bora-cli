#!/usr/bin/env node
const ModuleExecutor = require('./core/ModuleExecutor');
const createFile = require('./utils/createFile');
const pkg = require('./package.json');
const program = require('commander');
const { join } = require('path');

program
	.name(Object.keys(pkg.bin)[0])
	.version(pkg.version)

	.argument('<module>', 'Module for execution duration meassuring')

	.option(
		'-i, --iterations <number>',
		'How often each method gets called for average execution duration',
		1
	)

	.option(
		'-p, --precision <number>',
		'Amount of decimal places for resulting milliseconds',
		0
	);

program.action(async (relModulePath, opts) => {
	// get absolute module path..
	const modulePath = join(process.cwd(), relModulePath);

	// try to import argument module and execute all of it's default methods..
	try {
		if (opts.new) {
			createFile(modulePath, '.js');
		} else {
			const executor = new ModuleExecutor(modulePath);
			executor.run(opts.iterations, opts.precision);
		}
	} catch (err) {
		console.log(err);
	}
});

program.parse(process.argv);
