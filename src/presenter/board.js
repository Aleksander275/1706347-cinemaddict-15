import SortView from '../view/sort.js';
import ContentView from '../view/content.js';
import FilmPresenter from './film.js';
import ButtonView  from '../view/button__show-more.js';
import NoFilmView from '../view/no-film.js';
import BoardView from '../view/board.js';
import { renderTemplate, remove, sortRating, sortDate } from '../utils/utils.js';
import { SortType, UpdateType, UserAction, StatusFilm } from '../utils/const.js';

const CARD_COUNT_STEP = 5;

export default class BoardFilm {
  constructor (boardContainer, filmsModel) {
    this._boardContainer = boardContainer;

    this._filmsModel = filmsModel;

    this._boardComponent = new ContentView();
    this._filmList = this._boardComponent.getElement().querySelector('.films-list');
    this._sortComponent = new SortView();
    this._filmListComponent = new BoardView();
    this._noFilmComponent = new NoFilmView();

    this._renderedFilmCount = CARD_COUNT_STEP;
    this._loadButton = new ButtonView();

    this._handleLoadButton = this._handleLoadButton.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsPresenters = new Map();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._currentSortType = SortType.DEFAULT;

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init () {
    this._renderSort();
    renderTemplate(this._boardContainer, this._boardComponent);
    renderTemplate(this._filmList, this._filmListComponent);

    this._renderBoard();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortDate);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortRating);
    }

    return this._filmsModel.getFilms();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmList();
    this._renderListFilms();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case StatusFilm.TOGGLE_FAVORITE:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case StatusFilm.TOGGLE_HISTORY:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case StatusFilm.TOGGLE_WATCHLIST:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._filmsPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  _renderSort () {
    renderTemplate(this._boardContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm (card) {
    const filmPresenter = new FilmPresenter(this._filmListComponent, this._handleViewAction);
    filmPresenter.init(card);
    this._filmsPresenters.set(card.id, filmPresenter);
  }

  _renderFilms (films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderListFilms () {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, CARD_COUNT_STEP));

    this._renderFilms(films);

    if (filmCount > CARD_COUNT_STEP) {
      this._renderLoadButton();
    }
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
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + CARD_COUNT_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);

    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._loadButton);
    }
  }

  _renderLoadButton () {
    renderTemplate(this._filmList, this._loadButton);

    this._loadButton.setClickHandler(this._handleLoadButton);
  }

  _renderBoard () {
    if (this._getFilms().length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderListFilms();
  }
}
