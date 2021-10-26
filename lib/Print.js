const chalk = require('chalk');

class Print {
	static success(msg) {
		console.log(`${chalk.green(`${msg}`)}`);
	}

	static info(msg) {
		console.log(`${chalk.gray(`${msg}`)}`);
	}

	static resultingData(data, loggedValues) {
		for (const method in data) {
			console.log(`${chalk.gray(`${method}:`)} ${data[method]}ms`);

			if (loggedValues[method]) {
				const logs = loggedValues[method];
				for (let i = 0; i < logs.length; i++) {
					console.log(logs[i]);
				}
			}
		}
	}
}

module.exports = Print;
