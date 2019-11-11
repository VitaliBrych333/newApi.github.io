module.exports = class Err {
	constructor(err) {
		this.error = err;

		if (typeof Err.instance === 'object') {
			return Err.instance;
		}

		Err.instance = this;
		return this;
	}

	showError() {
		const newDivError = document.createElement('div');
	    newDivError.id = 'error';
	    newDivError.innerHTML = `
            <div class="b-popup">
                <div class="b-popup-content">
                    <p>${this.error}</p>
                </div>
            </div>`
	    document.querySelector('.error').appendChild(newDivError);
	}

	waitTime(ms) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	}

	async hideError() {
        await this.waitTime(1000);
	    document.querySelector('.error').innerHTML = '';
	}
}
