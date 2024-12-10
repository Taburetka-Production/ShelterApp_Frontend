import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";
import { Button } from "../../Components/Button";
import { SearchBar } from "../../Components/SearchBar";
import { Rating } from "./Rating";
import { Region } from "./Region";
// import { useSelector } from "react-redux";

export const Dropdown = () => {
  // const minRating = useSelector((state) => state.rating.minRating);
  // const maxRating = useSelector((state) => state.rating.maxRating);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef();
  const handler = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [dropdownRef]);

  const handleFindClick = () => {
    setIsOpen(false);
    //
  }

  return (
    <div className="filter-menu" ref={dropdownRef}>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <img
          src={`${process.env.PUBLIC_URL}/Icons/filter.svg`}
          alt="Filter Icon"
          className="filter-icon"
        />
        Filters
      </Button>
      {isOpen && (
        <div className={`dropdown-filter-open fadeIn animated`}>
          <SearchBar placeholder="Search" />
          <Rating />
          <Region />
          <div className="button-find-div">
            <Button onClick={handleFindClick} className="find-open">
              Find
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
