import AbstractView from './abstract.js';
import { FilterType } from '../utils/const.js';

const NoFilmsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
  [FilterType.WATCHLIST]: 'There are no watchlist movies now',
  [FilterType.HISTORY]: 'There are no history movies now',
};

const createNoFilmTemplate = (filterType) => {
  const noFilmTextValue = NoFilmsTextType[filterType];

  return (
    `<h2 class="films-list__title">${noFilmTextValue}</h2>`);
};

export default class NoFilm extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoFilmTemplate(this._data);
  }
}
