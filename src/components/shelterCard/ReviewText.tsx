import React from "react";

interface ReviewTextProps{
  reviews: number;
}

export const ReviewText:React.FC<ReviewTextProps> = ({ reviews }) => {
  switch (reviews) {
    case 0:
      return <span>- There are no reviews</span>;
    case 1:
      return <span>- 1 review</span>;
    default:
      return <span>- {reviews} reviews</span>;
  }
};
