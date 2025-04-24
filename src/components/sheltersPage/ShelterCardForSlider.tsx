import { ROUTES } from "@/routes/routes";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { ReviewText } from "../shelterCard/ReviewText";
import { Star } from "../shelterCard/Star";
import { truncateText } from "../truncateText";

interface ShelterCardForSliderProps {
  image: string;
  title: string;
  description: string;
  index: number;
  currentIndex: number;
  length: number;
  rating: number;
  reviews: number;
  slug: string;
}

export const ShelterCardForSlider: React.FC<ShelterCardForSliderProps> = ({
  image,
  title,
  description,
  index,
  currentIndex,
  length,
  rating,
  reviews,
  slug,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${ROUTES.SHELTER}/${slug}`);
  };

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
  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <div className={`shelter-card ${className}`}>
      <div className="shelter-card-img top">
        <img src={image} alt="Shelter" />
      </div>
      <div className="shelter-card-content">
        <h3>{title}</h3>
        <p className="shelter-card-description">
          {truncateText(description, 140)}
        </p>
        <div className="shelter-card-rating">
          <Star rating={rating}>
            {reviews > 0 ? `(${roundedRating} stars)` : ``}
          </Star>
          <ReviewText reviews={reviews} />
        </div>
        <Button className="view-more-btn" onClick={handleClick}>
          View more
        </Button>
      </div>
    </div>
  );
};
