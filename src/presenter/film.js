import FilmCardView from '../view/film-card';
import { renderTemplate, remove, replace } from '../utils.js';

export default class Film {
  constructor (filmContainer, changeData) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._film = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
  }

  init (card) {
    this._card = card;

    const prevFilmComponent = this._film;

    this._film = new FilmCardView(card);
    this._film.setFavoriteClickHandler(this._handleFavoriteClick);
    this._film.setHistoryClickHandler(this._handleHistoryClick);
    this._film.setWatchlistClickHandler(this._handleWatchlistClick);

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

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          isFavorite: !this._card.isFavorite,
        },
      ),
    );
  }

  _handleHistoryClick () {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          isHistory: !this._card.isHistory,
        },
      ),
    );
  }

  _handleWatchlistClick () {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          isWatchlist: !this._card.isWatchlist,
        },
      ),
    );
  }
}

