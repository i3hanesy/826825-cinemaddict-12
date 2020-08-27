import {ucFirst} from "../utils.js";

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

export const createFilterTemplate = (filterItems) => {
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
