import UserRatingView from "./view/user-rating.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import StatisticsView from "./view/statistic.js";
import MovieListPresenter from "./presenter/movie-list.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils/render.js";

const FILM_CARD_COUNT = 23;

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilm);
const filters = generateFilter(filmCards);

const body = document.querySelector(`body`);
const siteHeaderElement = body.querySelector(`.header`);
const siteMainElement = body.querySelector(`.main`);
const siteFooterElement = body.querySelector(`.footer`);
const footerStatistics = siteFooterElement.querySelector(`.footer__statistics`);


const movieListPresenter = new MovieListPresenter(siteMainElement, body);

render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new UserRatingView(), RenderPosition.BEFOREEND);
movieListPresenter.init(filmCards);
render(footerStatistics, new StatisticsView(), RenderPosition.BEFOREEND);
