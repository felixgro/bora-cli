const path = require('path');

module.exports = (relPath, fileExtension) => {
	let { dir, base, ext } = path.parse(relPath);
	if (!ext) base += fileExtension;

	const joinedRelPath = path.join(dir, base);

	return path.join(process.cwd(), joinedRelPath);
};
