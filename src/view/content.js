import { createElement } from '../utils';

const createContent = () => (`<section class="films">
    <section class="films-list">
    </section>
  </section>
`);

export default class Content {
  constructor () {
    this._element = null;
  }

  getTemplate () {
    return createContent();
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
