import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useAppSelector } from "../redux/hooks";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface props {
  children?: string | JSX.Element | JSX.Element[];
}

const LoadingComponent = ({ children }: props) => {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  return (
    <Spin
      className="height-full-screen width-full-screen"
      spinning={isLoading}
      indicator={antIcon}
    >
      {children}
    </Spin>
  );
};

export default LoadingComponent;
