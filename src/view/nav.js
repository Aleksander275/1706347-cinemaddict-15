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

    this.addClickHendler();
  }

  _filterHendler (evt) {
    evt.preventDefault();
    const navItems =  this.getElement().querySelectorAll('.main-navigation__item');
    navItems.forEach((button) => {
      const navItem = evt.target.closest('.main-navigation__item');
      button.classList.toggle('main-navigation__item--active', button === navItem);
    });
  }

  addClickHendler () {
    this.getElement().addEventListener('click', this._filterHendler);
  }

  getTemplate () {
    return createMenu(this._filters);
  }
}

