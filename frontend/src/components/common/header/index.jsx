import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from '../../../styles/header.module.css';
import Button from '../../UI/button';
import { AuthContext } from '../../../context/AuthContext';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const authCtx = useContext(AuthContext);
  const { pathname } = useLocation();

  const handleActive = () => {
    setIsActive((prev) => !prev);
  };
  useEffect(() => {
    return () => {
      setIsActive(false);
    };
  }, [pathname]);
  return (
    <header className={styles['header']}>
      <h2>Private Delivery Service</h2>
      <nav>
        <ul>
          {authCtx.user && authCtx.user.role === 1 && (
            <li>
              <NavLink to='/dashboard' exact activeClassName={styles['active']}>
                <i className={styles['dashboard']}></i>
                Dashboard
              </NavLink>
            </li>
          )}
          {authCtx.user && authCtx.user.role === 0 && (
            <li>
              <NavLink to='/todo' exact activeClassName={styles['active']}>
                <i className={styles['todo']}></i>
                Todo
              </NavLink>
            </li>
          )}
          {authCtx.user && (
            <>
              <li>
                <NavLink to='/parcels' exact activeClassName={styles['active']}>
                  <i className={styles['parcel']}></i>
                  Parcels
                </NavLink>
              </li>

              <li className={styles['username']}>
                <NavLink to='#' onClick={handleActive}>
                  {authCtx.user.username}
                </NavLink>
                {isActive && <Button text='Logout' onClick={authCtx.logout} />}
              </li>
            </>
          )}
          {!authCtx.user && (
            <li>
              <NavLink to='/login'>Login / Register</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
