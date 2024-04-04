import React, { useEffect, useState } from "react";
import TableStatus from "../../component/TableStatus";
import { Button, Card, Dropdown, Layout, Space } from "antd";
import type { MenuProps } from "antd";
import {
  DeleteFilled,
  DownOutlined,
  RetweetOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import axios from "axios";

function Order4() {
  const data = [
    {
      key: "1",
      details: "Details 1",
      date: "2024-04-01",
      address: "Address 1",
      zipCode: "10000",
      cod: "COD 1",
      email: "email1@example.com",
      status: "Pending",
    },
    {
      key: "2",
      details: "Details 2",
      date: "2024-04-02",
      address: "Address 2",
      zipCode: "20000",
      cod: "COD 2",
      email: "email2@example.com",
      status: "Completed",
    },
  ];

  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  return (
    <Layout style={{ backgroundColor: "gray" }}>
      <Card
        title={<span>สินค้ากำลังดำเนินการ</span>}
        style={{ backgroundColor: "pink", margin: "70px" }}
      >
        <Button
          style={{
            backgroundColor: "#2F353A",
            margin: "5px",
            borderRadius: "20px",
            color: "#fff",
          }}
        >
          <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                เปลี่ยนแปลงสถานะ
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: "#2F353A",
            borderRadius: "20px",
          }}
        >
          <span>
            <DeleteFilled style={{ margin: "5px" }} />
            ลบ
          </span>
        </Button>
        <TableStatus status={"InProgress"} />
      </Card>
    </Layout>
  );
}
export default Order4;
