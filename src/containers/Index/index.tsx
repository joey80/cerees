import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { titleCase } from 'strand-ts';
import { BlackCell } from '@/components/BlackCell';
import { EpisodeModal } from '@/components/EpisodeModal';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/Input';
import { JustWatch } from '@/components/Svgs/JustWatch';
import { Legend } from '@/components/Legend';
import { NotFound } from '@/components/NotFound';
import { Sidebar } from '@/components/Sidebar';
import { SidebarList } from '@/components/SidebarList';
import { Spinner } from '@/components/Svgs/Spinner';
import { useAverageColor, useGetEpisode, useGetSeriesData, useSessionStorage } from '@/hooks';
import { getCellColor, getRandomTitle } from '@/util';
import styles from './styles.module.scss';

const cellclassName = 'flex justify-center items-center border-t-0 border-l-0 h-12 w-12 border border-dashed border-neutral-500';

function IndexContainer() {
  const [isClient, setIsClient] = useState(false);
  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const [currentEpisodeId, setCurrentEpisodeId] = useState('');
  const { push, query: urlQuery } = useRouter();
  const { fetchSeriesData, isLoading: isLoadingSeries, mostEpisodes, overview, poster, providers, series } = useGetSeriesData();
  const { data: episodeData, isLoading } = useGetEpisode(currentEpisodeId);
  const { hex } = useAverageColor(poster);
  const [lastFiveSearches, setLastFiveSearches] = useSessionStorage<string[]>('lastFiveSearches', []);
  const hasProviders = useMemo(() => Boolean(providers?.flatrate?.length && providers?.flatrate?.length > 0), [providers?.flatrate]);
  const notFound = useMemo(() => Boolean(!isLoadingSeries && series?.[0].length === 0 && lastQuery), [isLoadingSeries, lastQuery, series]);
  const initialTitle = useRef<string>();

  /**
   * Fetches new tv series data while updating the query param in the url and adding to the recent search list
   */
  function fetchData(query: string) {
    const computedQuery = titleCase(query);
    updateQueryParam(computedQuery);

    fetchSeriesData(computedQuery).then(() => {
      setLastQuery(computedQuery);
      // update the 'Recent Searches' with the latest query only if it doesn't currently
      // exist in the list and then only return up to the first 5 names
      setLastFiveSearches(oldState => [computedQuery, ...oldState.filter(elm => elm !== computedQuery).slice(0, 4)]);
      setQuery('');
    });
  }

  /**
   * Will either return the title listed in the query param or return one of the preset random title names
   */
  function getCurrentTitle() {
    return urlQuery?.title?.toString() || getRandomTitle();
  }

  /**
   * Updates the value of the query param in the url
   */
  function updateQueryParam(title: string) {
    push({ query: { ...urlQuery, title } }, undefined, { shallow: true });
  }

  /**
   * Fetches new data when submiting the form via the search input
   */
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    fetchData(query);
  }

  /**
   * Click handler for when clicking on a "Recent Searches" item
   */
  function handleClick(title: string) {
    updateQueryParam(title);
    setQuery('');

    fetchSeriesData(title).then(() => {
      setLastQuery(title);
    });
  }

  // On first render when need to get the current title and run the initial query
  useEffect(() => {
    if (!initialTitle.current) {
      setIsClient(true);
      const title = getCurrentTitle();
      initialTitle.current = title;
      fetchData(title);
    }

    // only run on page load/refresh
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-gray-800">
      <Sidebar
        search={
          <form className="w-full" onSubmit={handleSubmit}>
            <Input onChange={({ target }) => setQuery(target.value)} value={query} />
          </form>
        }
      >
        {isLoadingSeries && (
          <div className={`flex flex-grow items-center ${styles.spinnerContainer}`}>
            <Spinner className="-mt-3" />
          </div>
        )}
        {poster && !isLoadingSeries && <img alt={`poster image of ${lastQuery}`} className={styles.image} src={poster} />}
        <div style={{ transform: `translateY(${poster ? '-80px' : '0'})` }}>
          {isClient && lastFiveSearches?.length > 0 && (
            <SidebarList
              items={lastFiveSearches}
              onClick={title => handleClick(title)}
              onDelete={title => {
                setLastFiveSearches(oldState => [...oldState].filter(elm => elm !== title));
              }}
            >
              Recent Searches
            </SidebarList>
          )}
        </div>
      </Sidebar>
      <main className="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
        <div className="main-content flex flex-col flex-grow p-4">
          {notFound ? (
            <NotFound query={lastQuery} />
          ) : isLoadingSeries ? (
            <Spinner height={100} width={100} />
          ) : (
            <>
              {lastQuery && <h1 className="font-extrabold text-4xl text-white">{lastQuery}</h1>}
              {overview && <p className="text-white text-sm max-w-4xl opacity-75 py-6">{overview}</p>}
              {hasProviders && (
                <div className="text-white pb-6">
                  <div className="text-sm">Available to stream on:</div>
                  <div>
                    {providers?.flatrate?.map(({ logo_path, provider_id, provider_name }) => (
                      <img alt={provider_name} className="inline-block w-14 h-14 mr-3" key={provider_id} src={`https://www.themoviedb.org/t/p/original${logo_path}`} />
                    ))}
                  </div>
                  <a className="my-2 inline-block" target="_blank" href="https://www.justwatch.com">
                    <JustWatch />
                  </a>
                </div>
              )}
              {series?.[0]?.length > 0 && (
                <>
                  <Legend />
                  <div className={`flex flex-col flex-grow rounded p-5 shadow-md ${styles.container}`}>
                    <div className="flex flex-col">
                      <div className="inline-flex flex-row my-0">
                        {series?.length > 1 && (
                          <>
                            <BlackCell />
                            {Array.from(Array(series?.length)).map((x, index) => (
                              <BlackCell key={index}>{index + 1}</BlackCell>
                            ))}
                          </>
                        )}
                      </div>
                      <div className="flex flex-row flex-nowrap">
                        <div className="inline-flex flex-col">
                          {Array.from(Array(mostEpisodes)).map((_, index) => (
                            <BlackCell key={index}>{index + 1}</BlackCell>
                          ))}
                        </div>
                        {series?.map((elm, index) => (
                          <div className="inline-flex flex-col" key={index}>
                            {elm.map((elm2, index) => {
                              if (elm2) {
                                return (
                                  // episode cells
                                  <button
                                    className={`${cellclassName} ${getCellColor(
                                      parseInt(elm2.imdbRating, 10),
                                    )} relative select-none hover:border-2 hover:border-solid hover:border-slate-700`}
                                    key={index}
                                    onBlur={() => setCurrentEpisodeId('')}
                                    onFocus={() => setCurrentEpisodeId(elm2.imdbID)}
                                    onMouseEnter={() => setCurrentEpisodeId(elm2.imdbID)}
                                    onMouseLeave={() => setCurrentEpisodeId('')}
                                    type="button"
                                  >
                                    {currentEpisodeId === elm2.imdbID && isLoading ? <Spinner color={elm2.imdbRating === 'N/A' ? '#332939' : '#fff'} /> : elm2.imdbRating}
                                    {currentEpisodeId === elm2.imdbID && episodeData && <EpisodeModal {...episodeData} />}
                                  </button>
                                );
                              }

                              // empty cells
                              return <button className={`${cellclassName} cursor-auto`} key={index} style={{ backgroundColor: hex }} tabIndex={-1} type="button" />;
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
}

export { IndexContainer };
