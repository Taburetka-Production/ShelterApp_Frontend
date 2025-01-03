import "../../styles/components/SheltersPage/MainContent.css";
import { Button } from "../Button.js";
import { AllSheltersList } from "./AllSheltersList.js";
import { Dropdown } from "./Dropdown.js";

export const MainContent = () => {
  return (
    <div className="main-content">
      <div className="choose-shelter-text">
        <h1>Choose your shelter</h1>
      </div>
      <div className="filter-container">
        <Dropdown />
        <Button className="choose-on-map-btn">Choose on map</Button>
      </div>
      <AllSheltersList />
    </div>
  );
};
