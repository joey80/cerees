import { IEpisode } from '@/pages/api/omdb/getSeason/types';

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
 * @param rating - The IMdb rating for the episode
 */
function getCellColor(rating: number) {
  if (rating >= 8.6) {
    return '#006d2c';
  }

  if (rating >= 7.6 && rating <= 8.5) {
    return '#2ca25f';
  }

  if (rating >= 6.6 && rating <= 7.5) {
    return '#66c2a4';
  }

  if (rating >= 5.0 && rating <= 6.5) {
    return '#b2e2e2';
  }

  if (rating <= 4.9) {
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

export { getBlankCellCount, getCellColor, getTheMostEpisodes };
