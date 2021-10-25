const Print = require('../lib/Print');
const fs = require('fs');
const path = require('path');

module.exports = async (modulePath) => {
	const dir = path.dirname(modulePath);

	try {
		await fs.promises.access(modulePath);
		return false;
	} catch (err) {
		if (err.code !== 'ENOENT') throw new Error(err);

		if (!fs.existsSync(dir)) await fs.promises.mkdir(dir);

		const blueprint = await fs.promises.readFile(
			path.join(__dirname, '../templates/default.js'),
			'utf8'
		);

		await fs.promises.writeFile(modulePath, blueprint);

		Print.success(`created template file:`);
		Print.info(`${modulePath}`);
		return true;
	}
};
