import React from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

export const Star = ({ rating, children }) => {
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
      {stars.map((value) => {
        switch (value) {
          case 1:
            return <IoIosStar className="star full"/>;
          case 0.5:
            return <IoIosStarHalf className="star half"/>;
          case 0:
          default:
            return <IoIosStarOutline className="star empty"/>;
        }
      })}
      {children}
    </span>
  );
};
