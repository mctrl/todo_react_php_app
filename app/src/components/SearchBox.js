import React from 'react';

const SearchBox = ({ searchChange }) => {
    return (
      <div className="form-group">
          <input
            className='form-control'
            type='search'
            placeholder='search todos'
            onChange={searchChange}
        />
      </div>
        

    );
  }

export default SearchBox;