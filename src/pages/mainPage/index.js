import React from "react";
import { Footer } from "../../components/footer/Footer.js";
import { Header } from "../../components/header/Header.js";
import { MainContent } from "../../components/mainPage/MainContent.js";

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
