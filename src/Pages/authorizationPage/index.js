import { Footer } from "../../Components/footer/Footer.js";
import { Header } from "../../Components/header/Header";
import { Login } from "../../Components/authorizationPage/Login";

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
