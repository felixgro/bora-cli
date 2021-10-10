Create node module file for performance testing:
```js
module.exports = {
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