export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return lower + Math.random() * (upper - lower + 1);
};

export const getRandomFloorInteger = (a = 0, b = 0) => {
  return Math.floor(getRandomInteger(a, b));
};

export const getRendomArrayElements = (array, count) => {
  const randomArray = [];

  for (let i = 0; i <= getRandomFloorInteger(0, count); i++) {
    let randomIndex = getRandomFloorInteger(0, array.length - 1);
    randomArray.push(array[randomIndex]);
  }

  return randomArray;
};

export const generateDate = () => {
  const maxDaysGap = 365 * 50;
  const daysGap = getRandomInteger(0, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() - daysGap);

  return new Date(currentDate);
};

export const humanizeFilmDate = (date) => {
  return date.toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
};

export const humanizeFilmYear = (date) => {
  return date.toLocaleString(`en-US`, {year: `numeric`});
};

export const humanizeCommentDate = (date) => {
  date.toLocaleString(`en-US`, {year: `numeric`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`});
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
