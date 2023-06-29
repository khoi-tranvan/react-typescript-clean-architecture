import { useLocation, useNavigate } from "react-router-dom";
import { MenuHeaderView } from "./MenuHeaderView";
import { AUTHEN, PRIVATE_ROUTE, ROOT } from "../../navigation/CONSTANTS";
import { useEffect, useState } from "react";
import { LocalStorageService } from "../../services";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/authen/authenSlice";

interface props {
  children: string | JSX.Element | JSX.Element[];
}

export const MenuHeaderContainer = ({ children }: props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [userLocal, setUserLocal] = useState(null);
  const [chosenItem, setChosenItem] = useState<string[]>([]);

  useEffect(() => {
    const user = LocalStorageService.getUserInfo();
    setUserLocal(user);
    initiateMenu();
  }, []);

  const logoutApp = () => {
    LocalStorageService.removeUserInfo();
    dispatch(logout());
    window.location.reload();
    navigate(ROOT);
  };

  const toSigninPage = () => {
    navigate(AUTHEN.SIGNIN);
  };

  const toSignupPage = () => {
    navigate(AUTHEN.SIGNUP);
  };

  const selectMenuItem = (value: any) => {
    if (value.selectedKeys && value.selectedKeys.length > 0) {
      setChosenItem(value.selectedKeys);
    }
    navigate(PRIVATE_ROUTE[value.key]);
  };

  const initiateMenu = () => {
    const pathName = location.pathname;
    const pathNameArr = pathName.split("/");
    if (pathNameArr.length > 0 && pathNameArr[pathNameArr.length - 1] !== "") {
      setChosenItem([pathNameArr[pathNameArr.length - 1].toUpperCase()]);
    }
  };

  return (
    <MenuHeaderView
      selectMenuItem={selectMenuItem}
      logoutApp={logoutApp}
      toSigninPage={toSigninPage}
      toSignupPage={toSignupPage}
      chosenItem={chosenItem}
      userLocal={userLocal}
    >
      {children}
    </MenuHeaderView>
  );
};
