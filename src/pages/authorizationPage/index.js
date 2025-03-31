import { Footer } from "../../components/footer/Footer.js";
import { Header } from "../../components/header/Header.js";
import { Login } from "../../components/authorizationPage/Login.js";

const AuthorizationPage = () => {
  return (
    <>
      <Header></Header>
      <Login />
      <Footer></Footer>
    </>
  );
};

export default AuthorizationPage;
