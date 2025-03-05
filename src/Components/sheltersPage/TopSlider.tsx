import { useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchShelters } from "../../redux/slices/shelterSlice";
import "../../styles/components/sheltersPage/TopSlider.css";
import { ShelterCardForSlider } from "./ShelterCardForSlider";

export const TopSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const timeout = useRef<number | null>(null);
  const allShelters = useAppSelector((state) => state.shelter.shelters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allShelters.length === 0) {
      dispatch(fetchShelters());
    }
  }, [dispatch, allShelters.length]);

  const shelters = useMemo(() => {
    return allShelters
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  }, [allShelters]);

  const setStateWithTimeout = (index: number) => {
    if (isLocked) return;
    setIsLocked(true);
    setCurrentIndex(index);
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
    }
    timeout.current = window.setTimeout(() => setIsLocked(false), 700);
  };

  useEffect(() => {
    return () => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  const pressNext = () =>
    setStateWithTimeout((currentIndex + 1) % shelters.length);
  const pressPrevious = () =>
    setStateWithTimeout((currentIndex - 1 + shelters.length) % shelters.length);

  return (
    <div className="slider">
      <button className="top-slider-arrow-btn left" onClick={pressPrevious}>
        <IoIosArrowBack className="arrow back" />
      </button>
      {shelters.map((shelter, index) => (
        <ShelterCardForSlider
          key={shelter.id}
          image={shelter.imageUrl}
          title={shelter.name}
          index={index}
          length={shelters.length}
          currentIndex={currentIndex}
          description={shelter.description}
          rating={shelter.rating}
          reviews={shelter.reviewsCount}
        />
      ))}
      <button className="top-slider-arrow-btn right" onClick={pressNext}>
        <IoIosArrowForward className="arrow forward" />
      </button>
    </div>
  );
};
