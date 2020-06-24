const { episodesPage } = require('imdb-scrapper');

const cleanScrapedData = (arr) => {
  return arr.map((elm, index) => {
    return {
      Title: elm.name,
      Released: elm.airDate,
      Episode: index + 1,
      imdbRating: elm.rating,
    };
  });
};

const getScrapedData = (showId, seasonNum) => {
  const funs = [episodesPage(showId, seasonNum)];
  Promise.all(funs)
    .then((data) => {
      console.log('poster', data[0].episodes[0].poster);
      return { ...data[0], ...data[1] };
    })
    .then((movieDetails) => {
      return console.log(cleanScrapedData(movieDetails.episodes));
    });
};

getScrapedData('tt0773262', 8);
