const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const StatusFilm = {
  TOGGLE_WATCHLIST:  'watchlist',
  TOGGLE_HISTORY:  'watched',
  TOGGLE_FAVORITE:  'favorite',
};

const UserAction = {
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export { SortType, UserAction, UpdateType, StatusFilm, FilterType };
