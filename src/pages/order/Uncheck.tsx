import React, { useEffect, useState } from "react";
import TableStatus from "../../component/TableStatus";
import { Button, Card, Dropdown, Layout, Space } from "antd";

function Uncheck() {
  return (
    <Layout style={{ backgroundColor: "EDEDED" }}>
      <Card
        title={
          <span
            style={{
              display: "flex",
              alignContent: "baseline",
              alignItems: "center",
              padding: "20px",
            }}
          >
            สินค้ายังไม่ถูกตรวจสอบ
          </span>
        }
        style={{
          backgroundColor: "white",
          margin: 65,
          borderRadius: 20,
          marginTop: "40px",
        }}
      >
        <TableStatus status={"NOTCHECKED"} changestatus={true} />
      </Card>
    </Layout>
  );
}
export default Uncheck;
