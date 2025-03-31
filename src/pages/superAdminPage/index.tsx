import { SuperAdminPanel } from "../../components/superAdminPanel/SuperAdminPanel";
import { Footer } from "../../components/footer/Footer.js";
import { Header } from "../../components/header/Header";

export const SuperAdminPage = () => {
  return (
    <>
      <Header></Header>
      <SuperAdminPanel />
      <Footer></Footer>
    </>
  );
};
