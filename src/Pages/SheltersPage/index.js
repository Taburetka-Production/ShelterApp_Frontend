import React from "react";
import "./index.css"
import { Slider } from "./Slider";
import { MainContent } from "./MainContent";

const SheltersPage = () => {
  return (
    <div className="all-page">
      <div></div>
      <Slider></Slider> 
      <MainContent></MainContent>
    </div>
  );
};

export default SheltersPage;