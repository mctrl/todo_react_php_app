import React from 'react';

const SearchBox = ({ searchChange }) => {
    return (
      <div className="form-group">
          <input
            className='form-control'
            type='search'
            placeholder='search todos 2'
            onChange={searchChange}
        />
      </div>
        

    );
  }

export default SearchBox;