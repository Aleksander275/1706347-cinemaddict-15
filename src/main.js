import HeaderProfileView from './view/header__profile.js';
import CommentsModel from './model/comments.js';
import ContentExtraView from './view/content-extra.js';
import { generateCard } from './mock/card-film.js';
import FilterPresenter from './presenter/filter.js';
import FooterStatView from './view/footer__stat.js';
import BoardPresenter from './presenter/board.js';
import { renderTemplate } from './utils/utils.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filters.js';

const cards = new Array(15).fill().map(generateCard);

const filmsModel = new FilmsModel();
filmsModel.setFilms(cards);

const commentsModel = new CommentsModel();
commentsModel.setComments(cards);

const filterModel = new FilterModel();

const header = document.querySelector('.header');

renderTemplate(header, new HeaderProfileView().getElement());

const main = document.querySelector('.main');

const boardPresenter = new BoardPresenter(main, filmsModel, filterModel, commentsModel);
const filterPresenter = new FilterPresenter(main, filterModel, filmsModel);

filterPresenter.init();
boardPresenter.init();

// Отрисовка блоков "Top rated" и "Most commented"

const films = document.querySelector('.films');

for (let i = 0; i < 2; i++) {
  renderTemplate(films, new ContentExtraView().getElement());
}

const filmListExstra = document.querySelectorAll('.films-list--extra');

filmListExstra[0].querySelector('.films-list__title').textContent = 'Top rated';

filmListExstra[1].querySelector('.films-list__title').textContent = 'Most commented';

// Отрисовка статистики в подвале сайта

const footerStatistics = document.querySelector('.footer__statistics');

renderTemplate(footerStatistics, new FooterStatView(cards.length).getElement());

