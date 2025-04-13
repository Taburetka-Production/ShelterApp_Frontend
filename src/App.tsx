import axios from "axios";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { ScrollToTop } from "./components/ScrollToTop";
import MainPage from "./pages/mainPage";
import SheltersPage from "./pages/sheltersPage";
import { AuthRoutes } from "./routes/AuthRoutes";
import { ProfileRoutes } from "./routes/ProfileRoutes";
import { ROUTES } from "./routes/routes";
import { ShelterRoutes } from "./routes/ShelterRoutes";
import { SuperAdminPanelRoutes } from "./routes/SuperAdminPanelRoutes";
import "./styles/main.scss";
export const axiosInstance = axios.create({
  baseURL: "https://localhost:7118/",
});
function App() {
  return (
    <Router>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.SHELTERS_PAGE} element={<SheltersPage />} />
        <Route path={`${ROUTES.AUTH}/*`} element={<AuthRoutes />} />
        <Route path={`${ROUTES.PROFILE}/*`} element={<ProfileRoutes />} />
        <Route path={`${ROUTES.SHELTER}/*`} element={<ShelterRoutes />} />
        <Route
          path={`${ROUTES.SUPER_ADMIN}/*`}
          element={<SuperAdminPanelRoutes />}
        />
      </Routes>
    </Router>
  );
}

export default App;
