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
