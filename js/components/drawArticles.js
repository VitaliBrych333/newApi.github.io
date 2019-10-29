import { creteButtonSwowLastArticles, createButtonNext } from './createButtons';

export default function drawArticles(articles, startNum, endNum) {
    let length = articles.length;

    if (!document.querySelector('#last')) {
        creteButtonSwowLastArticles();
    }

    if (length > 10 && !document.querySelector('#next') && endNum !== length) {
        createButtonNext();
    }

    document.querySelector('.articles').innerHTML = '';

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
        document.querySelector('.articles').appendChild(newDiv);
    });
}
