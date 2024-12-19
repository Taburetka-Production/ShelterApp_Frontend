import React from "react";
import "./index.css"
import { TopSlider } from "./TopSlider";
import { MainContent } from "./MainContent";
import  { Header }  from "../../Components/Header.js";

const SheltersPage = () => {
  return (
    <div className="all-page">
      <div></div>
      <Header></Header>
      <TopSlider></TopSlider> 
      <MainContent></MainContent>
    </div>
  );
};

export default SheltersPage;