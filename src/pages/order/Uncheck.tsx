import React, { useEffect, useState } from "react";
import TableStatus from "../../component/TableStatus";
import { Button, Card, Dropdown, Layout, Space } from "antd";
import type { MenuProps } from "antd";
import { DeleteFilled, DownOutlined } from "@ant-design/icons";

function Uncheck() {
  const [statuschange, setStatusChange] = useState<string>("");


  return (
    <Layout style={{ backgroundColor: "EDEDED" }}>
      <Card
        title={<span>สินค้ายังไม่ถูกตรวจสอบ</span>}
        style={{ margin: "70px" }}
      >
        <TableStatus
          status={"NOTCHECKED"} changestatus={true}          
        />
      </Card>
    </Layout>
  );
}
export default Uncheck;
