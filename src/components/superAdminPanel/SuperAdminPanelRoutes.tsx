import { Route, Routes } from "react-router-dom";
import { SuperAdminPage } from "../../pages/superAdminPage/index";
import { Shelters } from "./Shelters";
import { Users } from "./Users";

export const SuperAdminPanelRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<SuperAdminPage />}>
        <Route index element={<Users />} />
        <Route path="shelters" element={<Shelters />} />
      </Route>
    </Routes>
  );
};
