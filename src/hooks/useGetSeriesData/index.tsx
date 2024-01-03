import { useReducer } from 'react';
import { getAllSeasons } from '@/api';
import { addBlankDataToSeries, getTheMostEpisodes } from '@/util';
import { IUseGetSeriesDataState } from './types';
import { IEpisode } from '@/pages/api/omdb/getSeason/types';

const defaultState = {
  isLoading: false,
  mostEpisodes: 0,
  overview: '',
  poster: '',
  providers: {},
  series: [[]],
};

function seriesReducer(state: IUseGetSeriesDataState, action: Partial<IUseGetSeriesDataState>) {
  return {
    ...state,
    ...action,
  };
}

/**
 * Custom hook that returns all data from a series query and the number of the most
 * episodes in a single season
 */
function useGetSeriesData() {
  const [state, dispatch] = useReducer(seriesReducer, defaultState);

  /**
   * Compute the most episodes in a single season and add
   * 'null' to any season that has less than that number
   * to make each season the same length
   * @param results A multi-dimensional array consisting of an array of seasons with all of their episodes
   */
  function getComputedResults(results: IEpisode[][]) {
    const mostEpisodes = getTheMostEpisodes(results);
    const seriesWithBlanks = addBlankDataToSeries(results, mostEpisodes);

    return { mostEpisodes, seriesWithBlanks };
  }

  /**
   * Fetches new series data either from Redis or api and updates
   * the custom hook state data
   * @param query The name of the tv series
   */
  async function fetchSeriesData(query: string) {
    if (!query) return null;

    // start loading and fetch new data
    dispatch({ isLoading: true });
    const { overview, poster, providers, results } = await getAllSeasons({ query });

    // stop loading and update the state
    const { mostEpisodes, seriesWithBlanks } = getComputedResults(results);
    dispatch({ isLoading: false, mostEpisodes, overview, poster, providers, series: seriesWithBlanks });
  }

  return { ...state, fetchSeriesData };
}

export { useGetSeriesData };
