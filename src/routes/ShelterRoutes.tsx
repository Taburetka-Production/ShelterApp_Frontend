import { Route, Routes } from "react-router-dom";
import { ShelterCreate } from "../components/shelterPage/ShelterCreate";
import { SHELTER_NESTED_ROUTES } from "@/routes/routes";
import { OneShelterPage } from "@/pages/oneShelterPage";

export const ShelterRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={SHELTER_NESTED_ROUTES.CREATE} element={<ShelterCreate />} />
      <Route path={SHELTER_NESTED_ROUTES.DETAIL} element={<OneShelterPage />} />
    </Routes>
  );
};
