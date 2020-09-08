import AbstractView from "./abstract.js";

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {

    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}

// export default class ShowMoreButton {
//   constructor() {
//     this._element = null;
//   }

//   getTemplate() {
//     return createShowMoreButtonTemplate();
//   }

//   getElement() {
//     if (!this._element) {
//       this._element = createElement(this.getTemplate());
//     }

//     return this._element;
//   }

//   removeElement() {
//     this._element = null;
//   }
// }
