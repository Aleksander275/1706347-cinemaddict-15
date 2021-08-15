import dayjs from 'dayjs';

// Функция для генерации случайного числа, взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandom (min, max) {
  const lower = Math.ceil(Math.min((min), (max)));
  const upper = Math.floor(Math.max((min), (max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getData = (array) => {
  const randomIndex = getRandom(0, array.length -1);
  return array[randomIndex];
};

const generateDate = () => {
  const dayGap = getRandom(-7,0);
  return dayjs().add(dayGap, 'day').format('YYYY/MM/DD HH:mm');
};

const titles = [
  'made-for-each-other',
  'popeye-meets-sinbad',
  'sagebrush-trail',
  'santa-claus-conquers-the-martians',
  'the-dance-of-life',
  'the-great-flamarion',
  'the-man-with-the-golden-arm',
];

const posters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const getRating = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return result.toFixed(1);
};

const dates = [
  '1929',
  '1933',
  '1955',
  '1964',
  '1936',
  '1945',
  '1954',
];

const runTime = [
  '1h 59m',
  '1h 18m',
  '1h 21m',
  '54m',
  '16m',
  '1h 36m',
  '1h 05m',
];

const director = [
  'Reza Badiyi',
  'Minhal Baig',
  'Chris Bailey',
  'David James Baker',
  'Richard Foster Baker',
  'Paul Bales',
];

const arrayWriters = [
  'Robert Towne',
  'Quentin Tarantino',
  'William Goldman',
  'Charlie Kaufman',
  'Woody Allen',
  'Nora Ephron',
];

const arrayActors = [
  'Tom Hanks',
  'Woody Harrelson',
  'Tommy Lee Jones',
  'Samuel L. Jackson',
  'Bradley Cooper',
  'Mel Gibson',
];

const countries = [
  'russia',
  'england',
  'austria',
  'germany',
  'czech',
  'poland',
];

const arrayGenres = [
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
  'Musical',
  'Mystery',
];

const COMMENTS = [
  'Невероятно романтичное кино.',
  'Фильм, который потряс до глубины души. Красивый, трогательный. При этом поучительный, особенно для детей.',
  'Двоякое чувство, вроде и получил удовольствие от просмотра, но по итогу фильм заканчивается ничем.',
  'Я понимаю что большинству фильм нравится, но мне он не очень зашел.',
  'Услада для глаз, соскучившихся по хорошему кино.',
  'Злая от просмотра, ждала фильм.такую задумку изгадить. Дешёвая камера, размытая съемка дрожащей рукой, обрезанные головы людей, коленки близким планом (да, крупный план коленок , в момент когда человек говорит). Все максимально приближено, с обрезанными кадрами. Ну неужели нельзя посмотреть в экран что в кадр попала часть головы персонала кто снизу и ее просто размазывают, вместо переснятого дубля.',
];

const emotions = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const authorsComment = [
  'Ilya Reilly',
  'Tom Ford',
  'Takeshi Kitano',
  'Morgan Freeman',
  'Guli Tuli',
  'Tuti Fruti',
  'Robert Putiatevich',
];

const getDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const getElement = (array) => array[getRandom(0, array.length - 1)];

  const quantityDescription = getRandom(1, 5);

  const arrayDescription = new Array(quantityDescription).fill().map(() => (getElement(descriptions)));

  return arrayDescription;
};

const getComments = () => ({
  id: getRandom(1, 20),
  text: getData(COMMENTS),
  emotion: getData(emotions),
  author: getData(authorsComment),
  commentDate: dayjs().format('YYYY/MM/DD HH:mm'),
});

const getArrayCommentsId = (array) => {
  const arrayCommentsId = [];
  array.forEach((element) => arrayCommentsId.push(element.id));
  return arrayCommentsId;
};

const generateCard = () => {
  const comments = new  Array(getRandom(0, 5)).fill().map(() => getComments());
  const genres = new Array(getRandom(1,2)).fill().map(() => getData(arrayGenres));
  const actors = new Array(getRandom(2, 6)).fill().map(() => getData(arrayActors));
  const writers = new Array(getRandom(1, 3)).fill().map(() => getData(arrayWriters));
  const isWatchlist = Boolean(getRandom(0, 1));
  const watchingDate = isWatchlist
    ? generateDate()
    : null;

  return {
    id: getRandom(1, 20),
    poster: `images/posters/${getData(posters)}`,
    title: getData(titles),
    alternativeTitle: getData(titles),
    rating: getRating(1,10),
    ageRating: getRandom(0,18),
    director: getData(director),
    writers,
    actors,
    date: getData(dates),
    releaseCountry: getData(countries),
    runtime: getData(runTime),
    genres,
    description: getDescription(),
    comments,
    commentsId: getArrayCommentsId(comments),
    commentLength: comments.length,
    isWatchlist,
    isHistory: Boolean(getRandom(0, 1)),
    isFavorite: Boolean(getRandom(0, 1)),
    watchingDate,
  };
};

export {generateCard};
