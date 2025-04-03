import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

interface StarProps {
  rating: number;
  children?: React.ReactNode;
}

export const Star: React.FC<StarProps> = ({ rating, children }) => {
  const stars: number[] = Array(5).fill(0);

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
            return <IoIosStar className="star full" key={index} />;
          case 0.5:
            return <IoIosStarHalf className="star half" key={index} />;
          case 0:
          default:
            return <IoIosStarOutline className="star empty" key={index} />;
        }
      })}
      {children}
    </span>
  );
};
