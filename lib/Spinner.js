const CliSpinner = require('cli-spinner').Spinner;

class Spinner {
	constructor(label = '') {
		this.spinner = new CliSpinner(label);
		this.spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
	}

	start() {
		this.spinner.start();
		return this;
	}

	stop() {
		this.spinner.stop(true);
		return this;
	}
}

module.exports = Spinner;
