import React from 'react';
import styles from '../../../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles['footer']}>
      Copyrights. 2023 &copy; - Powered by{' '}
      <a href='https://www.linkedin.com/in/adhamashraf' target='_blank'>
        Adham Haddad
      </a>
    </footer>
  );
};
export default Footer;
