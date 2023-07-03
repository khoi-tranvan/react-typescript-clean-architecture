import { useEffect, useState } from "react";
import { message } from "antd";
import { UserView } from "../components/UserView";
import { useAppDispatch } from "../redux/hooks";
import {
  completeFetching,
  startFetching,
} from "../redux/features/app/appSlice";
import { TestUseCaseInterface } from "../../application/usecases/TestUseCase";

interface props {
  testUseCase: TestUseCaseInterface;
}
export const UserPage = ({ testUseCase }: props) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    initiateData();
  }, []);

  const initiateData = async () => {
    try {
      dispatch(startFetching());
      const results = await testUseCase.getUserAccess();
      setState(results?.message ?? "");
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content:
          error?.message ?? "There is something wrong when fetching data!",
      });
    } finally {
      dispatch(completeFetching());
    }
  };

  return <UserView data={state} />;
};
