import React from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/components/shelterCard/ShelterCard.css";
import { Button } from "../button/Button";
import { ReviewText } from "./ReviewText";
import { Star } from "./Star";
import { ROUTES } from "@/routes/routes";

interface ShelterCardProps {
  image: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  slug: string;
}

export const ShelterCard: React.FC<ShelterCardProps> = ({
  image,
  title,
  description,
  rating,
  reviews,
  className,
  onClick,
  slug,
}) => {
  const maxLength = 140;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${ROUTES.SHELTER}/${slug}`);
  };

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
          <Button className="view-more-btn" onClick={handleClick}>
            View more
          </Button>
        </div>
      </div>
    </div>
  );
};
