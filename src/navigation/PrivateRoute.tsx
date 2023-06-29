import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageService } from "../services";
import MenuHeader from "../components/menu-header";

export const PrivateRoute = () => {
  const user = LocalStorageService.getUserInfo();
  if (!user) return <Navigate to="/authen/signin" />;
  return <MenuHeader children={<Outlet />} />;
};
