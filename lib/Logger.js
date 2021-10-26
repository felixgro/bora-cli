class Logger {
	constructor() {
		this._logs = {};
		this._method = null;
		this._active = true;
	}

	_setActive(state) {
		this._active = state;
	}

	_setMethod(method) {
		this._method = method;
	}

	log(value) {
		if (!this._active) return;

		if (!this._logs[this._method]) {
			this._logs[this._method] = [value];
			return;
		}

		this._logs[this._method].push(value);
	}
}

module.exports = Logger;
