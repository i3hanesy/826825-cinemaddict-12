import AbstractView from "./abstract.js";
import {humanizeFilmYear} from "../utils/film.js";

const createFilmCardTemplate = (film) => {
  const {filmTitle, filmDescription, filmPoster, filmRating, filmDuration, filmGenres, filmDate, filmComments, isWatched, isInwatchlist, isFavorite} = film;

  const createShortfilmDescription = () => {
    const description = filmDescription.join(` `);
    return description.length >= 140
      ? `${description.slice(0, 140)}...`
      : description;
  };

  const createMarkClassName = (flag) => {
    return flag
      ? `film-card__controls-item--active`
      : ``;
  };

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmTitle}</h3>
      <p class="film-card__rating">${filmRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${humanizeFilmYear(filmDate)}</span>
        <span class="film-card__duration">${filmDuration}</span>
        <span class="film-card__genre">${filmGenres[0]}</span>
      </p>
      <img src="./images/posters/${filmPoster}" alt="" class="film-card__poster">
      <p class="film-card__description">${createShortfilmDescription()}</p>
      <a class="film-card__comments">${filmComments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${createMarkClassName(isInwatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${createMarkClassName(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${createMarkClassName(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._toWatchedClickHandler = this._toWatchedClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _toWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.toWatchedClick();
  }


  _filmCardClickHandler(evt) {
    evt.preventDefault();
    this._callback.filmCardClick();
  }

  setFilmCardClickHandler(callback) {
    this._callback.filmCardClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._filmCardClickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._filmCardClickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._filmCardClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setToWatchlistClickHandler(callback) {
    this._callback.toWatchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._toWatchedClickHandler);
  }
}
