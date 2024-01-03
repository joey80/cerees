import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { logger, withLogs } from '@/middleware/withLogs';
import { redisClient } from '@/lib/redis';
import { NextApiRequest, NextApiResponse } from 'next';
import { IGetSeries, IGetSeriesData } from './types';

/**
 * Gets overall details about a tv series such as total number of seasons and poster image
 */
async function getSeries(req: NextApiRequest, res: NextApiResponse<IGetSeriesData>) {
  const query: string = req.body.query.toLowerCase();

  try {
    // first we check if its saved on Redis
    const keys = await (await redisClient).hGetAll(query);
    const keysArr = Object.keys(keys);

    if (keys && keysArr?.includes('poster') && keysArr?.includes('totalSeasons')) {
      const { poster, totalSeasons } = keys;

      logger.info({ responseMessage: 'getSeries cached response', data: { totalSeasons, poster } });
      return res.status(200).json({ totalSeasons, poster });
    }
  } catch (err) {
    console.error('Error searching Redis', err);
  }

  // if not, fetch it from the API
  const apiURL = new URL('https://www.omdbapi.com');
  apiURL.searchParams.set('t', query);
  apiURL.searchParams.set('type', 'series');
  apiURL.searchParams.set('plot', 'full');
  apiURL.searchParams.set('apikey', `${process.env.OMDB_API_KEY}`);

  const { data } = await axios.get<IGetSeries>(apiURL.toString());
  const { Poster: poster = '', totalSeasons = '0' } = data;

  // save the fetched data to Redis
  if (poster && totalSeasons) {
    (await redisClient).multi().hSet(query, 'poster', poster).hSet(query, 'totalSeasons', totalSeasons).exec();
  }

  logger.info({ responseMessage: 'getSeries response', data: { totalSeasons, poster } });
  res.status(200).json({ totalSeasons, poster });
}

export default use(withLogs('getSeries'), getSeries);
