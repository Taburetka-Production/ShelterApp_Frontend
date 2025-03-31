import { Route, Routes } from "react-router-dom";
import { ProfilePage } from "../../pages/profilePage/index.js";
import { Tracked } from "./Tracked.js";
import { Transactions } from "./Transactions.js";
import { UserPets } from "./UserPets.js";
import { ProfileInfo } from "./ProfileInfo.js";

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
