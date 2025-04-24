import { AnimalPage } from "@/pages/animalPage";
import { ANIMAL_NESTED_ROUTES } from "@/routes/routes";
import { Route, Routes } from "react-router-dom";

export const AnimalRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={ANIMAL_NESTED_ROUTES.DETAIL} element={<AnimalPage />} />
    </Routes>
  );
};
