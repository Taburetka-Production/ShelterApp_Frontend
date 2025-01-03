import React from "react";
import { Button } from "../Button";
import { ReviewText } from "../ShelterCard/ReviewText";
import { Star } from "../ShelterCard/Star";

export const ShelterCardForSlider = ({
  image,
  title,
  description,
  index,
  currentIndex,
  length,
  rating,
  reviews,
}) => {
  const classNames = [
    " beforePrevious",
    " previous",
    " current",
    " next",
    " afterNext",
  ];

  const className =
    "block" +
    (Math.abs(index - currentIndex) <= 2
      ? classNames[index - currentIndex + 2]
      : currentIndex <= 1 && length - 1 - index <= 1 - currentIndex
      ? classNames[1 - (length - 1 - index) - currentIndex]
      : currentIndex >= length - 2 && index <= 1 - (length - 1 - currentIndex)
      ? classNames[index + 3 + (length - 1 - currentIndex)]
      : "");

  return (
    <div className={`shelter-card ${className}`}>
      <div className="shelter-card-img top">
        <img src={image} alt="Shelter" />
      </div>
      <div className="shelter-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="shelter-card-rating">
          <Star rating={rating}>{reviews > 0 ? `(${rating} stars)` : ``}</Star>
          <ReviewText reviews={reviews} />
        </div>
        <Button className="view-more-btn">View more</Button>
      </div>
    </div>
  );
};
