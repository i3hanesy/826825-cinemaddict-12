import {createUserRatingTemplate} from "./view/user-rating.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsContainerTemplate} from "./view/films-container.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/show_more-button.js";
import {createStatisticsTemplate} from "./view/statistic.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";

const FILM_CARD_COUNT = 23;
const FILM_CARD_COUNT_PER_STEP = 5;
// const FILM_CARD_EXTRA_COUNT = 2;
// const FILM_COMMENT_COUNT = 4;

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilm);
const filters = generateFilter(filmCards);

const body = document.querySelector(`body`);
const siteHeaderElement = body.querySelector(`.header`);
const siteMainElement = body.querySelector(`.main`);
const siteFooterElement = body.querySelector(`.footer`);
const footerStatistics = siteFooterElement.querySelector(`.footer__statistics`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserRatingTemplate(), `beforeend`);

render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const filmsContainer = siteMainElement.querySelector(`.films`);

render(filmsContainer, createFilmsListTemplate(`All movies. Upcoming`), `beforeend`);

const filmList = filmsContainer.querySelector(`.films-list`);
const filmListContainer = filmList.querySelector(`.films-list__container`);

for (let i = 1; i <= Math.min(filmCards.length, FILM_CARD_COUNT_PER_STEP); i++) {
  render(filmListContainer, createFilmCardTemplate(filmCards[i]), `beforeend`);
}

if (filmCards.length > FILM_CARD_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_CARD_COUNT_PER_STEP;
  render(filmList, createShowMoreButtonTemplate(), `beforeend`);

  const showMoreButton = filmList.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedFilmCount, renderedFilmCount + FILM_CARD_COUNT_PER_STEP)
      .forEach((film) => render(filmListContainer, createFilmCardTemplate(film), `beforeend`));

    renderedFilmCount += FILM_CARD_COUNT_PER_STEP;

    if (renderedFilmCount >= filmCards.length) {
      showMoreButton.remove();
    }
  });
}

render(footerStatistics, createStatisticsTemplate(), `beforeend`);

render(filmsContainer, createFilmsListTemplate(`Top rated`, `--extra`, true), `beforeend`);
render(filmsContainer, createFilmsListTemplate(`Most commented`, `--extra`, true), `beforeend`);

// const filmExtraLists = filmsContainer.querySelectorAll(`.films-list--extra`);

// for (let i = 0; i < filmExtraLists.length; i++) {
//   const filmListExtraContainer = filmExtraLists[i].querySelector(`.films-list__container`);
//   for (let j = 0; j < FILM_CARD_EXTRA_COUNT; j++) {
//     render(filmListExtraContainer, createFilmCardTemplate(filmCards[i]), `beforeend`);
//   }
// }

filmListContainer.addEventListener(`click`, (evt) => {
  let target = evt.target;
  if (target.classList.contains(`film-card__comments`) || target.classList.contains(`film-card__title`) || target.tagName === `IMG`) {
    render(body, createFilmDetailsTemplate(filmCards[0]), `beforeend`);
  }
});

