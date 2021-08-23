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
import BoardView from './view/board.js';

const body = document.body;
const cards = new Array(15).fill().map(generateCard);
const filters = getFilter(cards);
const cardCountStep = 5;

// Отрисовка пользователя

const header = document.querySelector('.header');

renderTemplate(header, new HeaderProfileView().getElement());

// Отрисовка навигации и добавление обработчик при клике на фильтер

const main = document.querySelector('.main');

const navMenu = new NavMenuView(filters);

renderTemplate(main, navMenu.getElement());

const filterButtons = navMenu.getElement().querySelectorAll('.main-navigation__item');

filterButtons.forEach((button) => navMenu.addClickHendler(button));

// Отрисовка сортировки

renderTemplate(main, new SortView().getElement());

// Отрисовка контейнера для контента

const content = new ContentView();

renderTemplate(main, content.getElement());

const filmsList = content.getElement().querySelector('.films-list');

// Отрисовка списка фильмов

const containerFilms = new BoardView();
renderTemplate(filmsList, containerFilms.getElement());

if (cards.length === 0) {
  renderTemplate(filmsList, new NoFilmView().getElement());
} else {
  for (let i = 0; i < Math.min(cards.length, cardCountStep); i++) {
    const film = new FilmCardView(cards[i]);
    renderTemplate(containerFilms.getElement(), film.getElement());
    film.handlerFilmControls(cards[i]);
  }
}

// Отрисовка кнопки

if (cards.length > cardCountStep) {
  let renderedCardCount = cardCountStep;

  const loadButton = new ButtonView();

  renderTemplate(filmsList, loadButton.getElement());

  loadButton.setClickHandler(() => {
    cards
      .slice(renderedCardCount, renderedCardCount + cardCountStep)
      .forEach((card) => {
        const film = new FilmCardView(card);
        renderTemplate(containerFilms.getElement(), film.getElement());
        film.handlerFilmControls(card);
      });

    renderedCardCount += cardCountStep;

    if (renderedCardCount >= cards.length) {
      loadButton.getElement().remove();
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

// Отрисовка статистики в подвале сайта

const footerStatistics = document.querySelector('.footer__statistics');

renderTemplate(footerStatistics, new FooterStatView(cards.length).getElement());

// отображение попапа

containerFilms.renderPopup((evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('film-card__poster') || evt.target.classList.contains('film-card__title') || evt.target.classList.contains('film-card__comments')) {
    const film = cards.find((card) => card.id === Number(evt.target.parentNode.dataset.id));
    const popup = new PopupView(film);
    popup.closePopup();

    renderTemplate(body, popup.getElement());
    body.classList.add('hide-overflow');
  }
});

//
