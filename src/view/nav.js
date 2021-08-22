import AbstractView from './abstract.js';

const createFilter = (filter) => {
  const {name, count} = filter;

  return (`
    <a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>
  `);
};

const createMenu = (filterItems) => {
  const filterFilms = filterItems.map((filter) => createFilter(filter)).join('');

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterFilms}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class NavMenu extends AbstractView {
  constructor (filters) {
    super();

    this._filters = filters;

    this._filterHendler = this._filterHendler.bind(this);
  }

  _filterHendler (evt) {
    evt.preventDefault();
    const filterButtons = this.getElement().querySelectorAll('.main-navigation__item');
    filterButtons.forEach((button) => {
      button === evt.currentTarget
        ? button.classList.add('main-navigation__item--active')
        : button.classList.remove('main-navigation__item--active');
    });
  }

  addClickHendler (button) {
    button.addEventListener('click', this._filterHendler);
  }

  getTemplate () {
    return createMenu(this._filters);
  }
}

