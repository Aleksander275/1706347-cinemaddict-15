import { createElement } from '../utils';

const createFooterStat = (quantityMovie) => (`<p>${quantityMovie} movies inside</p>`);

export default class FooterStat {
  constructor (quantityMovie) {
    this._quantityMovie = quantityMovie;
    this._element = null;
  }

  getTemplate () {
    return createFooterStat(this._quantityMovie);
  }

  getElement () {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
