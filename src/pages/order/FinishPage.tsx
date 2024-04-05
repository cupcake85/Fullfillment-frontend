import React, { useEffect, useState } from "react";
import TableStatus from "../../component/TableStatus";
import { Button, Card, Dropdown, Layout, Space } from "antd";

function FinishPage() {
  const [statuschange, setStatusChange] = useState<string>("");

  return (
    <Layout style={{ backgroundColor: "gray" }}>
      <Card
        title={<span>จัดส่งสินค้าเรียบร้อย</span>}
        style={{ backgroundColor: "pink", margin: "70px" }}
      >
        <TableStatus
          status={"DELIVERED"}
          changestatus={true}
        />
      </Card>
    </Layout>
  );
}
export default FinishPage;
