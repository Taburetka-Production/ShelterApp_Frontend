import React from "react";
import { useNavigate } from "react-router-dom";
import "./AnimalCard.css";
import { Button } from "../button/Button";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { ROUTES } from "@/routes/routes";
import { Animal } from "@/redux/types";

export interface AnimalCardProps {
  animal: Animal;
  onSaveToggle?: (slug: string) => void;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({
  animal,
  onSaveToggle,
}) => {
  // const navigate = useNavigate();
  // const handleViewMore = () => navigate(`${ROUTES.ANIMAL}/${animal.slug}`);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveToggle?.(animal.slug);
  };

  return (
    // <div className="animal-card" onClick={handleViewMore}>
    <div className="animal-card">
      <div className="animal-card-img">
        <img src={animal.primaryPhotoUrl} alt={animal.name} />
      </div>
      <div className="animal-card-content">
        <h3>{animal.name}</h3>
        <p className="animal-species">{animal.species}</p>
        <p className="animal-status">Status: {animal.status}</p>
        <div className="animal-card-actions">
          <Button
            className="animal-view-more-btn"
            onClick={(e) => {
              // e.stopPropagation();
              // handleViewMore();
            }}
          >
            View more
          </Button>
          <button
            className="save-btn"
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
