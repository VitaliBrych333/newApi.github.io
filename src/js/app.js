import '../sass/style.sass';
import search from './components/search';
import getSources from './components/getSources';

class Model {
	constructor() {
		this.sources = [];
		this.data = [];
		this.showData = [];
	}

	getArticlesData() {
		this.data = [];
		search().then((res) => {
			this.data = res;
			this.onDataListChanged(this.data);
			this.initStartEndArticles();
			this.setShowData();
		});
	}

	bindonDataListChanged(callback) {
		this.onDataListChanged = callback;
	}

	bindonSourcesListChanged(callback) {
		this.onSourcesListChanged = callback;
	}

	initStartEndArticles() {
		this.startNum = 0;
		this.endNum = 10;
	}

	getDataSources() {
		this.sourses = [];

		getSources(event.target.value).then((res) => {
			this.sources = res;

			this.onSourcesListChanged(res);
		});
	}

	bindShowButtonNext(callback) {
        this.showButtonNext = callback;
	}

	bindShowButtonPrev(callback) {
		this.showButtonPrev = callback;
	}

	bindHideButtonPrev(callback) {
		this.hideButtonPrev = callback;
	}

	bindHideButtonNext(callback) {
		this.hideButtonNext = callback;
	}

	setShowData() {
        const length = this.data.length;

		if (this.endNum >= length) {
			this.endNum = length;
			this.hideButtonNext();
		}

		if (this.startNum <= 0) {
			this.startNum = 0;
			this.hideButtonPrev();
		}

		this.showData = this.data.slice(this.startNum, this.endNum);
	}

	nextArticles() {
		this.startNum += 10;
		this.endNum = this.startNum + 10;
		this.showButtonPrev();
		this.setShowData();
		this.onDataListChanged(this.showData);
	}

	prevArticles() {
		this.endNum -= 10;
		this.startNum = this.endNum - 10;
		this.showButtonNext();
		this.setShowData();
		this.onDataListChanged(this.showData);
	}

	lastArticles() {
		this.data = this.data.sort((a, b) => {
			a = new Date(a.publishedAt);
			b = new Date(b.publishedAt);
			return a > b ? -1 : a < b ? 1 : 0;
		});
		this.initStartEndArticles();
		this.onDataListChanged(this.data);
		this.hideButtonNext();
        this.hideButtonPrev();
	}
}

class View {
	constructor() {
		this.app = document.querySelectorAll('input[name="language"]');
		this.idSearch = document.querySelector('#search');
		this.idSources = document.querySelector('#sources');
		this.clArticles = document.querySelector('.articles');
		this.idButton = document.querySelector('#button');
	}

	bindAddSources(handler) {
		this.app.forEach(item => item.addEventListener('click', handler));
	}

	bindAddArticles(handler) {
		this.idSearch.addEventListener('click', handler);
	}

	bindHandlerNext(handler) {
		this.showNextArticles = handler;
	}

	bindHandlerPrev(handler) {
		this.showPrevArticles = handler;
	}

	bindHandlerLast(handler) {
		this.showLastArticles = handler;
	}

	hideButtonNext() {
		if (document.querySelector('#next')) {
			document.querySelector('#next').remove();
		}
	}

	hideButtonPrev() {
		if (document.querySelector('#prev')) {
			document.querySelector('#prev').remove();
		}
	}

	showButtonPrev() {
		if (!document.querySelector('#prev')) {
			let newButton = this.createButton('prev', 'Previous 10', this.showPrevArticles);
			this.idButton.insertBefore(newButton, document.querySelector('#next'));
		}
	}

	showButtonNext() {
		if (!document.querySelector('#next')) {
		    let newButton = this.createButton('next', 'Next 10', this.showNextArticles);
			this.idButton.insertBefore(newButton, document.querySelector('#last'));
		}
	}

	displaySources(sources) {
		this.idSources.innerHTML = '';

		sources.forEach((item) => {
			const newOption = document.createElement('option');
			newOption.innerHTML = `${item.id}`;
			this.idSources.appendChild(newOption);
		});

		this.idSources.disabled = false;
		this.idSearch.disabled = false;
	}

	createButton(id, content, handler) {
		const newButton = document.createElement('button');
        newButton.id = id;
        newButton.innerHTML = content;
		newButton.addEventListener('click', handler);
		return newButton;
	}

	drawArticles(articles, startNum, endNum) {
		const length = articles.length;

		if (!document.querySelector('#last')) {
			let newButton = this.createButton('last', 'Show 10 last', this.showLastArticles);
			this.idButton.appendChild(newButton);
		}

		if (length > 10 && !document.querySelector('#next') && endNum !== length) {
			this.showButtonNext();
		}

		this.clArticles.innerHTML = '';

		articles.slice(startNum, endNum).forEach((item) => {
			const newDiv = document.createElement('div');
			newDiv.innerHTML = `<div>
				  <p>Author: ${item.author}</p>
				  <p>Title: ${item.title}</p>
				  <p>Content: ${item.content}</p>
				  <p>Description: ${item.description}</p>
				  <p>Date: ${item.publishedAt.slice(0, 10)} ${item.publishedAt.slice(11, 19)}</p>
				  <p>Source: <a href='${item.url}'> Read more...</a></p>
				  <p>Link on image: <a href='${item.urlToImage}'> please click</a><p>
				</div>`;
			this.clArticles.appendChild(newDiv);
		});
	}

	displayData(data) {
		this.clArticles.innerHTML = '';
		this.drawArticles(data, 0, 10);
	}
}

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		this.model.bindonSourcesListChanged(this.onSourcesListChanged);
		this.view.bindAddSources(this.getDataSources);
		this.view.bindAddArticles(this.getDataArticles);
		this.model.bindonDataListChanged(this.onDataListChanged);

		this.view.bindHandlerNext(this.showNextArticles);
		this.view.bindHandlerPrev(this.showPrevArticles);
		this.view.bindHandlerLast(this.showLastArticles);

		this.model.bindHideButtonNext(this.hideButtonNext);
		this.model.bindHideButtonPrev(this.hideButtonPrev);

		this.model.bindShowButtonNext(this.showButtonNext);
		this.model.bindShowButtonPrev(this.showButtonPrev);
	}

	getDataSources = () => {
	    this.model.getDataSources();
	}

	getDataArticles = () => {
	    this.model.getArticlesData();
	}

	onDataListChanged = data => {
	    this.view.displayData(data);
	}

	onSourcesListChanged = sources => {
		this.view.displaySources(sources);
	}

	onChangedStartEndArticles() {
		this.model.setShowData();
		this.model.initStartEndArticles();
	}

	showNextArticles = () => {
		this.model.nextArticles();
	}

	showPrevArticles = () => {
		this.model.prevArticles();
	}

	showLastArticles = () => {
		this.model.lastArticles();
	}

	hideButtonNext = () => {
        this.view.hideButtonNext();
	}

	hideButtonPrev = () => {
		this.view.hideButtonPrev();
	 }

	showButtonNext = () => {
		this.view.showButtonNext();
	}

	showButtonPrev = () => {
        this.view.showButtonPrev();
	}
  }

window.onload = () => {
	const app = new Controller(new Model(), new View());
};
