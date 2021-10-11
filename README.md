Create node module file for performance testing:
```js
module.exports = {
	// returned value will be used as parameter for testing methods
	setup: () => {
		//
	},

	// methods for execution duration comparisons
	methodA: () => {
		//
	},

	methodB: () => {
		//
	},
};
```

Make CLI globally available:
```bash
sudo npm link
```

Run CLI:
```bash
perfjs file_to_test.js
```