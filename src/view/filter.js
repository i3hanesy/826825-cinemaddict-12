import AbstractView from "./abstract.js";
import {ucFirst} from "../utils/film.js";

const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;

  const createFilterCountTemplate = () => {
    return `<span class="main-navigation__item-count">
      ${count}
    </span>`;
  };

  return (
    `<a
      href="#${name}"
      class="main-navigation__item">
      ${ucFirst(name)}
      ${name !== `all` ? createFilterCountTemplate() : `movies`}
    </a>`
  );
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join(``);

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
