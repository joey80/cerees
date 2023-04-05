import { IEpisode } from '@/pages/api/omdb/getSeason/types';

interface IUseGetSeriesDataState {
  isLoading: boolean;
  mostEpisodes: number;
  poster: string;
  series: (IEpisode | null)[][];
}

export type { IUseGetSeriesDataState };
