import { useNavigate } from "react-router-dom";
import { HomeView } from "./HomeView";
import { AUTHEN } from "../../navigation/CONSTANTS";

export const HomeContainer = () => {
  const navigate = useNavigate();

  const toSigninPage = () => {
    navigate(AUTHEN.SIGNIN);
  };
  const toSignupPage = () => {
    navigate(AUTHEN.SIGNUP);
  };

  return <HomeView toSigninPage={toSigninPage} toSignupPage={toSignupPage} />;
};
