import { showLastArticles, showNextArticles, showPrevArticles } from './showArticles';

export function creteButtonSwowLastArticles() {
    const newButtonLast = document.createElement('button');
    newButtonLast.id = 'last';
    newButtonLast.innerHTML = 'Show 10 last';
    newButtonLast.addEventListener('click', showLastArticles);
    document.querySelector('#button').appendChild(newButtonLast);
}

export function createButtonNext() {
    const newButtonNext = document.createElement('button');
    newButtonNext.id = 'next';
    newButtonNext.innerHTML = 'Next 10';
    newButtonNext.addEventListener('click', showNextArticles);
    document.querySelector('#button').insertBefore(newButtonNext, document.querySelector('#last'));
}

export function createButtonPrev() {
    const prevButtonNext = document.createElement('button');
    prevButtonNext.id = 'prev';
    prevButtonNext.innerHTML = 'Previous 10';
    prevButtonNext.addEventListener('click', showPrevArticles);
    document.querySelector('#button').insertBefore(prevButtonNext, document.querySelector('#next'));
}
