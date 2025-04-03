import { Footer } from "../../components/footer/Footer.js";
import { Header } from "../../components/header/Header.js";
import { MainContent } from "../../components/sheltersPage/MainContent";
import { TopSlider } from "../../components/sheltersPage/TopSlider";

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
