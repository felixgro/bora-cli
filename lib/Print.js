const chalk = require('chalk');

class Print {
	static successData(data) {
		for (const method in data) {
			console.log(`${chalk.gray(`${method}:`)} ${data[method]}ms`);
		}
	}
}

module.exports = Print;
