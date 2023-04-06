import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { IGetEpisode } from './types';

async function getEpisode(req: NextApiRequest, res: NextApiResponse<IGetEpisode>) {
  const apiURL = new URL(`https://www.omdbapi.com`);
  apiURL.searchParams.set('i', req.body.imdbID);
  apiURL.searchParams.set('plot', 'full');
  apiURL.searchParams.set('apikey', `${process.env.OMDB_API_KEY}`);

  const { data } = await axios.get<IGetEpisode>(apiURL.toString());

  res.status(200).json(data);
}

export default getEpisode;
