import { AnimalSummaryDto } from "@/generated-client/api";
import { ROUTES } from "@/routes/routes";
import React from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { truncateText } from "../truncateText";
import "./AnimalCard.css";

export interface AnimalCardProps {
  animal: AnimalSummaryDto;
  onSaveToggle?: (slug: string) => void;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({
  animal,
  onSaveToggle,
}) => {
  const navigate = useNavigate();
  const handleViewMore = () => navigate(`${ROUTES.ANIMAL}/${animal.slug}`);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveToggle?.(animal.slug!);
  };

  return (
    <div className="animal-card">
      <div className="animal-card-img">
        <img
          src={animal.primaryPhotoUrl || ""}
          alt={animal.name || "shelter"}
        />
      </div>
      <div className="animal-card-content">
        <h3>{animal.name}</h3>
        <p className="animal-species">{animal.species}</p>
        <p className="animal-description">
          {truncateText(animal.description!, 100)}
        </p>
        <div className="animal-card-actions">
          <Button
            className="animal-view-more-btn"
            onClick={(e) => {
              handleViewMore();
            }}
          >
            Детальніше
          </Button>
          <button
            className="animal-card-save-btn"
            onClick={handleSaveClick}
            aria-label={animal.isSaved ? "Unsave" : "Save"}
          >
            {animal.isSaved ? <IoHeart /> : <IoHeartOutline />}
          </button>
        </div>
      </div>
    </div>
  );
};
