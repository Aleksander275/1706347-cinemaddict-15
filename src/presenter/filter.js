import NavMenuView from '../view/nav-menu.js';
import { replace, remove, renderTemplate } from '../utils/utils.js';
import { filter } from '../utils/filters.js';
import { FilterType } from '../utils/const.js';

export default class Filter {
  constructor( filterContainer, filterModel, filmsModel ) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new NavMenuView(filters, this._filterModel);

    if (prevFilterComponent === null) {
      renderTemplate(this._filterContainer, this._filterComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.WATCHLIST,
        name: 'watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'history',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
      {
        type: FilterType.STATS,
      },
    ];
  }
}
