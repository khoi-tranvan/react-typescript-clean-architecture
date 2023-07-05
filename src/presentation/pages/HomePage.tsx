import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { UserToken } from "../../domain/entities/User";
import { logout } from "../redux/features/authen/authenSlice";
import MenuHeader from "../router/components/menu-header";
import { HomeView } from "../components/HomeView";
import { UserStorageUseCaseInterface } from "../../application/usecases/UserStorageUseCase";
import { AUTH_ROUTES } from "../router/CONSTANTS";

interface props {
  userStorageUseCase: UserStorageUseCaseInterface;
}

export const HomePage = ({ userStorageUseCase }: props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [userLocal, setUserLocal] = useState<UserToken | null>(null);

  useEffect(() => {
    const user = userStorageUseCase.getUserInfo();
    setUserLocal(user);
  }, []);

  const logoutApp = () => {
    userStorageUseCase.removeUserInfo();
    dispatch(logout());
  };

  const toSigninPage = () => {
    navigate(AUTH_ROUTES.PATH + "/" + AUTH_ROUTES.SUB.SIGNIN);
  };

  const toSignupPage = () => {
    navigate(AUTH_ROUTES.PATH + "/" + AUTH_ROUTES.SUB.SIGNUP);
  };

  return (
    <MenuHeader userStorageUseCase={userStorageUseCase}>
      <HomeView
        logoutApp={logoutApp}
        toSigninPage={toSigninPage}
        toSignupPage={toSignupPage}
        userLocal={userLocal}
      />
    </MenuHeader>
  );
};
