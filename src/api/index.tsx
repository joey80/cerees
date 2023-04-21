import axios from 'axios';
import { IEpisode } from '@/pages/api/omdb/getSeason/types';
import { IGetSeriesData } from '@/pages/api/omdb/getSeries/types';

/**
 * Gets information about a series and then gets episode data for
 * every season of that series
 * @param query - The name of the tv series
 */
async function getAllSeasons({ query }: { query: string }) {
  try {
    const { totalSeasons, poster } = await getSeries({ query });

    const episodeData = await Promise.all(
      Array.from(Array(parseInt(totalSeasons, 10)))?.map(async (_, index) => {
        return await getSeason({ query, season: index + 1 });
      }),
    );

    return {
      results: episodeData,
      poster,
    };
  } catch (error) {
    console.log(error);
    return { results: [], poster: '' };
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
    console.log(error);
    return [{ Episode: '', imdbID: '', imdbRating: '', Released: '', Title: '' }];
  }
}

/**
 * Gets data about a series
 * @param query - The name of the tv series
 */
async function getSeries({ query }: { query: string }) {
  try {
    const { data } = await axios<IGetSeriesData>('/api/omdb/getSeries', { data: { query }, method: 'post' });
    return data;
  } catch (error) {
    console.log(error);
    return { totalSeasons: '', poster: '' };
  }
}

export { getAllSeasons, getSeason, getSeries };
