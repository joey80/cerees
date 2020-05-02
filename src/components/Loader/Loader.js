import React from 'react';
import './Loader.scss';

const Loader = () => {
  return (
    <div className='loader'>
      <span>Loading results</span>
      <span className='loader--small'>Please Wait</span>
    </div>
  );
};

export default Loader;
