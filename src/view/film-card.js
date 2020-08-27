import {humanizeFilmYear} from "../utils.js";

export const createFilmCardTemplate = (film) => {
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
