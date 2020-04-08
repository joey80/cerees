import React, { useState } from 'react';

const Input = ({ onSearchChange }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChange(search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='tv show name'
        className='input'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Input;
