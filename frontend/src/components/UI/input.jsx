import React from 'react';
import styles from '../../styles/input.module.css';

const Input = ({ id, label, type, value, onChange }) => {
  return (
    <div className={styles['input-box']}>
      <label htmlFor={id}>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
};
export default Input;
