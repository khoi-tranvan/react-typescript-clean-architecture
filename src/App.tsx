import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ConfigProvider } from "antd";
import AppTheme from "./config/theme";
import Router from "./navigation";
import LoadingComponent from "./components/Loading";

function App() {
  return (
    <ConfigProvider theme={AppTheme}>
      <LoadingComponent>
        <Router />
      </LoadingComponent>
    </ConfigProvider>
  );
}

export default App;
