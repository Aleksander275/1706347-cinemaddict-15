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

const StatsFilterType = {
  ALL: 'all-time',
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  TODAY: 'today',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  STATS: 'STATS',
  INIT: 'INIT',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
  STATS: 'stats',
};

export { SortType, UserAction, UpdateType, StatusFilm, FilterType, StatsFilterType };
