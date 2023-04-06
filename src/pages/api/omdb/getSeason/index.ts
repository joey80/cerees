import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { IEpisode, IGetSeason } from './types';

async function getSeason(req: NextApiRequest, res: NextApiResponse<IEpisode[]>) {
  const apiURL = new URL(`https://www.omdbapi.com`);
  apiURL.searchParams.set('t', req.body.query);
  apiURL.searchParams.set('season', req.body.season);
  apiURL.searchParams.set('plot', 'full');
  apiURL.searchParams.set('apikey', `${process.env.OMDB_API_KEY}`);

  const { data } = await axios.get<IGetSeason>(apiURL.toString());
  const { Episodes } = data;

  res.status(200).json(Episodes);
}

export default getSeason;
