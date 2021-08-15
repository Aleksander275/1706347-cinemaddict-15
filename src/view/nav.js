const createFilter = (filter) => {
  const {name, count} = filter;

  return (`
    <a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>
  `);
};

const createMenu = (filterItems) => {
  const filterFilms = filterItems.map((filter) => createFilter(filter)).join('');

  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterFilms}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export {createMenu};

