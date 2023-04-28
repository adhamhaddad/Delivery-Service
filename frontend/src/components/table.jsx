import React from 'react';
import Item from './item';
import styles from '../styles/list.module.css';

const Table = ({ filter, thead, list, handleActions, type }) => {
  // Table Headers
  const tableHeader =
    thead.length > 0 &&
    thead
      .filter((header) => header.role && header.valid)
      .map((header) => <th key={header.title}>{header.title}</th>);

  // Filters
  const listItems =
    filter === 'ALL'
      ? list.length > 0 &&
        list.map((item) => (
          <Item
            key={item.id}
            type={type}
            item={item}
            handleActions={handleActions}
            filter={filter}
          />
        ))
      : list.length > 0 &&
        list.map(
          (item) =>
            item.status === filter && (
              <Item
                key={item.id}
                type={type}
                item={item}
                handleActions={handleActions}
                filter={filter}
              />
            )
        );
  return (
    <div className={styles['list']}>
      <table>
        <thead>
          <tr>{tableHeader}</tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
      {!listItems && <p>No Items found!</p>}
    </div>
  );
};
export default Table;
