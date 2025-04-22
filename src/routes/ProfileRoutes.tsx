import { ProfilePage } from "@/pages/profilePage/index";
import { PROFILE_NESTED_ROUTES } from "@/routes/routes";
import { Route, Routes } from "react-router-dom";
import { ProfileInfo } from "../components/profilePage/ProfileInfo";
import { Favorites } from "../components/profilePage/Favorites";
import { Notifications } from "../components/profilePage/Notifications";

export const ProfileRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={PROFILE_NESTED_ROUTES.INFO} element={<ProfilePage />}>
        <Route index element={<ProfileInfo />} />
        <Route
          path={PROFILE_NESTED_ROUTES.NOTIFICATION}
          element={<Notifications />}
        />
        <Route path={PROFILE_NESTED_ROUTES.FAVORITES} element={<Favorites />} />
      </Route>
    </Routes>
  );
};
