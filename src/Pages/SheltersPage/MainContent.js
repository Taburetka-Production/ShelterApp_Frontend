import React from "react";
import "./MainContent.css";
import {Dropdown} from "./Dropdown.js"
import { Button } from "../../Components/Button.js";
import { HorizontalSlider } from "./HorizontalSlider.js";

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

        <HorizontalSlider></HorizontalSlider>

      </div>
    );
}