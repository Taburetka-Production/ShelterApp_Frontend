import React from "react";
import { Button } from "../Button";
import { ReviewText } from "./ReviewText";
import "./ShelterCard.css";
import { Star } from "./Star";

export const ShelterCard = ({
  image,
  title,
  description,
  rating,
  reviews,
  onClick,
  className,
}) => {
  return (
    <div className={`shelter-card ${className}`} onClick={onClick}>
      <div className="shelter-card-img">
        <img src={image} alt="Shelter" />
      </div>
      <div className="shelter-card-content">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div>
          <div className="shelter-card-rating">
            <Star rating={rating}>
              {reviews > 0 ? `(${rating} stars)` : ``}
            </Star>
            <ReviewText reviews={reviews} />
          </div>
          <Button className="view-more-btn">View more</Button>
        </div>
      </div>
    </div>
  );
};
