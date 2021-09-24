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

const filmsViewed = {
  novice: 0,
  fan: 10,
  buff: 20,
};

const SHAKE_ANIMATION_TIMEOUT = 600;

const MINUTES = 60;

export { SortType, UserAction, UpdateType, StatusFilm, FilterType, StatsFilterType, SHAKE_ANIMATION_TIMEOUT, MINUTES, filmsViewed};
