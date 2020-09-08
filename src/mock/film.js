import {generateFilmComments} from "./comment.js";
import {getRandomInteger, getRandomArrayElements, generateDate} from "../utils/common.js";

const generatefilmTitle = () => {
  const filmTitles = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Man with the Golden Arm`,
    `The Great Flamarion`,
    `Made For Each Other`
  ];

  const randomIndex = getRandomInteger(0, filmTitles.length - 1);

  return filmTitles[randomIndex];
};

const generatefilmPoster = () => {
  const filmPosters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ];

  const randomIndex = getRandomInteger(0, filmPosters.length - 1);

  return filmPosters[randomIndex];
};

const generateFilmDescription = () => {
  const filmDescriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  return getRandomArrayElements(filmDescriptions, 5);
};

const generateFilmRating = () => {
  return `${getRandomInteger(0, 9)}.${getRandomInteger(0, 9)}`;
};

const generateFilmDuration = () => {
  return `${getRandomInteger(0, 3)}h ${getRandomInteger(0, 59)}m`;
};

const generatefilmGenres = () => {
  const filmGenres = [`Drama`, `Mystery`, `Film-Noir`, `Musical`, `Western`, `Comedy`, `Cartoon`];

  return getRandomArrayElements(filmGenres, filmGenres.length);
};

const generatefilmAge = () => {
  return `${getRandomInteger(0, 18)}+`;
};

const generateFilmCountry = () => {
  const filmCountrys = [`Russia`, `Chechen Republic`, `Kazakhstan`, `Belarus`, `USA`, `Germany`];
  const randomIndex = getRandomInteger(0, filmCountrys.length - 1);

  return filmCountrys[randomIndex];
};

const generateFilmRegisseur = () => {
  const filmRegisseurs = [`Anthony Mann`, `Quentin Jerome Tarantino`, `Timur Bekmambetov`, `Tim Burton`];

  const randomIndex = getRandomInteger(0, filmRegisseurs.length - 1);

  return filmRegisseurs[randomIndex];
};

const generateFilmScreenwriters = () => {
  const filmScreenwriters = [
    `Akira Kurosawa`,
    `Quentin Tarantino`,
    `James Cameron`,
    `John Hughes`,
    `Alfonso Cuarón`,
    `Andrew Stanton`,
    `John Logan`
  ];

  return getRandomArrayElements(filmScreenwriters, filmScreenwriters.length);
};

const generateFilmActors = () => {
  const filmActors = [
    `Aamir Khan`,
    `Akshay Kumar`,
    `Ajay Devgn`,
    `Amjad Khan`,
    `Amitabh Bachchan`,
    `Abhay Deol`,
    `Arshad Warsi`,
    `Anushka Shetty`,
    `Aruna Irani`
  ];

  return getRandomArrayElements(filmActors, filmActors.length);
};

export const generateFilm = () => {
  const titleFilm = generatefilmTitle();

  return {
    filmTitle: titleFilm,
    filmTitleOrigin: titleFilm,
    filmPoster: generatefilmPoster(),
    filmDescription: generateFilmDescription(),
    filmRating: generateFilmRating(),
    filmDate: generateDate(),
    filmDuration: generateFilmDuration(),
    filmGenres: generatefilmGenres(),
    filmComments: generateFilmComments(),
    filmAge: generatefilmAge(),
    filmСountry: generateFilmCountry(),
    filmRegisseur: generateFilmRegisseur(),
    filmActors: generateFilmActors(),
    filmScreenwriters: generateFilmScreenwriters(),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isInwatchlist: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
