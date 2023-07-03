import { useLocation, useNavigate } from "react-router-dom";
import { MenuHeaderView } from "./MenuHeaderView";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { AUTHEN, PRIVATE_ROUTE, ROOT } from "../../CONSTANTS";
import { logout } from "../../../redux/features/authen/authenSlice";
import { UserToken } from "../../../../domain/entities/User";
import { UserStorageUseCaseInterface } from "../../../../application/usecases/UserStorageUseCase";

interface props {
  userStorageUseCase: UserStorageUseCaseInterface;
  children: string | JSX.Element | JSX.Element[];
}

export const MenuHeaderContainer = ({
  children,
  userStorageUseCase,
}: props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [userLocal, setUserLocal] = useState<UserToken | null>(null);
  const [chosenItem, setChosenItem] = useState<string[]>([]);

  useEffect(() => {
    const user = userStorageUseCase.getUserInfo();
    setUserLocal(user);
    initiateMenu();
  }, []);

  const logoutApp = () => {
    userStorageUseCase.removeUserInfo();
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
