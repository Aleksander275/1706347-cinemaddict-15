import SmartView from './smart.js';

const ESC = 27;

const createGenre = (genre) => `<span class="film-details__genre">${genre}</span>`;

const getGenre = (array) => {
  const arrayGenre = array.map((genre) => createGenre(genre));
  return arrayGenre;
};

const getComment = (comment) => {
  const {
    text,
    emotion,
    author,
    commentDate,
  } = comment;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
    </li>`;
};

const createPopup = (data) => {
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
    comments,
    commentLength,
    isWatchlist,
    isHistory,
    isFavorite,
    isComments,
    isEmoji,
    isEmojiName,
  } = data;

  const createComments = (array) => {
    const arrayComments = array.map((comment) => getComment(comment));
    return arrayComments;
  };

  const createContainerComments = (dataComments) => dataComments
    ? `<ul class="film-details__comments-list">
      ${createComments(comments)}
      </ul>`
    : '';

  const createEmojiComment = (dataEmoji) => dataEmoji
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
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentLength}</span></h3>
          ${createContainerComments(isComments)}

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${createEmojiComment(isEmoji)}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
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
  constructor (card) {
    super();

    this._data = Popup.parseCardToData(card);

    this._emojiInputHandler = this._emojiInputHandler.bind(this);
    this._textInputHandler = this._textInputHandler.bind(this);

    this._setInnerHandlers();
  }

  setClickHandler (handlerElementClick) {
    this._callback.descControl = handlerElementClick;
    Object.keys(handlerElementClick).forEach((key) => {
      this.getElement().querySelector(`.film-details__control-button--${key}`).addEventListener('click', handlerElementClick[key]);
    });
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.closePopup();
    this.setClickHandler(this._callback.descControl);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('input', this._emojiInputHandler);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._textInputHandler);
  }

  _emojiInputHandler (evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
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
  }

  _keyCloseHandler () {
    document.addEventListener('keydown', ({keyCode}) => {
      if (keyCode === ESC) {
        this._closeElement();
      }
    });
  }

  closePopup () {
    this._keyCloseHandler();
    const button = this.getElement().querySelector('.film-details__close-btn');
    button.addEventListener('click', () => {
      this._closeElement();
    });
  }

  getTemplate () {
    return createPopup(this._data);
  }

  static parseCardToData (card) {
    return Object.assign(
      {},
      card,
      {
        isComments: card.commentLength,
        isEmoji: false,
        isEmojiName: null,
        isTextComment: '',
      },
    );
  }

  static parseDataToCard(data) {
    data = Object.assign({}, data);

    delete data.isComments;
    delete data.isEmoji;
    delete data.isEmojiName;
    delete data.isTextComment;

    return data;
  }

  removeElement () {
    this._element = null;
  }
}
