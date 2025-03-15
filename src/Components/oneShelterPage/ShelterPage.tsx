import { Shelter } from "@/redux/types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import "./ShelterPage.css";

export const ShelterPage: React.FC = () => {
  const { id } = useParams();
  const shelters = useAppSelector((state) => state.shelter.shelters);
  const [shelter, setShelter] = useState<Shelter | null>(null);

  useEffect(() => {
    if (id) {
      const foundShelter = shelters.find((shelter) => shelter.id === id);
      if (foundShelter) {
        setShelter(foundShelter);
      }
    }
  }, [id, shelters]);

  if (!shelter) {
    return <p>Loading...</p>;
  }

  return (
    <div className="shelter-page__all-page">
      <h1 className="shelter-page__shelter-name">{shelter.name}</h1>
      <img
        src={shelter.imageUrl}
        alt={shelter.name}
        className="shelter-page__shelter-image"
      />
      <div className="shelter-page__shelter-rating">
        <span className="text-yellow-500">⭐ {shelter.rating}</span>
        <span className="text-gray-500">{shelter.reviewsCount} відгуків</span>
        <span className="text-gray-500">{shelter.animalsCount} тваринок</span>
      </div>
      <p className="shelter-page__shelter-address">
        {/* {shelter.address.city}, {shelter.address.street} */}
      </p>
      <p className="shelter-page__shelter-description">{shelter.description}</p>
    </div>
  );
};
