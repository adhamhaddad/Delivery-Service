import React from 'react';
import styles from '../../../styles/main.module.css';
import Routes from '../../../config/routes';

const Main = ({ socket }) => {
  return (
    <main className={styles['main']}>
      <Routes socket={socket} />
    </main>
  );
};
export default Main;
