import { useNavigate } from "react-router-dom";
import SigninView from "./SigninView";
import { AUTHEN, ROOT } from "../../navigation/CONSTANTS";
import AuthenticationAPI, {
  SignInData,
} from "../../services/api/authentication";
import { message } from "antd";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";
import { setUser } from "../../redux/features/authen/authenSlice";
import { LocalStorageService } from "../../services";

export const SigninContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onFinish = async (values: any) => {
    try {
      const payload: SignInData = {
        username: values.username,
        password: values.password,
      };
      const results = await AuthenticationAPI.signIn(payload);
      LocalStorageService.setUserInfo(results);
      dispatch(setUser(results));
      navigate(ROOT);
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: error?.message ?? "Username or password is not correct!",
      });
      setErrorMessage("Username or password is not correct!");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const toSignupPage = () => {
    navigate(AUTHEN.SIGNUP);
  };

  return (
    <>
      <SigninView
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        toSignupPage={toSignupPage}
        errorMessage={errorMessage}
      />
      {contextHolder}
    </>
  );
};
