const commander = require('commander');

class Program {
	constructor(name, version) {
		this.program = commander.name(name).version(version);
	}

	argument(name, description) {
		this.program.argument(`<${name}>`, description);
		return this;
	}

	options(opts) {
		for (const opt in opts) {
			const option = opts[opt],
				full = `--${opt}`,
				flag = `-${opt[0]}`;

			this.program.option(
				`${flag}, ${full} <${option.type}>`,
				option.description,
				option.default
			);
		}
		return this;
	}

	execute(callback) {
		this.program.action(callback);
		this.program.parse(process.argv);
		return this;
	}
}

module.exports = Program;

/*
	program
	.name(Object.keys(pkg.bin)[0])
	.version(pkg.version)

	.argument('<module>', 'Module for execution duration meassuring')

	.option(
		'-i, --iterations <number>',
		'How often each method gets called for average execution duration',
		1
	)

	.option('-p, --precision <number>', 'Amount of decimal places for resulting milliseconds', 0);

program.action(async (relModulePath, opts) => {
	// get absolute module path..
	const modulePath = path.join(process.cwd(), relModulePath);

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
*/
