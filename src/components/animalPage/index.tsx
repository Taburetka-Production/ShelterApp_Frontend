import { axiosInstance } from "@/App";
import { Animal, AnimalsApi } from "@/generated-client/api";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaMars,
  FaPaw,
  FaRegHeart,
  FaRulerCombined,
  FaTag,
  FaVenus,
  FaTimesCircle,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Button } from "../button/Button";
import "./OneAnimalPage.css";
import { HealthStatus } from "./HealthStatus";

const getGenderIcon = (sex: string) => {
  if (sex === "Самець") return <FaMars />;
  else return <FaVenus />;
};

const formatAge = (age: number): string => {
  if (age < 1) {
    return "< 1 року";
  }
  const mod10 = age % 10;
  if (mod10 === 1) {
    return `${age} рік`;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return `${age} роки`;
  }
  return `${age} років`;
};

export const OneAnimalPage: React.FC = () => {
  const [animal, setAnimal] = useState<Animal | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const fetchAnimal = async () => {
      if (!slug) {
        setError("Не вказано ідентифікатор тваринки.");
        setIsLoading(false);
        return;
      }
      try {
        const apiInstance = new AnimalsApi(undefined, "", axiosInstance);
        const response = (await apiInstance.apiAnimalsSlugGet(
          slug,
        )) as unknown as AxiosResponse<Animal>;
        setAnimal(response.data);
        setCurrentImageIndex(0);
        // setIsFavorite(checkIfFavorite(response.data.id));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError(`Тваринку зі slug "${slug}" не знайдено`);
          } else {
            setError(
              `Помилка завантаження (${err.response?.status || "network error"}). Спробуйте пізніше`,
            );
          }
        } else {
          setError("Виникла невідома помилка. Спробуйте пізніше");
        }
        console.error("Error fetching animal:", err);
        setAnimal(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnimal();
  }, [slug]);

  const handlePrevImage = () => {
    if (!animal?.photos || animal.photos.length === 0) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? animal.photos!.length - 1 : prevIndex - 1,
    );
  };

  const handleNextImage = () => {
    if (!animal?.photos || animal.photos.length === 0) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === animal.photos!.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // delete from favorites
  };

  const handleAdoptButton = () => {};

  const getSterilizationText = (sterilized: boolean, sex: string) => {
    const prefix = sterilized ? "" : "Не ";
    const ending = sex === "Самець" ? "ий" : "а";
    return `${prefix}стерилізован${ending}`;
  };

  if (isLoading) {
    return (
      <div className="animal-page__container loading-or-error">
        <p>Завантаження даних тваринки...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animal-page__container loading-or-error error">
        <p>{error}</p>
        <Link to="/shelters">До списку притулків</Link>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="animal-page__container loading-or-error">
        <p>Не вдалося завантажити дані.</p>
      </div>
    );
  }

  const photos = animal.photos || [];
  const currentPhotoUrl = photos[currentImageIndex]?.photoUrl || "";
  const hasMultiplePhotos = photos.length > 1;

  return (
    <div className="animal-page__container">
      <div className="animal-page__details-wrapper">
        <div className="animal-page__gallery">
          <div className="gallery__main-image">
            <img
              src={currentPhotoUrl}
              alt={`${animal.name} - фото ${currentImageIndex + 1}`}
            />
            {hasMultiplePhotos && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="gallery__nav-btn gallery__nav-btn--prev"
                  aria-label="Previous image"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleNextImage}
                  className="gallery__nav-btn gallery__nav-btn--next"
                  aria-label="Next image"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
          {hasMultiplePhotos && (
            <div className="gallery__thumbnails">
              {photos.map((photo, index) => (
                <button
                  key={photo.id || index}
                  className={`thumbnail__item ${index === currentImageIndex ? "active" : ""}`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={photo.photoUrl}
                    alt={`${animal.name} - thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="animal-page__info">
          <div className="info__header">
            <h1>{animal.name}</h1>
            <button
              onClick={handleFavoriteToggle}
              className="info__favorite-btn"
              aria-label="Add to favorites"
            >
              {isFavorite ? (
                <FaHeart className="icon-filled" />
              ) : (
                <FaRegHeart />
              )}
            </button>
          </div>
          <p className="info__short-desc">
            {animal.sex}, {animal.age}р.
          </p>
          <div className="info__tags">
            <span className="animal-tag">
              <span className="animal-tag-icon">
                {getGenderIcon(animal.sex)}
              </span>
              {animal.sex}
            </span>

            <span className="animal-tag">
              <span className="animal-tag-icon">
                <FaPaw />
              </span>
              {formatAge(animal.age)}
            </span>

            <span className="animal-tag">
              <span className="animal-tag-icon">
                <FaRulerCombined />
              </span>
              {animal.size || "не вказано"}
            </span>

            <span className="animal-tag">
              <span className="animal-tag-icon">
                <FaTag />
              </span>
              {animal.breed || animal.species || "не вказано"}
            </span>
          </div>

          <div className="info__health">
            <h2>Стан здоров'я</h2>
            <div className="health-items">
              <span className="health-item">
                {animal.sterilized ? (
                  <FaCheckCircle className="icon-check" />
                ) : (
                  <FaTimesCircle className="icon-cross" />
                )}
                {getSterilizationText(animal.sterilized, animal.sex)}
              </span>
              <HealthStatus healthCondition={animal.healthCondition} />
            </div>
          </div>

          <div className="info__story">
            <h2>My story</h2>
            <p>{animal.description || "No story available yet."}</p>
          </div>

          <div className="info__adopt-button-container">
            <Button className="info__adopt-button" onClick={handleAdoptButton}>
              Adopt me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
