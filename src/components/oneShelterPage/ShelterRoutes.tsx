import { Route, Routes } from "react-router-dom";
import { ShelterPage } from "./ShelterPage";
import { ShelterCreate } from "./ShelterCreate";

export const ShelterRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/shelter-create" element={<ShelterCreate />} />
      <Route path="/shelter/:id" element={<ShelterPage />} />
    </Routes>
  );
};
