import AbstractView from './abstract.js';
import { getProfile } from '../utils/utils.js';

const createHeaderProfile = (cards) => {
  const arrayHistory = cards.filter((card) => card.isHistory);

  return `<section class="header__profile profile">
    <p class="profile__rating">${getProfile(arrayHistory)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export default class HeaderProfile extends AbstractView {
  constructor (cards) {
    super();
    this._cards = cards;
  }

  getTemplate () {
    return createHeaderProfile(this._cards);
  }
}
