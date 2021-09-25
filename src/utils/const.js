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

const FilmsViewed = {
  NOVICE: 0,
  FAN: 10,
  BUFF: 20,
};

const FilterDate = {
  YEAR: -31536000000,
  MONTH: -2592000000,
  WEEK: -604800000,
  TODAY: -86400000,
};

const SHAKE_ANIMATION_TIMEOUT = 600;

const MINUTES = 60;

export { SortType, UpdateType, StatusFilm, FilterType, StatsFilterType, SHAKE_ANIMATION_TIMEOUT, MINUTES, FilmsViewed, FilterDate};
