import React from 'react';
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';

export const SearchBar = ({ placeholder }) => (
  <div className="search-bar">
    <FaSearch className="fa-search"/>
    <input type="text" placeholder={placeholder} />
  </div>
);