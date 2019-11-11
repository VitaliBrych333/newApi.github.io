export default function createScript() {
	if (!document.querySelector('script[src="/assets/js/lazyLoaderError.js"]')) {
		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = '/assets/js/lazyLoaderError.js';
		document.querySelector('head').appendChild(script);
	}
}