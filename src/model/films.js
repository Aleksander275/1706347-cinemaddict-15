import AbstractObserver from '../utils/abstract-observer.js';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm (updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        poster: film['film_info'].poster,
        title: film['film_info'].title,
        alternativeTitle: film['film_info'].alternative_title,
        rating: film['film_info'].total_rating,
        ageRating: film['film_info'].age_rating,
        director: film['film_info'].director,
        writers: film['film_info'].writers,
        actors: film['film_info'].actors,
        date: film['film_info'].release.date,
        releaseCountry: film['film_info'].release.release_country,
        runtime: film['film_info'].runtime,
        genres: film['film_info'].genre,
        description: film['film_info'].description,
        commentsId: film.comments,
        isWatchlist: film['user_details'].watchlist,
        isHistory: film['user_details'].already_watched,
        isFavorite: film['user_details'].favorite,
        watchingDate: film['user_details'].watching_date,
      },
    );

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];
    delete adaptedFilm.comments;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'film_info': {
          'poster': film.poster,
          'title': film.title,
          'alternative_title': film.alternativeTitle,
          'total_rating': film.rating,
          'age_rating': film.ageRating,
          'director': film.director,
          'writers': film.writers,
          'actors': film.actors,
          'release': {
            'release_country': film.releaseCountry,
            'date': film.date,
          },
          'runtime': film.runtime,
          'genre': film.genres,
          'description': film.description,
        },
        'comments': film.commentsId,
        'user_details': {
          'watchlist': film.isWatchlist,
          'already_watched': film.isHistory,
          'favorite': film.isFavorite,
          'watching_date': film.watchingDate,
        },
      },
    );

    delete adaptedFilm.poster;
    delete adaptedFilm.title;
    delete adaptedFilm.alternativeTitle;
    delete adaptedFilm.rating;
    delete adaptedFilm.ageRating;
    delete adaptedFilm.director;
    delete adaptedFilm.writers;
    delete adaptedFilm.actors;
    delete adaptedFilm.releaseCountry;
    delete adaptedFilm.date;
    delete adaptedFilm.runtime;
    delete adaptedFilm.genres;
    delete adaptedFilm.description;
    delete adaptedFilm.commentsId;
    delete adaptedFilm.isWatchlist;
    delete adaptedFilm.isHistory;
    delete adaptedFilm.isFavorite;
    delete adaptedFilm.watchingDate;

    return adaptedFilm;
  }
}
