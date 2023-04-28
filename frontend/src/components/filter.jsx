import React from 'react';
import styles from '../styles/filter.module.css';

const Filter = ({ title, options, filter, setFilter }) => {
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const filerOptions =
    options.length > 0 &&
    options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  return (
    <div className={styles['filter']}>
      <label>Filter {title}</label>
      <select defaultValue={filter} onChange={handleFilter}>
        {filerOptions}
      </select>
    </div>
  );
};
export default Filter;
