import Abstract from '../view/abstract.js';
import { StatsFilterType, filmsViewed } from './const.js';
import dayjs from 'dayjs';

const renderTemplate = (container, element, position = true) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  if (position) {
    container.append(element);
  } else {
    container.prepend(element);
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

const sortDate = (filmA, filmB) => {
  if (filmA.date > filmB.date) {
    return -1;
  }
  if (filmA.date < filmB.date) {
    return 1;
  }

  return 0;
};

const sortRating = (filmA, filmB) => {
  if (filmA.rating > filmB.rating) {
    return -1;
  }
  if (filmA.rating < filmB.rating) {
    return 1;
  }

  return 0;
};

const getTopGenres = (films, isSortCount) => {
  const genres = films.reduce((acc, element) => {
    acc.push(...element.genres);
    return acc;
  }, []);

  const uniqueGenres = [...new Set(genres)];

  const getCountGenres = (sett, allGenres) => {
    const dataGenres = [];

    sett.forEach((element) => dataGenres.push({
      genres: element,
      count: allGenres.filter((elem) => elem === element).length}));

    return dataGenres;
  };

  const getSortGenres = getCountGenres(uniqueGenres, genres).sort((a, b) => (b.count > a.count) ? 1 : -1);

  const sortCounts = [];
  const sortGenres = [];

  getSortGenres.forEach((element) => {
    sortCounts.push(element.count);
    sortGenres.push(element.genres);
  });

  if (isSortCount) {
    return sortCounts;
  }
  return sortGenres;
};

const getProfile = (filtredFilms) => {

  switch (true) {
    case filtredFilms.length === filmsViewed.novice: {
      return '';
    }
    case filtredFilms.length > filmsViewed.novice && filtredFilms.length <= filmsViewed.fan: {
      return 'novice';
    }
    case filtredFilms.length > filmsViewed.fan && filtredFilms.length <= filmsViewed.buff: {
      return 'fan';
    }
    case filtredFilms.length > filmsViewed.buff: {
      return 'movie buff';
    }
  }
};

const getTotalDuration = (data) => {
  const timeList = [];
  data.forEach((film) => {
    timeList.push(film.runtime);
  });
  const sum = timeList.reduce((acc, element) => acc + element, 0);
  return sum;
};

const watchingDate = (date, sortType) => {
  switch (sortType) {
    case StatsFilterType.ALL: {
      return date;
    }
    case StatsFilterType.YEAR: {
      return date = date.filter((film) => dayjs(film.watchingDate).diff() > -31536000000);
    }
    case StatsFilterType.MONTH: {
      return date = date.filter((film) => dayjs(film.watchingDate).diff() > -2592000000);
    }
    case StatsFilterType.WEEK: {
      return date = date.filter((film) => dayjs(film.watchingDate).diff() > -604800000);
    }
    case StatsFilterType.TODAY: {
      return date = date.filter((film) => dayjs(film.watchingDate).diff() > -86400000);
    }
  }
};

export { createElement, renderTemplate, remove, replace, sortDate, sortRating, watchingDate, getTopGenres, getTotalDuration, getProfile};
