import SortView from '../view/sort.js';
import ContentView from '../view/content.js';
import FilmPresenter from './film.js';
import ButtonView  from '../view/button__show-more.js';
import NoFilmView from '../view/no-film.js';
import BoardView from '../view/board.js';
import { filter } from '../utils/filters.js';
import { renderTemplate, remove, sortRating, sortDate } from '../utils/utils.js';
import { SortType, UpdateType, UserAction, StatusFilm } from '../utils/const.js';

const CARD_COUNT_STEP = 5;

export default class BoardFilm {
  constructor (boardContainer, filmsModel, filterModel) {
    this._boardContainer = boardContainer;

    this._filmsModel = filmsModel;
    this._filterModel = filterModel;

    this._boardComponent = null;
    this._sortComponent = null;
    this._filmListComponent = null;
    this._noFilmComponent = new NoFilmView();

    this._renderedFilmCount = CARD_COUNT_STEP;
    this._loadButton = null;

    this._handleLoadButton = this._handleLoadButton.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsPresenters = new Map();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._currentSortType = SortType.DEFAULT;

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init () {
    this._renderSort();
    this._renderBoard();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.sort(sortDate);
      case SortType.RATING:
        return filtredFilms.sort(sortRating);
    }

    return filtredFilms;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedFilmCount: true});
    this._renderSort();
    this._renderBoard();
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
        this._filmsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderSort();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderSort();
        this._renderBoard();
        break;
    }
  }

  _renderSort () {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    renderTemplate(this._boardContainer, this._sortComponent);
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
    const filmList = this._boardComponent.getElement().querySelector('.films-list');

    if (this._loadButton !== null) {
      this._loadButton = null;
    }

    this._loadButton = new ButtonView();
    this._loadButton.setClickHandler(this._handleLoadButton);

    renderTemplate(filmList, this._loadButton);
  }

  _renderBoard () {
    this._boardComponent = new ContentView;
    this._filmListComponent = new BoardView;
    const filmList = this._boardComponent.getElement().querySelector('.films-list');
    renderTemplate(this._boardContainer, this._boardComponent);
    renderTemplate(filmList, this._filmListComponent);

    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderLoadButton();
    }
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._filmsPresenters.forEach((presenter) => presenter.destroy());
    this._filmsPresenters.clear();

    remove(this._filmListComponent);
    remove(this._boardComponent);
    remove(this._sortComponent);
    remove(this._noFilmComponent);
    remove(this._loadButton);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = CARD_COUNT_STEP;
    } else {
      this._renderedTaskCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
