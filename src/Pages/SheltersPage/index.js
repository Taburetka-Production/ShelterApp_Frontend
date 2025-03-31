// import { Footer } from "../../Components/Footer/Footer.js";
// import { Header } from "../../Components/Header/Header.js";
import { MainContent } from "../../Components/sheltersPage/MainContent";
import { TopSlider } from "../../Components/sheltersPage/TopSlider";

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