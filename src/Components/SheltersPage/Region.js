import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "../../styles/components/SheltersPage/Region.css";
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
        <IoIosArrowDown className={`arrow-icon${isOpen ? "-open" : ""}`}/>
      </button>
      <div className={`dropdown-region ${isOpen ? "open" : "close"}`}>
        <RegionList regions={regions} />
      </div>
    </div>
  );
};
