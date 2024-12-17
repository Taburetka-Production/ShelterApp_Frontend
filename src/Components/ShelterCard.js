import React from "react";
import "./ShelterCard.css";
import { Button } from "./Button";

export const ShelterCard = ({ image, title, description, rating, reviews }) => {

  const ReviewText = ({reviews}) => {
      switch(reviews){
        case 0:
          return (
            <span>- There are no reviews</span>
          )
        case 1: 
          return (
            <span>- 1 review</span>
          )
        default: 
          return(
            <span>{reviews} - reviews</span>
          )
      }
  }

  const Star = ({ rating, children, reviews }) => {
    const stars = Array(5).fill(0);

    if (rating % 1 !== 0) {
      for (let i = 0; i < Math.floor(rating); i++) {
        stars[i] = 1;
      }
      if (Math.floor(rating) < stars.length) {
        stars[Math.floor(rating)] = 0.5;
      }
    } else {
      for (let i = 0; i < rating; i++) {
        stars[i] = 1;
      }
    }

    return (
      <span className="star-span">
        {stars.map((value, index) => {
          switch (value) {
            case 1:
              return (
                <img key={index} src="/Icons/fullStar.svg" alt="Filled Star" />
              );
            case 0.5:
              return (
                <img key={index} src="/Icons/halfStar.svg" alt="Half Star" />
              );
            case 0:
            default:
              return (
                <img key={index} src="/Icons/empty-star.svg" alt="Empty Star" />
              );
          }
        })}
        {children}
      </span>
    );
  };

  return (
    <div className="shelter-card">
      <div className="shelter-card-img">
        <img src={image} alt="Shelter"/>
      </div>

      <div className="shelter-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="shelter-card-rating">
          <Star rating={rating}>{reviews > 0 ?  `(${rating} stars)` : ``}</Star>
          <ReviewText reviews = {reviews}/>
        </div>
        <Button className="view-more-btn">View more</Button>
      </div>
    </div>
  );
}