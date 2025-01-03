import React from 'react';
import { Footer } from "../../Components/Footer/Footer.js";
import { Header } from "../../Components/Header/Header.js";
import { MainContent } from "../../Components/authorizationPage/MainContent.js";

const AuthorizationPage = () => {
  return (
    <div className="all-page">
      <Header></Header>
      <MainContent></MainContent>
      <Footer></Footer>
    </div>
  );
}

export default AuthorizationPage;