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

  async function fetchSeriesData(query: string) {
    if (query) {
      // start loading
      dispatch({ isLoading: true });

      // fetch new data
      const { poster, results } = await getAllSeasons({ query });

      // stop loading and update state
      dispatch({ isLoading: false, mostEpisodes: getTheMostEpisodes(results), poster, series: results });
    }
  }

  return { ...state, fetchSeriesData };
}

export { useGetSeriesData };
