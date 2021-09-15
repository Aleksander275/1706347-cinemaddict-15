import AbstractObserver from '../utils/abstract-observer.js';

export default class Comments extends AbstractObserver {
  constructor () {
    super();
    this._comments = {};
  }

  setComments(cards) {
    this._comments = cards.reduce((acc, card) => {
      acc[card.id] = card.comments;
      return acc;
    }, {});
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
