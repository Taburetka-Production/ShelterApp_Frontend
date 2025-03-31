import React from "react";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { MainContent } from "../../components/mainPage/MainContent";

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
