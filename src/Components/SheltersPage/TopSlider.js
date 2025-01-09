import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../../styles/components/SheltersPage/TopSlider.css";
import { ShelterCardForSlider } from "./ShelterCardForSlider.js";

export const TopSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [shelters, setShelters] = useState([]);
  const timeout = useRef(undefined);

  useEffect(() => {
    axios
      .get("/shelters.json")
      .then((response) => {
        const sortedShelters = response.data
          .sort((a, b) => (a.rating < b.rating ? 1 : -1))
          .slice(0, 8);
        setShelters(sortedShelters);
      })
      .catch((error) => {
        console.error("Error fetching shelters:", error);
      })
      .finally(() => {
        setIsLocked(false);
      });
  }, []);

  const handleRender = (shelter, index) => (
    <ShelterCardForSlider
      key={index}
      image={shelter.imageUrl}
      title={shelter.name}
      index={index}
      length={shelters.length}
      currentIndex={currentIndex}
      description={shelter.description}
      rating={shelter.rating}
      reviews={shelter.reviewsCount}
    />
  );

  const setStateWithTimeout = (index) => {
    if (isLocked) return;
    setIsLocked(true);
    setCurrentIndex(index);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setIsLocked(false);
    }, 500);
  };

  const pressNext = () =>
    setStateWithTimeout((currentIndex + 1) % shelters.length);
  const pressPrevious = () =>
    setStateWithTimeout((currentIndex - 1 + shelters.length) % shelters.length);

  return (
    // <div className="top-slider-container">
    //   <h2>Most popular shelters</h2>
    <div className="slider">
      <button className="top-slider-arrow-btn left" onClick={pressPrevious}>
        <IoIosArrowBack className="arrow back" />
      </button>
      {shelters.map((shelter, index) => handleRender(shelter, index))}
      <button className="top-slider-arrow-btn right" onClick={pressNext}>
        <IoIosArrowForward className="arrow forward" />
      </button>
    </div>
    // </div>
  );
};
