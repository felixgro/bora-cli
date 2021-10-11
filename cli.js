#!/usr/bin/env node
const ModuleExecutor = require('./core/ModuleExecutor');
const program = require('commander');
const pkg = require('./package.json');

program
	.name(pkg.name)
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
	)

	.action(async (relModulePath, { iterations, precision }) => {
		// get absolute module path..
		const path = require('path');
		const modulePath = path.join(process.cwd(), relModulePath);

		// try to import argument module and execute all of it's default methods..
		try {
			new ModuleExecutor(modulePath).run(iterations, precision);
		} catch (err) {
			console.log(err);
		}
	})

	.parse(process.argv);
