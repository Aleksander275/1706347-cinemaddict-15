import AbstractObserver from '../utils/abstract-observer.js';

export default class Comments extends AbstractObserver {
  constructor (api) {
    super();
    this._comments = {};
    this._api = api;
  }

  setComments(updateType, cards) {
    this._comments = cards.reduce((acc, c) => {
      const [[key, value]] = Object.entries((c));
      acc[key] = value;
      return acc;
    }, {});

    this._notify(updateType);
  }

  getCommentsById(id) {
    return this._comments[id];
  }

  addComment(updateType, update) {
    const [key] = Object.keys(update);
    this._comments[key].push(update[key]);

    this._notify(updateType, update);
  }

  deleteComment(updateType, commentId, filmId) {
    const filmIndex = this._comments[filmId].findIndex(({id}) => id === commentId);
    this._comments[filmId].splice(filmIndex, 1);
    this._notify(updateType);
  }
}
