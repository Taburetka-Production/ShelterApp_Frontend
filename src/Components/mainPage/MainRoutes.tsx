import { Route, Routes } from "react-router-dom";
import MainPage from "../../Pages/MainPage";
import SheltersPage from "../../Pages/SheltersPage";
import AuthorizationPage from "../../Pages/authorizationPage/index";

export const MainRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/shelters" element={<SheltersPage />} />
      <Route path="/authorization" element={<AuthorizationPage />} />
    </Routes>
  );
};
