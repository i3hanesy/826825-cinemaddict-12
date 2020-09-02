import UserRatingView from "./view/user-rating.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import FilmsContainerView from "./view/films-container.js";
import FilmsCatalogView from "./view/films-catalog.js";
import FilmsListView from "./view/films-list.js";
import FilmCardView from "./view/film-card.js";
import FilmDetailsView from "./view/film-details.js";
import ShowMoreButtonView from "./view/show_more-button.js";
import StatisticsView from "./view/statistic.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils.js";

const FILM_CARD_COUNT = 23;
const FILM_CARD_COUNT_PER_STEP = 5;

const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilm);
const filters = generateFilter(filmCards);

const body = document.querySelector(`body`);
const siteHeaderElement = body.querySelector(`.header`);
const siteMainElement = body.querySelector(`.main`);
const siteFooterElement = body.querySelector(`.footer`);
const footerStatistics = siteFooterElement.querySelector(`.footer__statistics`);

const removeComponent = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const renderFilm = (filmListElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removeComponent(filmDetailsComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);

  filmCardComponent.getElement().addEventListener(`click`, (evt) => {
    let target = evt.target;
    if (target.classList.contains(`film-card__comments`) || target.classList.contains(`film-card__title`) || target.tagName === `IMG`) {
      render(body, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);

      filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
        removeComponent(filmDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    }
  });
};

render(siteHeaderElement, new UserRatingView().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const filmsContainerComponent = new FilmsContainerView();
const filmsCatalogComponent = new FilmsCatalogView();

render(siteMainElement, filmsContainerComponent.getElement(), RenderPosition.BEFOREEND);
render(filmsContainerComponent.getElement(), filmsCatalogComponent.getElement(), RenderPosition.BEFOREEND);

const filmListComponent = new FilmsListView();

render(filmsCatalogComponent.getElement(), filmListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(filmCards.length, FILM_CARD_COUNT_PER_STEP); i++) {
  renderFilm(filmListComponent.getElement(), filmCards[i]);
}

if (filmCards.length > FILM_CARD_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_CARD_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();
  render(filmsCatalogComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedFilmCount, renderedFilmCount + FILM_CARD_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmListComponent.getElement(), film));

    renderedFilmCount += FILM_CARD_COUNT_PER_STEP;

    if (renderedFilmCount >= filmCards.length) {
      removeComponent(showMoreButtonComponent);
    }
  });
}

render(footerStatistics, new StatisticsView().getElement(), RenderPosition.BEFOREEND);
