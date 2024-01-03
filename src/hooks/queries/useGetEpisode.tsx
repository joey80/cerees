import { useQuery } from 'react-query';
import { getEpisode } from '@/api';

/**
 * Fetches new single episode data
 * @param imdbID The imdbID for the episode
 */
function useGetEpisode(imdbID?: string) {
  const episode = useQuery(['getEpisode', imdbID], () => getEpisode(imdbID), { enabled: !!imdbID, staleTime: Infinity });
  return episode;
}

export { useGetEpisode };
