import {createUserRatingTemplate} from "./view/user-rating.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsContainerTemplate} from "./view/films-container.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/show_more-button.js";
import {createStatisticsTemplate} from "./view/statistic.js";

const FILM_CARD_COUNT = 5;
const FILM_CARD_EXTRA_COUNT = 2;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatistics = siteFooterElement.querySelector(`.footer__statistics`);


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserRatingTemplate(), `beforeend`);

render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const filmsContainer = siteMainElement.querySelector(`.films`);

render(filmsContainer, createFilmsListTemplate(`All movies. Upcoming`), `beforeend`);

const filmList = filmsContainer.querySelector(`.films-list`);
const filmListContainer = filmList.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_CARD_COUNT; i++) {
  render(filmListContainer, createFilmCardTemplate(), `beforeend`);
}

render(filmList, createShowMoreButtonTemplate(), `beforeend`);

render(footerStatistics, createStatisticsTemplate(), `beforeend`);

render(filmsContainer, createFilmsListTemplate(`Top rated`, `--extra`, true), `beforeend`);
render(filmsContainer, createFilmsListTemplate(`Most commented`, `--extra`, true), `beforeend`);

const filmExtraLists = filmsContainer.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < filmExtraLists.length; i++) {
  const filmListExtraContainer = filmExtraLists[i].querySelector(`.films-list__container`);
  for (let j = 0; j < FILM_CARD_EXTRA_COUNT; j++) {
    render(filmListExtraContainer, createFilmCardTemplate(), `beforeend`);
  }
}
