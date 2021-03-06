import AbstractObserver from '../utils/abstract-observer';
import { FilterType } from '../utils/const';

export default class Filter extends AbstractObserver {
  constructor () {
    super();
    this._activeFilter = FilterType.ALL;

    this.setFilter = this.setFilter.bind(this);
    this.getFilter = this.getFilter.bind(this);
  }

  setFilter (updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter () {
    return this._activeFilter;
  }
}
