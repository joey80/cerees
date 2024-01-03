import axios from 'axios';
import { IEpisode } from '@/pages/api/omdb/getSeason/types';
import { IGetEpisode } from '@/pages/api/omdb/getEpisode/types';
import { IGetProvidersData } from '@/pages/api/tmdb/getProviders/types';
import { IGetSeriesData } from '@/pages/api/omdb/getSeries/types';

/**
 * Gets information about a series and then gets episode data for
 * every season of that series
 * @param query - The name of the tv series
 */
async function getAllSeasons({ query }: { query: string }) {
  try {
    const { totalSeasons, overview, poster, providers } = await getSeries({ query });
    const parsedTotalSeasons = parseInt(totalSeasons, 10);
    let episodeData: IEpisode[][] = [[]];

    if (parsedTotalSeasons > 0) {
      episodeData = await Promise.all(
        Array.from(Array(parsedTotalSeasons))?.map(async (_, index) => {
          return await getSeason({ query, season: index + 1 });
        }),
      );
    }

    return {
      overview,
      poster,
      providers,
      results: episodeData,
    };
  } catch (error) {
    console.log(error);
    return { overview: '', poster: '', providers: {}, results: [] };
  }
}

/**
 * Gets a single episode data for a series
 * @param imdbID - The imdbID of the episode
 */
async function getEpisode(imdbID?: IEpisode['imdbID']): Promise<IGetEpisode> {
  try {
    const { data } = await axios<IGetEpisode>('/api/omdb/getEpisode', { data: { imdbID }, method: 'post' });
    return data;
  } catch (error) {
    return {} as IGetEpisode;
  }
}

/**
 * Gets every episode data for a single season of a series
 * @param query - The name of the tv series
 * @param season - The season number to search
 */
async function getSeason({ query, season }: { query: string; season: number }) {
  try {
    const { data } = await axios<IEpisode[]>('/api/omdb/getSeason', { data: { query, season }, method: 'post' });
    return data;
  } catch (error) {
    return [{ Episode: '', imdbID: '', imdbRating: '', Released: '', Title: '' }];
  }
}

/**
 * Gets data about a series and also which streaming providers it can be found on
 * @param query - The name of the tv series
 */
async function getSeries({ query }: { query: string }) {
  try {
    const { data } = await axios<IGetSeriesData>('/api/omdb/getSeries', { data: { query }, method: 'post' });
    const { data: providerData } = await axios<IGetProvidersData>('/api/tmdb/getProviders', { data: { query }, method: 'post' });
    return { ...data, ...providerData };
  } catch (error) {
    return { totalSeasons: '0', overview: '', poster: '', providers: {} };
  }
}

export { getAllSeasons, getEpisode, getSeason, getSeries };
