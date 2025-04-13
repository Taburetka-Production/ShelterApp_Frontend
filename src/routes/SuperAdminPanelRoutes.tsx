import { Route, Routes } from "react-router-dom";
import { SuperAdminPage } from "@/pages/superAdminPage/index";
import { Shelters } from "@/components/superAdminPanel/Shelters";
import { Users } from "@/components/superAdminPanel/Users";
import { ROUTES } from "@/routes/routes";

export const SuperAdminPanelRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<SuperAdminPage />}>
        <Route index element={<Users />} />
        <Route path={ROUTES.SHELTER} element={<Shelters />} />
      </Route>
    </Routes>
  );
};
