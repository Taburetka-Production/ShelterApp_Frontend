import axios from "axios";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/authorizationPage/Login";
import { Register } from "./components/authorizationPage/Register";
import { ShelterRoutes } from "./components/oneShelterPage/ShelterRoutes";
import { ProfileRoutes } from "./components/profilePage/ProfileRoutes";
import { SuperAdminPanelRoutes } from "./components/superAdminPanel/SuperAdminPanelRoutes";
import MainPage from "./pages/mainPage";
import SheltersPage from "./pages/sheltersPage";
import "./styles/main.scss";
import { ScrollToTop } from "./components/ScrollToTop";
export const axiosInstance = axios.create({
  baseURL: "https://localhost:7118/",
});
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/shelters" element={<SheltersPage />} />
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
