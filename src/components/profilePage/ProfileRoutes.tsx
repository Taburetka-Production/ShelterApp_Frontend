import { Route, Routes } from "react-router-dom";
import { ProfilePage } from "../../pages/profilePage/index";
import { Tracked } from "./Tracked";
import { Transactions } from "./Transactions";
import { UserPets } from "./UserPets";
import { ProfileInfo } from "./ProfileInfo";

export const ProfileRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="" element={<ProfilePage />}>
        <Route index element={<ProfileInfo />} />
        <Route path="pets" element={<UserPets />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="tracked" element={<Tracked />} />
      </Route>
    </Routes>
  );
};
