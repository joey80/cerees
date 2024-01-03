import { IEpisode } from '@/pages/api/omdb/getSeason/types';
import { IResults } from '@/pages/api/tmdb/getProviders/types';

interface IUseGetSeriesDataState {
  /** When the data is currently being fetched */
  isLoading: boolean;
  /** The greatest number of episodes that any one season has */
  mostEpisodes: number;
  /** A brief description of the tv series */
  overview: string;
  /** The url to the poster image */
  poster: string;
  /** The list of streaming providers that the tv series can be watched on */
  providers: Partial<IResults>;
  /** A multidimensional array that contains each season and within those all of the episodes for each season */
  series: (IEpisode | null)[][];
}

export type { IUseGetSeriesDataState };
