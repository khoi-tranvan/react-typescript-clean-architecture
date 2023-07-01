import { useEffect, useState } from "react";
import { TestAPI } from "../../services";
import { message } from "antd";
import { UserView } from "./UserView";

export const UserContainer = () => {
  const [state, setState] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    initiateData();
  }, []);

  const initiateData = async () => {
    try {
      const results = await TestAPI.getUserAccess();
      setState(results?.message ?? "");
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content:
          error?.message ?? "There is something wrong when fetching data!",
      });
    }
  };

  return <UserView data={state} />;
};
