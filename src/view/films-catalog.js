import AbstractView from "./abstract.js";

const createFilmsCatalogTemplate = (noData) => {


  const hidden = !noData ? `visually-hidden` : ``;
  const titleName = !noData ? `All movies. Upcoming` : `There are no movies in our database`;

  return (
    `<section class="films-list">
      <h2 class="films-list__title ${hidden}">${titleName}</h2>
    </section>`
  );
};

export default class FilmsCatalog extends AbstractView {
  constructor(noData) {
    super();
    this._noData = noData;
  }

  getTemplate() {
    return createFilmsCatalogTemplate(this._noData);
  }
}
