import React, { useState } from "react";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "/Warehouse",
    icon: React.createElement(UserOutlined),
    label: "Warehouse",
  },
  {
    key: "/Item",
    icon: React.createElement(VideoCameraOutlined),
    label: "Item",
  },
];

const App: React.FC = () => {
  const navigate = useNavigate();

  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  return (
    <Layout style={{ width: '100vw' ,height: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={items}
          onClick={(e) => navigate(e.key)}
        />
      </Sider>

        <div style={{ width: '100vw' ,height: '100vh' }}>
        <Outlet />
        </div>

    </Layout>
  );
};

export default App;
