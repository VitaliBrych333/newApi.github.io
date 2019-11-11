import { API } from './api';
import proxy from './proxyFactoryRequests';
import createScript from './createScript';

export default async function search() {
    document.querySelector('#button').innerHTML = '';

    const e = document.querySelector('#sources');
    const valueResource = e.options[e.selectedIndex].value;
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
	const currentDate = `${year}-${month}-${date}`;
	const responseNews = await proxy.createRequest(`https://newsapi.org/v2/everything?sources=${valueResource}&from=${currentDate}&to=${currentDate}&pageSize=100&sortBy=popularity&apiKey=${API}`, 'GET').sendRequest();

	if (responseNews.ok === false) {
		import(/* webpackChunkName: "lazyLoaderError" */ './lazyLoaderError').then(module => {
			createScript();
			const Error = module.default;
			let newError = new Error(responseNews.statusText);
			newError.showError();
			newError.hideError();
		});
	} else {
		const jsonNews = await responseNews.json();

	    if (jsonNews.length > 100) {
			import(/* webpackChunkName: "lazyLoaderError" */ './lazyLoaderError').then(module => {
				createScript();
				let Error = module.default;
			    let newError = new Error('Error. You got more than 100 articles');
			    newError.showError();
                newError.hideError();
			});
		} else {
			return jsonNews.articles;
		}
	}
}
