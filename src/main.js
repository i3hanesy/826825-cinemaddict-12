"use strict";

const FILM_CARD_COUNT = 5;
const FILM_CARD_EXTRA_COUNT = 2;

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStatistics = siteFooterElement.querySelector('.footer__statistics');

const createUserRatingTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
}

const createFilterTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};



const createFilmsContainerTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

const createFilmsListTemplate = (title, modifier, titleVisibility) => {
  return (
    `<section class="films-list${!modifier ? `` : modifier}">
      <h2 class="films-list__title${!titleVisibility ? `visually-hidden` : ``}">${title}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createStatisticsTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserRatingTemplate(), `beforeend`);

render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const filmsContainer = siteMainElement.querySelector('.films');

render(filmsContainer, createFilmsListTemplate('All movies. Upcoming'), `beforeend`);

const filmList = filmsContainer.querySelector('.films-list');
const filmListContainer = filmList.querySelector('.films-list__container');

for (let i = 0; i < FILM_CARD_COUNT; i++) {
  render(filmListContainer, createFilmCardTemplate(), `beforeend`);
}

render(filmList, createShowMoreButtonTemplate(), `beforeend`);

render(footerStatistics, createStatisticsTemplate(), `beforeend`);

render(filmsContainer, createFilmsListTemplate('Top rated', '--extra', true), `beforeend`);
render(filmsContainer, createFilmsListTemplate('Most commented', '--extra', true), `beforeend`);

const filmExtraLists = filmsContainer.querySelectorAll('.films-list--extra');

for (let i = 0; i < filmExtraLists.length; i++) {
  const filmListContainer = filmExtraLists[i].querySelector('.films-list__container');
  for (let i = 0; i < FILM_CARD_EXTRA_COUNT; i++) {
    render(filmListContainer, createFilmCardTemplate(), `beforeend`);
  }
}
