module.exports = {
	test() {
		// Log any value to the terminal using the internal log method
		// instead of the classic console.log() approach. This prevents
		// weird formatting issues during execution as well as
		// repeating the same logs when using multiple iterations.
		this.log('Hello World!');

		this.log({
			foo: 'bar',
		});
	},
};
