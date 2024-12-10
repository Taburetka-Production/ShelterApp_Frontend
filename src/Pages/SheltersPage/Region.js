import React, { useState } from "react";
import "./Region.css";
import { RegionList } from "./RegionList";

export const Region = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBtnClick = () => {
    setIsOpen(!isOpen);
  };

  const regions = [
    { name: "Київ" },
    { name: "Дніпро" },
    { name: "Львів" },
    { name: "Кропивницький" },
    { name: "Івано-Франківськ" },
    { name: "Рівне" },
    { name: "Черкаси" },
  ];

  return (
    <div className="region-section">
      <button onClick={handleBtnClick}>
        Region
        <img
          className={`arrow-icon${isOpen ? "-open" : ""}`}
          src={`${process.env.PUBLIC_URL}/Icons/arrow.svg`}
          alt="Arrow Icon"
        />
      </button>
      <div className={`dropdown-region ${isOpen ? "open" : "close"}`}>
        <RegionList regions={regions} />
      </div>
    </div>
  );
};
