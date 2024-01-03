import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { logger, withLogs } from '@/middleware/withLogs';
import { redisClient } from '@/lib/redis';
import { NextApiRequest, NextApiResponse } from 'next';
import { IEpisode, IGetSeason } from './types';

/**
 * Gets details about a season of a tv series
 */
async function getSeason(req: NextApiRequest, res: NextApiResponse<IEpisode[]>) {
  const query: string = req.body.query.toLowerCase();
  const episodeKey = `season${req.body.season}Episodes`;

  try {
    // first we check if its saved on Redis
    const keys = await (await redisClient).hGetAll(query);
    const keysArr = Object.keys(keys);

    if (keys && keysArr?.includes(episodeKey)) {
      const episodes = JSON.parse(keys[episodeKey]);

      logger.info({ responseMessage: 'getSeason cached response', data: episodes });
      return res.status(200).json(episodes);
    }
  } catch (err) {
    console.error('Error searching Redis', err);
  }

  const apiURL = new URL('https://www.omdbapi.com');
  apiURL.searchParams.set('t', req.body.query);
  apiURL.searchParams.set('season', req.body.season);
  apiURL.searchParams.set('plot', 'full');
  apiURL.searchParams.set('apikey', `${process.env.OMDB_API_KEY}`);

  const { data } = await axios.get<IGetSeason>(apiURL.toString());
  const { Episodes } = data;

  // save the fetched data to Redis
  if (Episodes) {
    (await redisClient).hSet(query, episodeKey, JSON.stringify(Episodes));
  }

  logger.info({ responseMessage: 'getSeason response', data });
  res.status(200).json(Episodes);
}

export default use(withLogs('getSeason'), getSeason);
