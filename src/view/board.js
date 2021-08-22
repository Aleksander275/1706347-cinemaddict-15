import AbstractView from './abstract.js';

export default class Board extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate () {
    return '<div class="films-list__container"></div>';
  }

  _clickHandler(evt) {
    this._callback.click(evt);
  }

  renderPopup (callback) {
    this._callback.click = callback;

    this.getElement().addEventListener('click', this._clickHandler);
  }
}
