import { useNavigate } from "react-router-dom";
import SignupView from "./SignupView";
import { message } from "antd";
import { AUTHEN, ROOT } from "../../navigation/CONSTANTS";
import AuthenticationAPI, {
  SignUpData,
} from "../../services/api/authentication";
import { DATE_FORMAT } from "../../config/CONSTANT";
import { useState } from "react";
import SuccessResult from "./components/SuccessResult";

export const SignupContainer = () => {
  const [registeredData, setRegisteredData] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const payload: SignUpData = {
        address: values.address,
        email: values.email,
        username: values.username,
        fullname: values.fullname,
        phonenumber: values.phonenumber,
        dob: values.dob.format(DATE_FORMAT.FORMAT2),
        password: values.password,
        roles: [1],
      };
      const results = await AuthenticationAPI.signUp(payload);
      setRegisteredData(results);
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: error?.message ?? "There is an error!",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const toSigninPage = () => {
    navigate(AUTHEN.SIGNIN);
  };

  const toHome = () => {
    navigate(ROOT);
  };

  return registeredData ? (
    <SuccessResult toHome={toHome} username={registeredData?.username ?? ""} />
  ) : (
    <SignupView
      toSigninPage={toSigninPage}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      contextHolder={contextHolder}
    />
  );
};
