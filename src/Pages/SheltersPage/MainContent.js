import React from "react";
import "./MainContent.css";
import {Dropdown} from "./Dropdown.js"
import { Button } from "../../Components/Button.js";
import { ShelterCard } from "../../Components/ShelterCard.js";

export const MainContent = () => {

  const shelters = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
      title: 'Shelter title 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      rating: 4.5,
      reviews: 11,
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
      title: 'Shelter title 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      rating: 3.5,
      reviews: 48,
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
      title: 'Shelter title 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      rating: 5,
      reviews: 1,
    },
    {
      id: 4,
      image: `${process.env.PUBLIC_URL}/images/shelter.jpg`,
      title: 'Shelter title 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      rating: 2,
      reviews: 13,
    },
  ];

    return (
      <div className="main-content">
        <div className="choose-shelter-text">
          <h1>Choose your shelter</h1>
        </div>
        <div className="filter-container">
          <Dropdown />
          <Button className="choose-on-map-btn">Choose on map</Button>
        </div>

        <div className="main-shelters-div">
          {shelters.map((shelter) => (
            <ShelterCard
              image={shelter.image}
              key={shelter.id}
              title={shelter.title}
              description={shelter.description}
              rating={shelter.rating}
              reviews={shelter.reviews}
            />
          ))}
        </div>
      </div>
    );
}