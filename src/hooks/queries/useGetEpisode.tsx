import axios from 'axios';
import { useQuery } from 'react-query';
import { IEpisode } from '@/pages/api/omdb/getSeason/types';
import { IGetEpisode } from '@/pages/api/omdb/getEpisode/types';

/**
 * Gets a single episode data for a series
 * @param imdbID - The imdbID of the episode
 */
async function getEpisode(imdbID?: IEpisode['imdbID']): Promise<IGetEpisode> {
  try {
    const { data } = await axios<IGetEpisode>('/api/omdb/getEpisode', { data: { imdbID }, method: 'post' });
    return data;
  } catch (error) {
    console.log(error);
    return {} as IGetEpisode;
  }
}

/**
 * Fetches new single episode data
 * @param imdbID - The imdbID for the episode
 */
function useGetEpisode(imdbID?: string) {
  const episode = useQuery(['getEpisode', imdbID], () => getEpisode(imdbID), { enabled: !!imdbID, staleTime: Infinity });
  return episode;
}

export { useGetEpisode };
