import React, { useState, useEffect } from "react";
// import axios from 'axios';
import { ShelterCard } from "../../Components/ShelterCard.js";
import "./HorizontalSlider.css";

export const shelters = [
  {
    id: 1,
    image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
    title: "Shelter title 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    rating: 4.5,
    reviews: 11,
  },
  {
    id: 2,
    image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
    title: "Shelter title 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    rating: 3.5,
    reviews: 48,
  },
  {
    id: 3,
    image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
    title: "Shelter title 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    rating: 0,
    reviews: 0,
  },
  {
    id: 4,
    image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
    title: "Shelter title 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    rating: 1,
    reviews: 1,
  },
  {
    id: 5,
    image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
    title: "Shelter title 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    rating: 5,
    reviews: 3,
  },
  {
    id: 6,
    image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
    title: "Shelter title 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    rating: 2.5,
    reviews: 101,
  },
  {
    id: 7,
    image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
    title: "Shelter title 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    rating: 0.5,
    reviews: 4,
  },
  {
    id: 8,
    image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
    title: "Shelter title 8",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    rating: 5,
    reviews: 22,
  },
  {
    id: 9,
    image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
    title: "Shelter title 9",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    rating: 3,
    reviews: 312,
  },
];
export const HorizontalSlider = () => {


  // const [shelters, setShelters] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios.get('/Shelters')
  //     .then(response => {
  //       setShelters(response.data);
  //     })
  //     .catch(err => {
  //       console.error('Error fetching shelters:', err);
  //       setError('Error while downloading .');
  //     });
  // }, []);


  const [currentIndex, setCurrentIndex] = useState(0);
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
      <div className="left-btn-div">
        <button
          onClick={PreviousPage}
          disabled={currentIndex === 0}
          className="arrow-btn"
        >
          left
        </button>
      </div>
      <div className="slider-wrapper">
        <div
          className="main-shelters-div"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {shelters.map((shelter) => (
              <ShelterCard
                key={shelter.id}
                image={shelter.image}
                title={shelter.title}
                description={shelter.description}
                rating={shelter.rating}
                reviews={shelter.reviews}
              />
            ))}
        </div>
      </div>
      <div className="right-btn-div">
        <button
          onClick={NextPage}
          disabled={currentIndex >= totalPages - 1}
          className="arrow-btn"
        >
          right
        </button>
      </div>
    </div>
  );
};
