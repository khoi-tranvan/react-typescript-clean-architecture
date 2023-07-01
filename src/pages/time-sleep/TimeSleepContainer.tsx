import { useEffect, useState } from "react";
import { TestAPI } from "../../services";
import { TimeSleepView } from "./TimeSleepView";

export const TimeSleepContainer = () => {
  const [state, setState] = useState("");

  useEffect(() => {
    initiateData();
  }, []);

  const initiateData = async () => {
    const times = [1, 2, 3, 4];
    await Promise.all(
      times.map((element) => TestAPI.getTimeSleep({ time: element }))
    );
    setState("You have fetched all data from time sleep api");
  };

  return <TimeSleepView data={state} />;
};
