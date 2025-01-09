import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/components/SheltersPage/AllSheltersList.css";
import { ShelterCard } from "../ShelterCard/ShelterCard.js";
import { SkeletonCard } from "./SkeletonCard.js";
import { axiosInstance } from "../../App";
import { SheltersApi } from "../../generated-client/api";

export const AllSheltersList = () => {
  const [shelters, setShelters] = useState([]);
  const [visibleShelters, setVisibleShelters] = useState(4);

  // useEffect(() => {
  //   (async () => {
  //     const apiInstance = new SheltersApi(undefined, "", axiosInstance);
  //     const { data } = await apiInstance.sheltersGet();
  //     setShelters(data);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      axios.get("/shelters.json").then((response) => {
        setShelters(response.data);
      });
    })();
  }, []);

  const pressButton = () => {
    setVisibleShelters((prev) => prev + 8);
  };

  const pressCloseButton = () => {
    setVisibleShelters(4);
  };

  return (
    <div className="main-slider-container">
      <div className="main-shelters-div">
        {!!shelters.length
          ? shelters.slice(0, visibleShelters).map((shelter) => (
              <div className="card-container animation-card">
                <ShelterCard
                  key={shelter.id}
                  image={shelter.imageUrl}
                  title={shelter.name}
                  description={shelter.description}
                  rating={shelter.rating}
                  reviews={shelter.reviewsCount}
                  className={``}
                />
              </div>
            ))
          : Array.from({ length: 4 }).map(() => <SkeletonCard />)}
      </div>
      <div className="view-more-shelters-button-container">
        <button onClick={pressButton} className="view-more-shelters-button">
          View more
        </button>
        <button onClick={pressCloseButton} className="close-shelters-button">
          Close
        </button>
      </div>
    </div>
  );
};
