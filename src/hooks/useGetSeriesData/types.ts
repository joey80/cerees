import { IEpisode } from '@/pages/api/omdb/getSeason/types';

interface IUseGetSeriesDataState {
  isLoading: boolean;
  mostEpisodes: number;
  poster: string;
  series: IEpisode[][];
}

export type { IUseGetSeriesDataState };
