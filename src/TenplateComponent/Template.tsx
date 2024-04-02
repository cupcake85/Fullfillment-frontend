import React, { useState } from "react";
import { ProductOutlined, HomeOutlined, ShopOutlined } from "@ant-design/icons";
import { Layout, Menu, Image, Row, Col, Form } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import type { MenuProps } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <>
      <Layout style={{ width: "100vw", height: "100vh" }}>
        <Content style={{ height: "100vh", backgroundColor: "red" }}>
          <Layout
            style={{
              backgroundColor: "pink",
              padding: "10px",
              margin: "15px 80px",
              minHeight: "220px",
            }}
          >
            ffffffff
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default App;
