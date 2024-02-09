import React from 'react';
import './css/FilterBox.css'
const FilterBox = ({ filterValue, onFilterChange }) => {
  return (
    <div className='fliterBox'>
      <label htmlFor="filter">:חיפוש</label>
      <input
        type="text"
        id="filter"
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
}

export default FilterBox;
