import {createHeaderProfile} from './view/header__profile.js';
import {createMenu} from './view/nav.js';
import {createSort} from './view/sort.js';
import {createContent} from './view/content.js';
import {createFilmCard} from './view/film-card.js';
import {createButton} from './view/button__show-more.js';
import {createContentExtra} from './view/content-extra.js';

// Функции отрисовки компонентов

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createListFilms = (container, template, place, qtyCards) => {
  for (let i = 0; i < qtyCards; i++) {
    render(container, template, place);
  }
};

// Отрисовка пользователя

const header = document.querySelector('.header');

render(header, createHeaderProfile(), 'beforeend');

// Отрисовка навигации

const main = document.querySelector('.main');

render(main, createMenu(), 'beforeend');

// Отрисовка сортировки

render(main, createSort(), 'beforeend');

// Отрисовка контейнера для контента

render(main, createContent(), 'beforeend');

// Отрисовка списка фильмов

const containerFilms = document.createElement('div');
containerFilms.classList.add('films-list__container');
const filmsList = document.querySelector('.films-list');
filmsList.appendChild(containerFilms);
const qtyFilms = 5;

createListFilms(containerFilms, createFilmCard(), 'beforeend', qtyFilms);

// Отрисовка кнопки

render(filmsList, createButton(), 'beforeend');

// Отрисовка блоков "Top rated" и "Most commented"

const films = document.querySelector('.films');
const qtyContainersFilmsExtra = 2;

createListFilms(films, createContentExtra(), 'beforeend', qtyContainersFilmsExtra);

const filmListExstra = document.querySelectorAll('.films-list--extra');

const topRated = filmListExstra[0].querySelector('.films-list__title');
topRated.textContent = 'Top rated';

const containerTopRated = filmListExstra[0].querySelector('.films-list__container');

const qtyFilmsTopRated = 2;

createListFilms(containerTopRated, createFilmCard(), 'beforeend', qtyFilmsTopRated);

const mostCommented = filmListExstra[1].querySelector('.films-list__title');
mostCommented.textContent = 'Most commented';

const containerMostCommented = filmListExstra[1].querySelector('.films-list__container');

const qtyFilmsMostCommented = 2;

createListFilms(containerMostCommented, createFilmCard(), 'beforeend', qtyFilmsMostCommented);

