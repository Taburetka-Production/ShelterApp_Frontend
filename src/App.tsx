import { BrowserRouter as Router } from "react-router-dom";
import { MainRoutes } from "./Components/mainPage/MainRoutes";
import { ProfileRoutes } from "./Components/profilePage/ProfileRoutes";
import { ShelterRoutes } from "./Components/oneShelterPage/ShelterRoutes";
import "./styles/main.scss";
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://localhost:7118/",
});
function App() {
  return (
    <Router>
      <MainRoutes />
      <ProfileRoutes />
      <ShelterRoutes />
    </Router>
  );
}

export default App;
