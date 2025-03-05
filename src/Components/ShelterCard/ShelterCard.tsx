import React from "react";
import { Button } from "../Button";
import { ReviewText } from "./ReviewText";
import "./ShelterCard.css";
import { Star } from "./Star";

interface ShelterCardProps {
  image: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const ShelterCard: React.FC<ShelterCardProps> = ({
  image,
  title,
  description,
  rating,
  reviews,
  className,
  onClick,
}) => {
  const maxLength = 220;

  const truncateText = (text: string) => {
    if (text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    const lastDotIndex = truncated.lastIndexOf(" ");
    return lastDotIndex !== -1
      ? truncated.slice(0, lastDotIndex + 1) + "..."
      : truncated + "...";
  };

  return (
    <div className={`shelter-card ${className}`} onClick={onClick}>
      <div className="shelter-card-img">
        <img src={image} alt="Shelter" />
      </div>
      <div className="shelter-card-content">
        <div>
          <h3>{title}</h3>
          <p>{truncateText(description)}</p>
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
