import FilmsContainerView from "../view/films-container.js";
import FilmsCatalogView from "../view/films-catalog.js";
import FilmsListView from "../view/films-list.js";
import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";
import ShowMoreButtonView from "../view/show_more-button.js";
import {render, RenderPosition} from "../utils/render.js";

const FILM_CARD_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(filmContainer, body) {
    this._filmContainer = filmContainer;
    this._body = body;
    this._renderedFilmCount = FILM_CARD_COUNT_PER_STEP;

    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsCatalogComponent = new FilmsCatalogView();
    this._noDataComponent = new FilmsCatalogView(true);
    this._filmListComponent = new FilmsListView();

    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();

    render(this._filmContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainerComponent, this._filmsCatalogComponent, RenderPosition.BEFOREEND);
    render(this._filmsCatalogComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderMovieList();
  }

  _renderfilmCard(filmCard) {
    const filmCardComponent = new FilmCardView(filmCard);
    const filmDetailsComponent = new FilmDetailsView(filmCard);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        filmDetailsComponent.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    render(this._filmListComponent, filmCardComponent, RenderPosition.BEFOREEND);

    filmCardComponent.setFilmCardClickHandler(() => {
      render(this._body, filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);

      filmDetailsComponent.setFilmCloseClickHandler(() => {
        filmDetailsComponent.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    });
  }

  _renderfilmCards(from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((film) => this._renderfilmCard(film));
  }

  _renderNoData() {

    render(this._filmsContainerComponent, this._noDataComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderfilmCards(this._renderedFilmCount, this._renderedFilmCount + FILM_CARD_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_CARD_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._filmCards.length) {
      this._showMoreButtonComponent.removeElement();
    }
  }

  _rendershowMoreButton() {
    render(this._filmsCatalogComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    this._renderfilmCards(0, Math.min(this._filmCards.length, FILM_CARD_COUNT_PER_STEP));

    if (this._filmCards.length > FILM_CARD_COUNT_PER_STEP) {
      this._rendershowMoreButton();
    }
  }

  _renderMovieList() {

    if (this._filmCards.length === 0) {
      this._renderNoData();
      return;
    }

    this._renderFilmList();
  }
}
