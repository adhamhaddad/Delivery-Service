import React from 'react';
import styles from '../../styles/authority.module.css';

const NotAuthority = () => {
  return (
    <div className={styles['authority-page']}>
      401 - you don't have authority.
    </div>
  );
};
export default NotAuthority;
