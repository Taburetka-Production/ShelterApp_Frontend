import { Route, Routes } from "react-router-dom";
import { ShelterCreate } from "./ShelterCreate";
import { ShelterPage } from "./ShelterPage";

export const ShelterRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/create" element={<ShelterCreate />} />
      <Route path="/:id" element={<ShelterPage />} />
    </Routes>
  );
};
