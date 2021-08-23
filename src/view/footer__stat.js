import AbstractView from './abstract.js';

const createFooterStat = (quantityMovie) => (`<p>${quantityMovie} movies inside</p>`);

export default class FooterStat extends AbstractView {
  constructor (quantityMovie) {
    super();

    this._quantityMovie = quantityMovie;
  }

  getTemplate () {
    return createFooterStat(this._quantityMovie);
  }
}
