import SortView from '../view/sort.js';
import ContentView from '../view/content.js';
import FilmPresenter from './film.js';
import ButtonView  from '../view/button__show-more.js';
import PopupView from '../view/popup.js';
import NoFilmView from '../view/no-film.js';
import BoardView from '../view/board.js';
import { renderTemplate, remove, updateItem, sortRating, sortDate } from '../utils.js';
import { SortType } from '../const.js';

const CARD_COUNT_STEP = 5;

export default class BoardFilm {
  constructor (boardContainer) {
    this._boardContainer = boardContainer;

    this._boardComponent = new ContentView();
    this._filmList = this._boardComponent.getElement().querySelector('.films-list');
    this._sortComponent = new SortView();
    this._filmListComponent = new BoardView();
    this._noFilmComponent = new NoFilmView();

    this._renderedFilmCount = CARD_COUNT_STEP;
    this._loadButton = new ButtonView();

    this._handleLoadButton = this._handleLoadButton.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);

    this._filmsPresenters = new Map();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._currentSortType = SortType.DEFAULT;
  }

  init (boardFilms) {
    this._boardFilms = boardFilms.slice();

    this._sourcedBoardFilms = boardFilms.slice();

    this._renderSort();
    renderTemplate(this._boardContainer, this._boardComponent);
    renderTemplate(this._filmList, this._filmListComponent);

    this._renderBoard();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._boardFilms.sort(sortDate);
        break;
      case SortType.RATING:
        this._boardFilms.sort(sortRating);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderListFilms();
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._sourcedBoardFilms = updateItem(this._sourcedBoardFilms, updatedFilm);
    this._filmsPresenters.get(updatedFilm.id).init(updatedFilm);
  }

  _renderSort () {
    renderTemplate(this._boardContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm (card) {
    const filmPresenter = new FilmPresenter(this._filmListComponent, this._handleFilmChange);
    filmPresenter.init(card);
    this._filmsPresenters.set(card.id, filmPresenter);
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

  _clearFilmList() {
    this._filmsPresenters.forEach((presenter) => presenter.destroy());
    this._filmsPresenters.clear();
    this._renderedFilmCount = CARD_COUNT_STEP;
    remove(this._loadButton);
  }

  _renderNoFilms () {
    renderTemplate(this._boardComponent, this._noFilmComponent);
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
