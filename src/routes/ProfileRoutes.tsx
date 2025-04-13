import { ProfilePage } from "@/pages/profilePage/index";
import { PROFILE_NESTED_ROUTES } from "@/routes/routes";
import { Route, Routes } from "react-router-dom";
import { ProfileInfo } from "../components/profilePage/ProfileInfo";
import { Tracked } from "../components/profilePage/Tracked";
import { Transactions } from "../components/profilePage/Transactions";
import { UserPets } from "../components/profilePage/UserPets";

export const ProfileRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={PROFILE_NESTED_ROUTES.INFO} element={<ProfilePage />}>
        <Route index element={<ProfileInfo />} />
        <Route path={PROFILE_NESTED_ROUTES.PETS} element={<UserPets />} />
        <Route
          path={PROFILE_NESTED_ROUTES.TRANSACTIONS}
          element={<Transactions />}
        />
        <Route path={PROFILE_NESTED_ROUTES.TRACKED} element={<Tracked />} />
      </Route>
    </Routes>
  );
};
