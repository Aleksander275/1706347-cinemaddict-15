import {createHeaderProfile} from './view/header__profile.js';
import {createMenu} from './view/nav.js';
import {createSort} from './view/sort.js';
import {createContent, Quantity} from './view/content.js';
import {createFilmCard} from './view/film-card.js';
import {createButton} from './view/button__show-more.js';
import {createContentExtra} from './view/content-extra.js';

// Функции отрисовки компонентов

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const createListFilms = (container, template, qtyCards) => {
  for (let i = 0; i < qtyCards; i++) {
    render(container, template);
  }
};

// Отрисовка пользователя

const header = document.querySelector('.header');

render(header, createHeaderProfile());

// Отрисовка навигации

const main = document.querySelector('.main');

render(main, createMenu());

// Отрисовка сортировки

render(main, createSort());

// Отрисовка контейнера для контента

render(main, createContent());

// Отрисовка списка фильмов

const containerFilms = document.createElement('div');
containerFilms.classList.add('films-list__container');
const filmsList = document.querySelector('.films-list');
filmsList.appendChild(containerFilms);

createListFilms(containerFilms, createFilmCard(), Quantity.FILMS);

// Отрисовка кнопки

render(filmsList, createButton());

// Отрисовка блоков "Top rated" и "Most commented"

const films = document.querySelector('.films');

createListFilms(films, createContentExtra(), Quantity.EXTRA_CONTAINERS);

const filmListExstra = document.querySelectorAll('.films-list--extra');

filmListExstra[0].querySelector('.films-list__title').textContent = 'Top rated';

const containerTopRated = filmListExstra[0].querySelector('.films-list__container');

createListFilms(containerTopRated, createFilmCard(), Quantity.TOP_FILMS);

filmListExstra[1].querySelector('.films-list__title').textContent = 'Most commented';

const containerMostCommented = filmListExstra[1].querySelector('.films-list__container');

createListFilms(containerMostCommented, createFilmCard(), Quantity.MOST_FILMS);

