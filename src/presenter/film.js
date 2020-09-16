import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";
import {render, RenderPosition, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Film {
  constructor(filmListContainer, filmDetailsContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._filmDetailsContainer = filmDetailsContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleToWatchlistClick = this._handleToWatchlistClick.bind(this);

    this._handleFilmCloseClick = this._handleFilmCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(filmCard) {
    this._filmCard = filmCard;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(filmCard);
    this._filmDetailsComponent = new FilmDetailsView(filmCard);

    this._filmCardComponent.setFilmCardClickHandler(this._handleFilmCardClick);

    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setToWatchlistClickHandler(this._handleToWatchlistClick);

    this._filmDetailsComponent.setFilmCloseClickHandler(this._handleFilmCloseClick);

    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setToWatchlistClickHandler(this._handleToWatchlistClick);


    if (prevFilmCardComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    } else {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    prevFilmCardComponent.removeElement();
    prevFilmDetailsComponent.removeElement();

  }

  destroy() {
    this._filmCardComponent.removeElement();
    this._filmDetailsComponent.removeElement();
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._filmDetailsComponent.removeElement();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmCard,
            {
              isFavorite: !this._filmCard.isFavorite
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmCard,
            {
              isWatched: !this._filmCard.isWatched
            }
        )
    );
  }

  _handleToWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmCard,
            {
              isInwatchlist: !this._filmCard.isInwatchlist
            }
        )
    );
  }

  _showFilmDetails() {
    this._filmDetailsComponent.restoreHandlers();
    render(this._filmDetailsContainer, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closeFilmDetails() {
    this._mode = Mode.DEFAULT;
    this._filmDetailsComponent.removeElement();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._filmDetailsComponent.removeElement();
    }
  }

  _handleFilmCardClick() {
    this._changeMode();
    this._mode = Mode.EDITING;
    this._showFilmDetails();
  }

  _handleFilmCloseClick(film) {
    this._changeData(film);
    this._closeFilmDetails();
  }
}
