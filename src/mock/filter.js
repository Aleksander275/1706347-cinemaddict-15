const cardToFilterMap = {
  watchlist: (cards) => cards.filter((card) => card.isWatchlist).length,
  History: (cards) => cards.filter((card) => card.isHistory).length,
  Favorites: (cards) => cards.filter((card) => card.isFavorite).length,
};

const getFilter = (cards) => Object.entries(cardToFilterMap).map(
  ([filterName, countCard]) => ({
    name: filterName,
    count: countCard(cards),
  }),
);

export {getFilter};
