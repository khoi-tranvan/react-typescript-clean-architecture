import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageService } from "../services";

export const PrivateRoute = () => {
  const user = LocalStorageService.getUserInfo();
  if (!user) return <Navigate to="/authen/signin" />;
  return <Outlet />;
};
