interface IEpisode {
  Episode: string;
  imdbID: string;
  imdbRating: string;
  Released: string;
  Title: string;
}

interface IGetSeason {
  Episodes: IEpisode[];
  Season: string;
  Title: string;
  totalSeasons: string;
}

export type { IEpisode, IGetSeason };
