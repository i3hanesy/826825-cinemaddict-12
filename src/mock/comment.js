import {getRandomFloorInteger, generateDate} from "../utils.js";
import {EMOJIS} from "../const.js";

export const generateFilmComments = () => {
  const comments = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`
  ];

  const autors = [
    `Tim Macoveev`,
    `John Doe`,
    `andruuu`,
    `lewa`
  ];

  const generateComment = () => {
    return comments[getRandomFloorInteger(0, comments.length - 1)];
  };

  const generateCommentAutor = () => {
    return autors[getRandomFloorInteger(0, autors.length - 1)];
  };

  const generateCommentEmoji = () => {
    return EMOJIS[getRandomFloorInteger(0, EMOJIS.length - 1)];

  };

  const generatefilmComment = () => {
    return {
      comment: generateComment(),
      commentAutor: generateCommentAutor(),
      commentEmoji: generateCommentEmoji(),
      commentDate: generateDate()
    };
  };

  return new Array(getRandomFloorInteger(1, 5)).fill().map(generatefilmComment);

};
