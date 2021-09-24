import SmartView from './smart.js';
import { UpdateType, SHAKE_ANIMATION_TIMEOUT } from '../utils/const.js';
import dayjs from 'dayjs';
import he from 'he';

const ESC = 27;
const ENTER = 13;

const createGenre = (genre) => `<span class="film-details__genre">${genre}</span>`;

const getGenre = (genres) => genres.map((genre) => createGenre(genre));

const getComment = (newComment, isDeleting, isDisabled) => {
  const {
    id,
    comment,
    emotion,
    author,
    date,
  } = newComment;

  const getDate = () => dayjs(date).format('YYYY/MM/DD HH:mm');

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      ${emotion ? `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}"></img>` : ''}
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${getDate()}</span>
        <button data-id="${id}" class="film-details__comment-delete" ${isDisabled ? 'disabled': ''}>${isDeleting ? 'Deleting...': 'Delete'}</button>
      </p>
    </div>
    </li>`;
};

const createPopup = (data, comments) => {
  const {
    poster,
    title,
    alternativeTitle,
    rating,
    ageRating,
    director,
    writers,
    actors,
    date,
    releaseCountry,
    runtime,
    genres,
    description,
    isWatchlist,
    isHistory,
    isFavorite,
    isEmoji,
    isEmojiName,
    isDeleting,
    isDisabled,
  } = data;

  const createComments = (newComments) => newComments.map((comment) => getComment(comment, isDeleting, isDisabled)).join(' ');

  const createContainerComments = (hasComments) => hasComments
    ? `<ul class="film-details__comments-list">
      ${createComments(comments)}
      </ul>`
    : '';

  const createEmojiComment = (shouldRenderImg) => shouldRenderImg
    ? `<img src="./images/emoji/${isEmojiName}.png" width="30" height="30" alt="emoji">`
    : '';

  const genreTitle = genres.length > 1 ? 'Genres' : 'Genre';

  const watchlistClassName = isWatchlist
    ? 'film-details__control-button--watchlist film-details__control-button--active'
    : 'film-details__control-button--watchlist';

  const historyClassName = isHistory
    ? 'film-details__control-button--watched film-details__control-button--active'
    : 'film-details__control-button--watched';

  const favoriteClassName = isFavorite
    ? 'film-details__control-button--favorite film-details__control-button--active'
    : 'film-details__control-button--favorite';

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${date}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genreTitle}</td>
                <td class="film-details__cell">
                  ${getGenre(genres)}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${watchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${historyClassName}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          ${createContainerComments(Boolean(comments.length))}

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${createEmojiComment(isEmoji)}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" autocomplete="off" ${isDisabled ? 'disabled': ''}></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isDisabled ? 'disabled': ''}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isDisabled ? 'disabled': ''}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isDisabled ? 'disabled': ''}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isDisabled ? 'disabled': ''}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>
  `;
};

export default class Popup extends SmartView {
  constructor (card, commentsModel, api) {
    super();

    this._commentsModel = commentsModel;
    this._data = Popup.parseCardToData(card);
    this._comments = this._commentsModel.getCommentsById(this._data.id);
    this._api = api;

    this._shake = this._shake.bind(this);
    this._newShake = this._newShake.bind(this);
    this._emojiInputHandler = this._emojiInputHandler.bind(this);
    this._textInputHandler = this._textInputHandler.bind(this);
    this.handlerAddComment = this.handlerAddComment.bind(this);
    this.handlerRemoveComment = this.handlerRemoveComment.bind(this);
    this._handlerKeyEsc = this._handlerKeyEsc.bind(this);

    this._setInnerHandlers();
  }

  setClickHandler (handlerElementClick) {
    this._callback.descControl = handlerElementClick;
    Object.keys(handlerElementClick).forEach((key) => {
      this.getElement().querySelector(`.film-details__control-button--${key}`).addEventListener('click', () => {
        const {flag, method} = handlerElementClick[key];

        method({[flag]: !this._data[flag]}, this._newShake, () => this.updateData({
          [flag]: !this._data[flag],
          scrollPosition: this.getElement().scrollTop,
        }));
      });
    });
    this.getElement().scrollTop = this._data.scrollPosition;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.closePopup();
    this.handlerAddComment();
    this.handlerRemoveComment();
    this.setClickHandler(this._callback.descControl);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('input', this._emojiInputHandler);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._textInputHandler);
  }

  handlerAddComment () {
    this.getElement().querySelector('.film-details__comment-input').addEventListener('keydown', (evt) => {
      if (evt.ctrlKey && evt.keyCode === ENTER) {
        this._addComment(evt.target.value);
      }
    });
  }

  handlerRemoveComment () {
    if (this._commentsModel.getCommentsById(this._data.id).length) {
      this.getElement().querySelector('.film-details__comments-list').addEventListener('click', (evt) => {
        evt.preventDefault();
        if (evt.target.classList.contains('film-details__comment-delete')) {
          const commentId = evt.target.dataset.id;
          this._removeComment(commentId);
        }
      });
    }
  }

  _removeComment (commentId) {
    this.updateData({isDisabled: true, isDeleting: true, scrollPosition: this.getElement().scrollTop});
    this.getElement().scrollTop = this._data.scrollPosition;

    this._api.deleteComment(commentId)
      .then(() => {
        this._commentsModel.deleteComment(UpdateType.MINOR, commentId, this._data.id);
        this.updateData({comments: this._commentsModel.getCommentsById(this._data.id), isDisabled: false, isDeleting: false});
        this.getElement().scrollTop = this._data.scrollPosition;
      })
      .catch(() => {
        this._shake(() => {
          this.updateData({isEmoji: false, isTextComment: '', isEmojiName: null, isDisabled: false, isDeleting: false});
        });
      });
  }

  _addComment (text) {
    this.updateData({isDisabled: true});
    this.getElement().scrollTop = this._data.scrollPosition;

    this._api.addComment({
      comment: he.encode(text),
      emotion: this._emojiName,
    }, this._data.id)
      .then((response) => {
        const comment = response.comments.pop();
        this._commentsModel.addComment(UpdateType.MINOR, {[this._data.id]: comment});
        this._emojiName = null;
        this.updateData({comments: this._commentsModel.getCommentsById(this._data.id), isEmoji: false, isTextComment: '', isEmojiName: null, isDisabled: false, isDeleting: false});
        this.getElement().scrollTop = this._data.scrollPosition;
      })
      .catch(() => {
        this._shake(() => {
          this.updateData({isEmoji: false, isTextComment: '', isEmojiName: null, isDisabled: false, isDeleting: false});
        });
      });
  }

  _emojiInputHandler (evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this._emojiName = evt.target.value;

      this.updateData({
        isEmoji: true,
        isEmojiName: evt.target.value,
        scrollPosition: this.getElement().scrollTop,
      });
    }

    this.getElement().scrollTop = this._data.scrollPosition;
    this.getElement().querySelector('.film-details__comment-input').value = this._data.isTextComment;
  }

  _textInputHandler (evt) {
    evt.preventDefault();
    this.updateData({
      isTextComment: evt.target.value,
    }, true);
  }

  _closeElement () {
    this.getElement().remove();
    document.body.classList.remove('hide-overflow');
    this._keyCloseRemoveHandler();
  }

  _keyCloseAddHandler () {
    document.addEventListener('keydown', this._handlerKeyEsc);
  }

  _keyCloseRemoveHandler () {
    document.removeEventListener('keydown', this._handlerKeyEsc);
  }

  _handlerKeyEsc ({keyCode}) {
    if (keyCode === ESC) {
      this._closeElement();
    }
  }

  closePopup () {
    this._keyCloseAddHandler();
    const button = this.getElement().querySelector('.film-details__close-btn');
    button.addEventListener('click', () => {
      this._closeElement();
    });
  }

  getTemplate () {
    return createPopup(this._data, this._comments);
  }

  _shake(callback) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = '';
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _newShake() {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = '';
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  static parseCardToData (card) {
    return Object.assign(
      {},
      card,
      {
        isEmoji: false,
        isEmojiName: null,
        isTextComment: '',
        scrollPosition: null,
        isDeleting: false,
        isDisabled: false,
      },
    );
  }

  removeElement () {
    this._element = null;
  }
}
