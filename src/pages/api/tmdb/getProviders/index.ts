import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { logger, withLogs } from '@/middleware/withLogs';
import { redisClient } from '@/lib/redis';
import { NextApiRequest, NextApiResponse } from 'next';
import { IGetProvidersData, IProviders, IResults, ISearch } from './types';

const apiUrl = 'https://api.themoviedb.org';
const headers = {
  Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
};

/**
 * Searches themoviedb for streaming providers for a tv series
 */
async function search(term: string) {
  const { data } = await axios.get<ISearch>(`${apiUrl}/3/search/tv?query=${term}&include_adult=false&language=en-US&page=1`, { headers });
  logger.info({ responseMessage: 'search response', data });
  return data;
}

/**
 * Gets all of the streaming providers for a tv series
 */
async function getProviders(req: NextApiRequest, res: NextApiResponse<IGetProvidersData>) {
  const query: string = req.body.query.toLowerCase();
  const { results } = await search(query);

  try {
    // first we check if its saved on Redis
    const keys = await (await redisClient).hGetAll(query);
    const keysArr = Object.keys(keys);

    if (keys && keysArr?.includes('overview') && keysArr?.includes('providers')) {
      const { overview, providers } = keys;
      const parsedProviders: IResults = JSON.parse(providers);

      logger.info({ responseMessage: 'getProviders cached response', data: { overview, providers: parsedProviders } });
      return res.status(200).json({ overview, providers: parsedProviders });
    }
  } catch (err) {
    console.error('Error searching Redis', err);
  }

  // if not on Redis then make a fresh call to the api
  const { data } = await axios.get<IProviders>(`${apiUrl}/3/tv/${results?.[0]?.id}/watch/providers`, { headers });

  const payload = {
    overview: results?.[0]?.overview,
    providers: data?.results?.['US'],
  };

  // save the fetched data to Redis and return data back to frontend
  if (payload?.overview && payload?.providers) {
    (await redisClient).multi().hSet(query, 'overview', payload.overview).hSet(query, 'providers', JSON.stringify(payload.providers)).exec();
  }

  logger.info({ responseMessage: 'getProviders response', payload });
  res.status(200).json(payload);
}

export default use(withLogs('getProviders'), getProviders);
