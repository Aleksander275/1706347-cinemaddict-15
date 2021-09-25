import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import { getTopGenres, getTotalDuration, getProfile } from '../utils/utils.js';
import { StatsFilterType, MINUTES } from '../utils/const.js';

const renderChart = (statisticCtx, data) => {
  const count = getTopGenres(data, true);
  const genres = getTopGenres(data);

  new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genres,
      datasets: [{
        data: count,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatistic = (currentFilterType = 'all-time' ,data, filtredFilms) => {
  const hoursTime = Math.floor(getTotalDuration(data) / MINUTES);
  const minutesTime = getTotalDuration(data) % MINUTES;

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getProfile(filtredFilms)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time"
    value="${StatsFilterType.ALL}"
    ${currentFilterType === StatsFilterType.ALL ? 'checked' : ''} >
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today"
    value="${StatsFilterType.TODAY}"
    ${currentFilterType === StatsFilterType.TODAY ? 'checked' : ''}>
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week"
    value="${StatsFilterType.WEEK}"
    ${currentFilterType === StatsFilterType.WEEK ? 'checked' : ''}>
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month"
    value="${StatsFilterType.MONTH}"
    ${currentFilterType === StatsFilterType.MONTH ? 'checked' : ''}>
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year"
    value="${StatsFilterType.YEAR}"
    ${currentFilterType === StatsFilterType.YEAR ? 'checked' : ''}>
    <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${data.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hoursTime} <span class="statistic__item-description">h</span> ${minutesTime} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${getTopGenres(data).length ? getTopGenres(data)[0] : ''}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class Statistic extends SmartView {
  constructor(currentFilterType, data, filtredFilms) {
    super();
    this._data = data;
    this._currentFilterType = currentFilterType;
    this._filtredFilms = filtredFilms;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

    this._statisticChart = this.getElement().querySelector('.statistic__chart');
    renderChart(this._statisticChart, this._data);
  }

  getTemplate() {
    return createStatistic(this._currentFilterType, this._data, this._filtredFilms);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelector('.statistic__filters').addEventListener('click', this._filterTypeChangeHandler);
  }
}
