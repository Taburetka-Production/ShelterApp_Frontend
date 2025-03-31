import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainRoutes } from "./Components/mainPage/MainRoutes";
import { ShelterRoutes } from "./Components/oneShelterPage/ShelterRoutes";
import { ProfileRoutes } from "./Components/profilePage/ProfileRoutes";
import { SuperAdminPanelRoutes } from "./Components/superAdminPanel/SuperAdminPanelRoutes";
import { Register } from "./Components/authorizationPage/Register";
import { Login } from "./Components/authorizationPage/Login";
import axios from "axios";
import "./styles/main.scss";
export const axiosInstance = axios.create({
  baseURL: "https://localhost:7118/",
});
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/*" element={<ProfileRoutes />} />
        <Route path="/shelter/*" element={<ShelterRoutes />} />
        <Route path="/SuperAdminPanel/*" element={<SuperAdminPanelRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
