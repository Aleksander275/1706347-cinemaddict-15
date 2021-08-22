import AbstractView from './abstract.js';

const createContentExtra = () => (`<section class="films-list films-list--extra">
    <h2 class="films-list__title"></h2>
    <div class="films-list__container">
    </div>
  </section>
`);

export default class ContentExtra extends AbstractView {
  getTemplate () {
    return createContentExtra();
  }
}
