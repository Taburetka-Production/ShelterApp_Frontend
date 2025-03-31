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
      <div className="shelter-page__shelter-header">
        <div className="shelter-page__shelter-name-logo-desc">
          <div className="shelter-page__shelter-name-logo">
            {/* logo */}
            <h1 className="shelter-page__shelter-name">{shelter.name}</h1>
          </div>
          <p className="shelter-page__shelter-description">
            {shelter.description}
          </p>
        </div>
        <div className="shelter-page__shelter-rating-image">
          <span className="text-yellow-500">⭐ {shelter.rating}</span>
          <span className="text-gray-500">{shelter.reviewsCount} відгуків</span>
          <span className="text-gray-500">{shelter.animalsCount} тваринок</span>
          <img
            src={shelter.imageUrl}
            alt={shelter.name}
            className="shelter-page__shelter-image"
          />
        </div>
        <p className="shelter-page__shelter-address">
          {/* {shelter.address.city}, {shelter.address.street} */}
        </p>
      </div>
      <div className="shelter-page__shelter-content">
        <div className="shelter-page__shelter-pets">
          <h2>Choose your pet</h2>
        </div>
        <div className="shelter-page__shelter-contacts"></div>
        <div className="shelter-page__shelter-reviews"></div>
      </div>
    </div>
  );
};
