import { useReducer } from 'react';
import { getAllSeasons } from '@/api';
import { getTheMostEpisodes } from '@/util';
import { IUseGetSeriesDataState } from './types';

const defaultState = {
  isLoading: false,
  mostEpisodes: 0,
  poster: '',
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
   * Fetches new series data either from sessionStorage or api and updates
   * the custom hook state data
   * @param query - The name of the tv series
   */
  async function fetchSeriesData(query: string) {
    if (query) {
      // check sessionStorage first
      const cache = sessionStorage.getItem(query);

      if (cache) {
        // update state from sessionStorage
        const { poster, results } = JSON.parse(cache);
        dispatch({ mostEpisodes: getTheMostEpisodes(results), poster, series: results });
        return;
      }

      // start loading, fetch new data and save it to sessionStorage
      dispatch({ isLoading: true });
      const { poster, results } = await getAllSeasons({ query });
      sessionStorage.setItem(query, JSON.stringify({ poster, results }));

      // stop loading and update state
      dispatch({ isLoading: false, mostEpisodes: getTheMostEpisodes(results), poster, series: results });
    }
  }

  return { ...state, fetchSeriesData };
}

export { useGetSeriesData };
