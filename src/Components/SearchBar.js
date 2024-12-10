import React from 'react';
import './SearchBar.css';

export const SearchBar = ({ placeholder }) => (
  <div className="search-bar">
    <i className="fas fa-search"></i>
    <input type="text" placeholder={placeholder} />
  </div>
);