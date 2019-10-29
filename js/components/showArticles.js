import { createButtonNext, createButtonPrev } from './createButtons';
import drawArticles from './drawArticles';

let startNum;
let endNum;
let articles;

export function setCurrentData(data, start, end) {
    startNum = start;
    endNum = end;
    articles = data;
}

export function showPrevArticles() {
    if ((startNum - 10) <= 0) {
        startNum = 0;
        document.querySelector('#prev').remove();
    } else {
        startNum -= 10;
    }

    if (!document.querySelector('#next')) {
        createButtonNext();
    }

    endNum -= 10;

    drawArticles(articles, startNum, endNum);
}

export function showNextArticles() {
    const length = articles.length;
    startNum += 10;

    if (length > (endNum + 10)) {
        endNum += 10;
    } else {
        endNum = length;
        document.querySelector('#next').remove();
    }

    if (!document.querySelector('#prev')) {
        createButtonPrev();
    }

    drawArticles(articles, startNum, endNum);
}

export function showLastArticles() {
    articles = articles.sort((a, b) => {
        a = new Date(a.publishedAt);
        b = new Date(b.publishedAt);
        return a > b ? -1 : a < b ? 1 : 0;
    });

    startNum = 0;
    endNum = 10;

    drawArticles(articles, startNum, endNum);

    document.querySelector('#button').innerHTML = '';
}
