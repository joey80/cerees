import React from 'react';
// import { getOMDBData } from './services/omdb.service';
import { Data } from './App.data.js';

const App = () => {
  // const init = async () => {
  //   const search = await getOMDBData('the simpsons');
  //   console.log('the simpsons', search);
  // };

  // init();

  return (
    <div className='App'>
      {Data.map((elm, index) => (
        <pre key={index}>{JSON.stringify(elm)}</pre>
      ))}
    </div>
  );
};

export default App;
