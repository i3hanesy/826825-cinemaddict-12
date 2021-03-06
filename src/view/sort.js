import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE_DOWN}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING_DOWN}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractView {

  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    const links = this.getElement().querySelectorAll(`a`);

    for (const link of links) {
      link.classList.remove(`sort__button--active`);
    }

    evt.preventDefault();
    evt.target.classList.add(`sort__button--active`);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
