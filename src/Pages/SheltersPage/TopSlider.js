import React from "react";
import { useState } from "react";
import { shelters } from "./HorizontalSlider";
import { ShelterCard } from "../../Components/ShelterCard";
import "./TopSlider.css"


export const TopSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const moveLeft = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : shelters.length - 1
        );
    };

    const moveRight = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < shelters.length - 1 ? prevIndex + 1 : 0
        );
    };

    const sliderStyle = {
        transform: `translateX(-${currentIndex * (100 / 3)}%)`,
        transition: "transform 0.7s ease",
    };

    return (
        <div className="top-slider-div">
            <div className="left-btn-div">
                <button className="arrow-btn" onClick={moveLeft}>left</button>
            </div>

            <div className="top-slider-wrapper">
                <div className="top-slider-content" style={sliderStyle}>
                    {shelters.map((shelter, index) => (
                        <ShelterCard
                            key={shelter.id}
                            image={shelter.image}
                            title={shelter.title}
                            description={shelter.description}
                            rating={shelter.rating}
                            reviews={shelter.reviews}
                            className={`top-slider ${
                                index === currentIndex ? "active" : ""
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="right-btn-div">
                <button className="arrow-btn" onClick={moveRight}>right</button>
            </div>
        </div>
    );
};
