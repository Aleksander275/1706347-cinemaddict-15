import HeaderProfileView from './view/header__profile.js';
import NavMenuView from './view/nav.js';
import SortView from './view/sort.js';
import ContentView from './view/content.js';
import FilmCardView from './view/film-card.js';
import ButtonView  from './view/button__show-more.js';
import ContentExtraView from './view/content-extra.js';
import { generateCard } from './mock/card-film.js';
import { getFilter } from './mock/filter.js';
import PopupView from './view/popup.js';
import FooterStatView from './view/footer__stat.js';
import { renderTemplate } from './utils.js';
import NoFilmView from './view/no-film.js';

const body = document.body;
const cards = new Array(15).fill().map(generateCard);
const filters = getFilter(cards);
const cardCountStep = 5;

// клик по кнопкам в карточке фильма

const handlerFilmControls = (film) => {
  film.querySelector('.film-card__controls').addEventListener('click', (evt) => {
    evt.target.classList.toggle('film-card__controls-item--active');
  });
};

// создание фильма с добавленным обработчиком

const createFilmWithHandler = (container, card) => {
  renderTemplate(container, card);
  handlerFilmControls(card);

  return card;
};

// Отрисовка пользователя

const header = document.querySelector('.header');

renderTemplate(header, new HeaderProfileView().getElement());

// Отрисовка навигации и добавление обработчик при клике на фильтер

const main = document.querySelector('.main');

renderTemplate(main, new NavMenuView(filters).getElement());

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

renderTemplate(main, new SortView().getElement());

// Отрисовка контейнера для контента

renderTemplate(main, new ContentView().getElement());

// Отрисовка списка фильмов

const containerFilms = document.createElement('div');
containerFilms.classList.add('films-list__container');
const filmsList = document.querySelector('.films-list');
filmsList.appendChild(containerFilms);

if (cards.length === 0) {
  renderTemplate(filmsList, new NoFilmView().getElement());
} else {
  for (let i = 0; i < Math.min(cards.length, cardCountStep); i++) {
    createFilmWithHandler(containerFilms, new FilmCardView(cards[i]).getElement());
  }
}

// Отрисовка кнопки

if (cards.length > cardCountStep) {
  let renderedCardCount = cardCountStep;

  renderTemplate(filmsList, new ButtonView().getElement());

  const loadButton = document.querySelector('.films-list__show-more');

  loadButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + cardCountStep)
      .forEach((card) => {
        createFilmWithHandler(containerFilms, new FilmCardView(card).getElement());
      });

    renderedCardCount += cardCountStep;

    if (renderedCardCount >= cards.length) {
      loadButton.remove();
    }
  });
}

// Отрисовка блоков "Top rated" и "Most commented"

const films = document.querySelector('.films');

for (let i = 0; i < 2; i++) {
  renderTemplate(films, new ContentExtraView().getElement());
}

const filmListExstra = document.querySelectorAll('.films-list--extra');

filmListExstra[0].querySelector('.films-list__title').textContent = 'Top rated';

filmListExstra[1].querySelector('.films-list__title').textContent = 'Most commented';

//

// Отрисовка статистики в подвале сайта

const footerStatistics = document.querySelector('.footer__statistics');

renderTemplate(footerStatistics, new FooterStatView(cards.length).getElement());

//

// отображение попапа

containerFilms.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('film-card__poster') || evt.target.classList.contains('film-card__title') || evt.target.classList.contains('film-card__comments')) {
    renderTemplate(body, new PopupView(cards[0]).getElement());
    body.classList.add('hide-overflow');
  }

  const buttonClosePopup = document.querySelector('.film-details__close-btn');
  const popup = document.querySelector('.film-details');
  const ESC = 27;

  buttonClosePopup.addEventListener('click', () => {
    popup.remove();
    body.classList.remove('hide-overflow');
  });

  document.addEventListener('keydown', ({keyCode}) => {
    if (keyCode === ESC) {
      popup.remove();
      body.classList.remove('hide-overflow');
    }
  });
});
