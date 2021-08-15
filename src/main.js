import { createHeaderProfile } from './view/header__profile.js';
import { createMenu } from './view/nav.js';
import { createSort } from './view/sort.js';
import { createContent, Quantity } from './view/content.js';
import { createFilmCard } from './view/film-card.js';
import { createButton } from './view/button__show-more.js';
import { createContentExtra } from './view/content-extra.js';
import { generateCard } from './mock/card-film.js';
import { getFilter } from './mock/filter.js';
import { createPopup } from './view/popup.js';
import { createFooterStat } from './view/footer__stat.js';

const body = document.body;
const cards = new Array(15).fill().map(generateCard);
const filters = getFilter(cards);
const cardCountStep = 5;

// Функции отрисовки компонентов

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const renderTemplate = (container, element) => {
  container.append(element);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// клик по кнопкам в карточке фильма

const handlerFilmControls = (film) => {
  film.querySelector('.film-card__controls').addEventListener('click', (evt) => {
    evt.target.classList.toggle('film-card__controls-item--active');
  });
};

// создание фильма с добавленным обработчиком

const createFilmWithHandler = (card) => {
  const film = createElement(card);
  handlerFilmControls(film);

  return film;
};

// Отрисовка пользователя

const header = document.querySelector('.header');

render(header, createHeaderProfile());

// Отрисовка навигации и добавление обработчик при клике на фильтер

const main = document.querySelector('.main');

render(main, createMenu(filters));

const filterButtons = document.querySelectorAll('.main-navigation__item');
const filterButtonClassActive = 'main-navigation__item--active';

const filterButtonClickHandler = (evt) => {
  evt.preventDefault();
  filterButtons.forEach((button) => {
    button === evt.currentTarget
      ? button.classList.add(filterButtonClassActive)
      : button.classList.remove(filterButtonClassActive);
  });
};

filterButtons.forEach((button) => button.addEventListener('click', filterButtonClickHandler));

// Отрисовка сортировки

render(main, createSort());

// Отрисовка контейнера для контента

render(main, createContent());

// Отрисовка списка фильмов

const containerFilms = document.createElement('div');
containerFilms.classList.add('films-list__container');
const filmsList = document.querySelector('.films-list');
filmsList.appendChild(containerFilms);

for (let i = 0; i < Math.min(cards.length, cardCountStep); i++) {
  renderTemplate(containerFilms, createFilmWithHandler(createFilmCard(cards[i])));
}

// Отрисовка кнопки

if (cards.length > cardCountStep) {
  let renderedCardCount = cardCountStep;

  render(filmsList, createButton());

  const loadButton = document.querySelector('.films-list__show-more');

  loadButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + cardCountStep)
      .forEach((card) => renderTemplate(containerFilms, createFilmWithHandler(createFilmCard(card))));

    renderedCardCount += cardCountStep;

    if (renderedCardCount >= cards.length) {
      loadButton.remove();
    }
  });
}

// Отрисовка блоков "Top rated" и "Most commented"

const createListFilms = (container, template, qtyCards) => {
  for (let i = 0; i < qtyCards; i++) {
    render(container, template);
  }
};

const films = document.querySelector('.films');

createListFilms(films, createContentExtra(), Quantity.EXTRA_CONTAINERS);

const filmListExstra = document.querySelectorAll('.films-list--extra');

filmListExstra[0].querySelector('.films-list__title').textContent = 'Top rated';

filmListExstra[1].querySelector('.films-list__title').textContent = 'Most commented';

//

// Отрисовка статистики в подвале сайта

const footerStatistics = document.querySelector('.footer__statistics');

render(footerStatistics ,createFooterStat(cards.length));

// отображение попапа

containerFilms.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('film-card__poster') || evt.target.classList.contains('film-card__title') || evt.target.classList.contains('film-card__comments')) {
    render(body, createPopup(cards[0]));
  }

  const buttonClosePopup = document.querySelector('.film-details__close-btn');
  const popup = document.querySelector('.film-details');
  const ESC = 27;

  buttonClosePopup.addEventListener('click', () => {
    popup.remove();
  });

  document.addEventListener('keydown', ({keyCode}) => {
    if (keyCode === ESC) {
      popup.remove();
    }
  });
});

//
