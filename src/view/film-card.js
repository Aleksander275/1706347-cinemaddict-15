import AbstractView from './abstract.js';
import dayjs from 'dayjs';
import { MINUTES } from '../utils/const.js';

const createFilmCard = (card, comments) => {
  const {
    id,
    poster,
    title,
    rating,
    date,
    runtime,
    genres,
    description,
    isWatchlist,
    isHistory,
    isFavorite,
  } = card;

  const hoursTime = Math.floor(runtime / MINUTES);
  const minutesTime = runtime % MINUTES;

  const generateDate = () => dayjs(date).format('YYYY');

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
      <span class="film-card__year">${generateDate()}</span>
      <span class="film-card__duration">${hoursTime}h ${minutesTime}m</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item ${historyClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
    </article>`;
};

export default class FilmCard extends AbstractView {
  constructor (card, commentsModel) {
    super();

    this._commentsModel = commentsModel;
    this._card = card;
    this._comments = this._commentsModel.getCommentsById(this._card.id);
  }

  getTemplate () {
    return createFilmCard(this._card, this._comments);
  }

  setFilmClickHandler (handlerElementClick) {
    Object.keys(handlerElementClick).forEach((key) => {
      this.getElement().querySelector(`.film-card__controls-item--${key}`).addEventListener('click', handlerElementClick[key]);
    });
  }
}
