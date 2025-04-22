import React from "react";

interface ReviewTextProps {
  reviews: number;
}

export const ReviewText: React.FC<ReviewTextProps> = ({ reviews }) => {
  switch (reviews) {
    case 0:
      return <span>- Немає відгуків</span>;
    case 1:
      return <span>- 1 відгук</span>;
    case undefined:
      return <span>- Немає відгуків</span>;
    default:
      return <span>- {reviews} відгуків</span>;
  }
};
