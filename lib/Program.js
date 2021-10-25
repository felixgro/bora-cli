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
