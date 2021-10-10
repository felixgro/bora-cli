/**
 * Round floating point number while keeping as many
 * decimal places as defined in precision.
 *
 * @param {number} num
 * @param {number} precision
 * @returns rounded floating point number
 */
module.exports = (num, precision) => {
	const factor = Math.pow(10, precision);
	return Math.round(num * factor) / factor;
};
