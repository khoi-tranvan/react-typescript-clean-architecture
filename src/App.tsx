import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ConfigProvider } from "antd";
import AppTheme from "./config/theme";
import Router from "./navigation";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <ConfigProvider theme={AppTheme}>
      <Router />
    </ConfigProvider>
  );
}

export default App;
