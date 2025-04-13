import { Login } from "@/components/authorizationPage/Login";
import { Register } from "@/components/authorizationPage/Register";
import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "@/components/authorizationPage/AuthLayout";
import { ROUTES } from "./routes";
export const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.AUTH} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
      </Route>
    </Routes>
  );
};
