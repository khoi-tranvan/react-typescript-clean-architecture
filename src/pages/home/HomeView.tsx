import React from "react";
import { Breadcrumb, Button, Layout, Menu, theme, Typography } from "antd";

const { Header, Content, Footer } = Layout;

interface props {
  toSigninPage: () => void;
  toSignupPage: () => void;
}

export const HomeView = ({ toSigninPage, toSignupPage }: props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          width: "100%",
          zIndex: 1,
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(10).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
        <div style={{ display: "flex" }}>
          <Button type="primary" onClick={toSigninPage}>
            Sign in
          </Button>
          <div style={{ width: 16 }}></div>
          <Button type="primary" onClick={toSignupPage}>
            Sign up
          </Button>
        </div>
      </Header>
      <Content style={{ backgroundColor: "#ffffff" }}>
        <div
          //   className="height-full-screen width-full-screen"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "86vh",
          }}
        >
          <Typography.Title className="gardient-color">
            Welcome back Khoi Tran
          </Typography.Title>
        </div>{" "}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Khoi Tran
      </Footer>
    </Layout>
  );
};
