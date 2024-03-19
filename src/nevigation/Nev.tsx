import React, { useState } from "react";
import { ProductOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import type { MenuProps } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuItem[] = [
  {
    key: "/warehouse",
    icon: React.createElement(HomeOutlined),
    label: "Warehouse",
    children: [
      {
        key: "/warehouse",
        icon: React.createElement(HomeOutlined),
        label: "Warehouse",
      },
    ],
  },
  {
    key: "/item",
    icon: React.createElement(ProductOutlined),
    label: "Item",
    children: [
      {
        key: "/item",
        icon: React.createElement(ProductOutlined),
        label: "Item",
      },
    ],
  },
];

type MenuItem = Required<MenuProps>["items"][number];

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        style={{
          // position: 'sticky',         ฟิกโพซิชัน
          top: 0,
          // zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          border: "1px solid hsla(0, 0%, 0%, 0.623)",
          // boxShadow: '4px 4px ',
        }}
      >
        <div style={{ fontSize: "20px" }}>SOLEasy</div>
      </Header>

      <Layout style={{ width: "100vw", height: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ background: "black" }}
        >
          <div className="demo-logo-vertical" /*สไลด์ด้านข้าง*/ />
          <Menu
            
            theme="dark"
            style={{ background: "black" }}
            mode="inline"
            defaultSelectedKeys={["/"]}
            items={items}
            onClick={(e) => navigate(e.key)}
          />
        </Sider>

        <div style={{ width: "100vw", height: "100vh" }}>
          <Outlet />
        </div>
      </Layout>
    </>
  );
};

export default App;
