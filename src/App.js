import React, { Fragment, useEffect, useState } from 'react';
// import { getOMDBData } from './services/omdb.service';
import { Data } from './App.data.js';
import './App.scss';

const App = () => {
  const [mostEpisodes, setMostEpisodes] = useState(null);

  const FindTheMostEpisodes = () => {
    const longest = Data.reduce((p, c, i, a) => (a[p].length > c.length ? p : i), 0);
    return setMostEpisodes(Data[longest].length);
  };

  useEffect(() => {
    FindTheMostEpisodes();
  });

  // const init = async () => {
  //   const search = await getOMDBData('the simpsons');
  //   console.log('the simpsons', search);
  // };

  // init();

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

  const RenderSeason2 = (obj, idx) => {
    return (
      <div className='app__column' key={idx}>
        {obj.map((elm2, index) => (
          <div className='app__cell' key={index}>
            {elm2.imdbRating}
          </div>
        ))}
      </div>
    );
  };

  const RenderApp = () =>
    Data.map((elm, index) => {
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
      <div className='app__cell app__cell--spacer' />
      {Array.from(Array(Data.length)).map((x, idx) => (
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
        {Data.map((elm, index) => {
          return RenderSeason2(elm, index);
        })}
        ;
      </div>
    </div>
  );

  return (
    <div className='App'>
      <RenderApp2 />
      <RenderApp />
    </div>
  );
};

export default App;
