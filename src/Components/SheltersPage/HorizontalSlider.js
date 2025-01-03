import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../../styles/components/SheltersPage/HorizontalSlider.css";
import { ShelterCard } from "../ShelterCard/ShelterCard.js";
import { SkeletonCard } from "./SkeletonCard.js";
import { axiosInstance } from "../../App.tsx";
import { ShelterAppApi, SheltersApi } from "../../generated-client/api.ts";

export const HorizontalSlider = () => {
  const [shelters, setShelters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    (async () => { 
      const apiInstance = new SheltersApi(undefined, '', axiosInstance);
      const {data} = await apiInstance.sheltersGet();
      setShelters(data)
    })() 
  }, [])

  for(let i = 0; i < shelters.length; i++){
    console.log(shelters[i]);
  }

  const itemsPerPage = 4;
  const totalPages = Math.ceil(shelters.length / itemsPerPage);

  const NextPage = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const PreviousPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="main-slider-container">
      <div>
        <button
          onClick={PreviousPage}
          disabled={currentIndex === 0}
          className="arrow-btn"
        >
          <IoIosArrowBack className="horizontal-slider-arrow back" />
        </button>
      </div>
      <div className="slider-wrapper">
        <div
          className="main-shelters-div"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {!!shelters.length ? shelters.map((shelter) => (
            <ShelterCard
              key={shelter.id}
              image={shelter.imageUrl}
              title={shelter.name}
              description={shelter.description}
              rating={shelter.rating}
              reviews={shelter.reviewsCount}
              className={``}
            />
          )) : Array.from({length:4}).map(() => (<SkeletonCard />))}
        </div>
      </div>
      <div>
        <button
          onClick={NextPage}
          disabled={currentIndex >= totalPages - 1}
          className="arrow-btn"
        >
          <IoIosArrowForward className="horizontal-slider-arrow forward" />
        </button>
      </div>
    </div>
  );
};
