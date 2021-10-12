const Print = require('../lib/Print');
const fs = require('fs');
const path = require('path');

module.exports = (modulePath, defaultExt) => {
	let { dir, base, ext } = path.parse(modulePath);

	if (!ext) base += defaultExt;

	try {
		if (!fs.existsSync(dir)) fs.mkdirSync(dir);

		const content = fs.readFileSync(
			path.join(__dirname, '../templates/default.js'),
			'utf8'
		);

		fs.writeFileSync(path.join(dir, base), content);

		Print.success(`created template file:`);
		Print.info(`${dir}/${base}`);
	} catch (err) {
		console.log(err);
	}
};
