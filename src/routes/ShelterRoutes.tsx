import { Route, Routes } from "react-router-dom";
import { ShelterCreate } from "../components/oneShelterPage/ShelterCreate";
import { ShelterPage } from "../components/oneShelterPage/ShelterPage";
import { SHELTER_NESTED_ROUTES } from "@/routes/routes";

export const ShelterRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={SHELTER_NESTED_ROUTES.CREATE} element={<ShelterCreate />} />
      <Route path={SHELTER_NESTED_ROUTES.DETAIL} element={<ShelterPage />} />
    </Routes>
  );
};
