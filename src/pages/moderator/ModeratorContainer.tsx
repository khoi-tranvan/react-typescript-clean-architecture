import { useEffect, useState } from "react";
import { TestAPI } from "../../services";
import { message } from "antd";
import { ModeratorView } from "./ModeratorView";

export const ModeratorContainer = () => {
  const [state, setState] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    initiateData();
  }, []);

  const initiateData = async () => {
    try {
      const results = await TestAPI.getModeratorAccess();
      setState(results?.message ?? "");
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content:
          error?.message ?? "There is something wrong when fetching data!",
      });
    }
  };

  return <ModeratorView data={state} />;
};
