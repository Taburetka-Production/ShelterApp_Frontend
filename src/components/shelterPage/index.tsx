import { axiosInstance } from "@/App";
import { ShelterDetailDto, SheltersApi } from "@/generated-client/api";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OneShelterMap } from "../map/OneShelterMap";
import { Star } from "../shelterCard/Star";
import { AnimalList } from "./AnimalList";
import "./ShelterPage.css";
import { ShelterReviews } from "./ShelterReviews";
import { ReviewCreate } from "./ReviewCreate";

export const ShelterPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [shelter, setShelter] = useState<ShelterDetailDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShelter = async () => {
      try {
        const apiInstance = new SheltersApi(undefined, "", axiosInstance);
        const response = (await apiInstance.apiSheltersSlugGet(
          slug!,
        )) as unknown as AxiosResponse<ShelterDetailDto>;
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
  }, [slug]);

  useEffect(() => {
    console.log(shelter?.feedbacks);
  }, [shelter]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="shelter-page__container">
      {shelter ? (
        <>
          <div className="shelter-page__decorative-bg"></div>
          <div className="shelter-page__header-container">
            <div className="shelter-page__header-top">
              <div className="shelter-page__logo-name">
                <h1 className="shelter-page__shelter-name">{shelter.name}</h1>
              </div>
              <div className="shelter-page__rating-bookmark">
                <div className="shelter-page__rating">
                  {shelter.rating !== undefined && (
                    <Star rating={shelter.rating} />
                  )}
                </div>
                {/* Bookmark */}
              </div>
            </div>

            <div className="shelter-page__header-main">
              <div className="shelter-page__description-container">
                <p className="shelter-page__description">
                  {shelter.description}
                </p>
              </div>
              <div className="shelter-page__image-container">
                {shelter.imageUrl && (
                  <img
                    src={shelter.imageUrl}
                    alt={`${shelter.name} - Pet Adoptions`}
                    className="shelter-page__image"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="shelter-page__content">
            <div className="shelter-page__pets section">
              <h2>Оберіть улюбленця! ({shelter.animalsCount || 0} тваринок)</h2>
              <AnimalList animals={shelter.animals ?? []}></AnimalList>
            </div>
            <div className="shelter-page__location section">
              <h2>Наша локація та контакти</h2>
              {shelter.address && (
                <p className="shelter-page__shelter-address">
                  {shelter.address.city}, {shelter.address.street}
                </p>
              )}
              <div className="map-placeholder">
                <OneShelterMap shelter={shelter}></OneShelterMap>
              </div>
            </div>

            <div className="shelter-page__reviews section">
              <h2>Відгуки ({shelter.reviewsCount || 0})</h2>
              <div className="reviews-placeholder">
                <ShelterReviews feedbacks={shelter.feedbacks || []} />
              </div>
              <ReviewCreate slug={shelter.slug!}></ReviewCreate>
            </div>
          </div>
        </>
      ) : (
        <div className="loading-or-error">
          <p>Загрузка</p>
        </div>
      )}
    </div>
  );
};
