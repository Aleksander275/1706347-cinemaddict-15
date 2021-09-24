import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import { renderTemplate, remove, replace } from '../utils/utils.js';
import { UpdateType, StatusFilm, SHAKE_ANIMATION_TIMEOUT } from '../utils/const';

export default class Film {
  constructor (filmContainer, changeData, commentsModel, api) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._commentsModel = commentsModel;
    this._api = api;
    this._film = null;

    this._shake = this._shake.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFilmDescFavoriteClick = this._handleFilmDescFavoriteClick.bind(this);
    this._handleFilmDescHistoryClick = this._handleFilmDescHistoryClick.bind(this);
    this._handleFilmDescWatchlistClick = this._handleFilmDescWatchlistClick.bind(this);

    this._handlerFilmDescClick = {
      'favorite': {
        flag: 'isFavorite',
        method: this._handleFilmDescFavoriteClick,
      },
      'watched': {
        flag: 'isHistory',
        method: this._handleFilmDescHistoryClick,
      },
      'watchlist': {
        flag: 'isWatchlist',
        method: this._handleFilmDescWatchlistClick,
      },
    };

    this._handlerFilmClick = {
      'favorite': this._handleFavoriteClick,
      'mark-as-watched': this._handleHistoryClick,
      'add-to-watchlist': this._handleWatchlistClick,
    };
  }

  init (card) {
    this._card = card;
    const prevFilmComponent = this._film;

    this._film = new FilmCardView(card, this._commentsModel);
    this._film.setFilmClickHandler(this._handlerFilmClick);
    this._renderDescFilm();

    if (prevFilmComponent === null) {
      renderTemplate(this._filmContainer, this._film);
      return;
    }

    if (this._filmContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._film, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  destroy () {
    remove(this._film);
  }

  _renderDescFilm () {
    this._film.getElement().addEventListener('click', ((evt) => {
      evt.preventDefault();
      if (evt.target.classList.contains('film-card__poster') || evt.target.classList.contains('film-card__title') || evt.target.classList.contains('film-card__comments')) {
        const popup = new PopupView(this._card, this._commentsModel, this._api);
        popup.closePopup();
        popup.setClickHandler(this._handlerFilmDescClick);
        popup.handlerAddComment();
        popup.handlerRemoveComment();

        renderTemplate(document.body, popup.getElement());
        document.body.classList.add('hide-overflow');
      }
    }));
  }

  _handleFavoriteClick() {
    this._changeData(
      StatusFilm.TOGGLE_FAVORITE,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._card,
        {
          isFavorite: !this._card.isFavorite,
        },
      ),
      this._shake,
    );
  }

  _handleHistoryClick () {
    this._changeData(
      StatusFilm.TOGGLE_HISTORY,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._card,
        {
          isHistory: !this._card.isHistory,
        },
      ),
      this._shake,
    );
  }

  _handleWatchlistClick () {
    this._changeData(
      StatusFilm.TOGGLE_WATCHLIST,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._card,
        {
          isWatchlist: !this._card.isWatchlist,
        },
      ),
      this._shake,
    );
  }

  _handleFilmDescFavoriteClick(callback, method) {
    this._changeData(
      StatusFilm.TOGGLE_FAVORITE,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._card,
        {
          isFavorite: !this._card.isFavorite,
        },
      ),
      callback,
      method,
    );
  }

  _handleFilmDescHistoryClick (callback, method) {
    this._changeData(
      StatusFilm.TOGGLE_HISTORY,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._card,
        {
          isHistory: !this._card.isHistory,
        },
      ),
      callback,
      method,
    );
  }

  _handleFilmDescWatchlistClick (callback, method) {
    this._changeData(
      StatusFilm.TOGGLE_WATCHLIST,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._card,
        {
          isWatchlist: !this._card.isWatchlist,
        },
      ),
      callback,
      method,
    );
  }

  _shake() {
    this._film.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this._film.getElement().style.animation = '';
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

