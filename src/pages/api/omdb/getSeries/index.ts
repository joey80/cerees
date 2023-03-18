import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { IGetSeries } from './types';

async function getSeries(req: NextApiRequest, res: NextApiResponse) {
  const apiURL = new URL(`https://www.omdbapi.com`);
  apiURL.searchParams.set('t', req.body.query);
  apiURL.searchParams.set('type', 'series');
  apiURL.searchParams.set('plot', 'full');
  apiURL.searchParams.set('apikey', `${process.env.OMDB_API_KEY}`);

  const { data } = await axios.get<IGetSeries>(apiURL.toString());
  const { Poster, totalSeasons } = data;

  res.status(200).json({ totalSeasons, poster: Poster });
}

export default getSeries;
