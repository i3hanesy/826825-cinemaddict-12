import FilmsContainerView from "../view/films-container.js";
import FilmsCatalogView from "../view/films-catalog.js";
import FilmsListView from "../view/films-list.js";
import FilmPresenter from "./film.js";
import ShowMoreButtonView from "../view/show_more-button.js";
import SortView from "../view/sort.js";
import {render, RenderPosition} from "../utils/render.js";
import {sortDateDown, sortRatingDown} from "../utils/film.js";
import {updateItem} from "../utils/common.js";
import {SortType} from "../const.js";

const FILM_CARD_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(filmContainer, body) {
    this._filmContainer = filmContainer;
    this._body = body;
    this._renderedFilmCount = FILM_CARD_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsCatalogComponent = new FilmsCatalogView();
    this._noDataComponent = new FilmsCatalogView(true);
    this._filmListComponent = new FilmsListView();
    this._sortComponent = new SortView();

    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();
    this._sourcedfilmCards = filmCards.slice();

    render(this._filmContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainerComponent, this._filmsCatalogComponent, RenderPosition.BEFOREEND);
    render(this._filmsCatalogComponent, this._filmListComponent, RenderPosition.BEFOREEND);

    this._renderMovieList();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilm) {
    this._filmCards = updateItem(this._filmCards, updatedFilm);
    this._sourcedfilmCards = updateItem(this._sourcedfilmCards, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE_DOWN:
        this._filmCards.sort(sortDateDown);
        break;
      case SortType.RATING_DOWN:
        this._filmCards.sort(sortRatingDown);
        break;
      default:
        this._filmCards = this._sourcedfilmCards.slice();
    }

    this._currentSortType = sortType;

  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {
    render(this._filmContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderfilmCard(filmCard) {
    const filmPresenter = new FilmPresenter(this._filmListComponent, this._body, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(filmCard);
    this._filmPresenter[filmCard.id] = filmPresenter;
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

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_CARD_COUNT_PER_STEP;
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

    this._renderSort();
    this._renderFilmList();
  }
}
