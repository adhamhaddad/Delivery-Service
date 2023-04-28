import React from 'react';

const Button = ({ type, text, onClick, style }) => {
  return (
    <button type={type} style={style} onClick={onClick}>
      {text}
    </button>
  );
};
export default Button;
