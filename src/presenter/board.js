import SortView from '../view/sort.js';
import ContentView from '../view/content.js';
import FilmPresenter from './film.js';
import ButtonView  from '../view/button.js';
import LoadingView from '../view/loading.js';
import NoFilmView from '../view/no-film.js';
import BoardView from '../view/board.js';
import StatisticView from '../view/statistic.js';
import { filter } from '../utils/filters.js';
import { renderTemplate, remove, sortRating, sortDate, watchingDate } from '../utils/utils.js';
import { SortType, UpdateType, StatusFilm, FilterType, StatsFilterType } from '../utils/const.js';

const CARD_COUNT_STEP = 5;

export default class Board {
  constructor (boardContainer, filmsModel, filterModel, commentsModel, api, headerComponent) {
    this._boardContainer = boardContainer;

    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;

    this._isLoading = true;

    this._filterType = FilterType.ALL;
    this._statsFilterType = StatsFilterType.ALL;
    this._headerComponent = headerComponent;
    this._boardComponent = null;
    this._sortComponent = null;
    this._filmListComponent = null;
    this._noFilmComponent = null;
    this._statsComponent = null;
    this._loadingComponent = new LoadingView();
    this._api = api;

    this._renderedFilmCount = CARD_COUNT_STEP;
    this._loadButton = null;

    this._handleLoadButton = this._handleLoadButton.bind(this);
    this._handleStatsFilter = this._handleStatsFilter.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsPresenters = new Map();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._currentSortType = SortType.DEFAULT;


  }

  init () {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);

    this._renderSort();

    this._renderBoard();
  }

  _getFilms() {
    this._filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[this._filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE: {
        return filtredFilms.sort(sortDate);
      }
      case SortType.RATING: {
        return filtredFilms.sort(sortRating);
      }
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

  _handleViewAction(actionType, updateType, update, shake, method) {
    switch (actionType) {
      case StatusFilm.TOGGLE_FAVORITE: {
        this._api.updateFilm(update)
          .then((response) =>  {
            this._filmsModel.updateFilm(updateType, response);
            if (method) {
              method();
            }
          })
          .catch(() => shake());
        break;
      }
      case StatusFilm.TOGGLE_HISTORY: {
        this._api.updateFilm(update)
          .then((response) =>  {
            this._filmsModel.updateFilm(updateType, response);
            if (method) {
              method();
            }
          })
          .catch(() => shake());
        break;
      }
      case StatusFilm.TOGGLE_WATCHLIST: {
        this._api.updateFilm(update)
          .then((response) =>  {
            this._filmsModel.updateFilm(updateType, response);
            if (method) {
              method();
            }
          })
          .catch(() => shake());
        break;
      }
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH: {
        this._filmsPresenters.get(data.id).init(data);
        this._headerComponent.updateElement();
        break;}
      case UpdateType.MINOR: {
        this._clearBoard();
        this._renderSort();
        this._renderBoard();
        break;
      }
      case UpdateType.MAJOR: {
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderSort();
        this._renderBoard();
        break;
      }
      case UpdateType.STATS: {
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderStats();
        break;
      }
      case UpdateType.INIT: {
        this._isLoading = false;
        remove(this._loadingComponent);
        remove(this._boardComponent);
        this._renderBoard();
        break;
      }
    }
  }

  _renderLoading() {
    renderTemplate(this._boardContainer, this._loadingComponent);
  }

  _renderStats() {
    if (this._statsComponent !== null) {
      this._statsComponent = null;
    }

    this._filterType = FilterType.HISTORY;
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[this._filterType](films);
    const filtredStastFilms = watchingDate(filtredFilms, this._statsFilterType);

    this._statsComponent = new StatisticView(this._statsFilterType, filtredStastFilms, filtredFilms);
    renderTemplate(this._boardContainer, this._statsComponent);
    this._statsComponent.setFilterTypeChangeHandler(this._handleStatsFilter);
  }

  _handleStatsFilter(statsFilter) {
    if (this._statsFilterType === statsFilter) {
      return;
    }

    this._statsFilterType = statsFilter;
    remove(this._statsComponent);
    this._renderStats();
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
    const filmPresenter = new FilmPresenter(this._filmListComponent, this._handleViewAction, this._commentsModel, this._api);
    filmPresenter.init(card);
    this._filmsPresenters.set(card.id, filmPresenter);
  }

  _renderFilms (films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms () {
    this._noFilmComponent = new NoFilmView(this._filterType);
    renderTemplate(this._filmListComponent, this._noFilmComponent);
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
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    this._boardComponent = new ContentView();
    this._filmListComponent = new BoardView();
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
    this._filmsPresenters.forEach((presenter) => presenter.destroy());
    this._filmsPresenters.clear();

    remove(this._loadingComponent);
    remove(this._statsComponent);
    remove(this._filmListComponent);
    remove(this._boardComponent);
    remove(this._sortComponent);

    if (this._noFilmComponent) {
      remove(this._noFilmComponent);
    }

    remove(this._loadButton);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = CARD_COUNT_STEP;
    } else {
      const filmCount = this._getFilms().length;
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
