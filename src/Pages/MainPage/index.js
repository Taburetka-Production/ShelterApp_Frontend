import React from "react";
import { Footer } from "../../Components/footer/Footer.js";
import { Header } from "../../Components/header/Header.js";
import { MainContent } from "../../Components/mainPage/MainContent";

const MainPage = () => {
  return (
    <div className="all-page">
      <Header></Header>
      <MainContent></MainContent>
      <Footer></Footer>
    </div>
  );
};

export default MainPage;
