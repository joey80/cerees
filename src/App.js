import React, { Fragment, useState } from 'react';
import { Palette } from 'react-palette';
import Input from './components/Input/Input';
import Loader from './components/Loader/Loader';
import { getOMDBData } from './services/omdb.service';
// import { Data } from './App.data.js';
import './App.scss';

const App = () => {
  const [loading, setLoading] = useState(null);
  const [mostEpisodes, setMostEpisodes] = useState(null);
  const [data, setData] = useState(null);
  const [poster, setPoster] = useState(null);
  const [seasonAverages, setSeasonAverages] = useState([]);

  const FindTheMostEpisodes = (arr) => {
    const longest = arr.reduce((p, c, i, a) => (a[p].length > c.length ? p : i), 0);
    return setMostEpisodes(arr[longest].length);
  };

  const GetTheSeasonAverages = (arr) => {
    const results = [];
    arr.map((elm) => {
      const avg = elm.reduce((r, c) => r + Number(c.imdbRating), 0) / elm.length;
      return results.push(avg);
    });
    return results;
  };

  const init = async (term) => {
    setLoading(true);
    const search = await getOMDBData(term);
    setData(search.results);
    return search;
  };

  const start = async (term) => {
    init(term).then((res) => {
      setPoster(res.poster);
      FindTheMostEpisodes(res.results);
      const averages = GetTheSeasonAverages(res.results);

      setSeasonAverages(averages);
      setLoading(false);
    });
  };

  // useEffect(() => {
  //   if (searchTerm) {
  //     init().then((res) => {
  //       setPoster(res.poster);
  //       FindTheMostEpisodes(res.results);
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   setData(Data.results);
  //   setPoster(Data.poster);
  //   FindTheMostEpisodes(Data.results);
  // }, []);

  const RenderSeason = (num, obj) => {
    return (
      <Fragment key={num}>
        <span>Season {num}</span>
        <br />
        {obj.map((elm2, index) => (
          <pre key={index}>{JSON.stringify(elm2)}</pre>
        ))}
      </Fragment>
    );
  };

  const RenderCellColor = (num) => {
    const rating = Number(num);
    if (rating >= 8.6) {
      return 'great';
    }
    if (rating >= 7.6 && rating <= 8.5) {
      return 'good';
    }
    if (rating >= 6.6 && rating <= 7.5) {
      return 'regular';
    }
    if (rating >= 5.0 && rating <= 6.5) {
      return 'bad';
    }
    if (rating <= 4.9) {
      return 'garbage';
    }
    return 'default';
  };

  const RenderBlankCells = (raw) => {
    if (mostEpisodes !== null) {
      const total = mostEpisodes - raw.length;
      if (total > 0) {
        return total;
      }
      return null;
    }
    return null;
  };

  const RenderSeason2 = (obj, idx) => {
    const blankCells = RenderBlankCells(obj);

    return (
      <div className='app__column' key={idx}>
        {obj.map((elm2, index) => (
          <div className={`app__cell app__cell--${RenderCellColor(elm2.imdbRating)}`} key={index}>
            {elm2.imdbRating}
          </div>
        ))}
        {blankCells !== null
          ? Array.from(Array(blankCells)).map((x, idx) => <div className='app__cell' key={idx} />)
          : null}
      </div>
    );
  };

  const RenderApp = () =>
    data.map((elm, index) => {
      return RenderSeason(index + 1, elm);
    });

  const RenderEpisodeColumn = () => (
    <div className='app__column'>
      {Array.from(Array(mostEpisodes)).map((x, idx) => (
        <div className='app__cell app__cell--key' key={idx}>
          {idx + 1}
        </div>
      ))}
    </div>
  );

  const RenderSeasonRow = () => (
    <div className='app__column app__column--key'>
      <div className='app__cell app__cell--key' />
      {Array.from(Array(data.length)).map((x, idx) => (
        <div className='app__cell app__cell--key' key={idx}>
          {idx + 1}
        </div>
      ))}
    </div>
  );

  const RenderApp2 = () => (
    <div className='app__container'>
      <RenderSeasonRow />
      <div className='app__container__inner'>
        <RenderEpisodeColumn />
        {data.map((elm, index) => {
          return RenderSeason2(elm, index);
        })}
      </div>
    </div>
  );

  if (data !== null && loading === false) {
    return (
      <Palette src={poster}>
        {({ data, loading, error }) => (
          <div
            className='app'
            style={{
              '--dominant-color': data.vibrant,
            }}
          >
            <div className='app__header'>
              <div className='app__image__container'>
                <Input onSearchChange={start} />
                <div className='app__image' style={{ backgroundImage: `url(${poster})` }} />
                {/* <img src={poster} alt='something dynamic' className='app__image' /> */}
              </div>
              <RenderApp2 />
            </div>
            <div className='app__debugger'>
              <RenderApp />
            </div>
          </div>
        )}
      </Palette>
    );
  } else if (loading) {
    return <Loader />;
  }

  return <Input onSearchChange={start} />;
};

export default App;
