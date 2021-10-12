const chalk = require('chalk');

class Print {
	static success(msg) {
		console.log(`${chalk.green(`${msg}`)}`);
	}

	static info(msg) {
		console.log(`${chalk.gray(`${msg}`)}`);
	}

	static resultingData(data) {
		for (const method in data) {
			console.log(`${chalk.gray(`${method}:`)} ${data[method]}ms`);
		}
	}
}

module.exports = Print;
