import { useNavigate } from "react-router-dom";
import { HomeView } from "./HomeView";
import { AUTHEN } from "../../navigation/CONSTANTS";
import { useEffect, useState } from "react";
import { LocalStorageService } from "../../services";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/authen/authenSlice";
import MenuHeader from "../../components/menu-header";

export const HomeContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userLocal, setUserLocal] = useState();

  useEffect(() => {
    const user = LocalStorageService.getUserInfo();
    setUserLocal(user);
  }, []);

  const logoutApp = () => {
    LocalStorageService.removeUserInfo();
    dispatch(logout());
  };

  const toSigninPage = () => {
    navigate(AUTHEN.SIGNIN);
  };

  const toSignupPage = () => {
    navigate(AUTHEN.SIGNUP);
  };

  return (
    <MenuHeader>
      <HomeView
        logoutApp={logoutApp}
        toSigninPage={toSigninPage}
        toSignupPage={toSignupPage}
        userLocal={userLocal}
      />
    </MenuHeader>
  );
};
