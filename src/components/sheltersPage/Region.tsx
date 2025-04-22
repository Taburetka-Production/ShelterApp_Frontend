import "@/styles/components/sheltersPage/Region.css";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RegionList } from "./RegionList";

export interface RegionProps {
  regions: string[];
  selectedRegions: string[];
  onRegionChange: (regions: string[]) => void;
}

export const Region: React.FC<RegionProps> = ({
  regions,
  selectedRegions,
  onRegionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="region-section">
      <button onClick={() => setIsOpen(!isOpen)}>
        Регіони
        <IoIosArrowDown className={`arrow-icon${isOpen ? "-open" : ""}`} />
      </button>

      <div className={`dropdown-region ${isOpen ? "open" : "close"}`}>
        <RegionList
          regions={regions}
          selectedRegions={selectedRegions}
          onRegionChange={onRegionChange}
        />
      </div>
    </div>
  );
};
