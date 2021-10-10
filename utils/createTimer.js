/**
 * Meassure time between start and stop method calls in ms,
 * the stop method returns the resulting time. To reset the timer
 * just re-call the start method or instanciate a new one.
 *
 * @returns object with start and stop method.
 */
module.exports = () => {
	let startTime;

	return {
		start: () => (startTime = process.hrtime()),
		stop: () => process.hrtime(startTime)[1] / 1000000,
	};
};
