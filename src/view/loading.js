import { createElement } from '../utils';

const createLoading = () => (`
  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>
`);

export default class Loading {
  constructor () {
    this._element = null;
  }

  getTemplate () {
    return createLoading();
  }

  getElement () {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
