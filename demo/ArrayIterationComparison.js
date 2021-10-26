module.exports = {
	// magic setup method which will NOT be tested
	setup() {
		// create and fill an array for comparing different iteration methods
		const arr = Array.from({ length: 10000 }).map((_, i) => i);

		// returned array values will be used as arguments for testing methods
		return [arr];
	},

	testA(arr) {
		for (let i = 0; i < arr.length; i++) Math.sqrt(arr[i]);
	},

	testB(arr) {
		arr.forEach(Math.sqrt);
	},

	testC(arr) {
		for (const n in arr) Math.sqrt(n);
	},
};
