import axios from "axios";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/authorizationPage/Login";
import { Register } from "./components/authorizationPage/Register";
import { MainRoutes } from "./components/mainPage/MainRoutes";
import { ShelterRoutes } from "./components/oneShelterPage/ShelterRoutes";
import { ProfileRoutes } from "./components/profilePage/ProfileRoutes";
import { SuperAdminPanelRoutes } from "./components/superAdminPanel/SuperAdminPanelRoutes";
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
