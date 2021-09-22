import HeaderProfileView from './view/header__profile.js';
import CommentsModel from './model/comments.js';
import FilterPresenter from './presenter/filter.js';
import FooterStatView from './view/footer__stat.js';
import BoardPresenter from './presenter/board.js';
import { renderTemplate } from './utils/utils.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filters.js';
import Api from './api.js';
import { UpdateType } from './utils/const.js';

const AUTHORIZATION = 'Basic yj1z888hh88888r';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistics = document.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

const commentsModel = new CommentsModel(api);

const headerComponent = new HeaderProfileView(filmsModel);

const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(main, filmsModel, filterModel, commentsModel, api, headerComponent);
const filterPresenter = new FilterPresenter(main, filterModel, filmsModel);

filterPresenter.init();
boardPresenter.init();

api.getFilms()
  .then(async (films) => {
    const comments = await Promise.all(api.getAllComments(films));
    commentsModel.setComments(UpdateType.INIT, comments);
    filmsModel.setFilms(UpdateType.INIT, films);
    renderTemplate(header, headerComponent);
    renderTemplate(footerStatistics, new FooterStatView(films.length));
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });


