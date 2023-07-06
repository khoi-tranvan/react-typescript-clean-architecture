import React, { useEffect } from "react";
import "./App.css";
import { ConfigProvider } from "antd";
import AppTheme from "../assets/styles/theme";
import Router from "./router/Router";
import { AuthUseCaseInterface } from "../application/usecases/AuthUseCase";
import { TestUseCaseInterface } from "../application/usecases/TestUseCase";
import { UserStorageUseCaseInterface } from "../application/usecases/UserStorageUseCase";
import { useAppSelector } from "./redux/hooks";
import { controller } from "../config/axios";

export interface AppProps {
  authUseCase: AuthUseCaseInterface;
  testUseCase: TestUseCaseInterface;
  userStorageUseCase: UserStorageUseCaseInterface;
}

function App(appProps: AppProps) {
  const fetchingCount = useAppSelector((state) => state.app.fetchingCount);

  const abortFetching = () => {
    controller.abort();
    window.location.reload();
  };

  useEffect(() => {
    if (fetchingCount > 0) {
      window.addEventListener("popstate", abortFetching);
    } else {
      window.removeEventListener("popstate", abortFetching);
    }
    return () => {
      window.removeEventListener("popstate", abortFetching);
    };
  }, [fetchingCount]);

  return (
    <ConfigProvider theme={AppTheme}>
      <Router {...appProps} />
    </ConfigProvider>
  );
}

export default App;
