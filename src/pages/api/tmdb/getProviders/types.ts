interface IMeta {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

interface IResults {
  ads?: IMeta[];
  buy?: IMeta[];
  flatrate?: IMeta[];
  link: string;
}

interface IProviders {
  id: number;
  results: Record<string, IResults>;
}

interface ISearchResults {
  id: number;
  overview: string;
}

interface ISearch {
  page: number;
  results: ISearchResults[];
}

interface IGetProvidersData {
  overview: ISearchResults['overview'];
  providers: IResults;
}

export type { IGetProvidersData, IProviders, IResults, ISearch };
