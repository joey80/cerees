import axios from 'axios';

// const getPosterImage = (arr) => {
//   const posterObj = arr.find((x) => x.Type === 'series');
//   return posterObj.Poster || 'none';
// };

const getSeasonData = async (query, season) => {
  const omdbKey = `&apikey=${process.env.REACT_APP_OMDB_API}`;
  const omdbSeason = `&season=${season}`;
  const omdbEndpoint = `http://www.omdbapi.com/?t=${query}${omdbSeason}&plot=full${omdbKey}`;

  try {
    const result = await axios.get(omdbEndpoint);
    return result.data.Episodes;
  } catch (e) {
    return console.log(`GET failed from OMDb. ${e}`);
  }
};

/**
 * getOMDBData - returns information about a television series
 * @param query - the name of the television series
 */
export const getOMDBData = async (query) => {
  const encodedQuery = encodeURIComponent(query);
  const omdbKey = process.env.REACT_APP_OMDB_API;
  const omdbEndpoint = `http://www.omdbapi.com/?t=${encodedQuery}&type=series&plot=full&apikey=${omdbKey}`;

  try {
    const results = [];
    const result = await axios.get(omdbEndpoint);
    const totalSeasons = result.data.totalSeasons;
    const posterImage = result.data.Poster;

    for (let i = 0; i < totalSeasons; i++) {
      const data = await getSeasonData(encodedQuery, i + 1);
      results.push(data);
    }

    return {
      results,
      poster: posterImage,
    };
  } catch (e) {
    return console.log(`GET failed from OMDb. ${e}`);
  }
};

// /**
//  * getOMDBData - returns information about a television series
//  * @param query - the name of the television series
//  */
// export const getOMDBData = async (query) => {
//   // search type needs to be a series
//   const encodedQuery = encodeURIComponent(query);
//   const omdbKey = process.env.REACT_APP_OMDB_API;
//   const omdbEndpoint = `http://www.omdbapi.com/?s=${encodedQuery}&plot=full&apikey=${omdbKey}`;

//   try {
//     const results = [];
//     const result = await axios.get(omdbEndpoint);
//     console.log('result', result);
//     const totalSeasons = result.data.totalResults;
//     const posterImage = getPosterImage(result.data.Search);

//     for (let i = 0; i < totalSeasons - 2; i++) {
//       const data = await getSeasonData(encodedQuery, i + 1);
//       results.push(data);
//     }

//     return {
//       results,
//       poster: posterImage,
//     };
//   } catch (e) {
//     return console.log(`GET failed from OMDb. ${e}`);
//   }
// };
