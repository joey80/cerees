import { IEpisode } from '@/pages/api/omdb/getSeason/types';

/**
 * Add 'null' to any season array that has less than the highestLength
 * number to make each season the same length
 * @param arr - Multi-dimensional array of episodes for each season
 * @param highestLength - The most amount of episodes in a single season for the entire series
 */
function addBlankDataToSeries(arr: IEpisode[][], highestLength: number) {
  return arr.map(elm => {
    const blankCells = getBlankCellCount(elm, highestLength);

    if (blankCells && blankCells > 0) {
      const blanks = Array.from(Array(blankCells)).map(() => null);
      return [...elm, ...blanks];
    }

    return elm;
  });
}

/**
 * Determines how many 'blank' cells to render in the season columns
 * @param arr - The array of episodes for that season
 * @param highestLength - The most amount of episodes in a single season for the entire series
 */
function getBlankCellCount(arr: IEpisode[], highestLength: number) {
  if (highestLength === null) return highestLength;

  const total = highestLength - arr.length;
  if (total > 0) return total;

  return null;
}

/**
 * Determines the color of a cell based on its IMdb rating and
 * returns its css hex color value
 * @param imdbRating - The IMdb rating for the episode
 */
function getCellColor(imdbRating: number) {
  if (imdbRating >= 8.6) {
    return '#006d2c';
  }

  if (imdbRating >= 7.6 && imdbRating <= 8.5) {
    return '#2ca25f';
  }

  if (imdbRating >= 6.6 && imdbRating <= 7.5) {
    return '#66c2a4';
  }

  if (imdbRating >= 5.0 && imdbRating <= 6.5) {
    return '#b2e2e2';
  }

  if (imdbRating <= 4.9) {
    return '#de2d26';
  }

  return '#fff';
}

/**
 * Takes a multi-dimensional array of IEpisodes and returns the value of the longest length
 * @param arr - All of the episodes for the entire series
 */
function getTheMostEpisodes(arr: IEpisode[][]) {
  const longest = arr.reduce((acc, curr, currIndex, theArr) => (theArr[acc].length > curr.length ? acc : currIndex), 0);
  return arr[longest].length;
}

export { addBlankDataToSeries, getBlankCellCount, getCellColor, getTheMostEpisodes };
