import AbstractView from './abstract.js';
import { UpdateType, FilterType } from '../utils/const.js';

const createFilter = (filter, currentFilterType) => {
  const {name, count} = filter;

  return (`
    <a href="#${name}" class="main-navigation__item ${currentFilterType === name ? 'main-navigation__item--active': ''}" data-filter-name="${name}">${name}<span class="main-navigation__item-count">${count}</span></a>
  `);
};

const createMenu = (filterItems, currentFilterType) => {
  const filterFilms = filterItems.map((filter) => createFilter(filter, currentFilterType)).join('');

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" data-filter-name="all" class="main-navigation__item ${currentFilterType === FilterType.ALL ? 'main-navigation__item--active': ''}">All movies</a>
        ${filterFilms}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class NavMenu extends AbstractView {
  constructor (filters, filterModel) {
    super();

    this._filterModel = filterModel;

    this._filters = filters;

    this._filterHandler = this._filterHandler.bind(this);

    this.addClickHandler();
  }

  _filterHandler (evt) {
    evt.preventDefault();
    if (evt.target.closest('.main-navigation__item')) {
      this._filterModel.setFilter(UpdateType.MAJOR, evt.target.dataset.filterName);
    }
  }

  addClickHandler () {
    this.getElement().addEventListener('click', this._filterHandler);
  }

  getTemplate () {
    return createMenu(this._filters, this._filterModel.getFilter());
  }
}

