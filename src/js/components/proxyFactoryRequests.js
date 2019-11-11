class Request {
	constructor(url, type, data) {
	   this.url = url;
	   this.type = type
	   this.data = data;
	}

	sendRequest() {
		return fetch(this.url, { method: this.type, body: this.data ? JSON.stringify(this.data): undefined });
	}
}

class RequestsFactory {
	createRequest(url, type, data = null) {
		switch(type) {
			case 'GET':
				return new Request(url, type, data);
			case 'PUT':
				return new Request(url, type, data);
			case 'POST':
				return new Request(url, type, data);
			case 'DELETE':
				return new Request(url, type, data);
		}
	}
}

const handler = {
	get(target, propKey) {
		const origMethod = target[propKey];
		return function (...args) {
			let result = origMethod.apply(this, args);
			console.log(propKey + JSON.stringify(args));
			return result;
		};
	},
};

const proxy = new Proxy(new RequestsFactory(), handler);

export default proxy;
