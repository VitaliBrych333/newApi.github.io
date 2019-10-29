import { API } from './components/api';
import setSources from './components/setSources';
import '../sass/style.sass';

async function getSources() {
    document.querySelector('#search').disabled = true;
    const language = document.querySelector('input[name="language"]:checked').value;
    const response = await fetch(`https://newsapi.org/v2/sources?language=${language}&apiKey=${API}`);
    const myJson = await response.json();
    const sources = myJson.sources;
    setSources(sources);
}

window.onload = () => {
    document.querySelectorAll('input[name="language"]').forEach(item => item.addEventListener('click', getSources));
};
