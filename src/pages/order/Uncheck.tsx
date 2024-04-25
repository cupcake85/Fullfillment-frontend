import React, { useEffect, useState } from "react";
import TableStatus from "../../component/TableStatus";
import { Button, Card, Dropdown, Layout, Space } from "antd";

function Uncheck() {
  return (
    <Layout style={{ backgroundColor: "EDEDED" }}>
      <Card
        title={<span>สินค้ายังไม่ถูกตรวจสอบ</span>}
        style={{ margin: "70px", borderRadius: "20px" }}
      >
        <TableStatus status={"NOTCHECKED"} changestatus={true} />
      </Card>
    </Layout>
  );
}
export default Uncheck;
