export const humanizeFilmDate = (date) => {
  return date.toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
};

export const humanizeFilmYear = (date) => {
  return date.toLocaleString(`en-US`, {year: `numeric`});
};

export const humanizeCommentDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}/${month}/${day} ${hour}:${minute}`;

};

export const ucFirst = (str) => {
  const firstLetter = str.substring(0, 1);
  return firstLetter.toUpperCase() + str.substring(1);
};

const getWeightForNullDate = (filmA, filmB) => {
  if (filmA === null && filmB === null) {
    return 0;
  }

  if (filmA === null) {
    return 1;
  }

  if (filmB === null) {
    return -1;
  }

  return null;
};

export const sortDateDown = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmDate, filmB.filmDate);

  if (weight !== null) {
    return weight;
  }

  return filmB.filmDate.getTime() - filmA.filmDate.getTime();
};

export const sortRatingDown = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmRating, filmB.filmRating);

  if (weight !== null) {
    return weight;
  }

  return filmB.filmRating - filmA.filmRating;
};

