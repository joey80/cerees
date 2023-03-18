interface IGetSeries {
  Actors: string;
  Awards: string;
  Country: string;
  Director: string;
  Genre: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Rated: string;
  Ratings: { Source: string; Value: string }[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  totalSeasons: string;
  Type: string;
  Writer: string;
  Year: string;
}

export type { IGetSeries };
