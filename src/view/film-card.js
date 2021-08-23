import AbstractView from './abstract.js';

const createFilmCard = (card) => {
  const {
    id,
    poster,
    title,
    rating,
    date,
    runtime,
    genres,
    description,
    commentLength,
    isWatchlist,
    isHistory,
    isFavorite,
  } = card;

  const watchlistClassName = isWatchlist
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';

  const historyClassName = isHistory
    ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item--mark-as-watched';

  const favoriteClassName = isFavorite
    ? 'film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item--favorite';

  return `<article data-id=${id} class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genres}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${commentLength}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item ${historyClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
    </article>`;
};

export default class FilmCard extends AbstractView {
  constructor (card) {
    super();

    this._card = card;

    this.handlerFilmControls = this.handlerFilmControls.bind(this);
  }

  getTemplate () {
    return createFilmCard(this._card);
  }

  handlerFilmControls () {
    this.getElement().querySelector('.film-card__controls').addEventListener('click', (evt) => {
      evt.target.classList.toggle('film-card__controls-item--active');
    });
  }
}
