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

function Order3() {
  const [statuschange, setStatusChange] = useState<string>("");

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
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    setStatusChange(key);
    console.log(`Click on item ${key}`);
  };

  const items: MenuProps["items"] = [
    {
      label: "สินค้ายังไม่ถูกตรวจสอบ",
      key: "NotChecked",
    },
    {
      label: "กำลังแพ็คของออกจากคลัง",
      key: "OutOfStock",
    },
    {
      label: "สินค้ากำลังดำเนินการ",
      key: "Inprogress",
    },
    {
      label: "จัดส่งสินค้าเรียบร้อย",
      key: "Delivered",
    },
    {
      label: "สินค้าถูกนำกลับ",
      key: "Returned",
    },
  ];

  return (
    <Layout style={{ backgroundColor: "gray" }}>
      <Card
        title={<span>สินค้ายังไม่ถูกตรวจสอบ</span>}
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
          <Dropdown
            menu={{ items, onClick }}
            placement="bottom"
            trigger={["click"]}
          >
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
        <TableStatus
          status={"NotChecked"}
          statuschange={statuschange}
          setStatusChange={setStatusChange}
        />
      </Card>
    </Layout>
  );
}
export default Order3;
