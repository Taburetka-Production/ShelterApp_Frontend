import { AnimalSummaryDto } from "@/generated-client/api";
import React, { useEffect, useState } from "react";
import "../../styles/components/sheltersPage/AllSheltersList.css";
import { AnimalCard } from "../animalCard/index";

export interface AnimalListProps {
  animals: AnimalSummaryDto[];
  onSaveToggle?: (slug: string) => void;
}

export const AnimalList: React.FC<AnimalListProps> = ({
  animals,
  onSaveToggle,
}) => {
  const [visibleAnimals, setVisibleAnimals] = useState(4);
  const showMore = () => setVisibleAnimals((prev) => prev + 8);
  const showLess = () => setVisibleAnimals(4);

  if (animals.length === 0) {
    return <p>Немає тваринок</p>;
  }

  return (
    <div className="main-slider-container">
      <div className="main-shelters-div">
        {animals.slice(0, visibleAnimals).map((animal) => (
          <div key={animal.slug} className="card-container animation-card">
            <AnimalCard animal={animal} onSaveToggle={onSaveToggle} />
          </div>
        ))}
      </div>
      <div className="view-more-shelters-button-container">
        {visibleAnimals < animals.length && (
          <button onClick={showMore} className="view-more-shelters-button">
            Переглянути більше
          </button>
        )}
        {visibleAnimals > 4 && (
          <button onClick={showLess} className="close-shelters-button">
            Скрити
          </button>
        )}
      </div>
    </div>
  );
};
