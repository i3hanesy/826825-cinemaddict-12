export const createFilmsListTemplate = (title, modifier, titleVisibility) => {
  return (
    `<section class="films-list${!modifier ? `` : modifier}">
      <h2 class="films-list__title${!titleVisibility ? `visually-hidden` : ``}">${title}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};
