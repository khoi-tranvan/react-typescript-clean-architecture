import { useNavigate } from "react-router-dom";
import SigninView from "./SigninView";
import { AUTHEN } from "../../navigation/CONSTANTS";

export const SigninContainer = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const toSignupPage = () => {
    navigate(AUTHEN.SIGNUP);
  };

  return (
    <SigninView
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      toSignupPage={toSignupPage}
    />
  );
};
