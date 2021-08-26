import SortView from '../view/sort.js';
import ContentView from '../view/content.js';
import FilmCardView from '../view/film-card.js';
import ButtonView  from '../view/button__show-more.js';
import PopupView from '../view/popup.js';
import NoFilmView from '../view/no-film.js';
import BoardView from '../view/board.js';
import { renderTemplate, remove } from '../utils.js';

const CARD_COUNT_STEP = 5;

export default class BoardFilm {
  constructor (boardContainer) {
    this._boardContainer = boardContainer;

    this._boardComponent = new ContentView();
    this._filmList = this._boardComponent.getElement().querySelector('.films-list');
    this._sortComponent = new SortView();
    this._filmListComponent = new BoardView();
    this._noTaskComponent = new NoFilmView();

    this._renderedFilmCount = CARD_COUNT_STEP;
    this._loadButton = new ButtonView();

    this._handleLoadButton = this._handleLoadButton.bind(this);
  }

  init (boardFilms) {
    this._boardFilms = boardFilms.slice();

    this._renderSort();
    renderTemplate(this._boardContainer, this._boardComponent);
    renderTemplate(this._filmList, this._filmListComponent);

    this._renderBoard();
  }

  _renderSort () {
    renderTemplate(this._boardContainer, this._sortComponent);
  }

  _renderFilm (card) {
    const film = new FilmCardView(card);
    film.handlerFilmControls(card);
    renderTemplate(this._filmListComponent, film);
  }

  _renderFilms (from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(boardFilm));
  }

  _renderListFilms () {
    this._renderFilms(0, Math.min(this._boardFilms.length, CARD_COUNT_STEP));

    if (this._boardFilms.length > CARD_COUNT_STEP) {
      this._renderLoadButton();
    }

    this._renderDescFilm(this._boardFilms);
  }

  _renderNoFilms () {
    renderTemplate(this._boardComponent, this._noTaskComponent);
  }

  _handleLoadButton() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + CARD_COUNT_STEP);

    this._renderedFilmCount += CARD_COUNT_STEP;

    if (this._renderedFilmCount >= this._boardFilms.length) {
      remove(this._loadButton);
    }
  }

  _renderLoadButton () {
    renderTemplate(this._filmList, this._loadButton);

    this._loadButton.setClickHandler(this._handleLoadButton);
  }

  _renderDescFilm (cards) {
    this._filmListComponent.renderPopup((evt) => {
      evt.preventDefault();
      if (evt.target.classList.contains('film-card__poster') || evt.target.classList.contains('film-card__title') || evt.target.classList.contains('film-card__comments')) {
        const film = cards.find((card) => card.id === Number(evt.target.parentNode.dataset.id));
        const popup = new PopupView(film);
        popup.closePopup();

        renderTemplate(document.body, popup.getElement());
        document.body.classList.add('hide-overflow');
      }
    });
  }

  _renderBoard () {
    if (this._boardFilms.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderListFilms();
  }
}
