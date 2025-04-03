import { Shelter } from "@/redux/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShelterPage.css";

export const ShelterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShelter = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7118/api/Shelters/${id}`,
        );
        setShelter(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("Притулок не знайдено");
          } else {
            setError("Помилка завантаження. Спробуйте пізніше");
          }
        } else {
          setError("Виникла помилка. Спробуйте пізніше");
        }
        setShelter(null);
      }
    };
    fetchShelter();
  }, [id]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      {shelter ? (
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
              <span className="text-yellow-500">⭐ {shelter?.rating}</span>
              <span className="text-gray-500">
                {shelter.reviewsCount} відгуків
              </span>
              <span className="text-gray-500">
                {shelter.animalsCount} тваринок
              </span>
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
              <h2>Оберіть улюбленця!</h2>
            </div>
            <div className="shelter-page__shelter-contacts"></div>
            <div className="shelter-page__shelter-reviews"></div>
          </div>
        </div>
      ) : (
        <div>{/* <p>{error}</p> */}</div>
      )}
    </>
  );
};
