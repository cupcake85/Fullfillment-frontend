import React, { useState } from "react";
import { ProductOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu, Image, Row, Col } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import type { MenuProps } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const iconDemo =
  "https://th.bing.com/th/id/OIP.ZTYY0ApuIc1CkNrORfO5JwAAAA?w=228&h=182&c=7&r=0&o=5&dpr=1.6&pid=1.7";

const App: React.FC = () => {
  const navigate = useNavigate();
  type MenuItem = Required<MenuProps>["items"][number];
  const [c, setC] = useState<string>("");
  const items: MenuItem[] = [
    {
      key: "/warehouse",
      icon: React.createElement(
        HomeOutlined,
        c === "/warehouse" ? { style: { color: "red" } } : undefined
      ),
      label: "Warehouse",
      children: [
        {
          key: "/warehouse",
          label: "คลังสินค้า",
        },
      ],
    },
    {
      key: "/item",
      icon: React.createElement(
        ProductOutlined,
        c === "/item" ? { style: { color: "red" } } : undefined
      ),
      label: "Item",
      children: [
        {
          key: "/item",
          label: "จัดการ",
        },
      ],
    },
  ];

  const onClick = (e: string) => {
    navigate(e);
    setC(e);
  };

  return (
    <>
      <Layout style={{ width: "100vw", height: "100vh" }}>
        <Header
          style={{
            position: "sticky",
            zIndex: 10,
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          <Image src={iconDemo} style={{ width: "64px", height: "64px" }} />
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{ background: "#2F353A", width: "100vw", height: "100vh" }}
          >
            <div className="demo-logo-vertical" /*สไลด์ด้านข้าง*/ />

            <Menu
              theme="dark"
              style={{ background: "#2F353A" }}
              mode="inline"
              defaultSelectedKeys={["/"]}
              items={items}
              onClick={(e) => onClick(e.key)}
            />
          </Sider>
          <div style={{ width: "100vw", height: "100vh" ,/*overflow:'scroll'*/}}>
            <Outlet />
          </div>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
