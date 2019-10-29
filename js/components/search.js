import { API } from './api';

export default async function search() {
    document.querySelector('#button').innerHTML = '';

    const e = document.querySelector('#sources');
    const valueResource = e.options[e.selectedIndex].value;
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const currentDate = `${year}-${month}-${date}`;

    const responseNews = await fetch(`https://newsapi.org/v2/everything?sources=${valueResource}&from=${currentDate}&to=${currentDate}&pageSize=100&sortBy=popularity&apiKey=${API}`);
    const jsonNews = await responseNews.json();

    return jsonNews.articles;
}
