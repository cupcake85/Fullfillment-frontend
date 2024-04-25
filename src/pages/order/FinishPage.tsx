import React, { useEffect, useState } from "react";
import TableStatus from "../../component/TableStatus";
import { Button, Card, Dropdown, Layout, Space } from "antd";

function FinishPage() {
  const [statuschange, setStatusChange] = useState<string>("");

  return (
    <Layout>
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
            จัดส่งสินค้าเรียบร้อย
          </span>
        }
        style={{ margin: "70px", borderRadius: "20px" }}
      >
        <TableStatus status={"DELIVERED"} changestatus={true} />
      </Card>
    </Layout>
  );
}
export default FinishPage;
