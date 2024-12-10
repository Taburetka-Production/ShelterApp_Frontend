import React from 'react';
import './Button.css';

export const Button = ({ onClick, children, className }) => (
  <button className={`btn ${className}`} onClick={onClick}>
    {children}
  </button>
);