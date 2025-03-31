import { SuperAdminPanel } from "../../Components/superAdminPanel/SuperAdminPanel";
import { Footer } from "../../Components/footer/Footer.js";
import { Header } from "../../Components/header/Header";

export const SuperAdminPage = () => {
  return (
    <>
      <Header></Header>
      <SuperAdminPanel />
      <Footer></Footer>
    </>
  );
};
