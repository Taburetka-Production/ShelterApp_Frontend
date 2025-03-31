// import { Footer } from "../../components/Footer/Footer.js";
// import { Header } from "../../components/Header/Header.js";
import { MainContent } from "../../components/sheltersPage/MainContent";
import { TopSlider } from "../../components/sheltersPage/TopSlider";

const sheltersPage = () => {
  return (
    <div className="all-shelters-page">
      {/* <Header></Header> */}
      <TopSlider></TopSlider>
      <MainContent></MainContent>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default sheltersPage;
