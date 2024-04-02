import React, { useState } from "react";
import {
  ProductOutlined,
  HomeOutlined,
  ShopOutlined,
  DiffOutlined,
} from "@ant-design/icons";
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
    {
      key: "/store",
      icon: React.createElement(
        ShopOutlined,
        c === "/store" ? { style: { color: "red" } } : undefined
      ),
      label: "Store",
      children: [
        {
          key: "/store",
          label: "ร้านค้า",
        },
      ],
    },
    {
      key: "/order",
      icon: React.createElement(
        DiffOutlined,
        c === "/order" ? { style: { color: "red" } } : undefined
      ),
      label: "Order",
      children: [
        {
          key: "/order",
          label: "รายการ SOL",
        },
        {
          key: "/order2",
          label: "แพ็คสินค้า",
        },
        {
          key: "/order3",
          label: "สินค้ายังไม่ถูกตรวจสอบ",
        },
        {
          key: "/order4",
          label: "สินค้ากำลังดำเนินการ",
        },
        {
          key: "/order5",
          label: "กำลังแพ็คของออกจากคลัง",
        },
        {
          key: "/order6",
          label: "จัดส่งสินค้าเรียบร้อย",
        },
        {
          key: "/order7",
          label: "สินค้าถูกนำกลับ",
        },
      ],
    },

    {
      key: "/test",
      icon: React.createElement(
        ShopOutlined,
        c === "/test" ? { style: { color: "red" } } : undefined
      ),
      label: "Test",
      children: [
        {
          key: "/test",
          label: "เทมเพลส",
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
          <div style={{ width: "100vw", height: "100vh", overflow: "scroll" }}>
            <Outlet />
          </div>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
