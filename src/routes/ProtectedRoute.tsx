import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { ROUTES } from "../constants/routePaths";

const ProtectedRoute = () => {
  const token =
    localStorage.getItem("token");

  return token ? (
    <Outlet />
  ) : (
    <Navigate
      to={ROUTES.AUTH.LOGIN}
      replace
    />
  );
};

export default ProtectedRoute;