import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { setRatingFilter } from "../../redux/actions/ratingActions";
import "./Rating.css";

export const Rating = () => {
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(10);
  const dispatch = useDispatch();
  const minGap = 1;

  const handleMinChange = (e) => {
    let value = parseInt(e.target.value)
    if (isNaN(value)) {
      value = 0;
    }
    if (value > maxRating - minGap) {
      value = maxRating - minGap;
    }
    else if (value < 0) {
      value = 0;
    }
    setMinRating(value);
    dispatch(setRatingFilter(value, maxRating));
  };

  const handleMaxChange = (e) => {
    let value = parseInt(e.target.value)
    if (isNaN(value)) {
      value = 10;
    }
    if (value < minRating + minGap) {
      value = minRating + minGap;
    } else if (value > 10) {
      value = 10;
    }
    setMaxRating(value);
    dispatch(setRatingFilter(minRating, value));
  };

  const getTrackStyle = () => {
    const minPosition = (minRating / 10) * 100;
    const maxPosition = (maxRating / 10) * 100;
    return {
      left: `${minPosition}%`,
      width: `${maxPosition - minPosition}%`,
    };
  };

  return (
    <div className="rating-filter">
      <div className="rating-inputs">
        <input
          type="number"
          min="0"
          max={maxRating}
          value={minRating}
          onChange={handleMinChange}
        />
        <label htmlFor="min-rating">Rating</label>
        <input
          type="number"
          max="10"
          min={minRating}
          value={maxRating}
          onChange={handleMaxChange}
        />
      </div>
      <div className="slider-container">
        <input
          type="range"
          id="min-range"
          min="0"
          max="10"
          value={minRating}
          onChange={handleMinChange}
          className="thumb thumb-left"
        />
        <input
          type="range"
          max="10"
          min="0"
          value={maxRating}
          onChange={handleMaxChange}
          className="thumb thumb-right"
        />
        <div className="slider-track">
          <div className="track-filled" style={getTrackStyle()}></div>
        </div>
      </div>
    </div>
  );
};
