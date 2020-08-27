import {generateFilmComments} from "./comment.js";
import {getRandomFloorInteger, getRandomInteger, getRendomArrayElements, generateDate} from "../utils.js";

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

  const randomIndex = getRandomFloorInteger(0, filmTitles.length - 1);

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

  const randomIndex = getRandomFloorInteger(0, filmPosters.length - 1);

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

  return getRendomArrayElements(filmDescriptions, 5);
};

const generateFilmRating = () => {
  return getRandomInteger(0, 10).toFixed(1);
};

const generateFilmDuration = () => {
  return `${getRandomFloorInteger(0, 3)}h ${getRandomFloorInteger(0, 59)}m`;
};

const generatefilmGenres = () => {
  const filmGenres = [`Drama`, `Mystery`, `Film-Noir`, `Musical`, `Western`, `Comedy`, `Cartoon`];

  return getRendomArrayElements(filmGenres, filmGenres.length);
};

const generatefilmAge = () => {
  return `${getRandomFloorInteger(0, 18)}+`;
};

const generateFilmCountry = () => {
  const filmCountrys = [`Russia`, `Chechen Republic`, `Kazakhstan`, `Belarus`, `USA`, `Germany`];
  const randomIndex = getRandomFloorInteger(0, filmCountrys.length - 1);

  return filmCountrys[randomIndex];
};

const generateFilmRegisseur = () => {
  const filmRegisseurs = [`Anthony Mann`, `Quentin Jerome Tarantino`, `Timur Bekmambetov`, `Tim Burton`];

  const randomIndex = getRandomFloorInteger(0, filmRegisseurs.length - 1);

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

  return getRendomArrayElements(filmScreenwriters, filmScreenwriters.length);
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

  return getRendomArrayElements(filmActors, filmActors.length);
};

export const generateFilm = () => {
  let titleFilm = generatefilmTitle();

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
    isWatched: Boolean(getRandomFloorInteger(0, 1)),
    isInwatchlist: Boolean(getRandomFloorInteger(0, 1)),
    isFavorite: Boolean(getRandomFloorInteger(0, 1))
  };
};
