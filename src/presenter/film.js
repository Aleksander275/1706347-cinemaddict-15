import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import { renderTemplate, remove, replace } from '../utils/utils.js';
import { UpdateType, UserAction, StatusFilm } from '../utils/const';

export default class Film {
  constructor (filmContainer, changeData) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._film = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);

    this._handlerFilmDescClick = {
      'favorite': this._handleFavoriteClick,
      'watched': this._handleHistoryClick,
      'watchlist': this._handleWatchlistClick,
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

    this._film = new FilmCardView(card);
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
        const popup = new PopupView(this._card);
        popup.closePopup();
        popup.setClickHandler(this._handlerFilmDescClick);
        popup.handlerAddComment();

        if (document.querySelector('.film-details')) {
          document.querySelector('.film-details').remove();
          renderTemplate(document.body, popup.getElement());
        }

        renderTemplate(document.body, popup.getElement());
        document.body.classList.add('hide-overflow');
      }
    }));
  }

  _handleFavoriteClick() {
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
    );
  }

  _handleHistoryClick () {
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
    );
  }

  _handleWatchlistClick () {
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
    );
  }
}

