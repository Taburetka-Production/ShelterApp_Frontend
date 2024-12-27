import React from "react";
import { Footer } from "../../Components/Footer/Footer.js";
import { Header } from "../../Components/Header/Header.js";
import { MainContent } from "../../Components/SheltersPage/MainContent.js";
import { TopSlider } from "../../Components/SheltersPage/TopSlider.js";

const SheltersPage = () => {
  return (
    <div className="all-shelters-page">
      <Header></Header>
      <TopSlider></TopSlider>
      <MainContent></MainContent>
      <Footer></Footer>
    </div>
  );
};

export default SheltersPage;