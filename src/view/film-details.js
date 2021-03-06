import SmartView from "./smart.js";
import {humanizeFilmDate, humanizeCommentDate} from "../utils/film.js";
import {EMOJIS} from "../const.js";


const createEmojiTemplate = (emoji) => {
  return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
      </label>`;
};

const createEmojiListTemplate = () => {
  const createdEmoji = EMOJIS.map((emoji) => createEmojiTemplate(emoji)).join(``);
  return `<div class="film-details__emoji-list">
            ${createdEmoji}
          </div>`;
};

const createFilmGeneres = (generes) => {
  return generes.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``);
};

const createCommentTemplate = (filmComment) => {
  const {comment, commentAutor, commentEmoji, commentDate} = filmComment;
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${commentEmoji}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${commentAutor}</span>
          <span class="film-details__comment-day">${humanizeCommentDate(commentDate)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};


const createFilmDetailCommentTemplate = (comments) => {
  const createdComment = comments.map((comment) => createCommentTemplate(comment)).join(``);
  return `<ul class="film-details__comments-list">
            ${createdComment}
          </ul>`;

};

const createFilmDetailsTemplate = (film) => {
  const {filmTitle, filmTitleOrigin, filmPoster, filmRating,
    filmRegisseur, filmScreenwriters, filmActors, filmDate,
    filmDuration, filmСountry, filmGenres, filmAge, filmDescription,
    filmComments, isWatched, isInwatchlist, isFavorite} = film;


  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${filmPoster}" alt="">

              <p class="film-details__age">${filmAge}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmTitle}</h3>
                  <p class="film-details__title-original">Original: ${filmTitleOrigin}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${filmRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${filmRegisseur}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${filmScreenwriters.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${filmActors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${humanizeFilmDate(filmDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${filmDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${filmСountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${filmGenres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${createFilmGeneres(filmGenres)}

                </tr>
              </table>

              <p class="film-details__film-description">
                ${filmDescription.join(` `)}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInwatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

            <ul class="film-details__comments-list">
              ${createFilmDetailCommentTemplate(filmComments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
              ${createEmojiListTemplate()}
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends SmartView {
  constructor(film) {
    super();
    this._data = FilmDetails.parseFilmToData(film);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._toWatchedListClickHandler = this._toWatchedListClickHandler.bind(this);

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._filmCloseClickHandler = this._filmCloseClickHandler.bind(this);

    this._setEmojiClickHandler();
  }

  reset(film) {
    this.updateData(
        FilmDetails.parseFilmToData(film)
    );
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data);
  }

  restoreHandlers() {
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setFilmCloseClickHandler(this._callback.closeClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setToWatchlistClickHandler(this._callback.toWatchListClick);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick(FilmDetails.parseDataToFilm(this._data));
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick(FilmDetails.parseDataToFilm(this._data));
    this.updateData({
      isWatched: !this._data.isWatched
    });
  }

  _toWatchedListClickHandler(evt) {
    evt.preventDefault();
    this._callback.toWatchListClick(FilmDetails.parseDataToFilm(this._data));
    this.updateData({
      isInwatchlist: !this._data.isInwatchlist
    });
  }


  _filmCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick(this._data);
  }

  setFilmCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._filmCloseClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`#watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setToWatchlistClickHandler(callback) {
    this._callback.toWatchListClick = callback;
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, this._toWatchedListClickHandler);
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();
    const emoji = evt.target.value;
    const emojiLabel = this.getElement().querySelector(`.film-details__add-emoji-label`);
    emojiLabel.innerHTML = `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;
  }

  _setEmojiClickHandler() {
    const emojiItems = this.getElement().querySelectorAll(`.film-details__emoji-item`);
    for (const emojiItem of emojiItems) {
      emojiItem.addEventListener(`click`, this._emojiClickHandler);
    }
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          isInwatchlist: film.isInwatchlist,
          isWatched: film.isWatched,
          isFavorite: film.isFavorite
        }
    );
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    delete data.isInwatchlist;
    delete data.isWatched;
    delete data.isFavorite;

    return data;
  }
}
