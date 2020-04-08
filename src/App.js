import React, { Fragment } from 'react';
// import { getOMDBData } from './services/omdb.service';
import { Data } from './App.data.js';
import './App.scss';

const App = () => {
  // const init = async () => {
  //   const search = await getOMDBData('the simpsons');
  //   console.log('the simpsons', search);
  // };

  // init();

  const TableThing = () => (
    <div className='app__container'>
      <div className='app__column'>
        <div className='app__cell'>1</div>
        <div className='app__cell'>2</div>
        <div className='app__cell'>3</div>
        <div className='app__cell'>4</div>
        <div className='app__cell'>5</div>
        <div className='app__cell'>6</div>
        <div className='app__cell'>7</div>
        <div className='app__cell'>8</div>
        <div className='app__cell'>9</div>
        <div className='app__cell'>10</div>
      </div>
      <div className='app__column'>
        <div className='app__cell'>1</div>
        <div className='app__cell'>2</div>
        <div className='app__cell'>3</div>
        <div className='app__cell'>4</div>
        <div className='app__cell'>5</div>
        <div className='app__cell'>6</div>
        <div className='app__cell'>7</div>
        <div className='app__cell'>8</div>
        <div className='app__cell'>9</div>
        <div className='app__cell'>10</div>
      </div>
    </div>
  );

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

  const RenderApp = () =>
    Data.map((elm, index) => {
      return RenderSeason(index + 1, elm);
    });

  return (
    <div className='App'>
      <TableThing />
      <RenderApp />
    </div>
  );
};

export default App;
