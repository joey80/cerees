import axios from 'axios';
import { use } from 'next-api-route-middleware';
import { logger, withLogs } from '@/middleware/withLogs';
import { redisClient } from '@/lib/redis';
import { NextApiRequest, NextApiResponse } from 'next';
import { IGetEpisode } from './types';

/**
 * Gets details about a single episode of a tv series
 */
async function getEpisode(req: NextApiRequest, res: NextApiResponse<IGetEpisode>) {
  const imdbID = req.body.imdbID;

  try {
    // first we check if its saved on Redis
    const { episodeData } = await (await redisClient).hGetAll(imdbID);

    if (episodeData) {
      const parsedData = JSON.parse(episodeData);

      logger.info({ responseMessage: 'getEpisode cached response', data: parsedData });
      return res.status(200).json(parsedData);
    }
  } catch (err) {
    console.error('Error searching Redis', err);
  }

  // if not, fetch it from the API
  const apiURL = new URL('https://www.omdbapi.com');
  apiURL.searchParams.set('i', imdbID);
  apiURL.searchParams.set('plot', 'full');
  apiURL.searchParams.set('apikey', `${process.env.OMDB_API_KEY}`);

  const { data, status } = await axios.get<IGetEpisode>(apiURL.toString());

  // save the fetched data to Redis
  if (data) {
    (await redisClient).multi().hSet(imdbID, 'episodeData', JSON.stringify(data)).exec();
  }

  logger.info({ responseMessage: 'getEpisode response', data });
  res.status(status).json(data);
}

export default use(withLogs('getEpisode'), getEpisode);
