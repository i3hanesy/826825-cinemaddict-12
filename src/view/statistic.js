import AbstractView from "./abstract.js";

const createStatisticsTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

export default class Statistic extends AbstractView {

  getTemplate() {
    return createStatisticsTemplate();
  }
}
