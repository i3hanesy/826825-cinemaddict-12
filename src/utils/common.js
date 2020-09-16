export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElements = (array, count) => {
  const randomArray = [];

  for (let i = 0; i <= getRandomInteger(0, count); i++) {
    const randomIndex = getRandomInteger(0, array.length - 1);
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

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
