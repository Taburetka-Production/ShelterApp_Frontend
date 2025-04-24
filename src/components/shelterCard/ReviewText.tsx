import React from "react";

interface ReviewTextProps {
  reviews: number;
}

export const ReviewText: React.FC<ReviewTextProps> = ({ reviews }) => {
  switch (reviews) {
    case undefined:
      return <span>- Немає відгуків</span>;
    case 0:
      return <span>- Немає відгуків</span>;
    case 1:
      return <span>- 1 відгук</span>;
    case 2:
      return <span>- 2 відгуки</span>;
    case 3:
      return <span>- 3 відгуки</span>;
    case 4:
      return <span>- 4 відгуки</span>;
    default:
      return <span>- {reviews} відгуків</span>;
  }
};
