import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useAppSelector } from "@/redux/hooks";
import "@/styles/components/sheltersPage/Region.css";
import { RegionList } from "./RegionList";

interface RegionProps {
  onRegionChange: (regions: string[]) => void;
}

export const Region: React.FC<RegionProps> = ({ onRegionChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const shelters = useAppSelector((action) => action.shelter.shelters);
  const handleBtnClick = () => setIsOpen(!isOpen);
  const regions = [
    ...new Set(
      shelters
        .map((shelter) => shelter.address?.city ?? "")
        .filter((city) => city !== ""),
    ),
  ];

  const handleRegionChange = (updatedRegions: string[]) => {
    setSelectedRegions(updatedRegions);
    onRegionChange(updatedRegions);
  };

  return (
    <div className="region-section">
      <button onClick={handleBtnClick}>
        Регіони
        <IoIosArrowDown className={`arrow-icon${isOpen ? "-open" : ""}`} />
      </button>
      <div className={`dropdown-region ${isOpen ? "open" : "close"}`}>
        <RegionList
          regions={regions}
          selectedRegions={selectedRegions}
          onRegionChange={handleRegionChange}
        />
      </div>
    </div>
  );
};
