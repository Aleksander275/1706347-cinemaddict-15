import { FilterType } from './const.js';

export const filter = {
  [FilterType.ALL]: (cards) => cards,
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.isWatchlist),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.isHistory),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.isFavorite),
};
