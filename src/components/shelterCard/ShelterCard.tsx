import React from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/components/shelterCard/ShelterCard.css";
import { Button } from "../button/Button";
import { ReviewText } from "./ReviewText";
import { Star } from "./Star";
import { ROUTES } from "@/routes/routes";
import { truncateText } from "../truncateText";

interface ShelterCardProps {
  image: string;
  title: string;
  description: string;
  rating: number;
  reviewsCount: number;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  slug: string;
}

export const ShelterCard: React.FC<ShelterCardProps> = ({
  image,
  title,
  description,
  rating,
  reviewsCount,
  className,
  slug,
}) => {
  const navigate = useNavigate();
  const handleViewMoreClick = (e: React.MouseEvent) => {
    navigate(`${ROUTES.SHELTER}/${slug}`);
  };

  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <div className={`shelter-card ${className || ""}`}>
      <div className="shelter-card-img">
        <img src={image} alt={title || "Shelter"} />{" "}
      </div>
      <div className="shelter-card-content">
        <div className="shelter-card-text-content">
          <h3>{title}</h3>
          <p className="shelter-description">
            {truncateText(description, 140)}
          </p>
        </div>
        <div className="shelter-card-footer">
          <div className="shelter-card-rating">
            <Star rating={rating}>
              {reviewsCount > 0 ? `(${roundedRating} stars)` : ""}
            </Star>
            <ReviewText reviews={reviewsCount} />
          </div>
          <Button className="view-more-btn" onClick={handleViewMoreClick}>
            View more
          </Button>
        </div>
      </div>
    </div>
  );
};
